import type { TresContext } from '../composables'
import type { Vector3 } from 'three'
import type { TresObject } from '../types'
import * as THREE from 'three'
import { Mesh, Scene } from 'three'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'
import { extend } from './catalogue'
import { nodeOps as getNodeOps } from './nodeOps'

let nodeOps = getNodeOps({ context: mockTresContext() })
const pool = []

describe('nodeOps', () => {
  beforeAll(() => {
    extend(THREE)
    nodeOps = getNodeOps({ context: mockTresContext() })
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

    it('does not throw an error if `props` is `null`', () => {
      expect(() => { nodeOps.createElement('TresPerspectiveCamera', undefined, undefined, null) }).not.toThrow()
      expect(() => { nodeOps.createElement('TresMesh', undefined, undefined, null) }).not.toThrow()
      expect(() => { nodeOps.createElement('TresBoxGeometry', undefined, undefined, null) }).not.toThrow()
      expect(() => { nodeOps.createElement('TresMeshNormalMaterial', undefined, undefined, null) }).not.toThrow()
    })

    it('creates an instance with given tag using kebab-case notation', () => {
      // Setup
      const tag = 'tres-mesh'
      const props = { args: [] }

      // Test
      const instance = nodeOps.createElement(tag, undefined, undefined, props)

      // Assert
      expect(instance?.isObject3D).toBeTruthy()
      expect(instance).toBeInstanceOf(Mesh)
    })

    it('creates an instance with given tag using kebab-case notation and props ', () => {
      // Setup
      const tag = 'tres-torus-geometry'
      const props = { args: [10, 3, 16, 100] }

      // Test
      const instance = nodeOps.createElement(tag, undefined, undefined, props)

      // Assert
      expect(instance?.parameters.radius).toBe(10)
      expect(instance?.parameters.tube).toBe(3)
      expect(instance?.parameters.radialSegments).toBe(16)
      expect(instance?.parameters.tubularSegments).toBe(100)
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

    describe.skip('primitive :object', () => {
      describe('into mesh', () => {
        it('inserts a mesh :object', () => {
          const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
          const object = new THREE.Mesh()
          const primitive = nodeOps.createElement('primitive', undefined, undefined, { object })

          expect(parent.children.length).toBe(0)
          nodeOps.insert(primitive, parent)
          expect(parent.children.length).toBe(1)
          expect(parent.children[0]).toBe(object)
        })

        it('inserts a material :object', () => {
          const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
          const object = new THREE.MeshNormalMaterial()
          const primitive = nodeOps.createElement('primitive', undefined, undefined, { object })

          expect(parent.material.uuid).not.toBe(object)
          nodeOps.insert(primitive, parent)
          expect(parent.material).toBe(object)
        })

        it('inserts a geometry :object', () => {
          const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
          const object = new THREE.BoxGeometry()
          const primitive = nodeOps.createElement('primitive', undefined, undefined, { object })

          expect(parent.geometry).not.toBe(object)
          nodeOps.insert(primitive, parent)
          expect(parent.geometry).toBe(object)
        })

        it('inserts a group :object', () => {
          const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
          const object = new THREE.Group()
          const primitive = nodeOps.createElement('primitive', undefined, undefined, { object })

          expect(parent.children.length).toBe(0)
          nodeOps.insert(primitive, parent)
          expect(parent.children[0]).toBe(object)
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

    describe('attach/detach', () => {
      // NOTE: Special implementation case: `attach`/`detach`
      //
      // Objects that aren't added to the Scene using
      // `THREE.Object3D`'s `add` will generally be inserted
      // using `attach` and removed using `detach`.
      //
      // This way of inserting/removing has special challenges:
      // - The user can specify how the object is `attach`/`detach`ed
      // by setting the `attach` prop.
      // - Before a new value is `attach`ed, the system must record
      // the current value and restore it when the new value is
      // `detach`ed.
      it('if "attach" prop is provided, sets `parent[attach], even if the field does not exist on the parent`', () => {
        const parent = nodeOps.createElement('Object3D', undefined, undefined, {})
        for (const attach of ['material', 'foo', 'bar', 'baz']) {
          const child = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, { attach })
          nodeOps.insert(child, parent)
          expect(parent[attach]).toBe(child)
          expect(parent.children.length).toBe(0)
        }
      })

      it('can attach and detach a BufferGeometry', () => {
        const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
        const previousAttach = parent.geometry
        const geometry0 = nodeOps.createElement('BoxGeometry', undefined, undefined, {})
        const geometry1 = nodeOps.createElement('BoxGeometry', undefined, undefined, {})

        nodeOps.insert(geometry0, parent)
        expect(parent.geometry).not.toBe(previousAttach)
        expect(parent.geometry).toBe(geometry0)

        nodeOps.remove(geometry0)
        nodeOps.insert(geometry1, parent)
        expect(parent.geometry).toBe(geometry1)

        nodeOps.remove(geometry1)
        expect(parent.geometry).toBe(previousAttach)
      })

      it('can attach and detach a material', () => {
        const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
        const previousAttach = parent.material
        const material0 = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, {})
        const material1 = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, {})
        nodeOps.insert(material0, parent)
        expect(parent.material).toBe(material0)

        nodeOps.remove(material0)
        nodeOps.insert(material1, parent)
        expect(parent.material).toBe(material1)

        nodeOps.remove(material1)
        expect(parent.material).toBe(previousAttach)
      })

      it('can swap 2 materials as if by v-if', () => {
        // NOTE: for the Vue template ...
        // <TresMesh>
        //   <TresMeshNormalMaterial v-if="tOrF" name="a" />
        //   <TresMeshBasicMaterial v-else name="b" />
        // </TresMesh>
        // ... the calling order for nodeOps when toggling tOrF is:
        // createElement(a)
        // insert(a)
        // remove(a)
        // createElement(b)
        // insert(b)
        // remove(b)
        // ... and so on
        const mesh = nodeOps.createElement('Mesh', undefined, undefined, {})
        const originalMaterial = mesh.material
        const geo = nodeOps.createElement('BoxGeometry')
        let mat0 = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, {})
        let mat1 = nodeOps.createElement('MeshStandardMaterial', undefined, undefined, {})

        nodeOps.insert(geo, mesh)
        nodeOps.insert(mat0, mesh)
        expect(mesh.material).toBe(mat0)

        let NUM_SWAPS = 10
        while (NUM_SWAPS-- > 0) {
          nodeOps.remove(mat0)
          expect(mesh.material).toBe(originalMaterial)
          mat1 = nodeOps.createElement('MeshStandardMaterial', undefined, undefined, {})
          nodeOps.insert(mat1, mesh)
          expect(mesh.material).toBe(mat1)

          nodeOps.remove(mat1)
          expect(mesh.material).toBe(originalMaterial)
          mat0 = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, {})
          nodeOps.insert(mat0, mesh)
          expect(mesh.material).toBe(mat0)
        }
      })

      it('can attach and detach a material array', () => {
        const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
        const previousMaterial = parent.material
        const material0 = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, { attach: 'material-0' })
        const material1 = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, { attach: 'material-1' })
        const material2 = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, { attach: 'material-2' })
        nodeOps.insert(material0, parent)
        expect(parent.material[0]).toStrictEqual(material0)
        nodeOps.insert(material1, parent)
        expect(parent.material[1]).toStrictEqual(material1)
        nodeOps.insert(material2, parent)
        expect(parent.material[2]).toStrictEqual(material2)

        nodeOps.remove(material0)
        expect(parent.material[0]).toBeUndefined()
        expect(parent.material[1]).toBe(material1)
        expect(parent.material[2]).toBe(material2)
        nodeOps.remove(material2)
        expect(parent.material[0]).toBeUndefined()
        expect(parent.material[1]).toBe(material1)
        expect(parent.material[2]).toBeUndefined()

        nodeOps.patchProp(material1, 'attach', undefined, 'material-2')
        expect(parent.material[0]).toBeUndefined()
        expect(parent.material[1]).toBeUndefined()
        expect(parent.material[2]).toBe(material1)

        nodeOps.remove(material1)
        expect(parent.material).toBe(previousMaterial)
      })

      it('can attach and detach fog', () => {
        const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
        const fog = nodeOps.createElement('Fog', undefined, undefined, {})
        nodeOps.insert(fog, parent)
        expect(parent.fog).toBe(fog)
        nodeOps.remove(fog)
        expect('fog' in parent).toBe(false)
      })

      it('can attach and detach a "pierced" string', () => {
        const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
        const material = nodeOps.createElement('MeshBasicMaterial', undefined, undefined, { color: 'red' })
        const previousColor = material.color
        const color = nodeOps.createElement('Color', undefined, undefined, { attach: 'material-color' })
        nodeOps.insert(material, parent)
        nodeOps.insert(color, parent)
        expect(parent.material.color).toBe(color)
        nodeOps.remove(color)
        expect(parent.material.color).toBe(previousColor)

        material.alphaMap = new THREE.Texture()
        const previousAlphaMap = material.alphaMap
        const alphaMap = nodeOps.createElement('Texture', undefined, undefined, { attach: 'material-alpha-map' })
        nodeOps.insert(alphaMap, parent)
        expect(parent.material.alphaMap).toBe(alphaMap)
        nodeOps.remove(alphaMap)
        expect(parent.material.alphaMap).toBe(previousAlphaMap)
      })

      it('attach can be patched', () => {
        const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
        const previousMaterial = parent.material
        const material = nodeOps.createElement('MeshBasicMaterial', undefined, undefined, { color: 'red', attach: 'material' })
        nodeOps.insert(material, parent)
        expect(parent.material).toBe(material)

        nodeOps.patchProp(material, 'attach', undefined, 'foo')
        expect(parent.foo).toBe(material)
        expect(parent.material).toBe(previousMaterial)

        nodeOps.patchProp(material, 'attach', undefined, 'material')
        expect(parent.foo).toBeUndefined()
        expect(parent.material).toBe(material)

        nodeOps.patchProp(material, 'attach', undefined, 'bar')
        expect(parent.bar).toBe(material)
        expect(parent.material).toBe(previousMaterial)
      })

      it('can attach and detach a material array by patching `attach`', () => {
        const parent = nodeOps.createElement('Mesh', undefined, undefined, {})
        const previousMaterial = parent.material
        const material0 = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, { attach: 'material-0' })
        const material1 = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, { attach: 'material-1' })
        const material2 = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, { attach: 'material-2' })
        nodeOps.insert(material0, parent)
        nodeOps.insert(material1, parent)
        nodeOps.insert(material2, parent)
        expect(parent.material[0]).toBe(material0)
        expect(parent.material[1]).toBe(material1)
        expect(parent.material[2]).toBe(material2)

        nodeOps.patchProp(material1, 'attach', undefined, 'material-0')
        expect(parent.material[0]).toBe(material1)
        expect(parent.material[1]).toBeUndefined()
        expect(parent.material[2]).toBe(material2)

        nodeOps.patchProp(material1, 'attach', undefined, 'material-2')
        expect(parent.material[0]).toBe(material0)
        expect(parent.material[1]).toBeUndefined()
        expect(parent.material[2]).toBe(material1)

        nodeOps.patchProp(material0, 'attach', undefined, 'foo')
        expect(parent.material[0]).toBeUndefined()
        expect(parent.material[1]).toBeUndefined()
        expect(parent.material[2]).toBe(material1)

        nodeOps.patchProp(material1, 'attach', undefined, 'foo')
        expect(parent.material[0]).toBeUndefined()
        expect(parent.material[1]).toBeUndefined()
        expect(parent.material[2]).toBe(material2)

        nodeOps.patchProp(material2, 'attach', undefined, 'foo')
        expect(parent.material).toBe(previousMaterial)
      })
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
      const childrenSet = new Set(parent.__tres.objects)
      expect(childrenSet.has(material)).toBe(true)
      expect(childrenSet.has(geometry)).toBe(true)
      expect(childrenSet.has(fog)).toBe(true)
    })

    it('can insert the same `primitive :object` in multiple places in the scene graph', () => {
      const material = new THREE.MeshNormalMaterial()
      const geometry = new THREE.BoxGeometry()
      const otherMaterial = new THREE.MeshBasicMaterial()
      const otherGeometry = new THREE.SphereGeometry()

      const grandparent = nodeOps.createElement('Mesh', undefined, undefined, {})
      const parent0 = nodeOps.createElement('Mesh', undefined, undefined, {})
      const parent1 = nodeOps.createElement('Mesh', undefined, undefined, {})
      const parent2 = nodeOps.createElement('Mesh', undefined, undefined, {})

      const materialPrimitive0 = nodeOps.createElement('primitive', undefined, undefined, { object: material })
      const materialPrimitive1 = nodeOps.createElement('primitive', undefined, undefined, { object: material })
      const materialPrimitive2 = nodeOps.createElement('primitive', undefined, undefined, { object: material })
      const materialPrimitiveOther = nodeOps.createElement('primitive', undefined, undefined, { object: otherMaterial })

      const geometryPrimitive0 = nodeOps.createElement('primitive', undefined, undefined, { object: geometry })
      const geometryPrimitive1 = nodeOps.createElement('primitive', undefined, undefined, { object: geometry })
      const geometryPrimitive2 = nodeOps.createElement('primitive', undefined, undefined, { object: geometry })
      const geometryPrimitiveOther = nodeOps.createElement('primitive', undefined, undefined, { object: otherGeometry })

      nodeOps.insert(parent0, grandparent)
      nodeOps.insert(parent1, grandparent)
      nodeOps.insert(parent2, grandparent)
      nodeOps.insert(materialPrimitive0, parent0)
      nodeOps.insert(materialPrimitive1, parent1)
      nodeOps.insert(materialPrimitive2, parent2)
      nodeOps.insert(geometryPrimitive0, parent0)
      nodeOps.insert(geometryPrimitive1, parent1)
      nodeOps.insert(geometryPrimitive2, parent2)

      expect(parent0.material).toBe(material)
      expect(parent1.material).toBe(material)
      expect(parent2.material).toBe(material)
      expect(parent0.geometry).toBe(geometry)
      expect(parent1.geometry).toBe(geometry)
      expect(parent2.geometry).toBe(geometry)

      nodeOps.insert(materialPrimitiveOther, parent0)
      nodeOps.insert(geometryPrimitiveOther, parent1)

      expect(parent0.material).not.toBe(material)
      expect(parent1.material).toBe(material)
      expect(parent2.material).toBe(material)
      expect(parent0.geometry).toBe(geometry)
      expect(parent1.geometry).not.toBe(geometry)
      expect(parent2.geometry).toBe(geometry)

      nodeOps.insert(materialPrimitiveOther, parent1)
      nodeOps.insert(geometryPrimitiveOther, parent0)

      expect(parent0.material).not.toBe(material)
      expect(parent1.material).not.toBe(material)
      expect(parent2.material).toBe(material)
      expect(parent0.geometry).not.toBe(geometry)
      expect(parent1.geometry).not.toBe(geometry)
      expect(parent2.geometry).toBe(geometry)

      nodeOps.insert(materialPrimitiveOther, parent2)
      nodeOps.insert(geometryPrimitiveOther, parent2)

      expect(parent0.material).not.toBe(material)
      expect(parent1.material).not.toBe(material)
      expect(parent2.material).not.toBe(material)
      expect(parent0.geometry).not.toBe(geometry)
      expect(parent1.geometry).not.toBe(geometry)
      expect(parent2.geometry).not.toBe(geometry)

      expect(parent0.material).toBe(otherMaterial)
      expect(parent1.material).toBe(otherMaterial)
      expect(parent2.material).toBe(otherMaterial)
      expect(parent0.geometry).toBe(otherGeometry)
      expect(parent1.geometry).toBe(otherGeometry)
      expect(parent2.geometry).toBe(otherGeometry)
    })
  })

  describe('remove', () => {
    it('removes child from parent', async () => {
      const parent = mockTresObjectRootInObject(new Scene() as unknown as TresObject)
      const child = mockTresObjectRootInObject(new Mesh() as unknown as TresObject)
      nodeOps.insert(child, parent)
      nodeOps.remove(child)
      expect(parent.children.includes(child)).toBeFalsy()
    })

    it('silently does not remove a falsy child', () => {
      for (const child of [undefined, null]) {
        expect(() => nodeOps.remove(child)).not.toThrow()
      }
    })

    describe('dispose', () => {
      describe('default dispose', () => {
        it('calls dispose on a material', () => {
          const parent = mockTresObjectRootInObject(nodeOps.createElement('Mesh', undefined, undefined, {}))
          const material = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, {})
          const spy = vi.spyOn(material, 'dispose')
          nodeOps.insert(material, parent)
          nodeOps.remove(parent)
          expect(spy).toHaveBeenCalledOnce()
        })

        it('calls dispose on an array of materials in a TresMesh', () => {
          const parent = mockTresObjectRootInObject(nodeOps.createElement('Mesh', undefined, undefined, {}))
          const material0 = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, { attach: 'material-0' })
          const material1 = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, { attach: 'material-1' })
          const material2 = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, { attach: 'material-2' })
          const spy0 = vi.spyOn(material0, 'dispose')
          const spy1 = vi.spyOn(material1, 'dispose')
          const spy2 = vi.spyOn(material2, 'dispose')
          nodeOps.insert(material0, parent)
          nodeOps.insert(material1, parent)
          nodeOps.insert(material2, parent)
          nodeOps.remove(parent)
          expect(spy0).toHaveBeenCalledOnce()
          expect(spy1).toHaveBeenCalledOnce()
          expect(spy2).toHaveBeenCalledOnce()
        })

        it('calls dispose on geometries', () => {
          const parent = mockTresObjectRootInObject(nodeOps.createElement('Mesh', undefined, undefined, {}))
          const geometry = nodeOps.createElement('SphereGeometry', undefined, undefined, {})
          const spy = vi.spyOn(geometry, 'dispose')
          nodeOps.insert(geometry, parent)
          nodeOps.remove(parent)
          expect(spy).toHaveBeenCalledOnce()
        })

        it('calls dispose on material/geometry in a TresMesh child of a TresMesh', () => {
          const { mesh: grandparent } = createElementMesh(nodeOps)
          const { mesh: parent } = createElementMesh(nodeOps)
          const { mesh: child } = createElementMesh(nodeOps)
          nodeOps.insert(parent, grandparent)
          nodeOps.insert(child, parent)
          const childMaterialDisposalSpy = vi.spyOn(child.material, 'dispose')
          const childGeometryDisposalSpy = vi.spyOn(child.geometry, 'dispose')
          nodeOps.remove(parent)
          expect(childGeometryDisposalSpy).toHaveBeenCalledOnce()
          expect(childMaterialDisposalSpy).toHaveBeenCalledOnce()
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

        it('does not dispose primitive material/geometries on remove(ascestorOfPrimitive)', () => {
          const { primitive, material, geometry } = createElementPrimitiveMesh(nodeOps)
          const spy0 = vi.spyOn(material, 'dispose')
          const spy1 = vi.spyOn(geometry, 'dispose')

          const group = nodeOps.createElement('Group')
          nodeOps.insert(primitive, group)
          nodeOps.remove(group)

          expect(spy0).not.toBeCalled()
          expect(spy1).not.toBeCalled()
        })

        it('does not call dispose on primitive materials/geometries in a tree of Mesh/Groups/Primitives created by nodeOps', () => {
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
      })

      describe(':dispose="null" or :dispose="false"', () => {
        it('does not call dispose on geometry/material in a Mesh where :dispose==="null" or "false"', () => {
          for (const d of [false, null]) {
            const { mesh: parent } = createElementMesh(nodeOps)
            const { mesh, geometry, material } = createElementMesh(nodeOps)
            const spy0 = vi.spyOn(geometry, 'dispose')
            const spy1 = vi.spyOn(material, 'dispose')
            nodeOps.patchProp(mesh, 'dispose', undefined, d)
            nodeOps.insert(mesh, parent)
            nodeOps.remove(mesh)
            expect(spy0).not.toBeCalled()
            expect(spy1).not.toBeCalled()
          }
        })
        it('does not call dispose on child\'s geometry/material, for remove(<parent><child :dispose="null" /></parent>)', () => {
          for (const d of [false, null]) {
            const { mesh: grandparent } = createElementMesh(nodeOps)
            const { mesh: parent } = createElementMesh(nodeOps)
            const { mesh: child, geometry, material } = createElementMesh(nodeOps)
            const spy0 = vi.spyOn(geometry, 'dispose')
            const spy1 = vi.spyOn(material, 'dispose')
            nodeOps.patchProp(child, 'dispose', undefined, d)
            nodeOps.insert(parent, grandparent)
            nodeOps.insert(child, parent)
            nodeOps.remove(parent)
            expect(spy0).not.toBeCalled()
            expect(spy1).not.toBeCalled()
          }
        })
        it('does not call dispose on any element in a subtree where the root :dispose==="null"', () => {
          for (const d of [false, null]) {
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
                nodeOps.patchProp(mesh, 'dispose', undefined, d)
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
          }
        })
      })

      describe(':dispose="false"', () => {
        it('calls no `dispose`s when removed', () => {
          const { spies, m } = createSimpleMeshPrimitiveTree(nodeOps)
          nodeOps.patchProp(m, 'dispose', undefined, false)
          nodeOps.remove(m)

          for (const spy of spies) {
            expect(spy).not.toHaveBeenCalled()
          }
        })
      })

      describe(':dispose="fn"', () => {
        it('calls `fn(node)`, for every declarative node and every THREE.child when tree is removed', () => {
          const { nodes, m } = createSimpleMeshPrimitiveTree(nodeOps)
          const spies = nodes.map((node) => {
            const spy = vi.fn((n) => {
              return n === node
            })
            node = Object.assign(node, { foo: spy })
            return spy
          })
          const fn = (node: any) => node.foo?.(node)
          nodeOps.patchProp(m, 'dispose', undefined, fn)
          nodeOps.remove(m)

          for (const spy of spies) {
            expect(spy).toHaveBeenCalled()
          }
        })
      })

      describe('dispose="default"', () => {
        it('resets a ancestor\'s :dispose="false"', () => {
          const { spiesByKey: spies, m, m_m, m_p } = createSimpleMeshPrimitiveTree(nodeOps)
          nodeOps.patchProp(m, 'dispose', undefined, false)
          nodeOps.patchProp(m_m, 'dispose', undefined, 'default')
          nodeOps.patchProp(m_p, 'dispose', undefined, 'default')
          nodeOps.remove(m)

          expect(spies.m.material).not.toBeCalled()
          expect(spies.m.geometry).not.toBeCalled()

          expect(spies.m_m.material).toBeCalled()
          expect(spies.m_m.geometry).toBeCalled()

          expect(spies.m_p.material).not.toBeCalled()
          expect(spies.m_p.geometry).not.toBeCalled()

          expect(spies.m_m_m.material).toBeCalled()
          expect(spies.m_m_m.geometry).toBeCalled()
          expect(spies.m_m_p.material).not.toBeCalled()
          expect(spies.m_m_p.geometry).not.toBeCalled()

          expect(spies.m_p_m.material).toBeCalled()
          expect(spies.m_p_m.geometry).toBeCalled()
          expect(spies.m_p_p.material).not.toBeCalled()
          expect(spies.m_p_p.geometry).not.toBeCalled()
        })
        it('resets a :dispose="fn"', () => {
          const { spiesByKey: spies, m, m_p_p } = createSimpleMeshPrimitiveTree(nodeOps)
          // NOTE: `disposeRecursive` should dispose all
          // children, geometries, materials, including in primitives.
          nodeOps.patchProp(m, 'dispose', undefined, (node) => {
            if (node.dispose) {
              try {
                node.dispose()
              }
              catch (e) {
                console.error(e)
              }
            }
            if (node.material) { node.material.dispose() }
            if (node.geometry) { node.geometry.dispose() }
          })
          // NOTE: In the tree of `m_p_p`, the primitives and their
          // geometries, materials should not be disposed.
          nodeOps.patchProp(m_p_p, 'dispose', undefined, 'default')
          nodeOps.remove(m)

          expect(spies.m.material).toBeCalled()
          expect(spies.m.geometry).toBeCalled()

          expect(spies.m_m.material).toBeCalled()
          expect(spies.m_m.geometry).toBeCalled()

          expect(spies.m_p.material).toBeCalled()
          expect(spies.m_p.geometry).toBeCalled()

          expect(spies.m_m_m.material).toBeCalled()
          expect(spies.m_m_m.geometry).toBeCalled()
          expect(spies.m_m_p.material).toBeCalled()
          expect(spies.m_m_p.geometry).toBeCalled()

          expect(spies.m_p_m.material).toBeCalled()
          expect(spies.m_p_m.geometry).toBeCalled()

          expect(spies.m_p_p.material).not.toBeCalled()
          expect(spies.m_p_p.geometry).not.toBeCalled()
        })
      })

      it('disposes "nodeA" in <primitive ...><TresMesh name="nodeA" /></primitive>', () => {
        const { primitive } = createElementPrimitiveMesh(nodeOps)
        const { mesh } = createElementMesh(nodeOps)
        nodeOps.insert(mesh, primitive)
        const spies = [
          vi.spyOn(mesh.material, 'dispose'),
          vi.spyOn(mesh.geometry, 'dispose'),
        ]
        for (const spy of spies) {
          expect(spy).not.toHaveBeenCalled()
        }
        nodeOps.remove(primitive)
        for (const spy of spies) {
          expect(spy).toHaveBeenCalledOnce()
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
      describe('primitive', () => {
        it('detaches mesh (in primitive :object) from mesh', () => {
          const { mesh: parent } = createElementMesh(nodeOps)
          const { primitive, mesh } = createElementPrimitiveMesh(nodeOps)
          nodeOps.insert(primitive, parent)
          expect(primitive.parent?.uuid).toBe(parent.uuid)

          nodeOps.remove(primitive)
          expect(mesh.parent?.uuid).toBeFalsy()
        })
        it('detaches mesh (in primitive :object) when mesh ancestor is removed', () => {
          const { mesh: grandparent } = createElementMesh(nodeOps)
          const { mesh: parent } = createElementMesh(nodeOps)
          const { primitive, mesh: primitiveMesh } = createElementPrimitiveMesh(nodeOps)
          nodeOps.insert(parent, grandparent)
          nodeOps.insert(primitive, parent)
          expect(primitiveMesh.parent?.uuid).toBe(parent.uuid)

          nodeOps.remove(parent)
          expect(primitiveMesh.parent?.type).toBeFalsy()
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
    })
    describe('in the __tres parent-objects graph', () => {
      it('removes parent-objects relationship when object is removed', () => {
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
        expect(fog.__tres?.parent).toBeFalsy()
        expect(parent.__tres.objects.length).toBe(2)
        expect(parent.__tres.objects.includes(fog)).toBe(false)

        nodeOps.remove(material)
        expect(material.__tres?.parent).toBeFalsy()
        expect(parent.__tres.objects.length).toBe(1)
        expect(parent.__tres.objects.includes(material)).toBe(false)

        nodeOps.remove(geometry)
        expect(geometry.__tres?.parent).toBeFalsy()
        expect(parent.__tres.objects.length).toBe(0)
        expect(parent.__tres.objects.includes(geometry)).toBe(false)
      })
    })

    it('disposes a GridHelper without throwing (Issue #721)', () => {
      const gridHelper = nodeOps.createElement('GridHelper', undefined, undefined, {})
      expect(() => nodeOps.remove(gridHelper)).not.toThrow()
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
      const originalY = node.position.y
      const originalZ = node.position.z

      // Test
      nodeOps.patchProp(node, prop, null, nextValue)

      // Assert
      expect(node.position.x).toBe(nextValue)
      expect(node.position.y).toBe(originalY) // Should remain unchanged
      expect(node.position.z).toBe(originalZ) // Should remain unchanged
    })

    it('patches/traverses pierced props with array values', async () => {
    // Setup
      const light = nodeOps.createElement('DirectionalLight')!

      // DirectionalLight shadow might be null by default, need to enable it
      light.castShadow = true // This should initialize the shadow

      const prop = 'shadow-mapSize'
      const nextValue = [2048, 2048]

      // Test
      nodeOps.patchProp(light, prop, null, nextValue)

      // Assert
      expect(light.shadow).toBeTruthy()
      expect(light.shadow.mapSize[0]).toBe(2048)
      expect(light.shadow.mapSize[1]).toBe(2048)
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

    describe('primitive', () => {
      describe(':object', () => {
        it('replaces original object', () => {
          const material0 = new THREE.MeshNormalMaterial()
          const material1 = new THREE.MeshBasicMaterial()
          const primitive = nodeOps.createElement('primitive', undefined, undefined, { object: material0 })
          nodeOps.patchProp(primitive, 'object', material0, material1)
          expect(primitive.object).toBe(material1)
        })

        it('does not alter __tres on another primitive sharing the same object', () => {
          const doFreeze = (o: any) => {
          // NOTE: o.root contains references to scene, etc.
          // These will change simply by adding elements to the
          // scene. So copy and remove root.
            o = { ...o }
            delete o.root
            return JSON.parse(JSON.stringify(o))
          }

          const materialA = new THREE.MeshNormalMaterial()
          const materialB = new THREE.MeshNormalMaterial()
          const primitive0 = nodeOps.createElement('primitive', undefined, undefined, { object: materialA })

          const primitive0Tres = doFreeze(primitive0.__tres)
          expect(doFreeze(primitive0.__tres)).toStrictEqual(primitive0Tres)
          const primitive1 = nodeOps.createElement('primitive', undefined, undefined, { object: materialA })

          expect(primitive0.__tres).not.toBe(primitive1.__tres)
          expect(doFreeze(primitive0.__tres)).toStrictEqual(primitive0Tres)

          nodeOps.patchProp(primitive1, 'object', undefined, materialB)
          expect(primitive0.__tres).not.toStrictEqual(primitive1.__tres)
          expect(doFreeze(primitive0.__tres)).toStrictEqual(primitive0Tres)

          nodeOps.patchProp(primitive1, 'object', undefined, materialA)
          expect(primitive0.__tres).not.toBe(primitive1.__tres)
          expect(doFreeze(primitive0.__tres)).toStrictEqual(primitive0Tres)
        })

        it('does not replace the object in other primitives who point to the same object', () => {
          const { mesh: parent } = createElementMesh(nodeOps)
          const { mesh: child0 } = createElementMesh(nodeOps)
          const { mesh: child1 } = createElementMesh(nodeOps)
          const materialA = new THREE.MeshNormalMaterial()
          const materialB = new THREE.MeshBasicMaterial()
          const primitive1 = nodeOps.createElement('primitive', undefined, undefined, { object: materialA })
          const primitive0 = nodeOps.createElement('primitive', undefined, undefined, { object: materialA })

          nodeOps.insert(primitive0, child0)
          nodeOps.insert(primitive1, child1)
          nodeOps.insert(child0, parent)
          nodeOps.insert(child1, parent)

          expect(child0.material).toBe(materialA)
          expect(child1.material).toBe(materialA)

          nodeOps.patchProp(primitive1, 'object', undefined, materialB)
          expect(child0.material).toBe(materialA)
          expect(child1.material).not.toBe(materialA)

          nodeOps.patchProp(primitive1, 'object', undefined, materialA)
          expect(child0.material).toBe(materialA)
          expect(child1.material).toBe(materialA)

          nodeOps.patchProp(primitive0, 'object', undefined, materialB)
          expect(child0.material).not.toBe(materialA)
          expect(child1.material).toBe(materialA)

          nodeOps.patchProp(primitive1, 'object', undefined, materialB)
          expect(child0.material).not.toBe(materialA)
          expect(child1.material).not.toBe(materialA)
          expect(child0.material).toBe(materialB)
          expect(child1.material).toBe(materialB)
        })
        it('attaches the new object to the old object\'s parent; clears old object\'s parent', () => {
          const { mesh: parent } = createElementMesh(nodeOps)
          const { mesh: child0 } = createThreeBox()
          const { mesh: child1 } = createThreeBox()
          const primitive = nodeOps.createElement('primitive', undefined, undefined, { object: child0 })
          nodeOps.insert(primitive, parent)
          expect(child0.parent).toBe(parent)
          expect(parent.children[0]).toBe(child0)
          expect(parent.children.length).toBe(1)

          nodeOps.patchProp(primitive, 'object', undefined, child1)
          expect(child0.parent?.uuid).toBeFalsy()
          expect(child1.parent?.uuid).toBe(parent.uuid)
          expect(parent.children[0].uuid).toBe(child1.uuid)
          expect(parent.children.length).toBe(1)
        })
        it('if old :object had been patched, those patches are applied to new :object', () => {
          const { mesh: parent } = createElementMesh(nodeOps)
          const { mesh: child0 } = createElementMesh(nodeOps)
          const { mesh: child1 } = createElementMesh(nodeOps)
          const primitive = nodeOps.createElement('primitive', undefined, undefined, { object: child0 })
          nodeOps.insert(primitive, parent)
          nodeOps.patchProp(primitive, 'position-x', undefined, -999)
          expect(child0.position.x).toBe(-999)

          nodeOps.patchProp(primitive, 'object', undefined, child1)
          expect(child1.position.x).toBe(-999)

          nodeOps.patchProp(primitive, 'position-x', undefined, 1000)
          nodeOps.patchProp(primitive, 'object', undefined, child0)
          expect(child0.position.x).toBe(1000)
        })
        it('does not attach old :object THREE children to new :object', () => {
          const { mesh: parent } = createElementMesh(nodeOps)
          const { mesh: child0 } = createElementMesh(nodeOps)
          const { mesh: child1 } = createElementMesh(nodeOps)
          const grandchild0 = new THREE.Mesh()
          const grandchild1 = new THREE.Mesh()
          child0.add(grandchild0)
          child1.add(grandchild1)
          const primitive = nodeOps.createElement('primitive', undefined, undefined, { object: child0 })
          nodeOps.insert(primitive, parent)
          expect(primitive.children[0]).toBe(grandchild0)
          expect(primitive.children.length).toBe(1)

          nodeOps.patchProp(primitive, 'object', undefined, child1)
          expect(primitive.children[0]).toBe(grandchild1)
          expect(primitive.children.length).toBe(1)

          nodeOps.patchProp(primitive, 'object', undefined, child0)
          expect(primitive.children[0].uuid).toBe(grandchild0.uuid)
          expect(primitive.children.length).toBe(1)

          nodeOps.patchProp(primitive, 'object', undefined, child1)
          expect(primitive.children[0]).toBe(grandchild1)
          expect(primitive.children.length).toBe(1)
        })
        it('does attach old :object Vue children to new :object', () => {
          const { mesh: parent } = createElementMesh(nodeOps)
          const { mesh: child0 } = createElementMesh(nodeOps)
          const { mesh: child1 } = createElementMesh(nodeOps)
          const { mesh: vueGrandchild } = createElementMesh(nodeOps)
          const primitive = nodeOps.createElement('primitive', undefined, undefined, { object: child0 })
          nodeOps.insert(primitive, parent)
          nodeOps.insert(vueGrandchild, primitive)
          expect(nodeOps.parentNode(vueGrandchild)).toBe(primitive)

          nodeOps.patchProp(primitive, 'object', undefined, child1)
          expect(vueGrandchild.__tres.parent.uuid).toBe(primitive.uuid)
          expect(primitive.__tres.objects.includes(vueGrandchild)).toBe(true)
          expect(nodeOps.parentNode(vueGrandchild)).toBe(primitive)

          nodeOps.patchProp(primitive, 'object', undefined, child0)
          expect(nodeOps.parentNode(vueGrandchild)).toBe(primitive)
          expect(vueGrandchild.material).toBeDefined()
          expect(vueGrandchild.geometry).toBeDefined()
        })
        it('does not copy UUID', () => {
          const material0 = new THREE.MeshNormalMaterial()
          const material1 = new THREE.MeshNormalMaterial()
          const primitive = nodeOps.createElement('primitive', undefined, undefined, { object: material0 })
          nodeOps.patchProp(primitive, 'object', material0, material1)
          expect(material0.uuid).not.toBe(material1.uuid)

          nodeOps.patchProp(primitive, 'object', material1, material0)
          expect(material0.uuid).not.toBe(material1.uuid)
        })
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
        camera.position.fromArray = ([x, y, z]: THREE.Vector3Tuple) => result.push({ x, y, z })
        nodeOps.patchProp(camera, 'position', undefined, [0, 0, 0])
        nodeOps.patchProp(camera, 'position', undefined, [1, 2, 3])
        nodeOps.patchProp(camera, 'position', undefined, [4, 5, 6])
        expect(s(result)).toBe(s([{ x: 0, y: 0, z: 0 }, { x: 1, y: 2, z: 3 }, { x: 4, y: 5, z: 6 }]))
      })
    })
  })

  describe('parentNode', () => {
    it('returns Vue parent of a node', async () => {
      // create a nodeOps-made tree that looks like
      //                          mesh (m)
      //         mesh (m_m)                     prim (m_p)
      // mesh (m_m_m)  prim (m_m_p)     mesh (m_p_m)   prim (m_p_p)
      const { mesh: m } = createElementMesh(nodeOps)
      const { mesh: m_m } = createElementMesh(nodeOps)
      const { mesh: m_m_m } = createElementMesh(nodeOps)
      const { mesh: m_p_m } = createElementMesh(nodeOps)
      const { primitive: m_p } = createElementPrimitiveMesh(nodeOps)
      const { primitive: m_m_p } = createElementPrimitiveMesh(nodeOps)
      const { primitive: m_p_p } = createElementPrimitiveMesh(nodeOps)
      nodeOps.insert(m_m, m)
      nodeOps.insert(m_p, m)
      nodeOps.insert(m_m_m, m_m)
      nodeOps.insert(m_m_p, m_m)
      nodeOps.insert(m_p_m, m_p)
      nodeOps.insert(m_p_p, m_p)

      // NOTE: add a THREE child to the primitives, not through nodeOps.
      const m_p_c = new Mesh(new THREE.ConeGeometry(), new THREE.MeshNormalMaterial())
      m_p.add(m_p_c)
      const m_m_p_c = new Mesh(new THREE.ConeGeometry(), new THREE.MeshNormalMaterial())
      m_m_p.add(m_m_p_c)
      const m_p_p_c = new Mesh(new THREE.ConeGeometry(), new THREE.MeshNormalMaterial())
      m_p_p.add(m_p_p_c)

      // NOTE: add a THREE grandchild to a primitive, not through nodeOps.
      const m_p_p_c_c = new Mesh(new THREE.ConeGeometry(), new THREE.MeshNormalMaterial())
      m_p_p_c.add(m_p_p_c_c)

      // NOTE: Add a material that isn't allowed in THREE.
      const m_p_p_mat = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, {})
      const m_p_p_mat_mat = nodeOps.createElement('MeshNormalMaterial', undefined, undefined, {})
      nodeOps.insert(m_p_p_mat, m_p_p)
      nodeOps.insert(m_p_p_mat_mat, m_p_p_mat)

      // NOTE: Add a geometry that isn't allowed in THREE.
      const m_p_p_mat_geo = nodeOps.createElement('BoxGeometry', undefined, undefined, {})
      nodeOps.insert(m_p_p_mat_geo, m_p_p_mat)

      // NOTE: This relationship is only in THREE, not in Vue
      expect(nodeOps.parentNode(m_p_p_c_c)).not.toBe(m_p_p_c)
      // NOTE: This relationship is only in THREE, not in Vue
      expect(nodeOps.parentNode(m_p_p_c)).not.toBe(m_p_p)

      expect(nodeOps.parentNode(m_p_p)).toBe(m_p)
      expect(nodeOps.parentNode(m_p)).toBe(m)
      expect(nodeOps.parentNode(m)).toBe(null)

      expect(nodeOps.parentNode(m_p_m)).toBe(m_p)

      expect(nodeOps.parentNode(m_m_p)).toBe(m_m)
      expect(nodeOps.parentNode(m_m)).toBe(m)

      expect(nodeOps.parentNode(m_p_p_mat_mat)).toBe(m_p_p_mat)
      expect(nodeOps.parentNode(m_p_p_mat)).toBe(m_p_p)

      expect(nodeOps.parentNode(m_p_p_mat_geo)).toBe(m_p_p_mat)
    })
    it('does not return THREE parent of a node unless it is a Vue parent', () => {
      const parent: TresObject = new Scene()
      const child: TresObject = nodeOps.createElement('Mesh')!
      // NOTE: `add` creates a `THREE` parent/children relationship.
      // Since it does not add a Vue relationship, `parentNode`
      // does not and should not track it.
      parent.add(child as THREE.Object3D)
      expect(nodeOps.parentNode(child)).not.toBe(parent)

      nodeOps.insert(child, parent)
      expect(nodeOps.parentNode(child)).toBe(parent)
    })
  })

  describe('nextSibling', () => {
    it('returns null if no node is provided', () => {
      expect(nodeOps.nextSibling(undefined)).toBe(null)
      expect(nodeOps.nextSibling(null)).toBe(null)
    })
    it('returns null if child is last sibling', () => {
      const parent = nodeOps.createElement('Mesh')
      const firstChild = nodeOps.createElement('MeshNormalMaterial')
      const lastChild = nodeOps.createElement('MeshNormalMaterial')
      nodeOps.insert(firstChild, parent)
      nodeOps.insert(lastChild, parent)
      expect(nodeOps.nextSibling(lastChild)).toBe(null)
    })
    it('returns null if node is not inserted', () => {
      const node = nodeOps.createElement('MeshNormalMaterial')
      expect(nodeOps.nextSibling(node)).toBe(null)
    })
    it('returns the next Vue sibling', () => {
      const parent = nodeOps.createElement('Mesh')
      const firstChild = nodeOps.createElement('MeshNormalMaterial')
      const lastChild = nodeOps.createElement('MeshNormalMaterial')
      nodeOps.insert(firstChild, parent)
      nodeOps.insert(lastChild, parent)
      expect(nodeOps.nextSibling(firstChild)).toBe(lastChild)
    })
    it('returns the next Vue sibling, as a primitive', () => {
      const parent = nodeOps.createElement('Mesh')
      const { primitive: firstChild } = createElementPrimitiveMesh(nodeOps)
      const { primitive: lastChild } = createElementPrimitiveMesh(nodeOps)
      nodeOps.insert(firstChild, parent)
      nodeOps.insert(lastChild, parent)
      expect(parent.__tres.objects).toStrictEqual([firstChild, lastChild])
      expect(nodeOps.nextSibling(firstChild)).toBe(lastChild)
    })
    it('returns the next Vue sibling among inserted meshes, materials, geometries', () => {
      // NOTE: geometry and material are Vue siblings
      const parent = nodeOps.createElement('Mesh')

      const mat0 = nodeOps.createElement('MeshNormalMaterial')
      const mat1 = nodeOps.createElement('MeshNormalMaterial')
      const geo0 = nodeOps.createElement('BoxGeometry')
      const geo1 = nodeOps.createElement('BoxGeometry')
      const mesh0 = nodeOps.createElement('Mesh')
      const mesh1 = nodeOps.createElement('Mesh')
      const { primitive: prim0 } = createElementPrimitiveMesh(nodeOps)
      const { primitive: prim1 } = createElementPrimitiveMesh(nodeOps)

      const allSiblings = [mat0, mat1, geo0, geo1, mesh0, mesh1, prim0, prim1]
      for (const child of allSiblings) {
        nodeOps.insert(child, parent)
      }

      for (let i = 0; i < allSiblings.length; i++) {
        if (i < allSiblings.length - 1) {
          expect(nodeOps.nextSibling(allSiblings[i]).uuid).toBe(allSiblings[i + 1].uuid)
        }
        else {
          // NOTE: Last sibling
          expect(nodeOps.nextSibling(allSiblings[i])).toBe(null)
        }
      }
    })
    it('returns the next sibling from a tree of Meshes', () => {
      const NUM_LEVEL = 5
      const NUM_CHILD_PER_NODE = 3
      const rootNode = nodeOps.createElement('Mesh')
      const nodes = [rootNode]
      const nodeToNextSibling = new Map()

      createTreeIn(rootNode, (parent: TresObject, childI, levelI) => {
        if (levelI > NUM_LEVEL || childI >= NUM_CHILD_PER_NODE) {
          return false
        }
        const { mesh } = createElementMesh(nodeOps)
        nodeOps.insert(mesh, parent)
        if (childI > 0) {
          nodeToNextSibling.set(parent.__tres.objects[childI - 1], mesh)
        }
        return mesh
      })

      for (const node of nodes) {
        const nextSibling = nodeOps.nextSibling(node)
        if (nextSibling) {
          expect(nextSibling).toBe(nodeToNextSibling.get(node))
        }
        else {
          expect(nextSibling).toBeFalsy()
          expect(nodeToNextSibling.get(node)).toBeFalsy()
        }
      }
    })
  })

  describe('createText (fragment anchors)', () => {
    it('returns a text node object with __tres state', () => {
      const textNode = nodeOps.createText('')
      expect(textNode).toBeDefined()
      expect(textNode.__tres).toBeDefined()
      expect(textNode.__tres.parent).toBe(null)
      expect(textNode.__tres.objects).toEqual([])
    })

    it('creates unique text node instances', () => {
      const textNode1 = nodeOps.createText('')
      const textNode2 = nodeOps.createText('')
      expect(textNode1).not.toBe(textNode2)
    })
  })

  describe('insert with anchor (fragment support)', () => {
    it('inserts text nodes into __tres.objects', () => {
      const parent = nodeOps.createElement('Mesh')
      const textNode = nodeOps.createText('')
      nodeOps.insert(textNode, parent)
      expect(parent.__tres.objects).toContain(textNode)
      expect(textNode.__tres.parent).toBe(parent)
    })

    it('inserts child before anchor when anchor is provided', () => {
      const parent = nodeOps.createElement('Mesh')
      const child1 = nodeOps.createElement('MeshNormalMaterial')
      const child2 = nodeOps.createElement('MeshNormalMaterial')
      const anchor = nodeOps.createElement('BoxGeometry')

      nodeOps.insert(anchor, parent)
      nodeOps.insert(child1, parent, anchor)
      nodeOps.insert(child2, parent, anchor)

      // child2 was inserted before anchor, child1 was inserted before anchor (after child2)
      // Order should be: child1, child2, anchor
      expect(parent.__tres.objects[0]).toBe(child1)
      expect(parent.__tres.objects[1]).toBe(child2)
      expect(parent.__tres.objects[2]).toBe(anchor)
    })

    it('appends child when anchor is null', () => {
      const parent = nodeOps.createElement('Mesh')
      const child1 = nodeOps.createElement('MeshNormalMaterial')
      const child2 = nodeOps.createElement('BoxGeometry')

      nodeOps.insert(child1, parent, null)
      nodeOps.insert(child2, parent, null)

      expect(parent.__tres.objects).toStrictEqual([child1, child2])
    })

    it('inserts text nodes before anchor', () => {
      const parent = nodeOps.createElement('Mesh')
      const anchor = nodeOps.createText('')
      const textNode = nodeOps.createText('')
      const child = nodeOps.createElement('MeshNormalMaterial')

      nodeOps.insert(anchor, parent)
      nodeOps.insert(textNode, parent, anchor)
      nodeOps.insert(child, parent, anchor)

      expect(parent.__tres.objects[0]).toBe(textNode)
      expect(parent.__tres.objects[1]).toBe(child)
      expect(parent.__tres.objects[2]).toBe(anchor)
    })

    it('text nodes do not get added to Three.js children', () => {
      const parent = nodeOps.createElement('Mesh')
      const textNode = nodeOps.createText('')
      const mesh = nodeOps.createElement('Mesh')

      nodeOps.insert(textNode, parent)
      nodeOps.insert(mesh, parent)

      // Text node should be in __tres.objects
      expect(parent.__tres.objects).toContain(textNode)
      expect(parent.__tres.objects).toContain(mesh)

      // Only the mesh should be in Three.js children
      expect(parent.children.length).toBe(1)
      expect(parent.children[0]).toBe(mesh)
    })
  })

  describe('remove with text nodes', () => {
    it('removes text nodes from __tres.objects', () => {
      const parent = nodeOps.createElement('Mesh')
      const textNode = nodeOps.createText('')
      nodeOps.insert(textNode, parent)

      expect(parent.__tres.objects).toContain(textNode)

      nodeOps.remove(textNode)

      expect(parent.__tres.objects).not.toContain(textNode)
      expect(textNode.__tres.parent).toBe(null)
    })

    it('removes text nodes without affecting other children', () => {
      const parent = nodeOps.createElement('Mesh')
      const textNode1 = nodeOps.createText('')
      const textNode2 = nodeOps.createText('')
      const child = nodeOps.createElement('MeshNormalMaterial')

      nodeOps.insert(textNode1, parent)
      nodeOps.insert(child, parent)
      nodeOps.insert(textNode2, parent)

      nodeOps.remove(textNode1)

      expect(parent.__tres.objects).not.toContain(textNode1)
      expect(parent.__tres.objects).toContain(child)
      expect(parent.__tres.objects).toContain(textNode2)
    })
  })

  describe('parentNode with text nodes', () => {
    it('returns parent of text node', () => {
      const parent = nodeOps.createElement('Mesh')
      const textNode = nodeOps.createText('')
      nodeOps.insert(textNode, parent)

      expect(nodeOps.parentNode(textNode)).toBe(parent)
    })

    it('returns null for uninserted text node', () => {
      const textNode = nodeOps.createText('')
      expect(nodeOps.parentNode(textNode)).toBe(null)
    })
  })

  describe('nextSibling with text nodes', () => {
    it('returns next sibling after text node', () => {
      const parent = nodeOps.createElement('Mesh')
      const textNode = nodeOps.createText('')
      const child = nodeOps.createElement('MeshNormalMaterial')

      nodeOps.insert(textNode, parent)
      nodeOps.insert(child, parent)

      expect(nodeOps.nextSibling(textNode)).toBe(child)
    })

    it('returns text node as next sibling', () => {
      const parent = nodeOps.createElement('Mesh')
      const child = nodeOps.createElement('MeshNormalMaterial')
      const textNode = nodeOps.createText('')

      nodeOps.insert(child, parent)
      nodeOps.insert(textNode, parent)

      expect(nodeOps.nextSibling(child)).toBe(textNode)
    })

    it('returns null when text node is last sibling', () => {
      const parent = nodeOps.createElement('Mesh')
      const textNode = nodeOps.createText('')

      nodeOps.insert(textNode, parent)

      expect(nodeOps.nextSibling(textNode)).toBe(null)
    })

    it('handles mixed text nodes and regular children', () => {
      const parent = nodeOps.createElement('Mesh')
      const textStart = nodeOps.createText('')
      const child1 = nodeOps.createElement('MeshNormalMaterial')
      const child2 = nodeOps.createElement('BoxGeometry')
      const textEnd = nodeOps.createText('')

      // Simulate fragment structure: startAnchor, children, endAnchor
      nodeOps.insert(textStart, parent)
      nodeOps.insert(child1, parent)
      nodeOps.insert(child2, parent)
      nodeOps.insert(textEnd, parent)

      expect(nodeOps.nextSibling(textStart)).toBe(child1)
      expect(nodeOps.nextSibling(child1)).toBe(child2)
      expect(nodeOps.nextSibling(child2)).toBe(textEnd)
      expect(nodeOps.nextSibling(textEnd)).toBe(null)
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
    camera: {
      registerCamera: () => {},
      deregisterCamera: () => {},
    },
  } as unknown as TresContext
}

function createThreeBox() {
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshNormalMaterial()
  const mesh = new THREE.Mesh(geometry, material)
  return { mesh, geometry, material }
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
  const { mesh, geometry, material } = createThreeBox()
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

function createSimpleMeshPrimitiveTree(nodeOps) {
  // returns a nodeOps-made tree that looks like
  //                          mesh (m)
  //         mesh (m_m)                     prim (m_p)
  // mesh (m_m_m)  prim (m_m_p)     mesh (m_p_m)   prim (m_p_p)
  //                                             THREE child (m_p_p_c)
  // --------
  // also returns a "disposalSpy" for each material and geometry
  const { mesh: m } = createElementMesh(nodeOps)
  const { mesh: m_m } = createElementMesh(nodeOps)
  const { mesh: m_m_m } = createElementMesh(nodeOps)
  const { mesh: m_p_m } = createElementMesh(nodeOps)
  const { primitive: m_p } = createElementPrimitiveMesh(nodeOps)
  const { primitive: m_m_p } = createElementPrimitiveMesh(nodeOps)
  const { primitive: m_p_p } = createElementPrimitiveMesh(nodeOps)
  nodeOps.insert(m_m, m)
  nodeOps.insert(m_p, m)
  nodeOps.insert(m_m_m, m_m)
  nodeOps.insert(m_m_p, m_m)
  nodeOps.insert(m_p_m, m_p)
  nodeOps.insert(m_p_p, m_p)

  // NOTE: add a THREE child to the primitives.
  const m_p_c = new Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial())
  m_p.add(m_p_c)
  const m_m_p_c = new Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial())
  m_m_p.add(m_m_p_c)
  const m_p_p_c = new Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial())
  m_p_p.add(m_p_p_c)

  // NOTE: add a THREE grandchild to a primitive.
  const m_p_p_c_c = new Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial())
  m_p_p_c.add(m_p_p_c_c)

  const nodesByKey = { m, m_m, m_m_m, m_m_p, m_p, m_p_c, m_p_m, m_p_p, m_m_p_c, m_p_p_c, m_p_p_c_c }
  const nodes = []
  const objects = []
  const spiesByKey: Partial<Record<
    keyof typeof nodesByKey,
    { material: () => void, geometry: () => void }
  >> = { }
  const spies = []
  const undisposed = new Set()
  for (const [key, node] of Object.entries(nodesByKey)) {
    const geometry = vi.spyOn(node.geometry, 'dispose')
    const material = vi.spyOn(node.material, 'dispose')
    objects.push(node.geometry, node.material)
    spiesByKey[key] = { geometry, material }
    spies.push(geometry)
    spies.push(material)
    nodes.push(node)
    undisposed.add(node)
    undisposed.add(node.geometry)
    undisposed.add(node.material)
  }
  const result = Object.assign({ spiesByKey }, { spies }, { nodes }, nodesByKey, { nodesByKey }, { objects })
  return result
}
