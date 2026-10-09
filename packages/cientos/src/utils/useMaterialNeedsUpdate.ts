import type { Material } from 'three'
import type { Ref, ShallowRef } from 'vue'
import { watch } from 'vue'

// Both renderers see a shader change (such as `map` from null) only when the material version changes.
export function useMaterialNeedsUpdate(material: ShallowRef<Material | undefined>, props: Ref<object>) {
  watch(props, () => {
    if (material.value) { material.value.needsUpdate = true }
  })
}
