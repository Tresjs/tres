import { Box3, Matrix4, Object3D, Vector3 } from 'three'
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
 * @description Convert a geometry index into the `Uint32Array` rapier's wasm binding demands.
 *
 * @important It rejects any other typed array outright, and three indexes a mesh with fewer
 * than 65536 vertices as a `Uint16Array` — which is most meshes — so a `trimesh` collider has
 * to convert here rather than cast.
 *
 * @param index the `BufferGeometry.index.array` to convert
 */
export function toColliderIndices(index: ArrayLike<number> | undefined): Uint32Array {
  if (index instanceof Uint32Array) { return index }
  return index ? new Uint32Array(index) : new Uint32Array()
}

const getLocalBoundingBox = (object: Object3D) => {
  object.updateWorldMatrix(true, true)
  const worldToLocal = object.matrixWorld.clone().invert()
  const box = new Box3()
  const childBox = new Box3()
  const childToLocal = new Matrix4()

  object.traverse((child) => {
    const geometry = (child as Mesh).geometry
    if (child === object || !geometry?.attributes?.position) { return }
    if (!geometry.boundingBox) { geometry.computeBoundingBox() }
    // One combined matrix: each Box3.applyMatrix4 re-fits an axis-aligned box, so two calls grow it.
    childToLocal.multiplyMatrices(worldToLocal, child.matrixWorld)
    childBox.copy(geometry.boundingBox!).applyMatrix4(childToLocal)
    box.union(childBox)
  })

  return box
}

/**
 * @description Get the collider sizings from the given object, measured in its own space.
 *
 * `center` is where the bounding box sits relative to the object origin.
 *
 * @important Will measure the descendants if the object doesn't have a geometry.
 *
 * @param object {@link TresObject3D}
 */
export const getColliderSizingsFromObject = (object?: TresObject3D) => {
  const geometry = object?.geometry
  let boundingBox = new Box3()

  if (geometry?.attributes?.position) {
    geometry.computeBoundingBox()
    boundingBox = geometry.boundingBox ?? boundingBox
  }
  else if (object instanceof Object3D) {
    boundingBox = getLocalBoundingBox(object)
  }

  const size = new Vector3()
  const center = new Vector3()

  if (!boundingBox.isEmpty()) {
    boundingBox.getSize(size)
    boundingBox.getCenter(center)
  }

  const halfWidth = size.x / 2
  const halfHeight = size.y / 2
  const halfDepth = size.z / 2

  return {
    width: size.x,
    height: size.y,
    depth: size.z,
    halfWidth,
    halfHeight,
    halfDepth,
    radius: Math.max(halfWidth, halfHeight, halfDepth),
    center,
  }
}
