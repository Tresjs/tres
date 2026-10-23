import { DoubleSide, NodeMaterial } from 'three/webgpu'
import { cameraProjectionMatrix, modelViewMatrix, positionGeometry, uniform, vec2, vec4 } from 'three/tsl'
import type { HtmlMaterialUniforms } from './props'

export class HtmlNodeMaterial extends NodeMaterial implements HtmlMaterialUniforms {
  private readonly _htmlUniforms = {
    uWidth: uniform(1),
    uHeight: uniform(1),
  }

  constructor(billboard: boolean) {
    super()
    this.side = DoubleSide
    // ShaderMaterial has fog off and NodeMaterial has it on.
    this.fog = false

    if (billboard) {
      const u = this._htmlUniforms
      const center = modelViewMatrix.mul(vec4(0, 0, 0, 1))
      const corner = vec4(positionGeometry.xy.mul(vec2(u.uWidth, u.uHeight)), 0, 0)
      this.vertexNode = cameraProjectionMatrix.mul(center.add(corner))
    }

    // `fragmentNode`, not `colorNode`: an opaque NodeMaterial forces alpha to 1, and the plane must
    // write alpha 0 so that `occlude="blending"` cuts a hole in the canvas.
    this.fragmentNode = vec4(0, 0, 0, 0)
  }

  get uWidth() { return this._htmlUniforms.uWidth.value }
  set uWidth(value: number) { this._htmlUniforms.uWidth.value = value }

  get uHeight() { return this._htmlUniforms.uHeight.value }
  set uHeight(value: number) { this._htmlUniforms.uHeight.value = value }
}
