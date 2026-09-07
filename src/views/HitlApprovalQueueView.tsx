import React, { useState } from 'react';
import { useWorkbench } from '../context/WorkbenchContext';
import { useAuth } from '../context/AuthContext';
import {
  CheckSquare,
  ShieldCheck,
  AlertTriangle,
  Clock,
  FileCheck,
  Hash,
  ChevronDown,
  ChevronUp,
  XCircle,
  CheckCircle,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { HitlRecommendation } from '../types';

export const HitlApprovalQueueView: React.FC = () => {
  const { recommendations, approveRecommendation, rejectRecommendation } = useWorkbench();
  const { currentUser, checkPermission } = useAuth();

  const [expandedRecId, setExpandedRecId] = useState<string | null>(recommendations[0]?.id || null);
  const [signatureModalRec, setSignatureModalRec] = useState<HitlRecommendation | null>(null);
  const [signatureReason, setSignatureReason] = useState('Qualified Person review and regulatory concurrence.');
  const [rejectReason, setRejectReason] = useState('');
  const [isRejectingId, setIsRejectingId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedRecId(expandedRecId === id ? null : id);
  };

  const handleApprove = async () => {
    if (!signatureModalRec) return;
    const ok = await approveRecommendation(signatureModalRec.id, signatureReason);
    if (ok) {
      setSignatureModalRec(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!rejectReason) {
      alert('Please provide a reason for rejecting this advisory.');
      return;
    }
    const ok = await rejectRecommendation(id, rejectReason);
    if (ok) {
      setIsRejectingId(null);
      setRejectReason('');
    }
  };

  const pendingCount = recommendations.filter((r) => r.status === 'PENDING_REVIEW').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
            <CheckSquare className="w-4 h-4" />
            Human-in-the-Loop (HITL) Gate · Qualified Person Approval Queue
          </div>
          <h2 className="text-lg font-bold text-slate-100 mt-1">
            Decision Support Advisories & Governance Gating
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Per PRD CTRL-03 & AI-02: AI recommendations possess zero autonomous authority (HG-01). Every decision requires human-in-the-loop review with 100% evidence provenance traceability.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-center">
            <div className="text-xl font-bold font-mono text-purple-400">{pendingCount}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Pending Review</div>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec) => {
          const isExpanded = expandedRecId === rec.id;
          const isQpOnly = rec.requiresRole === 'QUALIFIED_PERSON';
          const userCanAdjudicate = checkPermission(
            rec.type === 'RELEASE_APPROVAL' ? 'RELEASE_BATCH' : 'MANUFACTURING_TRANSITION'
          ).allowed;

          return (
            <div
              key={rec.id}
              className={`bg-slate-900 border rounded-xl transition overflow-hidden shadow-sm ${
                rec.status === 'HARD_CONSTRAINT_BLOCKED'
                  ? 'border-rose-700/80 bg-rose-950/20'
                  : rec.status === 'APPROVED'
                  ? 'border-emerald-700/60'
                  : rec.status === 'REJECTED'
                  ? 'border-slate-800 opacity-75'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Summary Header */}
              <div
                onClick={() => toggleExpand(rec.id)}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                      rec.status === 'HARD_CONSTRAINT_BLOCKED'
                        ? 'bg-rose-950 text-rose-400 border-rose-800/80'
                        : rec.status === 'APPROVED'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800/80'
                        : 'bg-purple-950 text-purple-400 border-purple-800/80'
                    }`}
                  >
                    {rec.status === 'HARD_CONSTRAINT_BLOCKED' ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : rec.status === 'APPROVED' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        {rec.batchNumber}
                      </span>
                      <span className="text-[10px] px-2 py-0.2 rounded font-bold uppercase bg-slate-800 text-slate-300">
                        {rec.type.replace(/_/g, ' ')}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.2 rounded font-bold uppercase ${
                          rec.status === 'PENDING_REVIEW'
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-800/50'
                            : rec.status === 'APPROVED'
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50'
                            : rec.status === 'HARD_CONSTRAINT_BLOCKED'
                            ? 'bg-rose-950 text-rose-300 border border-rose-700'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {rec.status.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400">
                        Confidence: {(rec.confidenceScore * 100).toFixed(0)}%
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-100 mt-1">{rec.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{rec.plainLanguageSummary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <span className="text-[11px] text-purple-300 font-mono hidden sm:inline">
                    Req: {rec.requiresRole.replace(/_/g, ' ')}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expanded Detail View */}
              {isExpanded && (
                <div className="border-t border-slate-800/80 p-5 bg-slate-950/60 space-y-5">
                  {/* Hard Constraint Block Notice */}
                  {rec.status === 'HARD_CONSTRAINT_BLOCKED' && (
                    <div className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-800 text-xs text-rose-300 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Hard Constraint Block (HG-02 / CTRL-01 / CTRL-04):</strong>{' '}
                        {rec.hardConstraintBlockedReason || 'Automatic progression locked.'}
                      </div>
                    </div>
                  )}

                  {/* Plain Language Summary */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Plain Language Decision Support Rationale (AI-05)
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/90 p-3.5 rounded-lg border border-slate-800">
                      {rec.plainLanguageSummary}
                    </p>
                  </div>

                  {/* Active Policy Version Enforced (AI-04 / GS-12) */}
                  <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                          Active SOP / Policy Benchmark (AI-04)
                        </div>
                        <div className="font-semibold text-slate-200">{rec.activePolicyVersion}</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/40 font-mono">
                      Superseded Trap Protected
                    </span>
                  </div>

                  {/* 100% Evidence Provenance Records (AI-01 / HG-03) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Evidence Provenance Records (100% Coverage Mandate - HG-03)
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {rec.provenance.length} Records Verified
                      </span>
                    </div>

                    <div className="space-y-2">
                      {rec.provenance.map((prov, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-900 border border-slate-850 rounded-lg p-3 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-slate-200">{prov.source}</span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {prov.recordId} · {prov.timestamp.slice(11, 16)} UTC
                            </span>
                          </div>
                          <p className="text-slate-300 font-mono text-[11px]">{prov.snippet}</p>
                          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-800/60">
                            <Hash className="w-3 h-3 text-slate-500" />
                            <span>SHA-256: {prov.integrityHash}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Controls */}
                  {rec.status === 'PENDING_REVIEW' && (
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                      <div className="text-[11px] text-slate-400">
                        Signatory required: <strong className="text-purple-300">{rec.requiresRole}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsRejectingId(rec.id)}
                          className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-rose-300 hover:border-rose-700 text-xs font-semibold transition"
                        >
                          Reject with Rationale
                        </button>

                        <button
                          onClick={() => setSignatureModalRec(rec)}
                          className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-sm"
                        >
                          Review & Electronic Sign
                        </button>
                      </div>
                    </div>
                  )}

                  {rec.adjudicatedBy && (
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-0.5">
                      <div className="font-bold text-emerald-400">
                        Adjudicated by: {rec.adjudicatedBy} ({rec.status})
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Timestamp: {rec.adjudicatedAt} · Notes: "{rec.reviewerNotes}"
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Rejection Modal */}
      {isRejectingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-100">Reject Advisory Recommendation</h3>
            <p className="text-xs text-slate-400">
              State the cGMP or clinical reason for rejecting this decision-support advisory:
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              placeholder="e.g. Inconclusive sterility broth sub-culture requires 48h re-incubation..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500 font-mono"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsRejectingId(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(isRejectingId)}
                className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signature Modal */}
      {signatureModalRec && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-purple-700/60 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-100">
              Electronic Signature Sign-off (21 CFR Part 11)
            </h3>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
              <div>Advisory: <strong>{signatureModalRec.title}</strong></div>
              <div>Batch: <span className="font-mono text-cyan-300">{signatureModalRec.batchNumber}</span></div>
              <div>Signatory: <strong className="text-emerald-400">{currentUser.name}</strong> ({currentUser.role})</div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Digital Signature Reason
              </label>
              <input
                type="text"
                value={signatureReason}
                onChange={(e) => setSignatureReason(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSignatureModalRec(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-sm"
              >
                Affix Electronic Signature & Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
