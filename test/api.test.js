'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const { createServer } = require('../src/server');

async function withServer(fn) {
  const s = createServer();
  await new Promise((r) => s.listen(0, r));
  const base = `http://127.0.0.1:${s.address().port}`;
  const call = async (m, p, b) => {
    const r = await fetch(base + p, { method: m, body: b ? JSON.stringify(b) : undefined });
    return { status: r.status, body: await r.json() };
  };
  try { await fn(call); } finally { s.close(); }
}

test('video feed, engagement, follow, analytics', () => withServer(async (call) => {
  const a = (await call('POST', '/api/teachers', { name: 'A', school: 'S1', subjects: ['Math'] })).body;
  const b = (await call('POST', '/api/teachers', { name: 'B', school: 'S2' })).body;
  const v = (await call('POST', '/api/videos', { teacherId: a.id, title: 'Fractions with pizza', concept: 'fractions', videoUrl: 'http://x/v.mp4' })).body;
  assert.strictEqual((await call('POST', `/api/videos/${v.id}/like`, { teacherId: b.id })).body.likes, 1);
  await call('POST', `/api/videos/${v.id}/comments`, { teacherId: b.id, text: 'Nice' });
  await call('POST', `/api/videos/${v.id}/bookmark`, { teacherId: b.id });
  assert.strictEqual((await call('POST', `/api/teachers/${a.id}/follow`, { teacherId: b.id })).status, 200);
  const feed = (await call('GET', `/api/feed?teacherId=${b.id}`)).body;
  assert.strictEqual(feed[0].stats.comments, 1);
  assert.strictEqual((await call('GET', `/api/teachers/${a.id}/bookmarks`)).status, 200);
  assert.strictEqual((await call('POST', '/api/videos', { title: 'x' })).status, 400);
  assert.deepStrictEqual((await call('GET', '/api/analytics')).body.popularConcepts, [{ concept: 'fractions', videos: 1 }]);
  assert.ok((await call('GET', `/api/teachers/${a.id}`)).body.badges.includes('First Step'));
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
  const r = (await call('POST', '/api/resources', { teacherId: a.id, title: 'Algebra worksheet', type: 'worksheet', subject: 'Math' })).body;
  assert.strictEqual((await call('GET', '/api/resources?q=algebra')).body.length, 1);
  const rep = (await call('POST', '/api/reports', { targetType: 'resource', targetId: r.id, reason: 'copyright', kind: 'copyright' })).body;
  await call('POST', `/api/admin/reports/${rep.id}/takedown`);
  assert.strictEqual((await call('GET', '/api/resources?q=algebra')).body.length, 0);
  assert.strictEqual((await call('POST', `/api/teachers/${a.id}/verify`)).body.verified, true);
}));
