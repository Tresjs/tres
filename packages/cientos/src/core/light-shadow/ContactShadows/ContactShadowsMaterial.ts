import { Color, MeshDepthMaterial, ShaderMaterial, UniformsUtils } from 'three'
import type { Texture } from 'three'
import { HorizontalBlurShader, VerticalBlurShader } from 'three-stdlib'
import type { BlurDirection, ContactShadowsBlurMaterial, ContactShadowsDepthMaterial } from './props'

const BLUR_SHADERS = {
  horizontal: { shader: HorizontalBlurShader, offsetUniform: 'h' },
  vertical: { shader: VerticalBlurShader, offsetUniform: 'v' },
} as const satisfies Record<BlurDirection, { shader: Pick<ShaderMaterial, 'vertexShader' | 'fragmentShader' | 'uniforms'>, offsetUniform: string }>

export class ContactShadowsDepthGlslMaterial extends MeshDepthMaterial implements ContactShadowsDepthMaterial {
  readonly tint = new Color('white')

  constructor() {
    super()
    this.onBeforeCompile = (shader) => {
      shader.uniforms.tint = { value: this.tint }
      shader.fragmentShader = `uniform vec3 tint;\n${shader.fragmentShader.replace(
        'gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );',
        'gl_FragColor = vec4( tint, ( 1.0 - fragCoordZ ) * opacity );',
      )}`
    }
  }
}

export class ContactShadowsBlurGlslMaterial extends ShaderMaterial implements ContactShadowsBlurMaterial {
  private readonly offsetUniform: 'h' | 'v'

  constructor(direction: BlurDirection, source: Texture) {
    const { shader, offsetUniform } = BLUR_SHADERS[direction]
    super({
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      uniforms: UniformsUtils.clone(shader.uniforms),
      depthTest: false,
    })
    this.offsetUniform = offsetUniform
    this.uniforms.tDiffuse.value = source
  }

  get offset(): number {
    return this.uniforms[this.offsetUniform].value
  }

  set offset(value: number) {
    this.uniforms[this.offsetUniform].value = value
  }
}

export const glslMaterials = {
  createDepthMaterial: () => new ContactShadowsDepthGlslMaterial(),
  createBlurMaterial: (direction: BlurDirection, source: Texture) => new ContactShadowsBlurGlslMaterial(direction, source),
}
