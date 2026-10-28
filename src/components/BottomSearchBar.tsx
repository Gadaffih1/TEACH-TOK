import React, { useState } from 'react';
import { Search, X, Sparkles, Filter, Check, BookOpen, Layers, Laptop, Globe, Flame } from 'lucide-react';
import { SubjectFilter } from '../types';

interface BottomSearchBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalMatched: number;
  selectedSubject: SubjectFilter;
  onSelectSubject: (sub: SubjectFilter) => void;
  currentIndex: number;
}

export const BottomSearchBar: React.FC<BottomSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  totalMatched,
  selectedSubject,
  onSelectSubject,
  currentIndex,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const curatedTopics = [
    { label: '💻 Computer Studies G1-G12', query: 'Computer Studies', subject: 'Computer Studies' as SubjectFilter },
    { label: '🇰🇪 Kiswahili Ngeli & Vitendawili', query: 'Kiswahili', subject: 'Kiswahili' as SubjectFilter },
    { label: '🧪 Chemistry KCSE', query: 'Chemistry', subject: 'Science' as SubjectFilter },
    { label: '⚡ Olkaria Physics', query: 'Physics', subject: 'Science' as SubjectFilter },
    { label: '🧬 Biology Mitosis', query: 'Biology', subject: 'Science' as SubjectFilter },
    { label: '📐 Chapati Fractions', query: 'Fractions', subject: 'Math' as SubjectFilter },
    { label: '📲 M-Pesa Databases', query: 'M-Pesa', subject: 'Computer Studies' as SubjectFilter },
  ];

  const handleChipClick = (t: typeof curatedTopics[0]) => {
    onSelectSubject('all');
    onSearchChange(t.query);
  };

  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none pb-2 sm:pb-3 px-3 sm:px-6">
      <div className="max-w-2xl mx-auto pointer-events-auto">
        {/* Curated quick filter chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1.5 text-[11px]">
          {curatedTopics.map((t) => {
            const isActive = searchQuery.toLowerCase() === t.query.toLowerCase();
            return (
              <button
                key={t.label}
                onClick={() => handleChipClick(t)}
                className={`whitespace-nowrap px-2.5 py-1 rounded-full font-semibold transition border shadow-xs cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm scale-105'
                    : 'bg-white/95 text-slate-700 border-slate-200/90 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{t.label}</span>
                {isActive && <Check className="w-3 h-3" />}
              </button>
            );
          })}
        </div>

        {/* Main Floating Search Dock */}
        <div
          className={`w-full bg-white/98 border rounded-2xl shadow-xl backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2.5 transition-all ${
            isFocused || searchQuery
              ? 'border-indigo-500 ring-2 ring-indigo-200 shadow-indigo-100/50'
              : 'border-slate-300/90 hover:border-slate-400'
          }`}
        >
          {/* Search Icon */}
          <div className="text-indigo-600 shrink-0">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search any topic, curriculum code, or concept (e.g. Kiswahili Ngeli, Olkaria, Titration, G3 Computer)..."
            className="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none font-medium"
          />

          {/* Clear button if active */}
          {searchQuery && (
            <button
              onClick={handleClear}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition shrink-0 cursor-pointer"
              title="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Dynamic Match Badge */}
          <div className="shrink-0 pl-1 border-l border-slate-200 flex items-center gap-1 text-[11px] font-mono font-semibold">
            {totalMatched > 0 ? (
              <span className="text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                {totalMatched} {totalMatched === 1 ? 'lesson' : 'lessons'}
              </span>
            ) : (
              <span className="text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                0 matches
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
