'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createStore } = require('./store');
const ai = require('./ai');

function createServer(store = createStore(), { adminToken = process.env.ADMIN_TOKEN } = {}) {
  const fail = (status, message) => Object.assign(new Error(message), { status });
  const same = (a, b) => { const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && crypto.timingSafeEqual(x, y); };
  const isAdmin = (h) => !!adminToken && same(bearer(h), adminToken);
  const bearer = (h) => (/^bearer /i.test(h) ? h.slice(7) : '');
  const me = ({ auth }) => { const t = store.teacherForToken(bearer(auth)); if (!t) throw fail(401, 'authentication required'); return t; };
  const admin = ({ auth }) => { if (!isAdmin(auth)) throw fail(403, 'admin only'); };
  const routes = [];
  const on = (method, pattern, fn) => routes.push({ method, re: new RegExp('^' + pattern.replace(/:(\w+)/g, '(?<$1>[^/]+)') + '$'), fn });

  on('POST', '/api/teachers', ({ body }) => { const t = store.createTeacher(body); return [201, { ...t, token: store.issueToken(t.id) }]; });
  on('GET', '/api/teachers/:id', ({ p }) => [200, store.getTeacher(p.id)]);
  on('POST', '/api/teachers/:id/verify', (c) => { admin(c); return [200, store.verifyTeacher(c.p.id)]; });
  on('POST', '/api/teachers/:id/follow', (c) => [200, store.follow(me(c), c.p.id)]);
  on('GET', '/api/bookmarks', (c) => [200, store.bookmarks(me(c))]);

  on('POST', '/api/videos', (c) => [201, store.uploadVideo({ ...c.body, teacherId: me(c) })]);
  on('GET', '/api/feed', (c) => [200, store.feed({ teacherId: store.teacherForToken(bearer(c.auth)) || '', concept: c.q.get('concept') })]);
  on('POST', '/api/videos/:id/view', ({ p }) => [200, store.view(p.id)]);
  on('POST', '/api/videos/:id/like', (c) => [200, store.like(c.p.id, me(c))]);
  on('DELETE', '/api/videos/:id/like', (c) => [200, store.unlike(c.p.id, me(c))]);
  on('POST', '/api/videos/:id/comments', (c) => [201, store.comment(c.p.id, { ...c.body, teacherId: me(c) })]);
  on('POST', '/api/videos/:id/bookmark', (c) => [200, store.bookmark(c.p.id, me(c))]);

  on('GET', '/api/resources', ({ q }) => [200, store.searchResources({ q: q.get('q') || '', type: q.get('type'), subject: q.get('subject') })]);
  on('POST', '/api/resources', (c) => [201, store.addResource({ ...c.body, teacherId: me(c) })]);
  on('POST', '/api/resources/:id/coauthors', (c) => [200, store.addCoAuthor(c.p.id, c.body.teacherId, me(c))]);

  on('GET', '/api/collections', () => [200, store.collections()]);
  on('POST', '/api/collections', (c) => { admin(c); return [201, store.createCollection(c.body)]; });

  on('POST', '/api/ai/extract', ({ body }) => [200, ai.extract(body)]);
  on('POST', '/api/ai/generate', ({ body }) => [200, ai.generate(body.format, body)]);
  on('GET', '/api/ai/formats', () => [200, ai.FORMATS]);

  on('POST', '/api/reports', (c) => { me(c); return [201, store.report(c.body)]; });
  on('GET', '/api/admin/reports', (c) => { admin(c); return [200, store.reports()]; });
  on('POST', '/api/admin/reports/:id/takedown', (c) => { admin(c); return [200, store.takedown(c.p.id)]; });
  on('GET', '/api/analytics', (c) => { admin(c); return [200, store.analytics()]; });

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
        const [code, data] = route.r.fn({ p: route.m.groups || {}, q: url.searchParams, body, auth: rq.headers.authorization || '' });
        send(code, data);
      } catch (e) { send(e.status || 500, { error: e.status ? e.message : 'internal error' }); }
    });
  });
}

if (require.main === module) {
  const port = process.env.PORT || 3000;
  if (!process.env.ADMIN_TOKEN) console.warn('ADMIN_TOKEN not set: admin endpoints are disabled');
  createServer(createStore({ file: process.env.DATA_FILE || path.join(__dirname, '..', 'data.json') })).listen(port, () => console.log(`Teach-Tok listening on http://localhost:${port}`));
}
module.exports = { createServer };
