import { createSharedComposable } from '@vueuse/core'

function _useHeaderLinks() {
  const route = useRoute()

  const headerLinks = computed(() => {
    const to = ''

    return [{
      label: 'Get Started',
      description: 'Learn how to get started with TresJS to build your 3D first app.',
      icon: 'i-lucide-rocket',
      to: `${to}/getting-started`,
      active: route.path.startsWith(`${to}/getting-started`)
    }, {
      label: 'Essentials',
      description: 'Get the key concepts and best practices.',
      icon: 'i-lucide-book-open',
      to: `${to}/essentials`,
      active: route.path.startsWith(`${to}/essentials`)
    }, {
      label: 'API',
      description: 'Explore the TresJS components, composables, utilities and more.',
      icon: 'i-lucide-code-xml',
      to: `${to}/api`,
      active: route.path.startsWith(`${to}/api`)
    }, {
      label: 'Cookbook',
      description: 'Discover and explore official and community examples.',
      icon: 'i-lucide-cooking-pot',
      to: `${to}/cookbook`,
      active: route.path.startsWith(`${to}/cookbook`)
    }/*  {      label: 'Community',      description: 'Find answers and support from the community.',      icon: 'i-lucide-messages-square',      to: `${to}/community`,      active: route.path.startsWith(`${to}/community`)    } */]
  })

  return { headerLinks }
}

export const useHeaderLinks = import.meta.client ? createSharedComposable(_useHeaderLinks) : _useHeaderLinks

const footerLinks = [{
  label: 'Community',
  children: [{
    label: 'Discord',
    to: 'https://discord.gg/tresjs',
    target: '_blank'
  }, {
    label: 'Team',
    to: '/team'
  }]
}, {
  label: 'Products',
  children: [{
    label: 'Nuxt UI Pro',
    to: 'https://ui.nuxt.com/pro?utm_source=nuxt-website&utm_medium=footer',
    target: '_blank'
  }, {
    label: 'Nuxt Studio',
    to: 'https://content.nuxt.com/studio/?utm_source=nuxt-website&utm_medium=footer',
    target: '_blank'
  }, {
    label: 'NuxtHub',
    to: 'https://hub.nuxt.com/?utm_source=nuxt-website&utm_medium=footer',
    target: '_blank'
  }]
}, {
  label: 'Enterprise',
  children: [{
    label: 'Support',
    to: '/enterprise/support'
  }, {
    label: 'Agencies',
    to: '/enterprise/agencies'
  }, {
    label: 'Sponsors',
    to: '/enterprise/sponsors'
  }]
}]

export const useFooterLinks = () => ({ footerLinks })

const _useNavigation = () => {
  const searchTerm = ref<string>('')

  const { headerLinks } = useHeaderLinks()
  const { footerLinks } = useFooterLinks()

  const searchLinks = computed(() => [
    /* {
      label: 'Ask AI',
      icon: 'i-lucide-wand',
      to: 'javascript:void(0);',
      onSelect: () => nuxtApp.$kapa?.openModal()
    }, */
    ...headerLinks.value.map((link) => {
      // Remove `/docs` and `/enterprise` links from command palette
      if (link.search === false) {
        return {
          label: link.label,
          icon: link.icon,
          children: link.children
        }
      }
      return link
    }).filter((link): link is NonNullable<typeof link> => Boolean(link)),
    {
      label: 'Team',
      icon: 'i-lucide-users',
      to: '/team'
    },
    {
      label: 'Design Kit',
      icon: 'i-lucide-palette',
      to: '/design-kit'
    },
    {
      label: 'Newsletter',
      icon: 'i-lucide-mail',
      to: '/newsletter'
    }
  ])

  return {
    searchTerm,
    headerLinks,
    footerLinks,
    searchLinks
  }
}

export const useNavigation = import.meta.client ? createSharedComposable(_useNavigation) : _useNavigation
