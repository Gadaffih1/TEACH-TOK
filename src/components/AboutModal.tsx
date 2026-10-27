import React from 'react';
import { X, GraduationCap, Sparkles, BookOpen, Users, Video, Zap, CheckCircle2 } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-slate-900 border border-indigo-500/30 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">About TEACH-TOK</h3>
              <p className="text-[11px] text-indigo-400">The Pedagogical Community for Educators</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed">
          <div className="bg-indigo-950/40 border border-indigo-500/30 p-4 rounded-xl text-indigo-200">
            <p className="font-medium italic">
              "Teach-Tok is designed exclusively for teachers to share, demonstrate, discover and improve different ways of teaching concepts. A professional teaching community powered by AI where teachers learn how fellow educators explain tricky concepts through short videos and interactive classroom resources."
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <h4 className="font-bold text-white text-sm">Key Features Built for Educators:</h4>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block">Short-Form Pedagogical Demonstrations:</strong>
                Swipe through high-impact, 30-to-60 second teaching hooks, concrete analogies, and tangible visual models.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block">Interactive Teaching Resources:</strong>
                Every demonstration is backed by instant classroom hook scripts, printable exit tickets, and misconception diagnosis guides.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-pink-600/20 text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block">AI Pedagogical Engine:</strong>
                Differentiate any lesson strategy for other grade bands (K-5 to Higher Ed), generate fresh real-world analogies, and diagnose student traps.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block">Pedagogical Duets & Remixes:</strong>
                See two different teachers explain the exact same tricky standard using alternative representations.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl transition"
          >
            Start Exploring Concepts
          </button>
        </div>
      </div>
    </div>
  );
};
