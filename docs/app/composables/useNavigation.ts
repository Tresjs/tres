import { createSharedComposable } from '@vueuse/core'

export interface HeaderLink {
  label: string
  description: string
  icon: string
  to: string
  search?: boolean
  children?: HeaderLink[]
}

function _useHeaderLinks() {
  const headerLinks = computed<HeaderLink[]>(() => {
    const to = ''

    return [{
      label: 'Get Started',
      description: 'Learn how to get started with TresJS to build your 3D first app.',
      icon: 'i-lucide-rocket',
      to: `${to}/getting-started`,
    }, {
      label: 'Essentials',
      description: 'Get the key concepts and best practices.',
      icon: 'i-lucide-book-open',
      to: `${to}/essentials`,
    }, {
      label: 'API',
      description: 'Explore the TresJS components, composables, utilities and more.',
      icon: 'i-lucide-code-xml',
      to: `${to}/api`,
    }, {
      label: 'Cookbook',
      description: 'Discover and explore official and community examples.',
      icon: 'i-lucide-cooking-pot',
      to: `${to}/cookbook`,
    }/*  {      label: 'Community',      description: 'Find answers and support from the community.',      icon: 'i-lucide-messages-square',      to: `${to}/community`,      active: route.path.startsWith(`${to}/community`)    } */]
  })

  return { headerLinks }
}

export const useHeaderLinks = import.meta.client ? createSharedComposable(_useHeaderLinks) : _useHeaderLinks

const _useNavigation = () => {
  const searchTerm = ref<string>('')

  const { headerLinks } = useHeaderLinks()

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
          children: link.children,
        }
      }
      return link
    }).filter((link): link is NonNullable<typeof link> => Boolean(link)),
    {
      label: 'Team',
      icon: 'i-lucide-users',
      to: '/team',
    },
    {
      label: 'Design Kit',
      icon: 'i-lucide-palette',
      to: '/design-kit',
    },
    {
      label: 'Newsletter',
      icon: 'i-lucide-mail',
      to: '/newsletter',
    },
  ])

  return {
    searchTerm,
    headerLinks,
    searchLinks,
  }
}

export const useNavigation = import.meta.client ? createSharedComposable(_useNavigation) : _useNavigation
