import type { Mesh, Scene } from 'three'
import type { TresMaterial, TresObject } from '@tresjs/core'

export interface TresObjectMap {
  nodes: { [name: string]: TresObject }
  materials: { [name: string]: TresMaterial }
  meshes: { [name: string]: Mesh }
  scene?: Scene
}
