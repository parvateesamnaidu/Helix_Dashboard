# 🧬 Helix Orchestration Workbench

> **Mission-Critical Cell & Gene Therapy (CGT) Vein-to-Vein Orchestration Platform**  
> *Compliant with FDA 21 CFR Part 11 · EU GMP Annex 16 · GAMP 5 · OAuth 2.0 RFC 6749 / RFC 7636 PKCE*

---

## 🎬 Must Watch: Interactive Explainer Video & Architecture Walkthrough

> 💡 **Before exploring the codebase or live workbench, please watch our built-in 5-minute animated explainer video!**  
> It provides an immersive audio-visual walkthrough of the autologous clinical business scenario, the multi-system fragmentation crisis, the technical architecture, and the complete 7-step live application workflow.

### How to Access the Explainer Video:
1. Launch the application in your browser (or open the live deployment URL).
2. Click the **Explainer Video** tab (the last tab on the menu bar, badged with `5 MIN`), or click the **Explainer Video** button in the top header from any view.
3. Use the interactive video player equipped with:
   - **Synchronous Web Speech AI narration** with speed controls (`0.75x` – `2.0x`), volume, and voice selection.
   - **Karaoke closed captions (CC)** synchronized with on-screen visual animations.
   - **Scrubbable chapter timeline** across all 6 documentary scenes.
   - **Interactive Application Tour Mode**: Click into any of the 7 highlighted workbench steps to test live controls.
   - **Technical Whitepaper & Voiceover Script Modal**: Inspect and copy the complete script, visual cues, and regulatory citations.

---

### Explainer Video Structure (5:00 Total Runtime)

| Scene | Duration | Title | Key Concepts Covered |
|---|---|---|---|
| **Scene 1** | `00:00 – 00:50` | **The Business Scenario: Vein-to-Vein Stakes** | Autologous CAR-T/TCR-T therapies, the 1-batch = 1-patient paradigm, 6-stage clinical lifecycle (Apheresis $\rightarrow$ LN2 Cryo Transport $\rightarrow$ ISO-5 Cleanroom Gene Modification $\rightarrow$ Analytical Testing $\rightarrow$ Hospital Re-infusion), and the 28.4-day historical turnaround benchmark. |
| **Scene 2** | `00:50 – 01:40` | **The Industry Crisis: System Silos & Disconnects** | Unsynchronized enterprise silos: Hospital EHR (Epic/Cerner), Cleanroom MES (Werum PAS-X), Analytical LIMS (LabWare), and QMS (TrackWise). Dangers of barcode decoupling, cryogenic thermal stress excursions, superseded SOPs, and 72-hour paper bottlenecks. |
| **Scene 3** | `01:40 – 02:30` | **The Need: Helix Orchestration Workbench** | Unified reconciliation mesh linking MRN, Subject ID, MES Batch ID, and Cryo RFID; cumulative degree-hour thermal stress engine; and **Hard Gate HG-01 (Zero Autonomous Release Authority)** preserving Qualified Person (QP) legal release accountability. |
| **Scene 4** | `02:30 – 03:20` | **Implementation Approach & 4-Tier Architecture** | Tier 1 Presentation (React 19, Motion, 15-min 21 CFR Part 11 idle timer); Tier 2 Identity (RFC 6749 OAuth 2.0, RFC 7636 PKCE S256 verifiers, RFC 7662 introspection, session killswitch); Tier 3 Intelligence (Gemini AI API strictly bounded to active cGMP SOPs); Tier 4 Assurance (SHA-256 Merkle-style hash-chained audit trail). |
| **Scene 5** | `03:20 – 04:15` | **End-to-End Live Application Flow (7-Step Tour)** | Synchronized walkthrough of the 7 live workbench modules: Batch Operations $\rightarrow$ Chain of Identity $\rightarrow$ Cold-Chain IoT $\rightarrow$ AI Decision Support $\rightarrow$ HITL 21 CFR Part 11 Digital Signature $\rightarrow$ Active Sessions & Killswitch $\rightarrow$ Golden Scenario Lab. |
| **Scene 6** | `04:15 – 05:00` | **Transformative Clinical & Regulatory Outcomes** | Vein-to-vein turnaround slashed by **32% (from 28.4 days to 19.2 days)**, saving 9.2 critical days for oncology patients; QP discrepancy clearance reduced from 72 hours to under 45 minutes; 100% data integrity under 21 CFR Part 11 and EU GMP Annex 16. |

---

## 🏥 Clinical & Business Problem Statement

In **autologous cell therapies** (such as CAR-T and TCR-T for aggressive hematological and solid tumors), a patient's own peripheral blood mononuclear cells are collected via apheresis, genetically re-engineered in an ISO-5 cleanroom facility with viral or non-viral vectors, expanded, cryopreserved at $-196^\circ\text{C}$ in liquid nitrogen vapor, and shipped back to the clinical oncology center for re-infusion.

Unlike traditional small-molecule or bulk biologic pharmaceuticals:
1. **One Batch Equals One Human Life**: A manufacturing failure, mislabeling, or thermal degradation cannot be compensated by selecting another vial from inventory.
2. **Catastrophic Cross-Infusion Risk**: Administering engineered cells to the incorrect patient results in severe Graft-versus-Host Disease (GvHD), acute organ failure, and immediate patient mortality.
3. **Severe System Fragmentation**: Life sciences enterprises operate on fragmented, non-interoperable platforms:
   - **Hospital EHR** (Cerner, Epic) manages Medical Record Numbers (MRN).
   - **Manufacturing Execution Systems (MES)** (Werum PAS-X) manage cleanroom batch records.
   - **Laboratory Information Management Systems (LIMS)** (LabWare 8) manage endotoxin, sterility, and FACS potency assays.
   - **Quality Management Systems (QMS)** (TrackWise) track non-conformances and deviations.
4. **Regulatory Paper Bottlenecks**: Reconciling disparate barcodes, paper batch records, and cryogenic logger printouts historically delays release by **48 to 72 hours**—time that terminal leukemia and lymphoma patients often do not have.

**Helix Orchestration Workbench** resolves this crisis through real-time deterministic identity reconciliation, telemetry aggregation, bounded AI synthesis, and cryptographically verified Qualified Person (QP) digital release workflows.

---

## ⚡ Core System Capabilities & Modules

### 1. 📊 Live Batch Operations & Vein-to-Vein Tracking
- **Cycle-Time Benchmark**: Real-time tracking of active batches against the **28.4-day historical industry benchmark**.
- **Stage Progression**: Live monitoring across Apheresis $\rightarrow$ Vector Transduction $\rightarrow$ Expansion $\rightarrow$ Cryopreservation $\rightarrow$ QC Release $\rightarrow$ Hospital Infusion.
- **Cross-System Interoperability Badges**: Instant synchronization telemetry across EHR, MES, LIMS, and QMS with millisecond latency metrics.

### 2. 🔗 Chain of Identity (COI) & Chain of Custody (COC)
- **Multi-Identifier Reconciliation**: Eliminates barcode decoupling by mapping Hospital MRN $\leftrightarrow$ Clinical Subject ID $\leftrightarrow$ Cleanroom MES Lot ID $\leftrightarrow$ Cryo Shipper RFID tag.
- **HIPAA De-Identification (CTRL-02)**: Strict client-side de-identification masking PHI for cleanroom operators and external logistics partners.
- **Dual-Witness QP Adjudication (CTRL-01)**: When barcode ambiguity or damaged labeling occurs, the system locks the batch into quarantine until two independent Qualified Persons review physical photos and execute digital sign-offs.

### 3. ❄️ Cold-Chain IoT Telemetry & Degree-Hour Integration
- **Real-Time $-196^\circ\text{C}$ LN2 Monitoring**: Continuous ingestion from cryogenic shippers equipped with calibrated PT100 sensors.
- **Cumulative Degree-Hour Stress Engine**: Evaluates thermal stress by integrating temperature elevation above $-150^\circ\text{C}$ against duration ($T \times t$). Differentiates benign surface blips from irreversible cell viability degradation.
- **Interactive Excursion Simulator**: Test and visualize system alarms under transient warm air exposure, seal integrity breach, or complete nitrogen exhaustion.

### 4. 🧠 Bounded AI Decision Support (Hard Gate HG-01)
- **Zero Autonomous Release Authority**: The AI generates structured discrepancy analyses and root-cause summaries, but **NEVER possesses approval or disposition authority**. The Qualified Person (QP) remains the sole release authority under EU GMP Annex 16.
- **Active cGMP SOP Grounding (GS-12)**: Prevents LLM hallucinations and obsolescence traps by grounding all AI recommendations strictly against active, approved SOP revisions (e.g., `SOP-MFG-042 v4.0`), automatically flagging and rejecting superseded documents (`v3.2`).
- **Prompt Injection Defense**: Sanitizes free-text deviation inputs against adversarial prompt injections attempting to bypass regulatory quarantine.

### 5. ✍️ Human-in-the-Loop (HITL) 21 CFR Part 11 Electronic Signatures
- **Manifestation of Intent (§11.50)**: Explicit, unambiguous statement of signing purpose (e.g., *"I certify that this autologous batch satisfies all release specifications under EU GMP Annex 16"*).
- **Dual-Factor Signature Challenge (§11.200)**: Mandatory password verification, role attestation, and timestamping.
- **Tamper-Evident Hashing**: Signatures are tied cryptographically to the exact batch state, preventing post-signature record modification.

### 6. 🔐 Active Session Management & RFC 6749 / 7636 OAuth 2.0 PKCE
- **RFC 7636 PKCE Enforcement**: Uses cryptographically secure `S256` code verifiers and SHA-256 challenges, eliminating client-secret exposure vulnerabilities in single-page applications.
- **RFC 7662 Token Introspection**: Real-time polling and active token introspection confirming cryptographic validity and active claims.
- **15-Minute 21 CFR Part 11 Idle Timeout (§11.10(d))**: Interactive countdown with warning threshold and automated session invalidation upon user inactivity.
- **Emergency Session Killswitch**: Qualified administrators can instantly terminate compromised or orphan sessions across all clinical workstations with immediate token revocation.

### 7. 🧪 Golden Scenario Lab (15 Regression Test Harnesses)
Automated verification suite validating the system's hard regulatory gates against critical edge-case scenarios:
- `GS-01`: Barcode Ambiguity & Dual-Witness Resolution (HG-02)
- `GS-02`: Cryogenic Excursion Degree-Hour Threshold Breach (HG-03)
- `GS-03`: Unauthorized Direct Batch Release Rejection (HG-01)
- `GS-04`: 21 CFR Part 11 Signature Password Validation (HG-04)
- `GS-05`: 15-Minute Inactivity Session Invalidation (HG-05)
- `GS-06`: Remote Killswitch Session Revocation (HG-06)
- `GS-07`: Merkle Hash Audit Trail Tamper Detection (HG-07)
- `GS-08`: Patient De-Identification Safe Harbor Enforcement (HG-08)
- `GS-09`: Dual-Signature Independent Identity Verification
- `GS-10`: Endotoxin LIMS Assay Failure Quarantine
- `GS-11`: Cryo Nitrogen Depletion Catastrophic Failure
- `GS-12`: Superseded SOP AI Hallucination Rejection
- `GS-13`: Prompt Injection Adversarial Input Neutralization
- `GS-14`: Inter-Facility Network Partition Offline Cache
- `GS-15`: Regulatory Dossier SHA-256 Export Integrity

### 8. 🛡️ Immutable SHA-256 Audit Trail
- **Merkle-Style Hash Chaining**: Every action, signature, status update, and session change is hashed with its predecessor ($H_n = \text{SHA256}(H_{n-1} + \text{Payload})$).
- **ALCOA+ Compliance**: Attributable, Legible, Contemporaneous, Original, and Accurate records under FDA Guidance for Industry on Data Integrity.
- **One-Click Regulatory Dossier Export**: Generate audit-ready JSON or formatted CSV records for FDA and EMA regulatory inspections.

---

## 🏛️ System Architecture

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                 PRESENTATION LAYER (SPA)                                 │
│  React 19 · Vite · Tailwind CSS · Motion Animations · Lucide Icons · Web Speech Narration│
│  ├── Live Batch Ops    ├── Chain of Identity    ├── Cold-Chain IoT    ├── Explainer Video │
│  ├── HITL Approval     ├── Session Killswitch   ├── Audit Trail       ├── Golden Lab     │
└────────────────────────────────────────────┬─────────────────────────────────────────────┘
                                             │ HTTPS / Secure postMessage
┌────────────────────────────────────────────▼─────────────────────────────────────────────┐
│                          IDENTITY, AUTHENTICATION & GOVERNANCE                           │
│  OAuth 2.0 (RFC 6749) · PKCE S256 (RFC 7636) · Token Introspection (RFC 7662)            │
│  ├── 15-Min Inactivity Timer  ├── Remote Killswitch  ├── Role-Based Access Control (RBAC)│
└────────────────────────────────────────────┬─────────────────────────────────────────────┘
                                             │ Bearer Auth / REST API
┌────────────────────────────────────────────▼─────────────────────────────────────────────┐
│                              APPLICATION SERVER (NODE / EXPRESS)                         │
│  TypeScript · Express.js · Server-Side Gemini API Proxy · Merkle Audit Engine             │
│  ├── /api/auth/token          ├── /api/sessions/revoke      ├── /api/audit/verify        │
│  ├── /api/batch/telemetry     ├── /api/ai/decision-support  ├── /api/audit/export        │
└───────────────────────┬────────────────────────────────────────────┬─────────────────────┘
                        │                                            │
┌───────────────────────▼─────────────────────┐  ┌───────────────────▼─────────────────────┐
│       AI DECISION REASONING ENGINE          │  │       REGULATORY INTEGRITY ENGINE       │
│  Google Gemini API (@google/genai SDK)      │  │  SHA-256 Cryptographic Hash Chain       │
│  • cGMP SOP Version Validation (SOP-042)    │  │  • 21 CFR Part 11 Signature Manifest   │
│  • Prompt Injection Sanitization Shield     │  │  • Immutable Ledger Persistence        │
│  • Zero Autonomous Disposition Enforcement  │  │  • Exportable Compliance Dossiers       │
└─────────────────────────────────────────────┘  └─────────────────────────────────────────┘
```

---

## 📁 Repository Structure

```
.
├── index.html                   # HTML entry point with synchronized OpenGraph metadata
├── server.ts                    # Express server handling API routes, proxying & Vite middleware
├── metadata.json                # AI Studio application metadata & capability declarations
├── package.json                 # Project dependencies, build scripts (Vite + esbuild)
├── .env.example                 # Required environment variable declarations
├── src/
│   ├── main.tsx                 # React application bootstrapping
│   ├── App.tsx                  # Root component, tab navigation & modal handlers
│   ├── index.css                # Tailwind CSS global stylesheet
│   ├── types.ts                 # Central TypeScript interfaces (Batch, Audit, OAuth, Scenarios)
│   ├── data/
│   │   ├── mockData.ts          # Clinical batches, cold-chain telemetry & initial audit events
│   │   ├── goldenScenarios.ts   # 15 automated test scenario definitions & verification steps
│   │   └── videoScriptData.ts   # 6-scene documentary script, timestamps, and storyboard data
│   ├── views/
│   │   ├── AnimatedExplainerVideoView.tsx  # 5-minute interactive animated documentary player
│   │   ├── LiveBatchOperationsView.tsx     # Batch progression & cross-system latency view
│   │   ├── ChainOfIdentityView.tsx         # COI multi-key mapping & dual-witness adjudication
│   │   ├── ColdChainIoTView.tsx            # Real-time LN2 telemetry & degree-hour simulator
│   │   ├── HitlApprovalQueueView.tsx       # 21 CFR Part 11 electronic signature workflows
│   │   ├── ActiveSessionsView.tsx          # OAuth2 sessions, PKCE status & remote killswitch
│   │   ├── GoldenScenarioLabView.tsx       # Interactive 15-scenario regression test bench
│   │   └── AuditTrailView.tsx              # SHA-256 Merkle audit trail & regulatory exports
│   └── components/
│       ├── Header.tsx                      # Top bar with role switcher, timer & video shortcut
│       ├── Navigation.tsx                  # Primary workbench section navigation tabs
│       ├── OAuthSetupModal.tsx             # OAuth2 credential & provider configuration dialog
│       └── video/
│           ├── VideoPlayerControls.tsx     # Scrubbing timeline, speed, voice, and audio controls
│           ├── VideoSceneGraphics.tsx      # Rich SVG/Canvas visualizations for all 6 scenes
│           └── VideoScriptWhitepaperModal.tsx # Full voiceover transcript & compliance whitepaper
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-org/helix-orchestration-workbench.git
cd helix-orchestration-workbench
npm install
```

### 2. Environment Configuration
Create a `.env` file in the project root based on `.env.example`:

```env
# Required for Gemini AI bounded decision support
GEMINI_API_KEY="your_gemini_api_key_here"

# Application host URL (used for OAuth redirects & self-referential links)
APP_URL="http://localhost:3000"

# Optional external OAuth2 provider credentials (defaults to built-in simulation if unset)
OAUTH_CLIENT_ID=""
OAUTH_CLIENT_SECRET=""
OAUTH_PROVIDER_URL=""
```

### 3. Run Development Server
```bash
npm run dev
```
The server will start on `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
npm start
```
The build command generates the client-side SPA in `dist/` and bundles `server.ts` into a self-contained CommonJS binary at `dist/server.cjs`.

---

## ⚖️ Regulatory Compliance & Quality Matrix

| Standard | Clause / Section | How Helix Enforces Compliance |
|---|---|---|
| **FDA 21 CFR Part 11** | `§11.10(a)` | System validation via 15 automated **Golden Scenario Lab** regression test suites. |
| **FDA 21 CFR Part 11** | `§11.10(d)` | Automated 15-minute inactivity session expiration and workstation lock. |
| **FDA 21 CFR Part 11** | `§11.10(e)` | Computer-generated, time-stamped **SHA-256 Merkle-style hash-chained audit trail**. |
| **FDA 21 CFR Part 11** | `§11.50` | Manifestation of intent clearly displayed on electronic signature dialogs. |
| **FDA 21 CFR Part 11** | `§11.200` | Dual-factor electronic signature requiring distinct user password verification. |
| **EU GMP Annex 16** | `Clause 1.4` | **Hard Gate HG-01**: Qualified Person (QP) retains exclusive legal release authority; AI is strictly non-dispositional. |
| **GAMP 5** | Category 4/5 | Configured and validated orchestration workflows with deterministic fallback logic. |
| **HIPAA** | 45 CFR §164.514 | **CTRL-02 Safe Harbor**: Cryptographic de-identification of patient identities across cleanroom operators and couriers. |
| **IETF RFC 7636** | PKCE | S256 code verifier prevents authorization code interception on single-page web applications. |

---

## 👥 Roles & Permissions (RBAC)

The workbench supports dynamic role switching directly from the top header:

- **Qualified Person (QP)**: Authorized under EU GMP Annex 16 for final batch disposition, electronic signature execution, and deviation sign-off.
- **Manufacturing Cleanroom Lead**: Manages cell processing, vector transduction, and cleanroom environmental logging.
- **Quality Assurance Specialist**: Audits deviation logs, degree-hour excursions, and LIMS analytical releases.
- **Supply Chain & Cryo Logistics Officer**: Tracks LN2 dry shippers, GPS transit coords, and chain of custody receipts.
- **Systems Administrator**: Governs OAuth2 connections, token introspection, and active session killswitch terminations.

---

## 📄 License & Attribution

Developed for life sciences research, clinical trials, and commercial cell and gene therapy manufacturing environments. Distributed under the MIT License.
