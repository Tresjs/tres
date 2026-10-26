import type { MeshStandardNodeMaterialParameters, Node, NodeBuilder } from 'three/webgpu'
import { MeshStandardNodeMaterial } from 'three/webgpu'
import { cos, Fn, normalLocal, positionLocal, sin, uniform, vec3 } from 'three/tsl'
import type { MeshWobbleMaterialUniforms } from './props'
import { meshWobbleMaterialDefaults } from './props'

export class MeshWobbleNodeMaterial extends MeshStandardNodeMaterial implements MeshWobbleMaterialUniforms {
  // The `_` prefix keeps `NodeMaterial.copy` from sharing these with a clone by reference.
  private readonly _wobbleUniforms = {
    time: uniform(0),
    factor: uniform(meshWobbleMaterialDefaults.factor),
  }

  private readonly _wobbleNode: Node<'vec3'>

  constructor(parameters?: MeshStandardNodeMaterialParameters & Partial<MeshWobbleMaterialUniforms>) {
    // `setValues` runs after the uniforms exist, so `factor` can be a parameter.
    super()

    const u = this._wobbleUniforms

    this._wobbleNode = Fn(() => {
      const theta = sin(u.time.add(positionLocal.y)).div(2).mul(u.factor)
      const c = cos(theta).toVar()
      const s = sin(theta).toVar()

      // The GLSL `position * m` is a row vector times a column-major mat3, a rotation about Y.
      const rotate = (v: Node<'vec3'>) => vec3(c.mul(v.x).add(s.mul(v.z)), v.y, c.mul(v.z).sub(s.mul(v.x)))

      // The GLSL version rotates the view-space normal, which is only right when the camera does not
      // tilt. This rotates the local normal, so the shading can differ a little from WebGL.
      normalLocal.assign(rotate(normalLocal))
      return rotate(positionLocal)
    })()

    // Shadow passes render with a generic material that skips `setupPosition` below, and they
    // apply this after instancing and skinning. Plain meshes cast the exact shape.
    this.castShadowPositionNode = this._wobbleNode

    this.setValues(parameters)
  }

  // Not `positionNode`: three applies it after morph targets, skinning and instancing. The GLSL
  // version wobbles at `begin_vertex`, before them, so each instance wobbles about its own origin.
  override setupPosition(builder: NodeBuilder) {
    positionLocal.assign(this._wobbleNode)
    return super.setupPosition(builder)
  }

  // `super.copy` copies `time` and `factor` through their setters, but it also gives this material
  // the source's `castShadowPositionNode`, which reads the source's uniforms.
  override copy(source: MeshWobbleNodeMaterial) {
    super.copy(source)
    this.castShadowPositionNode = this._wobbleNode
    return this
  }

  get time() { return this._wobbleUniforms.time.value }
  set time(value: number) { this._wobbleUniforms.time.value = value }

  get factor() { return this._wobbleUniforms.factor.value }
  set factor(value: number) { this._wobbleUniforms.factor.value = value }
}
