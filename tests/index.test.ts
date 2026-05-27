import {
  TRAINING_FEATURE_FLAG_ID,
  createTrainingInstitution,
  createTrainingMutationReliabilityPolicy,
  createTrainingStateTransitionEvent,
  isMccExpressionTrack,
  packageDescriptor,
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

  it("creates immutable reliability policy metadata", () => {
    const policy = createTrainingMutationReliabilityPolicy({
      timeoutMs: 1500,
      cancellationWindowMs: 250,
      maxRetryAttempts: 2,
      recoverableFailureCodes: ["TRAINING_TIMEOUT"],
      terminalFailureCodes: ["TRACK_MISMATCH"],
    });

    expect(policy.maxRetryAttempts).toBe(2);
    expect(() => {
      (policy.recoverableFailureCodes as string[]).push("NOPE");
    }).toThrow();
  });

  it("creates transition observability events", () => {
    const event = createTrainingStateTransitionEvent({
      transitionId: "transition-1",
      institutionId: "academy-1",
      transitionType: "track-changed",
      outcome: "committed",
      fromTrack: "internalized",
      toTrack: "hybrid",
      observedAt: "2026-05-21T00:00:00.000Z",
    });

    expect(event.transitionType).toBe("track-changed");
    expect(event.toTrack).toBe("hybrid");
  });
});
