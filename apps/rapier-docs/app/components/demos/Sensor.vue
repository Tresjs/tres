<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { type ExposedRigidBody, Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace, Vector3 } from 'three'
import { shallowRef } from 'vue'
import { useControls } from '@tresjs/leches'
import LittleBoxForDemos from './LittleBoxForDemos.vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const rigidCubeRef = shallowRef<ExposedRigidBody | null>(null)
const numberOfIntersections = shallowRef(0)

const onIntersectionEnter = (e: any) => {
  console.log('from rigidBody', e)
  numberOfIntersections.value += 1
}

const onIntersectionExit = (e: any) => {
  console.log('from rigidBody exit', e)
}

const moveCube = (impulse: Vector3) => {
  if (!rigidCubeRef.value) { return }
  rigidCubeRef.value.instance.applyImpulse(impulse, true)
}

const uuid = inject(`uuid`)

const { debug } =useControls({
   debug: true,
  zpos: {
    label: 'Z+',
    type: 'button',
    onClick: () => moveCube( new Vector3(0, 0, 5) )
  },
  zneg: {
    label: 'Z-',
    type: 'button',
    onClick: () => moveCube( new Vector3(0, 0, -5) )
  },
  xpos: {
    label: 'X+',
    type: 'button',
    onClick: () => moveCube( new Vector3(5, 0, 0) )
  },
  xneg: {
    label: 'X-',
    type: 'button',
    onClick: () => moveCube( new Vector3(-5, 0, 0) )
  },
}, { uuid })
</script>

<template>
  <div class="floating">
    <div>
      Intersections enter: <b>{{ numberOfIntersections }}</b>
    </div>
    <div>Check the logs on console to get a complete expose object</div>
  </div>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 11, 11]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics :debug>
        <RigidBody ref="rigidCubeRef" collider="ball">
          <TresMesh :position="[0, 5, 0]">
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody
          type="fixed"
          activeCollision
          sensor
          @intersection-enter="onIntersectionEnter"
          @intersection-exit="onIntersectionExit"
        >
          <TresMesh :position="[0, -4, 7.5]">
            <TresTorusGeometry :args="[3]" />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>
        <RigidBody
          type="fixed"
          activeCollision
          sensor
          @intersection-enter="onIntersectionEnter"
          @intersection-exit="onIntersectionExit"
        >
          <TresMesh :position="[0, -4, -7.5]">
            <TresTorusGeometry :args="[3]" />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <LittleBoxForDemos />
      </Physics>
    </Suspense>
    <TresAmbientLight :intensity="0.5" />
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  button {
    cursor: pointer;
    text-align: left;
  }
}
</style>
