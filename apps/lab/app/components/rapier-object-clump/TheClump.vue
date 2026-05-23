<script setup lang="ts">
import type { InstancedRigidBody } from '@tresjs/rapier';
import { useTexture } from '@tresjs/cientos';
import { InstancedMesh, MeshStandardMaterial, Object3D, RepeatWrapping, SphereGeometry, Vector3 } from 'three';

const WHITE_COUNT = 26
const BLACK_COUNT = 14
const ATTRACTION_STRENGTH = 0.2
const VELOCITY_DAMPING = 0.5

const geometry = new SphereGeometry(1, 32, 32)

const { state: crossTexture } = useTexture('/textures/cross.webp')
const { state: crossDarkTexture } = useTexture('/textures/cross-dark.webp')

const whiteMaterial = new MeshStandardMaterial({
    color: 'white',
    roughness: 0,
    envMapIntensity: 1,
})
const blackMaterial = new MeshStandardMaterial({
    color: 'white',
    roughness: 0,
    envMapIntensity: 1,
})

watchEffect(() => {
    const tex = crossTexture.value
    const darkTex = crossDarkTexture.value
    if (!tex?.image) { return }
    whiteMaterial.map = tex
    blackMaterial.map = darkTex
    whiteMaterial.needsUpdate = true
    blackMaterial.needsUpdate = true
})

const whiteMeshRef = useTemplateRef<InstancedMesh>('whiteMeshRef')
const blackMeshRef = useTemplateRef<InstancedMesh>('blackMeshRef')
const goldMeshRef = useTemplateRef<InstancedMesh>('goldMeshRef')

const whiteBodyRef = shallowRef<InstanceType<typeof InstancedRigidBody> | null>(null)
const blackBodyRef = shallowRef<InstanceType<typeof InstancedRigidBody> | null>(null)
const goldBodyRef = shallowRef<InstanceType<typeof InstancedRigidBody> | null>(null)

const rfs = (range: number) => (Math.random() - 0.5) * range
const dummy = new Object3D()

const seed = (mesh: InstancedMesh | null, count: number) => {
    if (!mesh) { return }
    for (let i = 0; i < count; i++) {
        dummy.position.set(rfs(20), rfs(20), rfs(20))
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
}

onMounted(() => {
    seed(whiteMeshRef.value, WHITE_COUNT)
    seed(blackMeshRef.value, BLACK_COUNT)
})

const tmpVec = new Vector3()
const { onBeforeRender } = useLoop()

const applyAttraction = (body: InstanceType<typeof InstancedRigidBody> | null) => {
    const contexts = body?.contexts
    if (!contexts?.length) { return }
    for (const ctx of contexts) {
        const t = ctx.rigidBody.translation()
        const v = ctx.rigidBody.linvel()
        tmpVec.set(
            -t.x - v.x * VELOCITY_DAMPING,
            -t.y - v.y * VELOCITY_DAMPING,
            -t.z - v.z * VELOCITY_DAMPING,
        ).multiplyScalar(ATTRACTION_STRENGTH)
        ctx.rigidBody.applyImpulse(tmpVec, true)
    }
}

onBeforeRender(() => {
    applyAttraction(whiteBodyRef.value)
    applyAttraction(blackBodyRef.value)
})
</script>

<template>
    <InstancedRigidBody ref="whiteBodyRef" collider="ball" :linear-damping="0.65" :angular-damping="0.95" :mass="1">
        <TresInstancedMesh ref="whiteMeshRef" :args="[geometry, whiteMaterial, WHITE_COUNT]" cast-shadow
            receive-shadow />
    </InstancedRigidBody>
    <InstancedRigidBody ref="blackBodyRef" collider="ball" :linear-damping="0.65" :angular-damping="0.95" :mass="1">
        <TresInstancedMesh ref="blackMeshRef" :args="[geometry, blackMaterial, BLACK_COUNT]" cast-shadow
            receive-shadow />
    </InstancedRigidBody>
</template>
