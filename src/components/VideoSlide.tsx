import React, { useState } from 'react';
import { TeachTokVideo } from '../types';
import { ConceptVisualizer } from './conceptVisualizers';
import { useVideoAudio } from '../hooks/useVideoAudio';
import {
  Heart,
  MessageSquare,
  Bookmark,
  Share2,
  BookOpen,
  Sparkles,
  GitCompare,
  Play,
  Volume2,
  VolumeX,
  Award,
  Check,
  Zap,
} from 'lucide-react';

interface VideoSlideProps {
  video: TeachTokVideo;
  isActive: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  isPaused: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onToggleLike: (videoId: string) => void;
  onToggleBookmark: (videoId: string) => void;
  onOpenResources: (video: TeachTokVideo) => void;
  onOpenComments: (video: TeachTokVideo) => void;
  onOpenAI: (video: TeachTokVideo) => void;
  onOpenRemix: (video: TeachTokVideo) => void;
}

export const VideoSlide: React.FC<VideoSlideProps> = ({
  video,
  isActive,
  isPlaying,
  isMuted,
  isPaused,
  onTogglePlay,
  onToggleMute,
  onToggleLike,
  onToggleBookmark,
  onOpenResources,
  onOpenComments,
  onOpenAI,
  onOpenRemix,
}) => {
  const [shareToast, setShareToast] = useState(false);
  const [showPedagogyBreakdown, setShowPedagogyBreakdown] = useState(false);
  const { videoRef, progress, needsSoundHint } = useVideoAudio({ video, isActive, isPlaying, isMuted, isPaused });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2000);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-950">
        {/* Dynamic Concept Interactive Canvas / Video Simulation */}
        <div
          className="relative w-full flex-1 overflow-hidden cursor-pointer"
          onClick={onTogglePlay}
        >
          {video.videoUrl ? (
            <video
              ref={videoRef}
              src={video.videoUrl}
              playsInline
              loop
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover bg-black"
            />
          ) : (
            <ConceptVisualizer
              style={video.visualStyle}
              isPlaying={isActive && isPlaying}
              concept={video.concept}
            />
          )}

          {needsSoundHint && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 text-[11px] font-semibold text-white bg-slate-900/80 border border-white/20 px-3 py-1 rounded-full backdrop-blur pointer-events-none animate-pulse flex items-center gap-1">
              <Volume2 className="w-3 h-3" /> Tap for sound
            </div>
          )}

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
              onToggleMute();
            }}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/70 border border-slate-700/60 text-slate-200 hover:text-white backdrop-blur transition"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Teacher Subject & Standard Tag Header */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-1.5 max-w-[70%]">
            <span className="text-[10px] font-bold text-white bg-indigo-600/90 px-2 py-0.5 rounded-full backdrop-blur shadow-sm">
              {video.subject}
            </span>
            <span className="text-[10px] font-mono font-medium text-slate-300 bg-slate-900/80 border border-slate-700/60 px-2 py-0.5 rounded-full backdrop-blur">
              {video.gradeBand}
            </span>
            <span className="text-[9px] font-mono text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-500/30 backdrop-blur">
              {video.standardCode}
            </span>
          </div>

          {/* Pedagogical Technique Badge */}
          <div className="absolute top-12 left-4 z-20 mt-1">
            <div className="text-[10px] text-amber-300 font-semibold bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded-full backdrop-blur flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>{video.pedagogyTag}</span>
            </div>
          </div>
        </div>

        {/* Video Bottom Overlay: Concept information, Teacher info, Key Analogy */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pt-10 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-20 pointer-events-none">
          <div data-no-swipe className="pointer-events-auto space-y-2 pr-14">
            {/* Teacher row */}
            <div className="flex items-center gap-2">
              <img
                src={video.teacher.avatar}
                alt={video.teacher.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500"
              />
              <div className="leading-tight">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-white">{video.teacher.name}</span>
                  <Award className="w-3 h-3 text-indigo-400" />
                </div>
                <span className="text-[10px] text-slate-400">
                  {video.teacher.role} • {video.teacher.school}
                </span>
              </div>
            </div>

            {/* Video Title & Concept */}
            <div>
              <h2 className="text-sm font-extrabold text-white leading-snug drop-shadow-sm">
                {video.title}
              </h2>
              <p className="text-xs text-slate-300 line-clamp-2 mt-0.5 leading-relaxed">
                {video.summary}
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
                    <p className="text-slate-200 text-[11px] italic">"{video.classroomHook}"</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-indigo-400 font-bold uppercase block">Core Analogy:</span>
                    <p className="text-slate-200 text-[11px]">{video.keyAnalogy}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-rose-400 font-bold uppercase block">Student Trap Avoided:</span>
                    <p className="text-slate-200 text-[11px]">{video.misconceptionBuster}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Action Rail (TikTok Style) */}
        <div data-no-swipe className="absolute right-3 bottom-14 z-30 flex flex-col items-center gap-3.5">
          {/* Stole This Idea / Like */}
          <button
            onClick={() => onToggleLike(video.id)}
            className="flex flex-col items-center gap-0.5 group"
            title="I stole this idea for my class!"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition backdrop-blur shadow-lg ${
                video.isLiked
                  ? 'bg-rose-600 text-white scale-110'
                  : 'bg-slate-900/80 border border-slate-700/80 text-slate-300 group-hover:text-rose-400 group-hover:scale-105'
              }`}
            >
              <Heart className={`w-5 h-5 ${video.isLiked ? 'fill-white' : ''}`} />
            </div>
            <span className="text-[10px] font-bold text-slate-300">
              {video.likes.toLocaleString()}
            </span>
          </button>

          {/* Interactive Lesson Resources */}
          <button
            onClick={() => onOpenResources(video)}
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
            onClick={() => onOpenComments(video)}
            className="flex flex-col items-center gap-0.5 group"
            title="Teacher classroom discussion"
          >
            <div className="w-11 h-11 rounded-full bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:scale-105 backdrop-blur transition shadow-lg">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-slate-300">
              {video.comments.length}
            </span>
          </button>

          {/* Save to Lesson Binder */}
          <button
            onClick={() => onToggleBookmark(video.id)}
            className="flex flex-col items-center gap-0.5 group"
            title="Save to teacher binder"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition backdrop-blur shadow-lg ${
                video.isBookmarked
                  ? 'bg-amber-500 text-slate-950 scale-110'
                  : 'bg-slate-900/80 border border-slate-700/80 text-slate-300 group-hover:text-amber-400 group-hover:scale-105'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${video.isBookmarked ? 'fill-slate-950' : ''}`} />
            </div>
            <span className="text-[10px] font-bold text-slate-300">
              {video.bookmarks.toLocaleString()}
            </span>
          </button>

          {/* Pedagogical Duet / Remix */}
          <button
            onClick={() => onOpenRemix(video)}
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
            onClick={() => onOpenAI(video)}
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
          <div className="h-full bg-indigo-500" style={{ width: `${Math.min(100, progress * 100)}%` }} />
        </div>
    </div>
  );
};
