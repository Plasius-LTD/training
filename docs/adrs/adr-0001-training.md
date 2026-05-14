# ADR-0001: Training Package Boundary

## Status

Accepted

## Context

Institutional training, trust, and specialization need an authoritative package boundary separate from the Player System guidance layer.

## Decision

`@plasius/training` will own institutional eligibility and specialization contracts while the Player System remains an assistive consumer.

## Consequences

- Training authority stays outside the Player System.
- Institutional state becomes reusable across multiple host runtimes.
- Crafting systems can later consume shared apprenticeship and specialization state.
