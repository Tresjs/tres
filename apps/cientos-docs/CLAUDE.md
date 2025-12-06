# Docs Boilerplate - CLAUDE.md

This is a documentation boilerplate app built with Nuxt v4 and Nuxt UI v4. It serves as a reference implementation for creating new documentation sites in the TresJS ecosystem.

## Overview

This boilerplate provides a complete setup for creating documentation sites with:

- Nuxt v4 with compatibility mode enabled
- Nuxt UI v4 for beautiful, accessible components
- Nuxt Content for markdown-based content
- TresJS integration for 3D examples
- Full-text search functionality
- Dark mode support
- SEO optimization

## Architecture

### App Structure

```
app/
├── app.config.ts           # UI theme and app configuration
├── app.vue                 # Root application component
├── error.vue               # Error page component
├── assets/css/             # Global styles
├── components/             # Vue components
│   ├── content/            # MDC prose components
│   └── diagrams/           # Custom diagram components
├── composables/            # Composable functions (useNavigation)
├── layouts/                # Page layouts (docs.vue)
├── pages/                  # Route pages
│   ├── index.vue           # Landing page
│   └── [...slug].vue       # Dynamic docs pages
└── utils/                  # Utility functions
```

### Content Structure

Content is organized in numbered directories for ordering:

```
content/
├── index.md                # Landing page content
├── 1.getting-started/      # Getting started section
├── 2.guide/                # Guide section
└── 3.api/                  # API reference section
```

## Key Features

### Nuxt UI v4

- Uses Nuxt UI v4 components (`UApp`, `UPage`, `UMain`, etc.)
- Custom theme configuration in `app.config.ts`
- Teal color scheme as primary
- Custom CSS variables for patterns and gradients

### Nuxt Content

- Markdown with MDC (Markdown Components) syntax
- Collection-based content management
- Automatic table of contents generation
- Search integration

### TresJS Integration

- Vue template compiler options configured for TresJS
- Support for 3D scene components
- Ready for interactive 3D examples

### SEO & Meta

- Configured SEO meta tags
- Open Graph and Twitter card support
- Dynamic titles and descriptions
- Sitemap generation ready

## Configuration

### Theme Customization

Edit `app/app.config.ts` to customize:

```
ui: {
  colors: {
    primary: 'teal',      // Change primary color
    neutral: 'zinc'       // Change neutral color
  },
}
```

### Navigation

Edit `app/composables/useNavigation.ts` to modify header navigation links.

### Content Collections

Content is organized using Nuxt Content collections defined in `content.config.ts`:

- `landing` - Landing page (index.md)
- `docs` - All documentation pages

### LLM Documentation

The `nuxt-llms` module is configured to generate LLM-friendly documentation at `/llms.txt` and `/llms-full.txt`.

## Components

### Layout Components

- **AppHeader** - Site header with navigation, search, and color mode toggle
- **AppFooter** - Footer with links and copyright
- **AppSide** - Sidebar navigation for docs layout

### Content Components

- **ProseA** - Enhanced anchor links in markdown content

### Diagram Components

Custom SVG diagram components for technical documentation.

## Development

### Prerequisites

- Node.js 18+
- pnpm package manager

### Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Type checking
pnpm typecheck
```

## Styling

### CSS Architecture

- **Tailwind CSS v4** via `@import 'tailwindcss'`
- **Nuxt UI** styles via `@import '@nuxt/ui'`
- Custom theme variables in `main.css`
- Pattern backgrounds (`.pattern-bg`, `.pattern-dot-bg`)

### Color Palette

Two custom color palettes are defined:

- **Teal** (50-950) - Primary brand color
- **Yellow/Brown** (50-950) - Accent color

### Dark Mode

Automatic dark mode with theme-aware pattern backgrounds and custom favicon switching.

## Content Writing

### Markdown Format

```md
---
title: Page Title
description: Page description for SEO
---

# Heading

Content here with **bold** and *italic* text.

::callout
Custom MDC component
::
```

### MDC Components

Use Vue components directly in markdown:

```md
::block-hero
---
cta:
  - Get started
  - /getting-started
---

#title
Hero Title

#description
Hero description
::
```

## Deployment

### Static Site Generation

Configured for static site generation with Nitro prerendering:

```
nitro: {
  prerender: {
    routes: ['/'],
    crawlLinks: true,
  },
}
```

### Environment Variables

Create `.env` file for environment-specific configuration (use `.env.example` as reference).

## Best Practices

1. **Content Organization** - Use numbered prefixes for ordering
2. **Component Naming** - Use PascalCase for components
3. **MDC Syntax** - Leverage MDC for rich content
4. **Accessibility** - All UI components are accessible by default
5. **Performance** - Images are optimized via @nuxt/image
6. **SEO** - Always include title and description frontmatter

## Extending the Boilerplate

### Adding New Sections

1. Create new directory in `content/`
2. Add index page with navigation
3. Update `useNavigation.ts` if needed
4. Update `llms` configuration in `nuxt.config.ts`

### Custom Components

1. Add components in `app/components/`
2. MDC components go in `app/components/content/`
3. Auto-imported by Nuxt

### Styling Customization

1. Update theme variables in `app.config.ts`
2. Add custom CSS in `app/assets/css/main.css`
3. Use Tailwind utilities for component styles

## Troubleshooting

### Build Issues

- Ensure Node.js 18+ is installed
- Clear `.nuxt` and `node_modules`, reinstall
- Check `pnpm-workspace.yaml` includes `apps/*`

### Content Not Rendering

- Check frontmatter syntax
- Verify collection configuration in `content.config.ts`
- Ensure files use `.md` extension

## Resources

- [Nuxt Documentation](https://nuxt.com)
- [Nuxt UI Documentation](https://ui.nuxt.com)
- [Nuxt Content Documentation](https://content.nuxt.com)
- [TresJS Documentation](https://docs.tresjs.org)
