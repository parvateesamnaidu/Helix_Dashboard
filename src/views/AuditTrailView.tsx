import React, { useState } from 'react';
import { useWorkbench } from '../context/WorkbenchContext';
import {
  ScrollText,
  ShieldCheck,
  Search,
  Download,
  Hash,
  Clock,
  User,
  Filter,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { AuditLogEntry } from '../types';

export const AuditTrailView: React.FC = () => {
  const { auditLogs } = useWorkbench();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActionFilter, setSelectedActionFilter] = useState('ALL');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.batchId && log.batchId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesAction =
      selectedActionFilter === 'ALL' || log.action === selectedActionFilter;

    return matchesSearch && matchesAction;
  });

  const exportAuditTrailJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `helix-audit-trail-21cfrpart11-${new Date().toISOString()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <ScrollText className="w-4 h-4 text-emerald-400" />
            21 CFR Part 11 & EU GMP Annex 11 Electronic Records Audit Trail
          </div>
          <h2 className="text-lg font-bold text-slate-100 mt-1">
            Cryptographic SHA-256 Immutable Audit Log Registry
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Per PRD CTRL-05 & SEC-01: Every state mutation, override, and release decision is cryptographically recorded with operator provenance, role authority, and tamper-evident hash chaining.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportAuditTrailJson}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Regulatory Dossier (JSON)</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search action, batch, user, or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedActionFilter}
            onChange={(e) => setSelectedActionFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Actions</option>
            <option value="BATCH_RELEASE_APPROVED">Batch Release</option>
            <option value="HITL_RECOMMENDATION_APPROVED">Advisory Approved</option>
            <option value="HITL_RECOMMENDATION_REJECTED">Advisory Rejected</option>
            <option value="CHAIN_OF_IDENTITY_ADJUDICATED">COI Adjudicated</option>
            <option value="OAUTH2_LOGIN">OAuth2 Login</option>
            <option value="SESSION_TERMINATED">Session Revoked</option>
            <option value="COLD_CHAIN_EXCURSION_DETECTED">Cold-Chain Excursion</option>
            <option value="GOLDEN_SCENARIO_EXECUTED">Golden Scenario</option>
          </select>
          <span className="text-xs font-mono text-slate-400 ml-2">
            {filteredLogs.length} Records
          </span>
        </div>
      </div>

      {/* Log Feed Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px] bg-slate-950/70">
                <th className="py-3 px-3.5">Log ID & Timestamp</th>
                <th className="py-3 px-3.5">Action Event</th>
                <th className="py-3 px-3.5">Signatory Personnel</th>
                <th className="py-3 px-3.5">Target Entity / Batch</th>
                <th className="py-3 px-3.5">Audit Narrative & Reason</th>
                <th className="py-3 px-3.5">SHA-256 Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition">
                  {/* Timestamp */}
                  <td className="py-3 px-3.5 font-mono text-[11px]">
                    <div className="text-slate-200">{log.timestamp.slice(11, 19)} UTC</div>
                    <div className="text-[10px] text-slate-500">{log.timestamp.slice(0, 10)}</div>
                    <div className="text-[9px] text-slate-600 truncate max-w-[100px]">{log.id}</div>
                  </td>

                  {/* Action */}
                  <td className="py-3 px-3.5">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                      {log.action}
                    </span>
                  </td>

                  {/* User */}
                  <td className="py-3 px-3.5">
                    <div className="font-semibold text-slate-200">{log.userName}</div>
                    <div className="text-[10px] text-purple-300 font-mono">{log.role}</div>
                  </td>

                  {/* Target */}
                  <td className="py-3 px-3.5 font-mono text-[11px] text-cyan-300">
                    {log.batchId || 'SYSTEM'}
                  </td>

                  {/* Details */}
                  <td className="py-3 px-3.5 text-slate-300 text-[11px] max-w-sm leading-relaxed">
                    <div>{log.details}</div>
                    {log.digitalSignatureReason && (
                      <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                        Sig Reason: "{log.digitalSignatureReason}"
                      </div>
                    )}
                  </td>

                  {/* Hash */}
                  <td className="py-3 px-3.5 font-mono text-[10px] text-slate-500">
                    <div className="flex items-center gap-1 truncate max-w-[120px]" title={log.hash}>
                      <Hash className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <span className="text-emerald-400">{log.hash.slice(0, 12)}...</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
