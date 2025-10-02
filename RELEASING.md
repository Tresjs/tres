# Release Process

This document details the release process for Storyblok packages in the monorepo.

## Overview

The release process is split into two main steps:
1. **Versioning**: Increment versions and create version commits
2. **Publishing**: Build and publish packages to npm with appropriate distribution tags

This separation allows for better control and review of version changes before they are published.

## Versioning

There are two ways to handle versioning, depending on your needs:

### Full Release (with GitHub Release)

To create a release with automatic version increments and a GitHub release:

```bash
pnpm nx release --skip-publish
```

This will:
- Analyze conventional commits since the last release
- Determine appropriate version bumps
- Create version commits
- Create git tags
- Push changes to the repository
- Generate changelogs
- Create a GitHub release

### Silent Versioning (without GitHub Release)

For release candidates or silent releases, use the version command:

```bash
pnpm nx release version
```

This will:
- Analyze conventional commits since the last release
- Determine appropriate version bumps
- Create version commits
- Create git tags
- Push changes to the repository
- Generate changelogs
- Skip creating a GitHub release

### Manual Versioning

To create a release with a specific version:

```bash
# With GitHub release
pnpm nx release 1.2.3 --skip-publish

# Without GitHub release
pnpm nx release version 1.2.3
```

### Version Bumps

Version increments are determined by commit messages:
- `feat:` → minor version bump
- `fix:` → patch version bump
- `BREAKING CHANGE:` or `feat!:` → major version bump

## Publishing

After versioning and pushing your changes:

1. Go to the GitHub Actions tab
2. Select the "Publish" workflow
3. Click "Run workflow"
4. Select the branch where you pushed your version commit
5. Click "Run workflow"

The publish workflow will:
- Build all packages
- Handle workspace dependencies
- Publish to npm with the appropriate distribution tag:
  - `main` branch → `latest` tag
  - `next` branch → `next` tag
  - `beta` branch → `beta` tag
  - `alpha` branch → `alpha` tag

## Distribution Tags

Users can install specific versions using the appropriate tag:

```bash
# Latest stable version
npm install @tresjs/package

# Next version
npm install @tresjs/package@next

# Beta version
npm install @tresjs/package@beta

# Alpha version
npm install @tresjs/package@alpha
```

## Release Branches

The repository uses different branches for different types of releases:

- `main`: Stable releases
- `next`: Next version releases
- `beta`: Beta releases
- `alpha`: Alpha releases

Each branch corresponds to a specific npm distribution tag, ensuring users can install the appropriate version for their needs.

## Best Practices

1. Always run versioning commands from the target branch
2. Review version commits before pushing
3. Ensure all tests pass before publishing
4. Use conventional commits for automatic versioning
5. Document breaking changes in commit messages
6. Test the published package before announcing the release
7. Use `nx release version` for release candidates or when you don't want to create a GitHub release
8. Use `nx release --skip-publish` for full releases that should be announced via GitHub 
