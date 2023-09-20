<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const boxRef: ShallowRef<THREE.Mesh | null> = shallowRef(null)

const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta
    boxRef.value.rotation.z = elapsed * 0.2
  }
})

const camera = ref(null)

watchEffect(() => {
  if (camera.value) {
    camera.value.lookAt(0, 0, 0)
  }
})

const transformState = shallowReactive({
  mode: 'translate',
  size: 1,
  axis: 'XY',
  showX: true,
  showY: true,
  showZ: true,
})
</script>x

<template>
  <TresCanvas v-bind="gl">
    <!--  <OrbitControls /> -->
    <TresPerspectiveCamera
      ref="camera"
      :position="[3, 3, 3]"
    />
    <OrbitControls make-default />
    <TresMesh
      ref="boxRef"
      :scale="1"
    >
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="2"
    />
  </TresCanvas>
</template>
