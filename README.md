# @plasius/training

[![npm version](https://img.shields.io/npm/v/@plasius/training.svg)](https://www.npmjs.com/package/@plasius/training)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Plasius-LTD/training/ci.yml?branch=main&label=build&style=flat)](https://github.com/Plasius-LTD/training/actions/workflows/ci.yml)
[![coverage](https://img.shields.io/codecov/c/github/Plasius-LTD/training)](https://codecov.io/gh/Plasius-LTD/training)
[![License](https://img.shields.io/github/license/Plasius-LTD/training)](./LICENSE)
[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-yes-blue.svg)](./CODE_OF_CONDUCT.md)
[![Security Policy](https://img.shields.io/badge/security%20policy-yes-orange.svg)](./SECURITY.md)
[![Changelog](https://img.shields.io/badge/changelog-md-blue.svg)](./CHANGELOG.md)

Institutional training, trust, and specialization contracts for Plasius game progression.

Factory helpers reject blank identifiers, unsupported enums, invalid timestamps, and malformed retry budgets at runtime before freezing public contract payloads.

Apache-2.0. ESM + CJS builds. TypeScript types included.

## Installation

```bash
npm install @plasius/training
```

## Scope

`@plasius/training` owns the authority boundary for:

- schools, barracks, academies, and apprenticeships
- institutional trust and eligibility state
- school progression, academy admission, academic mission prerequisites, and trust markers
- apprenticeship sponsorship, supervision, readiness, and authority-safe crafting handoff state
- internalized, externalized, and hybrid specialization state
- track-selection state that distinguishes instruction access from technique mastery
- apprenticeship access state that stays distinct from mastered external crafting output
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
  TRAINING_ACADEMIES_FEATURE_FLAG_ID,
  TRAINING_APPRENTICESHIP_FEATURE_FLAG_ID,
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
  createTrainingSchoolProgression,
  createTrainingStateTransitionEvent,
  createTrainingTrackSelection,
  createTrainingTrustMarker,
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

const academyMission = createTrainingAcademicMissionPrerequisite({
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
  awardedAtIso: new Date().toISOString(),
  reasonCodes: ["mission-sponsorship"],
});

const schoolProgression = createTrainingSchoolProgression({
  progressionId: "progression-1",
  schoolInstitutionId: "school-1",
  stage: "academy-candidate",
  leaning: "hybrid",
  missionPrerequisites: [academyMission],
  trustMarkers: [trustMarker],
  updatedAtIso: new Date().toISOString(),
});

const academyAdmission = createTrainingAcademyAdmission({
  admissionId: "admission-1",
  schoolInstitutionId: "school-1",
  academyInstitutionId: academy.institutionId,
  desiredTrack: academy.track,
  decision: "candidate",
  missionPrerequisites: [academyMission],
  supportingTrustMarkerIds: [trustMarker.markerId],
  evaluatedAtIso: new Date().toISOString(),
  reasonCodes: ["pending-academy-board"],
});

const trackSelection = createTrainingTrackSelection({
  selectionId: "selection-1",
  institutionId: academy.institutionId,
  leaning: "hybrid",
  selectedTrack: "externalized",
  instructionAccess: "academy-provisional",
  techniqueMastery: "guided",
  updatedAtIso: new Date().toISOString(),
  reasonCodes: ["theory-cleared"],
});

const sponsorship = createTrainingApprenticeshipSponsorship({
  sponsorshipId: "sponsorship-1",
  apprenticeshipInstitutionId: "apprenticeship-1",
  sponsorId: "guild-smith-1",
  professionId: "smithing",
  sponsoredTrack: "hybrid",
  trustLevel: "trusted",
  grantedAtIso: new Date().toISOString(),
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
  startedAtIso: new Date().toISOString(),
  checkpointAtIso: new Date().toISOString(),
  taskCodes: ["forge-setup", "tool-maintenance"],
  reasonCodes: ["supervisor-cleared"],
});

const apprenticeshipReadiness = createTrainingApprenticeshipReadiness({
  readinessId: "readiness-1",
  apprenticeshipInstitutionId: "apprenticeship-1",
  professionId: "smithing",
  stage: "handoff-ready",
  outputState: "practice-only",
  sponsorshipId: sponsorship.sponsorshipId,
  supervisionId: supervision.supervisionId,
  supportedAuthorityIds: ["item-crafting", "spellcraft"],
  readyForHandoff: true,
  updatedAtIso: new Date().toISOString(),
  reasonCodes: ["practice-threshold-cleared"],
});

const craftingHandoff = createTrainingCraftingAuthorityHandoff({
  handoffId: "handoff-1",
  readinessId: apprenticeshipReadiness.readinessId,
  authorityId: "item-crafting",
  professionId: "smithing",
  apprenticeshipStage: apprenticeshipReadiness.stage,
  outputState: apprenticeshipReadiness.outputState,
  eligible: true,
  reasonCodes: ["external-authority-preserved"],
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
  TRAINING_ACADEMIES_FEATURE_FLAG_ID,
  TRAINING_APPRENTICESHIP_FEATURE_FLAG_ID,
  progression.playerSubjectId,
  schoolProgression.stage,
  academyAdmission.decision,
  trackSelection.techniqueMastery,
  apprenticeshipReadiness.stage,
  craftingHandoff.authorityId,
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
flag `harmony.training-progression.privacy-scale.enabled`.

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
for feature flag `harmony.training.martial.enabled`.

- `createTrainingBarracksDrill` models barracks instruction through drills,
  sparring, service obligations, supervised missions, and rank-gated lessons.
- `createTrainingMissionTechniqueUnlock` records mission-earned unlocks without
  inventing a second power system.
- `createTrainingMartialTechnique` keeps martial technique definitions inside the
  MCC `internalized` and `hybrid` tracks.
- `createTrainingAntiSpellFieldcraftDiscipline` bounds anti-spell instruction to
  interruption, concentration breaking, projectile deflection, ward stress, and
  grounding instead of generic magic cancellation.

## Academic Progression Surface

The package also exports the academy-track authority vocabulary for feature flag
`harmony.training.academies.enabled`.

- `createTrainingAcademicMissionPrerequisite` models academy-gating mission
  requirements with explicit minimum stage and trust expectations.
- `createTrainingTrustMarker` records institutional trust evidence without
  carrying broader player profile state.
- `createTrainingSchoolProgression` packages school-stage progress, outstanding
  academy prerequisites, and trust evidence into a frozen authority record.
- `createTrainingAcademyAdmission` keeps academy decisions, prerequisite state,
  and supporting trust markers explicit.
- `createTrainingTrackSelection` distinguishes instruction access from technique
  mastery so consumers can reason about teaching availability separately from
  demonstrated competence.

## Apprenticeship Handoff Surface

The package also exports the apprenticeship-routing vocabulary for feature flag
`harmony.training.apprenticeship.enabled`.

- `createTrainingApprenticeshipSponsorship` records who sponsored the
  apprenticeship entry and which profession track they unlocked.
- `createTrainingApprenticeshipSupervision` keeps supervised practice explicit
  instead of collapsing it into a generic unlock boolean.
- `createTrainingApprenticeshipReadiness` separates apprenticeship access state
  from mastered external crafting output while publishing which downstream
  crafting authorities are currently valid handoff targets.
- `createTrainingCraftingAuthorityHandoff` captures the authority-safe handoff
  snapshot for item-crafting, spellcraft, and later dungeon-crafting systems
  without moving execution truth into the Player System.

## Project Harmony namespace migration

The Project Harmony cutover is a breaking public-contract change. Consumers
moving to the next major release must replace these exact keys before enabling
`harmony.namespace-cutover.enabled`:

| Previous key | Harmony key |
| --- | --- |
| `isekai.training.institutions.enabled` | `harmony.training.institutions.enabled` |
| `isekai.training.academies.enabled` | `harmony.training.academies.enabled` |
| `isekai.training.apprenticeship.enabled` | `harmony.training.apprenticeship.enabled` |
| `isekai.training.martial.enabled` | `harmony.training.martial.enabled` |
| `isekai.training-progression.privacy-scale.enabled` | `harmony.training-progression.privacy-scale.enabled` |

The package publishes only Harmony values. It provides no aliases, dual-read
parsing, environment fallback, or runtime translation for the previous product
namespace.

## Governance

- ADRs: [docs/adrs](./docs/adrs)
- TDRs: [docs/tdrs](./docs/tdrs)
- Design notes: [docs/design](./docs/design)
- Namespace rollback: disable `harmony.namespace-cutover.enabled`, restore the previous coordinated package majors, and complete the approved reverse stored-value migration before re-enabling consumers.

<!-- BEGIN PLASIUS RELEASE INTEGRITY -->
## Release integrity

CI keeps the administrative contributor registry outside Git and npm package
artifacts using exact, case-normalised path checks. CI runs on approved
self-hosted runners. Release preparation and npm publication use GitHub-hosted
runners with Node.js 24.18.0 LTS. CD remains disabled until the npm trusted
publisher binding is verified and the legacy token fallback is removed.
<!-- END PLASIUS RELEASE INTEGRITY -->
