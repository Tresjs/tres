import type { Material, Mesh } from 'three/webgpu'
import type { MaybeRefOrGetter } from 'vue'
import { onUnmounted, toValue, watch } from 'vue'

// useGLTF caches the scene between portal mounts, so every swapped mesh gets its GLB material back on unmount.
export function useMaterialSwap(target: MaybeRefOrGetter<Mesh | Mesh[] | null | undefined>, material: Material) {
  const originals = new Map<Mesh, Material | Material[]>()

  // immediate: the nodes are already loaded when a cached portal remounts.
  watch(() => toValue(target), (value) => {
    const meshes = Array.isArray(value) ? value : value ? [value] : []
    for (const mesh of meshes) {
      if (originals.has(mesh)) { continue }
      originals.set(mesh, mesh.material)
      mesh.material = material
    }
  }, { immediate: true })

  onUnmounted(() => {
    for (const [mesh, original] of originals) { mesh.material = original }
    material.dispose()
  })
}
