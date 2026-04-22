import { createSharedComposable } from '@vueuse/core'

export interface HeaderLink {
  label: string
  description: string
  icon: string
  to: string
  search?: boolean
  active?: boolean
  children?: HeaderLink[]
}

function _useHeaderLinks() {
  const route = useRoute()
  const headerLinks = computed<HeaderLink[]>(() => {
    return [{
      label: 'Get Started',
      description: 'Install and use post-processing effects.',
      icon: 'i-lucide-rocket',
      to: '/getting-started',
      active: route.path.startsWith('/getting-started'),
    }, {
      label: 'API',
      description: 'Pmndrs and three native effects reference.',
      icon: 'i-lucide-code-xml',
      to: '/api',
      active: route.path.startsWith('/api'),
    }, {
      label: 'Advanced',
      description: 'Performance considerations and advanced topics.',
      icon: 'i-lucide-graduation-cap',
      to: '/advanced',
      active: route.path.startsWith('/advanced'),
    }]
  })

  return { headerLinks }
}

export const useHeaderLinks = import.meta.client ? createSharedComposable(_useHeaderLinks) : _useHeaderLinks
