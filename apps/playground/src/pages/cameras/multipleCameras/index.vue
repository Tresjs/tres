<script setup lang="ts">
import type { Camera } from 'three'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import TheCameraOperator from './TheCameraOperator.vue'

useControls('fpsgraph')

const camera1 = shallowRef<Camera>()
const camera2 = shallowRef<Camera>()
const camera3 = shallowRef<Camera>()

const cameraUuidList = computed(() => [
  camera1.value?.uuid,
  camera2.value?.uuid,
  camera3.value?.uuid,
])

const { cameras: activeCameraIndex } = useControls({
  cameras: {
    value: 0,
    options: [
      {
        text: 'Camera 1',
        value: 0,
      },
      {
        text: 'Camera 2',
        value: 1,
      },
      {
        text: 'Camera 3',
        value: 2,
      },
    ],
  },
})

const activeCameraUuid = computed(() => cameraUuidList.value[activeCameraIndex.value])
</script>

<template>
  <TresLeches>
    {{ activeCameraUuid }}
  </TresLeches>

  <TresCanvas clear-color="#4f4f4f">
    <TheCameraOperator :active-camera-uuid="activeCameraUuid">
      <TresPerspectiveCamera
        ref="camera1"
        :position="[5, 5, 5]"
        :fov="45"
        :near="0.1"
        :far="1000"
        :look-at="[0, 4, 0]"
      />
      <TresPerspectiveCamera
        ref="camera2"
        :position="[15, 5, 5]"
        :fov="45"
        :near="0.1"
        :far="1000"
        :look-at="[0, 4, 0]"
      />
      <TresPerspectiveCamera
        ref="camera3"
        :position="[-15, 8, 5]"
        :fov="25"
        :near="0.1"
        :far="1000"
        :look-at="[0, 4, 0]"
      />
    </TheCameraOperator>
    <TresAmbientLight :intensity="0.5" />
    <TresMesh :position="[0, 4, 0]">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshToonMaterial color="cyan" />
    </TresMesh>

    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="1"
    />
  </TresCanvas>
</template>
