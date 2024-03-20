import type { TresNodeOpsPlugin } from 'src/core/nodeOps'
import {
  Body,
  Box,
  World,
  NaiveBroadphase,
  Vec3 as CannonVec3,
} from 'cannon-es'
import type { Object3D } from 'three'
import type { TresContext } from '../composables'
import { useRenderLoop } from '../composables'

function setup() {
  const store = new Map()
  const world = new World()
  world.gravity.set(0, -9.8, 0)
  world.broadphase = new NaiveBroadphase()
  const loopAPI = useRenderLoop().onLoop(({ delta }) => {
    world.step(delta)
    for (const [body, object3D] of store) {
      object3D.position.copy(body.position)
      object3D.setRotationFromQuaternion(body.quaternion)
    }
  })

  const dispose = () => {
    world.bodies.forEach(b => world.removeBody(b))
    store.clear()
    loopAPI.off()
  }

  return { store, world, dispose }
}

export const plugin: TresNodeOpsPlugin<Body, Body, TresContext> = (
  context: TresContext,
) => {

  const { store, world, dispose } = setup()

  return {
    name: 'Cannon Physics plugin',
    filter: {
      tag: (tag: string) => tag === 'Collider',
      element: (a: any): a is Body => a && a.aabb,
      node: (a: any): a is Body => a && a.aabb,
    },
    createElement: (_: any, __: any, ___: any, props: Record<string, any>) => {
      props = props ?? {}
      const args = props.args ?? []
      const mass = props.mass ?? 1
      const angularVelocity = props['angular-velocity'] ?? [0, 0, 0]
      const velocity = props.velocity ?? [0, 0, 0]
      const shapeType = props.shape ?? 'Box'

      const shape = (() => {
        if ('Box' === shapeType) {
          const xyz: number[] = args.every((n: any) => typeof n === 'number') ? args : [1., 1., 1.]
          while (xyz.length < 3) xyz.push(1.0)
          return new Box(new CannonVec3(... xyz.map(n => 0.5 * n)))
        }
        return new Box(new CannonVec3(1, 1, 1))
      })()

      const body = new Body({ mass, shape })
      body.angularVelocity.set(
        angularVelocity[0],
        angularVelocity[1],
        angularVelocity[2],
      )
      body.velocity.set(velocity[0], velocity[1], velocity[2])

      return body
    },
    insert: (body: Body, parent) => {
      if (parent.isObject3D) {
        const p = (<THREE.Object3D>parent).position
        const r = (<THREE.Object3D>parent).quaternion
        body.position.set(p.x, p.y, p.z)
        body.quaternion.set(r.x, r.y, r.z, r.w)

        world.addBody(body)
        store.set(body, parent as Object3D)
      }
    },
    remove: (body: Body) => {
      world.removeBody(body)
      store.delete(body)
    },
    dispose,
  }
}
