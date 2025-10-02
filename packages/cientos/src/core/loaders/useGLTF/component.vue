<script setup lang="ts">
import { watchEffect } from 'vue'
import { Mesh } from 'three'
import { useGLTF } from '.'

const props = withDefaults(
  defineProps<GLTFModelProps>(),
  {
    draco: false,
    castShadow: false,
    receiveShadow: false,
    decoderPath: 'https://www.gstatic.com/draco/versioned/decoders/1.4.1/',
  },
)

const { state, isLoading } = useGLTF(props.path as string, {
  draco: props.draco,
  decoderPath: props.decoderPath,
})

defineExpose({
  instance: state,
})

// Apply shadow settings when the model loads or shadow props change
watchEffect(() => {
  if (state.value?.scene && (props.castShadow || props.receiveShadow)) {
    state.value.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = props.castShadow
        child.receiveShadow = props.receiveShadow
      }
    })
  }
})
</script>

<script lang="ts">
export interface GLTFModelProps {
  /**
   *
   * The path to the GLTF file.
   *
   * @type {string}
   * @required
   * @memberof GLTFModelProps
   *
   */
  path: string
  /**
   *
   * Whether to use Draco compression.
   *
   * @type {boolean}
   * @default false
   * @memberof GLTFModelProps
   *
   */
  draco?: boolean
  /**
   *
   * Whether to use cast-shadow to the model.
   *
   * @type {boolean}
   * @default false
   * @memberof GLTFModelProps
   *
   */
  castShadow?: boolean
  /**
   *
   * Whether to use receive-shadow to the model.
   *
   * @type {boolean}
   * @default false
   * @memberof GLTFModelProps
   *
   */
  receiveShadow?: boolean
  /**
   *
   * The path to the Draco decoder.
   *
   * @type {string}
   * @default 'https://www.gstatic.com/draco/versioned/decoders/1.4.1/'
   * @memberof GLTFModelProps
   *
   */
  decoderPath?: string
}
</script>

<template>
  <primitive
    v-if="!isLoading && state?.scene"
    :object="state?.scene"
    v-bind="$attrs"
  />
</template>
