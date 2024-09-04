import { ColliderDesc } from '@dimforge/rapier3d-compat'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { TresObject } from '@tresjs/core'

import { VECTOR_ZERO } from '../constants/object'
import type {
  CreateColliderDescProps,
  CreateColliderProps,
  CreateColliderReturnType,
  CreateCollidersFromChildrenProps,
} from '../types/collider'

/**
 * @description Create a {@link ColliderDesc} shape based on the given
 * {@link CreateColliderDescProps}
 *
 * @param props {@link CreateColliderDescProps}
 *
 * @see https://rapier.rs/javascript3d/classes/ColliderDesc.html
 * @see https://rapier.rs/docs/user_guides/javascript/colliders
 */
export const createColliderDesc = (props: CreateColliderDescProps,
) => {
  if (!props.object.geometry) { return }

  // NOTE: Create a default `Cuboid` collider attached to the dynamic rigidBody.
  props.object.geometry.computeBoundingBox()

  const { boundingBox } = props.object.geometry
  const size = boundingBox!.getSize(VECTOR_ZERO)

  let colliderDesc = ColliderDesc.cuboid(size.x / 2, size.y / 2, size.z / 2)

  switch (props.colliderShape) {
    case 'ball':
      colliderDesc = ColliderDesc.ball(size.x / 2)
      break
    case 'capsule':
      colliderDesc = ColliderDesc.capsule(size.x / 2, size.y / 2)
      break
    case 'cone':
      colliderDesc = ColliderDesc.cone(size.x / 2, size.y / 2)
      break
    case 'cylinder':
      colliderDesc = ColliderDesc.cylinder(size.x / 2, size.y / 2)
      break
    case 'trimesh': {
      const clonedGeometry = mergeVertices(props.object.geometry)
      const triMeshMap = clonedGeometry.attributes.position
        .array as Float32Array
      const triMeshUnit = clonedGeometry.index?.array as Uint32Array

      colliderDesc = ColliderDesc.trimesh(triMeshMap, triMeshUnit)
      break
    }
    case 'hull': {
      const clonedGeometry = mergeVertices(props.object.geometry)
      const triMeshMap = clonedGeometry.attributes.position
        .array as Float32Array

      colliderDesc = ColliderDesc.convexHull(triMeshMap) ?? colliderDesc
      break
    }
  }

  // TODO: Unable to retrieve the subdivision number & the Matrix of the given object for #heightfield
  // if (colliderShape === 'heightfield') {
  //   colliderDesc = ColliderDesc.heightfield(object.geometry)
  // }

  colliderDesc
    .setTranslation(props.object.position.x, props.object.position.y, props.object.position.z)
    .setRotation(props.object.quaternion)

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
export const createCollider = (props: CreateColliderProps): CreateColliderReturnType => {
  const { object, rigidBody, world } = props
  const colliderDesc = createColliderDesc(props)

  if (!colliderDesc) {
    throw new Error(
      `Invalid #ColliderDesc properties detected. Unable to create the collider for #${object?.name ?? 'object'}`,
    )
  }
  const collider = world.createCollider(colliderDesc, rigidBody)

  return {
    collider,
    colliderDesc,
    object,
  }
}

/**
 * @description Create a list of {@link Collider} shapes for each child in the object
 * based on the given {@link CreateCollidersFromChildrenProps}
 *
 * @param props {@link CreateCollidersFromChildrenProps}
 *
 * @see https://rapier.rs/javascript3d/classes/Collider.html
 * @see https://rapier.rs/docs/user_guides/javascript/colliders
 */
export const createCollidersFromChildren = (
  props: CreateCollidersFromChildrenProps,
): CreateColliderReturnType[] => {
  return ((props?.object?.children ?? []) as TresObject[]).map((child) => {
    return createCollider({ ...props, object: child })
  })
}
