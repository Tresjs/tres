import { PlaneGeometry, Vector3 } from 'three'
import type { HeightSampler } from './heightmap'
import { HEIGHTFIELD_ROWS, TERRAIN_SIZE } from './constants'

const tmpNormal = new Vector3()

// the visible surface, displaced on the CPU against the same sampler the collider is built
// from — one segment per heightfield cell, so the ground you see is the ground you walk on.
// `displacementMap` would do the same on the GPU, but it moves vertices without touching the
// normal attribute: every hill then lights as if it were flat, and the only shading left is
// the detail normal map. Sampling normalAt per vertex is what makes the large forms read as
// geometry instead of as a painted texture.
export function buildTerrainGeometry(sampler: HeightSampler) {
  const geometry = new PlaneGeometry(TERRAIN_SIZE, TERRAIN_SIZE, HEIGHTFIELD_ROWS, HEIGHTFIELD_ROWS)
  // bake the lie-flat rotation in, so from here on the vertices are already world-oriented
  // and x/z can go straight to the sampler
  geometry.rotateX(-Math.PI / 2)

  const position = geometry.getAttribute('position')
  const normal = geometry.getAttribute('normal')

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i)
    const z = position.getZ(i)
    position.setY(i, sampler.heightAt(x, z))

    const n = sampler.normalAt(x, z, tmpNormal)
    normal.setXYZ(i, n.x, n.y, n.z)
  }

  position.needsUpdate = true
  normal.needsUpdate = true
  geometry.computeBoundingSphere()
  geometry.computeBoundingBox()

  return geometry
}
