import type { InjectionKey, Ref } from 'vue'
import { onMounted, ref, unref } from 'vue'
import { useMutationObserver } from '@vueuse/core'

export const LECHES_DARK_KEY: InjectionKey<Ref<boolean>> = Symbol('leches-dark')

// The nearest `.dark` / `.light` ancestor wins, so a panel can use a different
// theme than the page (e.g. a light and a dark copy side by side).
// Read-only on purpose: VueUse's `useDark()` also writes the `dark` class on <html>
// from its own stored preference, which fights the host app's color mode
// (e.g. Nuxt sets `light` and `useDark()` adds `dark` back when the OS is dark).
export function useIsDark(target: Ref<HTMLElement | null> | HTMLElement | null) {
  const isDark = ref(false)

  if (typeof document === 'undefined') {
    return isDark
  }

  const root = document.documentElement
  const update = () => {
    const scope = unref(target)?.closest('.dark, .light') ?? root
    isDark.value = scope.classList.contains('dark')
  }

  update()
  onMounted(update)

  // Only <html> is observed: watching the whole subtree would fire on every class
  // change in the page. Scope classes on inner wrappers are read once at mount.
  useMutationObserver(root, update, { attributes: true, attributeFilter: ['class'] })

  return isDark
}
