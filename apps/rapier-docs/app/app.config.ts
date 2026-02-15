import type { AppConfigInput } from 'nuxt/schema'

const newLocal = {
  ui: {
    colors: {
      primary: 'purple', // TODO: change this
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
    siteName: 'Rapier docs',
  },
  header: {
    title: 'Rapier docs',
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
        to: 'https://github.com/Tresjs/tres',
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
    credits: `Copyright © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/Tresjs/tres',
      'target': '_blank',
      'aria-label': 'GitHub',
    }],
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/tresjs/tres/edit/main/docs/content',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/Tresjs/tres',
        target: '_blank',
      }],
    },
  },
} satisfies AppConfigInput

export default defineAppConfig(newLocal)
