import { RigidBodyDesc } from '@dimforge/rapier3d-compat'
import type { RigidBody } from '@dimforge/rapier3d-compat'

import type {
  ColliderProps,
  ColliderShape,
  CreateRigidBodyDescProps,
  CreateRigidBodyProps,
  CreateRigidBodyReturnType,
  RigidBodyCollidersShape,
  RigidBodyUserData,
} from '../types'
import { BufferGeometry, IcosahedronGeometry, Mesh, SphereGeometry } from 'three'
import type { Vector3Like } from 'three'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { TresObject3D } from '@tresjs/core'
import { getColliderSizingsFromObject, toColliderIndices } from '../utils'

type ColliderSizings = ReturnType<typeof getColliderSizingsFromObject>

/** @internal */
const _autoColliderArgs = (
  object: TresObject3D,
  shape: RigidBodyCollidersShape,
  sizes: ColliderSizings,
  scale: Vector3Like = { x: 1, y: 1, z: 1 },
): any[] => {
  const geometry = object?.geometry?.clone().scale(scale.x, scale.y, scale.z)
  const halfWidth = sizes.halfWidth * Math.abs(scale.x)
  const halfHeight = sizes.halfHeight * Math.abs(scale.y)
  const halfDepth = sizes.halfDepth * Math.abs(scale.z)
  const radius = Math.max(halfWidth, halfHeight, halfDepth)

  let args: any[] = [
    halfWidth,
    halfHeight,
    halfDepth,
  ]

  if (
    shape === 'ball'
    || (shape === undefined
      && object instanceof Mesh
      && (geometry instanceof SphereGeometry
        || geometry instanceof IcosahedronGeometry))
  ) {
    args = [radius]
  }
  else if (shape === 'capsule') {
    // rapier measures a capsule's half-height across its cylindrical section alone, and adds a
    // hemisphere of `radius` at each end. A bounding half-height passed straight through is
    // therefore a collider two radii taller than the mesh it was read from.
    const capRadius = Math.max(halfWidth, halfDepth)
    args = [Math.max(halfHeight - capRadius, 0), capRadius]
  }
  else if (shape === 'cone' || shape === 'cylinder') {
    args = [halfHeight, halfWidth]
  }
  else if (geometry instanceof BufferGeometry) {
    if (shape === 'trimesh') {
      const clonedGeometry = mergeVertices(geometry)
      const triMeshMap = clonedGeometry.attributes.position
        .array as Float32Array
      const triMeshUnit = toColliderIndices(clonedGeometry.index?.array)

      args = [triMeshMap, triMeshUnit]
    }
    else if (shape === 'convexHull') {
      const triMeshMap = mergeVertices(geometry).attributes.position.array as Float32Array

      args = [triMeshMap]
    }
  }

  return args
}

/** @description Create the args of an automatic collider, measured in the object's own space. */
export const createRigidBodyAutoColliderArgs: (props: {
  rigidBody: RigidBody
  shape: RigidBodyCollidersShape
  object: TresObject3D
}) => any[] = ({ object, shape }) => _autoColliderArgs(object, shape, getColliderSizingsFromObject(object))

/**
 * @description Create a {@link RigidBodyDesc} based on the given
 * {@link CreateRigidBodyDescProps}
 *
 * @param props {@link CreateRigidBodyDescProps}
 *
 * @see https://rapier.rs/javascript3d/classes/RigidBodyDesc.html
 * @see https://rapier.rs/docs/user_guides/javascript/rigid_bodies
 */
export const createRigidBodyDesc = (props: CreateRigidBodyDescProps) => {
  const { object, rigidBodyType } = props

  if (!object) { return }

  const safeRigidBodyDescType: keyof typeof RigidBodyDesc = rigidBodyType === 'kinematic'
    ? 'kinematicPositionBased'
    : rigidBodyType === 'kinematicVelocity'
      ? 'kinematicVelocityBased'
      : rigidBodyType
  const rigidBodyDesc = RigidBodyDesc[safeRigidBodyDescType]()
    .setTranslation(object.position.x, object.position.y, object.position.z)
    .setRotation(object.quaternion)

  if (rigidBodyType === 'dynamic') {
    rigidBodyDesc.setAdditionalMass(1)
  }

  rigidBodyDesc.userData = {
    uuid: object.uuid,
    name: object.name,
    type: object.type,
  } satisfies RigidBodyUserData

  return rigidBodyDesc
}

/**
 * @description Create {@link ColliderProps} based on the received object and shape.
 *
 * @param object {@link TresObject3D}
 * @param shape {@link RigidBodyCollidersShape}
 * @param _rigidBody {@link RigidBody} unused, kept for compatibility
 */
export const createRigidBodyAutoColliderPropsFromObject = (
  object: TresObject3D,
  shape: RigidBodyCollidersShape,
  _rigidBody: RigidBody,
): ColliderProps => {
  const { position, quaternion, scale } = object
  const sizes = getColliderSizingsFromObject(object)
  const colliderPosition = position.clone()

  if (shape !== 'trimesh' && shape !== 'convexHull') {
    colliderPosition.add(sizes.center.clone().multiply(scale).applyQuaternion(quaternion))
  }

  // `args` already carry the object's scale, so a `scale` prop here would apply it twice.
  return {
    shape: shape as ColliderShape,
    object,
    args: _autoColliderArgs(object, shape, sizes, scale),
    position: [colliderPosition.x, colliderPosition.y, colliderPosition.z],
    rotation: [quaternion.x, quaternion.y, quaternion.z, quaternion.w],
  }
}

/**
 * @description Create a {@link RigidBody} based on the given
 * {@link CreateRigidBodyProps}
 *
 * @param props {@link CreateRigidBodyProps}
 *
 * @see https://rapier.rs/javascript3d/classes/RigidBody.html
 * @see https://rapier.rs/docs/user_guides/javascript/rigid_bodies
 */
export const createRigidBody = (props: CreateRigidBodyProps): CreateRigidBodyReturnType => {
  const rigidBodyDesc = createRigidBodyDesc(props)

  if (!rigidBodyDesc) {
    throw new Error(
      `Invalid #RigidBodyDesc properties detected. Unable to create the rigid-body for object #${props.object?.uuid ?? 'object'}`,
    )
  }

  const rigidBody = props.world.value.createRigidBody(rigidBodyDesc) as RigidBody & { userData?: RigidBodyUserData }

  return {
    rigidBody,
    rigidBodyDesc,
  }
}
