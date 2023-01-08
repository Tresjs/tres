import { Object3D } from 'three'

export interface TresObject extends Object3D {
  geometry: THREE.BufferGeometry
  material: THREE.Material
}
