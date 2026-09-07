import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { WorkbenchProvider } from './context/WorkbenchContext';
import { Header } from './components/Header';
import { Navigation, TabId } from './components/Navigation';
import { OAuthSetupModal } from './components/OAuthSetupModal';
import { LiveBatchOperationsView } from './views/LiveBatchOperationsView';
import { HitlApprovalQueueView } from './views/HitlApprovalQueueView';
import { ActiveSessionsView } from './views/ActiveSessionsView';
import { ColdChainView } from './views/ColdChainView';
import { ChainOfIdentityView } from './views/ChainOfIdentityView';
import { GoldenScenarioLabView } from './views/GoldenScenarioLabView';
import { AuditTrailView } from './views/AuditTrailView';

function WorkbenchMain() {
  const [activeTab, setActiveTab] = useState<TabId>('batches');
  const [isOAuthModalOpen, setIsOAuthModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Application Header with Role Switcher & OAuth status */}
      <Header onOpenOAuthModal={() => setIsOAuthModalOpen(true)} />

      {/* Primary Section Navigation Tabs */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6">
        {activeTab === 'batches' && <LiveBatchOperationsView />}
        {activeTab === 'hitl' && <HitlApprovalQueueView />}
        {activeTab === 'sessions' && <ActiveSessionsView />}
        {activeTab === 'coldchain' && <ColdChainView />}
        {activeTab === 'coi' && <ChainOfIdentityView />}
        {activeTab === 'scenarios' && <GoldenScenarioLabView />}
        {activeTab === 'audit' && <AuditTrailView />}
      </main>

      {/* Compliance & Regulatory Architecture Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-6 py-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Helix Orchestration Workbench · Cell & Gene Therapy (CGT) Operating System</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>21 CFR Part 11</span>
            <span>EU GMP Annex 16</span>
            <span>OAuth 2.0 (RFC 6749)</span>
            <span>PKCE (RFC 7636)</span>
          </div>
        </div>
      </footer>

      {/* OAuth2 Provider Credentials & Setup Modal */}
      <OAuthSetupModal
        isOpen={isOAuthModalOpen}
        onClose={() => setIsOAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WorkbenchProvider>
        <WorkbenchMain />
      </WorkbenchProvider>
    </AuthProvider>
  );
}
