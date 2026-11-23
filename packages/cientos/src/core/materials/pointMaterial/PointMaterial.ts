import { PointsMaterial as PointsMaterialImpl } from 'three'
import type { PointsMaterialParameters } from 'three'

// NOTE: Source
// https://github.com/pmndrs/drei/blob/master/src/core/PointMaterial.tsx

export class PointMaterial extends PointsMaterialImpl {
  constructor(props: PointsMaterialParameters) {
    super(props)
    this.onBeforeCompile = (shader, renderer) => {
      const { isWebGL2 } = renderer.capabilities
      // Unlike drei, do not add tonemapping/colorspace includes: the points shader runs them after opaque_fragment.
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <opaque_fragment>',
        `
        ${isWebGL2 ? '' : '#extension GL_OES_standard_derivatives : enable\n'}#include <opaque_fragment>
      vec2 cxy = 2.0 * gl_PointCoord - 1.0;
      float r = dot(cxy, cxy);
      float delta = fwidth(r);
      float mask = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
      gl_FragColor = vec4(gl_FragColor.rgb, mask * gl_FragColor.a );
      `,
      )
    }
  }
}
