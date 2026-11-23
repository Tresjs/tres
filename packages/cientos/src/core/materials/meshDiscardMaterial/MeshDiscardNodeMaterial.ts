import { NodeMaterial } from 'three/webgpu'
import { Discard, Fn, vec4 } from 'three/tsl'

export class MeshDiscardNodeMaterial extends NodeMaterial {
  constructor() {
    super()

    this.fog = false
    // Every vertex lands on the same clip-space point, so no triangle covers a pixel.
    this.vertexNode = vec4(0)
    this.fragmentNode = Fn(() => {
      Discard()
      return vec4(0)
    })()
    // Shadow passes ignore `vertexNode` and `fragmentNode`, so the mesh still casts shadows as in
    // WebGL. A `positionNode`, `colorNode` or `maskNode` here would change the shadow.
  }
}
