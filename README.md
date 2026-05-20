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
- privacy-safe progression payloads and large-cohort scale assumptions for institutional training flows

## Demo

```bash
npm run build
node demo/example.mjs
```

## Usage

```ts
import {
  createTrainingInstitution,
  createTrainingProgressionRecord,
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

console.log(trainingPrivacyScaleRollout.featureFlagId);
console.log(defaultTrainingScaleAssumptions.maxLearnersPerInstitution);
console.log(progression.playerSubjectId);
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

## Governance

- ADRs: [docs/adrs](./docs/adrs)
- TDRs: [docs/tdrs](./docs/tdrs)
- Design notes: [docs/design](./docs/design)
