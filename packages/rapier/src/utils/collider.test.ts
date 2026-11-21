import { BoxGeometry, Group, Mesh } from 'three'
import { describe, expect, it } from 'vitest'
import type { TresObject3D } from '@tresjs/core'
import { getColliderSizingsFromObject } from './collider'

const sizingsOf = (object: Group | Mesh) => getColliderSizingsFromObject(object as unknown as TresObject3D)

describe('getColliderSizingsFromObject', () => {
  it('finds the centre of a mesh whose origin sits at its base', () => {
    const mesh = new Mesh(new BoxGeometry(2, 4, 2).translate(0, 2, 0))

    const { halfWidth, halfHeight, halfDepth, center } = sizingsOf(mesh)

    expect([halfWidth, halfHeight, halfDepth]).toEqual([1, 2, 1])
    expect(center.toArray()).toEqual([0, 2, 0])
  })

  it('does not stretch the box to reach an origin outside the geometry', () => {
    const mesh = new Mesh(new BoxGeometry(32, 1, 32).translate(16, 3.5, -16))

    const { halfWidth, halfHeight, halfDepth, center } = sizingsOf(mesh)

    expect([halfWidth, halfHeight, halfDepth]).toEqual([16, 0.5, 16])
    expect(center.toArray()).toEqual([16, 3.5, -16])
  })

  it('measures a group in its own space, leaving its transform to the collider', () => {
    const group = new Group()
    group.position.set(5, 5, 5)
    group.scale.setScalar(2)
    const mesh = new Mesh(new BoxGeometry(1, 1, 1))
    mesh.position.set(0, 2, 0)
    group.add(mesh)

    const { halfWidth, halfHeight, halfDepth, center } = sizingsOf(group)

    expect([halfWidth, halfHeight, halfDepth]).toEqual([0.5, 0.5, 0.5])
    expect(center.toArray()).toEqual([0, 2, 0])
  })
})
