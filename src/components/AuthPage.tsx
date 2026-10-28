import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import type { GradeBand } from '../types';

const GRADE_BANDS: GradeBand[] = ['Elementary (K-5)', 'Middle School (6-8)', 'High School (9-12)', 'Higher Ed'];
const SUBJECTS = ['Math', 'Science', 'English & ELA', 'History & Social Studies', 'Arts', 'Classroom Management'];

const inputCls =
  'w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition';

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
    <div className="min-h-screen bg-slate-100 text-slate-800 flex items-center justify-center p-4 font-sans">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-4 rounded-3xl bg-white border border-slate-200 p-8 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              TEACH<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">TOK</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">For verified educators</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 pt-1">
          {mode === 'login' ? 'Sign in to your educator account.' : 'Create your educator account.'}
        </p>

        {mode === 'signup' && (
          <div className="space-y-3">
            <input className={inputCls} placeholder="Display name" value={displayName}
              onChange={(e) => setDisplayName(e.target.value)} required />
            <input className={inputCls} placeholder="School (optional)" value={school}
              onChange={(e) => setSchool(e.target.value)} />
            <select className={inputCls} value={gradeBand} onChange={(e) => setGradeBand(e.target.value as GradeBand)}>
              {GRADE_BANDS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            <div>
              <span className="text-xs font-semibold text-slate-600 mb-1.5 block">Subjects you teach:</span>
              <div className="flex flex-wrap gap-1.5">
                {SUBJECTS.map((s) => (
                  <button type="button" key={s} onClick={() => toggleSubject(s)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition cursor-pointer ${
                      subjects.includes(s)
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <input className={inputCls} type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
        <input className={inputCls} type="password" placeholder="Password (min 8 chars)" value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required />

        {error && <p role="alert" className="text-xs text-rose-600 font-semibold bg-rose-50 border border-rose-200 p-2.5 rounded-xl">{error}</p>}

        <button type="submit" disabled={busy}
          className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 py-2.5 font-bold text-white transition shadow-sm cursor-pointer">
          {busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
        </button>

        <button type="button" className="w-full text-xs text-slate-500 hover:text-indigo-600 transition cursor-pointer font-medium"
          onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); }}>
          {mode === 'login' ? 'New here? Create an account' : 'Already have an account? Sign in'}
        </button>

        {mode === 'login' && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 text-center space-y-0.5">
            <span className="font-semibold text-slate-700 block mb-0.5">Quick Demo Logins:</span>
            <div><span className="font-mono text-indigo-700">teacher@teachtok.dev</span> / <span className="font-mono">teacher1234</span></div>
            <div><span className="font-mono text-indigo-700">admin@teachtok.dev</span> / <span className="font-mono">admin1234</span></div>
          </div>
        )}
      </form>
    </div>
  );
};
