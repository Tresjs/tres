import type { MeshPhysicalNodeMaterialParameters } from 'three/webgpu'
import { MathUtils, MeshPhysicalNodeMaterial } from 'three/webgpu'
import { glassDefaults } from './defaults'

/**
 * Node material version of `MeshGlassMaterial`.
 *
 * The GLSL version fakes `isMeshPhysicalMaterial` on a `MeshStandardMaterial`. `WebGPURenderer`
 * picks the node material from `material.type`, so it renders that one as a standard material
 * without transmission. `MeshPhysicalNodeMaterial` does transmission and clearcoat itself, so this
 * port only needs the glass start values.
 */
export class MeshGlassNodeMaterial extends MeshPhysicalNodeMaterial {
  constructor(parameters: MeshPhysicalNodeMaterialParameters = {}) {
    super()
    this.setValues({ ...glassDefaults, ...parameters })
  }

  // `MeshPhysicalMaterial` adds `reflectivity` on each instance as a non-enumerable property.
  // `NodeMaterial.setDefaultValues` copies only enumerable ones, so the node material does not
  // have it. Without this, the prop changes `ior` on WebGL and does nothing on WebGPU.
  get reflectivity() {
    return MathUtils.clamp((2.5 * (this.ior - 1)) / (this.ior + 1), 0, 1)
  }

  set reflectivity(reflectivity: number) {
    this.ior = (1 + 0.4 * reflectivity) / (1 - 0.4 * reflectivity)
  }
}
