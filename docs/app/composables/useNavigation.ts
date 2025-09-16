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
  const route = useRoute()
  const headerLinks = computed<HeaderLink[]>(() => {
    const to = ''

    return [{
      label: 'Get Started',
      description: 'Learn how to get started with TresJS to build your 3D first app.',
      icon: 'i-lucide-rocket',
      to: `${to}/getting-started`,
      active: route.path.startsWith(`${to}/getting-started`),
    }, {
      label: 'Essentials',
      description: 'Get the key concepts and best practices.',
      icon: 'i-lucide-book-open',
      to: `${to}/essentials`,
      active: route.path.startsWith(`${to}/essentials`),
    }, {
      label: 'API',
      description: 'Explore the TresJS components, composables, utilities and more.',
      icon: 'i-lucide-code-xml',
      to: `${to}/api`,
      active: route.path.startsWith(`${to}/api`),
    }, {
      label: 'Cookbook',
      description: 'Discover and explore official and community examples.',
      icon: 'i-lucide-cooking-pot',
      to: `${to}/cookbook`,
      active: route.path.startsWith(`${to}/cookbook`),
    }, { label: 'Community', description: 'Find answers and support from the community.', icon: 'i-lucide-messages-square', to: `${to}/community`, active: route.path.startsWith(`${to}/community`) }]
  })

  return { headerLinks }
}

export const useHeaderLinks = import.meta.client ? createSharedComposable(_useHeaderLinks) : _useHeaderLinks
