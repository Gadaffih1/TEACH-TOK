import React, { useState, useEffect, useMemo } from 'react';
import { VisualStyle } from '../types';
import { Sparkles, Check, AlertCircle, RefreshCw, Zap, Cpu, ArrowRight, Play, Pause, BookOpen, Layers, ToggleLeft, ToggleRight } from 'lucide-react';

interface VisualizerProps {
  style: VisualStyle;
  isPlaying: boolean;
  concept: string;
  hook?: string;
  analogy?: string;
  subject?: string;
  title?: string;
  teacherName?: string;
}

// =========================================================================
// 1. RUNNING WORDS VISUALIZER (KINETIC TYPOGRAPHY / TELEPROMPTER FOR NO-IMAGE CONTENT)
// =========================================================================
export const RunningWordsVisualizer: React.FC<{
  isPlaying: boolean;
  concept: string;
  hook?: string;
  analogy?: string;
  subject?: string;
  title?: string;
}> = ({ isPlaying, concept, hook, analogy, subject, title }) => {
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [mode, setMode] = useState<'kinetic' | 'smartboard'>('kinetic');
  const [speed, setSpeed] = useState<'normal' | 'fast'>('normal');

  // Break hook & analogy into continuous stream of pedagogical words
  const fullScript = useMemo(() => {
    const raw = `${hook || ''} ${analogy || ''}`.trim() || `${concept}: Demonstrating key conceptual foundations in the Kenyan curriculum.`;
    return raw.split(/\s+/).filter(Boolean);
  }, [hook, analogy, concept]);

  // Stepping word cursor when playing
  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = speed === 'normal' ? 320 : 180;
    const interval = setInterval(() => {
      setActiveWordIdx((prev) => (prev + 1) % Math.max(1, fullScript.length));
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isPlaying, speed, fullScript.length]);

  const activeWord = fullScript[activeWordIdx] || '';
  const cleanWord = activeWord.replace(/[^a-zA-Z0-9]/g, '');

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-white select-none relative overflow-hidden">
      {/* Dynamic Background Animated Words / Marquee */}
      <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden flex flex-col justify-between py-6">
        <div className="whitespace-nowrap animate-marquee text-4xl sm:text-6xl font-black font-mono tracking-tighter text-indigo-400">
          {subject?.toUpperCase() || 'KENYAN CURRICULUM'} • {concept.toUpperCase()} • CBC COMPETENCIES •
        </div>
        <div className="whitespace-nowrap text-3xl sm:text-5xl font-black font-mono tracking-widest text-emerald-400 opacity-60">
          ACTIVE PEDAGOGY • CLASSROOM HOOK • INTUITIVE ANALOGY •
        </div>
        <div className="whitespace-nowrap animate-marquee text-4xl sm:text-6xl font-black font-mono tracking-tighter text-amber-400">
          TEACHER DEMONSTRATION • WALIMU NETWORK • KENYA CBC •
        </div>
      </div>

      {/* Main Kinetic Typography / Smartboard Container */}
      <div className="w-full max-w-sm sm:max-w-md bg-white/95 text-slate-900 border border-indigo-200/90 rounded-3xl p-5 shadow-2xl backdrop-blur-md relative z-10">
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-900 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
              {subject || 'Core Concept'} • Running Words
            </span>
          </div>
          <button
            onClick={() => setMode(mode === 'kinetic' ? 'smartboard' : 'kinetic')}
            className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition border border-slate-200 cursor-pointer"
          >
            {mode === 'kinetic' ? '📋 Teleprompter' : '⚡ Kinetic Text'}
          </button>
        </div>

        {/* Concept Title Banner */}
        <div className="mb-3 text-center">
          <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">Concept in Focus</span>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug line-clamp-2">
            {title || concept}
          </h3>
        </div>

        {/* Running Words Dynamic Stage */}
        {mode === 'kinetic' ? (
          <div className="bg-slate-950 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 text-center shadow-inner min-h-[140px] flex flex-col justify-center items-center relative overflow-hidden">
            <div className="text-[10px] uppercase font-mono text-indigo-400 mb-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400 animate-bounce" /> Live Running Narration
            </div>

            {/* Huge highlighted active word */}
            <div className="my-2 transition-all duration-150 transform scale-105">
              <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-300 via-emerald-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm uppercase tracking-wide">
                "{cleanWord}"
              </span>
            </div>

            {/* Surrounding phrase preview */}
            <div className="text-xs text-slate-300 leading-relaxed font-medium line-clamp-2 px-2">
              {fullScript.slice(Math.max(0, activeWordIdx - 3), activeWordIdx + 4).map((w, idx) => {
                const isCurrent = idx === Math.min(3, activeWordIdx);
                return (
                  <span
                    key={idx}
                    className={`mx-0.5 inline-block transition-colors ${
                      isCurrent
                        ? 'text-amber-300 font-bold underline decoration-indigo-400 decoration-2'
                        : 'text-slate-400'
                    }`}
                  >
                    {w}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          /* Smartboard Teleprompter Mode */
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 shadow-inner max-h-[160px] overflow-y-auto space-y-2 text-xs leading-relaxed text-slate-700">
            <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-700 uppercase">
              <BookOpen className="w-3 h-3" /> Teacher Delivery Script:
            </div>
            <p className="text-[11px] sm:text-xs">
              {fullScript.map((w, idx) => {
                const isCurrent = idx === activeWordIdx;
                return (
                  <span
                    key={idx}
                    className={`inline-block mx-0.5 px-0.5 rounded transition ${
                      isCurrent
                        ? 'bg-amber-200 text-amber-950 font-extrabold ring-1 ring-amber-400'
                        : idx < activeWordIdx
                        ? 'text-slate-500'
                        : 'text-slate-800'
                    }`}
                  >
                    {w}
                  </span>
                );
              })}
            </p>
          </div>
        )}

        {/* Word Counter & Speed Controls */}
        <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
          <span className="font-mono font-medium">
            Word {activeWordIdx + 1} / {fullScript.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSpeed(speed === 'normal' ? 'fast' : 'normal')}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-[10px] border border-slate-200 transition"
            >
              Speed: {speed === 'normal' ? '1.0x' : '1.8x'}
            </button>
            <button
              onClick={() => setActiveWordIdx(0)}
              className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
              title="Restart words"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Classroom Prompt footer */}
      <div className="mt-3 text-center max-w-xs text-[11px] text-slate-300 font-medium">
        💡 Running words on screen help learners connect audio speech to written pedagogical keywords!
      </div>
    </div>
  );
};

// =========================================================================
// 2. KISWAHILI VISUALIZER (NGELI ZA NOMINO, VITENDAWILI & METHALI)
// =========================================================================
export const KiswahiliVisualizer: React.FC<{ concept: string; isPlaying: boolean }> = ({ concept }) => {
  const [tab, setTab] = useState<'ngeli' | 'vitendawili'>('ngeli');
  const [selectedNgeli, setSelectedNgeli] = useState<'A-WA' | 'KI-VI' | 'I-ZI' | 'LI-YA'>('A-WA');
  const [riddleIndex, setRiddleIndex] = useState(0);
  const [showRiddleAnswer, setShowRiddleAnswer] = useState(false);

  const ngeliExamples = {
    'A-WA': {
      nominoUmoja: 'Mwanafunzi',
      nominoWingi: 'Wanafunzi',
      kitenziUmoja: 'anasoma kwa bidii',
      kitenziWingi: 'wanasoma kwa bidii',
      maelezo: 'Hutumiwa kwa viumbe hai (watu na wanyama). Kiambishi cha umoja ni A- na wingi ni WA-.'
    },
    'KI-VI': {
      nominoUmoja: 'Kitabu',
      nominoWingi: 'Vitabu',
      kitenziUmoja: 'kimesomwa darasani',
      kitenziWingi: 'vimesomwa darasani',
      maelezo: 'Hutumiwa kwa vitu vinavyoanza na KI- katika umoja na VI- katika wingi.'
    },
    'I-ZI': {
      nominoUmoja: 'Nyumba',
      nominoWingi: 'Nyumba',
      kitenziUmoja: 'imejengwa vizuri',
      kitenziWingi: 'zimejengwa vizuri',
      maelezo: 'Nomino haibadiliki umbo lake; kiambishi cha kitenzi hubadilika kutoka I- hadi ZI-.'
    },
    'LI-YA': {
      nominoUmoja: 'Jicho / Gari',
      nominoWingi: 'Macho / Magari',
      kitenziUmoja: 'limefika salama',
      kitenziWingi: 'yamefika salama',
      maelezo: 'Katika umoja hutumia kiambishi LI- na katika wingi hutumia YA-.'
    }
  };

  const vitendawili = [
    { kitendawili: 'Bakari amevaa kofia nyeupe lakini hana kichwa?', jibu: 'Uyoga (Mushroom)', mafunzo: 'Kutambua umbo la uyoga kupitia sitiari ya kofia.' },
    { kitendawili: 'Huku ng\'o na kule ng\'o?', jibu: 'Giza (Darkness)', mafunzo: 'Uwezo wa giza kuenea kila mahali bila mipaka.' },
    { kitendawili: 'Nyumba yangu haina mlango?', jibu: 'Yai (Egg)', mafunzo: 'Muundo uliofungika wa yai kabla ya kuanguliwa.' },
    { kitendawili: 'Mwanangu analia kichakani?', jibu: 'Shoka (Axe likikata mti)', mafunzo: 'Sauti ya shoka msituni kama kilio cha binadamu.' }
  ];

  const curNgeli = ngeliExamples[selectedNgeli];
  const curRiddle = vitendawili[riddleIndex];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50 via-slate-100 to-emerald-50 text-slate-800 select-none">
      <div className="w-full max-w-sm bg-white/95 border border-amber-300 rounded-3xl p-5 shadow-xl backdrop-blur-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1.5 shadow-xs">
            🇰🇪 Kiswahili Sanifu
          </span>
          <div className="flex gap-1 text-[10px] font-bold">
            <button
              onClick={() => setTab('ngeli')}
              className={`px-2 py-0.5 rounded-lg border transition ${
                tab === 'ngeli' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Ngeli za Nomino
            </button>
            <button
              onClick={() => setTab('vitendawili')}
              className={`px-2 py-0.5 rounded-lg border transition ${
                tab === 'vitendawili' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Vitendawili
            </button>
          </div>
        </div>

        {tab === 'ngeli' ? (
          <div>
            {/* Ngeli Selector */}
            <div className="grid grid-cols-4 gap-1 mb-3">
              {(['A-WA', 'KI-VI', 'I-ZI', 'LI-YA'] as const).map((ng) => (
                <button
                  key={ng}
                  onClick={() => setSelectedNgeli(ng)}
                  className={`text-xs py-1.5 rounded-xl font-bold transition border cursor-pointer ${
                    selectedNgeli === ng
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                  }`}
                >
                  {ng}
                </button>
              ))}
            </div>

            {/* Sentence Concordance Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2 mb-3 shadow-inner">
              <div>
                <span className="text-[10px] font-bold text-indigo-700 uppercase block">Umoja (Singular):</span>
                <p className="text-sm font-bold text-slate-900">
                  <span className="text-amber-700 underline">{curNgeli.nominoUmoja}</span>{' '}
                  <span className="text-emerald-700">{curNgeli.kitenziUmoja}</span>.
                </p>
              </div>

              <div className="border-t border-slate-200 pt-2">
                <span className="text-[10px] font-bold text-emerald-700 uppercase block">Wingi (Plural):</span>
                <p className="text-sm font-bold text-slate-900">
                  <span className="text-amber-700 underline">{curNgeli.nominoWingi}</span>{' '}
                  <span className="text-emerald-700">{curNgeli.kitenziWingi}</span>.
                </p>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              💡 <strong>Kanuni ya Upataji Viambishi:</strong> {curNgeli.maelezo}
            </p>
          </div>
        ) : (
          /* Vitendawili (Riddles) */
          <div>
            <div className="bg-slate-900 text-white rounded-2xl p-4 text-center my-3 border border-slate-800 shadow-inner min-h-[110px] flex flex-col justify-center">
              <span className="text-[10px] uppercase font-mono text-amber-400 font-bold mb-1">Kitendawili #{riddleIndex + 1}:</span>
              <p className="text-sm sm:text-base font-extrabold text-white leading-relaxed">
                "{curRiddle.kitendawili}"
              </p>
              {showRiddleAnswer && (
                <div className="mt-2 text-xs font-bold text-emerald-400 bg-emerald-950/70 py-1 px-3 rounded-lg border border-emerald-600 inline-block">
                  Jibu: {curRiddle.jibu}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowRiddleAnswer(!showRiddleAnswer)}
                className="flex-1 text-xs py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition shadow-xs cursor-pointer"
              >
                {showRiddleAnswer ? 'Ficha Jibu' : 'Tega! Onyesha Jibu'}
              </button>
              <button
                onClick={() => {
                  setShowRiddleAnswer(false);
                  setRiddleIndex((prev) => (prev + 1) % vitendawili.length);
                }}
                className="text-xs py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold border border-slate-200 transition cursor-pointer"
              >
                Kitendawili Kifuatacho ➔
              </button>
            </div>
            <p className="mt-2.5 text-[10px] text-slate-500 text-center font-medium">
              Mafunzo: {curRiddle.mafunzo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 3. COMPUTER STUDIES VISUALIZER (IPO POSHO MILL, BINARY GATES & M-PESA DB)
// =========================================================================
export const ComputerStudiesVisualizer: React.FC<{ concept: string; isPlaying: boolean }> = ({ concept }) => {
  const [tab, setTab] = useState<'ipo' | 'binary' | 'db'>('ipo');
  const [switchA, setSwitchA] = useState(false);
  const [switchB, setSwitchB] = useState(false);
  const [gate, setGate] = useState<'AND' | 'OR'>('AND');
  const [ipoStep, setIpoStep] = useState<0 | 1 | 2 | 3>(0);

  const ipoStages = [
    { title: '1. INPUT', icon: '🌽', hardware: 'Keyboard / Mouse / Scanner', analog: 'Dry maize poured into the posho mill hopper' },
    { title: '2. PROCESSING', icon: '⚙️', hardware: 'CPU (Control Unit + ALU)', analog: 'Diesel motor and grinding millstones crushing maize' },
    { title: '3. OUTPUT', icon: '🍚', hardware: 'Monitor / Speaker / Printer', analog: 'Fresh sifted unga flour flowing into the bucket' },
    { title: '4. STORAGE', icon: '🎒', hardware: 'SSD / Hard Disk / Cloud', analog: 'Flour sacks sealed and stacked in the granary' }
  ];

  const lightState = gate === 'AND' ? switchA && switchB : switchA || switchB;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sky-50 via-slate-100 to-indigo-100 text-slate-800 select-none">
      <div className="w-full max-w-sm bg-white/95 border border-indigo-200 rounded-3xl p-5 shadow-xl backdrop-blur-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2.5 py-1 rounded-full border border-indigo-300 flex items-center gap-1.5 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-indigo-600" /> Computer Studies Lab
          </span>
          <div className="flex gap-1 text-[10px] font-bold">
            <button
              onClick={() => setTab('ipo')}
              className={`px-2 py-0.5 rounded-lg border transition ${
                tab === 'ipo' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 text-slate-600'
              }`}
            >
              IPO Mill
            </button>
            <button
              onClick={() => setTab('binary')}
              className={`px-2 py-0.5 rounded-lg border transition ${
                tab === 'binary' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Binary Gates
            </button>
            <button
              onClick={() => setTab('db')}
              className={`px-2 py-0.5 rounded-lg border transition ${
                tab === 'db' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 text-slate-600'
              }`}
            >
              M-Pesa DB
            </button>
          </div>
        </div>

        {tab === 'ipo' ? (
          /* IPO Cycle Model */
          <div>
            <div className="grid grid-cols-4 gap-1 mb-3">
              {ipoStages.map((st, i) => (
                <button
                  key={st.title}
                  onClick={() => setIpoStep(i as any)}
                  className={`text-[10px] py-1.5 rounded-xl font-bold transition border cursor-pointer ${
                    ipoStep === i
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                  }`}
                >
                  {st.title.split('.')[1]}
                </button>
              ))}
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-4 text-center my-2 border border-slate-800 shadow-inner">
              <span className="text-3xl mb-1 block">{ipoStages[ipoStep].icon}</span>
              <h4 className="font-extrabold text-sm text-indigo-300">{ipoStages[ipoStep].title}</h4>
              <p className="text-xs font-mono text-emerald-300 mt-0.5">{ipoStages[ipoStep].hardware}</p>
              <div className="mt-2.5 p-2 bg-slate-800/80 rounded-xl text-[11px] text-slate-200 border border-slate-700">
                "{ipoStages[ipoStep].analog}"
              </div>
            </div>

            <div className="flex justify-between items-center text-xs mt-3">
              <button
                onClick={() => setIpoStep(((ipoStep + 1) % 4) as any)}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                Next IPO Stage <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : tab === 'binary' ? (
          /* Binary Logic Gates */
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-slate-700">Logic Gate Type:</span>
              <div className="flex gap-1 text-xs">
                <button
                  onClick={() => setGate('AND')}
                  className={`px-3 py-1 rounded-lg font-bold border transition ${
                    gate === 'AND' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  AND Gate
                </button>
                <button
                  onClick={() => setGate('OR')}
                  className={`px-3 py-1 rounded-lg font-bold border transition ${
                    gate === 'OR' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  OR Gate
                </button>
              </div>
            </div>

            {/* Circuit Board Display */}
            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 text-white my-3 flex items-center justify-around shadow-inner">
              <div className="space-y-2">
                <button
                  onClick={() => setSwitchA(!switchA)}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border font-mono font-bold transition ${
                    switchA ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  Switch A: {switchA ? '1 (CLOSED)' : '0 (OPEN)'}
                </button>
                <button
                  onClick={() => setSwitchB(!switchB)}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border font-mono font-bold transition ${
                    switchB ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  Switch B: {switchB ? '1 (CLOSED)' : '0 (OPEN)'}
                </button>
              </div>

              {/* Output Bulb */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-md ${
                    lightState
                      ? 'bg-amber-400 border-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.8)] text-slate-900 font-extrabold'
                      : 'bg-slate-800 border-slate-700 text-slate-500'
                  }`}
                >
                  💡 {lightState ? '1' : '0'}
                </div>
                <span className="text-[10px] font-mono mt-1 text-slate-400 font-bold">
                  {lightState ? 'CURRENT FLOWS' : 'ZERO VOLTAGE'}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-700 bg-sky-50 p-2.5 rounded-xl border border-sky-200">
              💡 <strong>Transistor Metaphor:</strong> Computers don't speak English; they only see microscopic 1s and 0s powered by electrical current switches!
            </p>
          </div>
        ) : (
          /* M-Pesa Relational Database Tables */
          <div className="space-y-2 text-xs">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1">
                Table: CUSTOMERS (Primary Key: Phone_Number)
              </span>
              <div className="font-mono text-[10px] bg-white border border-slate-200 rounded p-1.5 space-y-0.5">
                <div className="text-indigo-700 font-bold">🔑 PK: 0712-345-678 ➔ Amina Hassan (Kibera)</div>
                <div className="text-slate-600">🔑 PK: 0722-987-654 ➔ Kevin Otieno (Alliance)</div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
              <span className="text-[10px] font-bold text-indigo-800 uppercase block mb-1">
                Table: TRANSACTIONS (Foreign Key: Sender_Phone)
              </span>
              <div className="font-mono text-[10px] bg-white border border-slate-200 rounded p-1.5 space-y-0.5">
                <div className="text-emerald-700 font-bold">TxID: QX492 • FK: 0712-345-678 • KSh 1,500</div>
                <div className="text-slate-500 text-[9px]">Linked automatically without duplicating customer home address!</div>
              </div>
            </div>

            <p className="text-[10px] text-slate-600 italic">
              Relational keys eliminate duplicate storage and execute national lookups in milliseconds.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 4. CHEMICAL BONDS VISUALIZER (CHEMISTRY ONLY)
// =========================================================================
export const ChemicalBondsVisualizer: React.FC = () => {
  const [bondType, setBondType] = useState<'ionic' | 'covalent'>('ionic');

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sky-50 via-slate-100 to-indigo-50 text-slate-800 select-none">
      <div className="w-full max-w-sm bg-white/95 border border-sky-200 rounded-3xl p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase text-sky-800 bg-sky-100 px-2.5 py-1 rounded-full border border-sky-300">
            🧪 Chemistry: Chemical Bonding
          </span>
          <span className="text-xs font-mono text-sky-800 font-bold bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
            {bondType === 'ionic' ? 'Ionic (Electron Transfer)' : 'Covalent (Electron Sharing)'}
          </span>
        </div>

        <div className="w-full h-40 bg-slate-900 rounded-2xl border border-slate-800 p-3 relative flex items-center justify-center my-3 shadow-inner">
          {bondType === 'ionic' ? (
            <div className="flex items-center justify-around w-full">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border-2 border-amber-400 flex items-center justify-center bg-amber-950/70 shadow-md">
                  <span className="font-bold text-amber-300 text-xs">Na⁺</span>
                </div>
                <span className="text-[10px] text-amber-300 mt-1 font-semibold">Gives 1 e⁻</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[11px] font-mono text-emerald-400 animate-pulse font-bold">e⁻ ➔</span>
                <span className="text-[9px] text-slate-400">Transferred</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-emerald-400 flex items-center justify-center bg-emerald-950/70 shadow-md">
                  <span className="font-bold text-emerald-300 text-xs">Cl⁻</span>
                </div>
                <span className="text-[10px] text-emerald-300 mt-1 font-semibold">Takes 1 e⁻</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center relative w-full">
              <div className="w-20 h-20 rounded-full border-2 border-cyan-400 bg-cyan-950/40 flex items-center justify-start pl-3">
                <span className="text-xs font-bold text-cyan-300">O</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-600 border border-white flex items-center justify-center -mx-4 z-10 shadow-lg">
                <span className="text-[9px] font-mono font-bold text-white">: :</span>
              </div>
              <div className="w-20 h-20 rounded-full border-2 border-cyan-400 bg-cyan-950/40 flex items-center justify-end pr-3">
                <span className="text-xs font-bold text-cyan-300">O</span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs text-slate-700 mb-3">
          {bondType === 'ionic' ? (
            <p><strong>Ionic (Lake Magadi NaCl):</strong> Sodium permanently surrenders its electron. Strong electrostatic force locks opposite ions together.</p>
          ) : (
            <p><strong>Covalent (O₂ Gas):</strong> Both oxygen atoms have identical pulling strength. Neither can steal; they share electrons equally!</p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setBondType('ionic')}
            className={`flex-1 text-xs py-2 rounded-xl font-bold transition cursor-pointer ${
              bondType === 'ionic' ? 'bg-amber-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Ionic (Na + Cl)
          </button>
          <button
            onClick={() => setBondType('covalent')}
            className={`flex-1 text-xs py-2 rounded-xl font-bold transition cursor-pointer ${
              bondType === 'covalent' ? 'bg-cyan-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Covalent (O = O)
          </button>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 5. MITOSIS VISUALIZER (BIOLOGY ONLY)
// =========================================================================
export const MitosisVisualizer: React.FC = () => {
  const [mitosisPhase, setMitosisPhase] = useState<'Prophase' | 'Metaphase' | 'Anaphase' | 'Telophase'>('Metaphase');
  const phases: Array<'Prophase' | 'Metaphase' | 'Anaphase' | 'Telophase'> = ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'];
  const phaseDescriptions = {
    Prophase: { hand: '✊ Pack Bags', desc: 'Chromatin condenses into visible chromosomes. Nuclear envelope disintegrates.' },
    Metaphase: { hand: '🤝 Meet in Middle', desc: 'Chromosomes line up along equatorial plate. Spindle fibers attach.' },
    Anaphase: { hand: '👐 Apart / Away', desc: 'Sister chromatids are pulled apart to opposite cellular poles.' },
    Telophase: { hand: '🙌 Two Nuclei', desc: 'Two new nuclear membranes form. Cytokinesis begins.' }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50 via-slate-100 to-pink-100 text-slate-800 select-none">
      <div className="w-full max-w-sm bg-white/95 border border-rose-200 rounded-3xl p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase text-rose-800 bg-rose-100 px-2.5 py-1 rounded-full border border-rose-300">
            🧬 Biology: Mitosis Cell Division
          </span>
          <span className="text-xs font-mono text-rose-800 font-bold bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
            {mitosisPhase}
          </span>
        </div>

        <div className="w-full h-36 bg-slate-900 rounded-2xl border-2 border-rose-300 relative flex items-center justify-center overflow-hidden my-3 shadow-inner">
          {mitosisPhase === 'Prophase' && (
            <div className="w-24 h-24 rounded-full border border-dashed border-rose-300/80 flex items-center justify-center gap-1.5 flex-wrap p-2">
              <span className="text-xs bg-rose-500 px-1.5 py-0.5 rounded text-white font-mono font-bold">X</span>
              <span className="text-xs bg-blue-500 px-1.5 py-0.5 rounded text-white font-mono font-bold">X</span>
              <span className="text-xs bg-amber-500 px-1.5 py-0.5 rounded text-white font-mono font-bold">X</span>
              <span className="text-xs bg-emerald-500 px-1.5 py-0.5 rounded text-white font-mono font-bold">X</span>
            </div>
          )}
          {mitosisPhase === 'Metaphase' && (
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="h-28 w-0.5 bg-yellow-400/60 absolute"></div>
              <span className="text-xs bg-rose-500 px-2 py-0.5 rounded text-white font-mono font-bold z-10 shadow">X</span>
              <span className="text-xs bg-blue-500 px-2 py-0.5 rounded text-white font-mono font-bold z-10 shadow">X</span>
              <span className="text-xs bg-emerald-500 px-2 py-0.5 rounded text-white font-mono font-bold z-10 shadow">X</span>
              <span className="text-xs bg-amber-500 px-2 py-0.5 rounded text-white font-mono font-bold z-10 shadow">X</span>
            </div>
          )}
          {mitosisPhase === 'Anaphase' && (
            <div className="flex justify-between w-4/5 items-center">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs bg-rose-500 px-1.5 rounded font-mono text-white font-bold">&lt;</span>
                <span className="text-xs bg-blue-500 px-1.5 rounded font-mono text-white font-bold">&lt;</span>
                <span className="text-xs bg-emerald-500 px-1.5 rounded font-mono text-white font-bold">&lt;</span>
              </div>
              <span className="text-[10px] text-yellow-300 font-mono tracking-widest font-bold">SPINDLES PULLING</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs bg-rose-500 px-1.5 rounded font-mono text-white font-bold">&gt;</span>
                <span className="text-xs bg-blue-500 px-1.5 rounded font-mono text-white font-bold">&gt;</span>
                <span className="text-xs bg-emerald-500 px-1.5 rounded font-mono text-white font-bold">&gt;</span>
              </div>
            </div>
          )}
          {mitosisPhase === 'Telophase' && (
            <div className="flex justify-around w-full items-center">
              <div className="w-16 h-16 rounded-full border border-rose-300 bg-rose-950/60 text-white flex items-center justify-center text-xs font-bold">
                Nucleus 1
              </div>
              <div className="w-0.5 h-full bg-slate-700"></div>
              <div className="w-16 h-16 rounded-full border border-rose-300 bg-rose-950/60 text-white flex items-center justify-center text-xs font-bold">
                Nucleus 2
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 mb-3">
          <div className="text-xs font-bold text-rose-800 mb-1 flex items-center gap-1.5">
            <span>{phaseDescriptions[mitosisPhase].hand}</span>
          </div>
          <p className="text-[11px] text-slate-700">{phaseDescriptions[mitosisPhase].desc}</p>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {phases.map((p) => (
            <button
              key={p}
              onClick={() => setMitosisPhase(p)}
              className={`text-[10px] py-1.5 rounded-xl font-bold transition cursor-pointer ${
                mitosisPhase === p
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p.slice(0, 4)}.
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 6. GRAVITY VISUALIZER (PHYSICS ONLY)
// =========================================================================
export const GravityVisualizer: React.FC = () => {
  const [gravityMass, setGravityMass] = useState(60);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-50 via-slate-100 to-purple-100 text-slate-800 select-none">
      <div className="w-full max-w-sm bg-white/95 border border-purple-200 rounded-3xl p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full border border-purple-300">
            ⚡ Physics: Gravitational Potential Well
          </span>
          <span className="text-[11px] font-mono text-purple-800 font-bold">Mass: {gravityMass} M☉</span>
        </div>

        <div className="w-full h-44 bg-slate-900 rounded-2xl border border-slate-800 relative flex items-center justify-center overflow-hidden my-3 shadow-inner">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="absolute w-36 h-36 rounded-full border border-purple-500/30 animate-spin" style={{ animationDuration: '24s' }} />
          <div className="absolute w-28 h-28 rounded-full border border-purple-500/50" />
          <div className="absolute w-20 h-20 rounded-full border border-purple-500/70" />
          <div className="absolute w-12 h-12 rounded-full border-2 border-purple-400 bg-purple-950 shadow-[0_0_25px_rgba(168,85,247,0.6)] flex items-center justify-center">
            <span className="text-[10px] font-bold text-amber-300">Star</span>
          </div>

          <div className="absolute w-32 h-32 rounded-full animate-spin" style={{ animationDuration: `${12 - (gravityMass / 10)}s` }}>
            <div className="w-3.5 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] absolute top-0 left-1/2 -translate-x-1/2" />
          </div>

          <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-slate-300 font-mono px-2">
            <span>Olkaria Turbine / Trampoline</span>
            <span className="text-cyan-300 font-bold">Mass bends space!</span>
          </div>
        </div>

        <div className="space-y-1.5 mb-3">
          <div className="flex justify-between text-xs text-slate-700 font-medium">
            <span>Center Mass (Dip Depth):</span>
            <span className="font-mono text-purple-700 font-bold">{gravityMass}</span>
          </div>
          <input
            type="range"
            min="20"
            max="90"
            value={gravityMass}
            onChange={(e) => setGravityMass(Number(e.target.value))}
            className="w-full accent-purple-600 cursor-pointer"
          />
        </div>

        <p className="text-[11px] text-slate-700 bg-purple-50 p-2.5 rounded-xl border border-purple-200">
          "Matter tells spacetime how to curve, and curved spacetime tells planets and water how to fall!"
        </p>
      </div>
    </div>
  );
};

// =========================================================================
// 7. FRACTIONS VISUALIZER (MATH ONLY)
// =========================================================================
export const FractionsVisualizer: React.FC = () => {
  const [wholeCount, setWholeCount] = useState(3);
  const [fractionDenom, setFractionDenom] = useState(4);
  const totalPieces = wholeCount * fractionDenom;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-indigo-50 via-slate-100 to-sky-100 text-slate-800 select-none">
      <div className="w-full max-w-sm bg-white/95 border border-indigo-200 rounded-3xl p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold tracking-wider uppercase text-indigo-800 bg-indigo-100 px-2.5 py-1 rounded-full border border-indigo-300 flex items-center gap-1.5 shadow-xs">
            📐 Math: Chapati / Jar Fractions
          </span>
          <span className="text-xs font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded font-bold border border-slate-200">
            {wholeCount} ÷ 1/{fractionDenom} = <strong className="text-indigo-600 font-bold">{totalPieces}</strong>
          </span>
        </div>

        <div className="text-xs text-slate-700 mb-3 text-center font-medium">
          "How many <span className="text-indigo-600 font-bold">1/{fractionDenom} slices</span> fit inside <span className="text-indigo-600 font-bold">{wholeCount} whole chapatis</span>?"
        </div>

        <div className="grid grid-cols-3 gap-2.5 my-4">
          {Array.from({ length: wholeCount }).map((_, jarIdx) => (
            <div key={jarIdx} className="border-2 border-indigo-300 rounded-2xl p-1.5 bg-slate-50 flex flex-col justify-end h-28 relative overflow-hidden shadow-inner">
              <span className="absolute top-1 left-2 text-[10px] font-mono text-indigo-700 font-bold">Chapati #{jarIdx + 1}</span>
              <div className="space-y-1 w-full">
                {Array.from({ length: fractionDenom }).map((_, pieceIdx) => (
                  <div
                    key={pieceIdx}
                    className="bg-gradient-to-r from-indigo-500 to-sky-500 text-[10px] text-white font-mono font-bold flex items-center justify-center py-1 rounded-md shadow-sm"
                  >
                    1/{fractionDenom}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center mb-3">
          <p className="text-xs text-slate-700">
            Each whole unit has <strong className="text-indigo-600">{fractionDenom}</strong> pieces. 
            With <strong className="text-indigo-600">{wholeCount}</strong> units, that's {wholeCount} × {fractionDenom} = <strong className="text-emerald-700 text-sm font-bold">{totalPieces} portions</strong>!
          </p>
        </div>

        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setWholeCount(wholeCount === 3 ? 2 : 3)}
            className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-bold transition border border-slate-200 cursor-pointer"
          >
            Chapatis: {wholeCount}
          </button>
          <button
            onClick={() => setFractionDenom(fractionDenom === 4 ? 2 : fractionDenom === 2 ? 3 : 4)}
            className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-bold transition shadow-xs cursor-pointer"
          >
            Slice Size: 1/{fractionDenom}
          </button>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 8. PYTHAGOREAN VISUALIZER (MATH GEOMETRY)
// =========================================================================
export const PythagoreanVisualizer: React.FC = () => {
  const [pythPoured, setPythPoured] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50 via-slate-100 to-orange-100 text-slate-800 select-none">
      <div className="w-full max-w-sm bg-white/95 border border-amber-200 rounded-3xl p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
            📐 Geometry: Pythagorean Shamba Area
          </span>
          <span className="text-xs font-mono text-amber-800 font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            3² + 4² = 5² (25 = 25)
          </span>
        </div>

        <div className="w-full h-44 bg-slate-900 rounded-2xl border border-slate-800 p-2 relative flex items-center justify-center overflow-hidden my-3 shadow-inner">
          <div className="relative w-40 h-40">
            <div className="absolute top-14 left-14 w-0 h-0 border-l-[45px] border-l-transparent border-b-[60px] border-b-amber-500/50 border-r-0"></div>
            <div
              className={`absolute top-0 left-14 w-11 h-11 border border-amber-400 rounded-lg flex items-center justify-center text-[10px] font-mono transition-all duration-500 ${
                pythPoured ? 'bg-slate-800/60 text-slate-500' : 'bg-amber-500 text-white font-bold shadow-md'
              }`}
            >
              a² = 9
            </div>
            <div
              className={`absolute top-14 left-0 w-14 h-14 border border-amber-400 rounded-lg flex items-center justify-center text-[10px] font-mono transition-all duration-500 ${
                pythPoured ? 'bg-slate-800/60 text-slate-500' : 'bg-amber-600 text-white font-bold shadow-md'
              }`}
            >
              b² = 16
            </div>
            <div
              className={`absolute -bottom-2 -right-2 w-16 h-16 border-2 border-emerald-400 rounded-xl flex items-center justify-center text-xs font-mono transition-all duration-500 ${
                pythPoured ? 'bg-emerald-500 text-white font-bold shadow-lg scale-105' : 'bg-slate-800/80 text-emerald-300'
              }`}
            >
              c² = 25
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 mb-3 text-center">
          "The liquid area of Square A (9) plus Square B (16) perfectly fills Square C (25)!"
        </p>

        <button
          onClick={() => setPythPoured(!pythPoured)}
          className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition shadow-xs cursor-pointer"
        >
          {pythPoured ? 'Reset Liquid Squares' : 'Pour Liquid A + B into C'}
        </button>
      </div>
    </div>
  );
};

// =========================================================================
// 9. ZOMBIE GRAMMAR VISUALIZER (ENGLISH GRAMMAR ONLY)
// =========================================================================
export const ZombieGrammarVisualizer: React.FC = () => {
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState(0);
  const [zombieTestActive, setZombieTestActive] = useState(true);

  const sentences = [
    { text: 'The classroom door was opened', isPassive: true, verb: 'was opened', actor: 'Unknown (Passive)' },
    { text: 'Zack ate the chocolate cake', isPassive: false, verb: 'ate', actor: 'Zack (Active)' },
    { text: 'The laboratory experiment was completed', isPassive: true, verb: 'was completed', actor: 'Unknown (Passive)' },
    { text: 'Lightning struck the old willow tree', isPassive: false, verb: 'struck', actor: 'Lightning (Active)' }
  ];

  const cur = sentences[selectedSentenceIndex];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-emerald-50 via-slate-100 to-emerald-100 text-slate-800 select-none">
      <div className="w-full max-w-sm bg-white/95 border border-emerald-200 rounded-3xl p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold tracking-wider uppercase text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1.5 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-emerald-600" /> English: Passive Voice Rule
          </span>
          <span className="text-[11px] text-slate-500 font-mono font-medium">#{selectedSentenceIndex + 1}/4</span>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-center mb-4 min-h-[96px] flex flex-col justify-center shadow-inner">
          <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            "{cur.text}"
            {zombieTestActive && (
              <span className="ml-1 text-emerald-800 font-extrabold bg-emerald-200/90 px-2 py-0.5 rounded-lg border border-emerald-400 inline-block animate-pulse">
                ...BY ZOMBIES 🧟‍♂️
              </span>
            )}
          </p>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs px-3 py-2 bg-slate-100 rounded-xl border border-slate-200">
            <span className="text-slate-600 font-medium">Grammar verdict:</span>
            {cur.isPassive ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Makes Sense! → PASSIVE VOICE
              </span>
            ) : (
              <span className="text-amber-700 font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Nonsense! → ACTIVE VOICE
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-500 px-1">
            Verb: <code className="text-indigo-700 font-mono font-bold bg-indigo-50 px-1 rounded">{cur.verb}</code> | Actor: <span className="text-slate-800 font-semibold">{cur.actor}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedSentenceIndex((prev) => (prev + 1) % sentences.length)}
            className="flex-1 text-xs py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Next Sentence
          </button>
          <button
            onClick={() => setZombieTestActive(!zombieTestActive)}
            className={`text-xs py-2 px-3 rounded-xl font-bold transition border cursor-pointer ${
              zombieTestActive
                ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {zombieTestActive ? 'Hide Zombie' : 'Add Zombie'}
          </button>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// MAIN CONCEPT VISUALIZER DISPATCHER
// =========================================================================
export const ConceptVisualizer: React.FC<VisualizerProps> = ({
  style,
  isPlaying,
  concept,
  hook,
  analogy,
  subject,
  title,
}) => {
  switch (style) {
    case 'computer_studies_visualizer':
      return <ComputerStudiesVisualizer concept={concept} isPlaying={isPlaying} />;
    case 'kiswahili_visualizer':
      return <KiswahiliVisualizer concept={concept} isPlaying={isPlaying} />;
    case 'chemical_bonds_visualizer':
      return <ChemicalBondsVisualizer />;
    case 'mitosis_visualizer':
      return <MitosisVisualizer />;
    case 'gravity_visualizer':
      return <GravityVisualizer />;
    case 'fractions_visualizer':
      return <FractionsVisualizer />;
    case 'pythagorean_visualizer':
      return <PythagoreanVisualizer />;
    case 'zombie_grammar_visualizer':
      return <ZombieGrammarVisualizer />;
    case 'running_words_visualizer':
    case 'default':
    default:
      // When content has no picture or specific visualizer, display running words on screen!
      return (
        <RunningWordsVisualizer
          isPlaying={isPlaying}
          concept={concept}
          hook={hook}
          analogy={analogy}
          subject={subject}
          title={title}
        />
      );
  }
};
