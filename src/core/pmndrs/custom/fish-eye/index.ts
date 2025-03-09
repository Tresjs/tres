import { Uniform, Vector2 } from 'three'
import { BlendFunction, Effect } from 'postprocessing'

/**
 * FishEyeEffect - A custom effect for applying a fish-eye distortion
 */

export class FishEyeEffect extends Effect {
  /**
   * Creates a new FishEyeEffect instance.
   *
   * @param {object} [options] - Configuration options for the effect.
   * @param {BlendFunction} [options.blendFunction] - Blend mode.
   * @param {Vector2} [options.lensS] - Lens scale.
   * @param {Vector2} [options.lensF] - Lens factor.
   * @param {number} [options.scale] - Scale.
   *
   */
  constructor({ blendFunction = BlendFunction.NORMAL, lensS = new Vector2(1.0, 1.0), lensF = new Vector2(0.0, 1.0), scale = 1.0 } = {}) {
    super('FishEyeEffect', `
      uniform vec2 lensS;
      uniform vec2 lensF;
      uniform float scale;

      void mainUv(inout vec2 uv) {
          vec2 newUv = uv * 2.0 - 1.0;
          newUv.x = newUv.x + ((pow(newUv.y, 2.0) / scale) * newUv.x / scale) * -lensF.x;
          newUv.y = newUv.y + ((pow(newUv.x, 2.0) / scale) * newUv.y / scale) * -lensF.y;
          newUv = newUv * lensS;
          newUv = newUv / scale * 0.5 + 0.5;

          uv = newUv;
      }

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
          outputColor = vec4(inputColor.rgb, inputColor.a); // Preserves original alpha
      }
      `, {
      blendFunction,
      uniforms: new Map<string, Uniform<number | Vector2>>([
        ['lensS', new Uniform(lensS)],
        ['lensF', new Uniform(lensF)],
        ['scale', new Uniform(scale)],
      ]),
    })
  }

  /**
   * The lensS.
   *
   * @type {Vector2}
   */
  get lensS() {
    return this.uniforms.get('lensS')?.value
  }

  set lensS(value) {
    this.uniforms.get('lensS')!.value = value
  }

  /**
   * The lensF.
   *
   * @type {Vector2}
   */
  get lensF() {
    return this.uniforms.get('lensF')?.value
  }

  set lensF(value) {
    this.uniforms.get('lensF')!.value = value
  }

  /**
   * The scale.
   *
   * @type {number}
   */
  get scale() {
    return this.uniforms.get('scale')?.value
  }

  set scale(value) {
    this.uniforms.get('scale')!.value = value
  }
}
