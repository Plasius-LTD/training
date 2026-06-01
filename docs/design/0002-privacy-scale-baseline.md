# Training Privacy And Scale Baseline

## Goal

Define the minimal progression payload and large-cohort assumptions exported by
`@plasius/training`.

## Contract Additions

- `TrainingProgressionRecord` exposes only the pseudonymous player subject,
  institution identifier, specialization track, trust level, eligibility, and
  update timestamp.
- `trainingProgressionFieldPolicies` documents the sensitivity, retention, and
  justification for every progression field.
- `trainingPrivacyScaleRollout` publishes the inherited
  `isekai.training-progression.privacy-scale.enabled` control and local env
  override.
- `defaultTrainingScaleAssumptions` and `createTrainingScaleAssumptions`
  document and validate the expected operating envelope for large learner
  cohorts and high progression-event rates.

## Exclusions

- profile names, emails, IP addresses, or free-form learner notes
- transport or storage implementation details
- institution UI or gameplay presentation logic
