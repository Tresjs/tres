<!-- Github Luckystriike: https://github.com/luckystriike22/TresJsPlayground/ -->
<script lang="ts" setup>
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import { Vector2 } from 'three'

const props = defineProps<{
  analyser: any
  dataArray: any
}>()

// composables
const { onBeforeRender } = useLoop()

// refs
const blobRef = shallowRef<any>(null)


onBeforeRender(({ elapsed }) => {
  if (blobRef.value && props.analyser && props.dataArray) {
    props.analyser?.getByteFrequencyData(props.dataArray);

    // calc average frequency
    let sum = 0;
    for (let i = 0; i < props.dataArray?.length; i++) {
      sum += props.dataArray[i];
    }

    uniforms.value.u_frequency.value = sum > 0 ? sum / props.dataArray?.length : 0;
    uniforms.value.u_time.value = elapsed
    blobRef.value.rotation.x += 0.01
  }
})


// shader
// set props to pass into the shader
const uniforms = ref({
  u_resolution: { type: 'V2', value: new Vector2(window.innerWidth, window.innerHeight) },
  u_time: { type: 'f', value: 0.0 },
  u_frequency: { type: 'f', value: 0.0 },
  u_amplitude: { type: 'f', value: 1.5 }
});


</script>

<template>
  <TresPerspectiveCamera :position="[13, 0, 0]" />
  <OrbitControls />
  <TresMesh ref="blobRef">
    <TresIcosahedronGeometry :args="[4, 80]"></TresIcosahedronGeometry>
    <TresShaderMaterial wireframe :uniforms="uniforms" :fragment-shader="fragmentShader"
      :vertex-shader="vertexShader" />
  </TresMesh>
  <TresDirectionalLight :position="[1, 1, 1]" />
  <TresAmbientLight :intensity="1" />
</template>

<style scoped>
.gitBtn {
  margin-bottom: 10px;
  margin-right: 10px;
  z-index: 10;
  color: white;
}

.blobPermissionDialog {
  height: 100vh;
  justify-content: center;
  display: flex;
  background-color: #0c1a30;
  width: 100vw;
  color: white;
  font-size: x-large;
}

.blobPermissionDialog p {
  width: 700px;
}
</style>