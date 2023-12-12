<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

/* import { TresLeches, Perf, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles' */
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

/* const { isShown } = useControls({
  isShown: true,
}) */

const ctx = ref(null)

watchEffect(() => {
  if (!ctx.value) return
  console.log('ctx', ctx.value)
})

const isShown = ref(true)
/* 
useControls({
  button: {
    label: 'Render dispose',
    type: 'button',
    onClick() {
      ctx.value.dispose()
    },
  },
}) */

// Route change example

/* useControls({
  button: {
    label: 'Go other page',
    type: 'button',
    onClick() {
      router.push('/empty')
    },
  },
}) */
</script>

<template>
  <RouterLink to="empty">
    Go
  </RouterLink>
  <button @click="isShown = !isShown">
    Toggle
  </button>
  <!--   <TresLeches /> -->
  <TresCanvas
    v-bind="gl"
    ref="ctx"
  >
    <!--    <Perf /> -->
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Suspense> 
      <AkuAku v-if="isShown" />
    </Suspense>
    <TresGroup v-if="isShown">
      <TresMesh
        :position="[0, 0, 0]"
      >
        <TresSphereGeometry />
        <TresMeshToonMaterial color="teal" />
      </TresMesh>
      <TresMesh
       
        :position="[2, 0, 0]"
      >
        <TresSphereGeometry />
        <TresMeshToonMaterial color="pink" />
      </TresMesh>
    </TresGroup>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>