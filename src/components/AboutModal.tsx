import React from 'react';
import { X, GraduationCap, Sparkles, BookOpen, Video, Zap } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-800">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">About TEACH-TOK</h3>
              <p className="text-[11px] text-indigo-600 font-medium">The Pedagogical Community for Educators</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-600 leading-relaxed">
          <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl text-indigo-900">
            <p className="font-medium italic">
              "Teach-Tok is designed exclusively for teachers to share, demonstrate, discover and improve different ways of teaching concepts. A professional teaching community powered by AI where teachers learn how fellow educators explain tricky concepts through short videos and interactive classroom resources."
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <h4 className="font-bold text-slate-900 text-sm">Key Features Built for Educators:</h4>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-200">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-slate-900 block">Short-Form Pedagogical Demonstrations:</strong>
                Swipe through high-impact, 30-to-60 second teaching hooks, concrete analogies, and tangible visual models.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-slate-900 block">Interactive Teaching Resources:</strong>
                Every demonstration is backed by instant classroom hook scripts, printable exit tickets, and misconception diagnosis guides.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 mt-0.5 border border-pink-200">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-slate-900 block">AI Pedagogical Engine:</strong>
                Differentiate any lesson strategy for other grade bands (K-5 to Higher Ed), generate fresh real-world analogies, and diagnose student traps.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5 border border-purple-200">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-slate-900 block">Pedagogical Duets & Strategy Categorization:</strong>
                Filter by Direct Instruction, Inquiry-Based, Gamification, and Peer Review to see how different educators tackle tricky standards.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
          >
            Start Exploring Concepts
          </button>
        </div>
      </div>
    </div>
  );
};
