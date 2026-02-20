<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BallCollider, Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { shallowRef } from 'vue'
import { TresLeches, useControls } from '@tresjs/leches'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const automaticColliderRef = shallowRef()
const customColliderRef = shallowRef()

const onIntersectionWallEnter = (e: any) => {
  // eslint-disable-next-line no-console
  console.log('from rigidBody', e)
}

const onIntersectionWallExit = (e: any) => {
  // eslint-disable-next-line no-console
  console.log('from rigidBody exit', e)
}

const { debug } = useControls({
  acBtn: {
    label: 'Automatic collider test',
    type: 'button',
    onClick: () => {
      automaticColliderRef.value?.instance?.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true)
      automaticColliderRef.value?.instance?.setTranslation({ x: 0, y: 0, z: 0 }, true)
      automaticColliderRef.value?.instance?.resetForces(true)
      automaticColliderRef.value?.instance?.applyImpulse({ x: 5, y: 0, z: 0 }, true)
    },
  },
  ccBtn: {
    label: 'Custom collider test',
    type: 'button',
    onClick: () => {
      customColliderRef.value?.instance?.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true)
      customColliderRef.value?.instance?.setTranslation({ x: 0, y: 0, z: 0 }, true)
      customColliderRef.value?.instance?.resetForces(true)
      customColliderRef.value?.instance?.applyImpulse({ x: -5, y: 0, z: 0 }, true)
    },
  },
  debug: true,
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 8, -30]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics :debug>
        <RigidBody
          ref="automaticColliderRef"
          collider="ball"
        >
          <TresMesh :position="[-8, 8, 0]" name="ball">
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>
        <RigidBody ref="customColliderRef" collider="ball">
          <BallCollider
            :args="[1, 1, 1]"
            :position="[8, 8, 0]"
          />
        </RigidBody>
        <RigidBody
          type="fixed"
          activeCollision
          sensor
          @intersection-enter="onIntersectionWallEnter"
          @intersection-exit="onIntersectionWallExit"
        >
          <TresMesh :position="[0, 5, 0]" :rotate-y="Math.PI * 0.5">
            <TresBoxGeometry :args="[10, 10, 0.5]" />
            <TresMeshBasicMaterial color="#f4f4f4" wireframe />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed" name="fixedFloor" :restitution="0.2">
          <TresMesh :position="[0, 0, 0]">
            <TresPlaneGeometry :args="[20, 20, 1]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
