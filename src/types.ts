export type UserRole =
  | 'QUALIFIED_PERSON'
  | 'CLINICAL_COORDINATOR'
  | 'MANUFACTURING_TECH'
  | 'CRYO_LOGISTICS_MGR'
  | 'RISK_COMPLIANCE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  department: string;
  certifications?: string[];
  oauthProvider?: 'google' | 'github' | 'helix-sso';
}

export interface ActiveSession {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  role: UserRole;
  avatar: string;
  ipAddress: string;
  location: string;
  device: string;
  browser: string;
  loginTime: string;
  lastActive: string;
  expiresAt: string;
  isCurrent: boolean;
  mfaVerified: boolean;
  status: 'ACTIVE' | 'IDLE' | 'REVOKED';
  riskScore: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  type: 'LOGIN_SUCCESS' | 'SESSION_TERMINATED' | 'ROLE_VIOLATION_ATTEMPT' | 'TOKEN_REFRESH' | 'CONCURRENT_SESSION_DETECTED' | 'EXCURSION_ALERT';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  description: string;
  ipAddress: string;
  userId?: string;
  sessionId?: string;
}

export interface Patient {
  canonicalId: string; // e.g. "HLX-CANON-8921"
  pseudonym: string;   // e.g. "PT-9421"
  indication: string;  // e.g. "Refractory B-cell ALL"
  eligibilityStatus: 'CONFIRMED_ELIGIBLE' | 'PENDING_LABS' | 'INELIGIBLE';
  apheresisDate: string;
  apheresisFacility: string;
  infusionWindowStart: string;
  infusionWindowEnd: string;
  ehrSystemRef: string;
}

export interface BatchSystemRecord {
  source: 'MES' | 'LIMS' | 'QMS' | 'IoT_CRYO';
  systemId: string;
  status: string;
  timestamp: string;
  operatorOrDevice: string;
  notes?: string;
}

export interface QCResult {
  id: string;
  parameter: string;
  category: 'STERILITY' | 'POTENCY' | 'PURITY' | 'IDENTITY' | 'SAFETY';
  specification: string;
  measuredValue: string;
  status: 'PASS' | 'FAIL' | 'PENDING';
  completedAt: string;
  limsSampleRef: string;
  analyst: string;
}

export interface ColdChainReading {
  timestamp: string;
  tempCelsius: number;
  nitrogenVaporLevel: string; // "OPTIMAL" | "SUB-OPTIMAL" | "LOW"
  location: string;
  gpsCoords?: string;
}

export interface ColdChainExcursion {
  id: string;
  batchId: string;
  severity: 'NONE' | 'LEVEL_1_WARNING' | 'LEVEL_2_CRITICAL' | 'LEVEL_3_HARD_BLOCK';
  peakTempC: number;
  durationMinutes: number;
  degreeHours: number;
  detectedAt: string;
  sensorId: string;
  dispositionAction: string;
  requiresQpAdjudication: boolean;
  status: 'OPEN' | 'ADJUDICATED' | 'ESCALATED';
}

export interface Batch {
  id: string;
  batchNumber: string;
  patientCanonicalId: string;
  patientPseudonym: string;
  productName: string;
  stage:
    | 'APHERESIS_RECEIVED'
    | 'GENE_TRANSFER'
    | 'BIOREACTOR_EXPANSION'
    | 'FORMULATION_CRYO'
    | 'QC_RELEASE_PENDING'
    | 'RELEASED_FOR_INFUSION'
    | 'QUARANTINED_INVESTIGATION';
  veinToVeinDays: number;
  targetInfusionDate: string;
  coiStatus: 'UNBROKEN' | 'AMBIGUOUS' | 'MISMATCH';
  coiDiscrepancyNotes?: string;
  
  // Cross-system IDs for Chain-of-Identity (DATA-01)
  crossSystemIdentifiers: {
    ehrId: string;
    mesId: string;
    limsId: string;
    qmsLotId: string;
    iotCryoId: string;
  };

  // Cross-system telemetry snapshots (FR-02)
  systemRecords: {
    mes: BatchSystemRecord;
    lims: BatchSystemRecord;
    qms: BatchSystemRecord;
    iot: BatchSystemRecord;
  };

  // Discrepancy flags (GS-11)
  hasSystemConflict: boolean;
  conflictSummary?: string;

  qcResults: QCResult[];
  coldChainReadings: ColdChainReading[];
  excursion?: ColdChainExcursion;
  
  qpReleaseApproval?: {
    approvedBy: string;
    approvedAt: string;
    digitalSignatureReason: string;
    electronicCertificateId: string;
  };
}

export interface ProvenanceRecord {
  source: string;
  recordId: string;
  timestamp: string;
  snippet: string;
  integrityHash: string;
}

export interface HitlRecommendation {
  id: string;
  batchId: string;
  batchNumber: string;
  patientPseudonym: string;
  type: 'RELEASE_APPROVAL' | 'APHERESIS_SCHEDULE' | 'COI_INVESTIGATION' | 'EXCURSION_DISPOSITION' | 'SCHEDULE_OPTIMIZE';
  title: string;
  plainLanguageSummary: string;
  confidenceScore: number;
  requiresRole: UserRole;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'HARD_CONSTRAINT_BLOCKED';
  hardConstraintBlockedReason?: string;
  provenance: ProvenanceRecord[];
  activePolicyVersion: string;
  supersededWarning?: string;
  suggestedAction: string;
  reviewerNotes?: string;
  adjudicatedBy?: string;
  adjudicatedAt?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  entityType: 'BATCH' | 'PATIENT' | 'EXCURSION' | 'AUTH_SESSION' | 'RELEASE_APPROVAL' | 'SYSTEM_RECONCILIATION';
  entityId: string;
  description: string;
  evidenceRef?: string;
  sha256Checksum: string;
  cfrPart11SignatureReason?: string;
}

export interface GoldenScenario {
  id: string;
  code: string; // 'GS-01' through 'GS-15'
  title: string;
  requirementTested: string;
  acceptanceCriterion: string;
  description: string;
  simulatedInput: string;
  simulatedFailureCondition?: string;
  expectedOutcome: string;
  hardGateId: 'HG-01' | 'HG-02' | 'HG-03' | 'HG-04' | 'HG-05' | 'HG-06' | 'HG-07' | 'HG-08';
  status: 'READY' | 'RUNNING' | 'PASSED' | 'FAILED';
  lastRunTimestamp?: string;
  executionLogs?: string[];
}
