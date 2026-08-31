# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

- **Added**
  - (placeholder)

- **Changed**
  - Bound npm publication to the exact prepared `main` commit after successful push-triggered CI.
  - (placeholder)

- **Fixed**
  - Moved reviewed CI to explicit GitHub-hosted runners with package-manager caching disabled and added exact-branch manual validation.
  - (placeholder)

- **Security**
  - Removed the npm write-token path, added a fail-closed npm 11.5.1-or-newer OIDC guard, and denied fork PR code access to self-hosted CI.
  - Pinned patched transitive npm dependencies to clear the current audit baseline.
  - (placeholder)

## [1.0.1] - 2026-08-01

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - Reject malformed institution, reliability-policy, and transition-event payloads before freezing training contracts.

- **Security**
  - Added fail-closed source and npm-package admission for the administrative contributor registry and pinned the CI/CD runtime to Node.js 24.18.0 LTS.
  - (placeholder)

## [1.0.0] - 2026-07-15

- **Added**
  - (placeholder)

- **Changed**
  - **Breaking:** replaced all exported training, academy, apprenticeship, martial, and privacy-scale rollout values from `isekai.*` to `harmony.*`. The next release is a major version and intentionally provides no aliases, dual-read parsing, or legacy runtime fallback.

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [0.2.0] - 2026-06-29

- **Added**
  - Added `isekai.training.apprenticeship.enabled` contracts for apprenticeship sponsorship, supervision, readiness, and authority-safe crafting handoffs across item-crafting, spellcraft, and later dungeon-crafting families.
  - Added validation helpers for apprenticeship readiness stages, supervision modes, output states, and supported crafting authority IDs.

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [0.1.6] - 2026-06-28

- **Added**
  - Added `isekai.training.academies.enabled` authority contracts for school progression, academy admission, academic mission prerequisites, trust markers, and track selection state.
  - Added validation helpers for academic progress stages, trust-marker sources, academy admission decisions, instruction-access levels, and technique-mastery states.

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [0.1.5] - 2026-06-23

- **Added**
  - Added authoritative barracks-drill, mission-earned martial unlock, MCC martial-technique, and bounded anti-spell fieldcraft contracts for `isekai.training.martial.enabled`.
  - Added validation helpers for internalized or hybrid martial tracks, barracks delivery modes, martial technique families, bounded anti-spell families, and their counter windows.

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [0.1.4] - 2026-06-22

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [0.1.3] - 2026-06-22
- bootstrap `@plasius/training` from the schema package baseline with package governance, docs, tests, and demo scaffolding
- add privacy-safe training progression contracts, rollout metadata for `isekai.training-progression.privacy-scale.enabled`, and validated large-cohort scale assumptions
- add training reliability-policy and transition-observability contracts for progression authority boundaries


[0.1.3]: https://github.com/Plasius-LTD/training/releases/tag/v0.1.3
[0.1.4]: https://github.com/Plasius-LTD/training/releases/tag/v0.1.4
[0.1.5]: https://github.com/Plasius-LTD/training/releases/tag/v0.1.5
[0.1.6]: https://github.com/Plasius-LTD/training/releases/tag/v0.1.6
[0.2.0]: https://github.com/Plasius-LTD/training/releases/tag/v0.2.0
[1.0.0]: https://github.com/Plasius-LTD/training/releases/tag/v1.0.0
[1.0.1]: https://github.com/Plasius-LTD/training/releases/tag/v1.0.1
