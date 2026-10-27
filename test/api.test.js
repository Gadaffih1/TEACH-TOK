'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const { createServer } = require('../src/server');

const ADMIN = 'admin-secret';
async function withServer(fn) {
  const s = createServer(undefined, { adminToken: ADMIN });
  await new Promise((r) => s.listen(0, r));
  const base = `http://127.0.0.1:${s.address().port}`;
  const call = async (m, p, b, token) => {
    const headers = token ? { Authorization: ['Bearer', token].join(' ') } : {};
    const r = await fetch(base + p, { method: m, headers, body: b ? JSON.stringify(b) : undefined });
    return { status: r.status, body: await r.json() };
  };
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
  assert.strictEqual((await call('POST', '/api/videos', { title: 't', concept: 'c', videoUrl: 'u' })).status, 401);
  assert.strictEqual((await call('POST', '/api/videos', { title: 't', concept: 'c', videoUrl: 'u' }, 'bad')).status, 401);
  assert.strictEqual((await call('POST', `/api/teachers/${a.id}/verify`, {}, a.token)).status, 403);
  assert.strictEqual((await call('GET', '/api/admin/reports', undefined, a.token)).status, 403);
  assert.strictEqual((await call('GET', '/api/analytics')).status, 403);
  assert.strictEqual((await call('POST', `/api/teachers/${a.id}/verify`, {}, ADMIN)).body.verified, true);
}));

test('AI studio generates every format', () => withServer(async (call) => {
  const text = 'Photosynthesis converts light into chemical energy. Plants absorb sunlight using chlorophyll. Chlorophyll sits inside chloroplasts. Glucose is produced.';
  const formats = (await call('GET', '/api/ai/formats')).body;
  for (const format of formats) {
    const r = await call('POST', '/api/ai/generate', { format, text });
    assert.strictEqual(r.status, 200, format);
  }
  assert.strictEqual((await call('POST', '/api/ai/generate', { format: 'nope', text })).status, 400);
  assert.strictEqual((await call('POST', '/api/ai/extract', { filename: 'a.pdf' })).status, 415);
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
  const v = (await call('POST', '/api/videos', { title: 'T', concept: 'c', videoUrl: 'u' }, a.token)).body;
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
