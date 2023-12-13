<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { TresLeches, Perf, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import { OrbitControls } from '@tresjs/cientos'
import { useRouter } from 'vue-router'
import AkuAku from './AkuAku.vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const router = useRouter()

const { sphere } = useControls({
  sphere: true,
})

const ctx = ref(null)

watchEffect(() => {
  if (!ctx.value) return
  console.log('ctx', ctx.value)
})

useControls({
  button: {
    label: 'Render dispose',
    type: 'button',
    onClick() {
      ctx.value.dispose()
    },
  },

})
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
    ref="ctx"
  >
    <Perf />
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Suspense> 
      <AkuAku v-if="sphere" />
    </Suspense>
    <!--  <TresMesh
      v-if="sphere.value"
      :position="[0, 0, 0]"
    >
      <TresSphereGeometry />
      <TresMeshStandardMaterial color="teal" />
    </TresMesh> -->
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>