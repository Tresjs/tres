<script setup lang="ts">
import type { RigidBody } from '@tresjs/rapier';
import { usePointer } from '@vueuse/core';
import { Plane, Raycaster, Vector2, Vector3 } from 'three';

const bodyRef = shallowRef<InstanceType<typeof RigidBody> | null>(null)

const { camera, renderer } = useTres()
const raycaster = new Raycaster()
const ndc = new Vector2()
const plane = new Plane(new Vector3(0, 0, 1), 0) // z = 0
const hit = new Vector3()

const { x, y, isInside } = usePointer()
let wasInside = false
const PARK = { x: 10000, y: 10000, z: 10000 }

const { onBeforeRender } = useLoop()
onBeforeRender(() => {
    const rb = bodyRef.value?.instance
    if (!rb || !camera.value) { return }
    if (!isInside.value) {
        if (wasInside) {
            rb.setTranslation(PARK, true)
            wasInside = false
        }
        return
    }
    const canvas = renderer.domElement
    const rect = canvas.getBoundingClientRect()
    ndc.x = ((x.value - rect.left) / rect.width) * 2 - 1
    ndc.y = -((y.value - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(ndc, camera.value)
    raycaster.ray.intersectPlane(plane, hit)
    if (!wasInside) {
        rb.setTranslation({ x: hit.x, y: hit.y, z: 0 }, true)
        wasInside = true
        return
    }
    rb.setNextKinematicTranslation({ x: hit.x, y: hit.y, z: 0 })
})
</script>

<template>
    <RigidBody ref="bodyRef" type="kinematic" collider="ball">
        <TresMesh :visible="false">
            <TresSphereGeometry :args="[2, 16, 16]" />
            <TresMeshBasicMaterial />
        </TresMesh>
    </RigidBody>
</template>