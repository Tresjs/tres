import { logWarning, useTresContext } from '@tresjs/core'

const warned = new Set<string>()

/**
 * Warns once per component when a WebGL-only component mounts on a WebGPURenderer canvas.
 *
 * `@tresjs/cientos/webgpu` does not export these components, so the warning reaches users who
 * import them from the root entry. It warns instead of throwing: some of them partly work, such as
 * `Html`, whose DOM part works and only the occlusion material fails.
 * `scripts/check-entries.mjs` checks that every name in its WEBGL_ONLY list calls this.
 *
 * @param name - The component name, as exported from the root entry.
 * @param reason - What does not work under WebGPU, as the end of "it ...".
 */
export function useWebGPUSupportWarning(name: string, reason: string) {
  // The isWebGPU flag checks the renderer class, not the backend: GLSL materials also fail on
  // WebGPURenderer's WebGL2 fallback backend.
  const { isWebGPU } = useTresContext()
  if (!isWebGPU.value || warned.has(name)) { return }

  warned.add(name)
  logWarning(`<${name}> does not support WebGPURenderer yet: it ${reason}. See https://cientos.tresjs.org/getting-started/webgpu`)
}
