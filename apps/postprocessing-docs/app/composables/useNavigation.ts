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
      label: 'pmndrs',
      description: 'Effects based on pmndrs/postprocessing.',
      icon: 'i-lucide-sparkles',
      to: `${to}/pmndrs`,
      active: route.path.startsWith(`${to}/pmndrs`),
    }, {
      label: 'Three.js',
      description: 'Native Three.js post-processing effects.',
      icon: 'i-simple-icons-threedotjs',
      to: `${to}/three`,
      active: route.path.startsWith(`${to}/three`),
    }]
  })

  return { headerLinks }
}

export const useHeaderLinks = import.meta.client ? createSharedComposable(_useHeaderLinks) : _useHeaderLinks
