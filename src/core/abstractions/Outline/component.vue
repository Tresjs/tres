<script setup lang="ts">
import type { TresColor } from '@tresjs/core'
import { normalizeColor, useTres } from '@tresjs/core'
import type { BufferGeometry, Group } from 'three'
import { BackSide, InstancedMesh, Mesh, SkinnedMesh, Vector2 } from 'three'
import { onMounted, onUnmounted, shallowRef, watch } from 'vue'
import OutlineMaterialImpl from './OutlineMaterialImpl'
import { toCreasedNormals } from 'three-stdlib'

// NOTE: Source
// https://github.com/pmndrs/drei/blob/master/src/core/Outlines.tsx

interface OutlineProps {
  /** Outline color, default: black */
  color?: TresColor
  /** Line thickness is independent of zoom, default: false */
  screenspace?: boolean
  /** Outline opacity, default: 1 */
  opacity?: number
  /** Outline transparency, default: false */
  transparent?: boolean
  /** Outline thickness, default 0.05 */
  thickness?: number
  /** Geometry crease angle (-1 === no crease), default: Math.PI, See [BufferGeometryUtils.toCreasedNormals](https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils.toCreasedNormals) */
  angle?: number
  toneMapped?: boolean
  polygonOffset?: boolean
  polygonOffsetFactor?: number
  renderOrder?: number
}

const props = withDefaults(defineProps<OutlineProps>(), {
  color: 'black',
  opacity: 1,
  transparent: false,
  screenspace: false,
  toneMapped: true,
  polygonOffset: false,
  polygonOffsetFactor: 0,
  renderOrder: 0,
  thickness: 0.05,
  angle: Math.PI,
})

const groupRef = shallowRef()

defineExpose({ instance: groupRef })

const material = new OutlineMaterialImpl({ ...props })
const contextSize = new Vector2(1, 1)
let oldAngle = 0
let oldGeometry: BufferGeometry | null = null

function updateMesh(group: Group) {
  const parent = group.parent as Mesh & SkinnedMesh & InstancedMesh
  if (!parent || !parent.geometry) { return }

  if (oldAngle !== props.angle || oldGeometry !== parent.geometry) {
    oldAngle = props.angle
    oldGeometry = parent.geometry

    // NOTE: Remove old mesh
    let mesh = group.children?.[0] as any
    if (mesh) {
      if (props.angle) { mesh.geometry.dispose() }
      group.remove(mesh)
    }

    if (parent.skeleton) {
      mesh = new SkinnedMesh()
      mesh.material = material
      mesh.bind(parent.skeleton, parent.bindMatrix)
      group.add(mesh)
    }
    else if (parent.isInstancedMesh) {
      mesh = new InstancedMesh(parent.geometry, material, parent.count)
      mesh.instanceMatrix = parent.instanceMatrix
      group.add(mesh)
    }
    else {
      mesh = new Mesh()
      mesh.material = material
      group.add(mesh)
    }
    mesh.geometry = props.angle ? toCreasedNormals(parent.geometry, props.angle) : parent.geometry
  }
}

function updateMaterial() {
  material.side = BackSide
  material.transparent = props.transparent
  material.thickness = props.thickness
  material.color = normalizeColor(props.color)
  material.opacity = props.opacity
  material.size = contextSize
  material.screenspace = props.screenspace
  material.toneMapped = props.toneMapped
  material.polygonOffset = props.polygonOffset
  material.polygonOffsetFactor = props.polygonOffsetFactor
}

const sizes = useTres().sizes
watch(() => [sizes.width.value, sizes.height.value], ([w, h]) => {
  contextSize.set(w, h)
})
watch(() => [props.angle], () => {
  if (groupRef.value) { updateMesh(groupRef.value) }
})
watch(() => [props.transparent, props.thickness, props.color, props.opacity, contextSize, props.screenspace, props.toneMapped, props.polygonOffset, props.polygonOffsetFactor], () => updateMaterial(), { immediate: true },
)

onMounted(() => updateMesh(groupRef.value))

onUnmounted(() => {
  const mesh = groupRef.value?.children[0] as Mesh
  if (mesh) {
    mesh.geometry.dispose()
    material.dispose()
    mesh.removeFromParent()
  }
})
</script>

<template>
  <TresGroup ref="groupRef" />
</template>
