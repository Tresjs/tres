<script setup lang="ts">
import { OrbitControls } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
import { Physics, RigidBody } from "@tresjs/rapier";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { useControls } from "@tresjs/leches";
import type { ExposedRigidBody } from "@tresjs/rapier";
import LittleBoxForDemos from "./LittleBoxForDemos.vue";

const gl = {
  clearColor: "#82DBC5",
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
};

const uuid = inject(`uuid`);
const torusRef = shallowRef<ExposedRigidBody>();
const collisionEvent = ref("");

const jump = () => {
  if (!torusRef.value) {
    return;
  }
  torusRef.value.instance.applyImpulse({ x: 0, y: 5, z: 0 }, true);
};

const onCollisionEnter = (event: any) => {
  collisionEvent.value = "Enter";
  console.log("jaime ~ onCollisionEnter ~ event:", event);
};

const onCollisionExit = (event: any) => {
  collisionEvent.value = "Exit";
  console.log("jaime ~ onCollisionExit ~ event:", event);
};

const { debug, activeCollision, enableCcd } = useControls(
  {
    debug: true,
    activeCollision: true,
    enableCcd: true,
  },
  { uuid }
);
</script>

<template>
  <div class="floating">
    <button @click="jump">Click on the mesh to make it jump</button>
    <div>
      Collision event: <b>{{ collisionEvent }}</b>
    </div>
    <div>Check the logs on console to get a complete expose object</div>
  </div>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 20, 20]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics :debug>
        <RigidBody
          ref="torusRef"
          collider="hull"
          enableCcd
          :activeCollision
          @collision-enter="onCollisionEnter"
          @collision-exit="onCollisionExit"
        >
          <TresMesh @click="jump" :position="[0, 15, 0]">
            <TresTorusGeometry />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>

         <LittleBoxForDemos />

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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  button{
     cursor: pointer;
     text-align: left;
  }
}
</style>
