<script setup lang="ts">
import { onMounted, nextTick, shallowRef, unref, watch } from 'vue'
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat'
import { RigidBody, RigidBodyDesc, ColliderDesc } from '@dimforge/rapier3d-compat'
import { Box3, Vector3, type Mesh } from 'three'
import type { TresObject } from '@tresjs/core'
import { useRenderLoop } from '@tresjs/core'
import { useRapierContext } from '../composables/useRapier'

const props = withDefaults(defineProps<{
  type?: 'dynamic' | 'kinematic' | 'static' | 'fixed'
  collider?: 'cuboid' | 'ball' | 'capsule' | 'cone' | 'cylinder' | 'trimesh' | 'heightfield'
}>(), {
  type: 'dynamic',
  collider: 'cuboid',
})

const { world } = await useRapierContext()

const rigidRef = shallowRef<TresObject>()
const rigidBody = shallowRef<any>()
const collider = shallowRef<any>()

watch(rigidRef, (value) => {
  if (!value) return
  createRigidBody(value.children[0])
  createCollider(value.children[0])
})

//
// Methods
//
function createRigidBody(object: TresObject) {
  if (!object) return

  const rigidBodyDesc = RigidBodyDesc[props.type]()
    .setTranslation(object.position.x, object.position.y, object.position.z)
    .setRotation(object.quaternion)

  if (props.type === 'dynamic') {
    rigidBodyDesc.setAdditionalMass(1)
  }

  rigidBodyDesc.userData = {
    uuid: object.uuid,
    name: object.name,
    type: object.type,
  }

  rigidBody.value = world.createRigidBody(rigidBodyDesc)
}

function createCollider(object: TresObject) {
  if (!object) return

  // Create a cuboid collider attached to the dynamic rigidBody.
  object.geometry.computeBoundingBox()
  const { boundingBox } = object.geometry

  const size = boundingBox!.getSize(new Vector3())
  let colliderDesc = ColliderDesc.cuboid(size.x / 2, size.y / 2, size.z / 2)

  if (props.collider === 'ball') {
    colliderDesc = ColliderDesc.ball(size.x / 2)
  }
  else if (props.collider === 'capsule') {
    colliderDesc = ColliderDesc.capsule(size.x / 2, size.y / 2)
  }
  else if (props.collider === 'cone') {
    colliderDesc = ColliderDesc.cone(size.x / 2, size.y / 2)
  }
  else if (props.collider === 'cylinder') {
    colliderDesc = ColliderDesc.cylinder(size.x / 2, size.y / 2)
  }
  /* else if (props.collider === 'trimesh') {
    colliderDesc = ColliderDesc.trimesh(object.geometry)
  }
  else if (props.collider === 'heightfield') {
    colliderDesc = ColliderDesc.heightfield(object.geometry)
  } */
  collider.value = world.createCollider(colliderDesc, rigidBody.value)

  console.log('collider', collider.value)
}

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (!rigidBody.value) return

  const position = rigidBody.value.translation()
  rigidRef.value.children[0].position.set(position.x, position.y, position.z)

  const rotation = rigidBody.value.rotation()
  rigidRef.value.children[0].quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
  
})
</script>

<template>
  <TresGroup ref="rigidRef">
    <slot />
  </TresGroup>
</template>
