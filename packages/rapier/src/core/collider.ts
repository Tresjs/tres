import { ColliderDesc } from '@dimforge/rapier3d-compat'
import {
  BufferGeometry,
  IcosahedronGeometry,
  Mesh,
  SphereGeometry,
} from 'three'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { TresObject3D } from '@tresjs/core'
import type { QuaternionLike, Vector3Like } from 'three'

import { QUATERNION_ZERO, VECTOR_ZERO } from '../constants'
import { getColliderSizingsFromObject } from '../utils'
import type {
  ColliderProps,
  ColliderShape,
  CreateColliderDescProps,
  CreateColliderProps,
  CreateColliderReturnType,
} from '../types/collider'
import { parsePosition, parseRotation } from '../utils/common'

/**
 * @description
 *
 * Create a {@link ColliderDesc} shape based on the given properties.
 *
 * If the shape or sizes are not specified,
 * it will try to create a shape based on the object's geometry or the bounding-box.
 *
 * Will create a {@link ColliderDesc.cuboid Cuboid} by default.
 *
 * @param props {@link CreateColliderDescProps}
 *
 * @see https://rapier.rs/javascript3d/classes/ColliderDesc.html
 * @see https://rapier.rs/docs/user_guides/javascript/colliders
 */
export const createColliderDesc = (props: CreateColliderDescProps) => {
  const { object, args, shape, scale, rigidBody } = props
  const position: Vector3Like
    = (props.position && parsePosition(props.position))
      ?? (object?.position && parsePosition(object?.position))
      ?? rigidBody.translation()
      ?? VECTOR_ZERO
  const rotation: QuaternionLike
  = (props.rotation && parseRotation(props.rotation))
    ?? (object?.quaternion && parseRotation(object?.quaternion))
    ?? rigidBody.rotation()
    ?? QUATERNION_ZERO.clone()
  const sizes = getColliderSizingsFromObject(object as TresObject3D)
  const halfWidth = (args?.[0] ?? sizes.halfWidth) * (scale?.[0] ?? 1)
  const halfHeight = (args?.[1] ?? sizes.halfHeight) * (scale?.[1] ?? 1)
  const halfDepth = (args?.[2] ?? sizes.halfDepth) * (scale?.[2] ?? 1)
  const radius = (args?.[0] ?? sizes.radius) * (scale?.[0] ?? 1)

  let colliderDesc = ColliderDesc.cuboid(
    halfWidth ?? 1,
    halfHeight ?? 1,
    halfDepth ?? 1,
  )

  if (
    shape === 'ball'
    || (shape === undefined
      && object instanceof Mesh
      && (object.geometry instanceof SphereGeometry
        || object.geometry instanceof IcosahedronGeometry))
  ) {
    colliderDesc = ColliderDesc.ball(radius ?? 1)
  }
  else if (shape === 'capsule') {
    colliderDesc = ColliderDesc.capsule(halfWidth ?? 1, halfHeight ?? 1)
  }
  else if (shape === 'cone') {
    colliderDesc = ColliderDesc.cone(halfWidth ?? 1, halfHeight ?? 1)
  }
  else if (shape === 'cylinder') {
    colliderDesc = ColliderDesc.cylinder(halfWidth ?? 1, halfHeight ?? 1)
  }
  else if (object?.geometry instanceof BufferGeometry) {
    if (shape === 'trimesh') {
      const clonedGeometry = mergeVertices(object.geometry)
      const triMeshMap = clonedGeometry.attributes.position
        .array as Float32Array
      const triMeshUnit = clonedGeometry.index?.array as Uint32Array

      colliderDesc = ColliderDesc.trimesh(triMeshMap, triMeshUnit)
    }
    else if (shape === 'hull') {
      const triMeshMap = mergeVertices(object.geometry).attributes.position.array as Float32Array

      colliderDesc = ColliderDesc.convexHull(triMeshMap) ?? colliderDesc
    }
    // TODO: Unable to retrieve the subdivision number & the Matrix of the given object for #heightfield
    // else if (shape === 'heightfield') {
    //   colliderDesc = ColliderDesc.heightfield(object.geometry)
    // }
  }

  colliderDesc
    .setTranslation(position.x, position.y, position.z)
    .setRotation(rotation)

  return colliderDesc
}

/**
 * @description Create a {@link Collider} shape based on the given
 * {@link CreateColliderProps}
 *
 * @param props {@link CreateColliderDescProps}
 *
 * @see https://rapier.rs/javascript3d/classes/Collider.html
 * @see https://rapier.rs/docs/user_guides/javascript/colliders
 */
export const createCollider = (
  props: CreateColliderProps,
): CreateColliderReturnType => {
  const { world, rigidBody, object } = props
  const colliderDesc = createColliderDesc(props)
  const collider = world.value.createCollider(colliderDesc, rigidBody)

  return {
    collider,
    colliderDesc,
    object,
  }
}

/**
 * @description Create a {@link ColliderProps} from the given object.
 *
 * @param object {@link TresObject3D}
 * @param shape {@link ColliderShape}
 */
export const createColliderPropsFromObject = (
  object: TresObject3D,
  shape: ColliderShape,
): ColliderProps => {
  const { position } = object
  const rotation = object?.quaternion
  const sizes = getColliderSizingsFromObject(object)

  return {
    shape,
    object,
    args:
      shape === 'ball'
        ? [sizes.radius]
        : [sizes.halfWidth, sizes.halfHeight, sizes.halfDepth],
    position: [position.x, position.y, position.z],
    rotation: [rotation.x, rotation.y, rotation.z, rotation.w],
    scale: [object.scale.x ?? 1, object.scale.y ?? 1, object.scale.z ?? 1],
  }
}
