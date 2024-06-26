import { beforeAll, describe, expect, it, vi } from 'vitest'
import * as THREE from 'three'
import type { Vector3 } from 'three'
import { Mesh, Scene } from 'three'
import type { TresContext } from 'src/composables'
import { shallowRef } from 'vue'
import type { TresObject } from '../types'
import { nodeOps as getNodeOps } from './nodeOps'
import { extend } from './catalogue'

let nodeOps = getNodeOps(mockTresContext())
const pool = []

describe('nodeOps', () => {
  beforeAll(() => {
    extend(THREE)
    nodeOps = getNodeOps(mockTresContext())
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

    describe('primitive :object', () => {
      describe('into mesh', () => {
        it.skip('inserts a mesh :object', () => {
          const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
          const object = new THREE.Mesh()
          const primitive = nodeOps.createElement('primitive', undefined, undefined, { object })

          expect(parent.material.uuid).not.toBe(object.uuid)
          nodeOps.insert(primitive, parent)
          expect(parent.material.uuid).toBe(object.uuid)
        })

        it.skip('inserts a material :object', () => {
          const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
          const object = new THREE.MeshNormalMaterial()
          const primitive = nodeOps.createElement('primitive', undefined, undefined, { object })

          expect(parent.material.uuid).not.toBe(object.uuid)
          nodeOps.insert(primitive, parent)
          expect(parent.material.uuid).toBe(object.uuid)
        })

        it.skip('inserts a geometry :object', () => {
          const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
          const object = new THREE.BoxGeometry()
          const primitive = nodeOps.createElement('primitive', undefined, undefined, { object })

          expect(parent.material.uuid).not.toBe(object.uuid)
          nodeOps.insert(primitive, parent)
          expect(parent.material.uuid).toBe(object.uuid)
        })

        it.skip('inserts a group :object', () => {
          const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
          const object = new THREE.Group()
          const primitive = nodeOps.createElement('primitive', undefined, undefined, { object })

          expect(parent.material.uuid).not.toBe(object.uuid)
          nodeOps.insert(primitive, parent)
          expect(parent.material.uuid).toBe(object.uuid)
        })
      })
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

    it('adds a material to parent.__tres.objects', () => {
      const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
      const material = nodeOps.createElement('MeshNormalMaterial')
      nodeOps.insert(material, parent)
      expect(parent.__tres.objects.map(child => child.uuid)).toStrictEqual([material.uuid])
    })

    it('adds a geometry to parent.__tres.objects', () => {
      const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
      const geometry = nodeOps.createElement('BoxGeometry')
      nodeOps.insert(geometry, parent)
      expect(parent.__tres.objects.map(child => child.uuid)).toStrictEqual([geometry.uuid])
    })

    it('adds a fog to parent.__tres.objects', () => {
      const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
      const fog = nodeOps.createElement('Fog')
      nodeOps.insert(fog, parent)
      expect(parent.__tres.objects.map(child => child.uuid)).toStrictEqual([fog.uuid])
    })

    it('adds parent to child.__tres.parent', () => {
      const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
      const material = nodeOps.createElement('MeshNormalMaterial')
      const geometry = nodeOps.createElement('BoxGeometry')
      const fog = nodeOps.createElement('Fog')
      nodeOps.insert(material, parent)
      nodeOps.insert(geometry, parent)
      nodeOps.insert(fog, parent)
      expect(material.__tres.parent).toBe(parent)
      expect(geometry.__tres.parent).toBe(parent)
      expect(fog.__tres.parent).toBe(parent)
    })

    it('adds non-Object3D children to parent.__tres.objects, but no more than once', () => {
      const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
      const material = nodeOps.createElement('MeshNormalMaterial')
      const geometry = nodeOps.createElement('BoxGeometry')
      const fog = nodeOps.createElement('Fog')
      nodeOps.insert(material, parent)
      nodeOps.insert(geometry, parent)
      nodeOps.insert(fog, parent)
      expect(parent.__tres.objects.length).toBe(3)
      const objectSet = new Set(parent.__tres.objects)
      expect(objectSet.has(material)).toBe(true)
      expect(objectSet.has(geometry)).toBe(true)
      expect(objectSet.has(fog)).toBe(true)
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

    it('calls dispose on a material', () => {
      const parent = mockTresObjectRootInObject(nodeOps.createElement('Mesh', undefined, undefined, {}))
      const material = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, {})
      const spy = vi.spyOn(material, 'dispose')
      nodeOps.insert(material, parent)
      nodeOps.remove(parent)
      expect(spy).toHaveBeenCalledOnce()
    })

    it('calls dispose on a material array', () => {
      const parent = mockTresObjectRootInObject(nodeOps.createElement('Mesh', undefined, undefined, {}))
      const material0 = new THREE.MeshNormalMaterial()
      const material1 = new THREE.MeshNormalMaterial()
      const spy0 = vi.spyOn(material0, 'dispose')
      const spy1 = vi.spyOn(material1, 'dispose')
      parent.material = [material0, material1]
      nodeOps.remove(parent)
      expect(spy0).toHaveBeenCalledOnce()
      expect(spy1).toHaveBeenCalledOnce()
    })

    it('calls dispose on geometries', () => {
      const parent = mockTresObjectRootInObject(nodeOps.createElement('Mesh', undefined, undefined, {}))
      const geometry = nodeOps.createElement('SphereGeometry', undefined, undefined, {})
      const spy = vi.spyOn(geometry, 'dispose')
      nodeOps.insert(geometry, parent)
      nodeOps.remove(parent)
      expect(spy).toHaveBeenCalledOnce()
    })

    it('calls dispose on every material/geometry in a TresMesh tree', () => {
      const NUM_LEVEL = 5
      const NUM_CHILD_PER_NODE = 3
      const rootNode = mockTresObjectRootInObject(nodeOps.createElement('Mesh'))
      const disposalSpies = []

      createTreeIn(rootNode, (parent, childI, levelI) => {
        if (levelI > NUM_LEVEL || childI >= NUM_CHILD_PER_NODE) {
          return false
        }
        const { mesh, material, geometry } = createElementMesh(nodeOps)
        nodeOps.insert(mesh, parent)
        disposalSpies.push(vi.spyOn(geometry, 'dispose'))
        disposalSpies.push(vi.spyOn(material, 'dispose'))
        return mesh
      })

      nodeOps.remove(rootNode)
      for (const spy of disposalSpies) {
        expect(spy).toHaveBeenCalledOnce()
      }
    })

    it('calls dispose on every material/geometry in a TresMesh/TresGroup tree', () => {
      const NUM_LEVEL = 5
      const NUM_CHILD_PER_NODE = 3
      const rootNode = mockTresObjectRootInObject(nodeOps.createElement('Group'))
      const disposalSpies = []

      createTreeIn(rootNode, (parent, childI, levelI) => {
        if (childI > NUM_CHILD_PER_NODE || levelI > NUM_LEVEL) {
          return false
        }
        if (Math.random() > 0.3) {
          const { mesh, material, geometry } = createElementMesh(nodeOps)
          nodeOps.insert(mesh, parent)
          disposalSpies.push(vi.spyOn(geometry, 'dispose'))
          disposalSpies.push(vi.spyOn(material, 'dispose'))
          return mesh
        }
        else {
          const group = nodeOps.createElement('Group')
          nodeOps.insert(group, parent)
          return group
        }
      })

      nodeOps.remove(rootNode)
      for (const spy of disposalSpies) {
        expect(spy).toHaveBeenCalledOnce()
      }
    })

    it('does not dispose primitive material/geometries on remove(primitive)', () => {
      const { primitive, material, geometry } = createElementPrimitiveMesh(nodeOps)
      const spy0 = vi.spyOn(material, 'dispose')
      const spy1 = vi.spyOn(geometry, 'dispose')

      const group = nodeOps.createElement('Group')
      nodeOps.insert(primitive, group)
      nodeOps.remove(primitive)

      expect(spy0).not.toBeCalled()
      expect(spy1).not.toBeCalled()
    })

    it.skip('does not dispose primitive material/geometries on remove(ascestorOfPrimitive)', () => {
      const { primitive, material, geometry } = createElementPrimitiveMesh(nodeOps)
      const spy0 = vi.spyOn(material, 'dispose')
      const spy1 = vi.spyOn(geometry, 'dispose')

      const group = nodeOps.createElement('Group')
      nodeOps.insert(primitive, group)
      nodeOps.remove(group)

      expect(spy0).not.toBeCalled()
      expect(spy1).not.toBeCalled()
    })

    it.skip('does not call dispose on primitive materials/geometries in a tree of Mesh/Groups/Primitives created by nodeOps', () => {
      const NUM_LEVEL = 5
      const NUM_CHILD_PER_NODE = 3
      const rootNode = mockTresObjectRootInObject(nodeOps.createElement('Group'))
      const disposalSpies = []

      createTreeIn(rootNode, (parent, childI, levelI) => {
        if (childI > NUM_CHILD_PER_NODE || levelI > NUM_LEVEL) {
          return false
        }
        if (Math.random() > 0.5) {
          const { mesh } = createElementMesh(nodeOps)
          nodeOps.insert(mesh, parent)
          return mesh
        }
        else if (Math.random() > 0.5) {
          const group = nodeOps.createElement('Group')
          nodeOps.insert(group, parent)
          return group
        }
        else {
          const { primitive, material, geometry } = createElementPrimitiveMesh(nodeOps)
          disposalSpies.push(vi.spyOn(geometry, 'dispose'))
          disposalSpies.push(vi.spyOn(material, 'dispose'))
          nodeOps.insert(primitive, parent)
          return primitive
        }
      })

      nodeOps.remove(rootNode)
      for (const spy of disposalSpies) {
        expect(spy).not.toHaveBeenCalled()
      }
    })

    describe(':dispose="null"', () => {
      it.skip('does not call dispose on any element in a subtree where the root :dispose==="null"', () => {
        const NUM_LEVEL = 5
        const NUM_CHILD_PER_NODE = 3
        const rootNode = mockTresObjectRootInObject(nodeOps.createElement('Group'))
        const disposalSpies = []
        const nullDisposeObjects = new Set()

        createTreeIn(rootNode, (parent, childI, levelI) => {
          if (childI > NUM_CHILD_PER_NODE || levelI > NUM_LEVEL) {
            return false
          }
          const { mesh, material, geometry } = createElementMesh(nodeOps)
          if (nullDisposeObjects.has(parent)) {
            nullDisposeObjects.add(mesh)
            disposalSpies.push(vi.spyOn(geometry, 'dispose'))
            disposalSpies.push(vi.spyOn(material, 'dispose'))
          }
          else if (levelI > 2 && Math.random() > 0.8) {
            nodeOps.patchProp(mesh, 'dispose', undefined, null)
            nullDisposeObjects.add(mesh)
            disposalSpies.push(vi.spyOn(geometry, 'dispose'))
            disposalSpies.push(vi.spyOn(material, 'dispose'))
          }
          nodeOps.insert(mesh, parent)
          return mesh
        })

        nodeOps.remove(rootNode)
        for (const spy of disposalSpies) {
          expect(spy).not.toHaveBeenCalled()
        }
      })
    })

    describe('in the THREE parent-child graph', () => {
      it('detaches mesh from mesh', () => {
        const { mesh: parent } = createElementMesh(nodeOps)
        const { mesh: child } = createElementMesh(nodeOps)
        nodeOps.insert(child, parent)
        expect(child.parent.uuid).toBe(parent.uuid)

        nodeOps.remove(child)
        expect(child.parent?.uuid).toBeFalsy()
      })
      it('detaches group from mesh', () => {
        const { mesh: parent } = createElementMesh(nodeOps)
        const child = nodeOps.createElement('Group')
        nodeOps.insert(child, parent)
        expect(child.parent.uuid).toBe(parent.uuid)

        nodeOps.remove(child)
        expect(child.parent?.uuid).toBeFalsy()
      })
      it('detaches mesh from group', () => {
        const parent = nodeOps.createElement('Group')
        const { mesh: child } = createElementMesh(nodeOps)
        nodeOps.insert(child, parent)
        expect(child.parent.uuid).toBe(parent.uuid)

        nodeOps.remove(child)
        expect(child.parent?.uuid).toBeFalsy()
      })
      it.skip('detaches mesh (in primitive :object) from mesh', () => {
        const { mesh: parent } = createElementMesh(nodeOps)
        const { primitive, mesh } = createElementPrimitiveMesh(nodeOps)
        nodeOps.insert(primitive, parent)
        expect(primitive.parent?.uuid).toBe(mesh.uuid)

        nodeOps.remove(primitive)
        expect(mesh.parent?.uuid).toBeFalsy()
      })
      it.skip('detaches mesh (in primitive :object) when mesh ancestor is removed', () => {
        const { mesh: grandparent } = createElementMesh(nodeOps)
        const { mesh: parent } = createElementMesh(nodeOps)
        const { primitive, mesh: primitiveMesh } = createElementPrimitiveMesh(nodeOps)
        nodeOps.insert(parent, grandparent)
        nodeOps.insert(primitive, parent)
        expect(primitiveMesh.parent?.uuid).toBe(parent.uuid)

        nodeOps.remove(parent)
        expect(primitiveMesh.parent?.uuid).toBeFalsy()
      })
      it('does not detach primitive :object descendants', () => {
        const { mesh: parent } = createElementMesh(nodeOps)
        const { primitive, mesh: primitiveMesh } = createElementPrimitiveMesh(nodeOps)
        const grandChild0 = new THREE.Mesh()
        const grandChild1 = new THREE.Group()
        primitiveMesh.add(grandChild0, grandChild1)

        nodeOps.insert(primitive, parent)
        expect(grandChild0.parent.uuid).toBe(primitiveMesh.uuid)
        expect(grandChild1.parent.uuid).toBe(primitiveMesh.uuid)

        nodeOps.remove(primitive)
        expect(grandChild0.parent.uuid).toBe(primitiveMesh.uuid)
        expect(grandChild1.parent.uuid).toBe(primitiveMesh.uuid)
      })
    })
    describe('in the __tres parent-object graph', () => {
      it('removes parent-object relationship when object is removed', () => {
        const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
        const material = nodeOps.createElement('MeshNormalMaterial')
        const geometry = nodeOps.createElement('BoxGeometry')
        const fog = nodeOps.createElement('Fog')
        nodeOps.insert(material, parent)
        nodeOps.insert(geometry, parent)
        nodeOps.insert(fog, parent)
        expect(material.__tres.parent).toBe(parent)
        expect(geometry.__tres.parent).toBe(parent)
        expect(fog.__tres.parent).toBe(parent)

        nodeOps.remove(fog)
        expect(fog.__tres.parent).toBe(null)
        expect(parent.__tres.objects.length).toBe(2)
        expect(parent.__tres.objects.includes(fog)).toBe(false)

        nodeOps.remove(material)
        expect(material.__tres.parent).toBe(null)
        expect(parent.__tres.objects.length).toBe(1)
        expect(parent.__tres.objects.includes(material)).toBe(false)

        nodeOps.remove(geometry)
        expect(geometry.__tres.parent).toBe(null)
        expect(parent.__tres.objects.length).toBe(0)
        expect(parent.__tres.objects.includes(geometry)).toBe(false)
      })
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

function mockTresContext() {
  return {
    scene: shallowRef(new Scene()),
    registerCamera: () => {},
    deregisterCamera: () => {},
  } as unknown as TresContext
}

function createElementMesh(nodeOps: ReturnType<typeof getNodeOps>) {
  const geometry = nodeOps.createElement('BoxGeometry')
  const material = nodeOps.createElement('MeshNormalMaterial')
  const mesh = nodeOps.createElement('Mesh')
  nodeOps.insert(geometry, mesh)
  nodeOps.insert(material, mesh)
  return { mesh, geometry, material }
}

function createElementPrimitiveMesh(nodeOps: ReturnType<typeof getNodeOps>) {
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshNormalMaterial()
  const mesh = new THREE.Mesh(geometry, material)
  const primitive = nodeOps.createElement('primitive', undefined, undefined, { object: mesh })
  return { primitive, mesh, geometry, material }
}

function createTreeIn<T>(root: T, insertCallback: (parent: T, childI: number, levelI: number) => T) {
  let levelII = 0
  const nextLevel = [root] as T[]
  while (nextLevel.length) {
    const currLevel = Array.from(nextLevel)
    nextLevel.length = 0

    while (currLevel.length) {
      const parent = currLevel.shift()
      let childI = 0
      while (true) {
        const child = insertCallback(parent, childI++, levelII)
        if (child) {
          nextLevel.push(child)
        }
        else {
          break
        }
      }
    }
    levelII++
  }
}
