import React from 'react';
import { SubjectFilter, GradeBand } from '../types';
import { Sparkles, Bookmark, Plus, Search, BookOpen, Volume2, VolumeX, Info, Flame, GraduationCap, LogOut } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSubject: SubjectFilter;
  onSelectSubject: (subject: SubjectFilter) => void;
  selectedGrade: string;
  onSelectGrade: (grade: string) => void;
  savedCount: number;
  onOpenBinder: () => void;
  onOpenCreate: () => void;
  onOpenAI: () => void;
  onOpenAbout: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  userName?: string;
  userRole?: string;
  canCreate?: boolean;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedSubject,
  onSelectSubject,
  selectedGrade,
  onSelectGrade,
  savedCount,
  onOpenBinder,
  onOpenCreate,
  onOpenAI,
  onOpenAbout,
  isMuted,
  onToggleMute,
  userName,
  userRole,
  canCreate = true,
  onLogout,
}) => {
  const subjects: { id: SubjectFilter; label: string }[] = [
    { id: 'all', label: '🔥 All Concepts' },
    { id: 'Math', label: '📐 Math' },
    { id: 'Science', label: '🔬 Science' },
    { id: 'English & ELA', label: '📚 English & ELA' },
    { id: 'History & Social Studies', label: '🏛️ History & Civics' },
    { id: 'Classroom Management', label: '🎯 Hooks & Management' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top brand & control row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onSelectSubject('all')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">TEACH<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">TOK</span></span>
                <span className="text-[10px] font-mono uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-500/40 px-1.5 py-0.2 rounded font-bold">
                  FOR EDUCATORS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Where teachers steal great teaching ideas</p>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts (e.g. Passive Voice, Fractions, Mitosis, Gravity)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* AI Pedagogical Studio */}
          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-indigo-600/30 to-purple-600/30 hover:from-indigo-600/50 hover:to-purple-600/50 border border-indigo-500/40 text-indigo-300 hover:text-white px-3 py-2 rounded-xl transition"
            title="TeachTok AI Pedagogical Assistant"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">AI Concept Engine</span>
          </button>

          {/* Lesson Binder */}
          <button
            onClick={onOpenBinder}
            className="relative flex items-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 px-3 py-2 rounded-xl transition"
            title="My Lesson Binder"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Lesson Binder</span>
            {savedCount > 0 && (
              <span className="w-4 h-4 bg-amber-500 text-slate-950 font-extrabold text-[10px] rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Share Teaching Strategy */}
          <button
            onClick={onOpenCreate}
            disabled={!canCreate}
            className="flex items-center gap-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3.5 py-2 rounded-xl transition shadow-lg shadow-indigo-600/25"
            title={canCreate ? 'Share a Teaching Strategy' : 'You do not have permission to create videos'}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Demonstrate Concept</span>
          </button>

          {/* About */}
          <button
            onClick={onOpenAbout}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="About TeachTok"
          >
            <Info className="w-4 h-4" />
          </button>

          {userName && (
            <div
              className="hidden lg:flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-2 rounded-xl"
              title={`Signed in as ${userName}`}
            >
              <span className="font-semibold text-white max-w-[8rem] truncate">{userName}</span>
              {userRole && (
                <span className="text-[10px] uppercase font-mono text-indigo-400">{userRole}</span>
              )}
            </div>
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Sub-bar: Subject category pills & grade filter */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 border-t border-slate-900/60 flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          {subjects.map((sub) => {
            const isSelected = selectedSubject === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => onSelectSubject(sub.id)}
                className={`text-xs px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-white text-slate-950 shadow'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>

        {/* Grade band selector */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Grade:</span>
          <select
            value={selectedGrade}
            onChange={(e) => onSelectGrade(e.target.value)}
            className="bg-slate-900 text-slate-300 text-xs rounded-lg px-2.5 py-1 border border-slate-800 outline-none hover:border-slate-700 transition"
          >
            <option value="all">All Grades (K-Higher Ed)</option>
            <option value="Elementary (K-5)">Elementary (K-5)</option>
            <option value="Middle School (6-8)">Middle School (6-8)</option>
            <option value="High School (9-12)">High School (9-12)</option>
            <option value="Higher Ed">Higher Ed</option>
          </select>
        </div>
      </div>
    </header>
  );
};
