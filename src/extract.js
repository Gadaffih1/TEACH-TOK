'use strict';
// Dependency-free text extraction for DOCX, PPTX, PDF and (via the optional
// `tesseract` CLI) images.
const zlib = require('zlib');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFile } = require('child_process');

const MAX_INFLATED = 20 * 1024 * 1024;
const err = (status, msg) => Object.assign(new Error(msg), { status });
const inflate = (buf) => zlib.inflateRawSync(buf, { maxOutputLength: MAX_INFLATED });

function readZip(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw err(400, 'not a valid Office document');
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const files = new Map();
  for (let n = 0; n < count; n++) {
    if (p + 46 > buf.length || buf.readUInt32LE(p) !== 0x02014b50) throw err(400, 'corrupt document');
    const method = buf.readUInt16LE(p + 10), csize = buf.readUInt32LE(p + 20);
    const nlen = buf.readUInt16LE(p + 28), elen = buf.readUInt16LE(p + 30), clen = buf.readUInt16LE(p + 32);
    const off = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nlen);
    files.set(name, () => {
      const start = off + 30 + buf.readUInt16LE(off + 26) + buf.readUInt16LE(off + 28);
      const data = buf.subarray(start, start + csize);
      if (method === 0) return data;
      if (method === 8) return inflate(data);
      throw err(400, 'unsupported compression');
    });
    p += 46 + nlen + elen + clen;
  }
  return files;
}

const unxml = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d)).replace(/&amp;/g, '&');

// Text inside <tag>…</tag> runs; a paragraph close inserts a newline.
function xmlText(xml, runTag, paraEnd) {
  const out = [];
  const re = new RegExp(`<${runTag}(?:\\s[^>]*)?>([^<]*)</${runTag}>|</${paraEnd}>`, 'g');
  let m;
  while ((m = re.exec(xml))) out.push(m[1] === undefined ? '\n' : unxml(m[1]));
  return out.join('').replace(/\n{3,}/g, '\n\n').trim();
}

function docx(buf) {
  const f = readZip(buf).get('word/document.xml');
  if (!f) throw err(400, 'not a DOCX document');
  return xmlText(f().toString('utf8'), 'w:t', 'w:p');
}
function pptx(buf) {
  const files = readZip(buf);
  const slides = [...files.keys()].filter((k) => /^ppt\/slides\/slide\d+\.xml$/.test(k))
    .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));
  if (!slides.length) throw err(400, 'not a PPTX document');
  return slides.map((k, i) => `Slide ${i + 1}\n` + xmlText(files.get(k)().toString('utf8'), 'a:t', 'a:p')).join('\n\n');
}

function pdfString(s) {
  return s.replace(/\\([nrtbf()\\]|[0-7]{1,3}|\r?\n)/g, (_, c) => {
    if (/^[0-7]/.test(c)) return String.fromCharCode(parseInt(c, 8));
    return { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f' }[c] ?? (/^\r?\n$/.test(c) ? '' : c);
  });
}
function pdf(buf) {
  if (buf.subarray(0, 5).toString('latin1') !== '%PDF-') throw err(400, 'not a PDF document');
  const raw = buf.toString('latin1');
  const parts = [];
  const re = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
  let m;
  while ((m = re.exec(raw))) {
    let data = Buffer.from(m[1], 'latin1');
    try { data = zlib.inflateSync(data, { maxOutputLength: MAX_INFLATED }); } catch { /* may be uncompressed */ }
    const text = data.toString('latin1');
    if (!text.includes('BT')) continue;
    for (const bt of text.matchAll(/BT([\s\S]*?)ET/g)) {
      const line = [];
      for (const t of bt[1].matchAll(/\[((?:[^\]\\]|\\.)*)\]\s*TJ|\(((?:[^()\\]|\\.)*)\)\s*(?:Tj|'|")/g)) {
        if (t[2] !== undefined) line.push(pdfString(t[2]));
        else for (const s of t[1].matchAll(/\(((?:[^()\\]|\\.)*)\)/g)) line.push(pdfString(s[1]));
      }
      if (line.length) parts.push(line.join(''));
    }
  }
  const text = parts.join('\n').trim();
  if (!text) throw err(422, 'no extractable text found (scanned or custom-encoded PDF); try OCR or paste the text');
  return text;
}

const IMAGE_EXT = new Set(['png', 'jpg', 'jpeg', 'tif', 'tiff', 'bmp', 'gif', 'webp']);
function ocr(buf, ext) {
  return new Promise((resolve, reject) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ocr-'));
    const file = path.join(dir, 'in.' + ext);
    const done = (e, v) => { fs.rmSync(dir, { recursive: true, force: true }); e ? reject(e) : resolve(v); };
    fs.writeFileSync(file, buf);
    execFile(process.env.TESSERACT_BIN || 'tesseract', [file, 'stdout'], { timeout: 60000, maxBuffer: 5e6 }, (e, out) => {
      if (e && e.code === 'ENOENT') return done(err(501, 'image OCR requires the tesseract CLI on the server'));
      if (e) return done(err(422, 'could not read text from image'));
      done(null, out.trim());
    });
  });
}

async function extractFile({ filename = '', content = '', contentBase64 }) {
  const ext = String(filename).split('.').pop().toLowerCase();
  const text = (t) => ({ filename, text: t });
  if (contentBase64 === undefined) {
    if (['txt', 'md', 'csv', ''].includes(ext)) return text(String(content));
    throw err(400, 'send binary files as contentBase64');
  }
  if (typeof contentBase64 !== 'string' || !/^[A-Za-z0-9+/=\s]*$/.test(contentBase64)) throw err(400, 'contentBase64 must be base64');
  const buf = Buffer.from(contentBase64, 'base64');
  if (!buf.length) throw err(400, 'empty file');
  if (ext === 'docx') return text(docx(buf));
  if (ext === 'pptx') return text(pptx(buf));
  if (ext === 'pdf') return text(pdf(buf));
  if (IMAGE_EXT.has(ext)) return text(await ocr(buf, ext));
  if (['doc', 'ppt'].includes(ext)) throw err(415, 'legacy .doc/.ppt are not supported; save as .docx/.pptx');
  throw err(415, `.${ext} is not supported`);
}
module.exports = { extractFile };
