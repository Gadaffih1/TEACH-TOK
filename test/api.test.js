'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const { createServer } = require('../src/server');

const ADMIN = 'admin-secret';
async function withServer(fn) {
  const s = createServer(undefined, { adminToken: ADMIN, uploadDir: require('fs').mkdtempSync(require('path').join(require('os').tmpdir(), 'up-')), maxVideoBytes: 1000 });
  await new Promise((r) => s.listen(0, r));
  const base = `http://127.0.0.1:${s.address().port}`;
  const call = async (m, p, b, token) => {
    const headers = token ? { Authorization: ['Bearer', token].join(' ') } : {};
    const r = await fetch(base + p, { method: m, headers, body: b ? JSON.stringify(b) : undefined });
    return { status: r.status, body: await r.json() };
  };
  call.base = base;
  try { await fn(call); } finally { s.close(); }
}

test('video feed, engagement, follow, analytics', () => withServer(async (call) => {
  const a = (await call('POST', '/api/teachers', { name: 'A', school: 'S1', subjects: ['Math'] })).body;
  const b = (await call('POST', '/api/teachers', { name: 'B', school: 'S2' })).body;
  const v = (await call('POST', '/api/videos', { title: 'Fractions with pizza', concept: 'fractions', videoUrl: 'http://x/v.mp4' }, a.token)).body;
  assert.strictEqual(v.teacherId, a.id);
  assert.strictEqual((await call('POST', `/api/videos/${v.id}/like`, {}, b.token)).body.likes, 1);
  await call('POST', `/api/videos/${v.id}/comments`, { text: 'Nice' }, b.token);
  await call('POST', `/api/videos/${v.id}/bookmark`, {}, b.token);
  assert.strictEqual((await call('POST', `/api/teachers/${a.id}/follow`, {}, b.token)).status, 200);
  const feed = (await call('GET', '/api/feed', undefined, b.token)).body;
  assert.strictEqual(feed[0].stats.comments, 1);
  assert.strictEqual((await call('GET', '/api/bookmarks', undefined, b.token)).body.length, 1);
  assert.strictEqual((await call('POST', '/api/videos', { title: 'x' }, a.token)).status, 400);
  assert.deepStrictEqual((await call('GET', '/api/analytics', undefined, ADMIN)).body.popularConcepts, [{ concept: 'fractions', videos: 1 }]);
  assert.ok((await call('GET', `/api/teachers/${a.id}`)).body.badges.includes('First Step'));
}));

test('authentication and admin permissions', () => withServer(async (call) => {
  const a = (await call('POST', '/api/teachers', { name: 'A', school: 'S' })).body;
  assert.strictEqual((await call('POST', '/api/videos', { title: 't', concept: 'c', videoUrl: 'http://x/v.mp4' })).status, 401);
  assert.strictEqual((await call('POST', '/api/videos', { title: 't', concept: 'c', videoUrl: 'http://x/v.mp4' }, 'bad')).status, 401);
  assert.strictEqual((await call('POST', `/api/teachers/${a.id}/verify`, {}, a.token)).status, 403);
  assert.strictEqual((await call('GET', '/api/admin/reports', undefined, a.token)).status, 403);
  assert.strictEqual((await call('GET', '/api/analytics')).status, 403);
  assert.strictEqual((await call('POST', `/api/teachers/${a.id}/verify`, {}, ADMIN)).body.verified, true);
}));

test('video upload and streaming', () => withServer(async (call) => {
  const a = (await call('POST', '/api/teachers', { name: 'A', school: 'S' })).body;
  const auth = { Authorization: ['Bearer', a.token].join(' ') };
  const post = (body, type = 'video/mp4', h = auth) => fetch(call.base + '/api/uploads', { method: 'POST', headers: { ...h, 'Content-Type': type }, body });
  assert.strictEqual((await post(Buffer.alloc(10), 'video/mp4', {})).status, 401);
  assert.strictEqual((await post(Buffer.alloc(10), 'text/html')).status, 415);
  assert.strictEqual((await post(Buffer.alloc(5000))).status, 413);
  const up = await post(Buffer.from('0123456789'));
  assert.strictEqual(up.status, 201);
  const { url } = await up.json();
  const full = await fetch(call.base + url);
  assert.strictEqual(full.headers.get('content-type'), 'video/mp4');
  assert.strictEqual(await full.text(), '0123456789');
  const part = await fetch(call.base + url, { headers: { Range: 'bytes=2-4' } });
  assert.strictEqual(part.status, 206);
  assert.strictEqual(await part.text(), '234');
  assert.strictEqual((await fetch(call.base + '/uploads/../data.json')).status, 404);
  assert.strictEqual((await call('POST', '/api/videos', { title: 't', concept: 'c', videoUrl: url }, a.token)).status, 201);
  assert.strictEqual((await call('POST', '/api/videos', { title: 't', concept: 'c', videoUrl: 'javascript:alert(1)' }, a.token)).status, 400);
}));

function makeZip(entries) {
  const zlib = require('zlib');
  const local = [], central = [];
  let off = 0;
  for (const [name, text] of Object.entries(entries)) {
    const n = Buffer.from(name), d = zlib.deflateRawSync(Buffer.from(text));
    const lh = Buffer.alloc(30); lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(8, 8); lh.writeUInt32LE(d.length, 18); lh.writeUInt32LE(text.length, 22); lh.writeUInt16LE(n.length, 26);
    const ch = Buffer.alloc(46); ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(8, 10); ch.writeUInt32LE(d.length, 20); ch.writeUInt32LE(text.length, 24); ch.writeUInt16LE(n.length, 28); ch.writeUInt32LE(off, 42);
    local.push(lh, n, d); central.push(ch, n); off += 30 + n.length + d.length;
  }
  const cd = Buffer.concat(central);
  const end = Buffer.alloc(22); end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(central.length / 2, 10); end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(off, 16);
  return Buffer.concat([...local, cd, end]);
}

test('document extraction: docx, pptx, pdf, errors', () => withServer(async (call) => {
  const ex = (filename, buf) => call('POST', '/api/ai/extract', { filename, contentBase64: buf.toString('base64') });
  const docx = makeZip({ 'word/document.xml': '<w:document><w:p><w:r><w:t>Fractions &amp; decimals</w:t></w:r></w:p><w:p><w:r><w:t xml:space="preserve">Second para</w:t></w:r></w:p></w:document>' });
  let r = await ex('notes.docx', docx);
  assert.strictEqual(r.status, 200);
  assert.strictEqual(r.body.text, 'Fractions & decimals\nSecond para');
  const pptx = makeZip({ 'ppt/slides/slide2.xml': '<p><a:p><a:r><a:t>Two</a:t></a:r></a:p></p>', 'ppt/slides/slide1.xml': '<p><a:p><a:r><a:t>One</a:t></a:r></a:p></p>' });
  r = await ex('deck.pptx', pptx);
  assert.strictEqual(r.body.text, 'Slide 1\nOne\n\nSlide 2\nTwo');
  const zlib = require('zlib');
  const content = 'BT /F1 12 Tf (Photosynthesis \\(light\\)) Tj [(Chloro) -20 (phyll)] TJ ET';
  const pdf = Buffer.concat([Buffer.from('%PDF-1.4\n1 0 obj\n<< /Filter /FlateDecode >>\nstream\n'), zlib.deflateSync(Buffer.from(content)), Buffer.from('\nendstream\nendobj\n%%EOF')]);
  r = await ex('a.pdf', pdf);
  assert.strictEqual(r.body.text, 'Photosynthesis (light)Chlorophyll');
  assert.strictEqual((await ex('bad.docx', Buffer.from('nope'))).status, 400);
  assert.strictEqual((await ex('x.pdf', Buffer.from('%PDF-1.4 empty'))).status, 422);
  assert.strictEqual((await ex('old.doc', Buffer.from('x'))).status, 415);
  assert.strictEqual((await call('POST', '/api/ai/extract', { filename: 'a.pdf', content: 'x' })).status, 400);
  const img = await ex('p.png', Buffer.from('x'));
  assert.ok([501, 422].includes(img.status));
}));

test('AI studio generates every format', () => withServer(async (call) => {
  const text = 'Photosynthesis converts light into chemical energy. Plants absorb sunlight using chlorophyll. Chlorophyll sits inside chloroplasts. Glucose is produced.';
  const formats = (await call('GET', '/api/ai/formats')).body;
  for (const format of formats) {
    const r = await call('POST', '/api/ai/generate', { format, text });
    assert.strictEqual(r.status, 200, format);
  }
  assert.strictEqual((await call('POST', '/api/ai/generate', { format: 'nope', text })).status, 400);
  assert.strictEqual((await call('POST', '/api/ai/extract', { filename: 'a.pdf' })).status, 400);
}));

test('resources, collaboration, moderation', () => withServer(async (call) => {
  const a = (await call('POST', '/api/teachers', { name: 'A', school: 'S' })).body;
  const b = (await call('POST', '/api/teachers', { name: 'B', school: 'S' })).body;
  const r = (await call('POST', '/api/resources', { title: 'Algebra worksheet', type: 'worksheet', subject: 'Math' }, a.token)).body;
  assert.strictEqual((await call('GET', '/api/resources?q=algebra')).body.length, 1);
  assert.strictEqual((await call('POST', `/api/resources/${r.id}/coauthors`, { teacherId: b.id }, b.token)).status, 403);
  assert.strictEqual((await call('POST', `/api/resources/${r.id}/coauthors`, { teacherId: b.id }, a.token)).status, 200);
  const rep = (await call('POST', '/api/reports', { targetType: 'resource', targetId: r.id, reason: 'copyright', kind: 'copyright' }, b.token)).body;
  assert.strictEqual((await call('POST', `/api/admin/reports/${rep.id}/takedown`, {}, b.token)).status, 403);
  await call('POST', `/api/admin/reports/${rep.id}/takedown`, {}, ADMIN);
  assert.strictEqual((await call('GET', '/api/resources?q=algebra')).body.length, 0);
}));

test('data and tokens persist across restarts', async () => {
  const os = require('os'), fs = require('fs'), path = require('path');
  const { createStore } = require('../src/store');
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'tt-')), 'data.json');
  const start = async () => {
    const s = createServer(createStore({ file }), { adminToken: ADMIN });
    await new Promise((r) => s.listen(0, r));
    const base = `http://127.0.0.1:${s.address().port}`;
    const call = async (m, p, b, t) => {
      const r = await fetch(base + p, { method: m, headers: t ? { Authorization: ['Bearer', t].join(' ') } : {}, body: b ? JSON.stringify(b) : undefined });
      return { status: r.status, body: await r.json() };
    };
    return { s, call };
  };
  let { s, call } = await start();
  const a = (await call('POST', '/api/teachers', { name: 'A', school: 'S' })).body;
  const v = (await call('POST', '/api/videos', { title: 'T', concept: 'c', videoUrl: 'http://x/v.mp4' }, a.token)).body;
  await call('POST', `/api/videos/${v.id}/like`, {}, a.token);
  s.close();
  ({ s, call } = await start());
  try {
    const feed = (await call('GET', '/api/feed')).body;
    assert.strictEqual(feed.length, 1);
    assert.strictEqual(feed[0].stats.likes, 1);
    assert.strictEqual((await call('POST', `/api/videos/${v.id}/bookmark`, {}, a.token)).status, 200);
    assert.ok(!fs.readFileSync(file, 'utf8').includes(a.token), 'raw token must not be stored');
  } finally { s.close(); }
});
