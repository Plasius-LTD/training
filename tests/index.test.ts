import {
  TRAINING_ACADEMIES_FEATURE_FLAG_ID,
  TRAINING_APPRENTICESHIP_FEATURE_FLAG_ID,
  TRAINING_APPRENTICESHIP_OUTPUT_STATES,
  TRAINING_APPRENTICESHIP_READINESS_STAGES,
  TRAINING_APPRENTICESHIP_SUPERVISION_MODES,
  TRAINING_TRUST_MARKER_SOURCES,
  TRAINING_ACADEMIC_PROGRESS_STAGES,
  TRAINING_ACADEMY_ADMISSION_DECISIONS,
  TRAINING_CRAFTING_AUTHORITY_IDS,
  TRAINING_INSTRUCTION_ACCESS_LEVELS,
  TRAINING_TECHNIQUE_MASTERY_STATES,
  TRAINING_FEATURE_FLAG_ID,
  TRAINING_MARTIAL_FEATURE_FLAG_ID,
  TRAINING_MARTIAL_TECHNIQUE_TRACKS,
  TRAINING_BARRACKS_DRILL_DELIVERY_MODES,
  TRAINING_MARTIAL_TECHNIQUE_FAMILIES,
  TRAINING_ANTI_SPELL_FIELDCRAFT_FAMILIES,
  TRAINING_ANTI_SPELL_COUNTER_WINDOWS,
  TRAINING_PRIVACY_SCALE_FEATURE_FLAG_ID,
  createTrainingAcademicMissionPrerequisite,
  createTrainingAcademyAdmission,
  createTrainingAntiSpellFieldcraftDiscipline,
  createTrainingApprenticeshipReadiness,
  createTrainingApprenticeshipSupervision,
  createTrainingApprenticeshipSponsorship,
  createTrainingBarracksDrill,
  createTrainingCraftingAuthorityHandoff,
  createTrainingInstitution,
  createTrainingMartialTechnique,
  createTrainingMissionTechniqueUnlock,
  createTrainingMutationReliabilityPolicy,
  createTrainingProgressionRecord,
  createTrainingScaleAssumptions,
  createTrainingSchoolProgression,
  createTrainingStateTransitionEvent,
  createTrainingTrackSelection,
  createTrainingTrustMarker,
  defaultTrainingScaleAssumptions,
  isTrainingAcademicProgressStage,
  isTrainingAcademyAdmissionDecision,
  isTrainingAntiSpellCounterWindow,
  isTrainingAntiSpellFieldcraftFamily,
  isTrainingApprenticeshipOutputState,
  isTrainingApprenticeshipReadinessStage,
  isTrainingApprenticeshipSupervisionMode,
  isTrainingBarracksDrillDeliveryMode,
  isTrainingCraftingAuthorityId,
  isTrainingInstructionAccessLevel,
  isTrainingMartialTechniqueFamily,
  isTrainingMartialTechniqueTrack,
  isTrainingTechniqueMasteryState,
  isTrainingTrustMarkerSource,
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

  it("exports the academies feature flag and academic progression vocabularies", () => {
    expect(TRAINING_ACADEMIES_FEATURE_FLAG_ID).toBe(
      "isekai.training.academies.enabled"
    );
    expect(TRAINING_TRUST_MARKER_SOURCES).toEqual([
      "system",
      "mission",
      "institution",
      "sponsor",
    ]);
    expect(TRAINING_ACADEMIC_PROGRESS_STAGES).toEqual([
      "school-foundation",
      "school-advanced",
      "academy-candidate",
      "academy-admitted",
      "track-specialized",
    ]);
    expect(TRAINING_ACADEMY_ADMISSION_DECISIONS).toEqual([
      "candidate",
      "admitted",
      "waitlisted",
      "deferred",
    ]);
    expect(TRAINING_INSTRUCTION_ACCESS_LEVELS).toEqual([
      "not-authorized",
      "school-foundation",
      "academy-provisional",
      "academy-specialization",
    ]);
    expect(TRAINING_TECHNIQUE_MASTERY_STATES).toEqual([
      "not-started",
      "guided",
      "field-tested",
      "validated",
    ]);
  });

  it("exports the apprenticeship feature flag and handoff vocabularies", () => {
    expect(TRAINING_APPRENTICESHIP_FEATURE_FLAG_ID).toBe(
      "isekai.training.apprenticeship.enabled"
    );
    expect(TRAINING_APPRENTICESHIP_READINESS_STAGES).toEqual([
      "candidate",
      "sponsored",
      "supervised-practice",
      "handoff-ready",
    ]);
    expect(TRAINING_APPRENTICESHIP_SUPERVISION_MODES).toEqual([
      "shadowing",
      "assisted-practice",
      "supervised-production",
    ]);
    expect(TRAINING_APPRENTICESHIP_OUTPUT_STATES).toEqual([
      "practice-only",
      "supervised-output",
      "mastered-output",
    ]);
    expect(TRAINING_CRAFTING_AUTHORITY_IDS).toEqual([
      "item-crafting",
      "spellcraft",
      "dungeon-crafting",
    ]);
  });

  it("guards valid apprenticeship vocabularies", () => {
    expect(isTrainingApprenticeshipReadinessStage("handoff-ready")).toBe(true);
    expect(isTrainingApprenticeshipReadinessStage("graduated")).toBe(false);
    expect(isTrainingApprenticeshipSupervisionMode("assisted-practice")).toBe(
      true
    );
    expect(isTrainingApprenticeshipSupervisionMode("solo-production")).toBe(
      false
    );
    expect(isTrainingApprenticeshipOutputState("supervised-output")).toBe(
      true
    );
    expect(isTrainingApprenticeshipOutputState("certified-output")).toBe(false);
    expect(isTrainingCraftingAuthorityId("item-crafting")).toBe(true);
    expect(isTrainingCraftingAuthorityId("commerce")).toBe(false);
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
    expect(isTrainingTrustMarkerSource("mission")).toBe(true);
    expect(isTrainingTrustMarkerSource("unknown")).toBe(false);
    expect(isTrainingAcademicProgressStage("academy-admitted")).toBe(true);
    expect(isTrainingAcademicProgressStage("academy-graduate")).toBe(false);
    expect(isTrainingAcademyAdmissionDecision("waitlisted")).toBe(true);
    expect(isTrainingAcademyAdmissionDecision("approved")).toBe(false);
    expect(isTrainingInstructionAccessLevel("academy-specialization")).toBe(
      true
    );
    expect(isTrainingInstructionAccessLevel("lesson-plan")).toBe(false);
    expect(isTrainingTechniqueMasteryState("field-tested")).toBe(true);
    expect(isTrainingTechniqueMasteryState("mastered")).toBe(false);
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

  it("creates frozen academic mission, trust, admission, and track-selection models", () => {
    const missionPrerequisite = createTrainingAcademicMissionPrerequisite({
      prerequisiteId: "prereq-1",
      institutionId: "school-1",
      missionId: "mission-1",
      missionCode: "academy-entrance",
      minimumProgressStage: "academy-candidate",
      minimumTrustLevel: "provisional",
      satisfied: false,
      reasonCodes: ["complete-entrance-exam"],
    });
    const trustMarker = createTrainingTrustMarker({
      markerId: "marker-1",
      institutionId: "school-1",
      trustLevel: "trusted",
      source: "mission",
      awardedAtIso: "2026-06-28T08:00:00.000Z",
      reasonCodes: ["mission-sponsorship"],
    });
    const schoolProgression = createTrainingSchoolProgression({
      progressionId: "progression-1",
      schoolInstitutionId: "school-1",
      stage: "academy-candidate",
      leaning: "hybrid",
      missionPrerequisites: [missionPrerequisite],
      trustMarkers: [trustMarker],
      updatedAtIso: "2026-06-28T08:30:00.000Z",
    });
    const academyAdmission = createTrainingAcademyAdmission({
      admissionId: "admission-1",
      schoolInstitutionId: "school-1",
      academyInstitutionId: "academy-1",
      desiredTrack: "hybrid",
      decision: "candidate",
      missionPrerequisites: [missionPrerequisite],
      supportingTrustMarkerIds: [trustMarker.markerId],
      evaluatedAtIso: "2026-06-28T09:00:00.000Z",
      reasonCodes: ["pending-academy-board"],
    });
    const trackSelection = createTrainingTrackSelection({
      selectionId: "selection-1",
      institutionId: "academy-1",
      leaning: "hybrid",
      selectedTrack: "externalized",
      instructionAccess: "academy-provisional",
      techniqueMastery: "guided",
      updatedAtIso: "2026-06-28T09:30:00.000Z",
      reasonCodes: ["theory-cleared"],
    });

    expect(missionPrerequisite.minimumProgressStage).toBe("academy-candidate");
    expect(trustMarker.source).toBe("mission");
    expect(schoolProgression.stage).toBe("academy-candidate");
    expect(academyAdmission.decision).toBe("candidate");
    expect(trackSelection.instructionAccess).toBe("academy-provisional");
    expect(trackSelection.techniqueMastery).toBe("guided");
    expect(Object.isFrozen(schoolProgression.missionPrerequisites)).toBe(true);
    expect(Object.isFrozen(schoolProgression.trustMarkers)).toBe(true);
    expect(Object.isFrozen(academyAdmission.reasonCodes)).toBe(true);
    expect(Object.isFrozen(trackSelection.reasonCodes)).toBe(true);
  });

  it("creates frozen apprenticeship sponsorship, supervision, readiness, and handoff models", () => {
    const sponsorship = createTrainingApprenticeshipSponsorship({
      sponsorshipId: "sponsorship-1",
      apprenticeshipInstitutionId: "apprenticeship-1",
      sponsorId: "guild-smith-1",
      professionId: "smithing",
      sponsoredTrack: "hybrid",
      trustLevel: "trusted",
      grantedAtIso: "2026-06-29T08:00:00.000Z",
      missionRequirementCodes: ["complete-forge-observation"],
      reasonCodes: ["mission-earned-sponsorship"],
    });
    const supervision = createTrainingApprenticeshipSupervision({
      supervisionId: "supervision-1",
      apprenticeshipInstitutionId: "apprenticeship-1",
      supervisorId: "master-smith-1",
      professionId: "smithing",
      supervisionMode: "assisted-practice",
      focusTrack: "hybrid",
      startedAtIso: "2026-06-29T09:00:00.000Z",
      checkpointAtIso: "2026-06-29T11:00:00.000Z",
      taskCodes: ["forge-setup", "tool-maintenance"],
      reasonCodes: ["supervisor-cleared"],
    });
    const readiness = createTrainingApprenticeshipReadiness({
      readinessId: "readiness-1",
      apprenticeshipInstitutionId: "apprenticeship-1",
      professionId: "smithing",
      stage: "handoff-ready",
      outputState: "practice-only",
      sponsorshipId: sponsorship.sponsorshipId,
      supervisionId: supervision.supervisionId,
      supportedAuthorityIds: ["item-crafting", "spellcraft"],
      readyForHandoff: true,
      updatedAtIso: "2026-06-29T12:00:00.000Z",
      reasonCodes: ["practice-threshold-cleared"],
    });
    const handoff = createTrainingCraftingAuthorityHandoff({
      handoffId: "handoff-1",
      readinessId: readiness.readinessId,
      authorityId: "item-crafting",
      professionId: "smithing",
      apprenticeshipStage: readiness.stage,
      outputState: readiness.outputState,
      eligible: true,
      reasonCodes: ["external-authority-preserved"],
    });

    expect(sponsorship.sponsoredTrack).toBe("hybrid");
    expect(supervision.supervisionMode).toBe("assisted-practice");
    expect(readiness.outputState).toBe("practice-only");
    expect(readiness.supportedAuthorityIds).toEqual([
      "item-crafting",
      "spellcraft",
    ]);
    expect(handoff.authorityId).toBe("item-crafting");
    expect(Object.isFrozen(sponsorship.missionRequirementCodes)).toBe(true);
    expect(Object.isFrozen(supervision.taskCodes)).toBe(true);
    expect(Object.isFrozen(readiness.supportedAuthorityIds)).toBe(true);
    expect(Object.isFrozen(handoff.reasonCodes)).toBe(true);
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
      createTrainingAcademicMissionPrerequisite({
        prerequisiteId: "prereq-1",
        institutionId: "school-1",
        missionId: "mission-1",
        missionCode: "academy-entrance",
        minimumProgressStage: "academy-graduate" as never,
        minimumTrustLevel: "trusted",
        satisfied: true,
        reasonCodes: [],
      })
    ).toThrow(
      "minimumProgressStage must be a supported academic progress stage"
    );

    expect(() =>
      createTrainingTrustMarker({
        markerId: "marker-1",
        institutionId: "school-1",
        trustLevel: "trusted",
        source: "guild" as never,
        awardedAtIso: "2026-06-28T08:00:00.000Z",
        reasonCodes: [],
      })
    ).toThrow("source must be a supported training trust marker source");

    expect(() =>
      createTrainingAcademyAdmission({
        admissionId: "admission-1",
        schoolInstitutionId: "school-1",
        academyInstitutionId: "academy-1",
        desiredTrack: "hybrid",
        decision: "approved" as never,
        missionPrerequisites: [],
        supportingTrustMarkerIds: [],
        evaluatedAtIso: "2026-06-28T09:00:00.000Z",
        reasonCodes: [],
      })
    ).toThrow("decision must be a supported academy admission decision");

    expect(() =>
      createTrainingTrackSelection({
        selectionId: "selection-1",
        institutionId: "academy-1",
        leaning: "hybrid",
        selectedTrack: "externalized",
        instructionAccess: "lesson-plan" as never,
        techniqueMastery: "guided",
        updatedAtIso: "2026-06-28T09:30:00.000Z",
        reasonCodes: [],
      })
    ).toThrow(
      "instructionAccess must be a supported instruction access level"
    );

    expect(() =>
      createTrainingApprenticeshipSupervision({
        supervisionId: "supervision-1",
        apprenticeshipInstitutionId: "apprenticeship-1",
        supervisorId: "master-smith-1",
        professionId: "smithing",
        supervisionMode: "solo-production" as never,
        focusTrack: "hybrid",
        startedAtIso: "2026-06-29T09:00:00.000Z",
        checkpointAtIso: "2026-06-29T11:00:00.000Z",
        taskCodes: [],
        reasonCodes: [],
      })
    ).toThrow(
      "supervisionMode must be a supported apprenticeship supervision mode"
    );

    expect(() =>
      createTrainingApprenticeshipReadiness({
        readinessId: "readiness-1",
        apprenticeshipInstitutionId: "apprenticeship-1",
        professionId: "smithing",
        stage: "sponsored",
        outputState: "practice-only",
        sponsorshipId: "sponsorship-1",
        supportedAuthorityIds: ["item-crafting"],
        readyForHandoff: true,
        updatedAtIso: "2026-06-29T12:00:00.000Z",
        reasonCodes: [],
      })
    ).toThrow(
      "readyForHandoff requires the handoff-ready apprenticeship stage"
    );

    expect(() =>
      createTrainingApprenticeshipReadiness({
        readinessId: "readiness-1",
        apprenticeshipInstitutionId: "apprenticeship-1",
        professionId: "smithing",
        stage: "handoff-ready",
        outputState: "practice-only",
        sponsorshipId: "sponsorship-1",
        supportedAuthorityIds: [],
        readyForHandoff: true,
        updatedAtIso: "2026-06-29T12:00:00.000Z",
        reasonCodes: [],
      })
    ).toThrow(
      "supportedAuthorityIds must contain at least one supported crafting authority when readyForHandoff is true"
    );

    expect(() =>
      createTrainingCraftingAuthorityHandoff({
        handoffId: "handoff-1",
        readinessId: "readiness-1",
        authorityId: "commerce" as never,
        professionId: "smithing",
        apprenticeshipStage: "handoff-ready",
        outputState: "practice-only",
        eligible: true,
        reasonCodes: [],
      })
    ).toThrow("authorityId must be a supported crafting authority id");

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
        techniqueFamily: "spell-catalogue" as never,
        unlockedAtIso: "2026-06-23T06:30:00.000Z",
        reasonCodes: [],
      })
    ).toThrow("techniqueFamily must be a supported martial technique family");

    expect(() =>
      createTrainingMartialTechnique({
        techniqueId: "technique-1",
        institutionId: "barracks-1",
        title: "Invalid martial track",
        track: "externalized" as never,
        family: "stance",
        expressionNote: "invalid",
      })
    ).toThrow("track must be an internalized or hybrid martial technique track");

    expect(() =>
      createTrainingMartialTechnique({
        techniqueId: "technique-1",
        institutionId: "barracks-1",
        title: "Invalid martial family",
        track: "hybrid",
        family: "spell-catalogue" as never,
        expressionNote: "invalid",
      })
    ).toThrow("family must be a supported martial technique family");

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
        track: "externalized" as never,
        family: "grounding",
        boundedCounterWindows: [],
        prohibitedCapabilityCodes: [],
      })
    ).toThrow("track must be an internalized or hybrid martial technique track");

    expect(() =>
      createTrainingAntiSpellFieldcraftDiscipline({
        disciplineId: "discipline-1",
        institutionId: "barracks-1",
        title: "Invalid fieldcraft family",
        track: "internalized",
        family: "total-nullification" as never,
        boundedCounterWindows: [],
        prohibitedCapabilityCodes: [],
      })
    ).toThrow("family must be a supported bounded anti-spell family");

    expect(() =>
      createTrainingAntiSpellFieldcraftDiscipline({
        disciplineId: "discipline-1",
        institutionId: "barracks-1",
        title: "Invalid fieldcraft window",
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
