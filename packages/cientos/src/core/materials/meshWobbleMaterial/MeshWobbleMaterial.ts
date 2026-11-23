import { MeshStandardMaterial } from 'three'
import type { MeshStandardMaterialParameters } from 'three'
import type { MeshWobbleMaterialUniforms } from './props'
import { meshWobbleMaterialDefaults } from './props'

// Borrowed from @pmdrs drei implementation https://github.com/pmndrs/drei/blob/master/src/core/MeshWobbleMaterial.tsx
interface Uniform<T> {
  value: T
}

export class MeshWobbleMaterial extends MeshStandardMaterial implements MeshWobbleMaterialUniforms {
  _time: Uniform<number>
  _factor: Uniform<number>

  constructor(parameters?: MeshStandardMaterialParameters & Partial<MeshWobbleMaterialUniforms>) {
    // `setValues` runs after the uniforms exist, so `factor` can be a parameter.
    super()
    this._time = { value: 0 }
    this._factor = { value: meshWobbleMaterialDefaults.factor }
    this.setValues(parameters)
  }

  // `MeshStandardMaterial.copy` does not know these uniforms, so a clone would reset `factor`.
  override copy(source: MeshWobbleMaterial) {
    super.copy(source)
    this.time = source.time
    this.factor = source.factor
    return this
  }

  // MeshWobbleNodeMaterial.ts ports this shader to TSL. A fix here must go there too.
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
