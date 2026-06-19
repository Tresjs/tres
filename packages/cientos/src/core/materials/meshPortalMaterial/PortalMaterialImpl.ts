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
        blend: { value: 0 },
        resolution: { value: new Vector2() },
      },
      vertexShader: /* glsl */`
        varying vec2 vUv;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vUv = uv;
        }
      `,
      fragmentShader: /* glsl */`
        uniform sampler2D map;
        uniform float blend;
        uniform vec2 resolution;
        // vUv + packing reserved for upcoming blur/SDF edge-fade
        varying vec2 vUv;
        #include <packing>
        void main() {
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

  get blend(): number { return this.uniforms.blend.value }
  set blend(v: number) { this.uniforms.blend.value = v }
}
