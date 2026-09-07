import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Activity,
  AlertTriangle,
  Clock,
  Cpu,
  Key,
  Users,
  ThermometerSnowflake,
  Fingerprint,
  FlaskConical,
  ScrollText,
  Lock,
  ArrowRight,
  Database,
  Building,
  CheckCircle2,
  XCircle,
  FileCheck,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
  Award,
} from 'lucide-react';
import { VideoChapter } from '../../data/videoScriptData';

interface VideoSceneGraphicsProps {
  currentChapter: VideoChapter;
  playbackProgress: number; // 0 to 1 within the current chapter
  globalTimeSeconds: number;
  onJumpToStep?: (stepIndex: number) => void;
}

export const VideoSceneGraphics: React.FC<VideoSceneGraphicsProps> = ({
  currentChapter,
  playbackProgress,
  globalTimeSeconds,
}) => {
  const chapterId = currentChapter.id;
  const [interactiveStep, setInteractiveStep] = useState<number>(1);

  // Scene 1: Business Scenario (Vein-to-Vein Journey)
  if (chapterId === 1) {
    const cycleDay = Math.min(28.4, (playbackProgress * 28.4)).toFixed(1);
    const cellCount = (1.2 + playbackProgress * 1.6).toFixed(2);

    return (
      <div className="relative w-full h-full p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        {/* Glowing Background Radial */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top HUD Stats */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-400 text-xs font-semibold border border-emerald-800/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              VEIN-TO-VEIN TELEMETRY
            </span>
            <span className="text-xs font-mono text-slate-400">PATIENT #HLX-8821 · AUTOLOGOUS CAR-T</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-slate-300">
              CYCLE ELAPSED: <span className="text-emerald-400 font-bold">{cycleDay} / 28.4 DAYS</span>
            </div>
            <div className="text-slate-300 hidden sm:block">
              CELL EXPANSION: <span className="text-cyan-400 font-bold">{cellCount} × 10⁸ CELLS/KG</span>
            </div>
          </div>
        </div>

        {/* Central Vein-to-Vein Animated Journey Map */}
        <div className="relative z-10 my-auto py-4">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
              <span>Personalized Autologous Cell Therapy Pipeline</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-1">
              One batch equals one human life. T-cells harvested at hospital must complete an irreversible 6-stage clinical cycle.
            </p>
          </div>

          {/* Stepper Pipeline with Traveling Cell Animation */}
          <div className="relative max-w-4xl mx-auto">
            {/* Connecting Track */}
            <div className="absolute top-1/2 left-4 right-4 h-1.5 -translate-y-1/2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-purple-500 transition-all duration-300 rounded-full"
                style={{ width: `${Math.max(8, playbackProgress * 100)}%` }}
              />
            </div>

            {/* Traveling Pulsing Cell */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300 z-20"
              style={{ left: `${Math.min(94, Math.max(6, playbackProgress * 100))}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-400/90 shadow-lg shadow-emerald-500/50 flex items-center justify-center border-2 border-white animate-pulse">
                <Sparkles className="w-4 h-4 text-slate-950" />
              </div>
            </div>

            {/* 5 Milestone Nodes */}
            <div className="relative z-10 grid grid-cols-5 gap-2 text-center">
              {[
                { stage: '1. Apheresis', desc: 'Patient T-cell harvest', icon: Users, done: playbackProgress >= 0.1 },
                { stage: '2. Cryo Logistics', desc: '-196°C LN2 vapor', icon: ThermometerSnowflake, done: playbackProgress >= 0.35 },
                { stage: '3. Cleanroom', desc: 'Viral vector transduction', icon: Cpu, done: playbackProgress >= 0.6 },
                { stage: '4. QC & LIMS', desc: 'Sterility & viability assays', icon: FlaskConical, done: playbackProgress >= 0.8 },
                { stage: '5. QP Infusion', desc: 'Bedside re-infusion', icon: Activity, done: playbackProgress >= 0.95 },
              ].map((node, i) => {
                const Icon = node.icon;
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                        node.done
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950'
                          : 'bg-slate-900/90 border-slate-700 text-slate-500'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="mt-2 text-xs font-semibold text-slate-200">{node.stage}</span>
                    <span className="text-[10px] text-slate-400 hidden sm:block">{node.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Banner Note */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-800/80 pt-3 text-xs">
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Therapeutic Class</span>
            <span className="text-emerald-300 font-semibold">Living Cellular Drug (Autologous)</span>
          </div>
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Patient Population</span>
            <span className="text-amber-300 font-semibold">Refractory B-Cell Malignancy</span>
          </div>
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Operational Ceiling</span>
            <span className="text-purple-300 font-semibold">Zero Margin for Contamination or Delay</span>
          </div>
        </div>
      </div>
    );
  }

  // Scene 2: The Industry Crisis (System Fragmentation & Silos)
  if (chapterId === 2) {
    const isAlertPhase = playbackProgress > 0.4;

    return (
      <div className="relative w-full h-full p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top HUD */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/80 text-red-400 text-xs font-semibold border border-red-800/40">
              <AlertTriangle className="w-3.5 h-3.5" />
              SYSTEM FRAGMENTATION CRISIS
            </span>
            <span className="text-xs font-mono text-slate-400">UNSYNCHRONIZED ENTERPRISE SILOS</span>
          </div>
          <div className="text-xs font-mono text-red-400">
            RECONCILIATION LATENCY: <span className="font-bold">48 - 72 HOURS</span>
          </div>
        </div>

        {/* Center: 4 Disconnected Silos with Collision & Red Flags */}
        <div className="relative z-10 my-auto py-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {/* Silo 1: Hospital EHR */}
            <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-700/80 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-blue-400 uppercase">Hospital EHR</span>
                <Building className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-xs text-slate-300 font-bold">Epic / Cerner</p>
              <div className="mt-2 text-[10px] space-y-1 font-mono text-slate-400 bg-slate-950/60 p-1.5 rounded">
                <div>MRN: #EHR-9941</div>
                <div>Donor ID: #D-8821</div>
                <div className="text-amber-400">Patient: John Doe</div>
              </div>
              {isAlertPhase && (
                <div className="mt-2 text-[10px] bg-red-950/80 text-red-300 border border-red-800/60 px-1.5 py-0.5 rounded font-mono">
                  ⚠ Unsynced with MES
                </div>
              )}
            </div>

            {/* Silo 2: Cleanroom MES */}
            <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-700/80 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-emerald-400 uppercase">Cleanroom MES</span>
                <Cpu className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xs text-slate-300 font-bold">Werum PAS-X</p>
              <div className="mt-2 text-[10px] space-y-1 font-mono text-slate-400 bg-slate-950/60 p-1.5 rounded">
                <div>Batch: CAR-T-2026</div>
                <div>Subj Code: #ANON-441</div>
                <div className="text-emerald-400">Yield: 88.4%</div>
              </div>
              {isAlertPhase && (
                <div className="mt-2 text-[10px] bg-red-950/80 text-red-300 border border-red-800/60 px-1.5 py-0.5 rounded font-mono">
                  ⚠ Paper Sign-off Needed
                </div>
              )}
            </div>

            {/* Silo 3: Analytical LIMS */}
            <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-700/80 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-purple-400 uppercase">Analytical LIMS</span>
                <FlaskConical className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-xs text-slate-300 font-bold">LabWare 8</p>
              <div className="mt-2 text-[10px] space-y-1 font-mono text-slate-400 bg-slate-950/60 p-1.5 rounded">
                <div>Viability: 91.2%</div>
                <div>Sterility: PENDING 14d</div>
                <div className="text-purple-400">VCN: 1.8 copies</div>
              </div>
              {isAlertPhase && (
                <div className="mt-2 text-[10px] bg-red-950/80 text-red-300 border border-red-800/60 px-1.5 py-0.5 rounded font-mono">
                  ⚠ Disconnected Assay
                </div>
              )}
            </div>

            {/* Silo 4: Enterprise QMS */}
            <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-700/80 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-amber-400 uppercase">Quality QMS</span>
                <ScrollText className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-xs text-slate-300 font-bold">TrackWise 24</p>
              <div className="mt-2 text-[10px] space-y-1 font-mono text-slate-400 bg-slate-950/60 p-1.5 rounded">
                <div>CAPA: #DEV-2026-11</div>
                <div>Status: OPEN</div>
                <div className="text-amber-400">QP Review: BLOCKED</div>
              </div>
              {isAlertPhase && (
                <div className="mt-2 text-[10px] bg-red-950/80 text-red-300 border border-red-800/60 px-1.5 py-0.5 rounded font-mono">
                  ⚠ 72h Review Backlog
                </div>
              )}
            </div>
          </div>

          {/* Major Threat Callout Banner */}
          {isAlertPhase && (
            <div className="mt-4 max-w-4xl mx-auto bg-red-950/70 border border-red-600/70 rounded-xl p-3 flex items-center gap-3 animate-pulse">
              <ShieldAlert className="w-8 h-8 text-red-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-red-200 uppercase tracking-wide block">
                  Critical Vulnerabilities in Unorchestrated Manufacturing
                </span>
                <span className="text-red-300/90">
                  1. Chain-of-Identity mismatch risk (infusing wrong patient). 2. Unmonitored LN2 thermal stress degree-hours. 3. Unconstrained AI hallucinating release without QP authority.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Metrics */}
        <div className="relative z-10 flex items-center justify-between text-xs border-t border-slate-800/80 pt-3 text-slate-400 font-mono">
          <div>IMPACT: 72H RELEASE BOTTLENECK</div>
          <div className="text-red-400 font-bold">REGULATORY RISK: 21 CFR PART 11 NON-COMPLIANCE</div>
        </div>
      </div>
    );
  }

  // Scene 3: The Need (Helix Orchestration Workbench Solution)
  if (chapterId === 3) {
    return (
      <div className="relative w-full h-full p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top HUD */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/80 text-cyan-400 text-xs font-semibold border border-cyan-800/40">
              <ShieldCheck className="w-3.5 h-3.5" />
              THE HELIX SOLUTION
            </span>
            <span className="text-xs font-mono text-slate-400">DETERMINISTIC MULTI-SYSTEM RECONCILIATION</span>
          </div>
          <div className="text-xs font-mono text-emerald-400">
            HARD GATE HG-01: <span className="font-bold">QP SOLE AUTHORITY ENFORCED</span>
          </div>
        </div>

        {/* Central Architecture Hub Visual */}
        <div className="relative z-10 my-auto py-2">
          <div className="text-center mb-4">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
              <span>Helix Orchestration Mesh & Bounded Decision Gate</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mt-1">
              Unifies isolated biopharma platforms into a deterministic single-source-of-truth with 100% human-in-the-loop control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {/* Core Capability 1 */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-emerald-600/40 relative">
              <div className="w-9 h-9 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center mb-3">
                <Fingerprint className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-emerald-300">Deterministic COI Key Mesh</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Reconciles hospital MRN, donor Subject IDs, Werum batch numbers, and cryo-tag RFID codes. Immediate hard block upon any identifier ambiguity.
              </p>
              <div className="mt-3 text-[10px] font-mono text-emerald-400/80 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-900/50">
                ✓ ZERO ID AMBIGUITY (CTRL-01)
              </div>
            </div>

            {/* Core Capability 2 */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-cyan-600/40 relative">
              <div className="w-9 h-9 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center mb-3">
                <ThermometerSnowflake className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-cyan-300">Degree-Hour Cold Chain</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Evaluates liquid nitrogen vapor phase (-196°C to -150°C) by integrating cumulative thermal stress (severity × duration) rather than binary thresholds.
              </p>
              <div className="mt-3 text-[10px] font-mono text-cyan-400/80 bg-cyan-950/40 px-2 py-1 rounded border border-cyan-900/50">
                ✓ TRAPEZOIDAL INTEGRATION (FR-04)
              </div>
            </div>

            {/* Core Capability 3 */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-purple-600/40 relative">
              <div className="w-9 h-9 rounded-lg bg-purple-950 text-purple-400 border border-purple-800 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-purple-300">Bounded AI Decision Gate</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                AI provides strictly advisory synthesis with 100% SOP citations. Hard Gate HG-01 prohibits autonomous batch release; only the Qualified Person can sign.
              </p>
              <div className="mt-3 text-[10px] font-mono text-purple-400/80 bg-purple-950/40 px-2 py-1 rounded border border-purple-900/50">
                ✓ 21 CFR PART 11 DUAL-FACTOR E-SIGN
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="relative z-10 flex items-center justify-between text-xs border-t border-slate-800/80 pt-3 text-slate-400 font-mono">
          <div>PLATFORM: HELIX WORKBENCH v4.2</div>
          <div className="text-emerald-400 font-semibold">EU GMP ANNEX 16 NON-DELEGABLE COMPLIANCE</div>
        </div>
      </div>
    );
  }

  // Scene 4: Implementation Approach & Architecture
  if (chapterId === 4) {
    return (
      <div className="relative w-full h-full p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top HUD */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-950/80 text-indigo-400 text-xs font-semibold border border-indigo-800/40">
              <Cpu className="w-3.5 h-3.5" />
              TECHNICAL ARCHITECTURE & IMPLEMENTATION
            </span>
            <span className="text-xs font-mono text-slate-400">FULL-STACK REACT 19 + EXPRESS + OAUTH2</span>
          </div>
          <div className="text-xs font-mono text-indigo-400">
            SECURITY: <span className="font-bold">RFC 6749 & RFC 7636 PKCE S256</span>
          </div>
        </div>

        {/* 4 Architectural Layers */}
        <div className="relative z-10 my-auto py-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {/* Layer 1: Client Experience */}
            <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Layer 01 · Presentation</span>
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-xs font-bold text-slate-100">React 19 & Tailwind</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Motion layout transitions, responsive data HUDs, sandboxed iframe postMessage handlers, and real-time session countdown timers.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-emerald-400">
                • 15-min idle countdown
                <br />• Sandboxed popup flow
              </div>
            </div>

            {/* Layer 2: OAuth2 & Token Engine */}
            <div className="bg-slate-900/90 rounded-xl p-3 border border-indigo-800/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase">Layer 02 · Identity</span>
                  <Key className="w-4 h-4 text-indigo-400" />
                </div>
                <h4 className="text-xs font-bold text-indigo-300">RFC 6749 & PKCE S256</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  SHA-256 code challenge generation, token introspection (RFC 7662), and remote session killswitches for instant token revocation.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-indigo-300">
                • S256 Code Challenge
                <br />• Token Introspection
              </div>
            </div>

            {/* Layer 3: Server & Bounded AI */}
            <div className="bg-slate-900/90 rounded-xl p-3 border border-purple-800/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-purple-400 uppercase">Layer 03 · Intelligence</span>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <h4 className="text-xs font-bold text-purple-300">Bounded Gemini Engine</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Grounds prompt synthesis exclusively in active cGMP standard operating procedures. Hard Gate defense against superseded policies.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-purple-300">
                • 100% SOP Provenance
                <br />• Injection Sanitization
              </div>
            </div>

            {/* Layer 4: Cryptographic Audit */}
            <div className="bg-slate-900/90 rounded-xl p-3 border border-cyan-800/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">Layer 04 · Assurance</span>
                  <ScrollText className="w-4 h-4 text-cyan-400" />
                </div>
                <h4 className="text-xs font-bold text-cyan-300">SHA-256 Audit Trail</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Immutable hash-chained records for every login, temperature excursion, AI synthesis, and QP digital signature.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-cyan-300">
                • Merkle Hash Chain
                <br />• 1-Click Dossier Export
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="relative z-10 flex items-center justify-between text-xs border-t border-slate-800/80 pt-3 text-slate-400 font-mono">
          <div>CONTAINER INGRESS: PORT 3000 STRICT PROXY</div>
          <div className="text-indigo-400">ZERO BROWSER SECRET LEAKAGE (ENV HYGIENE)</div>
        </div>
      </div>
    );
  }

  // Scene 5: End-to-End Application Flow Walkthrough
  if (chapterId === 5) {
    const steps = [
      {
        num: 1,
        title: 'Batch Operations',
        sub: 'Vein-to-Vein Tracking',
        icon: Activity,
        preview: 'Track autologous batches against 28.4d baseline with live MES & LIMS telemetry status indicators.',
        badge: 'CYCLE OPS',
      },
      {
        num: 2,
        title: 'Chain-of-Identity',
        sub: 'COI De-Identification',
        icon: Fingerprint,
        preview: 'Deterministic key mapping resolving MRN, Donor ID, and MES codes with dual-witness QP adjudication on mismatch.',
        badge: 'ID INTEGRITY',
      },
      {
        num: 3,
        title: 'Cold-Chain IoT',
        sub: 'Degree-Hour Analysis',
        icon: ThermometerSnowflake,
        preview: 'Continuous LN2 sensor streaming (-196°C to -150°C) with interactive duration × severity excursion calculator.',
        badge: 'CRYO IOT',
      },
      {
        num: 4,
        title: 'AI Decision Support',
        sub: 'SOP Provenance Citations',
        icon: Sparkles,
        preview: 'Bounded Gemini engine synthesizing batch summaries with 100% active SOP grounding and zero hallucinations.',
        badge: 'AI REASONING',
      },
      {
        num: 5,
        title: 'HITL Approval Queue',
        sub: '21 CFR Part 11 Digital Sign',
        icon: CheckCircle2,
        preview: 'Sole QP authority gate requiring manifestation of intent, signature reason, and dual-factor credential challenge.',
        badge: 'QP HARD GATE',
      },
      {
        num: 6,
        title: 'Active Sessions',
        sub: 'OAuth2 Token Governance',
        icon: Users,
        preview: 'Real-time operator session map, RFC 7662 token introspection, and emergency one-click session killswitch.',
        badge: 'SESSION GOV',
      },
      {
        num: 7,
        title: 'Scenario Lab & Audit',
        sub: '15 Golden Tests & SHA-256',
        icon: FlaskConical,
        preview: 'Automated regression test harness verifying Hard Gates HG-01 to HG-08 with cryptographic audit exports.',
        badge: 'VERIFICATION',
      },
    ];

    // Automatically advance active step based on chapter progress, but allow user override
    const autoStepIndex = Math.min(steps.length, Math.floor(playbackProgress * steps.length) + 1);
    const activeStepNum = interactiveStep || autoStepIndex;
    const activeStepData = steps.find((s) => s.num === activeStepNum) || steps[0];
    const StepIcon = activeStepData.icon;

    return (
      <div className="relative w-full h-full p-5 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-purple-950/80 text-purple-400 text-xs font-semibold border border-purple-800/40">
              <Zap className="w-3.5 h-3.5" />
              END-TO-END WORKFLOW SIMULATOR
            </span>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">COMPLETE SYSTEM FLOW (7 STEPS)</span>
          </div>
          <div className="text-xs font-mono text-purple-300">
            STEP {activeStepNum} OF 7 · <span className="font-bold">{activeStepData.badge}</span>
          </div>
        </div>

        {/* 7-Step Interactive Flow Strip */}
        <div className="relative z-10 py-2">
          <div className="grid grid-cols-7 gap-1.5 max-w-4xl mx-auto mb-3">
            {steps.map((s) => {
              const Icon = s.icon;
              const isCurrent = s.num === activeStepNum;
              return (
                <button
                  key={s.num}
                  onClick={() => setInteractiveStep(s.num)}
                  className={`p-2 rounded-lg text-left transition-all border ${
                    isCurrent
                      ? 'bg-purple-950/90 border-purple-500 text-purple-200 shadow-md shadow-purple-950'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold">0{s.num}</span>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[10px] font-semibold truncate mt-1">{s.title}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Step Simulation Card */}
          <div className="max-w-4xl mx-auto bg-slate-900/90 rounded-xl p-4 border border-purple-700/50 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-300 border border-purple-700 flex items-center justify-center shrink-0">
                  <StepIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-700/40">
                      Step {activeStepData.num} · {activeStepData.sub}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">21 CFR Part 11 Verified</span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-0.5">{activeStepData.title}</h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInteractiveStep(Math.max(1, activeStepNum - 1))}
                  disabled={activeStepNum === 1}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  onClick={() => setInteractiveStep(Math.min(7, activeStepNum + 1))}
                  disabled={activeStepNum === 7}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-purple-700 text-white hover:bg-purple-600 disabled:opacity-40"
                >
                  Next Step
                </button>
              </div>
            </div>

            {/* Step Body Simulation Content */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block mb-1">
                  Functional Operation
                </span>
                <p className="text-slate-300 leading-relaxed">{activeStepData.preview}</p>
                <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Real-time state synchronization with Express backend</span>
                </div>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 font-mono text-[11px] space-y-1 text-slate-300">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  Compliance Rule & Hard Gate
                </span>
                {activeStepNum === 1 && (
                  <>
                    <div className="text-emerald-400">✓ Target: 28.4d baseline cycle time tracking</div>
                    <div>✓ Real-time status ingestion: PAS-X & LabWare</div>
                    <div>✓ Automated anomaly flagging</div>
                  </>
                )}
                {activeStepNum === 2 && (
                  <>
                    <div className="text-amber-400">✓ CTRL-01: Identity Ambiguity Blocking</div>
                    <div>✓ CTRL-02: Patient De-identification Protection</div>
                    <div>✓ Dual-witness QP adjudication required</div>
                  </>
                )}
                {activeStepNum === 3 && (
                  <>
                    <div className="text-cyan-400">✓ LN2 Vapor Phase: -196°C to -150°C</div>
                    <div>✓ FR-04: Severity × Duration thermal stress</div>
                    <div>✓ Automatic QP alert above 4.0 degree-hours</div>
                  </>
                )}
                {activeStepNum === 4 && (
                  <>
                    <div className="text-purple-400">✓ AI-01: 100% Provenance Citations</div>
                    <div>✓ AI-04 & GS-12: Active SOP policy enforcement</div>
                    <div>✓ Strict zero hallucination validation</div>
                  </>
                )}
                {activeStepNum === 5 && (
                  <>
                    <div className="text-emerald-400">✓ HG-01: Zero autonomous release authority</div>
                    <div>✓ 21 CFR §11.50 Electronic signature manifestation</div>
                    <div>✓ Non-delegable EU GMP Annex 16 QP release</div>
                  </>
                )}
                {activeStepNum === 6 && (
                  <>
                    <div className="text-indigo-400">✓ RFC 7662 Token Introspection engine</div>
                    <div>✓ 15-minute inactivity auto-logout</div>
                    <div>✓ Instant remote token revocation killswitch</div>
                  </>
                )}
                {activeStepNum === 7 && (
                  <>
                    <div className="text-blue-400">✓ GS-01 to GS-15 automated test harness</div>
                    <div>✓ Cryptographic SHA-256 Merkle audit trail</div>
                    <div>✓ 1-click JSON compliance dossier export</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 flex items-center justify-between text-xs border-t border-slate-800/80 pt-2 text-slate-400 font-mono">
          <div>INTERACTIVE APPLICATION TOUR MODE</div>
          <div className="text-purple-400">ALL 7 CORE MODULES ACTIVE & VERIFIED</div>
        </div>
      </div>
    );
  }

  // Scene 6: Transformative Outcomes & Regulatory Compliance
  if (chapterId === 6) {
    const cycleReduction = (28.4 - (playbackProgress * (28.4 - 19.2))).toFixed(1);

    return (
      <div className="relative w-full h-full p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top HUD */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-400 text-xs font-semibold border border-emerald-800/40">
              <Award className="w-3.5 h-3.5" />
              TRANSFORMATIVE CLINICAL & REGULATORY OUTCOMES
            </span>
            <span className="text-xs font-mono text-slate-400">VALIDATED IMPACT SCORECARD</span>
          </div>
          <div className="text-xs font-mono text-emerald-400">
            AUDIT READINESS: <span className="font-bold">100% VERIFIED</span>
          </div>
        </div>

        {/* Center: Before vs After Metrics */}
        <div className="relative z-10 my-auto py-2">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
              <span>Delivering Therapies to Patients 9.2 Days Faster</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mt-1">
              Accelerating life-saving cell therapy infusions while achieving uncompromising regulatory compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {/* Metric 1 */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-emerald-500/40 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Vein-to-Vein Cycle</span>
              <div className="my-2">
                <div className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">
                  {cycleReduction}d
                </div>
                <span className="text-xs text-slate-400">Down from 28.4d baseline</span>
              </div>
              <div className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                -32% Turnaround Time
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-cyan-500/40 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase">QP Release Latency</span>
              <div className="my-2">
                <div className="text-3xl font-extrabold text-cyan-400 font-mono tracking-tight">
                  45 min
                </div>
                <span className="text-xs text-slate-400">Down from 72h manual review</span>
              </div>
              <div className="text-[11px] font-semibold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                -98% Batch Bottleneck
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-purple-500/40 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Identity Integrity</span>
              <div className="my-2">
                <div className="text-3xl font-extrabold text-purple-400 font-mono tracking-tight">
                  100%
                </div>
                <span className="text-xs text-slate-400">Zero cross-infusion risk</span>
              </div>
              <div className="text-[11px] font-semibold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                Deterministic COI
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-amber-500/40 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Inspection Compliance</span>
              <div className="my-2">
                <div className="text-3xl font-extrabold text-amber-400 font-mono tracking-tight">
                  0 Findings
                </div>
                <span className="text-xs text-slate-400">21 CFR 11 & Annex 16</span>
              </div>
              <div className="text-[11px] font-semibold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                Full Regulatory Pass
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="relative z-10 flex items-center justify-between text-xs border-t border-slate-800/80 pt-3 text-slate-400 font-mono">
          <div>IMMUTABLE AUDIT TRAIL: SHA-256 VERIFIED</div>
          <div className="text-emerald-400 font-bold">HELIX: REVOLUTIONIZING CELL & GENE THERAPY</div>
        </div>
      </div>
    );
  }

  return null;
};
