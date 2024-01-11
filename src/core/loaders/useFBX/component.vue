<script setup lang="ts">
import { ref } from 'vue'
import { useFBX } from '.'

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
   **/
  castShadow?: boolean
  /**
   *
   * Whether to use receive-shadow to the model.
   *
   * @type {boolean}
   * @default false
   * @memberof FBXModelProps
   *
   **/
  receiveShadow?: boolean
}

const props = withDefaults(defineProps<{
  path: string
  castShadow?: boolean
  receiveShadow?: boolean
}>(), {
  castShadow: false,
  receiveShadow: false,
})

const modelRef = ref()

defineExpose({
  value: modelRef,
})

const model = await useFBX(props.path as string)

if ( props.castShadow || props.receiveShadow ) {
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = props.castShadow
      child.receiveShadow = props.receiveShadow
    }
  })
}
</script>

<template>
  <primitive
    ref="modelRef"
    :object="model"
    v-bind="$attrs"
  />
</template>