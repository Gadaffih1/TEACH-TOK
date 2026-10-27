# TEACH-TOK
Teach-Tok is an app that works like TikTok, but is designed exclusively for teachers to share, demonstrate, discover and improve different ways of teaching concepts.   It’ll become a professional teaching community powered by AI where a teacher learns how  another teacher explains concepts through short videos and interactive teaching resources. 


## Running
```
npm start     # http://localhost:3000 (no dependencies, Node 18+)
npm test
```
## Modules (REST API under `/api`)
Teacher accounts & verification, video feed (like/comment/bookmark/follow/views),
upload studio, AI Document & Presentation Studio (`/ai/extract`, `/ai/generate` for
summary, slides, lesson-plan, script, quiz, worksheet, video-outline), resource library
with co-authoring, collections & badges, moderation/copyright reports, analytics.
Data is in-memory and AI generation is a deterministic offline stand-in ready to be
replaced by an LLM provider.

## Authentication
`POST /api/teachers` returns a `token`; send it in the `Authorization` header using the
`Bearer` scheme. Actions like upload, like, comment, bookmark, follow and adding resources
act as the token's teacher. Admin endpoints (verify, reports, takedown, analytics,
collections) need the admin token; start the server with `ADMIN_TOKEN=... npm start`.

## Persistence
Data (including hashed auth tokens) is saved to a JSON file after every change and
reloaded on start. Default `data.json` in the repo root; override with `DATA_FILE=/path`.

## Video upload
`POST /api/uploads` (auth required) with the raw video as the body and `Content-Type`
`video/mp4`, `video/webm` or `video/quicktime` (max 200 MB) returns `{ url }`. Pass that
`url` as `videoUrl` to `POST /api/videos`. Files are stored in `uploads/` (override with
`UPLOAD_DIR`) and streamed from `/uploads/<name>` with range support. No transcoding or
virus scanning is done.

## Document extraction
`POST /api/ai/extract` with `{ filename, contentBase64 }` supports `.docx`, `.pptx` and
`.pdf` (no dependencies), plus images via OCR when the `tesseract` CLI is installed
(`TESSERACT_BIN` to override; otherwise 501). Plain `.txt/.md/.csv` can still use `content`.
PDF extraction handles text-based PDFs only; scanned or custom-font PDFs return 422.
Legacy `.doc`/`.ppt` are not supported. Feed the returned `text` to `/api/ai/generate`.

## Real LLM for the AI Studio
Set `LLM_API_KEY` (and optionally `LLM_BASE_URL`, default OpenAI; `LLM_MODEL`, default
`gpt-4o-mini`) to use any OpenAI-compatible chat-completions API. `POST /api/ai/generate`
now requires a teacher token; the response includes `source: "llm"` or `"offline"`.
If the LLM call fails or returns invalid JSON, the built-in offline generator is used.
Input is truncated to 20,000 characters. Output shape follows the model's JSON and is
not strictly schema-validated.
