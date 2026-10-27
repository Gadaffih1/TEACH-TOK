import React, { useState } from 'react';
import { TeachTokVideo, InteractiveResource } from '../types';
import { X, BookOpen, CheckCircle, HelpCircle, FileText, Download, Copy, Sparkles, Check, ChevronRight } from 'lucide-react';

interface InteractiveResourceModalProps {
  video: TeachTokVideo;
  isOpen: boolean;
  onClose: () => void;
  onOpenAIHelper: () => void;
}

export const InteractiveResourceModal: React.FC<InteractiveResourceModalProps> = ({
  video,
  isOpen,
  onClose,
  onOpenAIHelper,
}) => {
  if (!isOpen) return null;

  const [activeTabId, setActiveTabId] = useState<string>(video.resources[0]?.id || '');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<number, boolean>>({});
  const [copiedToast, setCopiedToast] = useState(false);

  const activeResource = video.resources.find((r) => r.id === activeTabId) || video.resources[0];

  const handleCopyLMS = () => {
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
    setRevealedExplanations((prev) => ({ ...prev, [qIndex]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base sm:text-lg">Interactive Teaching Resources</h3>
                <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/30">
                  {video.standardCode}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-md">
                Demonstrated by <span className="text-slate-200">{video.teacher.name}</span> ({video.teacher.school})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex overflow-x-auto gap-2 p-3 bg-slate-950/40 border-b border-slate-800 scrollbar-none">
          {video.resources.map((res) => {
            const isActive = res.id === activeResource?.id;
            return (
              <button
                key={res.id}
                onClick={() => setActiveTabId(res.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {res.type === 'hook_script' && <FileText className="w-3.5 h-3.5" />}
                {res.type === 'misconception_guide' && <HelpCircle className="w-3.5 h-3.5" />}
                {res.type === 'concept_check' && <CheckCircle className="w-3.5 h-3.5" />}
                {res.title}
              </button>
            );
          })}
        </div>

        {/* Tab content area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {activeResource && (
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <h4 className="font-bold text-white text-base">{activeResource.title}</h4>
                  <p className="text-xs text-slate-400">{activeResource.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-1 rounded">
                    Est. {activeResource.timeEstimate}
                  </span>
                  <span className="text-[11px] text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-2 py-1 rounded">
                    {activeResource.gradeSuitability}
                  </span>
                </div>
              </div>

              {/* 1. Hook Script View */}
              {activeResource.content.steps && (
                <div className="space-y-4">
                  {activeResource.content.steps.map((st) => (
                    <div key={st.stepNumber} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                          {st.stepNumber}
                        </span>
                        <h5 className="font-semibold text-slate-200 text-sm">{st.title}</h5>
                      </div>
                      <div className="pl-8 space-y-2">
                        <div className="bg-indigo-950/40 border-l-2 border-indigo-500 p-2.5 rounded-r-lg text-xs font-mono text-indigo-200">
                          {st.dialogueScript}
                        </div>
                        <p className="text-xs text-slate-400 italic">
                          💡 <span className="font-semibold text-slate-300">Teacher cue:</span> {st.teacherNote}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 2. Misconception Guide View */}
              {activeResource.content.misconceptions && (
                <div className="space-y-3">
                  {activeResource.content.misconceptions.map((m, idx) => (
                    <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wide mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        Trap: {m.trap}
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-xs mt-2">
                        <div className="bg-rose-950/30 border border-rose-500/30 p-2.5 rounded-lg">
                          <span className="text-[10px] text-rose-400 font-bold uppercase block mb-1">What Student Says</span>
                          <p className="text-slate-200 italic">{m.whatStudentSays}</p>
                        </div>
                        <div className="bg-emerald-950/30 border border-emerald-500/30 p-2.5 rounded-lg">
                          <span className="text-[10px] text-emerald-400 font-bold uppercase block mb-1">What You Say (Redirect)</span>
                          <p className="text-slate-200">{m.howToRedirect}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 3. Quiz / Exit Ticket View */}
              {activeResource.content.quiz && (
                <div className="space-y-4">
                  {activeResource.content.quiz.map((q, qIdx) => {
                    const selected = selectedAnswers[qIdx];
                    const isRevealed = revealedExplanations[qIdx];
                    return (
                      <div key={qIdx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-mono text-indigo-400 bg-slate-800 px-1.5 py-0.5 rounded">
                            Q{qIdx + 1}
                          </span>
                          <p className="text-sm font-semibold text-white">{q.question}</p>
                        </div>

                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isChosen = selected === optIdx;
                            const isCorrect = q.correctAnswer === optIdx;
                            let btnStyle = 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-transparent';
                            if (isRevealed) {
                              if (isCorrect) {
                                btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-medium';
                              } else if (isChosen && !isCorrect) {
                                btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-300';
                              }
                            } else if (isChosen) {
                              btnStyle = 'bg-indigo-600/30 border-indigo-500 text-white';
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectAnswer(qIdx, optIdx)}
                                className={`w-full text-left p-2.5 rounded-lg text-xs border transition flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {isRevealed && isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                              </button>
                            );
                          })}
                        </div>

                        {isRevealed && (
                          <div className="bg-indigo-950/30 border border-indigo-500/30 p-3 rounded-lg text-xs space-y-1 mt-2">
                            <p className="text-emerald-400 font-semibold flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5" /> Explanation: {q.explanation}
                            </p>
                            <p className="text-slate-400 text-[11px]">
                              ⚠️ <span className="text-slate-300 font-medium">Why kids trip up:</span> {q.whyStudentsGetItWrong}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onOpenAIHelper}
            className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-950/50 hover:bg-indigo-900/50 border border-indigo-500/30 px-3 py-2 rounded-xl transition"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            AI: Adapt this for my grade or another subject
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLMS}
              className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl transition font-medium"
            >
              {copiedToast ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiedToast ? 'Copied to Clipboard!' : 'Copy to Google Classroom / LMS'}
            </button>
            <button
              onClick={onClose}
              className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
