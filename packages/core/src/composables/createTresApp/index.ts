import type { Component, ShallowRef } from 'vue'
import { ACESFilmicToneMapping, PCFSoftShadowMap } from 'three'
import { createApp, defineComponent, h, shallowRef } from 'vue'
import type { ContextEmits, ContextProps } from '../../components/Context.vue'
import Context from '../../components/Context.vue'
import { extend as catalogueExtend } from '../../core/catalogue'
import type { TresContext } from '../useTresContextProvider'

type ContextExposed = { context: ShallowRef<TresContext>, dispose: () => void }

const TRES_APP_DEFAULTS: Partial<ContextProps> = {
  antialias: true,
  renderMode: 'always',
  clearColor: '#000000',
  clearAlpha: 1,
  toneMapping: ACESFilmicToneMapping,
  shadowMapType: PCFSoftShadowMap,
}

export type TresAppOptions = Omit<ContextProps, 'extends'>

export interface TresApp {
  /**
   * Register Three.js classes into the catalogue so they can be used
   * as `<TresMesh>`, `<TresBoxGeometry>` etc. inside the rendered component.
   */
  extend: (classes: Parameters<typeof catalogueExtend>[0]) => TresApp
  /**
   * Render a Vue component as the scene content.
   * Can be called multiple times to swap scene components.
   */
  render: (component: Component) => TresApp
  /**
   * Dispose the TresJS context and unmount the internal Vue app.
   */
  dispose: () => void
  /**
   * The underlying TresContext once the renderer is ready.
   */
  readonly context: TresContext | undefined
  /**
   * Register event listeners forwarded from the internal Context.
   */
  on: <K extends keyof ContextEmits>(event: K, handler: (...args: ContextEmits[K]) => void) => TresApp
}

/**
 * Programmatic alternative to `<TresCanvas>` that does NOT auto-extend the
 * full THREE namespace, enabling proper tree-shaking.
 *
 * @example
 * ```ts
 * import { createTresApp } from '@tresjs/core'
 * import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three'
 * import MyScene from './MyScene.vue'
 *
 * const root = createTresApp(canvas, { windowSize: true })
 * root.extend({ Mesh, BoxGeometry, MeshStandardMaterial })
 * root.render(MyScene)
 * ```
 */
export function createTresApp(canvas: HTMLCanvasElement, options: TresAppOptions = {}): TresApp {
  // Apply the same canvas styles that TresCanvas uses so resize works correctly
  const { windowSize } = options
  Object.assign(canvas.style, {
    display: 'block',
    width: '100%',
    height: '100%',
    position: windowSize ? 'fixed' : 'relative',
    top: '0',
    left: '0',
    pointerEvents: 'auto',
    touchAction: 'none',
  })

  const slotComponent = shallowRef<Component | null>(null)
  let contextInstance: ContextExposed | null = null
  const eventHandlers: Partial<Record<keyof ContextEmits, ((...args: unknown[]) => void)[]>> = {}

  function buildEmitBindings(): Record<string, (...args: unknown[]) => void> {
    const bindings: Record<string, (...args: unknown[]) => void> = {}
    for (const [event, handlers] of Object.entries(eventHandlers)) {
      const key = `on${event.charAt(0).toUpperCase()}${event.slice(1)}`
      bindings[key] = (...args: unknown[]) => handlers?.forEach(h => h(...args))
    }
    return bindings
  }

  const Root = defineComponent({
    setup() {
      return () => h(
        Context,
        {
          canvas,
          ...TRES_APP_DEFAULTS,
          ...options,
          extends: {},
          ref: (el) => { contextInstance = el as ContextExposed | null },
          ...buildEmitBindings(),
        },
        { default: () => slotComponent.value ? [h(slotComponent.value)] : [] },
      )
    },
  })

  const mountEl = document.createElement('div')
  const app = createApp(Root)
  app.mount(mountEl)

  const tresApp: TresApp = {
    extend(classes) {
      catalogueExtend(classes)
      return tresApp
    },
    render(component) {
      slotComponent.value = component
      return tresApp
    },
    dispose() {
      contextInstance?.dispose?.()
      app.unmount()
    },
    get context() {
      return contextInstance?.context?.value
    },
    on(event, handler) {
      if (!eventHandlers[event]) {
        eventHandlers[event] = []
      }
      eventHandlers[event]!.push(handler as (...args: unknown[]) => void)
      return tresApp
    },
  }

  return tresApp
}
