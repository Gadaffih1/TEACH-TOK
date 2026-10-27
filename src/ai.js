'use strict';
// AI Document Studio & Presentation Studio.
// Deterministic, offline generators; swap `generate` for an LLM call in production.
const FORMATS = ['summary', 'slides', 'lesson-plan', 'script', 'quiz', 'worksheet', 'video-outline'];

function sentences(text) {
  return String(text).replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
}
function keyTerms(text, n = 5) {
  const stop = new Set('the a an and or of to in is are was for on with as by it this that from be at'.split(' '));
  const freq = {};
  for (const w of String(text).toLowerCase().match(/[a-z]{4,}/g) || []) if (!stop.has(w)) freq[w] = (freq[w] || 0) + 1;
  return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, n).map(([w]) => w);
}

function generateOffline(format, { topic, text }) {
  const source = text || topic || '';
  if (!source.trim()) throw Object.assign(new Error('topic or text is required'), { status: 400 });
  const title = topic || sentences(source)[0].slice(0, 60);
  const sents = sentences(source);
  const terms = keyTerms(source);
  switch (format) {
    case 'summary': return { title, summary: sents.slice(0, 3).join(' '), keyTerms: terms };
    case 'slides': return { title, slides: [
      { title, bullets: ['Learning objectives'], speakerNotes: `Introduce ${title}.` },
      ...sents.slice(0, 5).map((s, i) => ({ title: `Point ${i + 1}`, bullets: [s], speakerNotes: `Explain: ${s}` })),
      { title: 'Recap', bullets: terms, speakerNotes: 'Review the key terms.' }] };
    case 'lesson-plan': return { title, objectives: terms.map((t) => `Explain ${t}`),
      stages: [{ name: 'Hook', minutes: 5 }, { name: 'Direct teaching', minutes: 15 }, { name: 'Guided practice', minutes: 15 }, { name: 'Assessment', minutes: 10 }],
      materials: ['Board', 'Worksheet'], content: sents.slice(0, 5) };
    case 'script': return { title, script: [`Today we explore ${title}.`, ...sents.slice(0, 4), 'Now try it yourself!'].join(' ') };
    case 'quiz': return { title, questions: terms.map((t) => ({ question: `Which statement best describes "${t}"?`,
      answer: sents.find((s) => s.toLowerCase().includes(t)) || `Define ${t} in your own words.` })) };
    case 'worksheet': return { title, exercises: terms.map((t, i) => `${i + 1}. Explain "${t}" and give an example.`) };
    case 'video-outline': return { title, durationSeconds: 60, scenes: [
      { scene: 'Hook', text: `Why does ${title} matter?` }, ...sents.slice(0, 3).map((s) => ({ scene: 'Demonstrate', text: s })), { scene: 'Recap', text: terms.join(', ') }] };
    default: throw Object.assign(new Error(`unknown format; use one of ${FORMATS.join(', ')}`), { status: 400 });
  }
}

const { extractFile: extract } = require('./extract');
const { llmConfig, generateWithLLM } = require('./llm');

// Uses the configured LLM when available; falls back to the offline generator on any failure.
async function generate(format, input, { llm = llmConfig() } = {}) {
  const offline = () => generateOffline(format, input); // validates format and input first
  const base = offline();
  if (!llm) return { ...base, source: 'offline' };
  try { return { ...(await generateWithLLM(llm, format, input)), source: 'llm' }; }
  catch (e) { console.warn('LLM generation failed, using offline fallback:', e.message); return { ...base, source: 'offline' }; }
}

module.exports = { generate, extract, FORMATS };
