import { Uniform, Vector2 } from 'three'
import { BlendFunction, Effect } from 'postprocessing'

/**
 * LinocutEffect - A custom effect for applying a linocut shader effect.
 */

export class LinocutEffect extends Effect {
  /**
   * Creates a new LinocutEffect instance.
   *
   * @param {LinocutPmndrsProps} [options] - Configuration options for the effect.
   *
   */
  constructor({ blendFunction = BlendFunction.NORMAL, scale = 0.85, noiseScale = 0.0, center = [0.5, 0.5], rotation = 0.0 } = {}) {
    const centerVec = Array.isArray(center) ? new Vector2().fromArray(center) : center

    super('LinocutEffect', `
    uniform float scale;
    uniform float noiseScale;
    uniform vec2 center;
    uniform float rotation;

    float luma(vec3 color) {
      return dot(color, vec3(0.299, 0.587, 0.114));
    }

    float luma(vec4 color) {
      return dot(color.rgb, vec3(0.299, 0.587, 0.114));
    }

    // Simple pseudo-random noise function
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
      // Calculate the center based on center
      vec2 fragCoord = uv * resolution.xy;

      // Apply rotation to the coordinates
      vec2 d = fragCoord - center * resolution.xy;
      mat2 rotMat = mat2(cos(rotation), -sin(rotation), sin(rotation), cos(rotation));
      vec2 rotatedD = d * rotMat;

      // Calculate radial distance and angle
      float r = length(rotatedD) / (1000.0 / max(scale, 0.01)); // Normalization to avoid artifacts
      float a = atan(rotatedD.y, rotatedD.x) + scale * (0.5 - r) / 0.5;

      // Calculate transformed coordinates
      vec2 uvt = center * resolution.xy + r * vec2(cos(a), sin(a));

      // Normalize UV coordinates
      vec2 uv2 = fragCoord / resolution.xy;

      // Generate sinusoidal line patterns
      float c = (0.75 + 0.25 * sin(uvt.x * 1000.0 * max(scale, 0.01))); // Prevent excessive distortions

      // Load the texture and convert to grayscale
      vec4 color = texture(inputBuffer, uv2);
      color.rgb = color.rgb * color.rgb; // Convert from sRGB to linear
      float l = luma(color);

      // Add noise based on noiseScale
      float n = noise(uv2 * 10.0); // Generate noise
      l += noiseScale * (n - 0.5); // Apply noise as a perturbation

      // Apply smoothing to achieve the linocut effect
      float f = smoothstep(0.5 * c, c, l);
      f = smoothstep(0.0, 0.5, f);

      // Convert the final value back to sRGB
      f = sqrt(f);

      // Output the final color in black and white
      outputColor = vec4(vec3(f), 1.0);
    }
    `, {
      blendFunction,
      uniforms: new Map<string, Uniform<any>>([
        ['scale', new Uniform(scale)],
        ['noiseScale', new Uniform(noiseScale)],
        ['center', new Uniform(centerVec)],
        ['rotation', new Uniform(rotation)],
      ]),
    })
  }

  get scale() {
    return this.uniforms.get('scale')?.value
  }

  set scale(value) {
    this.uniforms.get('scale')!.value = value
  }

  get noiseScale() {
    return this.uniforms.get('noiseScale')?.value
  }

  set noiseScale(value) {
    this.uniforms.get('noiseScale')!.value = value
  }

  get center() {
    return this.uniforms.get('center')?.value
  }

  set center(value) {
    this.uniforms.get('center')!.value = Array.isArray(value) ? new Vector2().fromArray(value) : value
  }

  get rotation() {
    return this.uniforms.get('rotation')?.value
  }

  set rotation(value) {
    this.uniforms.get('rotation')!.value = value
  }
}
