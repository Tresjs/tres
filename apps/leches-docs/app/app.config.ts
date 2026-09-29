import type { AppConfigInput } from 'nuxt/schema'

const newLocal = {
  ui: {
    colors: {
      primary: 'amber',
      neutral: 'zinc',
    },
    card: {
      slots: {
        root: 'hover:bg-linear-[115deg,#272727 .06%,#171717]',
        body: 'p-2 sm:p-3',
      },
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted',
      },
    },
  },
  seo: {
    siteName: 'Tres Leches',
  },
  header: {
    title: 'Tres Leches 🍰',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: '',
    },
    search: true,
    colorMode: true,
    links: [
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/Tresjs/tres/tree/main/packages/leches',
        target: '_blank',
        ariaLabel: 'GitHub',
      },
    ],
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/Tresjs/tres/tree/main/packages/leches',
      'target': '_blank',
      'aria-label': 'GitHub',
    }],
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/Tresjs/tres/edit/main/apps/leches-docs/content',
      links: [{
        icon: 'i-lucide-heart',
        label: 'Become a sponsor',
        to: 'https://github.com/sponsors/tresjs',
        target: '_blank',
      }, {
        icon: 'i-lucide-star',
        label: 'View on GitHub',
        to: 'https://github.com/Tresjs/tres/tree/main/packages/leches',
        target: '_blank',
      }],
    },
  },
} satisfies AppConfigInput

export default defineAppConfig(newLocal)
