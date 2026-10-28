import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TeachTokVideo } from '../types';
import { VideoSlide } from './VideoSlide';
import { useVerticalSwipe, SwipeDirection } from '../hooks/useVerticalSwipe';
import { BookOpen, ChevronUp, ChevronDown } from 'lucide-react';

interface VideoFeedProps {
  videos: TeachTokVideo[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isPaused?: boolean;
  onToggleLike: (videoId: string) => void;
  onToggleBookmark: (videoId: string) => void;
  onOpenResources: (video: TeachTokVideo) => void;
  onOpenComments: (video: TeachTokVideo) => void;
  onOpenAI: (video: TeachTokVideo) => void;
  onOpenRemix: (video: TeachTokVideo) => void;
}

const SLIDE_MS = 350;
const BOUNCE_PX = 40;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const VideoFeed: React.FC<VideoFeedProps> = ({
  videos,
  currentIndex,
  onNavigate,
  isMuted,
  onToggleMute,
  isPaused = false,
  onToggleLike,
  onToggleBookmark,
  onOpenResources,
  onOpenComments,
  onOpenAI,
  onOpenRemix,
}) => {
  const count = videos.length;
  const currentVideo = videos[currentIndex] || videos[0];
  const [isPlaying, setIsPlaying] = useState(true);
  const [bounce, setBounce] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lockUntil = useRef(0);

  const canWrap = count >= 3;
  const canNext = count > 1;
  const canPrev = currentIndex > 0;

  const slideMs = prefersReducedMotion() ? 0 : SLIDE_MS;

  useEffect(() => {
    setIsPlaying(true);
  }, [currentVideo?.id]);

  const navigate = useCallback(
    (direction: SwipeDirection) => {
      const now = performance.now();
      if (now < lockUntil.current) return;
      let target = currentIndex + direction;
      if (direction === 1 && target >= count) {
        if (canWrap) {
          target = 0;
          setLeavingIndex(currentIndex);
          setTimeout(() => setLeavingIndex(null), SLIDE_MS + 100);
        } else {
          target = -1;
        }
      }
      if (target < 0 || target >= count || target === currentIndex) {
        if (count > 0 && !prefersReducedMotion()) {
          setBounce(direction === 1 ? -BOUNCE_PX : BOUNCE_PX);
          setTimeout(() => setBounce(0), 180);
          lockUntil.current = now + 300;
        }
        return;
      }
      lockUntil.current = now + slideMs + 50;
      onNavigate(target);
    },
    [currentIndex, count, canWrap, slideMs, onNavigate]
  );

  const swipe = useVerticalSwipe({
    containerRef,
    onNavigate: navigate,
    enabled: count > 0 && !isPaused,
    canPrev,
    canNext,
  });

  // Keyboard navigation
  useEffect(() => {
    if (isPaused) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (['ArrowDown', 'j', 'J'].includes(e.key)) {
        e.preventDefault();
        navigate(1);
      } else if (['ArrowUp', 'k', 'K'].includes(e.key)) {
        e.preventDefault();
        navigate(-1);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, isPaused]);

  if (!currentVideo) {
    return (
      <div className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center text-center p-6 text-slate-400">
        <BookOpen className="w-12 h-12 text-indigo-400 mb-3 opacity-60" />
        <h3 className="text-lg font-bold text-white">No concept videos found</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          Try clearing your search query or selecting "All Concepts" from the category bar.
        </p>
      </div>
    );
  }

  // Only render previous, current and next slides
  const visible: { index: number; rel: number }[] = [{ index: currentIndex, rel: 0 }];
  if (currentIndex > 0) visible.push({ index: currentIndex - 1, rel: -1 });
  if (currentIndex + 1 < count) visible.push({ index: currentIndex + 1, rel: 1 });
  else if (canWrap) visible.push({ index: 0, rel: 1 });
  if (leavingIndex !== null && !visible.some((v) => v.index === leavingIndex)) {
    visible.push({ index: leavingIndex, rel: -1 });
  }

  const totalOffset = swipe.offset + bounce;

  return (
    <div className="relative w-full h-[calc(100vh-7rem)] max-w-md mx-auto flex items-center justify-center select-none">
      {/* Main TikTok Video Phone Screen Container */}
      <div
        ref={containerRef}
        {...swipe.bind}
        style={{ touchAction: 'none', overscrollBehavior: 'contain' }}
        className="relative w-full h-full max-h-[780px] bg-slate-950 rounded-3xl border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {visible.map(({ index, rel }) => {
          const video = videos[index];
          return (
            <div
              key={video.id}
              className="absolute inset-0"
              style={{
                transform: `translateY(calc(${rel * 100}% + ${totalOffset}px))`,
                transition: swipe.isDragging ? 'none' : `transform ${slideMs}ms ease-out`,
                willChange: 'transform',
              }}
            >
              <VideoSlide
                video={video}
                isActive={rel === 0 && index === currentIndex}
                isPlaying={isPlaying}
                isMuted={isMuted}
                isPaused={isPaused}
                onTogglePlay={() => {
                  if (swipe.didDrag.current) return;
                  setIsPlaying((p) => !p);
                }}
                onToggleMute={onToggleMute}
                onToggleLike={onToggleLike}
                onToggleBookmark={onToggleBookmark}
                onOpenResources={onOpenResources}
                onOpenComments={onOpenComments}
                onOpenAI={onOpenAI}
                onOpenRemix={onOpenRemix}
              />
            </div>
          );
        })}
      </div>

      {/* Floating Vertical Navigation Arrows (for desktop and easy navigation) */}
      <div className="hidden lg:flex flex-col gap-2 absolute -right-16 top-1/2 -translate-y-1/2 z-30">
        <button
          onClick={() => navigate(-1)}
          disabled={!canPrev}
          className="w-11 h-11 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-indigo-600 hover:border-indigo-500 flex items-center justify-center shadow-lg transition"
          title="Previous Concept (Up Arrow)"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        <div className="text-[10px] font-mono font-bold text-slate-400 text-center py-1 bg-slate-950/80 rounded-lg border border-slate-800">
          {currentIndex + 1} / {count}
        </div>

        <button
          onClick={() => navigate(1)}
          disabled={!canNext}
          className="w-11 h-11 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-indigo-600 hover:border-indigo-500 flex items-center justify-center shadow-lg transition"
          title="Next Concept (Down Arrow)"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
