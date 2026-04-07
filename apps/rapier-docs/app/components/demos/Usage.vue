<script setup lang="ts" >
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Physics, RigidBody } from '@tresjs/rapier'
import { useControls } from '@tresjs/leches'

const { debug } = useControls({
   debug: false,
}, { uuid: inject(`uuid`) })

</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[15, 15, 15]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics  :debug>
        <RigidBody  collider="ball" :restitution="0.75">
          <TresMesh :position="[0, 8, 0]">
            <TresSphereGeometry />
            <TresMeshStandardMaterial color="#5672cd" />
          </TresMesh>
          </RigidBody>
          <RigidBody type="fixed" :rotate-x="-Math.PI / 2" :restitution="0.75">
            <TresMesh :position="[0, 0, 0]">
              <TresPlaneGeometry :args="[20, 20, 20]"  />
              <TresMeshBasicMaterial color="#f4f4f4" />
            </TresMesh>
          </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
