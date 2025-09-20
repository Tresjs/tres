import type { MeshStandardMaterialParameters } from 'three'
import { Color, MathUtils, MeshStandardMaterial, Vector2 } from 'three'

// Extend Three.js types to include properties that exist at runtime but aren't in the type definitions
declare module 'three' {
  interface Material {
    defines: Record<string, string | number | boolean>
  }
}

// Create a properly typed interface for our glass material
interface IMeshGlassMaterial extends MeshStandardMaterial {
  defines: Record<string, string | number | boolean>
  version: number
}

class MeshGlassMaterial extends MeshStandardMaterial implements IMeshGlassMaterial {
  isMeshPhysicalMaterial: boolean
  clearcoatMap: null
  clearcoatRoughness: number
  clearcoatRoughnessMap: null
  clearcoatNormalScale: Vector2
  clearcoatNormalMap: null
  ior: number
  transmissionMap: null
  thickness: number
  thicknessMap: null
  attenuationDistance: number
  attenuationColor: Color
  specularIntensity: number
  specularIntensityMap: null
  specularColor: Color
  specularColorMap: null
  _clearcoat: number
  _transmission: number

  constructor(parameters: MeshStandardMaterialParameters = {}) {
    super()

    this.isMeshPhysicalMaterial = true

    this.defines = {
      STANDARD: '',
      PHYSICAL: '',
    }

    this.clearcoatMap = null
    this.clearcoatRoughness = 0.0
    this.clearcoatRoughnessMap = null
    this.clearcoatNormalScale = new Vector2(1, 1)
    this.clearcoatNormalMap = null

    this.ior = 1.5

    Object.defineProperty(this, 'reflectivity', {
      get() {
        return MathUtils.clamp((2.5 * (this.ior - 1)) / (this.ior + 1), 0, 1)
      },
      set(reflectivity) {
        this.ior = (1 + 0.4 * reflectivity) / (1 - 0.4 * reflectivity)
      },
    })
    this.roughness = 0

    this.transmissionMap = null

    this.thickness = 0.5
    this.thicknessMap = null
    this.attenuationDistance = Number.POSITIVE_INFINITY
    this.attenuationColor = new Color(1, 1, 1)

    this.specularIntensity = 1.0
    this.specularIntensityMap = null
    this.specularColor = new Color(1, 1, 1)
    this.specularColorMap = null

    this._clearcoat = 0.5
    this._transmission = 1

    this.setValues(parameters)
  }

  get clearcoat() {
    return this._clearcoat
  }

  set clearcoat(value) {
    // eslint-disable-next-line style/no-mixed-operators
    if (this._clearcoat > 0 !== value > 0) {
      // Increment version to trigger shader recompilation - using mutable interface
      ;(this as IMeshGlassMaterial).version++
    }

    this._clearcoat = value
  }

  get transmission() {
    return this._transmission
  }

  set transmission(value) {
    // eslint-disable-next-line style/no-mixed-operators
    if (this._transmission > 0 !== value > 0) {
      // Increment version to trigger shader recompilation - using mutable interface
      ;(this as IMeshGlassMaterial).version++
    }

    this._transmission = value
  }

  copy(source: MeshGlassMaterial) {
    super.copy(source)

    this.defines = {
      STANDARD: '',
      PHYSICAL: '',
    }

    this.clearcoat = source.clearcoat
    this.clearcoatMap = source.clearcoatMap
    this.clearcoatRoughness = source.clearcoatRoughness
    this.clearcoatRoughnessMap = source.clearcoatRoughnessMap
    this.clearcoatNormalMap = source.clearcoatNormalMap
    this.clearcoatNormalScale.copy(source.clearcoatNormalScale)

    this.ior = source.ior

    this.transmission = source.transmission
    this.transmissionMap = source.transmissionMap

    this.thickness = source.thickness
    this.thicknessMap = source.thicknessMap
    this.attenuationDistance = source.attenuationDistance
    this.attenuationColor.copy(source.attenuationColor)

    this.specularIntensity = source.specularIntensity
    this.specularIntensityMap = source.specularIntensityMap
    this.specularColor.copy(source.specularColor)
    this.specularColorMap = source.specularColorMap

    return this
  }
}

export default MeshGlassMaterial
