import type { AppConfigInput } from 'nuxt/schema'

const newLocal = {
  ui: {
    colors: {
      primary: 'teal',
      neutral: 'zinc',
    },
    card: {
      slots: {
        root: 'hover:bg-linear-[115deg,#272727 .06%,#171717]',
        body: 'p-2 sm:p-3',
      },
    },
  },
  uiPro: {
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted',
      },
    },
  },
  seo: {
    siteName: 'TresJS Docs',
  },
  header: {
    title: '',
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
        to: 'https://github.com/tresjs/tres',
        target: '_blank',
        ariaLabel: 'GitHub',
      },
      {
        icon: 'i-simple-icons-discord',
        to: 'https://discord.com/invite/UCr96AQmWn',
        target: '_blank',
        ariaLabel: 'Discord',
      },
    ],
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()} TresJS`,
    colorMode: false,
    links: [{
      'icon': 'i-lucide-globe',
      'to': 'https://tresjs.org',
      'target': '_blank',
      'aria-label': 'TresJS Website',
    }, {
      'icon': 'i-simple-icons-discord',
      'to': 'https://discord.gg/WTpvaxr5',
      'target': '_blank',
      'aria-label': 'TresJS on Discord',
    }, {
      'icon': 'i-simple-icons-x',
      'to': 'https://x.com/tresjs_dev',
      'target': '_blank',
      'aria-label': 'TresJS on X',
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/tresjs/tres',
      'target': '_blank',
      'aria-label': 'TresJS on GitHub',
    }],
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/tresjs/tres/edit/main/docs/content',
      links: [{
        icon: 'i-lucide-heart',
        label: 'Become a sponsor',
        to: 'https://github.com/sponsors/tresjs',
        target: '_blank',
      }, {
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/tresjs/tres',
        target: '_blank',
      }],
    },
  },
} satisfies AppConfigInput

export default defineAppConfig(newLocal)
