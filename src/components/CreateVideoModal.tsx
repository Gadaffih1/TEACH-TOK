import React, { useState } from 'react';
import { TeachTokVideo, SubjectFilter, GradeBand, VisualStyle } from '../types';
import { useAuth } from '../auth/AuthContext';
import { X, Upload, Video, Sparkles, Check, Plus, FileText } from 'lucide-react';

interface CreateVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (video: TeachTokVideo) => void;
}

export const CreateVideoModal: React.FC<CreateVideoModalProps> = ({
  isOpen,
  onClose,
  onPublish,
}) => {
  const { user } = useAuth();
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [concept, setConcept] = useState('');
  const [subject, setSubject] = useState<'Math' | 'Science' | 'English & ELA' | 'History & Social Studies' | 'Arts' | 'Classroom Management'>('Math');
  const [gradeBand, setGradeBand] = useState<GradeBand>('Middle School (6-8)');
  const [standardCode, setStandardCode] = useState('CCSS.MATH.CONTENT.7.RP.A.1');
  const [pedagogyTag, setPedagogyTag] = useState('Concrete Analogy');
  const [classroomHook, setClassroomHook] = useState('');
  const [keyAnalogy, setKeyAnalogy] = useState('');
  const [misconceptionBuster, setMisconceptionBuster] = useState('');
  const [visualStyle, setVisualStyle] = useState<VisualStyle>('fractions_visualizer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim() || !concept.trim()) return;

    const newVideo: TeachTokVideo = {
      id: `vid-teacher-${Date.now()}`,
      title: title.trim(),
      concept: concept.trim(),
      subject,
      gradeBand,
      teachingStrategy: 'Direct Instruction',
      standardCode: standardCode.trim() || 'TEACHER-CUSTOM-STANDARD',
      pedagogyTag: pedagogyTag.trim() || 'Classroom Tested',
      summary: `${concept}: ${keyAnalogy.slice(0, 120)}...`,
      teacher: {
        id: user.id,
        name: user.displayName,
        handle: user.handle,
        avatar:
          user.avatarUrl ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=4f46e5&color=fff`,
        role: user.role === 'admin' ? 'Admin' : `${gradeBand} Specialist`,
        school: user.school || 'Independent Educator',
        subjects: [subject],
        gradeBand,
        badge: 'Mentor Teacher',
        stolenIdeasCount: 1,
      },
      videoDuration: 45,
      visualStyle,
      likes: 1,
      bookmarks: 1,
      shares: 0,
      remixesCount: 0,
      keyAnalogy: keyAnalogy.trim() || 'Analogous to real-world experience.',
      classroomHook: classroomHook.trim() || 'Pencils down, eye contact hook.',
      misconceptionBuster: misconceptionBuster.trim() || 'Addresses common student confusion points.',
      resources: [
        {
          id: `res-hook-${Date.now()}`,
          type: 'hook_script',
          title: 'Whiteboard Demonstration Script',
          description: 'Step-by-step teacher prompts.',
          gradeSuitability: gradeBand,
          timeEstimate: '3 mins',
          content: {
            steps: [
              {
                stepNumber: 1,
                title: 'The Hook Demonstration',
                dialogueScript: classroomHook || 'Teacher introduces the counter-intuitive puzzle on the board.',
                teacherNote: 'Wait for hands before explaining.'
              },
              {
                stepNumber: 2,
                title: 'The Core Analogy',
                dialogueScript: keyAnalogy || 'Introduce the tangible metaphor.',
                teacherNote: 'Have students repeat back the key metaphor.'
              }
            ]
          }
        }
      ],
      comments: [
        {
          id: `comment-first-${Date.now()}`,
          authorName: 'TeachTok Community Guide',
          authorRole: 'Instructional Coach',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          text: 'Brilliant pedagogical angle! Love how this breaks down the misconception before it takes root.',
          timestamp: 'Just now',
          classroomSuccessRating: 5,
          upvotes: 2,
          verifiedTeacher: true
        }
      ]
    };

    onPublish(newVideo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">Share a Teaching Concept</h3>
              <p className="text-xs text-slate-400">
                Demonstrate how you explain tricky concepts to fellow teachers
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Concept Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Stop Saying Keep-Change-Flip Without Showing This"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Specific Learning Target / Concept *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dividing Fractions with Visual Representation"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
              >
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="English & ELA">English & ELA</option>
                <option value="History & Social Studies">History & Social Studies</option>
                <option value="Arts">Arts</option>
                <option value="Classroom Management">Classroom Management</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Grade Band
              </label>
              <select
                value={gradeBand}
                onChange={(e) => setGradeBand(e.target.value as GradeBand)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
              >
                <option value="Elementary (K-5)">Elementary (K-5)</option>
                <option value="Middle School (6-8)">Middle School (6-8)</option>
                <option value="High School (9-12)">High School (9-12)</option>
                <option value="Higher Ed">Higher Ed</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Standard Code
              </label>
              <input
                type="text"
                placeholder="e.g. CCSS.MATH.5.NF.B.7"
                value={standardCode}
                onChange={(e) => setStandardCode(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Teaching Technique / Pedagogy Tag
            </label>
            <input
              type="text"
              placeholder="e.g. CRA Concrete First, Zombie Diagnostic, Kinesthetic Hand Sign"
              value={pedagogyTag}
              onChange={(e) => setPedagogyTag(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              The 15-Second Hook (How do you grab attention?)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Bring an actual measuring cup and jar to class. Tell them: 'Who told you division always shrinks numbers?'"
              value={classroomHook}
              onChange={(e) => setClassroomHook(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              The Core Metaphor / Analogy (How do you explain it?)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Division always answers 'How many scoops of the second quantity fit inside the first container?'"
              value={keyAnalogy}
              onChange={(e) => setKeyAnalogy(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Student Trap / Misconception Avoided
            </label>
            <input
              type="text"
              placeholder="e.g. Kids invert the first fraction instead of the divisor on the exam"
              value={misconceptionBuster}
              onChange={(e) => setMisconceptionBuster(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Visual Demonstration Model
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'fractions_visualizer', label: 'Fraction / Proportion Jars' },
                { id: 'zombie_grammar_visualizer', label: 'Zombie Syntax Tester' },
                { id: 'pythagorean_visualizer', label: 'Pythagorean Liquid Proof' },
                { id: 'mitosis_visualizer', label: 'Cell Division IPMAT Dance' },
                { id: 'gravity_visualizer', label: 'Spacetime Curvature Trampoline' },
                { id: 'chemical_bonds_visualizer', label: 'Atomic Roommate Bond' },
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setVisualStyle(m.id as VisualStyle)}
                  className={`p-2 rounded-xl text-left text-xs transition border ${
                    visualStyle === m.id
                      ? 'bg-indigo-600/30 border-indigo-500 text-white font-bold'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
            >
              <Upload className="w-4 h-4" />
              Publish Concept to TeachTok Feed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
