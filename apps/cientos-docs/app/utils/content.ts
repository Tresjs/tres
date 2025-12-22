import type { ContentNavigationItem } from '@nuxt/content'

export const navigationInjectionKey: InjectionKey<Ref<ContentNavigationItem[] | undefined>> = Symbol('navigation')

export function navPageFromPath(path: string, tree: ContentNavigationItem[]): ContentNavigationItem | undefined {
  for (const file of tree) {
    if (file.path === path) {
      return file
    }

    if (file.children) {
      const result = navPageFromPath(path, file.children)
      if (result) {
        return result
      }
    }
  }
}
