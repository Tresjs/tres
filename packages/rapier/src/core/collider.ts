import {
  ColliderDesc,
  type Quaternion,
  type Vector3,
} from '@dimforge/rapier3d-compat'
import { Vector3 as ThreeVector3 } from 'three'

import { QUATERNION_ZERO, VECTOR_ZERO } from '../constants'
import { getColliderSizingsFromObject } from '../utils'
import type {
  ColliderShape,
  CreateColliderDescProps,
  CreateColliderProps,
  CreateColliderReturnType,
} from '../types/collider'
import { parsePosition, parseRotation } from '../utils/common'

/** @internal */
const _scaleVertices = (vertices: ArrayLike<number>, scale: Vector3) => {
  const scaledVertices = Array.from(vertices)

  for (let i = 0; i < vertices.length / 3; i++) {
    scaledVertices[i * 3] *= scale.x
    scaledVertices[i * 3 + 1] *= scale.y
    scaledVertices[i * 3 + 2] *= scale.z
  }

  return scaledVertices
}

/** @internal */
const _scaleColliderArgs = (
  shape: ColliderShape,
  args: (number | ArrayLike<number> | { x: number, y: number, z: number })[],
  scale: Vector3,
) => {
  const newArgs = args.slice()

  if (shape === 'heightfield') {
    const s = newArgs[3] as { x: number, y: number, z: number }
    s.x *= scale.x
    s.x *= scale.y
    s.x *= scale.z

    return newArgs
  }

  if (shape === 'trimesh' || shape === 'convexHull') {
    newArgs[0] = _scaleVertices(newArgs[0] as ArrayLike<number>, scale)
    return newArgs
  }

  const scaleArray = [scale.x, scale.y, scale.z, scale.x, scale.x]
  return newArgs.map((arg, index) => scaleArray[index] * (arg as number))
}

/**
 * @description
 *
 * Create a {@link ColliderDesc} based on the received properties.
 *
 * If the shape is not specified,
 * it will fallback to a {@link ColliderDesc.cuboid Cuboid} shape,
 * using the object geometry bounding-box.
 *
 * @param props {@link CreateColliderDescProps}
 *
 * @see https://rapier.rs/javascript3d/classes/ColliderDesc.html
 * @see https://rapier.rs/docs/user_guides/javascript/colliders
 */
export const createColliderDesc = (props: CreateColliderDescProps) => {
  const { shape, object, args, position, rotation, rigidBody, scale } = props
  const { halfWidth, halfHeight, halfDepth } = getColliderSizingsFromObject(object)
  const colliderDescMethod = ColliderDesc[shape || 'cuboid']
  const safeScale = new ThreeVector3(
    scale?.[0] ?? 1,
    scale?.[1] ?? 1,
    scale?.[2] ?? 1,
  )
  const safeArgs = [
    args?.[0] ?? 1,
    args?.[1] ?? 1,
    args?.[2] ?? 1,
    args?.[3] ?? 1,
    ...(args?.slice(4) ?? []),
  ]
  const scaledArgs = _scaleColliderArgs(
    shape || 'cuboid',
    safeArgs,
    safeScale,
  ) as Parameters<(typeof ColliderDesc)[ColliderShape]>

  let colliderDesc: ColliderDesc | null

  const getSafeColliderDesc = () => {
    return ColliderDesc.cuboid(halfWidth, halfHeight, halfDepth)
  }

  try {
    if (!colliderDescMethod) {
      throw new Error(`Invalid collider shape: ${shape}.`)
    }

    colliderDesc = colliderDescMethod?.(
      ...(scaledArgs as [any, any, any, any, any]),
    )

    if (!colliderDesc) {
      throw new Error(`Invalid collider shape: ${shape}. Switching to cuboid.`)
    }
  }
  catch (error) {
    console.warn(
      `Error creating collider: ${error instanceof Error ? error.message : 'Unknown error'}. Switching to cuboid.`,
    )
    colliderDesc = getSafeColliderDesc()
  }

  const newPosition: Vector3
    = (position && parsePosition(position))
      ?? (object?.position && parsePosition(object?.position))
      ?? rigidBody.translation()
      ?? VECTOR_ZERO
  const newRotation: Quaternion
    = (rotation && parseRotation(rotation))
      ?? (object?.quaternion && parseRotation(object?.quaternion))
      ?? rigidBody.rotation()
      ?? QUATERNION_ZERO.clone()

  colliderDesc
    .setTranslation(newPosition.x, newPosition.y, newPosition.z)
    .setRotation(newRotation)

  return colliderDesc
}

/**
 * @description Create a {@link Collider} shape based on the received
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
