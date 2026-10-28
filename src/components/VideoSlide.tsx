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
  Target,
  Compass,
  Gamepad2,
  Users,
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

const strategyIcons: Record<string, React.ReactNode> = {
  'Direct Instruction': <Target className="w-3 h-3" />,
  'Inquiry-Based': <Compass className="w-3 h-3" />,
  'Gamification': <Gamepad2 className="w-3 h-3" />,
  'Peer Review': <Users className="w-3 h-3" />,
};

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
    <div className="relative w-full h-full flex flex-col bg-slate-950 overflow-hidden">
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
            hook={video.classroomHook}
            analogy={video.keyAnalogy}
            subject={video.subject}
            title={video.title}
            teacherName={video.teacher.name}
          />
        )}

        {needsSoundHint && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 text-[11px] font-semibold text-slate-800 bg-white/95 border border-slate-200 px-3 py-1 rounded-full shadow-lg pointer-events-none animate-pulse flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-indigo-600" /> Tap anywhere for sound
          </div>
        )}

        {/* Play/Pause indicator overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/35 flex items-center justify-center z-10 pointer-events-none backdrop-blur-[1px]">
            <div className="w-16 h-16 rounded-full bg-white/95 text-slate-900 border border-slate-200 flex items-center justify-center shadow-2xl">
              <Play className="w-8 h-8 fill-slate-900 ml-1" />
            </div>
          </div>
        )}

        {/* Sound toggle button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleMute();
          }}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 border border-slate-200/80 shadow-md backdrop-blur transition cursor-pointer"
          title={isMuted ? 'Unmute' : 'Mute'}
          aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
        </button>

        {/* Top Badges: Subject, Grade, Standard, Strategy */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-1.5 max-w-[70%]">
          <span className="text-[10px] font-bold text-white bg-indigo-600/95 px-2.5 py-0.5 rounded-full shadow-xs">
            {video.subject}
          </span>
          <span className="text-[10px] font-bold text-indigo-900 bg-indigo-100/90 border border-indigo-200/80 px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
            {strategyIcons[video.teachingStrategy] || <Target className="w-3 h-3" />}
            {video.teachingStrategy}
          </span>
          <span className="text-[10px] font-mono font-medium text-slate-700 bg-white/90 border border-slate-200 px-2 py-0.5 rounded-full shadow-xs">
            {video.gradeBand}
          </span>
          <span className="text-[9px] font-mono font-semibold text-emerald-800 bg-emerald-50/95 border border-emerald-300 px-2 py-0.5 rounded-full shadow-xs">
            {video.standardCode}
          </span>
        </div>

        {/* Pedagogical Technique Badge */}
        <div className="absolute top-12 left-4 z-20 mt-2.5">
          <div className="text-[10px] text-amber-900 font-bold bg-amber-100/95 border border-amber-300 px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-600" />
            <span>{video.pedagogyTag}</span>
          </div>
        </div>
      </div>

      {/* Video Bottom Overlay: Concept information, Teacher info, Key Analogy */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pt-10 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent z-20 pointer-events-none">
        <div data-no-swipe className="pointer-events-auto space-y-2 pr-14 text-white">
          {/* Teacher row */}
          <div className="flex items-center gap-2">
            <img
              src={video.teacher.avatar}
              alt={video.teacher.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-indigo-400 shadow-sm"
            />
            <div className="leading-tight">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-white drop-shadow-sm">{video.teacher.name}</span>
                <Award className="w-3 h-3 text-indigo-400" />
              </div>
              <span className="text-[10px] text-slate-300 drop-shadow-sm">
                {video.teacher.role} • {video.teacher.school}
              </span>
            </div>
          </div>

          {/* Video Title & Concept */}
          <div>
            <h2 className="text-sm font-extrabold text-white leading-snug drop-shadow-md">
              {video.title}
            </h2>
            <p className="text-xs text-slate-200 line-clamp-2 mt-0.5 leading-relaxed drop-shadow-sm">
              {video.summary}
            </p>
          </div>

          {/* Interactive Concept Drawer Trigger */}
          <div className="pt-1">
            <button
              onClick={() => setShowPedagogyBreakdown(!showPedagogyBreakdown)}
              className="text-[11px] font-semibold text-slate-800 bg-white/95 hover:bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              {showPedagogyBreakdown ? 'Hide Strategy Breakdown' : 'View Teacher Hook & Analogy'}
            </button>

            {showPedagogyBreakdown && (
              <div className="mt-2 p-3.5 bg-white text-slate-800 border border-slate-200 rounded-xl space-y-2 text-xs shadow-xl animate-fadeIn">
                <div>
                  <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider block">Classroom Hook (10s):</span>
                  <p className="text-slate-700 text-[11px] italic font-medium">"{video.classroomHook}"</p>
                </div>
                <div>
                  <span className="text-[10px] text-indigo-700 font-bold uppercase tracking-wider block">Core Analogy:</span>
                  <p className="text-slate-700 text-[11px]">{video.keyAnalogy}</p>
                </div>
                <div>
                  <span className="text-[10px] text-rose-700 font-bold uppercase tracking-wider block">Student Trap Avoided:</span>
                  <p className="text-slate-700 text-[11px]">{video.misconceptionBuster}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Action Rail (TikTok Style - Light/Glass Theme) */}
      <div data-no-swipe className="absolute right-3 bottom-14 z-30 flex flex-col items-center gap-3.5">
        {/* Stole This Idea / Like */}
        <button
          onClick={() => onToggleLike(video.id)}
          className="flex flex-col items-center gap-0.5 group cursor-pointer"
          title="I stole this idea! (Shortcut: L)"
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center transition backdrop-blur shadow-md ${
              video.isLiked
                ? 'bg-rose-500 text-white scale-110 shadow-rose-500/30'
                : 'bg-white/90 hover:bg-white border border-slate-200/80 text-slate-700 group-hover:text-rose-600 group-hover:scale-105'
            }`}
          >
            <Heart className={`w-5 h-5 ${video.isLiked ? 'fill-white' : ''}`} />
          </div>
          <span className="text-[10px] font-bold text-white drop-shadow-md">
            {video.likes.toLocaleString()}
          </span>
        </button>

        {/* Interactive Lesson Resources */}
        <button
          onClick={() => onOpenResources(video)}
          className="flex flex-col items-center gap-0.5 group cursor-pointer"
          title="Download lesson hook & worksheets"
        >
          <div className="w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-700 border border-indigo-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition animate-pulse">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-indigo-200 drop-shadow-md">Resources</span>
        </button>

        {/* Field Notes & Comments */}
        <button
          onClick={() => onOpenComments(video)}
          className="flex flex-col items-center gap-0.5 group cursor-pointer"
          title="Teacher classroom discussion"
        >
          <div className="w-11 h-11 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 group-hover:text-indigo-600 group-hover:scale-105 shadow-md transition">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-white drop-shadow-md">
            {video.comments.length}
          </span>
        </button>

        {/* Save to Lesson Binder */}
        <button
          onClick={() => onToggleBookmark(video.id)}
          className="flex flex-col items-center gap-0.5 group cursor-pointer"
          title="Save to teacher binder (Shortcut: B)"
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center transition shadow-md ${
              video.isBookmarked
                ? 'bg-amber-500 text-white scale-110 shadow-amber-500/30'
                : 'bg-white/90 hover:bg-white border border-slate-200/80 text-slate-700 group-hover:text-amber-500 group-hover:scale-105'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${video.isBookmarked ? 'fill-white' : ''}`} />
          </div>
          <span className="text-[10px] font-bold text-white drop-shadow-md">
            {video.bookmarks.toLocaleString()}
          </span>
        </button>

        {/* Pedagogical Duet / Remix */}
        <button
          onClick={() => onOpenRemix(video)}
          className="flex flex-col items-center gap-0.5 group cursor-pointer"
          title="See alternative teaching methods"
        >
          <div className="w-11 h-11 rounded-full bg-purple-600 hover:bg-purple-700 border border-purple-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
            <GitCompare className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-purple-200 drop-shadow-md">Remix</span>
        </button>

        {/* AI Concept Studio */}
        <button
          onClick={() => onOpenAI(video)}
          className="flex flex-col items-center gap-0.5 group cursor-pointer"
          title="AI: Adapt for my grade level"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-pink-200 drop-shadow-md">AI Adapt</span>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-0.5 group cursor-pointer"
          title="Share with fellow teachers"
        >
          <div className="w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 group-hover:text-indigo-600 shadow-sm transition">
            {shareToast ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </div>
          <span className="text-[9px] font-medium text-slate-200 drop-shadow-md">
            {shareToast ? 'Copied' : 'Share'}
          </span>
        </button>
      </div>

      {/* Video progress line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 z-30">
        <div className="h-full bg-indigo-500 transition-all duration-150" style={{ width: `${Math.min(100, progress * 100)}%` }} />
      </div>
    </div>
  );
};
