import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWorkbench } from '../context/WorkbenchContext';
import { INITIAL_USERS } from '../data/seedData';
import {
  ShieldCheck,
  Key,
  Users,
  Clock,
  Wifi,
  WifiOff,
  Cpu,
  LogOut,
  ChevronDown,
  Info,
  CheckCircle2,
  AlertTriangle,
  Film,
} from 'lucide-react';

interface HeaderProps {
  onOpenOAuthModal: () => void;
  onOpenVideo?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenOAuthModal, onOpenVideo }) => {
  const {
    currentUser,
    currentSession,
    switchRole,
    sessionTimeRemainingSeconds,
    logout,
  } = useAuth();

  const {
    isAiServiceOnline,
    isOfflineMode,
    toggleAiService,
    toggleOfflineMode,
  } = useWorkbench();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // Format idle countdown mm:ss
  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'QUALIFIED_PERSON':
        return 'bg-purple-950/80 text-purple-300 border-purple-700/60';
      case 'CLINICAL_COORDINATOR':
        return 'bg-blue-950/80 text-blue-300 border-blue-700/60';
      case 'MANUFACTURING_TECH':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60';
      case 'CRYO_LOGISTICS_MGR':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60';
      case 'RISK_COMPLIANCE':
        return 'bg-amber-950/80 text-amber-300 border-amber-700/60';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand & Organization */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50 border border-emerald-400/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                Helix Regenerative Therapeutics
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                cGMP Cell & Gene Core
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2 tracking-tight">
              Patient-to-Batch Orchestration Workbench
            </h1>
          </div>
        </div>

        {/* Status Indicators & Role Switcher */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* AI Decision Support Mode */}
          <button
            onClick={toggleAiService}
            title={isAiServiceOnline ? 'AI Decision Support Online' : 'AI Offline (Manual cGMP Mode GS-10)'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              isAiServiceOnline
                ? 'bg-slate-900/90 text-emerald-300 border-emerald-800/50 hover:bg-slate-800'
                : 'bg-amber-950/60 text-amber-300 border-amber-800/60 hover:bg-amber-900/60'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Support:</span>
            <span>{isAiServiceOnline ? 'Active' : 'Manual Mode'}</span>
          </button>

          {/* Network Continuity State (GS-14) */}
          <button
            onClick={toggleOfflineMode}
            title={isOfflineMode ? 'Local Buffer Mode (GS-14)' : 'Central DB Synchronized'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              !isOfflineMode
                ? 'bg-slate-900/90 text-slate-300 border-slate-700 hover:bg-slate-800'
                : 'bg-rose-950/60 text-rose-300 border-rose-800/60 animate-pulse'
            }`}
          >
            {isOfflineMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isOfflineMode ? 'Buffer Offline' : 'Connected'}</span>
          </button>

          {/* 21 CFR Part 11 Session Idle Timer */}
          <div
            title="21 CFR Part 11 Compliant Inactivity Timeout Countdown"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-mono"
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline text-slate-400">Timeout:</span>
            <span className="text-amber-300 font-semibold">{formatCountdown(sessionTimeRemainingSeconds)}</span>
          </div>

          {/* Explainer Video Shortcut */}
          {onOpenVideo && (
            <button
              onClick={onOpenVideo}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-700/60 text-purple-200 text-xs font-medium transition shadow-sm"
              title="Watch Animated Explainer Video"
            >
              <Film className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Explainer</span>
              <span>Video</span>
            </button>
          )}

          {/* OAuth Setup & Configuration */}
          <button
            onClick={onOpenOAuthModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition shadow-sm"
          >
            <Key className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">OAuth2</span>
            <span>Config</span>
          </button>

          {/* User Persona & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition shadow-sm ${getRoleBadgeColor(
                currentUser.role
              )}`}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-5 h-5 rounded-full object-cover border border-white/20"
              />
              <div className="text-left hidden md:block">
                <div className="font-semibold leading-tight text-white">{currentUser.name.split(',')[0]}</div>
                <div className="text-[10px] opacity-80">{currentUser.role.replace(/_/g, ' ')}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>

            {/* Dropdown Menu */}
            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 text-slate-200">
                <div className="px-3 py-2 border-b border-slate-800">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Role Authorization Switcher (PRD Section 2)
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Select an authorized personnel persona to test role-gated decision rules and 21 CFR Part 11 sign-offs.
                  </p>
                </div>

                <div className="max-h-72 overflow-y-auto py-1">
                  {INITIAL_USERS.map((user) => {
                    const isSelected = user.id === currentUser.id;
                    return (
                      <button
                        key={user.id}
                        onClick={() => {
                          switchRole(user);
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-start gap-2.5 transition ${
                          isSelected ? 'bg-slate-800/90 text-white' : 'hover:bg-slate-800/50 text-slate-300'
                        }`}
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700 mt-0.5 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold truncate text-slate-100">{user.name}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                          </div>
                          <div className="text-[11px] font-medium text-emerald-400">
                            {user.role.replace(/_/g, ' ')}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">{user.department}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="px-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Session: {currentSession?.id || 'Active'}
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      setIsRoleDropdownOpen(false);
                    }}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium"
                  >
                    <LogOut className="w-3 h-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
