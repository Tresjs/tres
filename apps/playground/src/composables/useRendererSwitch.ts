import type { TresRendererSetupContext } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { WebGLRenderer } from 'three'
import { toValue, watch } from 'vue'

/** Reloads the page with `key=value` in the query string. */
export function reloadWithQuery(key: string, value: string) {
  const url = new URL(location.href)
  url.searchParams.set(key, value)
  location.href = url.toString()
}

const createWebGLRenderer = (ctx: TresRendererSetupContext) => new WebGLRenderer({
  canvas: toValue(ctx.canvas),
  antialias: true,
})

/**
 * Adds a `renderer` control (webgpu / webgl) to the Leches panel, so a WebGPU page can render the
 * same scene with WebGLRenderer for comparison. Returns the value for the `renderer` prop of the
 * `/webgpu` TresCanvas: undefined keeps its WebGPURenderer default.
 *
 * A change reloads the page instead of remounting the canvas, so no component has to survive a
 * dispose. `<Environment>` with Lightformer children, for example, throws when it unmounts.
 */
export function useRendererSwitch(uuid: string) {
  const initial = new URLSearchParams(location.search).get('renderer') === 'webgl' ? 'webgl' : 'webgpu'
  const { renderer } = useControls({ renderer: { value: initial, options: ['webgpu', 'webgl'] } }, { uuid })

  watch(renderer, value => reloadWithQuery('renderer', value))

  return initial === 'webgl' ? createWebGLRenderer : undefined
}
