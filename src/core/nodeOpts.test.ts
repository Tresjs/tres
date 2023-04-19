import * as THREE from 'three'
import { nodeOps } from './nodeOps'
import { TresObject } from '../types'
import { extend } from './catalogue'
import { Mesh, Scene } from 'three'

describe('nodeOps', () => {
  beforeAll(() => {
    // Setup
    extend(THREE)
  })
  it('createElement should create an instance with given tag', async () => {
    // Setup
    const tag = 'TresMesh'
    const props = { args: [] }

    // Test
    const instance = nodeOps.createElement(tag, false, null, props)

    // Assert
    expect(instance.isObject3D).toBeTruthy()
    expect(instance).toBeInstanceOf(Mesh)
  })

  it('createElement should create an instance with given tag and props', async () => {
    // Setup
    const tag = 'TresTorusGeometry'
    const props = { args: [10, 3, 16, 100] }

    // Test
    const instance = nodeOps.createElement(tag, false, null, props)

    // Assert
    expect(instance.parameters.radius).toBe(10)
    expect(instance.parameters.tube).toBe(3)
    expect(instance.parameters.radialSegments).toBe(16)
    expect(instance.parameters.tubularSegments).toBe(100)
  })

  it.skip('createElement should create an camera instance', async () => {
    // Setup
    const tag = 'TresPerspectiveCamera'
    const props = { args: [75, 2, 0.1, 5] }

    // Test
    const instance = nodeOps.createElement(tag, false, null, props)

    // Assert
    expect(instance.isCamera).toBeTruthy()
    expect(instance).toBeInstanceOf(THREE.PerspectiveCamera)
  })

  it.skip('createElement should log a warning if the camera doesnt have a position', async () => {
    // Setup
    const tag = 'TresPerspectiveCamera'
    const props = { args: [75, 2, 0.1, 5] }

    // Spy
    const consoleWarnSpy = vi.spyOn(console, 'warn')
    consoleWarnSpy.mockImplementation(() => {})

    // Test
    const instance = nodeOps.createElement(tag, false, null, props)

    // Assert
    expect(instance.isCamera).toBeTruthy()
    expect(instance).toBeInstanceOf(THREE.PerspectiveCamera)
    expect(consoleWarnSpy).toHaveBeenCalled()
  })

  it('createElement should add attach material property if instance is a material', () => {
    // Setup
    const tag = 'TresMeshStandardMaterial'
    const props = { args: [] }

    // Test
    const instance = nodeOps.createElement(tag, false, null, props)

    // Assert
    expect(instance.isMaterial).toBeTruthy()
    expect(instance.attach).toBe('material')
  })

  it('createElement should add attach geometry property if instance is a geometry', () => {
    // Setup
    const tag = 'TresTorusGeometry'
    const props = { args: [] }

    // Test
    const instance = nodeOps.createElement(tag, false, null, props)

    // Assert
    expect(instance.isBufferGeometry).toBeTruthy()
    expect(instance.attach).toBe('geometry')
  })

  it('insert should insert child into parent', async () => {
    // Setup
    const parent: TresObject = new Scene()
    const child: TresObject = new Mesh()

    // Fake vnodes
    child.__vnode = {
      type: 'TresMesh',
    }

    // Test
    nodeOps.insert(child, parent, null)

    // Assert
    expect(parent.children.includes(child)).toBeTruthy()
  })

  it('remove: removes child from parent', async () => {
    // Setup
    const parent = new Scene() as unknown as TresObject
    const child = new Mesh() as unknown as TresObject

    // Fake vnodes
    child.__vnode = {
      type: 'TresMesh',
    }
    nodeOps.insert(child, parent)

    // Test
    nodeOps.remove(child)

    // Assert
    expect(!parent.children.includes(child)).toBeTruthy()
  })

  it('patchProp should patch property of node', async () => {
    // Setup
    const node: TresObject = new Mesh()
    const prop = 'visible'
    const nextValue = false

    // Test
    nodeOps.patchProp(node, prop, null, nextValue)

    // Assert
    expect(node.visible === nextValue)
  })

  it('patchProp should patch traverse pierced props', async () => {
    // Setup
    const node: TresObject = new Mesh()
    const prop = 'position-x'
    const nextValue = 5

    // Test
    nodeOps.patchProp(node, prop, null, nextValue)

    // Assert
    expect(node.position.x === nextValue)
  })

  it('patchProp it should not patch traverse pierced props of existing dashed properties', async () => {
    // Setup
    const node: TresObject = new Mesh()
    const prop = 'cast-shadow'
    const nextValue = true

    // Test
    nodeOps.patchProp(node, prop, null, nextValue)

    // Assert
    expect(node.castShadow === nextValue)
  })

  it('parentNode: returns parent of a node', async () => {
    // Setup
    const parent: TresObject = new Scene()
    const child: TresObject = new Mesh()
    parent.children.push(child)
    child.parent = parent

    // Test
    const parentNode = nodeOps.parentNode(child)

    // Assert
    expect(parentNode === parent)
  })
})
