import React from 'react';
import { SubjectFilter, TeachingStrategy } from '../types';
import { Sparkles, Bookmark, Plus, Search, Info, GraduationCap, LogOut, Layers, Target, Compass, Gamepad2, Users } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSubject: SubjectFilter;
  onSelectSubject: (subject: SubjectFilter) => void;
  selectedStrategy: TeachingStrategy;
  onSelectStrategy: (strategy: TeachingStrategy) => void;
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
  selectedStrategy,
  onSelectStrategy,
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
    { id: 'all', label: '🔥 All CBC Concepts' },
    { id: 'Computer Studies', label: '💻 Computer Studies & ICT' },
    { id: 'Kiswahili', label: '🇰🇪 Kiswahili' },
    { id: 'Math', label: '📐 Mathematics' },
    { id: 'Science', label: '🔬 Science (Chem/Bio/Phy)' },
    { id: 'English & ELA', label: '📚 English & ELA' },
    { id: 'History & Social Studies', label: '🏛️ Social Studies & History' },
    { id: 'Classroom Management', label: '🎯 CBC Facilitation & Hooks' },
  ];

  const strategies: { id: TeachingStrategy; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Strategies', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'Direct Instruction', label: 'Direct Instruction', icon: <Target className="w-3.5 h-3.5" /> },
    { id: 'Inquiry-Based', label: 'Inquiry-Based', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'Gamification', label: 'Gamification', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
    { id: 'Peer Review', label: 'Peer Review', icon: <Users className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm">
      {/* Top brand & control row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              onSelectSubject('all');
              onSelectStrategy('all');
            }}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-indigo-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  TEACH<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-indigo-600 to-rose-600">TOK</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  KENYA CBC & KCSE
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block">Where Kenyan Walimu discover and share great teaching</p>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts, standards, or teaching models..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* AI Pedagogical Studio */}
          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 text-indigo-700 px-3 py-2 rounded-xl transition shadow-xs"
            title="TeachTok AI Pedagogical Assistant"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">AI Concept Engine</span>
          </button>

          {/* Lesson Binder */}
          <button
            onClick={onOpenBinder}
            className="relative flex items-center gap-1.5 text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-2 rounded-xl transition shadow-xs"
            title="My Lesson Binder"
          >
            <Bookmark className="w-4 h-4 text-amber-500 fill-amber-100" />
            <span className="hidden sm:inline">Lesson Binder</span>
            {savedCount > 0 && (
              <span className="w-4 h-4 bg-amber-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Share Teaching Strategy */}
          <button
            onClick={onOpenCreate}
            disabled={!canCreate}
            className="flex items-center gap-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3.5 py-2 rounded-xl transition shadow-sm"
            title={canCreate ? 'Share a Teaching Strategy' : 'You do not have permission to create videos'}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Demonstrate Concept</span>
          </button>

          {/* About */}
          <button
            onClick={onOpenAbout}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            title="About TeachTok"
          >
            <Info className="w-4 h-4" />
          </button>

          {userName && (
            <div
              className="hidden lg:flex items-center gap-1.5 text-xs bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-2 rounded-xl"
              title={`Signed in as ${userName}`}
            >
              <span className="font-semibold text-slate-900 max-w-[8rem] truncate">{userName}</span>
              {userRole && (
                <span className="text-[10px] uppercase font-mono text-indigo-600 font-bold bg-indigo-50 px-1 rounded">{userRole}</span>
              )}
            </div>
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Sub-bar: Subject category pills & Strategy filters */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        {/* Subject Pills */}
        <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto scrollbar-none">
          {subjects.map((sub) => {
            const isSelected = selectedSubject === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => onSelectSubject(sub.id)}
                className={`text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>

        {/* Strategy Pills & Grade Filter */}
        <div className="flex items-center gap-2 shrink-0 overflow-x-auto scrollbar-none justify-between sm:justify-end">
          {/* Strategy Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200/80">
            {strategies.map((strat) => {
              const isSelected = selectedStrategy === strat.id;
              return (
                <button
                  key={strat.id}
                  onClick={() => onSelectStrategy(strat.id)}
                  className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg font-medium transition whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-white text-indigo-700 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                  title={`Filter by ${strat.label}`}
                >
                  {strat.icon}
                  <span>{strat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Grade band selector */}
          <div className="flex items-center gap-1.5 shrink-0">
            <select
              value={selectedGrade}
              onChange={(e) => onSelectGrade(e.target.value)}
              className="bg-slate-100 text-slate-700 text-xs rounded-xl px-2.5 py-1.5 border border-slate-200 outline-none hover:border-slate-300 focus:border-indigo-500 font-medium transition"
            >
              <option value="all">All Grades (CBC & KCSE)</option>
              <option value="Lower Primary (Grade 1-3)">Lower Primary (Grade 1-3)</option>
              <option value="Upper Primary (Grade 4-6)">Upper Primary (Grade 4-6)</option>
              <option value="Junior School (Grade 7-9)">Junior School (Grade 7-9)</option>
              <option value="Senior School (Grade 10-12)">Senior School (Grade 10-12)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
