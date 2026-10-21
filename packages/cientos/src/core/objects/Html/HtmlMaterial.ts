import { DoubleSide, ShaderMaterial } from 'three'
import type { HtmlMaterialUniforms } from './props'
import fragmentShader from './shaders/fragment.glsl'
import passthroughVertex from './shaders/passthrough-vertex.glsl'
import vertexShader from './shaders/vertex.glsl'

// `HtmlNodeMaterial.ts` ports these shaders to TSL. A fix here must go there too.
export class HtmlMaterial extends ShaderMaterial implements HtmlMaterialUniforms {
  constructor(billboard: boolean) {
    super({
      vertexShader: (billboard ? vertexShader : passthroughVertex) as string,
      fragmentShader: fragmentShader as string,
      side: DoubleSide,
      uniforms: {
        uWidth: { value: 1 },
        uHeight: { value: 1 },
      },
    })
  }

  get uWidth() { return this.uniforms.uWidth.value }
  set uWidth(value: number) { this.uniforms.uWidth.value = value }

  get uHeight() { return this.uniforms.uHeight.value }
  set uHeight(value: number) { this.uniforms.uHeight.value = value }
}
