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
export type TrainingFieldSensitivity = "pseudonymous" | "internal";
export type TrainingFieldRetention = "authoritative-progression" | "short-lived";
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
export const TRAINING_FEATURE_FLAG_ID = "isekai.training.institutions.enabled";
export const TRAINING_MARTIAL_FEATURE_FLAG_ID = "isekai.training.martial.enabled";
export const TRAINING_PRIVACY_SCALE_FEATURE_FLAG_ID =
  "isekai.training-progression.privacy-scale.enabled";
export const TRAINING_PRIVACY_SCALE_ENV_OVERRIDE =
  "TRAINING_PRIVACY_SCALE_ENABLED";
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

export function isTrainingMartialTechniqueTrack(
  value: string,
): value is TrainingMartialTechniqueTrack {
  return (TRAINING_MARTIAL_TECHNIQUE_TRACKS as readonly string[]).includes(value);
}

export function isTrainingTrustLevel(value: string): value is TrainingTrustLevel {
  return value === "provisional" || value === "trusted" || value === "restricted";
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
  return Object.freeze({
    ...input,
    recoverableFailureCodes: freezeReadonlyArray(input.recoverableFailureCodes),
    terminalFailureCodes: freezeReadonlyArray(input.terminalFailureCodes),
  });
}

export function createTrainingStateTransitionEvent(
  input: TrainingStateTransitionEvent
): TrainingStateTransitionEvent {
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

const iso8601DateRegex =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/;

function getDaysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function assertValidUpdatedAtIso(value: string): void {
  const match = iso8601DateRegex.exec(value);
  if (!match || Number.isNaN(Date.parse(value))) {
    throw new Error("updatedAtIso must be an ISO-8601 timestamp");
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
    throw new Error("updatedAtIso must be an ISO-8601 timestamp");
  }
}

export function createTrainingProgressionRecord(
  input: TrainingProgressionRecord
): TrainingProgressionRecord {
  assertNonEmptyString(input.playerSubjectId, "playerSubjectId");
  assertNonEmptyString(input.institutionId, "institutionId");
  assertNonEmptyString(input.updatedAtIso, "updatedAtIso");
  assertValidUpdatedAtIso(input.updatedAtIso);

  if (!isMccExpressionTrack(input.track)) {
    throw new Error("track must be a supported MCC expression track");
  }

  if (!isTrainingTrustLevel(input.trustLevel)) {
    throw new Error("trustLevel must be a supported training trust level");
  }

  return Object.freeze({ ...input });
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
  assertValidUpdatedAtIso(input.unlockedAtIso);

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
