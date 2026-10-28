import React from 'react';
import { TeachTokVideo } from '../types';
import { X, Bookmark, ExternalLink, Trash2, BookOpen, Sparkles } from 'lucide-react';

interface SavedNote {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface LessonBinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedVideos: TeachTokVideo[];
  savedNotes: SavedNote[];
  onRemoveBookmark: (videoId: string) => void;
  onRemoveNote: (noteId: string) => void;
  onSelectVideo: (video: TeachTokVideo) => void;
}

export const LessonBinderModal: React.FC<LessonBinderModalProps> = ({
  isOpen,
  onClose,
  savedVideos,
  savedNotes,
  onRemoveBookmark,
  onRemoveNote,
  onSelectVideo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden text-slate-800">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Bookmark className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">My Teacher Lesson Binder</h3>
              <p className="text-xs text-slate-500">
                {savedVideos.length} bookmarked strategies & {savedNotes.length} AI lesson adaptations
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

        {/* Content list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Saved Strategies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Bookmarked Teaching Demonstrations ({savedVideos.length})
            </h4>

            {savedVideos.length === 0 ? (
              <p className="text-xs text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                No bookmarked strategies yet. Tap the bookmark icon on any TeachTok video to save it to your curriculum binder!
              </p>
            ) : (
              <div className="space-y-2.5">
                {savedVideos.map((vid) => (
                  <div
                    key={vid.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 hover:border-slate-300 hover:bg-slate-100/70 transition"
                  >
                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => { onSelectVideo(vid); onClose(); }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                          {vid.subject}
                        </span>
                        <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          {vid.teachingStrategy}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {vid.gradeBand}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 truncate hover:text-indigo-600 transition">
                        {vid.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 truncate">
                        By {vid.teacher.name} • {vid.keyAnalogy}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => { onSelectVideo(vid); onClose(); }}
                        className="p-2 text-xs bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white rounded-lg transition border border-indigo-200 cursor-pointer"
                        title="View Strategy"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onRemoveBookmark(vid.id)}
                        className="p-2 text-xs text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        title="Remove Bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Adaptations & Notes */}
          {savedNotes.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                AI Generated Adaptations ({savedNotes.length})
              </h4>
              <div className="space-y-2.5">
                {savedNotes.map((note) => (
                  <div key={note.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-amber-800">{note.title}</h5>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-medium">{note.date}</span>
                        <button
                          onClick={() => onRemoveNote(note.id)}
                          className="text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <pre className="text-[11px] text-slate-700 whitespace-pre-wrap font-sans max-h-36 overflow-y-auto bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
                      {note.content}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2 rounded-xl transition font-medium cursor-pointer shadow-xs"
          >
            Close Binder
          </button>
        </div>
      </div>
    </div>
  );
};
