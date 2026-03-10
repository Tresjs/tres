<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import {  useControls } from '@tresjs/leches'
import type { ExposedRigidBody } from '@tresjs/rapier'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const uuid = inject(`uuid`)
const ballRef = shallowRef<ExposedRigidBody>()
const cubeRef = shallowRef<ExposedRigidBody>()
const capsuleRef = shallowRef<ExposedRigidBody>()

const jumpBall = () => {
  if (!ballRef.value) {
    return
  }
  ballRef.value.instance.applyImpulse({ x: 0, y: 15, z: 0 }, true)
}

const jumpCube = () => {
  if (!cubeRef.value) {
    return
  }
  cubeRef.value.instance.applyImpulse({ x: 0, y: 15, z: 0 }, true)
}

const jumpCapsule = () => {
  if (!capsuleRef.value) {
    return
  }
  capsuleRef.value.instance.applyImpulse({ x: 0, y: 15, z: 0 }, true)
}

const { debug, friction, mass, restitution, density } = useControls({
  debug: true,
  friction: { value: 0.5, min: 0, max: 1, step: 0.1 },
  mass: { value: 1, min: 0.1, max: 20, step: 0.1 },
  restitution: { value: 0.5, min: 0, max: 2, step: 0.1 },
  density: { value: 1, min: 0.1, max: 20, step: 0.1 },
}, { uuid })
</script>

<template>
  <div class="floating">Click on the mesh to make it jump</div>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 20, 20]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics :debug>
        <RigidBody
          ref="ballRef"
          collider="ball"
          :position="[0, 15, 0]"
          :friction
          :mass
          :restitution
          :density
        >
          <TresMesh @click="jumpBall">
            <TresSphereGeometry />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody
          ref="cubeRef"
          :position="[4, 15, 0]"
          :friction
          :mass
          :restitution
          :density
        >
          <TresMesh @click="jumpCube">
            <TresSphereGeometry />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody
          ref="capsuleRef"
          collider="capsule"
          :position="[-4, 15, 0]"
          :friction
          :mass
          :restitution
          :density
        >
          <TresMesh @click="jumpCapsule">
            <TresSphereGeometry />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed">
          <TresMesh :position="[0, 0, 0]">
            <TresPlaneGeometry :args="[20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
    <TresDirectionalLight :position="[1, 2, 3]" :intensity="1.5" />
  </TresCanvas>
</template>
<style scoped>
.floating {
  position: absolute;
  top: 0;
  left: 0;
  border-bottom-right-radius: 0.5rem;
  z-index: 1;
  background-color: white;
  font-size: 0.75rem;
  color: #333;
  padding: 0.5rem;
}
</style>
