import type { Mesh, Object3D, Scene } from 'three'
import type { TresMaterial, TresObject } from '../types'

export interface TresObjectMap {
  nodes: { [name: string]: TresObject }
  materials: { [name: string]: TresMaterial }
  meshes: { [name: string]: Mesh }
  scene?: Scene
}

export function buildGraph(object: TresObject | Object3D): TresObjectMap {
  const data: TresObjectMap = { nodes: {}, materials: {}, meshes: {} }
  if (object) {
    object.traverse((obj: any) => {
      if (obj.name) { data.nodes[obj.name] = obj }
      if (obj.material && !data.materials[obj.material.name]) { data.materials[obj.material.name] = obj.material }
      if (obj.isMesh && !data.meshes[obj.name]) { data.meshes[obj.name] = obj }
    })
  }
  return data
}
