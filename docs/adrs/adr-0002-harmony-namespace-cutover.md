# ADR-0002: Project Harmony Namespace Cutover

## Status

Accepted on 2026-07-15.

## Context

Project Harmony replaces the Isekai product namespace in one coordinated,
breaking release train. `@plasius/training` publishes five rollout keys through
public constants, its package descriptor, and privacy-scale rollout metadata.
Keeping old values or compatibility branches would make cross-package authority
and rollout state ambiguous.

The tracked implementation is
[Plasius-LTD/training#32](https://github.com/Plasius-LTD/training/issues/32),
under the Project Harmony namespace Feature and its remote rollout control
`harmony.namespace-cutover.enabled`.

## Decision

- Replace every owned `isekai.training*` rollout value with its exact
  `harmony.training*` equivalent.
- Publish only Harmony values in constants, package metadata, and rollout
  descriptors.
- Do not add aliases, dual-read parsers, environment fallback, or runtime
  translation for the previous namespace.
- Preserve the existing uppercase local privacy-scale environment override; it
  is not a product namespace and remains local/break-glass metadata.
- Release the change as the next major package version through the repository's
  approved `cd.yml` workflow.

## Rollout and rollback

The host feature-flag service is the source of truth for
`harmony.namespace-cutover.enabled`. Consumers update stored keys and package
majors during the coordinated maintenance window, then enable the flag for the
approved cohort.

Rollback requires disabling the cutover flag, restoring the coordinated
previous package majors, and applying the verified reverse stored-value
migration. This contract package has no persistent store of its own.

## Consequences

- Consumers receive one canonical Harmony namespace.
- Exported string-value changes are intentionally SemVer-major even though
  TypeScript symbol names remain stable.
- `ai-game` and `player-system` can consume the new major only as part of the
  coordinated cutover release train.
