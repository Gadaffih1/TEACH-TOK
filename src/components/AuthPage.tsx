import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import type { GradeBand } from '../types';

const GRADE_BANDS: GradeBand[] = ['Elementary (K-5)', 'Middle School (6-8)', 'High School (9-12)', 'Higher Ed'];
const SUBJECTS = ['Math', 'Science', 'English & ELA', 'History & Social Studies', 'Arts', 'Classroom Management'];

const inputCls =
  'w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition';

export const AuthPage: React.FC = () => {
  const { login, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [school, setSchool] = useState('');
  const [gradeBand, setGradeBand] = useState<GradeBand>('Middle School (6-8)');
  const [subjects, setSubjects] = useState<string[]>([]);

  const toggleSubject = (s: string) =>
    setSubjects((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await signUp({ email, password, displayName, school, subjects, gradeBand });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-4 rounded-2xl bg-slate-900/60 border border-slate-800 p-6"
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">TEACHTOK</h1>
        </div>
        <p className="text-sm text-slate-400">
          {mode === 'login' ? 'Sign in to your educator account.' : 'Create your educator account.'}
        </p>

        {mode === 'signup' && (
          <>
            <input className={inputCls} placeholder="Display name" value={displayName}
              onChange={(e) => setDisplayName(e.target.value)} required />
            <input className={inputCls} placeholder="School (optional)" value={school}
              onChange={(e) => setSchool(e.target.value)} />
            <select className={inputCls} value={gradeBand} onChange={(e) => setGradeBand(e.target.value as GradeBand)}>
              {GRADE_BANDS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <button type="button" key={s} onClick={() => toggleSubject(s)}
                  className={`px-3 py-1 rounded-full text-xs border ${
                    subjects.includes(s)
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'border-slate-700 text-slate-300'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </>
        )}

        <input className={inputCls} type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
        <input className={inputCls} type="password" placeholder="Password (min 8 chars)" value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required />

        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

        <button type="submit" disabled={busy}
          className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 py-2 font-semibold transition">
          {busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
        </button>

        <button type="button" className="w-full text-sm text-slate-400 hover:text-slate-200"
          onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); }}>
          {mode === 'login' ? 'New here? Create an account' : 'Already have an account? Sign in'}
        </button>

        {mode === 'login' && (
          <p className="text-xs text-slate-500 text-center">
            Demo: teacher@teachtok.dev / teacher1234 · admin@teachtok.dev / admin1234
          </p>
        )}
      </form>
    </div>
  );
};
