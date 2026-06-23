# @plasius/training

[![npm version](https://img.shields.io/npm/v/@plasius/training.svg)](https://www.npmjs.com/package/@plasius/training)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Plasius-LTD/training/ci.yml?branch=main&label=build&style=flat)](https://github.com/Plasius-LTD/training/actions/workflows/ci.yml)
[![coverage](https://img.shields.io/codecov/c/github/Plasius-LTD/training)](https://codecov.io/gh/Plasius-LTD/training)
[![License](https://img.shields.io/github/license/Plasius-LTD/training)](./LICENSE)
[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-yes-blue.svg)](./CODE_OF_CONDUCT.md)
[![Security Policy](https://img.shields.io/badge/security%20policy-yes-orange.svg)](./SECURITY.md)
[![Changelog](https://img.shields.io/badge/changelog-md-blue.svg)](./CHANGELOG.md)

Institutional training, trust, and specialization contracts for Plasius game progression.

Apache-2.0. ESM + CJS builds. TypeScript types included.

## Installation

```bash
npm install @plasius/training
```

## Scope

`@plasius/training` owns the authority boundary for:

- schools, barracks, academies, and apprenticeships
- institutional trust and eligibility state
- internalized, externalized, and hybrid specialization state
- authoritative barracks drills, mission-earned martial unlocks, and bounded anti-spell fieldcraft doctrine
- privacy-safe progression payloads and large-cohort scale assumptions for institutional training flows
- training mutation reliability and bounded-error expectations
- observable training-state transition records for regression detection

## Demo

```bash
npm run build
node demo/example.mjs
```

## Usage

```ts
import {
  createTrainingAntiSpellFieldcraftDiscipline,
  createTrainingBarracksDrill,
  createTrainingInstitution,
  createTrainingMartialTechnique,
  createTrainingMissionTechniqueUnlock,
  createTrainingMutationReliabilityPolicy,
  createTrainingProgressionRecord,
  createTrainingStateTransitionEvent,
  defaultTrainingScaleAssumptions,
  trainingPrivacyScaleRollout,
} from "@plasius/training";

const academy = createTrainingInstitution({
  institutionId: "academy-1",
  type: "academy",
  track: "hybrid",
  eligible: true,
});

const progression = createTrainingProgressionRecord({
  playerSubjectId: "player-sub-1",
  institutionId: academy.institutionId,
  track: academy.track,
  trustLevel: "trusted",
  eligible: academy.eligible,
  updatedAtIso: new Date().toISOString(),
});

const policy = createTrainingMutationReliabilityPolicy({
  timeoutMs: 1500,
  cancellationWindowMs: 250,
  maxRetryAttempts: 2,
  recoverableFailureCodes: ["TRAINING_TIMEOUT"],
  terminalFailureCodes: ["TRACK_MISMATCH"],
});

const transition = createTrainingStateTransitionEvent({
  transitionId: "transition-1",
  institutionId: academy.institutionId,
  transitionType: "track-changed",
  outcome: "committed",
  fromTrack: "internalized",
  toTrack: academy.track,
  observedAt: new Date().toISOString(),
});

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
  unlockedAtIso: new Date().toISOString(),
  reasonCodes: ["mission-earned"],
});

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

const fieldcraft = createTrainingAntiSpellFieldcraftDiscipline({
  disciplineId: "discipline-1",
  institutionId: "barracks-1",
  title: "Anchor-cut grounding",
  track: "internalized",
  family: "grounding",
  boundedCounterWindows: ["delivery", "stability"],
  prohibitedCapabilityCodes: ["generic-magic-cancellation"],
});

console.log(trainingPrivacyScaleRollout.featureFlagId);
console.log(defaultTrainingScaleAssumptions.maxLearnersPerInstitution);
console.log(
  progression.playerSubjectId,
  policy.maxRetryAttempts,
  transition.transitionType,
  drill.deliveryMode,
  unlock.techniqueFamily,
  technique.family,
  fieldcraft.family
);
```

## Privacy And Scale Baseline

The package exports an inherited rollout descriptor for the cross-repo feature
flag `isekai.training-progression.privacy-scale.enabled`.

When that rollout is enabled, package consumers should prefer the minimal
`TrainingProgressionRecord` contract:

- `playerSubjectId` is the only player-linked identifier and is expected to be
  pseudonymous
- profile names, email addresses, IP addresses, and free-form notes are outside
  the package contract
- `trainingProgressionFieldPolicies` documents the retention and sensitivity
  expectation for every exported progression field
- `defaultTrainingScaleAssumptions` publishes the validated large-cohort
  operating envelope used by the package docs and tests

## Martial Doctrine Surface

The package also exports the canonical authority-side martial training vocabulary
for feature flag `isekai.training.martial.enabled`.

- `createTrainingBarracksDrill` models barracks instruction through drills,
  sparring, service obligations, supervised missions, and rank-gated lessons.
- `createTrainingMissionTechniqueUnlock` records mission-earned unlocks without
  inventing a second power system.
- `createTrainingMartialTechnique` keeps martial technique definitions inside the
  MCC `internalized` and `hybrid` tracks.
- `createTrainingAntiSpellFieldcraftDiscipline` bounds anti-spell instruction to
  interruption, concentration breaking, projectile deflection, ward stress, and
  grounding instead of generic magic cancellation.

## Governance

- ADRs: [docs/adrs](./docs/adrs)
- TDRs: [docs/tdrs](./docs/tdrs)
- Design notes: [docs/design](./docs/design)
