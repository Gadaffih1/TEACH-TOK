import React, { useState, useEffect } from 'react';
import { VisualStyle } from '../types';
import { Sparkles, Check, AlertCircle, RefreshCw, Zap } from 'lucide-react';

interface VisualizerProps {
  style: VisualStyle;
  isPlaying: boolean;
  concept: string;
}

export const ConceptVisualizer: React.FC<VisualizerProps> = ({ style, isPlaying, concept }) => {
  // 1. Zombie Test Visualizer
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState(0);
  const [zombieTestActive, setZombieTestActive] = useState(true);

  const sentences = [
    { text: 'The classroom door was opened', isPassive: true, verb: 'was opened', actor: 'Unknown (Passive)' },
    { text: 'Zack ate the chocolate cake', isPassive: false, verb: 'ate', actor: 'Zack (Active)' },
    { text: 'The laboratory experiment was completed', isPassive: true, verb: 'was completed', actor: 'Unknown (Passive)' },
    { text: 'Lightning struck the old willow tree', isPassive: false, verb: 'struck', actor: 'Lightning (Active)' }
  ];

  // 2. Fraction Visualizer
  const [wholeCount, setWholeCount] = useState(3);
  const [fractionDenom, setFractionDenom] = useState(4); // 1/4

  // 3. Gravity Visualizer
  const [gravityMass, setGravityMass] = useState(60);

  // 4. Mitosis Visualizer
  const [mitosisPhase, setMitosisPhase] = useState<'Prophase' | 'Metaphase' | 'Anaphase' | 'Telophase'>('Metaphase');

  // 5. Pythagorean Visualizer
  const [pythPoured, setPythPoured] = useState(false);

  // 6. Chemical Bonds Visualizer
  const [bondType, setBondType] = useState<'ionic' | 'covalent'>('ionic');

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      // Gentle auto-tick for realism if playing
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (style === 'zombie_grammar_visualizer') {
    const cur = sentences[selectedSentenceIndex];
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-emerald-50 via-slate-100 to-emerald-100 text-slate-800 select-none">
        <div className="w-full max-w-sm bg-white/95 border border-emerald-200 rounded-3xl p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1.5 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-emerald-600" /> Zombie Diagnostic Rule
            </span>
            <span className="text-[11px] text-slate-500 font-mono font-medium">Test #{selectedSentenceIndex + 1}/4</span>
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

        <p className="mt-5 text-xs text-slate-600 text-center max-w-xs font-medium">
          💡 Teacher Tip: Have students read their own essays aloud and chant "...by zombies" after every verb!
        </p>
      </div>
    );
  }

  if (style === 'fractions_visualizer') {
    const totalPieces = wholeCount * fractionDenom;
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-indigo-50 via-slate-100 to-sky-100 text-slate-800 select-none">
        <div className="w-full max-w-sm bg-white/95 border border-indigo-200 rounded-3xl p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold tracking-wider uppercase text-indigo-800 bg-indigo-100 px-2.5 py-1 rounded-full border border-indigo-300 flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Concrete Model
            </span>
            <span className="text-xs font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded font-bold border border-slate-200">
              {wholeCount} ÷ 1/{fractionDenom} = <strong className="text-indigo-600 font-bold">{totalPieces}</strong>
            </span>
          </div>

          <div className="text-xs text-slate-700 mb-3 text-center font-medium">
            "How many <span className="text-indigo-600 font-bold">1/{fractionDenom} scoops</span> fit in <span className="text-indigo-600 font-bold">{wholeCount} whole jars</span>?"
          </div>

          {/* Jars Visualization */}
          <div className="grid grid-cols-3 gap-2.5 my-4">
            {Array.from({ length: wholeCount }).map((_, jarIdx) => (
              <div key={jarIdx} className="border-2 border-indigo-300 rounded-2xl p-1.5 bg-slate-50 flex flex-col justify-end h-28 relative overflow-hidden shadow-inner">
                <span className="absolute top-1 left-2 text-[10px] font-mono text-indigo-700 font-bold">Jar #{jarIdx + 1}</span>
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
              Each jar holds <strong className="text-indigo-600">{fractionDenom}</strong> scoops. 
              With <strong className="text-indigo-600">{wholeCount}</strong> jars, that's {wholeCount} × {fractionDenom} = <strong className="text-emerald-700 text-sm font-bold">{totalPieces} servings</strong>!
            </p>
          </div>

          <div className="flex gap-2 text-xs">
            <button
              onClick={() => setWholeCount(wholeCount === 3 ? 2 : 3)}
              className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-bold transition border border-slate-200 cursor-pointer"
            >
              Jars: {wholeCount}
            </button>
            <button
              onClick={() => setFractionDenom(fractionDenom === 4 ? 2 : fractionDenom === 2 ? 3 : 4)}
              className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-bold transition shadow-xs cursor-pointer"
            >
              Scoop: 1/{fractionDenom}
            </button>
          </div>
        </div>
        <p className="mt-4 text-[11px] text-slate-600 font-medium text-center max-w-xs">
          Notice: Dividing makes MORE pieces, destroying the misconception that division always shrinks values!
        </p>
      </div>
    );
  }

  if (style === 'gravity_visualizer') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-50 via-slate-100 to-purple-100 text-slate-800 select-none">
        <div className="w-full max-w-sm bg-white/95 border border-purple-200 rounded-3xl p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full border border-purple-300">
              Curved Spacetime Well
            </span>
            <span className="text-[11px] font-mono text-purple-800 font-bold">Mass: {gravityMass} M☉</span>
          </div>

          {/* Curvature mesh animation */}
          <div className="w-full h-44 bg-slate-900 rounded-2xl border border-slate-800 relative flex items-center justify-center overflow-hidden my-3 shadow-inner">
            {/* Mesh grid lines */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Concentric curvature rings */}
            <div className="absolute w-36 h-36 rounded-full border border-purple-500/30 animate-spin" style={{ animationDuration: '24s' }} />
            <div className="absolute w-28 h-28 rounded-full border border-purple-500/50" />
            <div className="absolute w-20 h-20 rounded-full border border-purple-500/70" />
            <div className="absolute w-12 h-12 rounded-full border-2 border-purple-400 bg-purple-950 shadow-[0_0_25px_rgba(168,85,247,0.6)] flex items-center justify-center">
              <span className="text-[10px] font-bold text-amber-300">Star</span>
            </div>

            {/* Orbiting planet marble */}
            <div className="absolute w-32 h-32 rounded-full animate-spin" style={{ animationDuration: `${12 - (gravityMass / 10)}s` }}>
              <div className="w-3.5 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] absolute top-0 left-1/2 -translate-x-1/2" />
            </div>

            <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-slate-300 font-mono px-2">
              <span>Marble rolls straight in curved space</span>
              <span className="text-cyan-300 font-bold">No invisible rope!</span>
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
            "Matter tells spacetime how to curve, and spacetime tells matter how to move." — John Archibald Wheeler
          </p>
        </div>
      </div>
    );
  }

  if (style === 'mitosis_visualizer') {
    const phases: Array<'Prophase' | 'Metaphase' | 'Anaphase' | 'Telophase'> = ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'];
    const phaseDescriptions = {
      Prophase: { hand: '✊ Pack Bags', desc: 'Chromatin condenses into visible chromosomes. Nuclear envelope breaks down.' },
      Metaphase: { hand: '🤝 Meet in Middle', desc: 'Chromosomes line up along equatorial plate. Spindle fibers attach.' },
      Anaphase: { hand: '👐 Apart / Away', desc: 'Sister chromatids are pulled apart to opposite cellular poles.' },
      Telophase: { hand: '🙌 Two Nuclei', desc: 'Two new nuclear envelopes form. Cytokinesis begins.' }
    };

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50 via-slate-100 to-pink-100 text-slate-800 select-none">
        <div className="w-full max-w-sm bg-white/95 border border-rose-200 rounded-3xl p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase text-rose-800 bg-rose-100 px-2.5 py-1 rounded-full border border-rose-300">
              IPMAT Mnemonic Choreography
            </span>
            <span className="text-xs font-mono text-rose-800 font-bold bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
              {mitosisPhase}
            </span>
          </div>

          {/* Cell diagram representation */}
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
  }

  if (style === 'pythagorean_visualizer') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50 via-slate-100 to-orange-100 text-slate-800 select-none">
        <div className="w-full max-w-sm bg-white/95 border border-amber-200 rounded-3xl p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
              Liquid Area Proof
            </span>
            <span className="text-xs font-mono text-amber-800 font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
              3² + 4² = 5² (25 = 25)
            </span>
          </div>

          <div className="w-full h-44 bg-slate-900 rounded-2xl border border-slate-800 p-2 relative flex items-center justify-center overflow-hidden my-3 shadow-inner">
            {/* Visual triangle & squares */}
            <div className="relative w-40 h-40">
              {/* Right Triangle */}
              <div className="absolute top-14 left-14 w-0 h-0 border-l-[45px] border-l-transparent border-b-[60px] border-b-amber-500/50 border-r-0"></div>

              {/* Square A (3x3 = 9) */}
              <div
                className={`absolute top-0 left-14 w-11 h-11 border border-amber-400 rounded-lg flex items-center justify-center text-[10px] font-mono transition-all duration-500 ${
                  pythPoured ? 'bg-slate-800/60 text-slate-500' : 'bg-amber-500 text-white font-bold shadow-md'
                }`}
              >
                a² = 9
              </div>

              {/* Square B (4x4 = 16) */}
              <div
                className={`absolute top-14 left-0 w-14 h-14 border border-amber-400 rounded-lg flex items-center justify-center text-[10px] font-mono transition-all duration-500 ${
                  pythPoured ? 'bg-slate-800/60 text-slate-500' : 'bg-amber-600 text-white font-bold shadow-md'
                }`}
              >
                b² = 16
              </div>

              {/* Square C (5x5 = 25) */}
              <div
                className={`absolute top-14 left-16 w-16 h-16 border-2 border-emerald-400 rounded-lg flex items-center justify-center text-[10px] font-mono transition-all duration-700 ${
                  pythPoured ? 'bg-emerald-500 text-white font-bold shadow-lg scale-105' : 'bg-slate-800/60 text-slate-400'
                }`}
              >
                c² = 25 {pythPoured && '✓'}
              </div>
            </div>

            <div className="absolute bottom-2 text-[10px] text-slate-300 font-mono">
              {pythPoured ? 'Water from 9 + 16 perfectly fills 25!' : 'Squares A (9) & B (16) hold the liquid'}
            </div>
          </div>

          <button
            onClick={() => setPythPoured(!pythPoured)}
            className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-700 hover:to-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {pythPoured ? 'Reset Water to Legs A & B' : 'Pour Water into Hypotenuse Square C'}
          </button>
        </div>
      </div>
    );
  }

  // Default / Chemical bonds
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sky-50 via-slate-100 to-indigo-50 text-slate-800 select-none">
      <div className="w-full max-w-sm bg-white/95 border border-sky-200 rounded-3xl p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase text-sky-800 bg-sky-100 px-2.5 py-1 rounded-full border border-sky-300">
            Atomic Personality Model
          </span>
          <span className="text-xs font-mono text-sky-800 font-bold bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
            {bondType === 'ionic' ? 'Ionic (Transfer)' : 'Covalent (Share)'}
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
            <p><strong>Ionic:</strong> Sodium gives its skateboard away forever. Strong electrostatic attraction keeps them neighbors.</p>
          ) : (
            <p><strong>Covalent:</strong> Two Oxygen atoms have equal grip. Both share the controllers in a mutual tug-of-war!</p>
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
