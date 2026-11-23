import type { TresContext } from '../composables'
import * as THREE from 'three'
import { it } from 'vitest'
import { shallowRef } from 'vue'
import { extend } from './catalogue'
import { nodeOps as getNodeOps } from './nodeOps'

class Follower {
  target: THREE.Vector3 | null = null
}

extend(THREE)
extend({ Follower })

const context = { scene: shallowRef(new THREE.Scene()), camera: { registerCamera: () => {}, deregisterCamera: () => {} } } as unknown as TresContext
const nodeOps = getNodeOps({ context })

const PATCHES = 1000

const alternate = <T>(a: T, b: T, patch: (prev: T, next: T) => void) => () => {
  for (let i = 0; i < PATCHES; i++) {
    if (i % 2) { patch(b, a) }
    else { patch(a, b) }
  }
}

it('patchProp hot paths', async ({ bench: measure }) => {
  const mesh = nodeOps.createElement('TresMesh', undefined, undefined, {})
  const material = nodeOps.createElement('TresMeshBasicMaterial', undefined, undefined, {})
  const follower = nodeOps.createElement('TresFollower', undefined, undefined, {})
  const primitive = nodeOps.createElement('primitive', undefined, undefined, { object: new THREE.Mesh() })
  const vecA = new THREE.Vector3(1, 2, 3)
  const vecB = new THREE.Vector3(4, 5, 6)

  await measure.compare(
    measure('Vector3 into mesh.position', alternate(vecA, vecB, (prev, next) => nodeOps.patchProp(mesh, 'position', prev, next))),
    measure('array into mesh.position', alternate([1, 2, 3], [4, 5, 6], (prev, next) => nodeOps.patchProp(mesh, 'position', prev, next))),
    measure('scalar into mesh.scale', alternate(1, 2, (prev, next) => nodeOps.patchProp(mesh, 'scale', prev, next))),
    measure('color string into material.color', alternate('red', 'blue', (prev, next) => nodeOps.patchProp(material, 'color', prev, next))),
    measure('pierced position-x', alternate(1, 2, (prev, next) => nodeOps.patchProp(mesh, 'position-x', prev, next))),
    measure('number into material.opacity', alternate(0.5, 1, (prev, next) => nodeOps.patchProp(material, 'opacity', prev, next))),
    measure('array into primitive position', alternate([1, 2, 3], [4, 5, 6], (prev, next) => nodeOps.patchProp(primitive, 'position', prev, next))),
    measure('swap Vector3 on a field that held the previous one', () => {
      nodeOps.patchProp(follower, 'target', null, vecA)
      alternate(vecA, vecB, (prev, next) => nodeOps.patchProp(follower, 'target', prev, next))()
    }),
  )
})
