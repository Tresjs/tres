import { logWarning } from '@tresjs/core'
import type { Points } from 'three'
import { NormalBlending } from 'three'
import type { NodeBuilder, PointsNodeMaterialParameters } from 'three/webgpu'
import { PointsNodeMaterial } from 'three/webgpu'
import { diffuseColor, dot, float, fwidth, smoothstep, uv } from 'three/tsl'

let warnedPoints = false

export class PointNodeMaterial extends PointsNodeMaterial {
  constructor(parameters?: PointsNodeMaterialParameters) {
    super()
    // `PointsNodeMaterial` turns this on, but the opaque dots then draw see-through corners, even with MSAA.
    this.alphaToCoverage = false
    this.setValues(parameters)
  }

  // Runs after alpha test, as the GLSL version masks after `opaque_fragment`.
  override setupDiffuseColor(builder: NodeBuilder) {
    super.setupDiffuseColor(builder)

    // WebGPU draws `Points` 1 pixel wide and gives them no `uv`, so only sprite instances get the mask.
    if ((builder.object as Points).isPoints) {
      if (!warnedPoints) {
        warnedPoints = true
        logWarning('<PointMaterial> on <TresPoints> draws 1 pixel points under WebGPU. Put it on a <TresSprite> with `count` and a `positionNode` instead.')
      }
      return
    }

    // The same test as `NodeBuilder.isOpaque`, which @types/three leaves out. Without blending the
    // GLSL mask has no effect either, so opaque dots stay square in both versions.
    if (!this.transparent && this.blending === NormalBlending && !this.alphaToCoverage) { return }

    // `uv` spans the sprite quad, as `gl_PointCoord` spans the point in the GLSL version.
    const cxy = uv().mul(2).sub(1)
    const r = dot(cxy, cxy)
    const delta = fwidth(r)
    const mask = float(1).sub(smoothstep(float(1).sub(delta), float(1).add(delta), r))
    diffuseColor.a.assign(diffuseColor.a.mul(mask))
  }
}
