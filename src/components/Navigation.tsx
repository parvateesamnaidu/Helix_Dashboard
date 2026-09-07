import React from 'react';
import {
  Activity,
  CheckSquare,
  Users,
  ThermometerSnowflake,
  Fingerprint,
  FlaskConical,
  ScrollText,
  Film,
} from 'lucide-react';
import { useWorkbench } from '../context/WorkbenchContext';
import { useAuth } from '../context/AuthContext';

export type TabId = 'video' | 'batches' | 'hitl' | 'sessions' | 'coldchain' | 'coi' | 'scenarios' | 'audit';

interface NavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { recommendations, batches } = useWorkbench();
  const { activeSessions } = useAuth();

  const pendingApprovalsCount = recommendations.filter((r) => r.status === 'PENDING_REVIEW').length;
  const activeBatchesCount = batches.length;
  const activeSessionsCount = activeSessions.filter((s) => s.status === 'ACTIVE').length;
  const coiAlertsCount = batches.filter((b) => b.coiStatus !== 'UNBROKEN').length;

  const tabs: { id: TabId; label: string; icon: React.FC<{ className?: string }>; badge?: string | number; badgeColor?: string }[] = [
    {
      id: 'video',
      label: 'Explainer Video',
      icon: Film,
      badge: '5 MIN',
      badgeColor: 'bg-purple-900/80 text-purple-200 border border-purple-600/50',
    },
    {
      id: 'batches',
      label: 'Batch Operations',
      icon: Activity,
      badge: activeBatchesCount,
      badgeColor: 'bg-slate-800 text-slate-300',
    },
    {
      id: 'hitl',
      label: 'HITL Approval Queue',
      icon: CheckSquare,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
      badgeColor: 'bg-purple-900/80 text-purple-200 border border-purple-600/40',
    },
    {
      id: 'sessions',
      label: 'Active Sessions & OAuth2',
      icon: Users,
      badge: activeSessionsCount,
      badgeColor: 'bg-emerald-900/80 text-emerald-200 border border-emerald-600/40',
    },
    {
      id: 'coldchain',
      label: 'Cold-Chain IoT',
      icon: ThermometerSnowflake,
    },
    {
      id: 'coi',
      label: 'Chain-of-Identity',
      icon: Fingerprint,
      badge: coiAlertsCount > 0 ? coiAlertsCount : undefined,
      badgeColor: 'bg-amber-900/80 text-amber-200 border border-amber-600/40',
    },
    {
      id: 'scenarios',
      label: 'Golden Scenario Lab',
      icon: FlaskConical,
      badge: 15,
      badgeColor: 'bg-blue-900/80 text-blue-200 border border-blue-600/40',
    },
    {
      id: 'audit',
      label: '21 CFR Part 11 Audit',
      icon: ScrollText,
    },
  ];

  return (
    <nav className="border-b border-slate-800 bg-slate-900/60 px-4 lg:px-6 py-2 overflow-x-auto">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all select-none ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${tab.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
