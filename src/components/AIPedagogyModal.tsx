import React, { useState } from 'react';
import { TeachTokVideo, GradeBand } from '../types';
import { X, Sparkles, Wand2, Copy, Check, ArrowRight, Brain, Lightbulb, Compass, FileCheck } from 'lucide-react';

interface AIPedagogyModalProps {
  video: TeachTokVideo;
  isOpen: boolean;
  onClose: () => void;
  onSaveToBinder: (title: string, content: string) => void;
}

export const AIPedagogyModal: React.FC<AIPedagogyModalProps> = ({
  video,
  isOpen,
  onClose,
  onSaveToBinder,
}) => {
  if (!isOpen) return null;

  const [activeTask, setActiveTask] = useState<'adapt_grade' | 'new_analogies' | 'misconceptions' | 'bellringer'>('adapt_grade');
  const [targetGrade, setTargetGrade] = useState<GradeBand>('Elementary (K-5)');
  const [customSubjectFocus, setCustomSubjectFocus] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Generate dynamic AI pedagogical adaptation based on the video's concept
  const handleGenerate = () => {
    setIsGenerating(true);
    setAiOutput(null);

    setTimeout(() => {
      let result = '';
      if (activeTask === 'adapt_grade') {
        result = `🎓 ADAPTED TEACHING SCRIPT FOR ${targetGrade.toUpperCase()}:
Concept: "${video.concept}"

[1] THE AGE-APPROPRIATE HOOK (0:00 - 0:15)
"Have you ever wondered why ${targetGrade.includes('Elementary') ? 'your Lego towers tip over or why sharing cookies feels weird' : 'games lag when too many players join the server'}? Today we are unlocking the secret behind ${video.concept}!"

[2] THE SIMPLIFIED METAPHOR (${targetGrade}):
${targetGrade.includes('Elementary')
  ? 'Instead of formal formulas, imagine 3 friendly squirrels storing acorns in 4 equal tree hollows. Count the total together using cheer claps!'
  : 'Connect this directly to algorithmic efficiency and trade-offs. The formal equation governs how energy states shift dynamically under boundary conditions.'}

[3] CLASSROOM CHECK QUESTION:
"Turn to your shoulder partner: In 10 seconds, explain this concept using only two gestures and zero words! Ready, go!"

[4] COMMON PITFALL TO WATCH FOR:
Students at this stage often ${targetGrade.includes('Elementary') ? 'mix up count of groups with size of each group' : 'over-generalize the linear assumption to exponential cases'}.`;
      } else if (activeTask === 'new_analogies') {
        result = `💡 3 FRESH CLASSROOM ANALOGIES FOR "${video.concept}":

1. 🎮 THE VIDEO GAME ANALOGY (Great for reluctant learners)
"Think of this like an RPG inventory weight limit. When your character picks up too much armor, their sprint speed drops. Here, the ${video.pedagogyTag} works identically to preserve game balance!"

2. 🍕 THE KITCHEN / FOOD TRUCK ANALOGY (Universal connection)
"Imagine a pizzeria chef with only 2 pizza ovens. No matter how many orders ring in, the bottleneck is oven slots. That is exactly how this rate-limiting mechanism works!"

3. 🏀 THE SPORTS TEAM STRATEGY ANALOGY (Kinesthetic learners)
"In basketball, you don't just shoot from the half-court every play. You run the pick-and-roll to create an open lane. In this problem, step 1 is the 'pick' that creates space for step 2!"`;
      } else if (activeTask === 'misconceptions') {
        result = `🔍 DIAGNOSTIC MISCONCEPTION AUDIT FOR "${video.concept}":

❌ MISCONCEPTION #1: "The Intuitive Trap"
- Why students think it: Superficial visual pattern matching.
- Exact student quote: "It looks bigger on the diagram, so it must have higher magnitude!"
- Teacher rebuttal question: "If I zoom in with a magnifying glass, does the physical weight actually change?"

❌ MISCONCEPTION #2: "Rule Overextension"
- Why students think it: Memorizing a trick from last year's chapter without knowing boundary conditions.
- How to bust it: Give a counter-example on the board that breaks their rule immediately, creating productive cognitive dissonance.`;
      } else {
        result = `⏱️ 5-MINUTE BELLRINGER / EXIT TICKET FOR "${video.concept}":

[Part A: Quick Mastery Check (3 mins)]
1. A student claims that applying ${video.concept} always increases the final output. Provide ONE quick drawing or number example that proves them wrong.
2. In your own words, complete this sentence: "${video.concept} is essentially like a ____________ because ____________."

[Part B: Self-Confidence Gauge (1 min)]
Fist-to-Five: How confident are you explaining this to a classmate who missed school today?
1 (Lost) ─── 3 (Need 1 more example) ─── 5 (I could teach it right now!)`;
      }

      setAiOutput(result);
      setIsGenerating(false);
    }, 700);
  };

  const handleCopy = () => {
    if (!aiOutput) return;
    navigator.clipboard.writeText(aiOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-indigo-500/40 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-950/80 via-slate-950 to-purple-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/50 flex items-center justify-center text-indigo-300">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base sm:text-lg">TeachTok AI Pedagogical Assistant</h3>
                <span className="text-[10px] font-mono uppercase bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">
                  AI Powered
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Transforming concept: <strong className="text-white">"{video.concept}"</strong>
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

        {/* Task selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-950/50 border-b border-slate-800">
          <button
            onClick={() => { setActiveTask('adapt_grade'); setAiOutput(null); }}
            className={`p-2.5 rounded-xl text-left transition flex flex-col gap-1 border ${
              activeTask === 'adapt_grade'
                ? 'bg-indigo-600/20 border-indigo-500 text-white'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Brain className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold">Differentiate Grade</span>
            <span className="text-[10px] text-slate-400">Scale up/down</span>
          </button>

          <button
            onClick={() => { setActiveTask('new_analogies'); setAiOutput(null); }}
            className={`p-2.5 rounded-xl text-left transition flex flex-col gap-1 border ${
              activeTask === 'new_analogies'
                ? 'bg-indigo-600/20 border-indigo-500 text-white'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold">3 New Analogies</span>
            <span className="text-[10px] text-slate-400">Gaming, sports, food</span>
          </button>

          <button
            onClick={() => { setActiveTask('misconceptions'); setAiOutput(null); }}
            className={`p-2.5 rounded-xl text-left transition flex flex-col gap-1 border ${
              activeTask === 'misconceptions'
                ? 'bg-indigo-600/20 border-indigo-500 text-white'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Compass className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold">Misconceptions</span>
            <span className="text-[10px] text-slate-400">Anticipate student errors</span>
          </button>

          <button
            onClick={() => { setActiveTask('bellringer'); setAiOutput(null); }}
            className={`p-2.5 rounded-xl text-left transition flex flex-col gap-1 border ${
              activeTask === 'bellringer'
                ? 'bg-indigo-600/20 border-indigo-500 text-white'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold">Exit Ticket</span>
            <span className="text-[10px] text-slate-400">5-min check</span>
          </button>
        </div>

        {/* Options Bar */}
        <div className="p-3 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {activeTask === 'adapt_grade' && (
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Target Grade Band:</span>
              <select
                value={targetGrade}
                onChange={(e) => setTargetGrade(e.target.value as GradeBand)}
                className="bg-slate-800 text-white rounded-lg px-2.5 py-1.5 border border-slate-700 outline-none"
              >
                <option value="Elementary (K-5)">Elementary (K-5)</option>
                <option value="Middle School (6-8)">Middle School (6-8)</option>
                <option value="High School (9-12)">High School (9-12)</option>
                <option value="Higher Ed">Higher Ed</option>
              </select>
            </div>
          )}

          <div className="flex-1 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-60"
            >
              <Wand2 className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'AI Crafting Lesson Strategy...' : 'Generate Pedagogical Adaptation'}
            </button>
          </div>
        </div>

        {/* Output Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-950/60">
          {aiOutput ? (
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-inner">
                <pre className="text-xs sm:text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                  {aiOutput}
                </pre>
              </div>

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl transition"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>

                <button
                  onClick={() => {
                    onSaveToBinder(`AI Adapt: ${video.concept}`, aiOutput);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-xl transition font-semibold"
                >
                  Save to My Lesson Binder
                </button>
              </div>
            </div>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
              <Sparkles className="w-8 h-8 text-indigo-400 opacity-60" />
              <p className="text-sm font-semibold text-slate-300">Ready to adapt this teaching strategy</p>
              <p className="text-xs text-slate-500 max-w-sm">
                Click "Generate Pedagogical Adaptation" above to produce customized analogies, differentiated grade-band scripts, or exit tickets.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
