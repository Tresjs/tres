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
      description: 'Learn how to get started.',
      icon: 'i-lucide-rocket',
      to: `${to}/getting-started`,
      active: route.path.startsWith(`${to}/getting-started`),
    }, {
      label: 'API',
      description: 'Explore the API reference.',
      icon: 'i-lucide-code-xml',
      to: `${to}/api`,
      active: route.path.startsWith(`${to}/api`),
    }]
  })

  return { headerLinks }
}

export const useHeaderLinks = import.meta.client ? createSharedComposable(_useHeaderLinks) : _useHeaderLinks
