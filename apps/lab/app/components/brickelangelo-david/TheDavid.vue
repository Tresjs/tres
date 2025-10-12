<script setup lang="ts">
import type { Group } from 'three'
import { InstancedMesh, MeshPhongMaterial, Vector3, Object3D } from 'three'
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js'
import { useMouse } from '@vueuse/core'

const emit = defineEmits(['ready'])

const groupRef = ref<Group>()

const { nodes } = useGLTF('/models/brickelangelo/david.glb')

const david = computed(() => nodes.value.David)

const { x, y } = useMouse()

watch([x, y], () => {
  if (!groupRef.value) return
  groupRef.value.rotation.y = -x.value * 0.0001
})

const { nodes: brickNodes } = useGLTF('/models/brickelangelo/brick.glb')

const brick = computed(() => brickNodes.value.LegoPiece)
const instanceCount = 75000 // or whatever count you want

const brickMaterial = new MeshPhongMaterial({ color: 'lightgray' })
const brickInstancedMesh = computed(() => new InstancedMesh(brick.value?.geometry, brickMaterial, instanceCount))

useControls('fpsgraph')
const isReady = ref(false)
watch([david, brickInstancedMesh], ([davidModel, brickInstancedMesh]) => {
  if (!davidModel || !brickInstancedMesh) return
  const sampler = new MeshSurfaceSampler(davidModel)
    .setWeightAttribute('uv') // Use UVs to weight the sampling
    .build()

  const dummy = new Object3D()
  const brickSize = 0.03 // Define according to the size of your brick piece

  for (let i = 0; i < instanceCount; i++) {
    const sampledPoint = new Vector3()
    sampler.sample(sampledPoint)

    const alignedPoint = new Vector3(
      Math.round(sampledPoint.x / brickSize) * brickSize,
      Math.round(sampledPoint.y / brickSize) * brickSize,
      Math.round(sampledPoint.z / brickSize) * brickSize,
    )

    dummy.position.copy(alignedPoint)
    dummy.scale.set(brickSize, brickSize, brickSize)
    dummy.updateMatrix()
    brickInstancedMesh.setMatrixAt(i, dummy.matrix)
  }

  brickInstancedMesh.instanceMatrix.needsUpdate = true
  isReady.value = true
  emit('ready')
})


</script>

<template>
  <TresGroup ref="groupRef">
    <primitive v-if="isReady" :object="brickInstancedMesh" />
  </TresGroup>
</template>
