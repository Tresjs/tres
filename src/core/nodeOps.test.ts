import { beforeAll, describe, expect, it, vi } from 'vitest'
import * as THREE from 'three'
import type { Vector3 } from 'three'
import { Mesh, Scene } from 'three'
import type { TresObject } from '../types'
import { nodeOps as getNodeOps } from './nodeOps'
import { extend } from './catalogue'

let nodeOps = getNodeOps()
const pool = []

describe('nodeOps', () => {
  beforeAll(() => {
    extend(THREE)
    nodeOps = getNodeOps()
    const ce = nodeOps.createElement
    // NOTE: Overwrite createElement in order to push
    // all objects into a pool, later to be disposed.
    nodeOps.createElement = (a, b, c, d) => {
      const v = ce(a, b, c, d)
      pool.push(v)
      return v
    }
  },
  )

  afterAll(() => {
    // NOTE: Dispose disposable objects.
    for (const obj of pool) {
      if (obj && 'dispose' in obj && typeof obj.dispose === 'function') {
        obj.dispose()
      }
    }
    pool.length = 0
  })

  describe('createElement', () => {
    it('creates an instance with given tag', async () => {
    // Setup
      const tag = 'TresMesh'
      const props = { args: [] }

      // Test
      const instance = nodeOps.createElement(tag, undefined, undefined, props)

      // Assert
      expect(instance?.isObject3D).toBeTruthy()
      expect(instance).toBeInstanceOf(Mesh)
    })

    it('creates an instance with given tag and props', async () => {
    // Setup
      const tag = 'TresTorusGeometry'
      const props = { args: [10, 3, 16, 100] }

      // Test
      const instance = nodeOps.createElement(tag, undefined, undefined, props)

      // Assert
      expect(instance?.parameters.radius).toBe(10)
      expect(instance?.parameters.tube).toBe(3)
      expect(instance?.parameters.radialSegments).toBe(16)
      expect(instance?.parameters.tubularSegments).toBe(100)
    })

    it.skip('creates an camera instance', async () => {
    // Setup
      const tag = 'TresPerspectiveCamera'
      const props = { args: [75, 2, 0.1, 5] }

      // Test
      const instance = nodeOps.createElement(tag, undefined, undefined, props)

      // Assert
      expect(instance?.isCamera).toBeTruthy()
      expect(instance).toBeInstanceOf(THREE.PerspectiveCamera)
    })

    it.skip('logs a warning if the camera doesnt have a position', async () => {
    // Setup
      const tag = 'TresPerspectiveCamera'
      const props = { args: [75, 2, 0.1, 5] }

      // Spy
      const consoleWarnSpy = vi.spyOn(console, 'warn')
      consoleWarnSpy.mockImplementation(() => { })

      // Test
      const instance = nodeOps.createElement(tag, undefined, undefined, props)

      // Assert
      expect(instance?.isCamera).toBeTruthy()
      expect(instance).toBeInstanceOf(THREE.PerspectiveCamera)
      expect(consoleWarnSpy).toHaveBeenCalled()
    })

    it('throws an error if passed a "primitive" tag without an "object" prop', () => {
      expect(() => {
        nodeOps.createElement('primitive', undefined, undefined, {})
      }).toThrowError()
    })

    it('returns null if passed the tag "template"', () => {
      expect(nodeOps.createElement('template', undefined, undefined, {})).equals(null)
    })

    it('returns null if passed an HTML tag', () => {
      for (const htmlTag of ['div', 'h1', 'hr', 'p']) {
        expect(nodeOps.createElement(htmlTag, undefined, undefined, {})).equals(null)
      }
    })

    it('it sets a non-zero position on a camera if no position is provided', () => {
      const camera = nodeOps.createElement('TresPerspectiveCamera', undefined, undefined, {})
      const position: Vector3 = camera.position
      assert(['x', 'y', 'z'].some(coord => position[coord] !== 0))
    })

    it('it calls `camera.lookAt(0, 0, 0)` on a camera if no "look-at" prop is provided', () => {
      for (const position of [[1, 2, 3], [1, 0, 0], [3, 4, 5], [-1, 2, -10]]) {
        const cameraA = nodeOps.createElement('TresPerspectiveCamera', undefined, undefined, { position })
        const cameraB = nodeOps.createElement('TresPerspectiveCamera', undefined, undefined, { position, lookAt: [0, 0, 0] })
        assert(cameraA.rotation.equals(cameraB.rotation))
      }
    })

    it('throws an error if tag does not exist in catalogue', () => {
      expect(() => { nodeOps.createElement('THIS_TAG_DOES_NOT_EXIST', undefined, undefined, {}) }).toThrow()
    })

    it('adds material with "attach" property if instance is a material', () => {
    // Setup
      const tag = 'TresMeshStandardMaterial'
      const props = { args: [] }

      // Test
      const instance = nodeOps.createElement(tag, undefined, undefined, props)

      // Assert
      expect(instance?.isMaterial).toBeTruthy()
      expect(instance?.attach).toBe('material')
    })

    it('adds attach geometry property if instance is a geometry', () => {
    // Setup
      const tag = 'TresTorusGeometry'
      const props = { args: [] }

      // Test
      const instance = nodeOps.createElement(tag, undefined, undefined, props)

      // Assert
      expect(instance?.isBufferGeometry).toBeTruthy()
      expect(instance?.attach).toBe('geometry')
    })
  })

  describe('insert', () => {
    it('inserts child into parent', async () => {
    // Setup
      const parent = new Scene()
      parent.__tres = {
        root: {
          registerCamera: () => { },
          registerObjectAtPointerEventHandler: () => { },
        },
      }
      const child = new Mesh()

      child.__tres = {
        root: null,
      }

      // Fake vnodes
      child.__vnode = {
        type: 'TresMesh',
      }

      // Test
      nodeOps.insert(child, parent, null)

      // Assert
      expect(parent.children.includes(child)).toBeTruthy()
    })

    it('does not insert a falsy child', () => {
      const parent = nodeOps.createElement('Object3D', undefined, undefined, {})
      for (const falsyChild of [undefined, null]) {
        nodeOps.insert(falsyChild, parent)
        expect(parent.children.length).toBe(0)
        expect(() => nodeOps.insert(falsyChild, parent)).not.toThrow()
      }
    })

    it('inserts Fog as a property', () => {
      const parent = nodeOps.createElement('Object3D', undefined, undefined, {})
      const fog = nodeOps.createElement('Fog', undefined, undefined, {})
      nodeOps.insert(fog, parent)
      expect(parent.fog).toBe(fog)
    })

    it('if "attach" prop is provided, sets `parent[attach]`', () => {
      const parent = nodeOps.createElement('Object3D', undefined, undefined, {})
      for (const attach of ['material', 'foo', 'bar', 'baz']) {
        const child = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, {})
        child.attach = attach
        nodeOps.insert(child, parent)
        expect(parent[attach]).toBe(child)
        expect(parent.children.length).toBe(0)
      }
    })
  })

  describe('remove', () => {
    it('removes child from parent', async () => {
      const parent = mockTresObjectRootInObject(new Scene() as unknown as TresObject)
      const child = mockTresObjectRootInObject(new Mesh() as unknown as TresObject)
      nodeOps.insert(child, parent)
      nodeOps.remove(child)
      expect(!parent.children.includes(child)).toBeTruthy()
    })

    it('silently does not remove a falsy child', () => {
      for (const child of [undefined, null]) {
        expect(() => nodeOps.remove(child)).not.toThrow()
      }
    })

    it('calls dispose on materials', () => {
      const parent = mockTresObjectRootInObject(nodeOps.createElement('Mesh', undefined, undefined, {}))
      const material = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, {})
      const spy = vi.spyOn(material, 'dispose')
      nodeOps.insert(material, parent)
      nodeOps.remove(parent)
      expect(spy).toHaveBeenCalledOnce()
    })

    it('calls dispose on geometries', () => {
      const parent = mockTresObjectRootInObject(nodeOps.createElement('Mesh', undefined, undefined, {}))
      const geometry = nodeOps.createElement('SphereGeometry', undefined, undefined, {})
      const spy = vi.spyOn(geometry, 'dispose')
      nodeOps.insert(geometry, parent)
      nodeOps.remove(parent)
      expect(spy).toHaveBeenCalledOnce()
    })
  })

  describe('patchProp', () => {
    it('patches property of node', async () => {
    // Setup
      const node = nodeOps.createElement('Mesh')!
      const prop = 'visible'
      const nextValue = false

      // Test
      nodeOps.patchProp(node, prop, null, nextValue)

      // Assert
      expect(node.visible === nextValue)
    })

    it('patches/traverses pierced props', async () => {
    // Setup
      const node = nodeOps.createElement('Mesh')!
      const prop = 'position-x'
      const nextValue = 5

      // Test
      nodeOps.patchProp(node, prop, null, nextValue)

      // Assert
      expect(node.position.x === nextValue)
    })

    it('does not patch/traverse pierced props of existing dashed properties', async () => {
    // Setup
      const node = nodeOps.createElement('Mesh')!
      const prop = 'cast-shadow'
      const nextValue = true

      // Test
      nodeOps.patchProp(node, prop, null, nextValue)

      // Assert
      expect(node.castShadow === nextValue)
    })

    it('preserves ALL_CAPS_CASE in pierced props', () => {
    // Issue: https://github.com/Tresjs/tres/issues/605
      const { createElement, patchProp } = nodeOps
      const node = createElement('TresMeshStandardMaterial', undefined, undefined, {})!
      const allCapsKey = 'STANDARD'
      const allCapsUnderscoresKey = 'USE_UVS'
      const allCapsValue = 'hello'
      const allCapsUnderscoresValue = 'goodbye'

      patchProp(node, `defines-${allCapsKey}`, null, allCapsValue)
      patchProp(node, `defines-${allCapsUnderscoresKey}`, null, allCapsUnderscoresValue)

      expect(node.defines[allCapsKey]).equals(allCapsValue)
      expect(node.defines[allCapsUnderscoresKey]).equals(allCapsUnderscoresValue)
    })

    it('replaces "on*" methods on Object3D', () => {
      // Issue: https://github.com/Tresjs/tres/issues/360
      const { createElement, patchProp } = nodeOps
      const object = createElement('TresObject3D', undefined, undefined, {})

      const onAfterRender = () => {}
      const onAfterShadow = () => {}
      const onBeforeRender = () => {}
      const onBeforeShadow = () => {}

      patchProp(object, 'onAfterRender', null, onAfterRender)
      patchProp(object, 'onAfterShadow', null, onAfterShadow)
      patchProp(object, 'onBeforeRender', null, onBeforeRender)
      patchProp(object, 'onBeforeShadow', null, onBeforeShadow)

      expect(object.onAfterRender).toBe(onAfterRender)
      expect(object.onAfterShadow).toBe(onAfterShadow)
      expect(object.onBeforeRender).toBe(onBeforeRender)
      expect(object.onBeforeShadow).toBe(onBeforeShadow)
    })

    it('calls object methods', () => {
      const camera = nodeOps.createElement('TresPerspectiveCamera', undefined, undefined, {})
      const spy = vi.spyOn(camera, 'lookAt')
      nodeOps.patchProp(camera, 'look-at', undefined, new THREE.Vector3(0, 0, 0))
      nodeOps.patchProp(camera, 'look-at', undefined, new THREE.Vector3(1, 0, 0))
      nodeOps.patchProp(camera, 'look-at', undefined, new THREE.Vector3(1, 2, 0))
      expect(spy).toHaveBeenCalledTimes(3)
    })

    it('calls `copy` if property and passed value are of same type', () => {
      const camera = nodeOps.createElement('TresPerspectiveCamera', undefined, undefined, {})
      const spy = vi.spyOn(camera.position, 'copy')
      nodeOps.patchProp(camera, 'position', undefined, new THREE.Vector3(1))
      nodeOps.patchProp(camera, 'position', undefined, new THREE.Vector3(2))
      nodeOps.patchProp(camera, 'position', undefined, new THREE.Vector3(3))
      expect(spy).toHaveBeenCalledTimes(3)
    })

    it('calls `setScalar` method', () => {
      const camera = nodeOps.createElement('TresPerspectiveCamera', undefined, undefined, {})
      const spy = vi.spyOn(camera.position, 'setScalar')
      nodeOps.patchProp(camera, 'position', undefined, 1)
      nodeOps.patchProp(camera, 'position', undefined, 2)
      nodeOps.patchProp(camera, 'position', undefined, 3)
      expect(spy).toHaveBeenCalledTimes(3)
    })

    describe('patch `:object` on primitives', () => {
      it('replaces original object', () => {
        const material0 = new THREE.MeshNormalMaterial()
        const material1 = new THREE.MeshNormalMaterial()
        const primitive = nodeOps.createElement('primitive', undefined, undefined, { object: material0 })
        nodeOps.patchProp(primitive, 'object', material0, material1)
        expect(primitive.object).toBe(material1)
      })
      it('does not copy UUID', () => {
        const material0 = new THREE.MeshNormalMaterial()
        const material1 = new THREE.MeshNormalMaterial()
        const primitive = nodeOps.createElement('primitive', undefined, undefined, { object: material0 })
        nodeOps.patchProp(primitive, 'object', material0, material1)
        expect(material0.uuid).not.toBe(material1.uuid)
      })
    })

    describe('patch `:args`', () => {
      it('updates values appropriately', () => {
        const args0 = [{ color: new THREE.Color('red') }]
        const args1 = [{ color: new THREE.Color('blue') }]
        const material = nodeOps.createElement('MeshBasicMaterial', undefined, undefined, { args: args0 })
        expect(material.color.getHexString()).toBe('ff0000')
        nodeOps.patchProp(material, 'args', args0, args1)
        expect(material.color.getHexString()).toBe('0000ff')
      })
      it('creates a new instance', () => {
        const args0 = [1, 1]
        const args1 = [2, 3]
        const geometry = nodeOps.createElement('TresBoxGeometry', undefined, undefined, { args: args0 })
        const uuid = geometry.uuid
        nodeOps.patchProp(geometry, 'args', args0, args1)
        expect(geometry.uuid).not.toBe(uuid)
      })
    })

    describe('if property has a `set` method', () => {
      it('calls `set`', () => {
        const object3d = nodeOps.createElement('Object3D', undefined, undefined, {})
        const spy = vi.spyOn(object3d.layers, 'set')
        const COUNT = 4
        for (let i = 0; i < COUNT; i++) {
          const v = Math.floor(Math.random() * 32)
          nodeOps.patchProp(object3d, 'layers', undefined, v)
        }
        expect(spy).toBeCalledTimes(COUNT)
      })

      it('calls `set` with value if !Array.isArray(value)', () => {
        const s = v => JSON.stringify(v)
        const object3d = nodeOps.createElement('Object3D', undefined, undefined, {})
        let result = -1
        object3d.layers.set = v => result = v
        for (let i = 0; i < 3; i++) {
          const v = Math.floor(Math.random() * 32)
          nodeOps.patchProp(object3d, 'layers', undefined, v)
          expect(s(result)).toBe(s(v))
        }
      })
      it('spreads value if it is an array', () => {
        const s = v => JSON.stringify(v)
        const camera = nodeOps.createElement('TresPerspectiveCamera', undefined, undefined, {})
        const result = []
        camera.position.set = (x, y, z) => result.push({ x, y, z })
        nodeOps.patchProp(camera, 'position', undefined, [0, 0, 0])
        nodeOps.patchProp(camera, 'position', undefined, [1, 2, 3])
        nodeOps.patchProp(camera, 'position', undefined, [4, 5, 6])
        expect(s(result)).toBe(s([{ x: 0, y: 0, z: 0 }, { x: 1, y: 2, z: 3 }, { x: 4, y: 5, z: 6 }]))
      })
    })
  })

  describe('parentNode', () => {
    it('returns parent of a node', async () => {
    // Setup
      const parent: TresObject = new Scene()
      const child: TresObject = nodeOps.createElement('Mesh')!
      parent.children.push(child)
      child.parent = parent

      // Test
      const parentNode = nodeOps.parentNode(child)

      // Assert
      expect(parentNode === parent)
    })
  })
})

// NOTE:
// This is tightly bound to implementation and likely to change.
//
// src/core/nodeOps.ts will throw if some implementation details are not
// present, making tests unpassable.
//
// TODO:
// * Refactor src/core/nodeOps.ts, so that this function can be removed.
// * Remove this function.
//
function mockTresObjectRootInObject(obj) {
  if (!('__tres' in obj)) {
    obj.__tres = {}
  }
  obj.__tres.root = {
    deregisterObjectAtPointerEventHandler: () => {},
    deregisterBlockingObjectAtPointerEventHandler: () => {},
  }
  return obj
}
