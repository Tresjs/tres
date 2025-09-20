import type { Scene } from 'three'
import type { TresObject } from './../types'
import { isMesh } from './is'

export function calculateMemoryUsage(object: TresObject | Scene) {
  let totalMemory = 0

  object.traverse((node: TresObject) => {
    if (isMesh(node) && node.type !== 'HightlightMesh') {
      const geometry = node.geometry
      const verticesMemory = geometry.attributes.position.count * 3 * Float32Array.BYTES_PER_ELEMENT
      const facesMemory = geometry.index ? geometry.index.count * Uint32Array.BYTES_PER_ELEMENT : 0
      const normalsMemory
        = geometry.attributes.normal ? geometry.attributes.normal.count * 3 * Float32Array.BYTES_PER_ELEMENT : 0
      const uvsMemory = geometry.attributes.uv ? geometry.attributes.uv.count * 2 * Float32Array.BYTES_PER_ELEMENT : 0

      const geometryMemory = verticesMemory + facesMemory + normalsMemory + uvsMemory
      totalMemory += geometryMemory
    }
  })

  return totalMemory // In bytes
}

export function boundedPush<T>(arr: T[], value: T, max: number) {
  arr.push(value)
  if (arr.length > max) { arr.shift() }
}

export function bytesToKB(bytes: number): string {
  return (bytes / 1024).toFixed(2)
}

export function bytesToMB(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(2)
}

export function bytesToGB(bytes: number): string {
  return (bytes / 1024 / 1024 / 1024).toFixed(2)
}
