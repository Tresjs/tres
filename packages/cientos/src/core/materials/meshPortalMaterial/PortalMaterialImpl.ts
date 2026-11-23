import { Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2 } from 'three'
import type { Texture, WebGLRenderer } from 'three'
import type { PortalBlendPass } from './props'

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

  get resolution(): Vector2 { return this.uniforms.resolution.value }
}

export function createPortalBlendPass(portal: Texture, root: Texture): PortalBlendPass {
  const scene = new Scene()
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const material = new ShaderMaterial({
    uniforms: {
      a: { value: portal },
      b: { value: root },
      blend: { value: 0 },
    },
    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
    `,
    fragmentShader: /* glsl */`
      uniform sampler2D a;
      uniform sampler2D b;
      uniform float blend;
      varying vec2 vUv;
      void main() {
        gl_FragColor = mix(texture2D(b, vUv), texture2D(a, vUv), blend);
        // The buffers hold linear colors, and this quad draws on the canvas.
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  })
  const geometry = new PlaneGeometry(2, 2)
  scene.add(new Mesh(geometry, material))

  return {
    blend: material.uniforms.blend,
    render: renderer => (renderer as WebGLRenderer).render(scene, camera),
    dispose: () => {
      geometry.dispose()
      material.dispose()
    },
  }
}
