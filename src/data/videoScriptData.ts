export interface VideoChapter {
  id: number;
  title: string;
  subtitle: string;
  durationSeconds: number;
  startTimeSeconds: number;
  badge: string;
  narration: string;
  subtitles: { text: string; start: number; end: number }[];
  keyPoints: string[];
  technicalHighlights: string[];
}

export const VIDEO_TOTAL_DURATION = 300; // 5 minutes total

export const VIDEO_CHAPTERS: VideoChapter[] = [
  {
    id: 1,
    title: 'Business Scenario: The Vein-to-Vein Stakes',
    subtitle: 'Autologous Cell & Gene Therapy (CAR-T / TCR-T) Paradigm',
    durationSeconds: 50,
    startTimeSeconds: 0,
    badge: 'SCENE 01 · CLINICAL REALITY',
    narration:
      'Welcome to the clinical reality of autologous Cell and Gene Therapy. Unlike conventional pills or off-the-shelf biologics, these are living personalized medicines engineered uniquely for an individual human patient. Each batch starts with patient apheresis at a specialized cancer hospital, travels under cryogenic vapor across continents, undergoes genetic transduction in an ISO-5 cleanroom, and returns for patient infusion. A single batch represents a dying patient’s last therapeutic hope. A production delay or contamination event is irreversible—there is no backup batch.',
    subtitles: [
      { text: 'In autologous cell and gene therapy, the medicine is living and personal.', start: 0, end: 8 },
      { text: 'One batch equals one human life—often a patient battling refractory malignancy.', start: 8, end: 17 },
      { text: 'The vein-to-vein cycle spans apheresis, cryogenic transport, and cleanroom expansion.', start: 17, end: 28 },
      { text: 'Historically, this complex chain requires 28.4 days from collection to infusion.', start: 28, end: 38 },
      { text: 'Time is the patient\'s greatest enemy. Any operational failure is fatal.', start: 38, end: 50 },
    ],
    keyPoints: [
      'Personalized Living Drugs: 1 Batch = 1 Human Life',
      'End-to-End Vein-to-Vein Cycle across clinics, air couriers, and cleanrooms',
      'Historical Baseline: 28.4 days vein-to-vein turnaround time',
      'Zero Margin for Error: Contamination or delay leads directly to patient mortality',
    ],
    technicalHighlights: [
      'Apheresis cell collection at hospital oncology centers',
      'Cryogenic nitrogen vapor phase transport (-196°C to -150°C)',
      'Genetic reprogramming: Lentiviral / Electroporation transduction in cleanroom',
      'Strict analytical release testing (viability, sterility, vector copy number)',
    ],
  },
  {
    id: 2,
    title: 'The Industry Crisis: System Fragmentation & Silos',
    subtitle: 'Cross-System Disconnects, Thermal Excursions & Regulatory Risk',
    durationSeconds: 50,
    startTimeSeconds: 50,
    badge: 'SCENE 02 · CORE CHALLENGES',
    narration:
      'Yet modern cell therapy manufacturing is paralyzed by severe system fragmentation. Hospital EHRs, cleanroom MES systems like Werum PAS-X, analytical LIMS like LabWare, and enterprise QMS like TrackWise operate in complete isolation. Data reconciliation is done through spreadsheets and paper batch records. This breeds catastrophic vulnerabilities: Chain-of-Identity mismatches where patient identifiers decouple from batch vials; unnoticed cold-chain thermal excursions where liquid nitrogen fails; and the dangerous temptation of deploying unconstrained AI that hallucinates approvals or cites superseded standard operating procedures.',
    subtitles: [
      { text: 'Modern biomanufacturing is fragmented across isolated enterprise silos.', start: 50, end: 58 },
      { text: 'Hospital EHR, Werum PAS-X MES, LabWare LIMS, and TrackWise QMS do not communicate.', start: 58, end: 68 },
      { text: 'Paper batch records and manual spreadsheets introduce Chain-of-Identity confusion.', start: 68, end: 78 },
      { text: 'Cryo-shipper temperature spikes go unnoticed, degrading living cell viability.', start: 78, end: 88 },
      { text: 'Deploying unconstrained AI introduces hallucinated releases and regulatory non-compliance.', start: 88, end: 100 },
    ],
    keyPoints: [
      'Four Disconnected Silos: Hospital EHR, MES, LIMS, and Enterprise QMS',
      'Chain-of-Identity (COI) Discrepancies: Risk of lethal cross-infusion',
      'Thermal Excursion Blindspots: Unmonitored liquid nitrogen degree-hour thermal stress',
      'Regulatory Hazard: 21 CFR Part 11 & EU GMP Annex 16 severe inspection sanctions',
    ],
    technicalHighlights: [
      'Manual reconciliation latency: 48 to 72 hours per batch release',
      'Decoupled identifiers: Hospital MRN vs Donor Subject ID vs MES Batch Code',
      'Binary temperature alerts ignoring excursion duration and cumulative degree-hours',
      'Unbounded LLM risk: Hallucinating release criteria and citing obsolete SOPs',
    ],
  },
  {
    id: 3,
    title: 'The Need: Helix Orchestration Workbench',
    subtitle: 'Unified Deterministic Orchestration & Zero-Autonomous HITL Authority',
    durationSeconds: 50,
    startTimeSeconds: 100,
    badge: 'SCENE 03 · THE URGENT NEED',
    narration:
      'This industry urgently needed a unified patient-to-batch orchestration workbench. Legacy pharmaceutical platforms were built for 20,000-liter vats of aspirin, not autologous living cells. Helix bridges the operational chasm: providing deterministic cross-system key reconciliation across EHR, MES, LIMS, and IoT; continuous thermal stress analytics calculating degree-hours in liquid nitrogen; and strict Bounded Decision Support where artificial intelligence never holds release authority. Under Hard Gate HG-01, only the human Qualified Person can certify a batch for patient release.',
    subtitles: [
      { text: 'Legacy pharma software was built for mass pills, not personalized living cells.', start: 100, end: 109 },
      { text: 'Helix creates a deterministic cross-system reconciliation mesh.', start: 109, end: 119 },
      { text: 'IoT cryo-shippers stream real-time temperature and degree-hour thermal stress.', start: 119, end: 129 },
      { text: 'Bounded Decision Support eliminates AI hallucinations through 100% SOP provenance.', start: 129, end: 139 },
      { text: 'Hard Gate HG-01 guarantees non-delegable Qualified Person sole release authority.', start: 139, end: 150 },
    ],
    keyPoints: [
      'Deterministic Key Mesh: Resolves EHR, MES, LIMS, and IoT identifiers in real time',
      'Severity × Duration IoT Engine: Real-time liquid nitrogen thermal stress modeling',
      'Zero Autonomous Authority (HG-01): AI is bounded strictly to human decision support',
      'EU GMP Annex 16 Compliance: Preserves non-delegable Qualified Person legal accountability',
    ],
    technicalHighlights: [
      'Single pane of glass unifying Werum PAS-X, LabWare LIMS, and TrackWise QMS',
      'Pre-empts identity collisions before cleanroom genetic modification begins',
      'Eliminates 72 hours of manual batch record review through automated cross-validation',
      'Deterministic guardrails: Hard Gates HG-01 through HG-08',
    ],
  },
  {
    id: 4,
    title: 'Implementation Approach & Architecture',
    subtitle: 'OAuth2 with PKCE, Bounded Gemini AI & Cryptographic Audit Trails',
    durationSeconds: 50,
    startTimeSeconds: 150,
    badge: 'SCENE 04 · ARCHITECTURE',
    narration:
      'Our implementation approach adheres to strict cGMP engineering principles. The full-stack platform couples React 19 with a robust Node.js Express server. For authentication, we implement RFC 6749 OAuth 2.0 with RFC 7636 PKCE using S256 code verifiers, secure popup handshakes compatible with sandboxed iframes, and 21 CFR Part 11 fifteen-minute inactivity timeouts. The intelligence tier utilizes the Google Gemini API with mandatory groundings in active standard operating procedures. Every action, recommendation, and signature is cryptographically linked in a SHA-256 Merkle audit trail for immutable regulatory inspection.',
    subtitles: [
      { text: 'The platform is built on modern full-stack React 19, Tailwind, and Node.js Express.', start: 150, end: 160 },
      { text: 'Authentication implements RFC 6749 OAuth 2.0 with RFC 7636 PKCE S256 verifiers.', start: 160, end: 170 },
      { text: 'Sandboxed popup authorization ensures zero cross-origin frame blocking.', start: 170, end: 180 },
      { text: 'Gemini AI decision support requires 100% active SOP grounding and provenance citations.', start: 180, end: 190 },
      { text: 'Every state mutation is permanently chained with SHA-256 cryptographic hashes.', start: 190, end: 200 },
    ],
    keyPoints: [
      'RFC 6749 & RFC 7636 PKCE: S256 cryptographic challenge preventing authorization code interception',
      'Sandboxed Iframe Compatibility: Popup postMessage handshake for Google, GitHub, and Enterprise SSO',
      '21 CFR Part 11 Session Security: 15-minute auto-timeout, single-concurrency enforcement',
      'SHA-256 Hash-Chained Audit Engine: Immutable non-repudiation and one-click dossier export',
    ],
    technicalHighlights: [
      'Express + Vite architecture binding to port 3000 with secure proxy routing',
      'Server-side Gemini API with active policy validation (GS-12 defense)',
      'RFC 7662 Token Introspection and active session revocation killswitches',
      '15 automated Golden Scenarios verifying compliance against Hard Gates HG-01 to HG-08',
    ],
  },
  {
    id: 5,
    title: 'End-to-End Application Flow Walkthrough',
    subtitle: '7-Step Live Guided Operation from Batch Ingestion to QP Release',
    durationSeconds: 55,
    startTimeSeconds: 200,
    badge: 'SCENE 05 · APPLICATION FLOW',
    narration:
      'Let us walk through the complete flow of the implemented application. Step one: in Batch Operations, operators track living batches along the vein-to-vein timeline. Step two: the Chain-of-Identity module verifies hospital de-identification and blocks processing upon any barcode discrepancy. Step three: Cold-Chain IoT streams real-time cryogenic sensors, computing degree-hour thermal stresses. Step four: Bounded AI synthesizes release summaries with exact SOP version citations. Step five: the Human-in-the-Loop queue gates batch release behind a 21 CFR Part 11 dual-factor digital signature. Step six: the Active Sessions dashboard monitors real-time user tokens and enables emergency session revocation. And step seven: the Golden Scenario Lab automatically executes fifteen regression tests.',
    subtitles: [
      { text: 'Step 1: Batch Operations tracks living cell batches against the 28.4-day benchmark.', start: 200, end: 208 },
      { text: 'Step 2: Chain of Identity de-identifies patients and adjudicates multi-key mismatches.', start: 208, end: 216 },
      { text: 'Step 3: Cold-Chain IoT continuously computes cumulative thermal stress degree-hours.', start: 216, end: 224 },
      { text: 'Step 4: AI Decision Support generates recommendations with 100% SOP citations.', start: 224, end: 232 },
      { text: 'Step 5: HITL Gate requires QP dual-factor electronic signature with manifestation of intent.', start: 232, end: 241 },
      { text: 'Step 6: Active Sessions dashboard tracks live OAuth2 tokens with remote killswitches.', start: 241, end: 248 },
      { text: 'Step 7: Golden Scenario Lab validates all 15 scenarios and exports cryptographic dossiers.', start: 248, end: 255 },
    ],
    keyPoints: [
      'Step 1 · Live Batch Operations: Vein-to-Vein cycle tracking & cross-system status badges',
      'Step 2 · Chain of Identity: Multi-key reconciliation and dual-witness QP adjudication',
      'Step 3 · Cold-Chain IoT: Real-time sensor telemetry & thermal stress degree-hour simulator',
      'Step 4 · Bounded AI Decision Support: Evidence synthesis with verifiable SOP citations',
      'Step 5 · HITL Approval Queue: Dual-factor 21 CFR Part 11.50 digital signature modal',
      'Step 6 · Active Sessions & OAuth2: Real-time token telemetry & remote session killswitch',
      'Step 7 · Golden Scenario Lab: 15 automated test harnesses and SHA-256 audit dossier export',
    ],
    technicalHighlights: [
      'Interactive batch status transitions: APH -> REC -> MFG -> QC -> REL -> INF',
      'Dual-witness QP resolution for any COI identity ambiguity (GS-04)',
      'Severity × Duration integration for vapor phase liquid nitrogen excursions',
      'Real-time RFC 7662 token introspection and single-operator concurrency enforcement',
    ],
  },
  {
    id: 6,
    title: 'Transformative Outcomes & Regulatory Compliance',
    subtitle: 'From 28.4 to 19 Days: 100% Traceability and Zero Inspection Deviations',
    durationSeconds: 45,
    startTimeSeconds: 255,
    badge: 'SCENE 06 · IMPACT & VALUE',
    narration:
      'The operational and clinical impact of Helix is transformative. Average vein-to-vein turnaround time is slashed from 28.4 days to 19.2 days—delivering living therapies over nine days faster to critically ill patients. Identity discrepancies and release bottlenecks are eradicated. The platform achieves one hundred percent compliance with FDA 21 CFR Part 11 and EU GMP Annex 16. By combining enterprise OAuth2 security, bounded AI decision support, and cryptographic auditability, Helix establishes the gold standard for cell and gene therapy manufacturing.',
    subtitles: [
      { text: 'Vein-to-vein cycle time is reduced by 32%: from 28.4 days down to 19.2 days.', start: 255, end: 264 },
      { text: 'Critically ill cancer patients receive life-saving living therapies over 9 days sooner.', start: 264, end: 274 },
      { text: '100% data integrity achieved across hospital, cleanroom, and logistics systems.', start: 274, end: 284 },
      { text: 'Full adherence to FDA 21 CFR Part 11 and EU GMP Annex 16 QP authority.', start: 284, end: 292 },
      { text: 'Helix Orchestration Workbench: The future of intelligent, compliant biomanufacturing.', start: 292, end: 300 },
    ],
    keyPoints: [
      '32% Faster Turnaround: Cycle time slashed from 28.4 days to 19.2 days',
      '9.2 Critical Days Saved: Giving dying oncology patients their best survival odds',
      'Zero Regulatory Findings: 100% adherence to 21 CFR Part 11 & EU GMP Annex 16',
      '100% Chain-of-Identity & Cold-Chain Data Integrity with Cryptographic Non-Repudiation',
    ],
    technicalHighlights: [
      'Automated batch record generation eliminates 72 hours of manual QP paper review',
      'Instant thermal stress calculation prevents administration of compromised therapies',
      'Cryptographic SHA-256 audit trails with instant regulatory dossier generation',
      'Enterprise-grade OAuth 2.0 PKCE authentication with multi-session governance',
    ],
  },
];
