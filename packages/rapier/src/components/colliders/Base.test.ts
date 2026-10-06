import RAPIER from '@dimforge/rapier3d-compat'
import type { Collider as RapierCollider, World } from '@dimforge/rapier3d-compat'
import { Group, Object3D } from 'three'
import { beforeAll, describe, expect, it } from 'vitest'
import { createRenderer, defineComponent, h, nextTick, reactive, shallowRef, ssrContextKey } from 'vue'
import type { TresObject3D } from '@tresjs/core'
import { bodyContextInjectionKey, createRigidBody } from '../../core'
import type { ColliderProps, ExposedCollider, RigidBodyContext } from '../../types'
import Collider from './Base.vue'

// `Collider` only needs a parent for its `<TresObject3D>`, so a renderer that builds bare
// Object3Ds is enough to run its watchers without a canvas or a WebGL context.
const { createApp } = createRenderer<any, any>({
  createElement: () => new Object3D(),
  createText: () => ({}),
  createComment: () => ({}),
  setText: () => {},
  setElementText: () => {},
  insert: () => {},
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
}

/**
 * Mount a `Collider` inside a body the way `RigidBody` provides one, with the body group placed
 * by `setupGroup`. `props` stays reactive so a test can change it after mount.
 */
async function mountInBody(props: Partial<ColliderProps>, setupGroup: (group: Group) => void) {
  const world: World = new RAPIER.World({ x: 0, y: 0, z: 0 })
  const group = new Group()
  setupGroup(group)

  const state: RigidBodyContext = {
    type: 'kinematic',
    ...createRigidBody({
      object: group as unknown as TresObject3D,
      rigidBodyType: 'kinematic',
      world: shallowRef(world),
    }),
    group: group as unknown as TresObject3D,
    colliders: [],
  }

  const colliderRef = shallowRef<ExposedCollider>()
  const reactiveProps = reactive(props)
  const app = createApp(defineComponent({
    setup: () => () => h(Collider, { ...reactiveProps, ref: colliderRef }),
  }))
  // Vitest runs node tests through Vite's SSR transform, so plugin-vue compiles the SFC for the
  // server and its setup asks for an SSR context. The watchers under test live in setup alone.
  app.provide(ssrContextKey, { modules: new Set() })
  app.provide('useRapier', { world: shallowRef(world) })
  app.provide(bodyContextInjectionKey, shallowRef(state))
  app.mount(new Object3D())
  await settle()

  return {
    world,
    props: reactiveProps,
    collider: () => colliderRef.value!.instance as RapierCollider,
  }
}

describe('collider', () => {
  it('sits on its body when it has no position', async () => {
    const { collider } = await mountInBody(
      { shape: 'capsule', args: [0.8, 0.5] },
      group => group.position.set(0, 1.5, 0),
    )

    expect(collider().translation()).toEqual({ x: 0, y: 1.5, z: 0 })
  })

  it('reads a zero position as no offset from its body, not as the world origin', async () => {
    const { collider } = await mountInBody(
      { shape: 'capsule', args: [0.8, 0.5], position: [0, 0, 0] },
      group => group.position.set(0, 1.5, 0),
    )

    expect(collider().translation()).toEqual({ x: 0, y: 1.5, z: 0 })
  })

  it('moves relative to its body when the position changes', async () => {
    const { collider, props, world } = await mountInBody(
      { shape: 'capsule', args: [0.8, 0.5], position: [0, 0, 0] },
      group => group.position.set(0, 1.5, 0),
    )

    props.position = [1, 0.5, 0]
    await settle()
    // Rapier writes a changed parent offset into the world pose on the next step, as `Physics` does
    // every frame.
    world.step()

    expect(collider().translation()).toEqual({ x: 1, y: 2, z: 0 })
  })

  it('turns with its body when the rotation is the identity', async () => {
    let bodyQuaternion = { x: 0, y: 0, z: 0, w: 1 }
    const { collider } = await mountInBody(
      { shape: 'cuboid', args: [1, 1, 1], rotation: [0, 0, 0, 1] },
      (group) => {
        group.rotation.set(0, Math.PI / 2, 0)
        bodyQuaternion = group.quaternion
      },
    )

    const rotation = collider().rotation()
    expect(rotation.y).toBeCloseTo(bodyQuaternion.y, 5)
    expect(rotation.w).toBeCloseTo(bodyQuaternion.w, 5)
  })
})
