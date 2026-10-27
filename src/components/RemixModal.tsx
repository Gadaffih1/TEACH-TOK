import React, { useState } from 'react';
import { TeachTokVideo } from '../types';
import { X, GitCompare, Sparkles, Check, ArrowRight, Video } from 'lucide-react';

interface RemixModalProps {
  video: TeachTokVideo;
  isOpen: boolean;
  onClose: () => void;
  onRecordRemix: () => void;
}

export const RemixModal: React.FC<RemixModalProps> = ({
  video,
  isOpen,
  onClose,
  onRecordRemix,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">Pedagogical Duet & Remix</h3>
              <p className="text-xs text-slate-400">
                Comparing alternative ways teachers explain "{video.concept}"
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison grid */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Approach A (Original) */}
            <div className="bg-slate-950/70 border border-indigo-500/30 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/30">
                    Approach A (Current)
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{video.teacher.name}</h4>
                <p className="text-xs text-slate-400 mb-3">{video.teacher.school}</p>

                <div className="space-y-2 text-xs">
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold block mb-0.5">Technique Tag:</span>
                    <span className="text-indigo-300 font-semibold">{video.pedagogyTag}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold block mb-0.5">Core Hook / Analogy:</span>
                    <span className="text-slate-200">{video.keyAnalogy}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold block mb-0.5">Target Misconception:</span>
                    <span className="text-slate-200">{video.misconceptionBuster}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Approach B (Alternative Peer Strategy) */}
            <div className="bg-slate-950/70 border border-purple-500/30 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/30">
                    Approach B (Peer Remix)
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Coach Marcus Sterling</h4>
                <p className="text-xs text-slate-400 mb-3">Lincoln Elementary</p>

                <div className="space-y-2 text-xs">
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold block mb-0.5">Technique Tag:</span>
                    <span className="text-purple-300 font-semibold">Number Line Vector Jumps</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold block mb-0.5">Core Hook / Analogy:</span>
                    <span className="text-slate-200">
                      "Instead of physical containers, draw a 3-unit long tape on the floor. Have kids hop forward in 1/4 increments while counting hops!"
                    </span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold block mb-0.5">Why Teachers Love It:</span>
                    <span className="text-slate-200">Great for kinesthetic students who need to physically move to build spatial distance intuition.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-950/50 to-indigo-950/50 border border-purple-500/30 p-4 rounded-xl flex items-center justify-between gap-3">
            <div>
              <h5 className="text-xs font-bold text-white">Do you explain this differently?</h5>
              <p className="text-[11px] text-slate-300">
                Record or publish your own twist on "{video.concept}" so teachers have multiple explanations for diverse learners.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onRecordRemix();
              }}
              className="shrink-0 bg-purple-600 hover:bg-purple-500 text-white text-xs px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shadow"
            >
              <Video className="w-3.5 h-3.5" />
              Duet / Remix Concept
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
