'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createStore } = require('./store');
const ai = require('./ai');

const VIDEO_TYPES = { 'video/mp4': '.mp4', 'video/webm': '.webm', 'video/quicktime': '.mov' };
const MIME = Object.fromEntries(Object.entries(VIDEO_TYPES).map(([m, e]) => [e, m]));
const MAX_VIDEO_BYTES = 200 * 1024 * 1024;

function createServer(store = createStore(), { adminToken = process.env.ADMIN_TOKEN, uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads'), maxVideoBytes = MAX_VIDEO_BYTES } = {}) {
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
    const authed = () => store.teacherForToken((/^bearer /i.test(rq.headers.authorization || '') ? rq.headers.authorization.slice(7) : ''));

    if (rq.method === 'POST' && url.pathname === '/api/uploads') {
      if (!authed()) return send(401, { error: 'authentication required' });
      const type = String(rq.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
      if (!VIDEO_TYPES[type]) return send(415, { error: 'unsupported type; use mp4, webm or quicktime' });
      if (Number(rq.headers['content-length']) > maxVideoBytes) return send(413, { error: 'file too large' });
      fs.mkdirSync(uploadDir, { recursive: true });
      const name = crypto.randomBytes(16).toString('hex') + VIDEO_TYPES[type];
      const dest = path.join(uploadDir, name);
      const out = fs.createWriteStream(dest, { flags: 'wx', mode: 0o600 });
      let size = 0, done = false;
      const abort = (code, msg) => { if (done) return; done = true; out.destroy(); fs.rm(dest, { force: true }, () => {}); send(code, { error: msg }); };
      rq.on('data', (c) => { size += c.length; if (size > maxVideoBytes) { rq.unpipe(out); abort(413, 'file too large'); rq.resume(); } });
      rq.on('error', () => abort(400, 'upload failed'));
      out.on('error', () => abort(500, 'upload failed'));
      out.on('finish', () => { if (done) return; done = true; if (!size) { fs.rm(dest, { force: true }, () => {}); return send(400, { error: 'empty upload' }); } send(201, { url: '/uploads/' + name, bytes: size }); });
      return rq.pipe(out);
    }
    if (rq.method === 'GET' && url.pathname.startsWith('/uploads/')) {
      const name = url.pathname.slice('/uploads/'.length);
      if (!/^[a-f0-9]{32}\.(mp4|webm|mov)$/.test(name)) return send(404, { error: 'not found' });
      const file = path.join(uploadDir, name);
      fs.stat(file, (err, st) => {
        if (err) return send(404, { error: 'not found' });
        const headers = { 'Content-Type': MIME[path.extname(name)], 'Accept-Ranges': 'bytes', 'X-Content-Type-Options': 'nosniff' };
        const m = /^bytes=(\d*)-(\d*)$/.exec(rq.headers.range || '');
        let start = 0, end = st.size - 1, code = 200;
        if (m && (m[1] || m[2])) {
          if (m[1]) { start = +m[1]; if (m[2]) end = Math.min(+m[2], end); } else { start = Math.max(0, st.size - +m[2]); }
          if (start > end || start >= st.size) { rs.writeHead(416, { 'Content-Range': `bytes */${st.size}` }); return rs.end(); }
          code = 206; headers['Content-Range'] = `bytes ${start}-${end}/${st.size}`;
        }
        headers['Content-Length'] = end - start + 1;
        rs.writeHead(code, headers);
        fs.createReadStream(file, { start, end }).pipe(rs);
      });
      return;
    }
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
