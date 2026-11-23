import { BoxGeometry, CapsuleGeometry, Mesh } from 'three'
import { describe, expect, it } from 'vitest'
import type { TresObject3D } from '@tresjs/core'
import { createRigidBodyAutoColliderArgs } from './rigid-body'

function argsFor(mesh: Mesh, shape: 'capsule' | 'cylinder' | 'trimesh') {
  return createRigidBodyAutoColliderArgs({
    rigidBody: {} as any,
    shape,
    object: mesh as unknown as TresObject3D,
  })
}

describe('createRigidBodyAutoColliderArgs', () => {
  it('measures a capsule across its cylindrical section, not the whole mesh', () => {
    // 0.4 radius, 1.2 cylinder: 2 m tall overall, of which the two caps are 0.8.
    const mesh = new Mesh(new CapsuleGeometry(0.4, 1.2))

    const [halfHeight, radius] = argsFor(mesh, 'capsule')

    expect(radius).toBeCloseTo(0.4, 5)
    expect(halfHeight).toBeCloseTo(0.6, 5)
    // The collider rapier builds from these is the height the mesh actually has.
    expect(halfHeight * 2 + radius * 2).toBeCloseTo(2, 5)
  })

  it('clamps rather than going negative when the caps are taller than the mesh', () => {
    const [halfHeight] = argsFor(new Mesh(new CapsuleGeometry(1, 0)), 'capsule')

    expect(halfHeight).toBeGreaterThanOrEqual(0)
  })

  it('leaves a cylinder alone, which has no caps to subtract', () => {
    const [halfHeight, radius] = argsFor(new Mesh(new BoxGeometry(2, 4, 2)), 'cylinder')

    expect(halfHeight).toBeCloseTo(2, 5)
    expect(radius).toBeCloseTo(1, 5)
  })

  it('hands a trimesh the Uint32Array rapier demands, whatever three indexed with', () => {
    // Under 65536 vertices, so three indexes it as a Uint16Array.
    const mesh = new Mesh(new BoxGeometry(1, 1, 1))
    expect(mesh.geometry.index?.array).toBeInstanceOf(Uint16Array)

    const [positions, indices] = argsFor(mesh, 'trimesh')

    expect(positions).toBeInstanceOf(Float32Array)
    expect(indices).toBeInstanceOf(Uint32Array)
  })
})
