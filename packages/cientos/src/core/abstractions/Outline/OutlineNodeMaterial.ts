import type { BatchedMesh, InstancedMesh, Mesh, Node, NodeBuilder, SkinnedMesh } from 'three/webgpu'
import { MeshBasicNodeMaterial, Vector2 } from 'three/webgpu'
import { batch, cameraProjectionMatrix, Fn, instancedMesh, modelViewMatrix, morphReference, normalize, normalLocal, positionLocal, select, skinning, uniform, vec4 } from 'three/tsl'
import type { OutlineMaterialUniforms } from './props'
import { outlineDefaults } from './props'

// NOTE: Source
// https://github.com/pmndrs/drei/blob/master/src/core/Outlines.tsx

export class OutlineNodeMaterial extends MeshBasicNodeMaterial implements OutlineMaterialUniforms {
  // The `_` prefix keeps `NodeMaterial.copy` from sharing these with a clone by reference.
  private readonly _outlineUniforms = {
    thickness: uniform(outlineDefaults.thickness),
    // A 0/1 float, not a bool: WGSL does not allow bool in a uniform buffer.
    screenspace: uniform(Number(outlineDefaults.screenspace)),
    size: uniform(new Vector2(1, 1)),
  }

  private readonly _outlineVertexNode: Node<'vec4'>

  // `color` and `opacity` are the MeshBasicNodeMaterial fields, which the base `colorNode` and
  // `opacityNode` read. A `color` getter here would break, because the base constructor assigns it.
  constructor() {
    super()
    // ShaderMaterial has fog off and NodeMaterial has it on.
    this.fog = false
    this.color.set(outlineDefaults.color)
    this.opacity = outlineDefaults.opacity

    const u = this._outlineUniforms

    // Not `positionNode`: when `screenspace` is off, the offset is in clip space.
    this._outlineVertexNode = Fn(() => {
      const mvp = cameraProjectionMatrix.mul(modelViewMatrix)
      const clipPosition = mvp.mul(vec4(positionLocal, 1)).toVar()
      const clipNormal = mvp.mul(vec4(normalLocal, 0))
      const offset = normalize(clipNormal.xy).mul(u.thickness).div(u.size).mul(clipPosition.w).mul(2)
      const pixelOffset = vec4(clipPosition.xy.add(offset), clipPosition.zw)

      // `select`, not `mix`: `normalize` gives NaN where the normal faces the camera, and `mix`
      // would carry the NaN into the other branch.
      return select(u.screenspace.greaterThan(0.5), clipPosition, pixelOffset)
    })()

    this.vertexNode = this._outlineVertexNode
  }

  // The `screenspace` name comes from drei and is the wrong way round. When it is on, the offset is
  // in object space, so the outline gets thinner with distance. When it is off, the offset is
  // `thickness` pixels at any distance.
  //
  // This is `NodeMaterial.setupPosition` of three r186, with the object-space offset between
  // skinning and instancing, where the GLSL adds it. Before morphing, absolute morph targets would
  // scale the offset down. After instancing, the offset would ignore the instance scale, because
  // three normalizes the instanced `normalLocal`. Outline sets no `displacementMap` or
  // `positionNode`, so this leaves them out.
  override setupPosition(builder: NodeBuilder) {
    const { geometry } = builder
    const object = builder.object as Mesh & SkinnedMesh & BatchedMesh & InstancedMesh

    if (geometry.morphAttributes.position || geometry.morphAttributes.normal || geometry.morphAttributes.color) {
      morphReference(object)
    }
    if (object.isSkinnedMesh) {
      skinning(object)
    }

    positionLocal.addAssign(normalLocal.mul(this._outlineUniforms.thickness).mul(this._outlineUniforms.screenspace))

    if (object.isBatchedMesh) {
      batch(object)
    }
    if (object.isInstancedMesh && object.instanceMatrix?.isInstancedBufferAttribute) {
      instancedMesh(object)
    }

    return positionLocal
  }

  // `super.copy` copies `thickness` and `screenspace` through their setters. It also gives this
  // material the source's `vertexNode`, which reads the source's uniforms, and skips `size`.
  override copy(source: OutlineNodeMaterial) {
    super.copy(source)
    this.vertexNode = this._outlineVertexNode
    this.size.copy(source.size)
    return this
  }

  get thickness() { return this._outlineUniforms.thickness.value }
  set thickness(value: number) { this._outlineUniforms.thickness.value = value }

  get screenspace() { return this._outlineUniforms.screenspace.value === 1 }
  set screenspace(value: boolean) { this._outlineUniforms.screenspace.value = value ? 1 : 0 }

  get size(): Vector2 { return this._outlineUniforms.size.value }
}
