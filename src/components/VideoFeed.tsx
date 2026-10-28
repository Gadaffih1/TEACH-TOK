import React, { useState, useEffect } from 'react';
import { TeachTokVideo } from '../types';
import { ConceptVisualizer } from './conceptVisualizers';
import {
  Heart,
  MessageSquare,
  Bookmark,
  Share2,
  BookOpen,
  Sparkles,
  GitCompare,
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
  Volume2,
  VolumeX,
  Award,
  Check,
  Zap,
  Info,
  Maximize2
} from 'lucide-react';

interface VideoFeedProps {
  videos: TeachTokVideo[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  onToggleLike: (videoId: string) => void;
  onToggleBookmark: (videoId: string) => void;
  onOpenResources: (video: TeachTokVideo) => void;
  onOpenComments: (video: TeachTokVideo) => void;
  onOpenAI: (video: TeachTokVideo) => void;
  onOpenRemix: (video: TeachTokVideo) => void;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({
  videos,
  currentIndex,
  onNavigate,
  onToggleLike,
  onToggleBookmark,
  onOpenResources,
  onOpenComments,
  onOpenAI,
  onOpenRemix,
}) => {
  const currentVideo = videos[currentIndex] || videos[0];
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [showPedagogyBreakdown, setShowPedagogyBreakdown] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'j', 'J'].includes(e.key)) {
        if (currentIndex < videos.length - 1) onNavigate(currentIndex + 1);
      } else if (['ArrowUp', 'k', 'K'].includes(e.key)) {
        if (currentIndex > 0) onNavigate(currentIndex - 1);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, videos.length, onNavigate]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2000);
  };

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

  return (
    <div className="w-full flex flex-col gap-6 select-none">
    <div className="relative w-full h-[calc(100vh-7rem)] max-w-md mx-auto flex items-center justify-center">
      {/* Main TikTok Video Phone Screen Container */}
      <div className="relative w-full h-full max-h-[780px] bg-slate-950 rounded-3xl border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
        {/* Dynamic Concept Interactive Canvas / Video Simulation */}
        <div
          className="relative w-full flex-1 overflow-hidden cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <ConceptVisualizer
            style={currentVideo.visualStyle}
            isPlaying={isPlaying}
            concept={currentVideo.concept}
          />

          {/* Play/Pause indicator overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-slate-900/80 border border-white/20 flex items-center justify-center text-white backdrop-blur shadow-2xl">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
            </div>
          )}

          {/* Sound toggle button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/70 border border-slate-700/60 text-slate-200 hover:text-white backdrop-blur transition"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Teacher Subject & Standard Tag Header */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-1.5 max-w-[70%]">
            <span className="text-[10px] font-bold text-white bg-indigo-600/90 px-2 py-0.5 rounded-full backdrop-blur shadow-sm">
              {currentVideo.subject}
            </span>
            <span className="text-[10px] font-mono font-medium text-slate-300 bg-slate-900/80 border border-slate-700/60 px-2 py-0.5 rounded-full backdrop-blur">
              {currentVideo.gradeBand}
            </span>
            <span className="text-[9px] font-mono text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-500/30 backdrop-blur">
              {currentVideo.standardCode}
            </span>
          </div>

          {/* Pedagogical Technique Badge */}
          <div className="absolute top-12 left-4 z-20 mt-1">
            <div className="text-[10px] text-amber-300 font-semibold bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded-full backdrop-blur flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>{currentVideo.pedagogyTag}</span>
            </div>
          </div>
        </div>

        {/* Video Bottom Overlay: Concept information, Teacher info, Key Analogy */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pt-10 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-20 pointer-events-none">
          <div className="pointer-events-auto space-y-2 pr-14">
            {/* Teacher row */}
            <div className="flex items-center gap-2">
              <img
                src={currentVideo.teacher.avatar}
                alt={currentVideo.teacher.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500"
              />
              <div className="leading-tight">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-white">{currentVideo.teacher.name}</span>
                  <Award className="w-3 h-3 text-indigo-400" />
                </div>
                <span className="text-[10px] text-slate-400">
                  {currentVideo.teacher.role} • {currentVideo.teacher.school}
                </span>
              </div>
            </div>

            {/* Video Title & Concept */}
            <div>
              <h2 className="text-sm font-extrabold text-white leading-snug drop-shadow-sm">
                {currentVideo.title}
              </h2>
              <p className="text-xs text-slate-300 line-clamp-2 mt-0.5 leading-relaxed">
                {currentVideo.summary}
              </p>
            </div>

            {/* Interactive Concept Drawer Trigger */}
            <div className="pt-1">
              <button
                onClick={() => setShowPedagogyBreakdown(!showPedagogyBreakdown)}
                className="text-[11px] font-semibold text-indigo-300 hover:text-indigo-200 bg-indigo-950/80 border border-indigo-500/40 px-2.5 py-1 rounded-lg backdrop-blur flex items-center gap-1 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                {showPedagogyBreakdown ? 'Hide Strategy Breakdown' : 'View Teacher Hook & Analogy'}
              </button>

              {showPedagogyBreakdown && (
                <div className="mt-2 p-3 bg-slate-900/95 border border-slate-800 rounded-xl space-y-2 text-xs backdrop-blur shadow-2xl animate-fadeIn">
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase block">Classroom Hook (10s):</span>
                    <p className="text-slate-200 text-[11px] italic">"{currentVideo.classroomHook}"</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-indigo-400 font-bold uppercase block">Core Analogy:</span>
                    <p className="text-slate-200 text-[11px]">{currentVideo.keyAnalogy}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-rose-400 font-bold uppercase block">Student Trap Avoided:</span>
                    <p className="text-slate-200 text-[11px]">{currentVideo.misconceptionBuster}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Action Rail (TikTok Style) */}
        <div className="absolute right-3 bottom-14 z-30 flex flex-col items-center gap-3.5">
          {/* Stole This Idea / Like */}
          <button
            onClick={() => onToggleLike(currentVideo.id)}
            className="flex flex-col items-center gap-0.5 group"
            title="I stole this idea for my class!"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition backdrop-blur shadow-lg ${
                currentVideo.isLiked
                  ? 'bg-rose-600 text-white scale-110'
                  : 'bg-slate-900/80 border border-slate-700/80 text-slate-300 group-hover:text-rose-400 group-hover:scale-105'
              }`}
            >
              <Heart className={`w-5 h-5 ${currentVideo.isLiked ? 'fill-white' : ''}`} />
            </div>
            <span className="text-[10px] font-bold text-slate-300">
              {currentVideo.likes.toLocaleString()}
            </span>
          </button>

          {/* Interactive Lesson Resources */}
          <button
            onClick={() => onOpenResources(currentVideo)}
            className="flex flex-col items-center gap-0.5 group"
            title="Download lesson hook & worksheets"
          >
            <div className="w-11 h-11 rounded-full bg-indigo-600/90 hover:bg-indigo-500 border border-indigo-400/50 flex items-center justify-center text-white backdrop-blur shadow-lg group-hover:scale-105 transition animate-pulse">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-indigo-300">Resources</span>
          </button>

          {/* Field Notes & Comments */}
          <button
            onClick={() => onOpenComments(currentVideo)}
            className="flex flex-col items-center gap-0.5 group"
            title="Teacher classroom discussion"
          >
            <div className="w-11 h-11 rounded-full bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:scale-105 backdrop-blur transition shadow-lg">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-slate-300">
              {currentVideo.comments.length}
            </span>
          </button>

          {/* Save to Lesson Binder */}
          <button
            onClick={() => onToggleBookmark(currentVideo.id)}
            className="flex flex-col items-center gap-0.5 group"
            title="Save to teacher binder"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition backdrop-blur shadow-lg ${
                currentVideo.isBookmarked
                  ? 'bg-amber-500 text-slate-950 scale-110'
                  : 'bg-slate-900/80 border border-slate-700/80 text-slate-300 group-hover:text-amber-400 group-hover:scale-105'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${currentVideo.isBookmarked ? 'fill-slate-950' : ''}`} />
            </div>
            <span className="text-[10px] font-bold text-slate-300">
              {currentVideo.bookmarks.toLocaleString()}
            </span>
          </button>

          {/* Pedagogical Duet / Remix */}
          <button
            onClick={() => onOpenRemix(currentVideo)}
            className="flex flex-col items-center gap-0.5 group"
            title="See alternative teaching methods"
          >
            <div className="w-11 h-11 rounded-full bg-purple-600/80 hover:bg-purple-500 border border-purple-400/50 flex items-center justify-center text-white backdrop-blur shadow-lg group-hover:scale-105 transition">
              <GitCompare className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-purple-300">Remix</span>
          </button>

          {/* AI Concept Studio */}
          <button
            onClick={() => onOpenAI(currentVideo)}
            className="flex flex-col items-center gap-0.5 group"
            title="AI: Adapt for my grade level"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white backdrop-blur shadow-lg group-hover:scale-105 transition">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-pink-300">AI Adapt</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-0.5 group"
            title="Share with fellow teachers"
          >
            <div className="w-10 h-10 rounded-full bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-slate-300 group-hover:text-white backdrop-blur transition shadow">
              {shareToast ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </div>
            <span className="text-[9px] font-medium text-slate-400">
              {shareToast ? 'Copied' : 'Share'}
            </span>
          </button>
        </div>

        {/* Video progress line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 z-30">
          <div className="h-full bg-indigo-500 animate-pulse w-2/3" />
        </div>
      </div>

      {/* Floating Vertical Navigation Arrows (for desktop and easy navigation) */}
      <div className="hidden lg:flex flex-col gap-2 absolute -right-16 top-1/2 -translate-y-1/2 z-30">
        <button
          onClick={() => currentIndex > 0 && onNavigate(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="w-11 h-11 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-indigo-600 hover:border-indigo-500 flex items-center justify-center shadow-lg transition"
          title="Previous Concept (Up Arrow)"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        <div className="text-[10px] font-mono font-bold text-slate-400 text-center py-1 bg-slate-950/80 rounded-lg border border-slate-800">
          {currentIndex + 1} / {videos.length}
        </div>

        <button
          onClick={() => currentIndex < videos.length - 1 && onNavigate(currentIndex + 1)}
          disabled={currentIndex === videos.length - 1}
          className="w-11 h-11 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-indigo-600 hover:border-indigo-500 flex items-center justify-center shadow-lg transition"
          title="Next Concept (Down Arrow)"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>

    {/* Responsive grid of all teacher-shared videos */}
    <div className="w-full max-w-7xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
      {videos.map((video, index) => (
        <button
          key={video.id}
          onClick={() => {
            onNavigate(index);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`relative w-full aspect-[9/16] overflow-hidden rounded-2xl border text-left transition ${
            index === currentIndex ? 'border-indigo-500' : 'border-slate-800 hover:border-slate-600'
          }`}
        >
          <div className="w-full h-full pointer-events-none [&_*]:object-cover">
            <ConceptVisualizer style={video.visualStyle} isPlaying={false} concept={video.concept} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
            <p className="text-sm font-bold text-white line-clamp-2">{video.title}</p>
            <p className="text-[11px] text-slate-300">{video.teacher.name}</p>
          </div>
        </button>
      ))}
    </div>
    </div>
  );
};
