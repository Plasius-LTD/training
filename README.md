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

## Demo

```bash
npm run build
node demo/example.mjs
```

## Usage

```ts
import { createTrainingInstitution } from "@plasius/training";

const academy = createTrainingInstitution({
  institutionId: "academy-1",
  type: "academy",
  track: "hybrid",
  eligible: true,
});

console.log(academy.track);
```

## Governance

- ADRs: [docs/adrs](./docs/adrs)
- TDRs: [docs/tdrs](./docs/tdrs)
- Design notes: [docs/design](./docs/design)
