import React, { useState } from 'react';
import { TeachTokVideo, TeacherComment } from '../types';
import { useAuth } from '../auth/AuthContext';
import { X, MessageSquare, ThumbsUp, Star, Award, Send } from 'lucide-react';

interface CommentsModalProps {
  video: TeachTokVideo;
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (comment: TeacherComment) => void;
  canComment?: boolean;
}

export const CommentsModal: React.FC<CommentsModalProps> = ({
  video,
  isOpen,
  onClose,
  onAddComment,
  canComment = true,
}) => {
  const { user } = useAuth();
  if (!isOpen) return null;

  const [commentText, setCommentText] = useState('');
  const [roleTag, setRoleTag] = useState('High School Teacher');
  const [starRating, setStarRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canComment || !user || !commentText.trim()) return;

    const newComment: TeacherComment = {
      id: `comment-${Date.now()}`,
      authorName: user.displayName,
      authorRole: user.role === 'admin' ? 'Admin' : roleTag,
      avatar:
        user.avatarUrl ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=4f46e5&color=fff`,
      text: commentText.trim(),
      timestamp: 'Just now',
      classroomSuccessRating: starRating,
      upvotes: 1,
      verifiedTeacher: user.role === 'teacher' || user.role === 'admin',
    };

    onAddComment(newComment);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden text-slate-800">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Teacher Field Notes & Adaptations</h3>
              <p className="text-xs text-slate-500">
                {video.comments.length} educators shared their classroom results
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

        {/* Comments List */}
        <div className="p-4 overflow-y-auto space-y-3.5 flex-1 divide-y divide-slate-100">
          {video.comments.map((c) => (
            <div key={c.id} className="pt-3.5 first:pt-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <img
                    src={c.avatar}
                    alt={c.authorName}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">{c.authorName}</span>
                      {c.verifiedTeacher && (
                        <span className="text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200 flex items-center gap-0.5 font-semibold">
                          <Award className="w-2.5 h-2.5" /> Verified
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500">{c.authorRole}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px] text-amber-800 font-bold">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>{c.classroomSuccessRating}/5</span>
                </div>
              </div>

              <p className="mt-2 text-xs text-slate-700 leading-relaxed pl-10 font-normal">
                {c.text}
              </p>

              {c.adaptedFor && (
                <div className="mt-1.5 ml-10">
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                    🎯 {c.adaptedFor}
                  </span>
                </div>
              )}

              <div className="mt-2 ml-10 flex items-center justify-between text-[11px] text-slate-400">
                <span>{c.timestamp}</span>
                <button className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition cursor-pointer">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{c.upvotes} helpful</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="p-3 bg-slate-50 border-t border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600 px-1">
            <div className="flex items-center gap-2">
              <span>My Role:</span>
              <select
                value={roleTag}
                onChange={(e) => setRoleTag(e.target.value)}
                className="bg-white text-slate-800 text-[11px] rounded-lg px-2 py-1 border border-slate-200 outline-none"
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
                  className={`text-xs cursor-pointer ${star <= starRating ? 'text-amber-500' : 'text-slate-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder={canComment ? 'How did this lesson work with your students? Any modifications?' : 'You do not have permission to comment'}
              disabled={!canComment}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 transition"
            />
            <button
              type="submit"
              disabled={!canComment || !commentText.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-3.5 py-2 rounded-xl transition flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
