import type { Intersection, Raycaster } from 'three'
import { Color, Mesh, Object3D } from 'three'
import type { InstancesApi } from './const'

const scratchMesh = new Mesh()
const scratchIntersects: Intersection[] = []

/**
 * Geometry-less placeholder standing in for a single instance of an `InstancedMesh`.
 *
 * It renders nothing (`Object3D` never enters the render list) but borrows its batch's
 * geometry and material while raycasting, so pointer events resolve to this node instead
 * of the whole batch.
 */
export class PositionMesh extends Object3D {
  color = new Color('white')
  batch: InstancesApi | null = null

  raycast(raycaster: Raycaster, intersects: Intersection[]) {
    const mesh = this.batch?.mesh.value
    if (!mesh?.geometry || !mesh.material) { return }

    scratchMesh.geometry = mesh.geometry
    scratchMesh.material = mesh.material
    scratchMesh.matrixWorld.copy(this.matrixWorld)

    scratchIntersects.length = 0
    scratchMesh.raycast(raycaster, scratchIntersects)

    for (const hit of scratchIntersects) {
      intersects.push({ ...hit, object: this })
    }
    scratchIntersects.length = 0
  }
}
