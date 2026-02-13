<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import {
  BallCollider,
  CapsuleCollider,
  ConeCollider,
  CuboidCollider,
  CylinderCollider,
  type ExposedRigidBody,
  Physics,
  RigidBody,
} from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import type { ExposedRigidBody } from '@tresjs/rapier'

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
      <Physics :debug>
        <RigidBody :position="[-2, 0, 0]" :collider="false">
          <BallCollider
            :args="[1, 1, 1]"
            :position="[3, 10, -0.5]"
          />
          <CapsuleCollider :args="[1, 1, 1]" :position="[-2, 10, 0]" />
          <ConeCollider :args="[1, 1, 1]" :position="[0, 10, 2]" />
          <CuboidCollider :args="[1, 1, 1]" :position="[0, 10, -2]" />
          <CylinderCollider :args="[1, 1, 1]" :position="[2, 10, 2]" />
        </RigidBody>

        <RigidBody ref="colliderRef" :collider="false" :position="[-1, 10, 0]">
          <BallCollider
            :args="[1, 1, 1]"
            :friction
            :mass
            :restitution
            :density
          />
        </RigidBody>

        <RigidBody type="fixed" :restitution @click="jump">
          <TresMesh :position="[0, 0, 0]">
            <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
