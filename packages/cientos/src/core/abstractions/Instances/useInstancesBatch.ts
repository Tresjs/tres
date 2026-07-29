import type { BufferGeometry, Material } from 'three'
import { logWarning } from '@tresjs/core'
import { DynamicDrawUsage, InstancedBufferAttribute, InstancedMesh, Matrix4 } from 'three'
import { onScopeDispose, shallowRef, watch } from 'vue'
import type { InstancesApi } from './const'
import type { PositionMesh } from './PositionMesh'

export interface InstancesBatchSource {
  geometry: BufferGeometry
  material: Material | Material[]
  limit: number
}

function createMatrixAttribute(capacity: number) {
  const attribute = new InstancedBufferAttribute(new Float32Array(capacity * 16), 16)
  attribute.setUsage(DynamicDrawUsage)
  return attribute
}

function createColorAttribute(capacity: number) {
  const attribute = new InstancedBufferAttribute(new Float32Array(capacity * 3).fill(1), 3)
  attribute.setUsage(DynamicDrawUsage)
  return attribute
}

/**
 * Owns a single `InstancedMesh` and the placeholders registered against it.
 *
 * The registry identity is stable across geometry/material/limit changes, so descendants
 * that injected it stay bound when the underlying mesh is rebuilt.
 */
export function useInstancesBatch(source: () => InstancesBatchSource) {
  const mesh = shallowRef<InstancedMesh | null>(null)
  const nodes: PositionMesh[] = []

  const parentInverse = new Matrix4()
  const instanceMatrix = new Matrix4()

  let capacity = 0
  let hasColors = false
  let lastColors = new Float32Array(0)

  function disposeMesh() {
    const current = mesh.value
    if (!current) { return }
    current.instanceMatrix.dispose()
    current.instanceColor?.dispose()
    current.dispose()
    mesh.value = null
  }

  function build() {
    disposeMesh()

    const { geometry, material, limit } = source()
    capacity = Math.max(1, Math.floor(limit), nodes.length)

    const next = new InstancedMesh(geometry, material, capacity)
    next.instanceMatrix = createMatrixAttribute(capacity)
    next.count = 0
    // Instances can sit anywhere relative to the batch origin, so the batch's own bounds are meaningless
    next.frustumCulled = false
    // Placeholders take the pointer hits, never the batch itself
    next.raycast = () => null

    if (hasColors) { next.instanceColor = createColorAttribute(capacity) }

    lastColors = new Float32Array(capacity * 3).fill(-1)
    mesh.value = next
  }

  function grow(needed: number) {
    const current = mesh.value
    if (!current || needed <= capacity) { return }

    const next = Math.max(needed, capacity * 2)

    const matrixAttribute = createMatrixAttribute(next)
    matrixAttribute.array.set(current.instanceMatrix.array)
    current.instanceMatrix.dispose()
    current.instanceMatrix = matrixAttribute

    if (current.instanceColor) {
      const colorAttribute = createColorAttribute(next)
      colorAttribute.array.set(current.instanceColor.array)
      current.instanceColor.dispose()
      current.instanceColor = colorAttribute
    }

    lastColors = new Float32Array(next * 3).fill(-1)
    capacity = next

    logWarning(`Instances: more instances registered than \`limit\` allows, reallocated for ${next}. Set \`:limit="${next}"\` to avoid reallocating at runtime.`)
  }

  const api: InstancesApi = {
    mesh,
    register(node: PositionMesh) {
      nodes.push(node)
      grow(nodes.length)
    },
    unregister(node: PositionMesh) {
      const index = nodes.indexOf(node)
      if (index !== -1) { nodes.splice(index, 1) }
    },
    requestColorBuffer() {
      if (hasColors) { return }
      hasColors = true
      const current = mesh.value
      if (current && !current.instanceColor) { current.instanceColor = createColorAttribute(capacity) }
    },
  }

  function update() {
    const current = mesh.value
    if (!current) { return }

    current.updateWorldMatrix(true, false)
    parentInverse.copy(current.matrixWorld).invert()

    const colorAttribute = current.instanceColor
    const colors = colorAttribute?.array as Float32Array | undefined
    let colorsChanged = false
    let visible = 0

    for (const node of nodes) {
      if (!node.visible) { continue }

      node.updateWorldMatrix(true, false)
      instanceMatrix.multiplyMatrices(parentInverse, node.matrixWorld)
      instanceMatrix.toArray(current.instanceMatrix.array, visible * 16)

      if (colors) {
        const offset = visible * 3
        const { r, g, b } = node.color
        if (lastColors[offset] !== r || lastColors[offset + 1] !== g || lastColors[offset + 2] !== b) {
          colors[offset] = lastColors[offset] = r
          colors[offset + 1] = lastColors[offset + 1] = g
          colors[offset + 2] = lastColors[offset + 2] = b
          colorsChanged = true
        }
      }

      visible++
    }

    current.count = visible
    current.instanceMatrix.needsUpdate = true
    if (colorsChanged && colorAttribute) { colorAttribute.needsUpdate = true }
  }

  watch(source, build, { immediate: true })
  onScopeDispose(disposeMesh)

  return { mesh, api, update }
}
