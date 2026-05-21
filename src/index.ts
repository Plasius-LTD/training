export interface PackageDescriptor {
  readonly packageName: string;
  readonly featureFlagId: string;
  readonly envPrefix: string;
  readonly summary: string;
}

export type TrainingInstitutionType =
  | "school"
  | "barracks"
  | "academy"
  | "apprenticeship";

export type MccExpressionTrack = "internalized" | "externalized" | "hybrid";

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

export const TRAINING_PACKAGE = "@plasius/training";
export const TRAINING_ENV_PREFIX = "TRAINING";
export const TRAINING_FEATURE_FLAG_ID = "isekai.training.institutions.enabled";

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

export function isMccExpressionTrack(value: string): value is MccExpressionTrack {
  return value === "internalized" || value === "externalized" || value === "hybrid";
}

export function createTrainingInstitution(
  input: TrainingInstitution
): TrainingInstitution {
  return Object.freeze({ ...input });
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
