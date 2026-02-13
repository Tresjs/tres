import { Box3, Object3D, Vector3 } from 'three'
import type { Mesh } from 'three'
import type { TresObject3D } from '@tresjs/core'

/**
 * @description Check if an object has valid geometry for creating a collider.
 *
 * Returns true if the object has geometry with position attributes,
 * or if it has descendants with geometry (non-empty bounding box).
 *
 * @param object {@link Object3D}
 */
export function hasValidColliderGeometry(object: Object3D): boolean {
  if ((object as unknown as Mesh).geometry?.attributes?.position) { return true }
  // check children only if needed
  return object.children.some(child => hasValidColliderGeometry(child as Object3D))
}

/**
 * @description Get the collider sizings from the given object.
 *
 * Will try to get the bounding-box if the object doesn't have a geometry.
 *
 * @param object {@link TresObject3D}
 */
export const getColliderSizingsFromObject = (object?: TresObject3D) => {
  object?.geometry?.computeBoundingBox()

  const positions = object?.geometry?.attributes?.position?.array
  let width = 0
  let height = 0
  let depth = 0
  let halfWidth = 0
  let halfHeight = 0
  let halfDepth = 0

  if (positions) {
    let minX = 0
    let minY = 0
    let minZ = 0
    let maxX = 0
    let maxY = 0
    let maxZ = 0

    for (let i = 0; i < positions.length; i += 3) {
      const _vector = new Vector3(
        positions[i] ?? 0,
        positions[i + 1] ?? 0,
        positions[i + 2] ?? 0,
      )

      minX = Math.min(minX, _vector.x)
      minY = Math.min(minY, _vector.y)
      minZ = Math.min(minZ, _vector.z)
      maxX = Math.max(maxX, _vector.x)
      maxY = Math.max(maxY, _vector.y)
      maxZ = Math.max(maxZ, _vector.z)
    }

    width = maxX - minX
    height = maxY - minY
    depth = maxZ - minZ

    halfWidth = width / 2
    halfHeight = height / 2
    halfDepth = depth / 2
  }
  else if (object instanceof Object3D) {
    const boundingBox = new Box3().setFromObject(object)

    if (!boundingBox.isEmpty()) {
      width = boundingBox.max.x - boundingBox.min.x
      height = boundingBox.max.y - boundingBox.min.y
      depth = boundingBox.max.z - boundingBox.min.z

      halfWidth = width / 2
      halfHeight = height / 2
      halfDepth = depth / 2
    }
  }

  const radius = Math.max(halfWidth, halfHeight, halfDepth)

  return {
    width,
    height,
    depth,
    halfWidth,
    halfHeight,
    halfDepth,
    radius,
  }
}
