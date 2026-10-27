import React, { useState } from 'react';
import { TeachTokVideo, TeacherComment } from '../types';
import { X, MessageSquare, ThumbsUp, Star, Award, Send } from 'lucide-react';

interface CommentsModalProps {
  video: TeachTokVideo;
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (comment: TeacherComment) => void;
}

export const CommentsModal: React.FC<CommentsModalProps> = ({
  video,
  isOpen,
  onClose,
  onAddComment,
}) => {
  if (!isOpen) return null;

  const [commentText, setCommentText] = useState('');
  const [roleTag, setRoleTag] = useState('High School Teacher');
  const [starRating, setStarRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: TeacherComment = {
      id: `comment-${Date.now()}`,
      authorName: 'You (Teacher)',
      authorRole: roleTag,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      text: commentText.trim(),
      timestamp: 'Just now',
      classroomSuccessRating: starRating,
      upvotes: 1,
      verifiedTeacher: true,
    };

    onAddComment(newComment);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Teacher Field Notes & Adaptations</h3>
              <p className="text-xs text-slate-400">
                {video.comments.length} educators shared their classroom results
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

        {/* Comments List */}
        <div className="p-4 overflow-y-auto space-y-3.5 flex-1 divide-y divide-slate-800/60">
          {video.comments.map((c) => (
            <div key={c.id} className="pt-3.5 first:pt-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <img
                    src={c.avatar}
                    alt={c.authorName}
                    className="w-8 h-8 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">{c.authorName}</span>
                      {c.verifiedTeacher && (
                        <span className="text-[10px] text-indigo-400 bg-indigo-950/80 px-1.5 py-0.2 rounded border border-indigo-500/30 flex items-center gap-0.5">
                          <Award className="w-2.5 h-2.5" /> Verified
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{c.authorRole}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded text-[11px] text-amber-300">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{c.classroomSuccessRating}/5</span>
                </div>
              </div>

              <p className="mt-2 text-xs text-slate-200 leading-relaxed pl-10">
                {c.text}
              </p>

              {c.adaptedFor && (
                <div className="mt-1.5 ml-10">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                    🎯 {c.adaptedFor}
                  </span>
                </div>
              )}

              <div className="mt-2 ml-10 flex items-center justify-between text-[11px] text-slate-400">
                <span>{c.timestamp}</span>
                <button className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{c.upvotes} helpful</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="p-3 bg-slate-950 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <div className="flex items-center gap-2">
              <span>My Role:</span>
              <select
                value={roleTag}
                onChange={(e) => setRoleTag(e.target.value)}
                className="bg-slate-800 text-slate-200 text-[11px] rounded px-2 py-1 border border-slate-700 outline-none"
              >
                <option value="Elementary (K-5) Teacher">Elementary (K-5) Teacher</option>
                <option value="Middle School Teacher">Middle School Teacher</option>
                <option value="High School Teacher">High School Teacher</option>
                <option value="Special Ed / ELL Specialist">Special Ed / ELL Specialist</option>
                <option value="Instructional Coach">Instructional Coach</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <span>Success:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setStarRating(star)}
                  className={`text-xs ${star <= starRating ? 'text-amber-400' : 'text-slate-600'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="How did this lesson work with your students? Any modifications?"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-3.5 py-2 rounded-xl transition flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
