import { normalizeColor, useTres } from '@tresjs/core'
import type { BufferGeometry, Group } from 'three'
import { BackSide, InstancedMesh, Mesh, SkinnedMesh } from 'three'
import { toCreasedNormals } from 'three-stdlib'
import type { ShallowRef } from 'vue'
import { onMounted, onUnmounted, watch } from 'vue'
import type { OutlineMaterialLike, OutlineProps } from './props'

// NOTE: Source
// https://github.com/pmndrs/drei/blob/master/src/core/Outlines.tsx

/** Builds the inverted-hull mesh from the parent geometry and keeps `material` in sync with the props. */
export function useOutline(props: Required<OutlineProps>, groupRef: ShallowRef<Group | undefined>, material: OutlineMaterialLike) {
  let oldAngle = 0
  let oldGeometry: BufferGeometry | null = null

  function updateMesh(group: Group) {
    const parent = group.parent as Mesh & SkinnedMesh & InstancedMesh
    if (!parent || !parent.geometry) { return }

    if (oldAngle !== props.angle || oldGeometry !== parent.geometry) {
      oldAngle = props.angle
      oldGeometry = parent.geometry

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
      // The same arrays, so the outline follows the parent's morph targets. Without them, a
      // morphed geometry fails to render.
      mesh.morphTargetInfluences = parent.morphTargetInfluences
      mesh.morphTargetDictionary = parent.morphTargetDictionary
      mesh.renderOrder = props.renderOrder
    }
  }

  function updateMaterial() {
    material.side = BackSide
    material.transparent = props.transparent
    material.thickness = props.thickness
    material.color.set(normalizeColor(props.color))
    material.opacity = props.opacity
    material.screenspace = props.screenspace
    material.toneMapped = props.toneMapped
    material.polygonOffset = props.polygonOffset
    material.polygonOffsetFactor = props.polygonOffsetFactor
  }

  const sizes = useTres().sizes
  // Immediate, so an Outline that mounts after the canvas has its size. A 0 size would divide by 0.
  watch(() => [sizes.width.value, sizes.height.value], ([w, h]) => {
    if (w && h) { material.size.set(w, h) }
  }, { immediate: true })
  watch(() => [props.angle], () => {
    if (groupRef.value) { updateMesh(groupRef.value) }
  })
  watch(() => props.renderOrder, (renderOrder) => {
    const mesh = groupRef.value?.children[0]
    if (mesh) { mesh.renderOrder = renderOrder }
  })

  // WebGPURenderer bakes blending and depth bias into a cached pipeline, and WebGLRenderer bakes
  // tone mapping into the program. Without a rebuild, a change to these props has no effect.
  const rebuildProps = () => [props.transparent, props.toneMapped, props.polygonOffset, props.polygonOffsetFactor]
  watch(() => [...rebuildProps(), props.thickness, props.color, props.opacity, props.screenspace], () => updateMaterial(), { immediate: true })
  watch(rebuildProps, () => {
    material.needsUpdate = true
  })

  onMounted(() => {
    if (groupRef.value) { updateMesh(groupRef.value) }
  })

  onUnmounted(() => {
    const mesh = groupRef.value?.children[0] as Mesh
    if (mesh) {
      mesh.geometry.dispose()
      material.dispose()
      mesh.removeFromParent()
    }
  })
}
