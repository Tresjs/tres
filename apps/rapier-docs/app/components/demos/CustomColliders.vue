<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { ConeCollider, CylinderCollider, Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { useControls } from '@tresjs/leches'
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

const jump = () => {
  if (!ballRef.value) {
    return
  }
  ballRef.value.instance.applyImpulse({ x: 0, y: 15, z: 0 }, true)
}

const controlDefaults = {
  debug: true,
  friction: 0.5,
  mass: 1,
  restitution: 0.5,
  density: 1,
}

const controls = useControls({
  resetBtn: {
    label: 'Reset',
    type: 'button',
    onClick: () => {
      resetControls(controls, controlDefaults)
      resetRigidBody(ballRef.value?.instance)
    },
  },
  debug: controlDefaults.debug,
  friction: { value: controlDefaults.friction, min: 0, max: 1, step: 0.1 },
  mass: { value: controlDefaults.mass, min: 0.1, max: 20, step: 0.1 },
  restitution: { value: controlDefaults.restitution, min: 0, max: 2, step: 0.1 },
  density: { value: controlDefaults.density, min: 0.1, max: 20, step: 0.1 },
}, { uuid })

const { debug, friction, mass, restitution, density } = controls
</script>

<template>
  <button class="floating" @click="jump">Click on the mesh to make it jump</button>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 20, 20]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics :debug>
        <RigidBody
          ref="ballRef"
          collider="ball"
          :friction
          :mass
          :restitution
          :density
        >
          <ConeCollider
            :args="[1, 1]"
            :position="[1, 14, 0]"
            :friction
            :mass
            :restitution
            :density
          />
          <TresMesh :position="[0, 15, 0]" @click="jump">
            <TresSphereGeometry />
            <TresMeshStandardMaterial color="#5672cd" />
          </TresMesh>
          <CylinderCollider
            :args="[0.5, 0.5]"
            :position="[-1, 16, 0]"
            :friction
            :mass
            :restitution
            :density
          />
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
  cursor: pointer;
}
</style>
