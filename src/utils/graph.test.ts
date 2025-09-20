import { describe, expect, it } from 'vitest'
import { buildGraph } from './graph'
import { Mesh, MeshBasicMaterial, Object3D } from 'three'

describe('buildGraph', () => {
  it('should return empty maps for null object', () => {
    const result = buildGraph(null as unknown as Object3D)
    expect(result).toEqual({
      nodes: {},
      materials: {},
      meshes: {},
    })
  })

  it('should build graph for a simple object hierarchy', () => {
    // Create test objects
    const parent = new Object3D()
    parent.name = 'parent'

    const child = new Object3D()
    child.name = 'child'
    parent.add(child)

    const material = new MeshBasicMaterial()
    material.name = 'testMaterial'

    const mesh = new Mesh(undefined, material)
    mesh.name = 'testMesh'
    parent.add(mesh)

    const result = buildGraph(parent)

    // Test nodes
    expect(result.nodes).toEqual({
      parent,
      child,
      testMesh: mesh,
    })

    // Test materials
    expect(result.materials).toEqual({
      testMaterial: material,
    })

    // Test meshes
    expect(result.meshes).toEqual({
      testMesh: mesh,
    })
  })

  it('should handle duplicate material names', () => {
    const parent = new Object3D()
    const material1 = new MeshBasicMaterial()
    material1.name = 'duplicate'
    const material2 = new MeshBasicMaterial()
    material2.name = 'duplicate'

    const mesh1 = new Mesh(undefined, material1)
    const mesh2 = new Mesh(undefined, material2)
    parent.add(mesh1)
    parent.add(mesh2)

    const result = buildGraph(parent)

    // Should only keep the first material with the name
    expect(Object.keys(result.materials)).toHaveLength(1)
    expect(result.materials.duplicate).toBe(material1)
  })

  it('should handle duplicate mesh names', () => {
    const parent = new Object3D()
    const mesh1 = new Mesh()
    mesh1.name = 'duplicate'
    const mesh2 = new Mesh()
    mesh2.name = 'duplicate'
    parent.add(mesh1)
    parent.add(mesh2)

    const result = buildGraph(parent)

    // Should only keep the first mesh with the name
    expect(Object.keys(result.meshes)).toHaveLength(1)
    expect(result.meshes.duplicate).toBe(mesh1)
  })

  it('should handle objects without names', () => {
    const parent = new Object3D()
    const unnamed = new Object3D()
    parent.add(unnamed)

    const result = buildGraph(parent)

    // Unnamed objects should not appear in nodes
    expect(Object.keys(result.nodes)).toHaveLength(0)
  })
})
