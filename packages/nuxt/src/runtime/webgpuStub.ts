import { defineComponent } from 'vue'

/**
 * Stands in for a component that has no WebGPU version yet. Without it, auto-imports only
 * give Vue's generic "Failed to resolve component" warning.
 */
export function createWebGPUStub(name: string, from: string) {
  return defineComponent({
    name,
    setup() {
      throw new Error(
        `[@tresjs/nuxt] \`${name}\` from ${from} is not available for WebGPU yet. `
        + `Use it with \`tres: { renderer: 'webgl' }\`, or remove it from this scene.`,
      )
    },
  })
}
