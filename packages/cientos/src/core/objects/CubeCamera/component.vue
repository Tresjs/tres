<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import type { Group } from 'three'
import type { CubeCameraOptions } from './useCubeCamera'
import { useCubeCamera } from './useCubeCamera'
import type { MaybeRefOrGetter } from 'vue'
import { shallowRef, toValue } from 'vue'

type Props = {
  /** Number of frames to render, Infinity */
  frames?: MaybeRefOrGetter<number>
} & CubeCameraOptions

const props = withDefaults(defineProps<Props>(), {
  frames: Infinity,
})

const groupRef = shallowRef<Group>()

const { fbo, camera, update } = useCubeCamera(props)

let count = 0

useLoop().onBeforeRender(() => {
  if (groupRef.value && (props.frames === Infinity || (count < toValue(props.frames)))) {
    groupRef.value.visible = false
    update()
    groupRef.value.visible = true

    if (groupRef.value) {
      groupRef.value.traverse((obj) => {
        if ('material' in obj && typeof obj.material === 'object' && obj.material && 'envMap' in obj.material) {
          obj.material.envMap = fbo.value.texture
        }
      })
    }
    count++
  }
})

defineExpose({ instance: groupRef, fbo, camera, update })
</script>

<template>
  <TresGroup ref="groupRef">
    <primitive :object="camera" />
    <slot></slot>
  </TresGroup>
</template>
