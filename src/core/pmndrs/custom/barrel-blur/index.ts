import { Uniform, Vector2 } from 'three'
import { BlendFunction, Effect } from 'postprocessing'

/**
 * BarrelBlurEffect - A custom effect for applying a barrel distortion
 * with chromatic aberration blur.
 */

export class BarrelBlurEffect extends Effect {
  /**
   * Creates a new BarrelBlurEffect instance.
   *
   * @param {object} [options] - Configuration options for the effect.
   * @param {BlendFunction} [options.blendFunction] - Blend mode.
   * @param {number} [options.amount] - Intensity of the barrel distortion (0 to 1).
   * @param {Vector2} [options.offset] - Offset of the barrel distortion center (0 to 1 for both x and y). This allows you to change the position of the distortion effect.
   *
   */
  constructor({ blendFunction = BlendFunction.NORMAL, amount = 0.15, offset = new Vector2(0.5, 0.5) } = {}) {
    super('BarrelBlurEffect', `
    uniform float amount;
    uniform vec2 offset;

    #define NUM_ITER 16
    #define RECIP_NUM_ITER 0.0625
    #define GAMMA 1.0

    vec3 spectrum_offset(float t) {
        float lo = step(t, 0.5);
        float hi = 1.0 - lo;
        float w = 1.0 - abs(2.0 * t - 1.0);
        return pow(vec3(lo, 1.0, hi) * vec3(1.0 - w, w, 1.0 - w), vec3(1.0 / GAMMA));
    }

    vec2 barrelDistortion(vec2 p, float amt) {
        p = p - offset;
        float theta = atan(p.y, p.x);
        float radius = pow(length(p), 1.0 + 3.0 * amt);
        return vec2(cos(theta), sin(theta)) * radius + offset;
    }

    void mainUv(inout vec2 uv) {
        uv = barrelDistortion(uv, amount * 0.5);
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec3 sumcol = vec3(0.0);
        vec3 sumw = vec3(0.0);

        for (int i = 0; i < NUM_ITER; ++i) {
            float t = float(i) * RECIP_NUM_ITER;
            vec3 w = spectrum_offset(t);
            vec2 distortedUV = barrelDistortion(uv, amount * t);
            sumcol += w * texture(inputBuffer, distortedUV).rgb;
            sumw += w;
        }

        vec3 outcol = pow(sumcol / sumw, vec3(1.0 / GAMMA));

        outcol = clamp(outcol, 0.0, 1.0); // Ensures normalized color values

        outputColor = vec4(outcol, inputColor.a); // Preserves original alpha
    }
      `, {
      blendFunction,
      uniforms: new Map<string, Uniform<number | Vector2>>([
        ['amount', new Uniform(amount)], // Uniform controlling the intensity of distortion
        ['offset', new Uniform(offset)], // Uniform controlling the offset of distortion
      ]),
    })
  }

  /**
   * The amount.
   *
   * @type {number}
   */

  get amount() {
    return this.uniforms.get('amount')?.value
  }

  set amount(value) {
    this.uniforms.get('amount')!.value = value
  }

  /**
   * The offset.
   *
   * @type {Vector2}
   */

  get offset() {
    return this.uniforms.get('offset')?.value
  }

  set offset(value) {
    this.uniforms.get('offset')!.value = value
  }
}
