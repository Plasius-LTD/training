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

export interface TrainingInstitution {
  readonly institutionId: string;
  readonly type: TrainingInstitutionType;
  readonly track: MccExpressionTrack;
  readonly eligible: boolean;
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

export function isMccExpressionTrack(value: string): value is MccExpressionTrack {
  return value === "internalized" || value === "externalized" || value === "hybrid";
}

export function createTrainingInstitution(
  input: TrainingInstitution
): TrainingInstitution {
  return Object.freeze({ ...input });
}
