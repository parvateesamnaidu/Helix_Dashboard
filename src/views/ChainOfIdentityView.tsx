import React, { useState } from 'react';
import { useWorkbench } from '../context/WorkbenchContext';
import { useAuth } from '../context/AuthContext';
import {
  Fingerprint,
  ShieldCheck,
  AlertTriangle,
  Layers,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lock,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const ChainOfIdentityView: React.FC = () => {
  const { batches, selectedBatch, setSelectedBatchId, resolveCoiDiscrepancy } = useWorkbench();
  const { currentUser, checkPermission } = useAuth();

  const [resolutionRationale, setResolutionRationale] = useState(
    'Dual-witness barcode re-scan confirmed physical apheresis bag DIN 9104-A matched MES batch record. Suffix -B determined clerical LIMS intake typo.'
  );
  const [isResolving, setIsResolving] = useState(false);

  const handleResolve = async () => {
    const ok = await resolveCoiDiscrepancy(selectedBatch.id, resolutionRationale);
    if (ok) {
      setIsResolving(false);
      alert('Chain-of-Identity discrepancy successfully adjudicated by Qualified Person.');
    }
  };

  const isQp = currentUser.role === 'QUALIFIED_PERSON';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Fingerprint className="w-4 h-4 text-amber-400" />
            Chain-of-Identity (COI) & De-Identification Sentinel (CTRL-01 & CTRL-02)
          </div>
          <h2 className="text-lg font-bold text-slate-100 mt-1">
            Patient-to-Batch Cross-System Deterministic Key Resolution
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Per PRD FR-03 & GS-04: Resolves canonical identifiers across EHR, MES, LIMS, and QMS. Upon any ambiguity, the system <strong>blocks progression and escalates</strong> rather than silently merging.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
            Status: {selectedBatch.coiStatus === 'UNBROKEN' ? (
              <span className="text-emerald-400 font-bold">Unbroken Chain (Verified)</span>
            ) : (
              <span className="text-rose-400 font-bold animate-pulse">Ambiguity Detected</span>
            )}
          </span>
        </div>
      </div>

      {/* Ambiguity Alert Card (GS-04 Case) */}
      {selectedBatch.coiStatus !== 'UNBROKEN' && (
        <div className="bg-rose-950/40 border border-rose-700/80 rounded-xl p-5 space-y-3 shadow-lg">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h3 className="text-sm font-bold text-rose-200 uppercase tracking-wider">
              CRITICAL BLOCK: Chain-of-Identity Ambiguity Escalation (GS-04)
            </h3>
          </div>

          <p className="text-xs text-rose-300 leading-relaxed bg-black/40 p-3 rounded-lg border border-rose-800 font-mono">
            {selectedBatch.coiDiscrepancyNotes ||
              'Cross-system identifier mismatch between MES and LIMS. Automated merge prohibited by SOP-QA-012.'}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-rose-900/60 flex-wrap gap-2">
            <div className="text-xs text-rose-300">
              Authority Required: <strong>Qualified Person Sole Adjudication</strong>
            </div>

            {isQp ? (
              <button
                onClick={() => setIsResolving(true)}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-sm"
              >
                Adjudicate Discrepancy (QP Dual Confirmation)
              </button>
            ) : (
              <span className="text-xs text-rose-400 italic">
                Only the Qualified Person can adjudicate this ambiguity. Switch persona to Dr. Evelyn Vance.
              </span>
            )}
          </div>
        </div>
      )}

      {/* Cross-System Canonical Identifier Resolution Matrix (DATA-01) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Cross-System Identifier Mapping for Batch {selectedBatch.batchNumber}
            </h3>
            <p className="text-xs text-slate-400">
              Canonical Entity: <strong className="text-slate-200">{selectedBatch.patientCanonicalId}</strong> · Pseudonym:{' '}
              <strong className="text-emerald-400">{selectedBatch.patientPseudonym}</strong>
            </p>
          </div>
          <span className="text-xs bg-slate-950 px-2.5 py-1 rounded border border-slate-850 font-mono text-slate-400">
            Strategy: Deterministic Key
          </span>
        </div>

        {/* Visual Map */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* EHR */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">Hospital EHR</div>
            <div className="text-xs font-bold text-slate-200">Patient Identifier</div>
            <div className="text-xs font-mono text-cyan-400 break-all">
              {selectedBatch.crossSystemIdentifiers.ehrId}
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3 h-3" /> De-Identified
            </div>
          </div>

          {/* MES */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">PAS-X MES</div>
            <div className="text-xs font-bold text-slate-200">Production Lot</div>
            <div className="text-xs font-mono text-emerald-400 break-all">
              {selectedBatch.crossSystemIdentifiers.mesId}
            </div>
            <div className="text-[10px] text-slate-400 pt-1">Cleanroom Batch Run</div>
          </div>

          {/* LIMS */}
          <div
            className={`border rounded-xl p-3.5 space-y-1 ${
              selectedBatch.coiStatus === 'AMBIGUOUS'
                ? 'bg-rose-950/40 border-rose-700 text-rose-200'
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div className="text-[10px] font-bold uppercase text-slate-400">LabWare LIMS</div>
            <div className="text-xs font-bold text-slate-200">QC Sample Ref</div>
            <div className="text-xs font-mono text-purple-400 break-all">
              {selectedBatch.crossSystemIdentifiers.limsId}
            </div>
            <div className="text-[10px] text-slate-400 pt-1">Analytical Aliquot</div>
          </div>

          {/* QMS */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">TrackWise QMS</div>
            <div className="text-xs font-bold text-slate-200">Quality Lot Dossier</div>
            <div className="text-xs font-mono text-amber-400 break-all">
              {selectedBatch.crossSystemIdentifiers.qmsLotId}
            </div>
            <div className="text-[10px] text-slate-400 pt-1">Deviation Record</div>
          </div>

          {/* IoT */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">IoT Cold-Chain</div>
            <div className="text-xs font-bold text-slate-200">Cryo-Sensor Unit</div>
            <div className="text-xs font-mono text-cyan-400 break-all">
              {selectedBatch.crossSystemIdentifiers.iotCryoId}
            </div>
            <div className="text-[10px] text-slate-400 pt-1">Vapor Shipper Telemetry</div>
          </div>
        </div>
      </div>

      {/* De-Identification & Privacy Protection Pipeline (CTRL-02) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          De-Identification Pipeline Verification (CTRL-02)
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          In strict compliance with Case Pack non-negotiable constraints, zero Protected Health Information (PHI) or real clinical identifiers are exposed to AI contexts or external networks. All patients are tokenized via cryptographic pseudonymization hashes prior to presentation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850">
            <div className="text-[10px] text-slate-400">Pseudonym Token:</div>
            <div className="font-mono text-emerald-400 font-bold">{selectedBatch.patientPseudonym}</div>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850">
            <div className="text-[10px] text-slate-400">Canonical Enterprise Key:</div>
            <div className="font-mono text-slate-200">{selectedBatch.patientCanonicalId}</div>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850">
            <div className="text-[10px] text-slate-400">HIPAA Safe Harbor / GDPR:</div>
            <div className="font-mono text-cyan-400 font-bold">100% De-Identified</div>
          </div>
        </div>
      </div>

      {/* Qualified Person Adjudication Modal */}
      {isResolving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-rose-700/80 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-100">
              Qualified Person Chain-of-Identity Adjudication (CTRL-01)
            </h3>
            <p className="text-xs text-slate-400">
              Provide formal investigation rationale and electronic signature to reconcile this identity ambiguity:
            </p>

            <textarea
              value={resolutionRationale}
              onChange={(e) => setResolutionRationale(e.target.value)}
              rows={4}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500 font-mono"
            />

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsResolving(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleResolve}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-sm"
              >
                Commit Adjudication & Unlock Batch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
