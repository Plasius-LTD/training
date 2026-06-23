import {
  TRAINING_FEATURE_FLAG_ID,
  TRAINING_MARTIAL_FEATURE_FLAG_ID,
  TRAINING_MARTIAL_TECHNIQUE_TRACKS,
  TRAINING_BARRACKS_DRILL_DELIVERY_MODES,
  TRAINING_MARTIAL_TECHNIQUE_FAMILIES,
  TRAINING_ANTI_SPELL_FIELDCRAFT_FAMILIES,
  TRAINING_ANTI_SPELL_COUNTER_WINDOWS,
  TRAINING_PRIVACY_SCALE_FEATURE_FLAG_ID,
  createTrainingAntiSpellFieldcraftDiscipline,
  createTrainingBarracksDrill,
  createTrainingInstitution,
  createTrainingMartialTechnique,
  createTrainingMissionTechniqueUnlock,
  createTrainingMutationReliabilityPolicy,
  createTrainingProgressionRecord,
  createTrainingScaleAssumptions,
  createTrainingStateTransitionEvent,
  defaultTrainingScaleAssumptions,
  isTrainingAntiSpellCounterWindow,
  isTrainingAntiSpellFieldcraftFamily,
  isTrainingBarracksDrillDeliveryMode,
  isTrainingMartialTechniqueFamily,
  isTrainingMartialTechniqueTrack,
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

  it("exports the martial feature flag and bounded doctrine lists", () => {
    expect(TRAINING_MARTIAL_FEATURE_FLAG_ID).toBe(
      "isekai.training.martial.enabled"
    );
    expect(TRAINING_MARTIAL_TECHNIQUE_TRACKS).toEqual([
      "internalized",
      "hybrid",
    ]);
    expect(TRAINING_BARRACKS_DRILL_DELIVERY_MODES).toEqual([
      "drill",
      "sparring",
      "service-obligation",
      "supervised-mission",
      "rank-authorization",
    ]);
    expect(TRAINING_MARTIAL_TECHNIQUE_FAMILIES).toContain(
      "anti-spell-parry"
    );
    expect(TRAINING_ANTI_SPELL_FIELDCRAFT_FAMILIES).toEqual([
      "interruption",
      "concentration-breaking",
      "projectile-deflection",
      "ward-stress",
      "grounding",
    ]);
    expect(TRAINING_ANTI_SPELL_COUNTER_WINDOWS).toEqual([
      "timing",
      "delivery",
      "stability",
    ]);
  });

  it("guards valid martial doctrine vocabularies", () => {
    expect(isTrainingMartialTechniqueTrack("internalized")).toBe(true);
    expect(isTrainingMartialTechniqueTrack("externalized")).toBe(false);
    expect(isTrainingBarracksDrillDeliveryMode("sparring")).toBe(true);
    expect(isTrainingBarracksDrillDeliveryMode("lecture")).toBe(false);
    expect(isTrainingMartialTechniqueFamily("mobility-strike")).toBe(true);
    expect(isTrainingMartialTechniqueFamily("spell-catalogue")).toBe(false);
    expect(isTrainingAntiSpellFieldcraftFamily("ward-stress")).toBe(true);
    expect(isTrainingAntiSpellFieldcraftFamily("total-nullification")).toBe(
      false
    );
    expect(isTrainingAntiSpellCounterWindow("delivery")).toBe(true);
    expect(isTrainingAntiSpellCounterWindow("permanence")).toBe(false);
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

  it("creates frozen barracks drill and mission-earned unlock models", () => {
    const drill = createTrainingBarracksDrill({
      drillId: "drill-1",
      institutionId: "barracks-1",
      title: "Shield-line breach drill",
      track: "internalized",
      techniqueFamily: "shield-reinforcement",
      deliveryMode: "drill",
      missionPrerequisiteCodes: ["frontier-patrol-cleared"],
      antiSpellFamilies: ["projectile-deflection", "grounding"],
    });
    const unlock = createTrainingMissionTechniqueUnlock({
      unlockId: "unlock-1",
      missionId: "mission-1",
      techniqueId: "technique-1",
      institutionId: "barracks-1",
      track: "hybrid",
      techniqueFamily: "mobility-strike",
      unlockedAtIso: "2026-06-23T06:30:00.000Z",
      reasonCodes: ["mission-earned", "captain-sponsorship"],
    });

    expect(drill.track).toBe("internalized");
    expect(drill.antiSpellFamilies).toEqual([
      "projectile-deflection",
      "grounding",
    ]);
    expect(unlock.techniqueFamily).toBe("mobility-strike");
    expect(Object.isFrozen(drill)).toBe(true);
    expect(Object.isFrozen(drill.antiSpellFamilies)).toBe(true);
    expect(Object.isFrozen(unlock.reasonCodes)).toBe(true);
  });

  it("creates frozen martial technique and bounded anti-spell discipline models", () => {
    const technique = createTrainingMartialTechnique({
      techniqueId: "technique-1",
      institutionId: "barracks-1",
      title: "Ward-breaking lunge",
      track: "hybrid",
      family: "ward-breaking-attack",
      antiSpellFamily: "ward-stress",
      expressionNote:
        "Routes a committed MCC pattern from stance through weapon into a bounded ward-breaking strike.",
    });
    const antiSpellDiscipline = createTrainingAntiSpellFieldcraftDiscipline({
      disciplineId: "discipline-1",
      institutionId: "barracks-1",
      title: "Anchor-cut grounding",
      track: "internalized",
      family: "grounding",
      boundedCounterWindows: ["delivery", "stability"],
      prohibitedCapabilityCodes: [
        "generic-magic-cancellation",
        "unbounded-nullification",
      ],
    });

    expect(technique.antiSpellFamily).toBe("ward-stress");
    expect(antiSpellDiscipline.family).toBe("grounding");
    expect(antiSpellDiscipline.boundedCounterWindows).toEqual([
      "delivery",
      "stability",
    ]);
    expect(Object.isFrozen(technique)).toBe(true);
    expect(Object.isFrozen(antiSpellDiscipline)).toBe(true);
    expect(Object.isFrozen(antiSpellDiscipline.boundedCounterWindows)).toBe(
      true
    );
  });

  it("rejects incomplete progression identity fields", () => {
    expect(() =>
      createTrainingProgressionRecord({
        playerSubjectId: "",
        institutionId: "academy-1",
        track: "hybrid",
        trustLevel: "trusted",
        eligible: true,
        updatedAtIso: "2026-05-20T00:00:00.000Z",
      })
    ).toThrow("playerSubjectId must be a non-empty string");
  });

  it("rejects unsupported progression tracks", () => {
    expect(() =>
      createTrainingProgressionRecord({
        playerSubjectId: "player-sub-1",
        institutionId: "academy-1",
        track: "unsupported" as never,
        trustLevel: "trusted",
        eligible: true,
        updatedAtIso: "2026-05-20T00:00:00.000Z",
      })
    ).toThrow("track must be a supported MCC expression track");
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

  it("rejects invalid martial doctrine payloads", () => {
    expect(() =>
      createTrainingBarracksDrill({
        drillId: "drill-1",
        institutionId: "barracks-1",
        title: "Invalid externalized drill",
        track: "externalized" as never,
        techniqueFamily: "stance",
        deliveryMode: "drill",
        missionPrerequisiteCodes: [],
        antiSpellFamilies: [],
      })
    ).toThrow("track must be an internalized or hybrid martial technique track");

    expect(() =>
      createTrainingMissionTechniqueUnlock({
        unlockId: "unlock-1",
        missionId: "mission-1",
        techniqueId: "technique-1",
        institutionId: "barracks-1",
        track: "hybrid",
        techniqueFamily: "mobility-strike",
        unlockedAtIso: "invalid",
        reasonCodes: [],
      })
    ).toThrow("updatedAtIso must be an ISO-8601 timestamp");

    expect(() =>
      createTrainingMartialTechnique({
        techniqueId: "technique-1",
        institutionId: "barracks-1",
        title: "Unbounded anti-spell",
        track: "hybrid",
        family: "anti-spell-parry",
        antiSpellFamily: "total-nullification" as never,
        expressionNote: "invalid",
      })
    ).toThrow("antiSpellFamily must be a supported bounded anti-spell family");

    expect(() =>
      createTrainingAntiSpellFieldcraftDiscipline({
        disciplineId: "discipline-1",
        institutionId: "barracks-1",
        title: "Invalid fieldcraft",
        track: "internalized",
        family: "grounding",
        boundedCounterWindows: ["permanence" as never],
        prohibitedCapabilityCodes: [],
      })
    ).toThrow("boundedCounterWindows contains an unsupported value");
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
