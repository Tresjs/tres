# Docs

A modern documentation for tres-rapier built with Nuxt v4 and Nuxt UI v4.

## Features

- 🚀 **Nuxt v4** - Latest Nuxt framework with improved performance
- 🎨 **Nuxt UI v4** - Beautiful, accessible UI components
- 📝 **Nuxt Content** - File-based CMS for markdown content
- 🔍 **Full-text Search** - Built-in search functionality
- 🌙 **Dark Mode** - Automatic dark mode support
- 📱 **Responsive** - Mobile-first responsive design
- ⚡ **Fast** - Optimized for performance
- 🎯 **SEO Optimized** - Built-in SEO best practices

## Project Structure

```
apps/rapier-docs/
├── app/                      # Nuxt app directory
│   ├── assets/               # Styles and static assets
│   ├── components/           # Vue components
│   │   ├── content/          # MDC components
│   │   └── diagrams/         # Diagram components
│   ├── composables/          # Composable functions
│   ├── layouts/              # Page layouts
│   ├── pages/                # Route pages
│   └── utils/                # Utility functions
├── content/                  # Markdown content
│   ├── 1.getting-started/    # Getting started docs
│   ├── 2.guide/              # Guide section
│   └── 3.api/                # API reference
├── public/                   # Public static files
└── nuxt.config.ts            # Nuxt configuration
```

## Getting Started

### Prerequisites

- Node.js 24+
- pnpm package manager

### Installation

Install dependencies:

```bash
pnpm install --frozen-lockfile
```

### Development

Start the development server:

```bash
pnpm dev
```

The site will be available at `http://localhost:3000`.

### Build

Build for production:

```bash
pnpm build
```

### Preview

Preview the production build:

```bash
pnpm preview
```

## Content

Content is written in Markdown with MDC (Markdown Components) syntax support. Add your content files in the `content/` directory.

### Content Structure

- `content/index.md` - Landing page
- `content/1.getting-started/` - Getting started section
- `content/2.guide/` - Guide section
- `content/3.api/` - API reference section

## Configuration

### App Configuration

Edit `app/app.config.ts` to customize:

- UI theme colors
- Header links
- Footer links
- SEO metadata

### Nuxt Configuration

Edit `nuxt.config.ts` to configure:

- Nuxt modules
- Build settings
- Runtime config
- SEO settings

## Components

The repo includes several pre-built components:

- **AppHeader** - Site header with navigation
- **AppFooter** - Site footer with links
- **AppSide** - Sidebar navigation
- **ProseA** - Enhanced link component for content

## License

MIT
