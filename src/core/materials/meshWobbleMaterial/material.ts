import type { MeshStandardMaterialParameters } from 'three'
import { MeshStandardMaterial } from 'three'

// Borrowed from @pmdrs drei implementation https://github.com/pmndrs/drei/blob/master/src/core/MeshWobbleMaterial.tsx
interface Uniform<T> {
  value: T
}

export class WobbleMaterialImpl extends MeshStandardMaterial {
  _time: Uniform<number>
  _factor: Uniform<number>

  constructor(parameters: MeshStandardMaterialParameters = {}) {
    super(parameters)
    this.setValues(parameters)
    this._time = { value: 0 }
    this._factor = { value: 1 }
  }

  onBeforeCompile(shader: { uniforms: { time?: Uniform<number>, factor?: Uniform<number> }, vertexShader: string }) {
    if (!shader.uniforms) { shader.uniforms = {} }
    shader.uniforms.time = this._time
    shader.uniforms.factor = this._factor

    shader.vertexShader = `
        uniform float time;
        uniform float factor;
        ${shader.vertexShader}
      `
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `float theta = sin( time + position.y ) / 2.0 * factor;
          float c = cos( theta );
          float s = sin( theta );
          mat3 m = mat3( c, 0, s, 0, 1, 0, -s, 0, c );
          vec3 transformed = vec3( position ) * m;
          vNormal = vNormal * m;`,
    )
  }

  get time() {
    return this._time.value
  }

  set time(v) {
    this._time.value = v
  }

  get factor() {
    return this._factor.value
  }

  set factor(v) {
    this._factor.value = v
  }
}
