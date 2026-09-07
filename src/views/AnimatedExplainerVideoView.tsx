import React, { useState } from 'react';
import {
  Film,
  FileText,
  ShieldCheck,
  Zap,
  Activity,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Award,
} from 'lucide-react';
import { AnimatedVideoPlayer } from '../components/video/AnimatedVideoPlayer';
import { VideoScriptWhitepaperModal } from '../components/video/VideoScriptWhitepaperModal';
import { VIDEO_CHAPTERS } from '../data/videoScriptData';
import { TabId } from '../components/Navigation';

interface AnimatedExplainerVideoViewProps {
  onNavigateToTab?: (tab: TabId) => void;
}

export const AnimatedExplainerVideoView: React.FC<AnimatedExplainerVideoViewProps> = ({
  onNavigateToTab,
}) => {
  const [isScriptModalOpen, setIsScriptModalOpen] = useState<boolean>(false);
  const [selectedSceneDetail, setSelectedSceneDetail] = useState<number>(1);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950/80 text-purple-300 text-xs font-semibold border border-purple-800/50">
              <Film className="w-3.5 h-3.5 text-purple-400" />
              <span>OFFICIAL EXPLAINER ANIMATION · 5:00 RUNTIME</span>
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              21 CFR PART 11 & EU GMP ANNEX 16
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Business Scenario, Challenges & System Architecture</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-1 leading-relaxed">
            An animated documentary and architectural walkthrough explaining the clinical stakes of autologous cell and gene therapy, multi-system silos, bounded AI decision support, and the end-to-end operation of the Helix Orchestration Workbench.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsScriptModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 text-purple-200 border border-purple-700/50 text-xs font-semibold shadow-md transition-all"
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>Whitepaper & Full Script</span>
          </button>
        </div>
      </div>

      {/* Main Animated Video Player */}
      <AnimatedVideoPlayer
        onOpenScriptModal={() => setIsScriptModalOpen(true)}
        onNavigateToAppTab={(tab) => onNavigateToTab && onNavigateToTab(tab as TabId)}
      />

      {/* Interactive Scene Breakdown Tabs & Highlights */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-purple-400 font-semibold tracking-wider">
              IN-DEPTH CHAPTER EXPLORER
            </span>
            <h3 className="text-lg font-bold text-white">
              System Narrative & Technical Proof Points
            </h3>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {VIDEO_CHAPTERS.map((chap) => (
              <button
                key={chap.id}
                onClick={() => setSelectedSceneDetail(chap.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  selectedSceneDetail === chap.id
                    ? 'bg-purple-950 text-purple-300 border border-purple-700/80 shadow-md shadow-purple-950'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                Scene 0{chap.id}
              </button>
            ))}
          </div>
        </div>

        {/* Active Scene Detail Content */}
        {(() => {
          const detail = VIDEO_CHAPTERS.find((c) => c.id === selectedSceneDetail) || VIDEO_CHAPTERS[0];
          return (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono text-purple-400 font-semibold">{detail.badge}</span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-100">{detail.title}</h4>
                  <p className="text-xs text-slate-400">{detail.subtitle}</p>
                </div>
                <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  DURATION: <span className="text-emerald-400 font-bold">{detail.durationSeconds} SECONDS</span>
                </div>
              </div>

              {/* Narration Quote */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 font-serif italic leading-relaxed">
                "{detail.narration}"
              </div>

              {/* Key Strategic Points & Technical Implementations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-xs font-mono uppercase text-slate-300 font-bold">
                      Clinical & Operational Imperatives
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {detail.keyPoints.map((kp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-400 font-bold">•</span>
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                      cGMP Engineering & Regulatory Grounding
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {detail.technicalHighlights.map((th, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{th}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Quick Launch into Implemented Application Modules */}
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold tracking-wider">
              OPERATIONAL WORKBENCH MODULES
            </span>
            <h3 className="text-base font-bold text-white">
              Direct Access to Implemented Application Screens
            </h3>
          </div>
          <span className="text-xs text-slate-400">Click any module to open live interface</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              tab: 'batches' as TabId,
              title: 'Batch Operations',
              desc: 'Vein-to-vein timeline & cycle tracker',
              color: 'hover:border-emerald-500/60',
            },
            {
              tab: 'coi' as TabId,
              title: 'Chain of Identity',
              desc: 'Deterministic multi-key reconciliation',
              color: 'hover:border-amber-500/60',
            },
            {
              tab: 'coldchain' as TabId,
              title: 'Cold-Chain IoT',
              desc: '-196°C LN2 degree-hour calculus',
              color: 'hover:border-cyan-500/60',
            },
            {
              tab: 'hitl' as TabId,
              title: 'HITL Approval Queue',
              desc: '21 CFR Part 11 QP digital signatures',
              color: 'hover:border-purple-500/60',
            },
            {
              tab: 'sessions' as TabId,
              title: 'Active Sessions & OAuth2',
              desc: 'Token introspection & remote killswitch',
              color: 'hover:border-emerald-500/60',
            },
            {
              tab: 'scenarios' as TabId,
              title: 'Golden Scenario Lab',
              desc: '15 automated Hard Gate regression tests',
              color: 'hover:border-blue-500/60',
            },
            {
              tab: 'audit' as TabId,
              title: '21 CFR Part 11 Audit',
              desc: 'SHA-256 Merkle-chained compliance trail',
              color: 'hover:border-indigo-500/60',
            },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => onNavigateToTab && onNavigateToTab(item.tab)}
              className={`p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-left transition-all ${item.color} group flex flex-col justify-between`}
            >
              <div>
                <div className="text-xs font-bold text-slate-100 group-hover:text-white flex items-center justify-between">
                  <span>{item.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-transform group-hover:translate-x-0.5" />
                </div>
                <div className="text-[11px] text-slate-400 mt-1 leading-snug">{item.desc}</div>
              </div>
              <div className="mt-2 text-[10px] font-mono text-emerald-400/80">Launch View →</div>
            </button>
          ))}
        </div>
      </div>

      {/* Regulatory & Architecture Whitepaper Modal */}
      <VideoScriptWhitepaperModal
        isOpen={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
      />
    </div>
  );
};
