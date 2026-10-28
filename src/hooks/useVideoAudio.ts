import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { TeachTokVideo, VisualStyle } from '../types';

// ---- First user gesture tracking (browser autoplay policy) ----
let gestured = false;
let attached = false;
const gestureListeners = new Set<() => void>();
const GESTURE_EVENTS = ['pointerup', 'click', 'keydown', 'touchend'];

function attachGestureListeners() {
  if (attached || typeof window === 'undefined') return;
  attached = true;
  const handler = () => {
    gestured = true;
    GESTURE_EVENTS.forEach((ev) => window.removeEventListener(ev, handler));
    gestureListeners.forEach((l) => l());
  };
  GESTURE_EVENTS.forEach((ev) => window.addEventListener(ev, handler));
}

function subscribeGesture(cb: () => void) {
  attachGestureListeners();
  gestureListeners.add(cb);
  return () => {
    gestureListeners.delete(cb);
  };
}

export function useUserGesture(): boolean {
  return useSyncExternalStore(subscribeGesture, () => gestured, () => false);
}

function useTabHidden(): boolean {
  const [hidden, setHidden] = useState(() => typeof document !== 'undefined' && document.hidden);
  useEffect(() => {
    const onChange = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);
  return hidden;
}

// ---- Ambient pad (Web Audio) ----
const AMBIENT_CHORDS: Record<VisualStyle, number[]> = {
  fractions_visualizer: [261.6, 329.6, 392],
  mitosis_visualizer: [196, 246.9, 293.7],
  gravity_visualizer: [110, 164.8, 220],
  pythagorean_visualizer: [220, 277.2, 329.6],
  zombie_grammar_visualizer: [130.8, 155.6, 185],
  chemical_bonds_visualizer: [174.6, 220, 261.6],
  default: [220, 277.2, 330],
};

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctor: typeof AudioContext | undefined =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    audioCtx = new Ctor();
  }
  return audioCtx;
}

function startAmbient(style: VisualStyle): () => void {
  const ctx = getAudioContext();
  if (!ctx) return () => {};
  void ctx.resume().catch(() => {});
  const master = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 900;
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1);
  filter.connect(master);
  master.connect(ctx.destination);
  const oscs = (AMBIENT_CHORDS[style] ?? AMBIENT_CHORDS.default).map((freq, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = i === 0 ? 'triangle' : 'sine';
    osc.frequency.value = freq;
    osc.detune.value = (i - 1) * 4;
    g.gain.value = 0.02;
    osc.connect(g);
    g.connect(filter);
    osc.start();
    return osc;
  });
  return () => {
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(0, t + 0.12);
    setTimeout(() => {
      oscs.forEach((o) => {
        try {
          o.stop();
        } catch {
          /* ignore */
        }
        o.disconnect();
      });
      master.disconnect();
      filter.disconnect();
    }, 160);
  };
}

interface UseVideoAudioArgs {
  video: TeachTokVideo;
  isActive: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  isPaused?: boolean; // e.g. a modal is open
}

/**
 * Drives sound + progress for one slide:
 *  - videoUrl: controls a <video> element (attach `videoRef`)
 *  - audioUrl: plays an <audio> track
 *  - otherwise: speech narration (speechSynthesis) plus a Web Audio ambient pad
 */
export function useVideoAudio({ video, isActive, isPlaying, isMuted, isPaused = false }: UseVideoAudioArgs) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasGesture = useUserGesture();
  const tabHidden = useTabHidden();
  const [progress, setProgress] = useState(0);

  const { videoUrl, audioUrl, videoDuration, visualStyle } = video;
  const narrationText = video.narrationScript?.trim() || `${video.classroomHook} ${video.keyAnalogy}`;
  const shouldPlay = isActive && isPlaying && !isPaused && !tabHidden;
  const audible = shouldPlay && !isMuted && hasGesture;

  // Real <video> playback
  useEffect(() => {
    const el = videoRef.current;
    if (!videoUrl || !el) return;
    if (!isActive) {
      el.pause();
      try {
        el.currentTime = 0;
      } catch {
        /* ignore */
      }
      return;
    }
    if (!shouldPlay) {
      el.pause();
      return;
    }
    el.muted = isMuted;
    el.play().catch(() => {
      // Autoplay blocked: fall back to muted playback until the first user gesture
      el.muted = true;
      el.play().catch(() => {});
    });
  }, [videoUrl, isActive, shouldPlay, isMuted, hasGesture]);

  useEffect(() => {
    const el = videoRef.current;
    if (!videoUrl || !el || !isActive) return;
    const onTime = () => {
      if (el.duration > 0) setProgress(el.currentTime / el.duration);
    };
    el.addEventListener('timeupdate', onTime);
    return () => el.removeEventListener('timeupdate', onTime);
  }, [videoUrl, isActive]);

  // Simulated progress for non-video slides
  useEffect(() => {
    if (videoUrl) return;
    if (!isActive) {
      setProgress(0);
      return;
    }
    if (!shouldPlay) return;
    const step = 250;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + step / 1000 / Math.max(1, videoDuration);
        return next >= 1 ? 0 : next;
      });
    }, step);
    return () => clearInterval(id);
  }, [videoUrl, isActive, shouldPlay, videoDuration]);

  // Audio track
  useEffect(() => {
    if (videoUrl || !audioUrl || !audible) return;
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [videoUrl, audioUrl, audible]);

  // Speech narration
  useEffect(() => {
    if (videoUrl || audioUrl || !audible) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.rate = 0.95;
    utterance.volume = 1;
    synth.speak(utterance);
    return () => synth.cancel();
  }, [videoUrl, audioUrl, audible, narrationText]);

  // Ambient pad
  useEffect(() => {
    if (videoUrl || audioUrl || !audible) return;
    return startAmbient(visualStyle);
  }, [videoUrl, audioUrl, audible, visualStyle]);

  return {
    videoRef,
    progress,
    needsSoundHint: isActive && shouldPlay && !isMuted && !hasGesture,
  };
}
