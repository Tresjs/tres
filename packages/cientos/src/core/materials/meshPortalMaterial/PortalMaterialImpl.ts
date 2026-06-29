import { ShaderMaterial, Vector2 } from 'three'
import type { Texture } from 'three'

/**
 * Window-pass material for MeshPortalMaterial.
 * Samples the portal FBO in screen space so the mesh becomes a perspective-correct
 * cutout window into the portal scene. Empty portal areas (alpha 0) show the world.
 * Ported from drei's PortalMaterialImpl (blur/sdf deferred).
 */
export class PortalMaterialImpl extends ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      uniforms: {
        map: { value: null },
        resolution: { value: new Vector2() },
      },
      vertexShader: /* glsl */`
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */`
        uniform sampler2D map;
        uniform vec2 resolution;
        void main() {
          // Sample the portal FBO in screen space so the mesh reads as a window.
          vec2 uv = gl_FragCoord.xy / resolution.xy;
          vec4 t = texture2D(map, uv);
          gl_FragColor = vec4(t.rgb, t.a);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
    })
  }

  get map(): Texture | null { return this.uniforms.map.value }
  set map(v: Texture | null) { this.uniforms.map.value = v }
}
