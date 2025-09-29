<script setup lang="ts">
import { watchEffect } from 'vue'
import { Mesh } from 'three'
import type { Group } from 'three'
import { useFBX } from '.'

const props = withDefaults(defineProps<FBXModelProps>(), {
  castShadow: false,
  receiveShadow: false,
})

// Use the new reactive useFBX composable with reactive path
const { state: model } = useFBX(props.path as string)

defineExpose({
  instance: model,
})

// Apply shadow settings when the model loads or shadow props change
watchEffect(() => {
  if (model.value && (props.castShadow || props.receiveShadow)) {
    ;(model.value as Group).traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = props.castShadow
        child.receiveShadow = props.receiveShadow
      }
    })
  }
})
</script>

<script lang="ts">
export interface FBXModelProps {
  /**
   * Path to the FBX file.
   *
   * @type {string}
   * @memberof FBXModelProps
   * @required
   */
  path: string
  /**
   *
   * Whether to use cast-shadow to the model.
   *
   * @type {boolean}
   * @default false
   * @memberof FBXModelProps
   *
   */
  castShadow?: boolean
  /**
   *
   * Whether to use receive-shadow to the model.
   *
   * @type {boolean}
   * @default false
   * @memberof FBXModelProps
   *
   */
  receiveShadow?: boolean
}
</script>

<template>
  <primitive
    :object="model"
    v-bind="$attrs"
  />
</template>
