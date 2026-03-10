<script setup>
import { RigidBody } from "@tresjs/rapier";
</script>
<template>
        <RigidBody
          type="fixed"
          :restitution="0.5"
          :position="[0, -5, 0]"
          :rotate-x="-Math.PI / 2"
        >
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20]" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed" :restitution="0.5" :position="[0, -4, -10]">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 2.5]" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody
          type="fixed"
          :restitution="0.5"
          :position="[10, -4, 0]"
          :rotate-y="-Math.PI / 2"
        >
          <TresMesh>
            <TresPlaneGeometry :args="[20, 2.5]" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody
          type="fixed"
          :restitution="0.5"
          :position="[-10, -4, 0]"
          :rotate-y="Math.PI / 2"
        >
          <TresMesh>
            <TresPlaneGeometry :args="[20, 2.5]" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
        <RigidBody
          type="fixed"
          :restitution="0.5"
          :position="[0, -4, 10]"
          :rotate-y="Math.PI"
        >
          <TresMesh>
            <TresPlaneGeometry :args="[20, 2.5]" />
            <TresMeshStandardMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
</template>