import {
  TRAINING_FEATURE_FLAG_ID,
  createTrainingInstitution,
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
});
