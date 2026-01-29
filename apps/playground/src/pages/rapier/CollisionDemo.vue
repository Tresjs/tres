<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BallCollider, Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { shallowRef } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const rigidTorusRef = shallowRef()

const jump = () => {
  if (!rigidTorusRef.value) { return }
  rigidTorusRef.value.instance.applyImpulse({ x: 0, y: 5, z: 0 }, true)
}

const onCollisionEnter = (event: any) => {
  // eslint-disable-next-line no-console
  console.log('Collision enter', event)
}

const onCollisionEnterBall = (event: any) => {
  // eslint-disable-next-line no-console
  console.log('Collision ball enter', event.source.context.collider.collisionGroups())
}

const onCollisionEnterBall_2 = (event: any) => {
  // eslint-disable-next-line no-console
  console.log('Ball collided with surface', event.source.context.collider.collisionGroups())
}

const onCollisionExit = (event: any) => {
  // eslint-disable-next-line no-console
  console.log('Collision exit', event)
}
</script>

<template>
  <TresCanvas v-bind="gl" >
    <TresPerspectiveCamera :position="[0, 11, 30]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics debug>
        <RigidBody
          ref="rigidTorusRef"
          name="rigidTorus"
          enableCcd
          activeCollision
          @collision-enter="onCollisionEnter"
          @collision-exit="onCollisionExit"
        >
          <TresMesh :position="[0, 8, 0]" @click="jump">
            <TresTorusGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
          <TresMesh :position="[-5, 7, 0]">
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody
          @collision-enter="onCollisionEnterBall"
        >
          <BallCollider
            :args="[1, 1, 1]"
            :position="[8, 15, 0]"
            activeCollision
            @collision-enter="onCollisionEnterBall_2"
          />
        </RigidBody>

        <RigidBody type="fixed" name="fixedFloor">
          <TresMesh :position="[0, 0, 0]">
            <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
