<!-- eslint-disable no-console -->
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import {
  BasicShadowMap,
  Group,
  Mesh,
  MeshToonMaterial,
  NoToneMapping,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  TorusKnotGeometry,
} from 'three'
import { ref, watchEffect } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
const canvas = ref()
const meshRef = ref()

const { knot, isVisible } = useControls({
  knot: true,
  isVisible: true,
})

watchEffect(() => {
  if (meshRef.value) {
    console.log(meshRef.value)
  }
})

const torus = new Mesh(
  new TorusGeometry(1, 0.5, 16, 100),
  new MeshToonMaterial({
    color: '#82DBC5',
  }),
)

const torusKnot = new Mesh(
  new TorusKnotGeometry(1, 0.5, 100, 16),
  new MeshToonMaterial({
    color: '#ff00ff',
  }),
)

const sphere = new Mesh(
  new SphereGeometry(1, 32, 32),
  new MeshToonMaterial({
    color: '#82DBC5',
  }),
)

sphere.position.set(2, -2, 0)

const firstGroup = new Group()
firstGroup.add(torus)
firstGroup.add(torusKnot)

const secondGroup = new Group()
secondGroup.add(sphere)

const primitiveRef = ref()

const rotate = () => {
  if (primitiveRef.value) {
    // This doesn't work
    /* torusKnot.rotation.x += 0.01 */
    // This does
    primitiveRef.value.rotation.x += 0.01
    primitiveRef.value.rotation.y += 0.01
  }
}

watchEffect(() => {
  console.log('primitiveRef.value', primitiveRef.value)
})

/* const reactivePrimitiveRef = ref(new Mesh(
  new TorusKnotGeometry(1, 0.5, 100, 16),
  new MeshToonMaterial({
    color: 'orange',
  }),
))

const modelArray = ref([torus, torusKnot, sphere]) */
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
    ref="canvas"
    window-size
    class="awiwi"
    :style="{ background: '#008080' }"
    @render="rotate"
  >
    <TresPerspectiveCamera
      :position="[7, 7, 7]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <!--  <primitive
      :object="reactivePrimitiveRef"
    /> -->
    <!--    <primitive
      v-for="(model, index) of modelArray"
      :key="index"
      :object="model"
      :position="[index * 2, index * 2, 0]"
    /> -->
    <primitive
      v-if="isVisible"
      ref="primitiveRef"
      :object="knot ? torusKnot : torus"
    />
    <!--    <Suspense>
      <DynamicModel />
    </Suspense> -->
    <TresAxesHelper :args="[1]" />
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="2"
      cast-shadow
    />
  </TresCanvas>
</template>
