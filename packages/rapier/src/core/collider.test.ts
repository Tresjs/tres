import RAPIER from '@dimforge/rapier3d-compat'
import type { World } from '@dimforge/rapier3d-compat'
import { BoxGeometry, Group, Mesh } from 'three'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { shallowRef } from 'vue'
import type { TresObject3D } from '@tresjs/core'
import { createCollider } from './collider'
import { createRigidBody, createRigidBodyAutoColliderPropsFromObject } from './rigid-body'

let world: World

beforeAll(async () => {
  await RAPIER.init()
})

beforeEach(() => {
  world = new RAPIER.World({ x: 0, y: 0, z: 0 })
})

/** A body the way `RigidBody` builds one: from its group's transform. */
function bodyAt(group: Group) {
  return createRigidBody({
    object: group as unknown as TresObject3D,
    rigidBodyType: 'kinematic',
    world: shallowRef(world),
  }).rigidBody
}

describe('createCollider', () => {
  it('puts a collider without a position at the body origin, not one body offset further', () => {
    const group = new Group()
    group.position.set(0, 1.5, 0)
    const rigidBody = bodyAt(group)

    const { collider } = createCollider({
      shape: 'capsule',
      args: [0.8, 0.5],
      rigidBody,
      world: shallowRef(world),
    })

    expect(collider.translation()).toEqual({ x: 0, y: 1.5, z: 0 })
  })

  it('does not apply the body rotation twice to a collider without a rotation', () => {
    const group = new Group()
    group.rotation.set(0, Math.PI / 2, 0)
    const rigidBody = bodyAt(group)

    const { collider } = createCollider({
      shape: 'cuboid',
      args: [1, 1, 1],
      rigidBody,
      world: shallowRef(world),
    })

    const rotation = collider.rotation()
    expect(rotation.y).toBeCloseTo(group.quaternion.y, 5)
    expect(rotation.w).toBeCloseTo(group.quaternion.w, 5)
  })

  it('reads a collider position as an offset from its body', () => {
    const group = new Group()
    group.position.set(0, 1.5, 0)
    const rigidBody = bodyAt(group)

    const { collider } = createCollider({
      shape: 'ball',
      args: [0.5],
      position: [1, 0.5, 0],
      rigidBody,
      world: shallowRef(world),
    })

    expect(collider.translation()).toEqual({ x: 1, y: 2, z: 0 })
  })

  it('keeps an automatic collider on its mesh, which sits at a local offset in the body', () => {
    const group = new Group()
    group.position.set(0, 1.5, 0)
    const mesh = new Mesh(new BoxGeometry(1, 1, 1))
    mesh.position.set(2, 0, 0)
    group.add(mesh)
    const rigidBody = bodyAt(group)

    const props = createRigidBodyAutoColliderPropsFromObject(
      mesh as unknown as TresObject3D,
      'cuboid',
      rigidBody,
    )
    const { collider } = createCollider({ ...props, rigidBody, world: shallowRef(world) })

    expect(collider.translation()).toEqual({ x: 2, y: 1.5, z: 0 })
  })
})
