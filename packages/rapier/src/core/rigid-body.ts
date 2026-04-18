import { type RigidBody, RigidBodyDesc } from '@dimforge/rapier3d-compat'

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
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { TresObject3D } from '@tresjs/core'
import { getColliderSizingsFromObject } from '../utils'

/**
 * @description
 */
export const createRigidBodyAutoColliderArgs: (props: {
  rigidBody: RigidBody
  shape: RigidBodyCollidersShape
  object: TresObject3D
}) => any[] = (props) => {
  const { object, shape } = props
  const geometry = object?.geometry?.clone()
  const sizes = getColliderSizingsFromObject(object as TresObject3D)
  const halfWidth = (sizes.halfWidth)
  const halfHeight = (sizes.halfHeight)
  const halfDepth = (sizes.halfDepth)
  const radius = (sizes.radius)

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
    args = [(radius ?? 1)]
  }
  else if (shape === 'capsule' || shape === 'cone' || shape === 'cylinder') {
    args = [halfWidth, halfHeight]
  }
  else if (geometry instanceof BufferGeometry) {
    if (shape === 'trimesh') {
      const clonedGeometry = mergeVertices(geometry)
      const triMeshMap = clonedGeometry.attributes.position
        .array as Float32Array
      const triMeshUnit = clonedGeometry.index?.array as Uint32Array

      args = [triMeshMap, triMeshUnit]
    }
    else if (shape === 'convexHull') {
      const triMeshMap = mergeVertices(geometry).attributes.position.array as Float32Array

      args = [triMeshMap]
    }
  }

  return args
}

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
 * @param rigidBody {@link RigidBody}
 */
export const createRigidBodyAutoColliderPropsFromObject = (
  object: TresObject3D,
  shape: RigidBodyCollidersShape,
  rigidBody: RigidBody,
): ColliderProps => {
  const { position, quaternion, scale } = object

  return {
    shape: shape as ColliderShape,
    object,
    args: createRigidBodyAutoColliderArgs({
      rigidBody,
      shape,
      object,
    }),
    position: [position.x, position.y, position.z],
    rotation: [quaternion.x, quaternion.y, quaternion.z, quaternion.w],
    scale: [scale.x ?? 1, scale.y ?? 1, scale.z ?? 1],
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
