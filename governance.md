# Governance

## Scope

This repository provides a blockchain-based Electronic Medical Records (EMR) system built on Cardano, with separate portals for patients and doctors, appointment management, prescription handling, and emergency access features.

## Decision Making

- **Small decisions**: Maintainer can merge after review (bug fixes, documentation updates, minor UI tweaks).
- **Medium changes**: Feature additions, UI/UX improvements, or API modifications require at least one approving review from a core contributor.
- **Bigger changes**: Architecture decisions, blockchain integration changes, security protocols, or major new features should be discussed in GitHub Discussions first before implementation.

## Releases

- **Version format**: Use SemVer tags: `vMAJOR.MINOR.PATCH`
  - MAJOR: Incompatible API changes or major architectural shifts
  - MINOR: New functionality in a backward-compatible manner
  - PATCH: Backward-compatible bug fixes

- **Release process**:
  1. Update `CHANGELOG.md` with all notable changes
  2. Create a signed tag: `git tag -s v1.4.0 -m "Release v1.4.0"`
  3. Push the tag: `git push origin v1.4.0`
  4. Create a GitHub Release with release notes

- **Pre-releases**: Alpha and beta versions may use suffixes like `v1.5.0-alpha.1` or `v1.5.0-beta.1`

## Maintainers

Current maintainers:
- **Ridotshia Mambeda** (Lead Maintainer) - @Ridotshila

## Communication

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Architectural decisions and major changes
- **Pull Requests**: All code changes must go through PR review

## Code of Conduct

All contributors are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md).
