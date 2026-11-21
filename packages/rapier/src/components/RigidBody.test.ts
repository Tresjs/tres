// @vitest-environment jsdom
import RAPIER from '@dimforge/rapier3d-compat'
import type { Collider as RapierCollider } from '@dimforge/rapier3d-compat'
import { BoxGeometry, Group, Mesh, Object3D } from 'three'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { createRenderer, defineComponent, h, nextTick, ref, shallowRef, ssrContextKey } from 'vue'
import type { ExposedRigidBody, RigidBodyCollidersShape } from '../types'
import RigidBody from './RigidBody.vue'

vi.mock('@tresjs/core', () => ({ useLoop: () => ({ onBeforeRender: () => {} }) }))

// Only `TresGroup` and the `mesh` tag below need real three objects; the rest can be bare.
const { createApp } = createRenderer<any, any>({
  createElement: (type: string, _ns, _is, props) => props?.object ?? (type === 'TresGroup' ? new Group() : new Object3D()),
  createText: () => ({}),
  createComment: () => ({}),
  setText: () => {},
  setElementText: () => {},
  insert: (child, parent) => { if (child instanceof Object3D && parent instanceof Object3D) { parent.add(child) } },
  remove: () => {},
  patchProp: () => {},
  parentNode: () => null,
  nextSibling: () => null,
})

beforeAll(async () => {
  await RAPIER.init()
})

const settle = async () => {
  await nextTick()
  await new Promise(resolve => setTimeout(resolve))
  await nextTick()
}

async function mountAutoCollider(mesh: Mesh, shape: RigidBodyCollidersShape = 'cuboid') {
  const world = new RAPIER.World({ x: 0, y: 0, z: 0 })
  const bodyRef = shallowRef<ExposedRigidBody>()
  const collider = ref(shape)
  const app = createApp(defineComponent({
    setup: () => () => h(RigidBody, { type: 'fixed', collider: collider.value, ref: bodyRef }, () => h('mesh', { object: mesh })),
  }))
  app.provide(ssrContextKey, { modules: new Set() })
  app.provide('useRapier', { world: shallowRef(world) })
  app.mount(new Object3D())
  await settle()

  return { collider: bodyRef.value!.context!.colliders[0]!.collider as RapierCollider, shape: collider, world }
}

describe('rigidBody automatic collider', () => {
  it('centres the collider on a mesh whose origin sits at its base', async () => {
    const { collider } = await mountAutoCollider(new Mesh(new BoxGeometry(2, 4, 2).translate(0, 2, 0)))

    expect(collider.translation()).toEqual({ x: 0, y: 2, z: 0 })
    expect(collider.halfExtents()).toEqual({ x: 1, y: 2, z: 1 })
  })

  it('scales both the size and the centre offset of a scaled mesh', async () => {
    const mesh = new Mesh(new BoxGeometry(2, 4, 2).translate(0, 2, 0))
    mesh.scale.setScalar(2)

    const { collider } = await mountAutoCollider(mesh)

    expect(collider.translation()).toEqual({ x: 0, y: 4, z: 0 })
    expect(collider.halfExtents()).toEqual({ x: 2, y: 4, z: 2 })
  })

  it('drops the centre offset when the collider switches to trimesh', async () => {
    const { collider, shape, world } = await mountAutoCollider(new Mesh(new BoxGeometry(2, 4, 2).translate(0, 2, 0)))

    shape.value = 'trimesh'
    await settle()
    world.step()

    expect(collider.translation()).toEqual({ x: 0, y: 0, z: 0 })
  })

  it('covers a floor whose origin sits at a corner', async () => {
    const mesh = new Mesh(new BoxGeometry(32, 16, 32).translate(16, -8, -16))
    mesh.position.set(-16, 0, 16)

    const { collider } = await mountAutoCollider(mesh)

    expect(collider.translation()).toEqual({ x: 0, y: -8, z: 0 })
    expect(collider.halfExtents()).toEqual({ x: 16, y: 8, z: 16 })
  })
})
