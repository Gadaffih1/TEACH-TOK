# TEACH-TOK
Teach-Tok is an app that works like TikTok, but is designed exclusively for teachers to share, demonstrate, discover and improve different ways of teaching concepts.   It’ll become a professional teaching community powered by AI where a teacher learns how  another teacher explains concepts through short videos and interactive teaching resources. 

## Swipe feed & audio

- **TikTok-style feed:** swipe up/down (touch or mouse drag), use the mouse wheel / trackpad, the arrow keys (or `j`/`k`), or the chevron buttons. One gesture moves one slide with a smooth vertical slide animation (shortened/disabled with `prefers-reduced-motion`). At the end of the list the feed wraps to the first video; at the start it bounces back. Gestures that start on buttons, the action rail, or the open strategy panel are ignored; a tap still plays/pauses.
- **Audio:** videos with a `videoUrl` play real audio in a `<video>` element. Simulated videos are narrated with the Web Speech API (`narrationScript`, or `classroomHook` + `keyAnalogy`) over a subtle Web Audio ambient pad that varies by `visualStyle`. Audio stops when the slide changes, on pause, when muted, when the tab is hidden, or while a modal is open.
- **Mute:** the Navbar and in-feed volume buttons share one state.
- **Autoplay policy:** browsers block sound until the user interacts with the page. Until the first tap/click/key press, video falls back to muted playback and a "Tap for sound" hint is shown; sound starts after the first gesture.
