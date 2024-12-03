import { ShaderMaterial } from 'three'

export class MeshDiscardMaterial extends ShaderMaterial {
  constructor() {
    super()
    this.vertexShader = 'void main() { }'
    this.fragmentShader = 'void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;}'
  }
}
