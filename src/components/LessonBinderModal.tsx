import React from 'react';
import { TeachTokVideo } from '../types';
import { X, Bookmark, ExternalLink, Trash2, BookOpen, Sparkles, Share2 } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Bookmark className="w-5 h-5 fill-amber-400/30" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">My Teacher Lesson Binder</h3>
              <p className="text-xs text-slate-400">
                {savedVideos.length} bookmarked strategies & {savedNotes.length} AI lesson adaptations
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

        {/* Content list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Saved Strategies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Bookmarked Teaching Demonstrations ({savedVideos.length})
            </h4>

            {savedVideos.length === 0 ? (
              <p className="text-xs text-slate-500 italic bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                No bookmarked strategies yet. Tap the bookmark icon on any TeachTok video to save it to your curriculum binder!
              </p>
            ) : (
              <div className="space-y-2.5">
                {savedVideos.map((vid) => (
                  <div
                    key={vid.id}
                    className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between gap-3 hover:border-slate-700 transition"
                  >
                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => { onSelectVideo(vid); onClose(); }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/30">
                          {vid.subject}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {vid.gradeBand}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-white truncate hover:text-indigo-400 transition">
                        {vid.title}
                      </h5>
                      <p className="text-[11px] text-slate-400 truncate">
                        By {vid.teacher.name} • {vid.keyAnalogy}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => { onSelectVideo(vid); onClose(); }}
                        className="p-1.5 text-xs bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white rounded-lg transition"
                        title="View Strategy"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onRemoveBookmark(vid.id)}
                        className="p-1.5 text-xs text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition"
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
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                AI Generated Adaptations ({savedNotes.length})
              </h4>
              <div className="space-y-2.5">
                {savedNotes.map((note) => (
                  <div key={note.id} className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-amber-300">{note.title}</h5>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500">{note.date}</span>
                        <button
                          onClick={() => onRemoveNote(note.id)}
                          className="text-slate-500 hover:text-rose-400 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <pre className="text-[11px] text-slate-300 whitespace-pre-wrap font-sans max-h-36 overflow-y-auto bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      {note.content}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl transition font-medium"
          >
            Close Binder
          </button>
        </div>
      </div>
    </div>
  );
};
