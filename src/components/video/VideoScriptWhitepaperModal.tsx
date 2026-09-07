import React, { useState } from 'react';
import {
  X,
  FileText,
  Download,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  Layers,
  Code,
  BookOpen,
} from 'lucide-react';
import { VIDEO_CHAPTERS, VIDEO_TOTAL_DURATION } from '../../data/videoScriptData';

interface VideoScriptWhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoScriptWhitepaperModal: React.FC<VideoScriptWhitepaperModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'script' | 'whitepaper' | 'storyboard'>('script');

  if (!isOpen) return null;

  const handleCopyAll = () => {
    const fullText = VIDEO_CHAPTERS.map(
      (c) =>
        `### SCENE 0${c.id}: ${c.title.toUpperCase()}\nBadge: ${c.badge}\nDuration: ${c.durationSeconds}s (Start: ${Math.floor(c.startTimeSeconds / 60)}:${(c.startTimeSeconds % 60).toString().padStart(2, '0')})\n\nNarration:\n"${c.narration}"\n\nKey Strategic Points:\n${c.keyPoints.map((p) => `- ${p}`).join('\n')}\n\nTechnical & Regulatory Implementation:\n${c.technicalHighlights.map((h) => `- ${h}`).join('\n')}\n\n`
    ).join('\n---\n\n');

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[88vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 border border-purple-800 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/40">
                  Broadcast Storyboard & Technical Whitepaper
                </span>
                <span className="text-xs font-mono text-slate-400">Total Runtime: 05:00</span>
              </div>
              <h3 className="text-lg font-bold text-slate-100">
                Helix Orchestration Workbench · Explainer Narrative Script
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Transcript' : 'Copy Script'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-slate-800 bg-slate-950/40 text-xs font-medium">
          <button
            onClick={() => setActiveTab('script')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'script'
                ? 'bg-purple-950 text-purple-300 border border-purple-700/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Voiceover Narration Script</span>
          </button>
          <button
            onClick={() => setActiveTab('storyboard')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'storyboard'
                ? 'bg-purple-950 text-purple-300 border border-purple-700/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Visual Scene Storyboard</span>
          </button>
          <button
            onClick={() => setActiveTab('whitepaper')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'whitepaper'
                ? 'bg-purple-950 text-purple-300 border border-purple-700/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Architecture & Regulatory Whitepaper</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: Voiceover Script */}
          {activeTab === 'script' && (
            <div className="space-y-6">
              {VIDEO_CHAPTERS.map((chap) => (
                <div
                  key={chap.id}
                  className="bg-slate-950/60 rounded-xl p-5 border border-slate-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-900 text-purple-300 font-mono text-xs flex items-center justify-center font-bold">
                        0{chap.id}
                      </span>
                      <h4 className="text-sm font-bold text-slate-100">{chap.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span className="text-purple-400">{chap.badge}</span>
                      <span>·</span>
                      <span>{chap.durationSeconds}s</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 italic font-serif">
                    "{chap.narration}"
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1.5">
                        Strategic Highlights
                      </span>
                      <ul className="text-xs space-y-1 text-slate-300">
                        {chap.keyPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-purple-400 shrink-0">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block mb-1.5">
                        Technical Implementations
                      </span>
                      <ul className="text-xs space-y-1 text-slate-300">
                        {chap.technicalHighlights.map((th, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 shrink-0">✓</span>
                            <span>{th}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Storyboard */}
          {activeTab === 'storyboard' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-emerald-400">Scene 1 · Vein-to-Vein Clinical Reality</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Visualizes the autologous CAR-T cell cycle: Patient apheresis ward, cryo-shipper nitrogen vapor phase, cleanroom viral vector transduction, QC release testing, and bedside re-infusion. Demonstrates the strict 28.4-day turnaround benchmark.
                  </p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-red-400">Scene 2 · Fragmentation Crisis & Disconnects</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Visualizes the 4 disconnected enterprise silos: Hospital EHR, Werum PAS-X MES, LabWare LIMS, and TrackWise QMS. Animates identity barcode collisions, liquid nitrogen thermal excursions, and the hazard of unconstrained AI hallucinating release.
                  </p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-cyan-400">Scene 3 · The Helix Solution Architecture</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    The Helix Orchestration Workbench unites all silos through deterministic multi-key reconciliation, real-time cryogenic degree-hour tracking, and non-delegable Qualified Person sole release authority (Hard Gate HG-01).
                  </p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-indigo-400">Scene 4 · Implementation & Security Foundations</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Details the full-stack React 19 + Express engine, RFC 6749 OAuth 2.0 with RFC 7636 PKCE S256 verification, 15-minute inactivity timeouts, bounded Gemini AI prompt grounding, and SHA-256 Merkle audit trails.
                  </p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-purple-400">Scene 5 · 7-Step Interactive Application Flow</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    A synchronized walkthrough of the live application: Batch Operations → Chain of Identity → Cold-Chain IoT → AI Decision Support → HITL 21 CFR Part 11 Digital Signature → Active Sessions &amp; Killswitch → Golden Scenario Lab.
                  </p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-amber-400">Scene 6 · Validated Clinical & Regulatory Outcomes</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Highlights the reduction of vein-to-vein cycle time from 28.4 to 19.2 days (-32%), 100% Chain-of-Identity data integrity, zero regulatory inspection findings, and sub-second batch release validation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Whitepaper & Architecture */}
          {activeTab === 'whitepaper' && (
            <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="text-sm font-bold text-slate-100 mb-2">Executive System Architecture</h4>
                <p>
                  The Helix Orchestration Workbench is an enterprise cGMP software system designed specifically for the unique operational, data integrity, and chain-of-custody requirements of autologous cell and gene therapies (such as CD19 CAR-T and NY-ESO-1 TCR-T).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div className="bg-slate-900/60 p-3 rounded border border-slate-800 font-mono text-[11px]">
                    <div className="text-emerald-400 font-bold mb-1">FRONTEND ARCHITECTURE</div>
                    <div>• React 19 + TypeScript + Tailwind CSS</div>
                    <div>• Motion layout animation engine</div>
                    <div>• RFC 6749 / 7636 PKCE Web Crypto</div>
                    <div>• Web Speech API synchronized audio</div>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded border border-slate-800 font-mono text-[11px]">
                    <div className="text-cyan-400 font-bold mb-1">BACKEND & INTEGRATIONS</div>
                    <div>• Node.js Express Server (Port 3000)</div>
                    <div>• Google Gemini API with SOP grounding</div>
                    <div>• SHA-256 Merkle-Chained Audit Trail</div>
                    <div>• RFC 7662 Token Introspection API</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="text-sm font-bold text-slate-100 mb-2">Regulatory Alignment Matrix</h4>
                <table className="w-full text-[11px] font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400 text-left">
                      <th className="py-1.5">Regulation</th>
                      <th className="py-1.5">Mandate Requirement</th>
                      <th className="py-1.5">Helix Implementation Proof</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="py-1.5 text-purple-400">21 CFR §11.10(a)</td>
                      <td>System Validation & Predictable Execution</td>
                      <td>15 Automated Golden Scenarios (GS-01 to GS-15) verifying Hard Gates HG-01 to HG-08.</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-purple-400">21 CFR §11.10(e)</td>
                      <td>Secure Time-stamped Audit Trails</td>
                      <td>Cryptographic SHA-256 chained event log with immutable previous hash linking.</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-purple-400">21 CFR §11.50</td>
                      <td>Signature Manifestation of Intent</td>
                      <td>Dual-factor credential challenge, user role verification, and explicit signature reason capture.</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-emerald-400">EU GMP Annex 16</td>
                      <td>Qualified Person Non-Delegable Authority</td>
                      <td>Hard Gate HG-01 strictly prohibits automated batch release; sole certification authority remains with licensed QP.</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-indigo-400">RFC 7636 / RFC 6749</td>
                      <td>PKCE Authorization Code Interception Defense</td>
                      <td>Cryptographic SHA-256 code verifier (`S256`) and popup authorization compatible with sandboxed iframes.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-950/80 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Helix Compliance Dossier · Approved for cGMP Inspection Review</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
