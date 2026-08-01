export interface PackageDescriptor {
  readonly packageName: string;
  readonly featureFlagId: string;
  readonly envPrefix: string;
  readonly summary: string;
}

export interface RolloutDescriptor {
  readonly featureFlagId: string;
  readonly envOverride: string;
  readonly rollbackPlan: string;
  readonly summary: string;
}

export type TrainingInstitutionType =
  | "school"
  | "barracks"
  | "academy"
  | "apprenticeship";

export type MccExpressionTrack = "internalized" | "externalized" | "hybrid";
export type TrainingTrustLevel = "provisional" | "trusted" | "restricted";
export type TrainingTrustMarkerSource =
  | "system"
  | "mission"
  | "institution"
  | "sponsor";
export type TrainingFieldSensitivity = "pseudonymous" | "internal";
export type TrainingFieldRetention = "authoritative-progression" | "short-lived";
export type TrainingAcademicProgressStage =
  | "school-foundation"
  | "school-advanced"
  | "academy-candidate"
  | "academy-admitted"
  | "track-specialized";
export type TrainingAcademyAdmissionDecision =
  | "candidate"
  | "admitted"
  | "waitlisted"
  | "deferred";
export type TrainingInstructionAccessLevel =
  | "not-authorized"
  | "school-foundation"
  | "academy-provisional"
  | "academy-specialization";
export type TrainingTechniqueMasteryState =
  | "not-started"
  | "guided"
  | "field-tested"
  | "validated";
export type TrainingApprenticeshipReadinessStage =
  | "candidate"
  | "sponsored"
  | "supervised-practice"
  | "handoff-ready";
export type TrainingApprenticeshipSupervisionMode =
  | "shadowing"
  | "assisted-practice"
  | "supervised-production";
export type TrainingApprenticeshipOutputState =
  | "practice-only"
  | "supervised-output"
  | "mastered-output";
export type TrainingCraftingAuthorityId =
  | "item-crafting"
  | "spellcraft"
  | "dungeon-crafting";
export type TrainingMartialTechniqueTrack = "internalized" | "hybrid";
export type TrainingBarracksDrillDeliveryMode =
  | "drill"
  | "sparring"
  | "service-obligation"
  | "supervised-mission"
  | "rank-authorization";
export type TrainingMartialTechniqueFamily =
  | "body-reinforcement"
  | "weapon-reinforcement"
  | "shield-reinforcement"
  | "stance"
  | "timing"
  | "aura-maintenance"
  | "close-pressure"
  | "mobility-strike"
  | "ward-breaking-attack"
  | "anti-spell-parry";
export type TrainingAntiSpellFieldcraftFamily =
  | "interruption"
  | "concentration-breaking"
  | "projectile-deflection"
  | "ward-stress"
  | "grounding";
export type TrainingAntiSpellCounterWindow =
  | "timing"
  | "delivery"
  | "stability";

export type TrainingMutationOutcome =
  | "committed"
  | "deferred"
  | "timed-out"
  | "cancelled";

export type TrainingTransitionType =
  | "eligibility-changed"
  | "track-changed"
  | "institution-transferred";

export interface TrainingInstitution {
  readonly institutionId: string;
  readonly type: TrainingInstitutionType;
  readonly track: MccExpressionTrack;
  readonly eligible: boolean;
}

export interface TrainingProgressionRecord {
  readonly playerSubjectId: string;
  readonly institutionId: string;
  readonly track: MccExpressionTrack;
  readonly trustLevel: TrainingTrustLevel;
  readonly eligible: boolean;
  readonly updatedAtIso: string;
}

export interface TrainingAcademicMissionPrerequisite {
  readonly prerequisiteId: string;
  readonly institutionId: string;
  readonly missionId: string;
  readonly missionCode: string;
  readonly minimumProgressStage: TrainingAcademicProgressStage;
  readonly minimumTrustLevel: TrainingTrustLevel;
  readonly satisfied: boolean;
  readonly reasonCodes: readonly string[];
}

export interface TrainingTrustMarker {
  readonly markerId: string;
  readonly institutionId: string;
  readonly trustLevel: TrainingTrustLevel;
  readonly source: TrainingTrustMarkerSource;
  readonly awardedAtIso: string;
  readonly reasonCodes: readonly string[];
}

export interface TrainingSchoolProgression {
  readonly progressionId: string;
  readonly schoolInstitutionId: string;
  readonly stage: TrainingAcademicProgressStage;
  readonly leaning: MccExpressionTrack;
  readonly missionPrerequisites: readonly TrainingAcademicMissionPrerequisite[];
  readonly trustMarkers: readonly TrainingTrustMarker[];
  readonly updatedAtIso: string;
}

export interface TrainingAcademyAdmission {
  readonly admissionId: string;
  readonly schoolInstitutionId: string;
  readonly academyInstitutionId: string;
  readonly desiredTrack: MccExpressionTrack;
  readonly decision: TrainingAcademyAdmissionDecision;
  readonly missionPrerequisites: readonly TrainingAcademicMissionPrerequisite[];
  readonly supportingTrustMarkerIds: readonly string[];
  readonly evaluatedAtIso: string;
  readonly reasonCodes: readonly string[];
}

export interface TrainingTrackSelection {
  readonly selectionId: string;
  readonly institutionId: string;
  readonly leaning: MccExpressionTrack;
  readonly selectedTrack: MccExpressionTrack;
  readonly instructionAccess: TrainingInstructionAccessLevel;
  readonly techniqueMastery: TrainingTechniqueMasteryState;
  readonly updatedAtIso: string;
  readonly reasonCodes: readonly string[];
}

export interface TrainingApprenticeshipSponsorship {
  readonly sponsorshipId: string;
  readonly apprenticeshipInstitutionId: string;
  readonly sponsorId: string;
  readonly professionId: string;
  readonly sponsoredTrack: MccExpressionTrack;
  readonly trustLevel: TrainingTrustLevel;
  readonly grantedAtIso: string;
  readonly missionRequirementCodes: readonly string[];
  readonly reasonCodes: readonly string[];
}

export interface TrainingApprenticeshipSupervision {
  readonly supervisionId: string;
  readonly apprenticeshipInstitutionId: string;
  readonly supervisorId: string;
  readonly professionId: string;
  readonly supervisionMode: TrainingApprenticeshipSupervisionMode;
  readonly focusTrack: MccExpressionTrack;
  readonly startedAtIso: string;
  readonly checkpointAtIso: string;
  readonly taskCodes: readonly string[];
  readonly reasonCodes: readonly string[];
}

export interface TrainingApprenticeshipReadiness {
  readonly readinessId: string;
  readonly apprenticeshipInstitutionId: string;
  readonly professionId: string;
  readonly stage: TrainingApprenticeshipReadinessStage;
  readonly outputState: TrainingApprenticeshipOutputState;
  readonly sponsorshipId: string;
  readonly supervisionId?: string;
  readonly supportedAuthorityIds: readonly TrainingCraftingAuthorityId[];
  readonly readyForHandoff: boolean;
  readonly updatedAtIso: string;
  readonly reasonCodes: readonly string[];
}

export interface TrainingCraftingAuthorityHandoff {
  readonly handoffId: string;
  readonly readinessId: string;
  readonly authorityId: TrainingCraftingAuthorityId;
  readonly professionId: string;
  readonly apprenticeshipStage: TrainingApprenticeshipReadinessStage;
  readonly outputState: TrainingApprenticeshipOutputState;
  readonly eligible: boolean;
  readonly reasonCodes: readonly string[];
}

export interface TrainingProgressionFieldPolicy {
  readonly field: keyof TrainingProgressionRecord;
  readonly sensitivity: TrainingFieldSensitivity;
  readonly retention: TrainingFieldRetention;
  readonly justification: string;
}

export interface TrainingScaleAssumptions {
  readonly maxLearnersPerInstitution: number;
  readonly maxConcurrentInstitutionEvaluations: number;
  readonly maxProgressionEventsPerMinute: number;
}

export interface TrainingMutationReliabilityPolicy {
  readonly timeoutMs: number;
  readonly cancellationWindowMs: number;
  readonly maxRetryAttempts: number;
  readonly recoverableFailureCodes: readonly string[];
  readonly terminalFailureCodes: readonly string[];
}

export interface TrainingStateTransitionEvent {
  readonly transitionId: string;
  readonly institutionId: string;
  readonly transitionType: TrainingTransitionType;
  readonly outcome: TrainingMutationOutcome;
  readonly fromTrack: MccExpressionTrack;
  readonly toTrack: MccExpressionTrack;
  readonly observedAt: string;
}

export interface TrainingBarracksDrill {
  readonly drillId: string;
  readonly institutionId: string;
  readonly title: string;
  readonly track: TrainingMartialTechniqueTrack;
  readonly techniqueFamily: TrainingMartialTechniqueFamily;
  readonly deliveryMode: TrainingBarracksDrillDeliveryMode;
  readonly missionPrerequisiteCodes: readonly string[];
  readonly antiSpellFamilies: readonly TrainingAntiSpellFieldcraftFamily[];
}

export interface TrainingMissionTechniqueUnlock {
  readonly unlockId: string;
  readonly missionId: string;
  readonly techniqueId: string;
  readonly institutionId: string;
  readonly track: TrainingMartialTechniqueTrack;
  readonly techniqueFamily: TrainingMartialTechniqueFamily;
  readonly unlockedAtIso: string;
  readonly reasonCodes: readonly string[];
}

export interface TrainingMartialTechnique {
  readonly techniqueId: string;
  readonly institutionId: string;
  readonly title: string;
  readonly track: TrainingMartialTechniqueTrack;
  readonly family: TrainingMartialTechniqueFamily;
  readonly antiSpellFamily?: TrainingAntiSpellFieldcraftFamily;
  readonly expressionNote: string;
}

export interface TrainingAntiSpellFieldcraftDiscipline {
  readonly disciplineId: string;
  readonly institutionId: string;
  readonly title: string;
  readonly track: TrainingMartialTechniqueTrack;
  readonly family: TrainingAntiSpellFieldcraftFamily;
  readonly boundedCounterWindows: readonly TrainingAntiSpellCounterWindow[];
  readonly prohibitedCapabilityCodes: readonly string[];
}

export const TRAINING_PACKAGE = "@plasius/training";
export const TRAINING_ENV_PREFIX = "TRAINING";
export const TRAINING_FEATURE_FLAG_ID = "harmony.training.institutions.enabled";
export const TRAINING_ACADEMIES_FEATURE_FLAG_ID =
  "harmony.training.academies.enabled";
export const TRAINING_APPRENTICESHIP_FEATURE_FLAG_ID =
  "harmony.training.apprenticeship.enabled";
export const TRAINING_MARTIAL_FEATURE_FLAG_ID = "harmony.training.martial.enabled";
export const TRAINING_PRIVACY_SCALE_FEATURE_FLAG_ID =
  "harmony.training-progression.privacy-scale.enabled";
export const TRAINING_PRIVACY_SCALE_ENV_OVERRIDE =
  "TRAINING_PRIVACY_SCALE_ENABLED";
export const TRAINING_TRUST_MARKER_SOURCES = [
  "system",
  "mission",
  "institution",
  "sponsor",
] as const;
export const TRAINING_ACADEMIC_PROGRESS_STAGES = [
  "school-foundation",
  "school-advanced",
  "academy-candidate",
  "academy-admitted",
  "track-specialized",
] as const;
export const TRAINING_ACADEMY_ADMISSION_DECISIONS = [
  "candidate",
  "admitted",
  "waitlisted",
  "deferred",
] as const;
export const TRAINING_INSTRUCTION_ACCESS_LEVELS = [
  "not-authorized",
  "school-foundation",
  "academy-provisional",
  "academy-specialization",
] as const;
export const TRAINING_TECHNIQUE_MASTERY_STATES = [
  "not-started",
  "guided",
  "field-tested",
  "validated",
] as const;
export const TRAINING_APPRENTICESHIP_READINESS_STAGES = [
  "candidate",
  "sponsored",
  "supervised-practice",
  "handoff-ready",
] as const;
export const TRAINING_APPRENTICESHIP_SUPERVISION_MODES = [
  "shadowing",
  "assisted-practice",
  "supervised-production",
] as const;
export const TRAINING_APPRENTICESHIP_OUTPUT_STATES = [
  "practice-only",
  "supervised-output",
  "mastered-output",
] as const;
export const TRAINING_CRAFTING_AUTHORITY_IDS = [
  "item-crafting",
  "spellcraft",
  "dungeon-crafting",
] as const;
export const TRAINING_MARTIAL_TECHNIQUE_TRACKS = [
  "internalized",
  "hybrid",
] as const;
export const TRAINING_BARRACKS_DRILL_DELIVERY_MODES = [
  "drill",
  "sparring",
  "service-obligation",
  "supervised-mission",
  "rank-authorization",
] as const;
export const TRAINING_MARTIAL_TECHNIQUE_FAMILIES = [
  "body-reinforcement",
  "weapon-reinforcement",
  "shield-reinforcement",
  "stance",
  "timing",
  "aura-maintenance",
  "close-pressure",
  "mobility-strike",
  "ward-breaking-attack",
  "anti-spell-parry",
] as const;
export const TRAINING_ANTI_SPELL_FIELDCRAFT_FAMILIES = [
  "interruption",
  "concentration-breaking",
  "projectile-deflection",
  "ward-stress",
  "grounding",
] as const;
export const TRAINING_ANTI_SPELL_COUNTER_WINDOWS = [
  "timing",
  "delivery",
  "stability",
] as const;

export const packageDescriptor: PackageDescriptor = Object.freeze({
  packageName: TRAINING_PACKAGE,
  featureFlagId: TRAINING_FEATURE_FLAG_ID,
  envPrefix: TRAINING_ENV_PREFIX,
  summary:
    "Institutional training, trust, and specialization contracts for Plasius game progression.",
});

function freezeReadonlyArray<T>(items: readonly T[]): readonly T[] {
  return Object.freeze([...items]);
}

export const trainingPrivacyScaleRollout: RolloutDescriptor = Object.freeze({
  featureFlagId: TRAINING_PRIVACY_SCALE_FEATURE_FLAG_ID,
  envOverride: TRAINING_PRIVACY_SCALE_ENV_OVERRIDE,
  rollbackPlan:
    "Disable the privacy/scale baseline rollout to fall back to the existing institutional-training contract surface.",
  summary:
    "Rolls out privacy-safe progression payloads and documented large-cohort scale expectations.",
});

export const trainingProgressionFieldPolicies = Object.freeze<
  readonly TrainingProgressionFieldPolicy[]
>([
  {
    field: "playerSubjectId",
    sensitivity: "pseudonymous",
    retention: "authoritative-progression",
    justification:
      "Stable pseudonymous subject identifier required to reconcile institutional progression without carrying profile names or contact data.",
  },
  {
    field: "institutionId",
    sensitivity: "internal",
    retention: "authoritative-progression",
    justification:
      "Institution authority boundary needed to evaluate eligibility and trust transitions for a learner cohort.",
  },
  {
    field: "track",
    sensitivity: "internal",
    retention: "authoritative-progression",
    justification:
      "Current specialization track is the minimum state required to route progression decisions.",
  },
  {
    field: "trustLevel",
    sensitivity: "internal",
    retention: "authoritative-progression",
    justification:
      "Trust tier determines whether progression decisions are accepted, reviewed, or blocked.",
  },
  {
    field: "eligible",
    sensitivity: "internal",
    retention: "authoritative-progression",
    justification:
      "Eligibility is the minimal boolean needed to gate progression outcomes without copying broader account state.",
  },
  {
    field: "updatedAtIso",
    sensitivity: "internal",
    retention: "short-lived",
    justification:
      "Update timestamp supports conflict resolution and replay ordering for high-event-rate training flows.",
  },
]);

export const defaultTrainingScaleAssumptions: TrainingScaleAssumptions =
  Object.freeze({
    maxLearnersPerInstitution: 5_000,
    maxConcurrentInstitutionEvaluations: 250,
    maxProgressionEventsPerMinute: 20_000,
  });

export function isMccExpressionTrack(value: string): value is MccExpressionTrack {
  return value === "internalized" || value === "externalized" || value === "hybrid";
}

function isTrainingInstitutionType(
  value: string,
): value is TrainingInstitutionType {
  return (
    value === "school"
    || value === "barracks"
    || value === "academy"
    || value === "apprenticeship"
  );
}

function isTrainingMutationOutcome(
  value: string,
): value is TrainingMutationOutcome {
  return (
    value === "committed"
    || value === "deferred"
    || value === "timed-out"
    || value === "cancelled"
  );
}

function isTrainingTransitionType(
  value: string,
): value is TrainingTransitionType {
  return (
    value === "eligibility-changed"
    || value === "track-changed"
    || value === "institution-transferred"
  );
}

export function isTrainingMartialTechniqueTrack(
  value: string,
): value is TrainingMartialTechniqueTrack {
  return (TRAINING_MARTIAL_TECHNIQUE_TRACKS as readonly string[]).includes(value);
}

export function isTrainingTrustLevel(value: string): value is TrainingTrustLevel {
  return value === "provisional" || value === "trusted" || value === "restricted";
}

export function isTrainingTrustMarkerSource(
  value: string,
): value is TrainingTrustMarkerSource {
  return (TRAINING_TRUST_MARKER_SOURCES as readonly string[]).includes(value);
}

export function isTrainingAcademicProgressStage(
  value: string,
): value is TrainingAcademicProgressStage {
  return (TRAINING_ACADEMIC_PROGRESS_STAGES as readonly string[]).includes(value);
}

export function isTrainingAcademyAdmissionDecision(
  value: string,
): value is TrainingAcademyAdmissionDecision {
  return (TRAINING_ACADEMY_ADMISSION_DECISIONS as readonly string[]).includes(value);
}

export function isTrainingInstructionAccessLevel(
  value: string,
): value is TrainingInstructionAccessLevel {
  return (TRAINING_INSTRUCTION_ACCESS_LEVELS as readonly string[]).includes(value);
}

export function isTrainingTechniqueMasteryState(
  value: string,
): value is TrainingTechniqueMasteryState {
  return (TRAINING_TECHNIQUE_MASTERY_STATES as readonly string[]).includes(value);
}

export function isTrainingApprenticeshipReadinessStage(
  value: string,
): value is TrainingApprenticeshipReadinessStage {
  return (TRAINING_APPRENTICESHIP_READINESS_STAGES as readonly string[]).includes(
    value,
  );
}

export function isTrainingApprenticeshipSupervisionMode(
  value: string,
): value is TrainingApprenticeshipSupervisionMode {
  return (TRAINING_APPRENTICESHIP_SUPERVISION_MODES as readonly string[]).includes(
    value,
  );
}

export function isTrainingApprenticeshipOutputState(
  value: string,
): value is TrainingApprenticeshipOutputState {
  return (TRAINING_APPRENTICESHIP_OUTPUT_STATES as readonly string[]).includes(
    value,
  );
}

export function isTrainingCraftingAuthorityId(
  value: string,
): value is TrainingCraftingAuthorityId {
  return (TRAINING_CRAFTING_AUTHORITY_IDS as readonly string[]).includes(value);
}

export function isTrainingBarracksDrillDeliveryMode(
  value: string,
): value is TrainingBarracksDrillDeliveryMode {
  return (TRAINING_BARRACKS_DRILL_DELIVERY_MODES as readonly string[]).includes(value);
}

export function isTrainingMartialTechniqueFamily(
  value: string,
): value is TrainingMartialTechniqueFamily {
  return (TRAINING_MARTIAL_TECHNIQUE_FAMILIES as readonly string[]).includes(value);
}

export function isTrainingAntiSpellFieldcraftFamily(
  value: string,
): value is TrainingAntiSpellFieldcraftFamily {
  return (TRAINING_ANTI_SPELL_FIELDCRAFT_FAMILIES as readonly string[]).includes(value);
}

export function isTrainingAntiSpellCounterWindow(
  value: string,
): value is TrainingAntiSpellCounterWindow {
  return (TRAINING_ANTI_SPELL_COUNTER_WINDOWS as readonly string[]).includes(value);
}

export function createTrainingInstitution(
  input: TrainingInstitution
): TrainingInstitution {
  assertNonEmptyString(input.institutionId, "institutionId");

  if (!isTrainingInstitutionType(input.type)) {
    throw new Error("type must be a supported training institution type");
  }

  if (!isMccExpressionTrack(input.track)) {
    throw new Error("track must be a supported MCC expression track");
  }

  if (typeof input.eligible !== "boolean") {
    throw new Error("eligible must be a boolean");
  }

  return Object.freeze({ ...input });
}

function freezeValidatedReadonlyArray<T>(
  items: readonly T[],
  validator: (value: T) => boolean,
  label: string,
): readonly T[] {
  for (const item of items) {
    if (!validator(item)) {
      throw new Error(`${label} contains an unsupported value`);
    }
  }

  return freezeReadonlyArray(items);
}

export function createTrainingMutationReliabilityPolicy(
  input: TrainingMutationReliabilityPolicy
): TrainingMutationReliabilityPolicy {
  assertPositiveSafeInteger(input.timeoutMs, "timeoutMs");
  assertNonNegativeSafeInteger(
    input.cancellationWindowMs,
    "cancellationWindowMs",
  );
  assertNonNegativeSafeInteger(input.maxRetryAttempts, "maxRetryAttempts");

  return Object.freeze({
    ...input,
    recoverableFailureCodes: assertNonEmptyStringArray(
      input.recoverableFailureCodes,
      "recoverableFailureCodes",
    ),
    terminalFailureCodes: assertNonEmptyStringArray(
      input.terminalFailureCodes,
      "terminalFailureCodes",
    ),
  });
}

export function createTrainingStateTransitionEvent(
  input: TrainingStateTransitionEvent
): TrainingStateTransitionEvent {
  assertNonEmptyString(input.transitionId, "transitionId");
  assertNonEmptyString(input.institutionId, "institutionId");
  assertNonEmptyString(input.observedAt, "observedAt");
  assertValidIsoTimestamp(input.observedAt, "observedAt");

  if (!isTrainingTransitionType(input.transitionType)) {
    throw new Error("transitionType must be a supported training transition type");
  }

  if (!isTrainingMutationOutcome(input.outcome)) {
    throw new Error("outcome must be a supported training mutation outcome");
  }

  if (!isMccExpressionTrack(input.fromTrack)) {
    throw new Error("fromTrack must be a supported MCC expression track");
  }

  if (!isMccExpressionTrack(input.toTrack)) {
    throw new Error("toTrack must be a supported MCC expression track");
  }

  return Object.freeze({ ...input });
}

function assertNonEmptyString(value: string, label: string): void {
  if (value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string`);
  }
}

function assertPositiveSafeInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${label} must be a positive safe integer`);
  }
}

function assertNonNegativeSafeInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${label} must be a non-negative safe integer`);
  }
}

const iso8601DateRegex =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/;

function getDaysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function assertIso8601Timestamp(value: string, label: string): void {
  const match = iso8601DateRegex.exec(value);
  if (!match || Number.isNaN(Date.parse(value))) {
    throw new Error(`${label} must be an ISO-8601 timestamp`);
  }

  const [, yearRaw, monthRaw, dayRaw, hourRaw, minuteRaw, secondRaw] = match;
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  const day = Number(dayRaw);
  const hour = Number(hourRaw);
  const minute = Number(minuteRaw);
  const second = Number(secondRaw);

  if (
    month < 1
    || month > 12
    || day < 1
    || day > getDaysInMonth(year, month)
    || hour > 23
    || minute > 59
    || second > 59
  ) {
    throw new Error(`${label} must be an ISO-8601 timestamp`);
  }
}

function assertValidUpdatedAtIso(value: string): void {
  assertIso8601Timestamp(value, "updatedAtIso");
}

function assertValidIsoTimestamp(value: string, label: string): void {
  assertIso8601Timestamp(value, label);
}

function assertNonEmptyStringArray(
  values: readonly string[],
  label: string,
): readonly string[] {
  if (!Array.isArray(values)) {
    throw new Error(`${label} must be an array of non-empty strings`);
  }

  for (const value of values) {
    assertNonEmptyString(value, `${label} entry`);
  }

  return freezeReadonlyArray(values);
}

export function createTrainingProgressionRecord(
  input: TrainingProgressionRecord
): TrainingProgressionRecord {
  assertNonEmptyString(input.playerSubjectId, "playerSubjectId");
  assertNonEmptyString(input.institutionId, "institutionId");
  assertNonEmptyString(input.updatedAtIso, "updatedAtIso");
  assertValidIsoTimestamp(input.updatedAtIso, "updatedAtIso");

  if (!isMccExpressionTrack(input.track)) {
    throw new Error("track must be a supported MCC expression track");
  }

  if (!isTrainingTrustLevel(input.trustLevel)) {
    throw new Error("trustLevel must be a supported training trust level");
  }

  return Object.freeze({ ...input });
}

export function createTrainingAcademicMissionPrerequisite(
  input: TrainingAcademicMissionPrerequisite,
): TrainingAcademicMissionPrerequisite {
  assertNonEmptyString(input.prerequisiteId, "prerequisiteId");
  assertNonEmptyString(input.institutionId, "institutionId");
  assertNonEmptyString(input.missionId, "missionId");
  assertNonEmptyString(input.missionCode, "missionCode");

  if (!isTrainingAcademicProgressStage(input.minimumProgressStage)) {
    throw new Error("minimumProgressStage must be a supported academic progress stage");
  }

  if (!isTrainingTrustLevel(input.minimumTrustLevel)) {
    throw new Error("minimumTrustLevel must be a supported training trust level");
  }

  return Object.freeze({
    ...input,
    reasonCodes: freezeReadonlyArray(input.reasonCodes),
  });
}

export function createTrainingTrustMarker(
  input: TrainingTrustMarker,
): TrainingTrustMarker {
  assertNonEmptyString(input.markerId, "markerId");
  assertNonEmptyString(input.institutionId, "institutionId");
  assertNonEmptyString(input.awardedAtIso, "awardedAtIso");
  assertIso8601Timestamp(input.awardedAtIso, "awardedAtIso");

  if (!isTrainingTrustLevel(input.trustLevel)) {
    throw new Error("trustLevel must be a supported training trust level");
  }

  if (!isTrainingTrustMarkerSource(input.source)) {
    throw new Error("source must be a supported training trust marker source");
  }

  return Object.freeze({
    ...input,
    reasonCodes: freezeReadonlyArray(input.reasonCodes),
  });
}

export function createTrainingSchoolProgression(
  input: TrainingSchoolProgression,
): TrainingSchoolProgression {
  assertNonEmptyString(input.progressionId, "progressionId");
  assertNonEmptyString(input.schoolInstitutionId, "schoolInstitutionId");
  assertNonEmptyString(input.updatedAtIso, "updatedAtIso");
  assertValidUpdatedAtIso(input.updatedAtIso);

  if (!isTrainingAcademicProgressStage(input.stage)) {
    throw new Error("stage must be a supported academic progress stage");
  }

  if (!isMccExpressionTrack(input.leaning)) {
    throw new Error("leaning must be a supported MCC expression track");
  }

  return Object.freeze({
    ...input,
    missionPrerequisites: freezeReadonlyArray(
      input.missionPrerequisites.map(createTrainingAcademicMissionPrerequisite),
    ),
    trustMarkers: freezeReadonlyArray(
      input.trustMarkers.map(createTrainingTrustMarker),
    ),
  });
}

export function createTrainingAcademyAdmission(
  input: TrainingAcademyAdmission,
): TrainingAcademyAdmission {
  assertNonEmptyString(input.admissionId, "admissionId");
  assertNonEmptyString(input.schoolInstitutionId, "schoolInstitutionId");
  assertNonEmptyString(input.academyInstitutionId, "academyInstitutionId");
  assertNonEmptyString(input.evaluatedAtIso, "evaluatedAtIso");
  assertIso8601Timestamp(input.evaluatedAtIso, "evaluatedAtIso");

  if (!isMccExpressionTrack(input.desiredTrack)) {
    throw new Error("desiredTrack must be a supported MCC expression track");
  }

  if (!isTrainingAcademyAdmissionDecision(input.decision)) {
    throw new Error("decision must be a supported academy admission decision");
  }

  return Object.freeze({
    ...input,
    missionPrerequisites: freezeReadonlyArray(
      input.missionPrerequisites.map(createTrainingAcademicMissionPrerequisite),
    ),
    supportingTrustMarkerIds: freezeReadonlyArray(input.supportingTrustMarkerIds),
    reasonCodes: freezeReadonlyArray(input.reasonCodes),
  });
}

export function createTrainingTrackSelection(
  input: TrainingTrackSelection,
): TrainingTrackSelection {
  assertNonEmptyString(input.selectionId, "selectionId");
  assertNonEmptyString(input.institutionId, "institutionId");
  assertNonEmptyString(input.updatedAtIso, "updatedAtIso");
  assertValidUpdatedAtIso(input.updatedAtIso);

  if (!isMccExpressionTrack(input.leaning)) {
    throw new Error("leaning must be a supported MCC expression track");
  }

  if (!isMccExpressionTrack(input.selectedTrack)) {
    throw new Error("selectedTrack must be a supported MCC expression track");
  }

  if (!isTrainingInstructionAccessLevel(input.instructionAccess)) {
    throw new Error("instructionAccess must be a supported instruction access level");
  }

  if (!isTrainingTechniqueMasteryState(input.techniqueMastery)) {
    throw new Error("techniqueMastery must be a supported technique mastery state");
  }

  return Object.freeze({
    ...input,
    reasonCodes: freezeReadonlyArray(input.reasonCodes),
  });
}

export function createTrainingApprenticeshipSponsorship(
  input: TrainingApprenticeshipSponsorship,
): TrainingApprenticeshipSponsorship {
  assertNonEmptyString(input.sponsorshipId, "sponsorshipId");
  assertNonEmptyString(
    input.apprenticeshipInstitutionId,
    "apprenticeshipInstitutionId",
  );
  assertNonEmptyString(input.sponsorId, "sponsorId");
  assertNonEmptyString(input.professionId, "professionId");
  assertNonEmptyString(input.grantedAtIso, "grantedAtIso");
  assertIso8601Timestamp(input.grantedAtIso, "grantedAtIso");

  if (!isMccExpressionTrack(input.sponsoredTrack)) {
    throw new Error("sponsoredTrack must be a supported MCC expression track");
  }

  if (!isTrainingTrustLevel(input.trustLevel)) {
    throw new Error("trustLevel must be a supported training trust level");
  }

  return Object.freeze({
    ...input,
    missionRequirementCodes: freezeReadonlyArray(input.missionRequirementCodes),
    reasonCodes: freezeReadonlyArray(input.reasonCodes),
  });
}

export function createTrainingApprenticeshipSupervision(
  input: TrainingApprenticeshipSupervision,
): TrainingApprenticeshipSupervision {
  assertNonEmptyString(input.supervisionId, "supervisionId");
  assertNonEmptyString(
    input.apprenticeshipInstitutionId,
    "apprenticeshipInstitutionId",
  );
  assertNonEmptyString(input.supervisorId, "supervisorId");
  assertNonEmptyString(input.professionId, "professionId");
  assertNonEmptyString(input.startedAtIso, "startedAtIso");
  assertNonEmptyString(input.checkpointAtIso, "checkpointAtIso");
  assertIso8601Timestamp(input.startedAtIso, "startedAtIso");
  assertIso8601Timestamp(input.checkpointAtIso, "checkpointAtIso");

  if (!isTrainingApprenticeshipSupervisionMode(input.supervisionMode)) {
    throw new Error(
      "supervisionMode must be a supported apprenticeship supervision mode",
    );
  }

  if (!isMccExpressionTrack(input.focusTrack)) {
    throw new Error("focusTrack must be a supported MCC expression track");
  }

  return Object.freeze({
    ...input,
    taskCodes: freezeReadonlyArray(input.taskCodes),
    reasonCodes: freezeReadonlyArray(input.reasonCodes),
  });
}

export function createTrainingApprenticeshipReadiness(
  input: TrainingApprenticeshipReadiness,
): TrainingApprenticeshipReadiness {
  assertNonEmptyString(input.readinessId, "readinessId");
  assertNonEmptyString(
    input.apprenticeshipInstitutionId,
    "apprenticeshipInstitutionId",
  );
  assertNonEmptyString(input.professionId, "professionId");
  assertNonEmptyString(input.sponsorshipId, "sponsorshipId");
  assertNonEmptyString(input.updatedAtIso, "updatedAtIso");
  assertValidUpdatedAtIso(input.updatedAtIso);

  if (!isTrainingApprenticeshipReadinessStage(input.stage)) {
    throw new Error("stage must be a supported apprenticeship readiness stage");
  }

  if (!isTrainingApprenticeshipOutputState(input.outputState)) {
    throw new Error("outputState must be a supported apprenticeship output state");
  }

  if (input.readyForHandoff && input.stage !== "handoff-ready") {
    throw new Error("readyForHandoff requires the handoff-ready apprenticeship stage");
  }

  if (input.stage === "handoff-ready" && !input.readyForHandoff) {
    throw new Error("handoff-ready apprenticeship stage must set readyForHandoff");
  }

  const supportedAuthorityIds = freezeValidatedReadonlyArray(
    input.supportedAuthorityIds,
    isTrainingCraftingAuthorityId,
    "supportedAuthorityIds",
  );

  if (input.readyForHandoff && supportedAuthorityIds.length === 0) {
    throw new Error(
      "supportedAuthorityIds must contain at least one supported crafting authority when readyForHandoff is true",
    );
  }

  return Object.freeze({
    ...input,
    supportedAuthorityIds,
    reasonCodes: freezeReadonlyArray(input.reasonCodes),
  });
}

export function createTrainingCraftingAuthorityHandoff(
  input: TrainingCraftingAuthorityHandoff,
): TrainingCraftingAuthorityHandoff {
  assertNonEmptyString(input.handoffId, "handoffId");
  assertNonEmptyString(input.readinessId, "readinessId");
  assertNonEmptyString(input.professionId, "professionId");

  if (!isTrainingCraftingAuthorityId(input.authorityId)) {
    throw new Error("authorityId must be a supported crafting authority id");
  }

  if (!isTrainingApprenticeshipReadinessStage(input.apprenticeshipStage)) {
    throw new Error(
      "apprenticeshipStage must be a supported apprenticeship readiness stage",
    );
  }

  if (!isTrainingApprenticeshipOutputState(input.outputState)) {
    throw new Error("outputState must be a supported apprenticeship output state");
  }

  if (input.eligible && input.apprenticeshipStage !== "handoff-ready") {
    throw new Error("eligible handoffs require the handoff-ready apprenticeship stage");
  }

  return Object.freeze({
    ...input,
    reasonCodes: freezeReadonlyArray(input.reasonCodes),
  });
}

export function createTrainingBarracksDrill(
  input: TrainingBarracksDrill,
): TrainingBarracksDrill {
  assertNonEmptyString(input.drillId, "drillId");
  assertNonEmptyString(input.institutionId, "institutionId");
  assertNonEmptyString(input.title, "title");

  if (!isTrainingMartialTechniqueTrack(input.track)) {
    throw new Error("track must be an internalized or hybrid martial technique track");
  }

  if (!isTrainingMartialTechniqueFamily(input.techniqueFamily)) {
    throw new Error("techniqueFamily must be a supported martial technique family");
  }

  if (!isTrainingBarracksDrillDeliveryMode(input.deliveryMode)) {
    throw new Error("deliveryMode must be a supported barracks drill delivery mode");
  }

  return Object.freeze({
    ...input,
    missionPrerequisiteCodes: freezeReadonlyArray(input.missionPrerequisiteCodes),
    antiSpellFamilies: freezeValidatedReadonlyArray(
      input.antiSpellFamilies,
      isTrainingAntiSpellFieldcraftFamily,
      "antiSpellFamilies",
    ),
  });
}

export function createTrainingMissionTechniqueUnlock(
  input: TrainingMissionTechniqueUnlock,
): TrainingMissionTechniqueUnlock {
  assertNonEmptyString(input.unlockId, "unlockId");
  assertNonEmptyString(input.missionId, "missionId");
  assertNonEmptyString(input.techniqueId, "techniqueId");
  assertNonEmptyString(input.institutionId, "institutionId");
  assertNonEmptyString(input.unlockedAtIso, "unlockedAtIso");
  assertValidIsoTimestamp(input.unlockedAtIso, "unlockedAtIso");

  if (!isTrainingMartialTechniqueTrack(input.track)) {
    throw new Error("track must be an internalized or hybrid martial technique track");
  }

  if (!isTrainingMartialTechniqueFamily(input.techniqueFamily)) {
    throw new Error("techniqueFamily must be a supported martial technique family");
  }

  return Object.freeze({
    ...input,
    reasonCodes: freezeReadonlyArray(input.reasonCodes),
  });
}

export function createTrainingMartialTechnique(
  input: TrainingMartialTechnique,
): TrainingMartialTechnique {
  assertNonEmptyString(input.techniqueId, "techniqueId");
  assertNonEmptyString(input.institutionId, "institutionId");
  assertNonEmptyString(input.title, "title");
  assertNonEmptyString(input.expressionNote, "expressionNote");

  if (!isTrainingMartialTechniqueTrack(input.track)) {
    throw new Error("track must be an internalized or hybrid martial technique track");
  }

  if (!isTrainingMartialTechniqueFamily(input.family)) {
    throw new Error("family must be a supported martial technique family");
  }

  if (
    input.antiSpellFamily !== undefined
    && !isTrainingAntiSpellFieldcraftFamily(input.antiSpellFamily)
  ) {
    throw new Error("antiSpellFamily must be a supported bounded anti-spell family");
  }

  return Object.freeze({ ...input });
}

export function createTrainingAntiSpellFieldcraftDiscipline(
  input: TrainingAntiSpellFieldcraftDiscipline,
): TrainingAntiSpellFieldcraftDiscipline {
  assertNonEmptyString(input.disciplineId, "disciplineId");
  assertNonEmptyString(input.institutionId, "institutionId");
  assertNonEmptyString(input.title, "title");

  if (!isTrainingMartialTechniqueTrack(input.track)) {
    throw new Error("track must be an internalized or hybrid martial technique track");
  }

  if (!isTrainingAntiSpellFieldcraftFamily(input.family)) {
    throw new Error("family must be a supported bounded anti-spell family");
  }

  return Object.freeze({
    ...input,
    boundedCounterWindows: freezeValidatedReadonlyArray(
      input.boundedCounterWindows,
      isTrainingAntiSpellCounterWindow,
      "boundedCounterWindows",
    ),
    prohibitedCapabilityCodes: freezeReadonlyArray(input.prohibitedCapabilityCodes),
  });
}

export function createTrainingScaleAssumptions(
  input: TrainingScaleAssumptions
): TrainingScaleAssumptions {
  assertPositiveSafeInteger(
    input.maxLearnersPerInstitution,
    "maxLearnersPerInstitution"
  );
  assertPositiveSafeInteger(
    input.maxConcurrentInstitutionEvaluations,
    "maxConcurrentInstitutionEvaluations"
  );
  assertPositiveSafeInteger(
    input.maxProgressionEventsPerMinute,
    "maxProgressionEventsPerMinute"
  );

  return Object.freeze({ ...input });
}
