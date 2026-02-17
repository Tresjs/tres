import { RigidBodyDesc } from '@dimforge/rapier3d-compat'

import type {
  CreateRigidBodyDescProps,
  CreateRigidBodyProps,
  CreateRigidBodyReturnType,
} from '../types'

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
  }

  return rigidBodyDesc
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

  const rigidBody = props.world.value.createRigidBody(rigidBodyDesc)

  return {
    rigidBody,
    rigidBodyDesc,
  }
}
