'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { createStore } = require('./store');
const ai = require('./ai');

function createServer(store = createStore()) {
  const routes = [];
  const on = (method, pattern, fn) => routes.push({ method, re: new RegExp('^' + pattern.replace(/:(\w+)/g, '(?<$1>[^/]+)') + '$'), fn });

  on('POST', '/api/teachers', ({ body }) => [201, store.createTeacher(body)]);
  on('GET', '/api/teachers/:id', ({ p }) => [200, store.getTeacher(p.id)]);
  on('POST', '/api/teachers/:id/verify', ({ p }) => [200, store.verifyTeacher(p.id)]);
  on('POST', '/api/teachers/:id/follow', ({ p, body }) => [200, store.follow(body.teacherId, p.id)]);
  on('GET', '/api/teachers/:id/bookmarks', ({ p }) => [200, store.bookmarks(p.id)]);

  on('POST', '/api/videos', ({ body }) => [201, store.uploadVideo(body)]);
  on('GET', '/api/feed', ({ q }) => [200, store.feed({ teacherId: q.get('teacherId') || '', concept: q.get('concept') })]);
  on('POST', '/api/videos/:id/view', ({ p }) => [200, store.view(p.id)]);
  on('POST', '/api/videos/:id/like', ({ p, body }) => [200, store.like(p.id, body.teacherId)]);
  on('DELETE', '/api/videos/:id/like', ({ p, q }) => [200, store.unlike(p.id, q.get('teacherId'))]);
  on('POST', '/api/videos/:id/comments', ({ p, body }) => [201, store.comment(p.id, body)]);
  on('POST', '/api/videos/:id/bookmark', ({ p, body }) => [200, store.bookmark(p.id, body.teacherId)]);

  on('GET', '/api/resources', ({ q }) => [200, store.searchResources({ q: q.get('q') || '', type: q.get('type'), subject: q.get('subject') })]);
  on('POST', '/api/resources', ({ body }) => [201, store.addResource(body)]);
  on('POST', '/api/resources/:id/coauthors', ({ p, body }) => [200, store.addCoAuthor(p.id, body.teacherId)]);

  on('GET', '/api/collections', () => [200, store.collections()]);
  on('POST', '/api/collections', ({ body }) => [201, store.createCollection(body)]);

  on('POST', '/api/ai/extract', ({ body }) => [200, ai.extract(body)]);
  on('POST', '/api/ai/generate', ({ body }) => [200, ai.generate(body.format, body)]);
  on('GET', '/api/ai/formats', () => [200, ai.FORMATS]);

  on('POST', '/api/reports', ({ body }) => [201, store.report(body)]);
  on('GET', '/api/admin/reports', () => [200, store.reports()]);
  on('POST', '/api/admin/reports/:id/takedown', ({ p }) => [200, store.takedown(p.id)]);
  on('GET', '/api/analytics', () => [200, store.analytics()]);

  const publicDir = path.join(__dirname, '..', 'public');
  return http.createServer((rq, rs) => {
    const send = (code, data, type = 'application/json') => { rs.writeHead(code, { 'Content-Type': type }); rs.end(type === 'application/json' ? JSON.stringify(data) : data); };
    const url = new URL(rq.url, 'http://localhost');
    if (!url.pathname.startsWith('/api/')) {
      if (rq.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) return send(200, fs.readFileSync(path.join(publicDir, 'index.html')), 'text/html');
      return send(404, { error: 'not found' });
    }
    let raw = '';
    rq.on('data', (c) => { raw += c; if (raw.length > 5e6) rq.destroy(); });
    rq.on('end', () => {
      try {
        const route = routes.map((r) => ({ r, m: r.method === rq.method && r.re.exec(url.pathname) })).find((x) => x.m);
        if (!route) return send(404, { error: 'not found' });
        let body = {};
        if (raw) { try { body = JSON.parse(raw); } catch { return send(400, { error: 'invalid JSON' }); } }
        const [code, data] = route.r.fn({ p: route.m.groups || {}, q: url.searchParams, body });
        send(code, data);
      } catch (e) { send(e.status || 500, { error: e.status ? e.message : 'internal error' }); }
    });
  });
}

if (require.main === module) {
  const port = process.env.PORT || 3000;
  createServer().listen(port, () => console.log(`Teach-Tok listening on http://localhost:${port}`));
}
module.exports = { createServer };
