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
