/**
 * Internal context for the DecalDebugUI sub-components.
 * `DecalDebugUI.vue` provides it, `Handle.vue` / `Dock.vue` / `LayerList.vue` consume.
 */
import type { InjectionKey, Ref } from 'vue'
import type { Texture } from 'three'
import type { DecalJsonEntry } from '../Decal.vue'
import type { DecalEditorSession } from '../useDecalEditor'

/**
 * The host provides a mesh-name-keyed map of decal slices, e.g.
 * `{ sphere: [...], box: [...] }`. Each key matches one `<Decal>`'s
 * `v-model:data` so import/export round-trips preserve ownership.
 */
export type DecalLayout = Record<string, DecalJsonEntry[]>

/** Internal — triggers a browser download for a `DecalLayout` JSON. */
export function downloadDecalLayout(layout: DecalLayout, filename: string): void {
  if (typeof document === 'undefined' || typeof URL === 'undefined') { return }
  const json = JSON.stringify(layout, null, 2)
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.rel = 'noopener'
  link.target = '_self'
  link.style.position = 'fixed'
  link.style.top = '0'
  link.style.left = '0'
  link.style.opacity = '0'
  link.style.pointerEvents = 'none'
  // Firefox refuses a download click on a detached anchor.
  document.body.appendChild(link)
  link.click()
  // Defer cleanup so the browser can claim the blob URL.
  setTimeout(() => {
    link.remove()
    URL.revokeObjectURL(url)
  }, 1000)
}

export interface DecalDebugContext {
  session: Ref<DecalEditorSession | null>
  theme: Ref<'light' | 'dark'>
  layout: Ref<DecalLayout>
  /** True when any mesh slice contains at least one stamped decal. */
  hasData: Ref<boolean>
  textures: Ref<Texture[]>
  isSnapEnabled: Ref<boolean>
  /** Rotation step in degrees applied when snap is on. */
  snapAngleDeg: Ref<number>
  /** Overlay root — children read its rect for canvas-relative NDC math. */
  rootRef: Ref<HTMLDivElement | null>
  commit: () => void
  cancel: () => void
  remove: () => void
  exportLayout: () => void
  importLayoutFromFile: (file: File) => void
}

export const DECAL_DEBUG_KEY: InjectionKey<DecalDebugContext> = Symbol('cientos-decal-debug-ui')

export function getTextureSrc(tex: Texture | null | undefined): string | undefined {
  const img = tex?.image as { src?: string } | undefined
  return img?.src
}

export function getTextureLabel(tex: Texture | null | undefined): string {
  return tex?.name || 'texture'
}
