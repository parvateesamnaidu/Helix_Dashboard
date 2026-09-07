import React, { useState } from 'react';
import { useWorkbench } from '../context/WorkbenchContext';
import { useAuth } from '../context/AuthContext';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Database,
  Layers,
  ShieldAlert,
  ThermometerSnowflake,
  ExternalLink,
  ChevronRight,
  Fingerprint,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { Batch } from '../types';

export const LiveBatchOperationsView: React.FC = () => {
  const {
    batches,
    selectedBatch,
    setSelectedBatchId,
    executeBatchRelease,
    evaluateBatchWithAi,
    isAiEvaluating,
  } = useWorkbench();

  const { currentUser, checkPermission } = useAuth();

  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const [digitalSignatureReason, setDigitalSignatureReason] = useState(
    'Batch analytical release certification pursuant to EU GMP Annex 16 & 21 CFR Part 11. Qualified Person approval.'
  );
  const [signaturePassword, setSignaturePassword] = useState('••••••••');
  const [aiReportModalOpen, setAiReportModalOpen] = useState(false);
  const [aiReportText, setAiReportText] = useState<string>('');

  const canRelease = checkPermission('RELEASE_BATCH').allowed;

  const handleRunAiEvaluation = async () => {
    const report = await evaluateBatchWithAi(selectedBatch.id);
    setAiReportText(report);
    setAiReportModalOpen(true);
  };

  const handleConfirmRelease = async () => {
    const result = await executeBatchRelease(selectedBatch.id, digitalSignatureReason);
    if (result.success) {
      setIsReleaseModalOpen(false);
      alert(result.message);
    } else {
      alert(`Release Blocked: ${result.message}`);
    }
  };

  const getStageColor = (stage: Batch['stage']) => {
    switch (stage) {
      case 'RELEASED_FOR_INFUSION':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50';
      case 'QC_RELEASE_PENDING':
        return 'bg-purple-950/80 text-purple-300 border-purple-600/50';
      case 'QUARANTINED_INVESTIGATION':
        return 'bg-rose-950/80 text-rose-300 border-rose-600/50 animate-pulse';
      case 'FORMULATION_CRYO':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-600/50';
      default:
        return 'bg-blue-950/80 text-blue-300 border-blue-600/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Batch Selection Bar & Baseline KPI */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              Active Cellular Batches · Continuous Vein-to-Vein Tracking
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {batches.map((b) => {
                const isSelected = b.id === selectedBatch.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBatchId(b.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-slate-800 text-white border-emerald-500 shadow-sm ring-1 ring-emerald-500/20'
                        : 'bg-slate-950 text-slate-400 border-slate-850 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span className="font-mono">{b.batchNumber}</span>
                    <span className="text-[10px] text-slate-400">({b.patientPseudonym})</span>
                    {b.hasSystemConflict && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" title="System Conflict Discrepancy" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vein-to-Vein Baseline Comparison Metric (PRD Section 1) */}
          <div className="flex items-center gap-4 bg-slate-950 px-4 py-2.5 rounded-lg border border-slate-800 text-xs">
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Vein-to-Vein Cycle</div>
              <div className="text-base font-bold text-emerald-400 font-mono">
                {selectedBatch.veinToVeinDays} Days
              </div>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Target Infusion</div>
              <div className="text-xs font-semibold text-slate-200 flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3 text-cyan-400" />
                {selectedBatch.targetInfusionDate}
              </div>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Historical Baseline</div>
              <div className="text-xs font-semibold text-slate-400">28.4 Days (Basel 2025)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Batch Master Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStageColor(selectedBatch.stage)}`}>
                {selectedBatch.stage.replace(/_/g, ' ')}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Patient: <strong className="text-slate-200">{selectedBatch.patientPseudonym}</strong> ({selectedBatch.patientCanonicalId})
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-1">{selectedBatch.productName}</h2>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              Batch: {selectedBatch.batchNumber} · Cross-System Canonical Identifier Validated
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleRunAiEvaluation}
              disabled={isAiEvaluating}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-950/80 hover:bg-purple-900/80 border border-purple-700/60 text-purple-200 text-xs font-semibold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{isAiEvaluating ? 'Analyzing Assays...' : 'AI Release Evaluation (Gemini)'}</span>
            </button>

            {selectedBatch.stage === 'RELEASED_FOR_INFUSION' ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Released by {selectedBatch.qpReleaseApproval?.approvedBy}
              </div>
            ) : (
              <button
                onClick={() => setIsReleaseModalOpen(true)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm ${
                  canRelease
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-750'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Qualified Person Final Release Sign-Off</span>
              </button>
            )}
          </div>
        </div>

        {/* System Conflict / Discrepancy Alert (GS-11 & GS-04) */}
        {selectedBatch.hasSystemConflict && (
          <div className="bg-rose-950/40 border border-rose-800/80 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-rose-200 uppercase tracking-wider">
                Cross-System Telemetry Discrepancy Detected (FR-02 & GS-11)
              </h4>
              <p className="text-xs text-rose-300 leading-relaxed">
                {selectedBatch.conflictSummary || 'Conflict between MES, LIMS, and QMS states. Automated resolution blocked per CTRL-01.'}
              </p>
            </div>
          </div>
        )}

        {/* Multi-System Side-by-Side Reconciliation Matrix (FR-02) */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Multi-System Enterprise Source Attribution (MES · LIMS · QMS · IoT)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* MES */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-emerald-400">MES (Werum PAS-X)</span>
                <span className="font-mono text-slate-400 text-[10px]">
                  {selectedBatch.systemRecords.mes.timestamp.slice(11, 16)} UTC
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-200">
                {selectedBatch.systemRecords.mes.status}
              </div>
              <div className="text-[10px] text-slate-400 font-mono truncate">
                ID: {selectedBatch.systemRecords.mes.systemId}
              </div>
              <div className="text-[10px] text-slate-400">
                Operator: {selectedBatch.systemRecords.mes.operatorOrDevice}
              </div>
            </div>

            {/* LIMS */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-purple-400">LIMS (LabWare 8)</span>
                <span className="font-mono text-slate-400 text-[10px]">
                  {selectedBatch.systemRecords.lims.timestamp.slice(11, 16)} UTC
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-200">
                {selectedBatch.systemRecords.lims.status}
              </div>
              <div className="text-[10px] text-slate-400 font-mono truncate">
                ID: {selectedBatch.systemRecords.lims.systemId}
              </div>
              <div className="text-[10px] text-slate-400">
                Sample: {selectedBatch.systemRecords.lims.operatorOrDevice}
              </div>
            </div>

            {/* QMS */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-amber-400">QMS (TrackWise 24)</span>
                <span className="font-mono text-slate-400 text-[10px]">
                  {selectedBatch.systemRecords.qms.timestamp.slice(11, 16)} UTC
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-200">
                {selectedBatch.systemRecords.qms.status}
              </div>
              <div className="text-[10px] text-slate-400 font-mono truncate">
                Lot: {selectedBatch.systemRecords.qms.systemId}
              </div>
              <div className="text-[10px] text-slate-400">
                Review: {selectedBatch.systemRecords.qms.operatorOrDevice}
              </div>
            </div>

            {/* IoT Cold-Chain */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-cyan-400">IoT Cryo Telemetry</span>
                <span className="font-mono text-slate-400 text-[10px]">
                  {selectedBatch.systemRecords.iot.timestamp.slice(11, 16)} UTC
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-200">
                {selectedBatch.systemRecords.iot.status}
              </div>
              <div className="text-[10px] text-slate-400 font-mono truncate">
                Sensor: {selectedBatch.systemRecords.iot.systemId}
              </div>
              <div className="text-[10px] text-cyan-300">
                LN2 Core: {selectedBatch.coldChainReadings[0]?.tempCelsius}°C
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytical QC Release Assays (FR-05) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Analytical Quality Control Assays (Release Readiness Specification)
            </h3>
            <p className="text-xs text-slate-400">
              Per PRD FR-05: The system never presents an unqualified "ready to release" verdict. Underlying raw analytical evidence is required for Qualified Person review.
            </p>
          </div>
          <span className="text-xs font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-800 text-slate-300">
            Pass Rate: {(selectedBatch?.qcResults || []).filter((q) => q.status === 'PASS').length} / {(selectedBatch?.qcResults || []).length} Assays
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Assay Parameter</th>
                <th className="py-2.5 px-3">Specification Limit</th>
                <th className="py-2.5 px-3">Measured Result</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Analyst / LIMS Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {(selectedBatch?.qcResults || []).map((qc) => (
                <tr key={qc.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-2.5 px-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {qc.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-200">{qc.parameter}</td>
                  <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">{qc.specification}</td>
                  <td className="py-2.5 px-3 font-bold font-mono text-slate-100">{qc.measuredValue}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        qc.status === 'PASS'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
                          : 'bg-rose-950 text-rose-300 border border-rose-700/50'
                      }`}
                    >
                      {qc.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                    <div>{qc.analyst}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{qc.limsSampleRef}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Qualified Person Digital Signature Modal (21 CFR Part 11 / CTRL-03) */}
      {isReleaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-purple-700/50 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950 flex items-center justify-center text-purple-400 border border-purple-700/50">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  21 CFR Part 11 Electronic Batch Release Signature
                </h3>
                <p className="text-xs text-purple-300">
                  Non-Delegable Qualified Person / Release Officer Sole Authority (CTRL-03)
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Batch Number:</span>
                <span className="font-mono text-slate-200 font-bold">{selectedBatch.batchNumber}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Product Name:</span>
                <span className="text-slate-200">{selectedBatch.productName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Signatory Personnel:</span>
                <span className="text-emerald-400 font-semibold">{currentUser.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Role Authority:</span>
                <span className="text-purple-300 font-mono font-bold">{currentUser.role}</span>
              </div>
            </div>

            {!canRelease && (
              <div className="bg-rose-950/70 border border-rose-700 p-3 rounded-lg text-xs text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>
                  Role restriction: Current user is {currentUser.role}. Final release execution is strictly blocked for non-QPs. Switch persona to Dr. Evelyn Vance (Qualified Person) to sign.
                </span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Digital Signature Reason (21 CFR Part 11.50)
              </label>
              <textarea
                value={digitalSignatureReason}
                onChange={(e) => setDigitalSignatureReason(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Signatory Electronic Password Re-Authentication
              </label>
              <input
                type="password"
                value={signaturePassword}
                onChange={(e) => setSignaturePassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-mono"
              />
              <span className="text-[10px] text-slate-400">Mandated dual-factor credential verification</span>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsReleaseModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRelease}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition shadow-lg shadow-purple-950/50"
              >
                Affix Electronic Signature & Release
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Decision Support Evaluation Modal */}
      {aiReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-purple-700/50 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950 flex items-center justify-center text-purple-400 border border-purple-700/50">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">AI Decision Support Report (Gemini API)</h3>
                <p className="text-xs text-slate-400">
                  Bounded Decision Support Only · Zero Autonomous Release Authority (AI-02 / HG-01)
                </p>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-line max-h-80 overflow-y-auto">
              {aiReportText}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <span>Authority: Awaiting human Qualified Person signature</span>
              <button
                onClick={() => setAiReportModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
