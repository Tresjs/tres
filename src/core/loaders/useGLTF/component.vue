<script setup lang="ts">
import { ref } from 'vue'
import { useGLTF } from '.'

export interface GLTFModelProps {
  /**
   *
   * The path to the GLTF file.
   *
   * @type {string}
   * @required
   * @memberof GLTFModelProps
   *
   **/
  path: string
  /**
   *
   * Whether to use Draco compression.
   *
   * @type {boolean}
   * @default false
   * @memberof GLTFModelProps
   *
   **/
  draco?: boolean
  /**
   *
   * The path to the Draco decoder.
   *
   * @type {string}
   * @default 'https://www.gstatic.com/draco/versioned/decoders/1.4.1/'
   * @memberof GLTFModelProps
   *
   **/
  decoderPath?: string
}

const props = withDefaults(
  defineProps<{
    path: string
    draco?: boolean
    decoderPath?: string
  }>(),
  {
    draco: false,
    decoderPath: 'https://www.gstatic.com/draco/versioned/decoders/1.4.1/',
  },
)
const modelRef = ref()

defineExpose({
  value: modelRef,
})

const { scene: model } = await useGLTF(props.path as string, {
  draco: props.draco,
  decoderPath: props.decoderPath,
})
</script>

<template>
  <primitive
    ref="modelRef"
    :object="model"
    v-bind="$attrs"
  />
</template>
