# TresJS Documentation Site

Nuxt-based documentation site using Nuxt Content and Nuxt UI Pro.

## Tech Stack

- **Nuxt 4** with Nuxt Content for MDC (Markdown Components)
- **@nuxt/ui-pro v3** - UI component library
- **nuxt-llms** - LLM-friendly documentation generation

## Code Style & Standards

### UI Components

**ALWAYS prefer Nuxt UI components over custom CSS:**
- Use existing Nuxt UI Pro components from `@nuxt/ui-pro`
- Refer to [Nuxt UI v4 docs](https://ui.nuxt.com) for available components
- Only create custom components when Nuxt UI doesn't provide the functionality

**Component Hierarchy:**
1. First choice: Nuxt UI Pro components (`<UButton>`, `<UCard>`, `<UContainer>`, etc.)
2. Second choice: Nuxt UI base components
3. Last resort: Custom Vue components with Tailwind utilities

### Content

- Documentation written in MDC (Markdown + Vue components)
- Content files located in `content/` directory
- Use Nuxt Content features for interactive examples

### Development

```bash
# Dev server
pnpm --filter tresjs-docs dev

# Build
pnpm --filter tresjs-docs build
```

## Important Notes

- This is a **Nuxt 4** project - use Nuxt 4 patterns and APIs
- Integrates with `@tresjs/core` for live 3D examples in documentation
- Uses `nuxt-llms` to generate LLM-friendly documentation artifacts
