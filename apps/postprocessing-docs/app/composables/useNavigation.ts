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

    return []
  })

  return { headerLinks }
}

export const useHeaderLinks = import.meta.client ? createSharedComposable(_useHeaderLinks) : _useHeaderLinks
