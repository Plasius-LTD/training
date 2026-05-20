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

export const TRAINING_PACKAGE = "@plasius/training";
export const TRAINING_ENV_PREFIX = "TRAINING";
export const TRAINING_FEATURE_FLAG_ID = "isekai.training.institutions.enabled";
export const TRAINING_PRIVACY_SCALE_FEATURE_FLAG_ID =
  "isekai.training-progression.privacy-scale.enabled";
export const TRAINING_PRIVACY_SCALE_ENV_OVERRIDE =
  "TRAINING_PRIVACY_SCALE_ENABLED";

export const packageDescriptor: PackageDescriptor = Object.freeze({
  packageName: TRAINING_PACKAGE,
  featureFlagId: TRAINING_FEATURE_FLAG_ID,
  envPrefix: TRAINING_ENV_PREFIX,
  summary:
    "Institutional training, trust, and specialization contracts for Plasius game progression.",
});

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

export function isTrainingTrustLevel(value: string): value is TrainingTrustLevel {
  return value === "provisional" || value === "trusted" || value === "restricted";
}

export function createTrainingInstitution(
  input: TrainingInstitution
): TrainingInstitution {
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
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/;

function assertValidUpdatedAtIso(value: string): void {
  if (!iso8601DateRegex.test(value) || Number.isNaN(Date.parse(value))) {
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
