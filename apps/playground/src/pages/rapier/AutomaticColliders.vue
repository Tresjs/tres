<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const colliderRef = shallowRef<ExposedRigidBody>()
const jump = () => {
  if (!colliderRef.value) {
    return
  }
  colliderRef.value.instance.applyImpulse({ x: 0, y: 15, z: 0 }, true)
}

const { debug, friction, mass, restitution, density } = useControls({
  debug: true,
  friction: { value: 0.5, min: 0, max: 1, step: 0.1 },
  mass: { value: 1, min: 0.1, max: 100, step: 0.1 },
  restitution: { value: 0.5, min: 0, max: 1, step: 0.1 },
  density: { value: 1, min: 0.1, max: 100, step: 0.1 },
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 25, 25]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics :debug="debug">
        <RigidBody
          ref="colliderRef"
          collider="ball"
          :position="[0, 15, 0]"
          :friction="friction"
          :mass="mass"
          :restitution="restitution"
          :density="density"
        >
          <TresMesh @click="jump">
            <TresSphereGeometry />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed">
          <TresMesh :position="[0, 0, 0]">
            <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
    <TresDirectionalLight :position="[1, 2, 3]" :intensity="1.5" />
  </TresCanvas>
</template>
