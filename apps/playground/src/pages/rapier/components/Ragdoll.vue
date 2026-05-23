<script lang="ts" setup>
import {
  CuboidCollider,
  type ExposedRigidBody,
  RigidBody,
  SphericalJoint,
  type VectorArray,
} from '@tresjs/rapier'
import { onMounted, onUnmounted, shallowRef, type ShallowRef } from 'vue'

const headRef: ShallowRef<ExposedRigidBody | null> = shallowRef(null)
const torsoRef: ShallowRef<ExposedRigidBody | null> = shallowRef(null)
const upperArmL: ShallowRef<ExposedRigidBody | null> = shallowRef(null)
const lowerArmL: ShallowRef<ExposedRigidBody | null> = shallowRef(null)

const upperArmR: ShallowRef<ExposedRigidBody | null> = shallowRef(null)
const lowerArmR: ShallowRef<ExposedRigidBody | null> = shallowRef(null)

const upperLegL: ShallowRef<ExposedRigidBody | null> = shallowRef(null)
const lowerLegL: ShallowRef<ExposedRigidBody | null> = shallowRef(null)

const upperLegR: ShallowRef<ExposedRigidBody | null> = shallowRef(null)
const lowerLegR: ShallowRef<ExposedRigidBody | null> = shallowRef(null)

const stiffness = 0.02

const torsoWidth = 0.4
const torsoHeight = 0.4

const headSize = 0.2

const armLength = 0.25
const armThickness = 0.15

const legSegmentHeight = torsoHeight * 0.8
const legThickness = 0.16

const localAnchorHead: VectorArray = [0, -headSize / 2 - stiffness, 0]
const localAnchorNeck: VectorArray = [0, torsoHeight / 2, 0]

const localAnchorLTorso: VectorArray = [(torsoWidth / 2) + stiffness, 0.1, 0]
const localAnchorLArm: VectorArray = [-armLength / 2, 0, 0]

const localAnchorLArmBottom: VectorArray = [(armLength / 2) + stiffness, 0, 0]
const localAnchorLArmLower: VectorArray = [-armLength / 2, 0, 0]

const localAnchorRTorso: VectorArray = [-(torsoWidth / 2) - stiffness, 0.1, 0]
const localAnchorRArm: VectorArray = [armLength / 2, 0, 0]

const localAnchorRArmBottom: VectorArray = [-(armLength / 2) - stiffness, 0 / 2, 0.0]
const localAnchorRArmLower: VectorArray = [armLength / 2, 0 / 2, 0]

const localAnchorLTorsoBottom: VectorArray = [-(torsoWidth / 2) + legThickness / 2, -torsoHeight / 2 - stiffness, 0]
const localAnchorLLegUpper: VectorArray = [0, legSegmentHeight / 2, 0]

const localAnchorLLegUpperLower: VectorArray = [0, -legSegmentHeight / 2 - stiffness, 0]
const localAnchorLLegLowerTop: VectorArray = [0, legSegmentHeight / 2, 0]

const localAnchorRTorsoBottom: VectorArray = [+(torsoWidth / 2) - legThickness / 2, -torsoHeight / 2 - stiffness, 0]
const localAnchorRLegUpper: VectorArray = [0, legSegmentHeight / 2, 0]

const localAnchorRLegUpperLower: VectorArray = [0, -legSegmentHeight / 2 - stiffness, 0]
const localAnchorRLegLowerTop: VectorArray = [0, legSegmentHeight / 2, 0]

const handleDomClick = () => {
  if (!headRef.value) { return }
  headRef.value.instance?.applyImpulse({ x: 0, y: 10, z: 0 }, true)
}

onMounted(() => {
  document.addEventListener('click', handleDomClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDomClick)
})
</script>

<template>
  <RigidBody ref="headRef">
    <CuboidCollider :args="[headSize / 2, headSize / 2, headSize / 2]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[headRef?.instance, torsoRef?.instance]"
    :params="[
      localAnchorHead,
      localAnchorNeck,
    ]"
  />
  <RigidBody ref="torsoRef">
    <CuboidCollider :args="[torsoWidth / 2, torsoHeight / 2, .1]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[torsoRef?.instance, upperArmL?.instance]"
    :params="[
      localAnchorLTorso,
      localAnchorLArm,
    ]"
  />

  <RigidBody ref="upperArmL">
    <CuboidCollider :args="[armLength / 2, armThickness / 2, armThickness / 2]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[upperArmL?.instance, lowerArmL?.instance]"
    :params="[
      localAnchorLArmBottom,
      localAnchorLArmLower,
    ]"
  />

  <RigidBody ref="lowerArmL">
    <CuboidCollider :args="[armLength / 2, armThickness / 2, armThickness / 2]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[torsoRef?.instance, upperArmR?.instance]"
    :params="[
      localAnchorRTorso,
      localAnchorRArm,
    ]"
  />

  <RigidBody ref="upperArmR">
    <CuboidCollider :args="[armLength / 2, armThickness / 2, armThickness / 2]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[upperArmR?.instance, lowerArmR?.instance]"
    :params="[
      localAnchorRArmBottom,
      localAnchorRArmLower,
    ]"
  />

  <RigidBody ref="lowerArmR">
    <CuboidCollider :args="[armLength / 2, armThickness / 2, armThickness / 2]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[torsoRef?.instance, upperLegL?.instance]"
    :params="[
      localAnchorLTorsoBottom,
      localAnchorLLegUpper,
    ]"
  />

  <RigidBody ref="upperLegL">
    <CuboidCollider :args="[legThickness / 2, legSegmentHeight / 2, legThickness / 2]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[upperLegL?.instance, lowerLegL?.instance]"
    :params="[
      localAnchorLLegUpperLower,
      localAnchorLLegLowerTop,
    ]"
  />

  <RigidBody ref="lowerLegL">
    <CuboidCollider :args="[legThickness / 2, legSegmentHeight / 2, legThickness / 2]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[torsoRef?.instance, upperLegR?.instance]"
    :params="[
      localAnchorRTorsoBottom,
      localAnchorRLegUpper,
    ]"
  />

  <RigidBody ref="upperLegR">
    <CuboidCollider :args="[legThickness / 2, legSegmentHeight / 2, legThickness / 2]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[upperLegR?.instance, lowerLegR?.instance]"
    :params="[
      localAnchorRLegUpperLower,
      localAnchorRLegLowerTop,
    ]"
  />

  <RigidBody ref="lowerLegR">
    <CuboidCollider :args="[legThickness / 2, legSegmentHeight / 2, legThickness / 2]" />
  </RigidBody>
</template>
