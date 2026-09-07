import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  ShieldCheck,
  Radio,
  AlertTriangle,
  LogOut,
  Laptop,
  Smartphone,
  Server,
  Globe,
  RefreshCw,
  Key,
  Lock,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Fingerprint,
} from 'lucide-react';
import { ActiveSession } from '../types';

export const ActiveSessionsView: React.FC = () => {
  const {
    activeSessions,
    currentSession,
    securityEvents,
    terminateSession,
    terminateAllOtherSessions,
    refreshHeartbeat,
    currentUser,
  } = useAuth();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [inspectedSession, setInspectedSession] = useState<ActiveSession | null>(
    currentSession || activeSessions[0] || null
  );

  const handleManualHeartbeat = async () => {
    setIsRefreshing(true);
    await refreshHeartbeat();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const totalActive = (activeSessions || []).filter((s) => s.status === 'ACTIVE').length;
  const totalIdle = (activeSessions || []).filter((s) => s.status === 'IDLE').length;
  const totalRevoked = (activeSessions || []).filter((s) => s.status === 'REVOKED').length;

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes('ipad') || device.toLowerCase().includes('tablet')) {
      return <Smartphone className="w-4 h-4 text-cyan-400" />;
    }
    if (device.toLowerCase().includes('touch') || device.toLowerCase().includes('terminal')) {
      return <Server className="w-4 h-4 text-amber-400" />;
    }
    return <Laptop className="w-4 h-4 text-emerald-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Heartbeat Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Radio className="w-4 h-4 animate-pulse text-emerald-400" />
            OAuth2 Continuous Session Telemetry & Active Token Monitor
          </div>
          <h2 className="text-lg font-bold text-slate-100 mt-1">
            Real-Time User Session Governance & Anomaly Detection
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Strict 21 CFR Part 11.10(d) session control and OAuth2 RFC 6749 / RFC 7636 PKCE token monitoring. Remote token invalidation and concurrent session security enforcement.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleManualHeartbeat}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Ping Heartbeat</span>
          </button>

          <button
            onClick={terminateAllOtherSessions}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-rose-950/80 hover:bg-rose-900/80 border border-rose-700/60 text-xs font-bold text-rose-200 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Revoke All Other Sessions</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Active */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Live Active Sessions</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{totalActive}</div>
          <div className="text-[10px] text-slate-400">
            {totalIdle} Idle · {totalRevoked} Revoked
          </div>
        </div>

        {/* MFA / PKCE Compliance */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>MFA & PKCE Verification</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-400">100%</div>
          <div className="text-[10px] text-slate-400">RFC 7636 SHA-256 Code Challenge Active</div>
        </div>

        {/* 21 CFR Part 11 Session Inactivity Timeout */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Inactivity Timeout Standard</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">15 min</div>
          <div className="text-[10px] text-slate-400">Auto-lock & mandatory re-authentication</div>
        </div>

        {/* Cross-Origin Iframe Cookie Mode */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Preview Iframe Cookie Policy</span>
            <Lock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-sm font-bold font-mono text-purple-300">SameSite=None</div>
          <div className="text-[10px] text-slate-400">Secure: true · HttpOnly: true</div>
        </div>
      </div>

      {/* Main Sessions Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-100">
              Active Authorized Personnel Sessions across GMP Core
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Showing {activeSessions.length} registered sessions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                <th className="py-3 px-3">Session & User</th>
                <th className="py-3 px-3">Role & Permissions</th>
                <th className="py-3 px-3">Device & Environment</th>
                <th className="py-3 px-3">Network Node (IP)</th>
                <th className="py-3 px-3">Login / Last Heartbeat</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {activeSessions.map((session) => {
                const isSelected = inspectedSession?.id === session.id;
                const isCurrent = session.id === currentSession?.id;

                return (
                  <tr
                    key={session.id}
                    onClick={() => setInspectedSession(session)}
                    className={`cursor-pointer transition ${
                      isSelected ? 'bg-slate-800/80' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    {/* User */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={session.avatar}
                          alt={session.userName}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-100">{session.userName}</span>
                            {isCurrent && (
                              <span className="text-[9px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-700/60 font-mono">
                                This Client
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">{session.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-800 text-slate-200 border border-slate-700">
                        {session.role}
                      </span>
                    </td>

                    {/* Device */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(session.device)}
                        <div>
                          <div className="text-slate-200 font-medium truncate max-w-[180px]">
                            {session.device}
                          </div>
                          <div className="text-[10px] text-slate-400">{session.browser}</div>
                        </div>
                      </div>
                    </td>

                    {/* IP & Geo */}
                    <td className="py-3 px-3">
                      <div className="font-mono text-cyan-300">{session.ipAddress}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Globe className="w-2.5 h-2.5" />
                        <span className="truncate max-w-[140px]">{session.location}</span>
                      </div>
                    </td>

                    {/* Timestamps */}
                    <td className="py-3 px-3 font-mono text-[11px]">
                      <div className="text-slate-300">
                        Last: {session.lastActive.slice(11, 19)} UTC
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Login: {session.loginTime.slice(11, 16)} UTC
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          session.status === 'ACTIVE'
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50'
                            : session.status === 'IDLE'
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-800/50'
                            : 'bg-rose-950/80 text-rose-300 border border-rose-800/50'
                        }`}
                      >
                        {session.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-right">
                      {session.status !== 'REVOKED' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            terminateSession(session.id);
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-rose-950 hover:text-rose-300 border border-slate-700 hover:border-rose-700 text-[11px] font-semibold text-slate-300 transition"
                          title="Invalidate OAuth2 Token and Terminate Session"
                        >
                          Revoke
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono">Terminated</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Columns: Token Introspection & Security Anomaly Detection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Introspection Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <Key className="w-4 h-4 text-cyan-400" />
              <span>OAuth2 Token Introspection (RFC 7662)</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              RS256 JWT Validated
            </span>
          </div>

          {inspectedSession ? (
            <div className="space-y-3 text-xs font-mono">
              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Claims Header & Payload</div>
                <div className="text-slate-300">
                  <span className="text-purple-400">"iss"</span>: "https://auth.helixthera.com/oauth2/v1"
                </div>
                <div className="text-slate-300">
                  <span className="text-purple-400">"sub"</span>: "{inspectedSession.userId}" ({inspectedSession.userName})
                </div>
                <div className="text-slate-300">
                  <span className="text-purple-400">"role"</span>: "{inspectedSession.role}"
                </div>
                <div className="text-slate-300">
                  <span className="text-purple-400">"scope"</span>: "openid email profile cGMP:release:read cGMP:audit:write"
                </div>
                <div className="text-slate-300">
                  <span className="text-purple-400">"mfa_verified"</span>: true
                </div>
                <div className="text-slate-300">
                  <span className="text-purple-400">"ip_binding"</span>: "{inspectedSession.ipAddress}"
                </div>
                <div className="text-slate-300">
                  <span className="text-purple-400">"exp"</span>: "{inspectedSession.expiresAt}"
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded border border-slate-850">
                <span>PKCE Code Challenge:</span>
                <span className="text-cyan-300 truncate max-w-[200px]">E9Mel-bTXkh6Wf_W13n... (S256)</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Select a session above to inspect token claims.</p>
          )}
        </div>

        {/* Security Anomaly Feed */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <Fingerprint className="w-4 h-4 text-purple-400" />
              <span>Authentication Security Events & Audit Watch</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Real-time Stream</span>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {securityEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs space-y-1"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span
                    className={`font-bold font-mono px-1.5 py-0.2 rounded ${
                      evt.severity === 'WARNING'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800/40'
                        : evt.severity === 'CRITICAL'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800/40'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                    }`}
                  >
                    {evt.type}
                  </span>
                  <span className="text-slate-400 font-mono">{evt.timestamp.slice(11, 19)} UTC</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{evt.description}</p>
                <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between pt-1 border-t border-slate-850">
                  <span>Source: {evt.ipAddress}</span>
                  {evt.userId && <span>User: {evt.userId}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
