# Post-processing Docs - CLAUDE.md

Documentation site for `@tresjs/post-processing` built with Nuxt v4 and Nuxt UI v4.

## Overview

- Nuxt v4 with compatibility mode enabled
- Nuxt UI v4 for components
- Nuxt Content for markdown-based content
- TresJS integration for 3D examples
- Brand color: `#FF7BAC` (pink)

## Architecture

Same structure as the docs-boilerplate. See [docs-boilerplate CLAUDE.md](../docs-boilerplate/CLAUDE.md) for full architecture details.

## Development

```bash
pnpm --filter postprocessing-docs dev
pnpm --filter postprocessing-docs build
```

## Important Notes

- This is a **Nuxt 4** project - use Nuxt 4 patterns and APIs
- Primary color is `pink` (configured in app.config.ts and main.css)
- Package version is read from `@tresjs/post-processing`
- Domain: `https://post-processing.tresjs.org/`
