import {
  TRAINING_FEATURE_FLAG_ID,
  TRAINING_PRIVACY_SCALE_FEATURE_FLAG_ID,
  createTrainingInstitution,
  createTrainingProgressionRecord,
  createTrainingScaleAssumptions,
  defaultTrainingScaleAssumptions,
  isTrainingTrustLevel,
  isMccExpressionTrack,
  packageDescriptor,
  trainingPrivacyScaleRollout,
  trainingProgressionFieldPolicies,
} from "../src/index.js";

describe("@plasius/training", () => {
  it("exports the package descriptor", () => {
    expect(packageDescriptor.packageName).toBe("@plasius/training");
    expect(packageDescriptor.featureFlagId).toBe(TRAINING_FEATURE_FLAG_ID);
  });

  it("creates a training institution", () => {
    const institution = createTrainingInstitution({
      institutionId: "barracks-1",
      type: "barracks",
      track: "internalized",
      eligible: true,
    });

    expect(institution.type).toBe("barracks");
  });

  it("guards valid specialization tracks", () => {
    expect(isMccExpressionTrack("hybrid")).toBe(true);
    expect(isMccExpressionTrack("invalid")).toBe(false);
  });

  it("exports the privacy and scale rollout metadata", () => {
    expect(trainingPrivacyScaleRollout.featureFlagId).toBe(
      TRAINING_PRIVACY_SCALE_FEATURE_FLAG_ID
    );
    expect(trainingPrivacyScaleRollout.envOverride).toBe(
      "TRAINING_PRIVACY_SCALE_ENABLED"
    );
  });

  it("documents a minimized progression field policy", () => {
    expect(trainingProgressionFieldPolicies).toEqual([
      expect.objectContaining({
        field: "playerSubjectId",
        sensitivity: "pseudonymous",
      }),
      expect.objectContaining({
        field: "institutionId",
      }),
      expect.objectContaining({
        field: "track",
      }),
      expect.objectContaining({
        field: "trustLevel",
      }),
      expect.objectContaining({
        field: "eligible",
      }),
      expect.objectContaining({
        field: "updatedAtIso",
        retention: "short-lived",
      }),
    ]);
  });

  it("creates a minimal training progression record", () => {
    const record = createTrainingProgressionRecord({
      playerSubjectId: "player-sub-1",
      institutionId: "academy-1",
      track: "hybrid",
      trustLevel: "trusted",
      eligible: true,
      updatedAtIso: "2026-05-20T00:00:00.000Z",
    });

    expect(record.playerSubjectId).toBe("player-sub-1");
    expect(record.trustLevel).toBe("trusted");
  });

  it("rejects unsupported trust levels", () => {
    expect(isTrainingTrustLevel("trusted")).toBe(true);
    expect(isTrainingTrustLevel("unknown")).toBe(false);
    expect(() =>
      createTrainingProgressionRecord({
        playerSubjectId: "player-sub-1",
        institutionId: "academy-1",
        track: "hybrid",
        trustLevel: "unknown" as never,
        eligible: true,
        updatedAtIso: "2026-05-20T00:00:00.000Z",
      })
    ).toThrow("trustLevel must be a supported training trust level");
  });

  it("rejects invalid progression timestamps", () => {
    expect(() =>
      createTrainingProgressionRecord({
        playerSubjectId: "player-sub-1",
        institutionId: "academy-1",
        track: "hybrid",
        trustLevel: "trusted",
        eligible: true,
        updatedAtIso: "2026-02-31T00:00:00.000Z",
      })
    ).toThrow("updatedAtIso must be an ISO-8601 timestamp");

    expect(() =>
      createTrainingProgressionRecord({
        playerSubjectId: "player-sub-1",
        institutionId: "academy-1",
        track: "hybrid",
        trustLevel: "trusted",
        eligible: true,
        updatedAtIso: "not-a-date",
      })
    ).toThrow("updatedAtIso must be an ISO-8601 timestamp");
  });

  it("validates positive scale assumptions", () => {
    expect(defaultTrainingScaleAssumptions.maxLearnersPerInstitution).toBe(5_000);

    const scaleAssumptions = createTrainingScaleAssumptions({
      maxLearnersPerInstitution: 8_000,
      maxConcurrentInstitutionEvaluations: 400,
      maxProgressionEventsPerMinute: 25_000,
    });

    expect(scaleAssumptions.maxConcurrentInstitutionEvaluations).toBe(400);
    expect(() =>
      createTrainingScaleAssumptions({
        maxLearnersPerInstitution: 0,
        maxConcurrentInstitutionEvaluations: 400,
        maxProgressionEventsPerMinute: 25_000,
      })
    ).toThrow("maxLearnersPerInstitution must be a positive safe integer");
  });
});
