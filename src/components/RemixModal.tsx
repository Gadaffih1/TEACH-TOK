import React from 'react';
import { TeachTokVideo } from '../types';
import { X, GitCompare, Video } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden text-slate-800">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Pedagogical Duet & Remix</h3>
              <p className="text-xs text-slate-500">
                Comparing alternative ways teachers explain "{video.concept}"
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison grid */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Approach A (Original) */}
            <div className="bg-slate-50 border border-indigo-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200">
                    Approach A (Current)
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-0.5">{video.teacher.name}</h4>
                <p className="text-xs text-slate-500 mb-3">{video.teacher.school}</p>

                <div className="space-y-2 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                    <span className="text-[10px] text-slate-500 font-bold block mb-0.5">Strategy / Tag:</span>
                    <span className="text-indigo-700 font-semibold">{video.teachingStrategy} • {video.pedagogyTag}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                    <span className="text-[10px] text-slate-500 font-bold block mb-0.5">Core Hook / Analogy:</span>
                    <span className="text-slate-700">{video.keyAnalogy}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                    <span className="text-[10px] text-slate-500 font-bold block mb-0.5">Target Misconception:</span>
                    <span className="text-slate-700">{video.misconceptionBuster}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Approach B (Alternative Peer Strategy) */}
            <div className="bg-slate-50 border border-purple-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                    Approach B (Peer Remix)
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-0.5">Coach Marcus Sterling</h4>
                <p className="text-xs text-slate-500 mb-3">Lincoln Elementary</p>

                <div className="space-y-2 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                    <span className="text-[10px] text-slate-500 font-bold block mb-0.5">Strategy / Tag:</span>
                    <span className="text-purple-700 font-semibold">Inquiry-Based • Number Line Vector Jumps</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                    <span className="text-[10px] text-slate-500 font-bold block mb-0.5">Core Hook / Analogy:</span>
                    <span className="text-slate-700">
                      "Instead of physical containers, draw a 3-unit long tape on the floor. Have kids hop forward in 1/4 increments while counting hops!"
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                    <span className="text-[10px] text-slate-500 font-bold block mb-0.5">Why Teachers Love It:</span>
                    <span className="text-slate-700">Great for kinesthetic students who need to physically move to build spatial distance intuition.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 p-4 rounded-xl flex items-center justify-between gap-3">
            <div>
              <h5 className="text-xs font-bold text-slate-900">Do you explain this differently?</h5>
              <p className="text-[11px] text-slate-600">
                Record or publish your own twist on "{video.concept}" so teachers have multiple explanations for diverse learners.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onRecordRemix();
              }}
              className="shrink-0 bg-purple-600 hover:bg-purple-700 text-white text-xs px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              Duet / Remix Concept
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2 rounded-xl transition font-medium cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
