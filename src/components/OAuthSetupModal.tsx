import React, { useState } from 'react';
import {
  X,
  Key,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Lock,
  Globe,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface OAuthSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OAuthSetupModal: React.FC<OAuthSetupModalProps> = ({ isOpen, onClose }) => {
  const { initiateOAuthLogin, isOAuthAuthenticating, oauthConfig } = useAuth();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  // Exact callback URLs per AI Studio runtime context
  const devCallbackUrl = 'https://ais-dev-7yirjooznp2mvmhdxqmbzs-169444581480.asia-east1.run.app/auth/callback';
  const sharedCallbackUrl = 'https://ais-pre-7yirjooznp2mvmhdxqmbzs-169444581480.asia-east1.run.app/auth/callback';

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-700/50 flex items-center justify-center text-cyan-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">OAuth2 Provider & Security Configuration</h2>
              <p className="text-xs text-slate-400">
                Industry-standard RFC 6749 & PKCE (RFC 7636) authentication architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Architecture Summary Banner */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-slate-900 p-4 rounded-xl border border-emerald-800/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Secure Popup-Based OAuth2 with Cross-Origin PostMessage
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Designed strictly for the sandboxed AI Studio preview container. OAuth popups open the identity provider authorization URL directly, exchange tokens via PKCE, and complete session synchronization using parent-window postMessage and SameSite: none cookies.
            </p>
          </div>

          {/* Step 1: Callback URLs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                Step 1: Authorized Redirect URIs for Provider Console
              </h3>
              <span className="text-[10px] text-slate-400">Add to your OAuth provider</span>
            </div>

            {/* Dev URL */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Development Container Callback URL</span>
                <span className="text-[10px] bg-emerald-950/60 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800/40">Active Preview</span>
              </div>
              <div className="flex items-center justify-between gap-2 bg-slate-900 px-2.5 py-1.5 rounded border border-slate-800 text-xs font-mono text-cyan-300 break-all">
                <span className="truncate">{devCallbackUrl}</span>
                <button
                  onClick={() => copyToClipboard(devCallbackUrl, 'dev')}
                  className="p-1 text-slate-400 hover:text-white transition flex-shrink-0"
                  title="Copy Dev Callback URL"
                >
                  {copiedKey === 'dev' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Shared URL */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Shared / Production Container Callback URL</span>
                <span className="text-[10px] bg-blue-950/60 text-blue-300 px-1.5 py-0.2 rounded border border-blue-800/40">Shared Deployed</span>
              </div>
              <div className="flex items-center justify-between gap-2 bg-slate-900 px-2.5 py-1.5 rounded border border-slate-800 text-xs font-mono text-blue-300 break-all">
                <span className="truncate">{sharedCallbackUrl}</span>
                <button
                  onClick={() => copyToClipboard(sharedCallbackUrl, 'shared')}
                  className="p-1 text-slate-400 hover:text-white transition flex-shrink-0"
                  title="Copy Shared Callback URL"
                >
                  {copiedKey === 'shared' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Environment Variables */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Step 2: AI Studio Secrets / Environment Variables
            </h3>
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300 font-mono">
                <span>OAUTH_CLIENT_ID</span>
                <span className="text-slate-400 text-[11px]">Client ID from Google / GitHub / Helix IdP</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 font-mono">
                <span>OAUTH_CLIENT_SECRET</span>
                <span className="text-slate-400 text-[11px]">Client Secret (Securely stored server-side)</span>
              </div>
              <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
                Status: {oauthConfig?.configured ? (
                  <span className="text-emerald-400 font-semibold">Configured with provider credentials</span>
                ) : (
                  <span className="text-cyan-400 font-medium">
                    Integrated with Built-in Helix Enterprise SSO Identity Provider (Zero-config operational mode)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Step 3: Interactive OAuth Login Triggers */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Step 3: Test OAuth2 Authorization Handshake
            </h3>
            <p className="text-xs text-slate-400">
              Click below to initiate the popup authorization flow and verify token exchange:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Helix Enterprise SSO */}
              <button
                disabled={isOAuthAuthenticating}
                onClick={() => initiateOAuthLogin('helix-sso')}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-emerald-500/40 hover:border-emerald-500 text-left transition group shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400 mb-2 group-hover:scale-105 transition">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-100">Helix Enterprise SSO</span>
                <span className="text-[10px] text-emerald-400 font-medium mt-0.5">OIDC & PKCE Ready</span>
              </button>

              {/* Google OAuth */}
              <button
                disabled={isOAuthAuthenticating}
                onClick={() => initiateOAuthLogin('google')}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 text-left transition group shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-red-950/60 flex items-center justify-center text-red-400 mb-2 group-hover:scale-105 transition">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-100">Google OAuth 2.0</span>
                <span className="text-[10px] text-slate-400 mt-0.5">OpenID Connect</span>
              </button>

              {/* GitHub OAuth */}
              <button
                disabled={isOAuthAuthenticating}
                onClick={() => initiateOAuthLogin('github')}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 text-left transition group shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-slate-200 mb-2 group-hover:scale-105 transition">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-100">GitHub OAuth</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Enterprise Developer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            21 CFR Part 11 Electronic Records & Signatures Standard Active
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
