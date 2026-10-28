import { useEffect, useRef, useState } from 'react';
import type React from 'react';

export type SwipeDirection = 1 | -1;

interface UseVerticalSwipeOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  onNavigate: (direction: SwipeDirection) => void;
  enabled: boolean;
  canPrev: boolean;
  canNext: boolean;
  thresholdPx?: number;
  wheelLockMs?: number;
}

const INTERACTIVE_SELECTOR = '[data-no-swipe], button, a, input, textarea, select';
const DRAG_START_PX = 8;
const VELOCITY_PX_PER_MS = 0.5;

/**
 * Touch / mouse drag (pointer events) and wheel handling for a vertical feed.
 * Swipe up (negative dy) => direction 1 (next); swipe down => direction -1 (previous).
 */
export function useVerticalSwipe({
  containerRef,
  onNavigate,
  enabled,
  canPrev,
  canNext,
  thresholdPx = 60,
  wheelLockMs = 700,
}: UseVerticalSwipeOptions) {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef({ active: false, captured: false, startY: 0, startT: 0 });
  const didDrag = useRef(false);
  const wheelLockUntil = useRef(0);

  const latest = useRef({ onNavigate, enabled, canPrev, canNext, thresholdPx });
  latest.current = { onNavigate, enabled, canPrev, canNext, thresholdPx };

  const resist = (dy: number) => {
    const { canPrev: cp, canNext: cn } = latest.current;
    if ((dy > 0 && !cp) || (dy < 0 && !cn)) return Math.sign(dy) * Math.min(80, Math.abs(dy) * 0.3);
    return dy;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (!latest.current.enabled || (e.pointerType === 'mouse' && e.button !== 0)) return;
    if ((e.target as HTMLElement).closest(INTERACTIVE_SELECTOR)) return;
    drag.current = { active: true, captured: false, startY: e.clientY, startT: performance.now() };
    didDrag.current = false;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d.active) return;
    const dy = e.clientY - d.startY;
    if (!d.captured && Math.abs(dy) > DRAG_START_PX) {
      d.captured = true;
      didDrag.current = true;
      setIsDragging(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
    if (d.captured) setOffset(resist(dy));
  };

  const finish = (e: React.PointerEvent<HTMLElement>, cancelled: boolean) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    if (!d.captured) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    const dy = e.clientY - d.startY;
    const velocity = dy / Math.max(1, performance.now() - d.startT);
    setIsDragging(false);
    setOffset(0);
    if (cancelled) return;
    const { thresholdPx: th, onNavigate: nav } = latest.current;
    if (dy <= -th || (velocity < -VELOCITY_PX_PER_MS && dy < -20)) nav(1);
    else if (dy >= th || (velocity > VELOCITY_PX_PER_MS && dy > 20)) nav(-1);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!latest.current.enabled) return;
      if ((e.target as HTMLElement).closest('[data-no-swipe]')) return;
      e.preventDefault();
      const now = performance.now();
      if (now < wheelLockUntil.current || Math.abs(e.deltaY) < 20) return;
      wheelLockUntil.current = now + wheelLockMs;
      latest.current.onNavigate(e.deltaY > 0 ? 1 : -1);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [containerRef, wheelLockMs]);

  return {
    offset,
    isDragging,
    didDrag,
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp: (e: React.PointerEvent<HTMLElement>) => finish(e, false),
      onPointerCancel: (e: React.PointerEvent<HTMLElement>) => finish(e, true),
    },
  };
}
