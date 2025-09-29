import { Mesh, Object3D, Scene } from 'three'

class EnvironmentScene extends Object3D {
  virtualScene = null as unknown as Scene
  constructor() {
    super()
    this.virtualScene = new Scene()
  }

  // @ts-expect-error - No idea how to fix the type error here
  add(...object: Object3D[]): this {
    for (const obj of object) {
      this.virtualScene.add(obj)
    }
    return this
  }

  dispose() {
    this.virtualScene.traverse((object) => {
      if (object instanceof Mesh) {
        object.geometry.dispose()
        object.material.dispose()
        if (object.material.map) { object.material.map.dispose() }
        this.virtualScene.remove(object)
      }
    })
    this.virtualScene = null as unknown as Scene
  }
}

export default EnvironmentScene
