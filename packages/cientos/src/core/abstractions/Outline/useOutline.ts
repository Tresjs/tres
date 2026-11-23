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
  // With `angle` 0 the outline reuses the parent's geometry, which it must not dispose.
  let ownsGeometry = false

  function updateMesh(group: Group) {
    const parent = group.parent as Mesh & SkinnedMesh & InstancedMesh
    if (!parent || !parent.geometry) { return }

    if (oldAngle !== props.angle || oldGeometry !== parent.geometry) {
      oldAngle = props.angle
      oldGeometry = parent.geometry

      let mesh = group.children?.[0] as any
      if (mesh) {
        if (ownsGeometry) { mesh.geometry.dispose() }
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
      ownsGeometry = Boolean(props.angle)
      if (ownsGeometry) {
        // toCreasedNormals rewrites a non-indexed geometry in place, so it gets a copy.
        const source = parent.geometry.index ? parent.geometry : parent.geometry.clone()
        mesh.geometry = toCreasedNormals(source, props.angle)
      }
      else {
        mesh.geometry = parent.geometry
      }
      // Shared arrays: without them, a morphed geometry fails to render.
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
  // A 0 size would divide by 0 in the shader.
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

  // WebGPU caches blending and depth bias in the pipeline, WebGL caches tone mapping in the program.
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
      if (ownsGeometry) { mesh.geometry.dispose() }
      material.dispose()
      mesh.removeFromParent()
    }
  })
}
