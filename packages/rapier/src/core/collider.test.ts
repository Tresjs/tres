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

describe('automatic collider placement', () => {
  function autoColliderOnBody(mesh: Mesh, shape: 'cuboid' | 'ball' | 'trimesh') {
    const group = new Group()
    group.add(mesh)
    const rigidBody = bodyAt(group)
    const props = createRigidBodyAutoColliderPropsFromObject(
      mesh as unknown as TresObject3D,
      shape,
      rigidBody,
    )
    return createCollider({ ...props, rigidBody, world: shallowRef(world) }).collider
  }

  it('centres a cuboid on a mesh whose origin sits at its base', () => {
    const mesh = new Mesh(new BoxGeometry(2, 4, 2).translate(0, 2, 0))

    const collider = autoColliderOnBody(mesh, 'cuboid')

    expect(collider.translation()).toEqual({ x: 0, y: 2, z: 0 })
    expect(collider.halfExtents()).toEqual({ x: 1, y: 2, z: 1 })
  })

  it('centres a ball on a mesh whose origin sits outside it', () => {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1).translate(3, 0, 0))

    const collider = autoColliderOnBody(mesh, 'ball')

    expect(collider.translation()).toEqual({ x: 3, y: 0, z: 0 })
  })

  it('rotates and scales the centre offset with the mesh', () => {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1).translate(0, 1, 0))
    mesh.position.set(10, 0, 0)
    mesh.rotation.set(0, 0, Math.PI / 2)
    mesh.scale.setScalar(2)

    const collider = autoColliderOnBody(mesh, 'cuboid')
    const { x, y, z } = collider.translation()

    expect(x).toBeCloseTo(8, 5)
    expect(y).toBeCloseTo(0, 5)
    expect(z).toBeCloseTo(0, 5)
    expect(collider.halfExtents()).toEqual({ x: 1, y: 1, z: 1 })
  })

  it('scales each auto shape along the axes it measures', () => {
    const mesh = new Mesh(new BoxGeometry(2, 4, 2))
    mesh.scale.set(1, 2, 3)

    expect(autoColliderOnBody(mesh, 'cuboid').halfExtents()).toEqual({ x: 1, y: 4, z: 3 })
    expect(autoColliderOnBody(mesh, 'ball').radius()).toBe(4)
  })

  it('leaves a trimesh at the mesh origin, because its vertices already carry the offset', () => {
    const mesh = new Mesh(new BoxGeometry(2, 4, 2).translate(0, 2, 0))

    const collider = autoColliderOnBody(mesh, 'trimesh')

    expect(collider.translation()).toEqual({ x: 0, y: 0, z: 0 })
  })
})
