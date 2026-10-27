'use strict';
// In-memory data store and domain logic for all Teach-Tok modules.
const crypto = require('crypto');
const id = () => crypto.randomUUID();
const now = () => new Date().toISOString();

function createStore() {
  const db = {
    teachers: new Map(), videos: new Map(), resources: new Map(),
    collections: new Map(), reports: [], follows: new Set(), bookmarks: new Set(),
    likes: new Set(), views: new Map(), participation: new Map(),
  };
  const need = (map, key, what) => {
    const v = map.get(key);
    if (!v) throw Object.assign(new Error(`${what} not found`), { status: 404 });
    return v;
  };
  const bad = (msg) => Object.assign(new Error(msg), { status: 400 });
  const req = (obj, fields) => {
    for (const f of fields) if (obj[f] === undefined || obj[f] === null || obj[f] === '') throw bad(`${f} is required`);
  };
  const badges = (tid) => {
    const n = db.participation.get(tid) || 0;
    return [[1, 'First Step'], [5, 'Active Contributor'], [20, 'Community Champion']].filter(([m]) => n >= m).map(([, b]) => b);
  };
  const participate = (tid) => db.participation.set(tid, (db.participation.get(tid) || 0) + 1);

  return {
    // Teacher accounts
    createTeacher(b) {
      req(b, ['name', 'school']);
      const t = { id: id(), name: b.name, school: b.school, subjects: b.subjects || [], verified: false, createdAt: now() };
      db.teachers.set(t.id, t);
      return t;
    },
    getTeacher(tid) { return { ...need(db.teachers, tid, 'teacher'), badges: badges(tid) }; },
    verifyTeacher(tid) { need(db.teachers, tid, 'teacher').verified = true; return db.teachers.get(tid); },
    // Video feed & upload studio
    uploadVideo(b) {
      req(b, ['teacherId', 'title', 'concept', 'videoUrl']);
      need(db.teachers, b.teacherId, 'teacher');
      const v = { id: id(), teacherId: b.teacherId, title: b.title, concept: b.concept, subject: b.subject || '',
        caption: b.caption || '', videoUrl: b.videoUrl, comments: [], status: 'published', createdAt: now() };
      db.videos.set(v.id, v);
      participate(b.teacherId);
      return v;
    },
    feed({ teacherId, concept } = {}) {
      const followed = new Set([...db.follows].filter((k) => k.startsWith(teacherId + ':')).map((k) => k.split(':')[1]));
      const score = (v) => (followed.has(v.teacherId) ? 1000 : 0) + this.videoStats(v.id).likes * 10 + (db.views.get(v.id) || 0);
      return [...db.videos.values()]
        .filter((v) => v.status === 'published' && (!concept || v.concept.toLowerCase() === concept.toLowerCase()))
        .sort((a, b) => score(b) - score(a))
        .map((v) => ({ ...v, stats: this.videoStats(v.id) }));
    },
    videoStats(vid) {
      const likes = [...db.likes].filter((k) => k.endsWith(':' + vid)).length;
      return { likes, comments: need(db.videos, vid, 'video').comments.length, views: db.views.get(vid) || 0 };
    },
    view(vid) { need(db.videos, vid, 'video'); db.views.set(vid, (db.views.get(vid) || 0) + 1); return this.videoStats(vid); },
    like(vid, tid) { need(db.videos, vid, 'video'); need(db.teachers, tid, 'teacher'); db.likes.add(`${tid}:${vid}`); return this.videoStats(vid); },
    unlike(vid, tid) { db.likes.delete(`${tid}:${vid}`); return this.videoStats(vid); },
    comment(vid, b) {
      req(b, ['teacherId', 'text']);
      need(db.teachers, b.teacherId, 'teacher');
      const c = { id: id(), teacherId: b.teacherId, text: b.text, createdAt: now() };
      need(db.videos, vid, 'video').comments.push(c);
      participate(b.teacherId);
      return c;
    },
    bookmark(vid, tid) { need(db.videos, vid, 'video'); need(db.teachers, tid, 'teacher'); db.bookmarks.add(`${tid}:${vid}`); return { saved: true }; },
    bookmarks(tid) { return [...db.bookmarks].filter((k) => k.startsWith(tid + ':')).map((k) => db.videos.get(k.split(':')[1])); },
    follow(tid, target) {
      need(db.teachers, tid, 'teacher'); need(db.teachers, target, 'teacher');
      if (tid === target) throw bad('cannot follow yourself');
      db.follows.add(`${tid}:${target}`);
      return { following: true };
    },
    // Resource library & collaboration
    addResource(b) {
      req(b, ['teacherId', 'title', 'type']);
      need(db.teachers, b.teacherId, 'teacher');
      const r = { id: id(), teacherId: b.teacherId, title: b.title, type: b.type, subject: b.subject || '', content: b.content || '',
        downloadable: !!b.downloadable, coAuthors: [], status: 'published', createdAt: now() };
      db.resources.set(r.id, r);
      participate(b.teacherId);
      return r;
    },
    searchResources({ q = '', type, subject } = {}) {
      const s = q.toLowerCase();
      return [...db.resources.values()].filter((r) => r.status === 'published'
        && (!type || r.type === type) && (!subject || r.subject === subject)
        && (!s || `${r.title} ${r.content} ${r.subject}`.toLowerCase().includes(s)));
    },
    addCoAuthor(rid, tid) {
      need(db.teachers, tid, 'teacher');
      const r = need(db.resources, rid, 'resource');
      if (!r.coAuthors.includes(tid)) r.coAuthors.push(tid);
      return r;
    },
    // Professional development
    createCollection(b) {
      req(b, ['title']);
      const c = { id: id(), title: b.title, items: b.items || [], createdAt: now() };
      db.collections.set(c.id, c);
      return c;
    },
    collections() { return [...db.collections.values()]; },
    // Administration
    report(b) {
      req(b, ['targetType', 'targetId', 'reason']);
      const r = { id: id(), kind: b.kind === 'copyright' ? 'copyright' : 'content', targetType: b.targetType, targetId: b.targetId, reason: b.reason, status: 'open', createdAt: now() };
      db.reports.push(r);
      return r;
    },
    reports() { return db.reports; },
    takedown(reportId) {
      const r = db.reports.find((x) => x.id === reportId);
      if (!r) throw Object.assign(new Error('report not found'), { status: 404 });
      const target = (r.targetType === 'video' ? db.videos : db.resources).get(r.targetId);
      if (target) target.status = 'removed';
      r.status = 'resolved';
      return r;
    },
    // Analytics
    analytics() {
      const byConcept = {};
      for (const v of db.videos.values()) byConcept[v.concept] = (byConcept[v.concept] || 0) + 1;
      return {
        teachers: db.teachers.size, videos: db.videos.size, resources: db.resources.size,
        totalViews: [...db.views.values()].reduce((a, b) => a + b, 0), totalLikes: db.likes.size,
        popularConcepts: Object.entries(byConcept).sort((a, b) => b[1] - a[1]).map(([concept, videos]) => ({ concept, videos })),
        participation: [...db.participation].map(([teacherId, actions]) => ({ teacherId, actions })),
      };
    },
  };
}
module.exports = { createStore };
