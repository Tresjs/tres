<script setup lang="ts">
import { Camera } from 'three'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches';
import '@tresjs/leches/styles'
const state = reactive({
  clearColor: '#4f4f4f',
  shadows: true,
  alpha: false,
})

useControls('fpsgraph')

const camera1 = shallowRef<Camera>()
const camera2 = shallowRef<Camera>()
const camera3 = shallowRef<Camera>()


const activeCameraUuid = ref<string>()

watchEffect(() => {
  activeCameraUuid.value = camera1.value?.uuid
})
</script>

<template>
  <div>
    {{ activeCameraUuid }}
    <select v-model="activeCameraUuid">
      <option :value="camera1?.uuid">cam 1</option>
      <option :value="camera2?.uuid">cam 2</option>
      <option :value="camera3?.uuid">cam 3</option>
    </select>
    <div class="w-1/2 aspect-video">
      <TresCanvas v-bind="state">
        <TheCameraOperator :active-camera-uuid="activeCameraUuid">
          <TresPerspectiveCamera ref="camera1" :position="[5, 5, 5]" :fov="45" :near="0.1" :far="1000"
            :look-at="[0, 4, 0]" />
          <TresPerspectiveCamera ref="camera2" :position="[15, 5, 5]" :fov="45" :near="0.1" :far="1000"
            :look-at="[0, 4, 0]" />
          <TresPerspectiveCamera ref="camera3" :position="[-15, 8, 5]" :fov="25" :near="0.1" :far="1000"
            :look-at="[0, 4, 0]" />
        </TheCameraOperator>
        <LocalOrbitControls />
        <TresAmbientLight :intensity="0.5" />
        <TresMesh :position="[0, 4, 0]">
          <TresBoxGeometry :args="[1, 1, 1]" />
          <TresMeshToonMaterial color="cyan" />
        </TresMesh>

        <Suspense>
          <TestSphere />
        </Suspense>
        <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" />
      </TresCanvas>
    </div>
    <TresLeches />
  </div>
</template>
