import type { Material, Mesh, Object3D } from 'three'

export interface TresObjectMap {
  nodes: { [name: string]: Object3D }
  materials: { [name: string]: Material }
  meshes: { [name: string]: Mesh }
}

export function buildGraph(object: Object3D): TresObjectMap {
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
