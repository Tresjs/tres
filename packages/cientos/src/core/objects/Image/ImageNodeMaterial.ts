import type { Node, Texture, TextureNode } from 'three/webgpu'
import { DataTexture, MeshBasicNodeMaterial, Vector2 } from 'three/webgpu'
import {
  abs,
  dot,
  float,
  length,
  materialReference,
  max,
  min,
  mix,
  select,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  vec4,
} from 'three/tsl'
import type { ImageMaterialUniforms } from './props'
import { imageDefaults } from './props'

// Sampled while `map` is null, because a texture node needs a texture to bind. Opaque black, as
// WebGL samples an unbound texture. An empty `Texture` would sample transparent black under WebGPU.
const emptyTexture = /* @__PURE__ */ (() => {
  const blank = new DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1)
  blank.needsUpdate = true
  return blank
})()

/**
 * TSL port of the image material. `ImageMaterial.ts` has the GLSL version. A fix here must go there too.
 */
export class ImageNodeMaterial extends MeshBasicNodeMaterial implements ImageMaterialUniforms {
  // The `_` prefix keeps `NodeMaterial.copy` from sharing these with a clone by reference.
  private readonly _imageUniforms = {
    scale: uniform(new Vector2(1, 1)),
    imageBounds: uniform(new Vector2(1, 1)),
    resolution: uniform(1024),
    zoom: uniform(imageDefaults.zoom),
    radius: uniform(imageDefaults.radius),
    grayscale: uniform(imageDefaults.grayscale),
  }

  private _map: Texture | null = null
  private readonly _mapNode: TextureNode

  constructor() {
    super()
    // ShaderMaterial has fog off and NodeMaterial has it on.
    this.fog = false
    // The built-in `color` and `opacity` of MeshBasicNodeMaterial are the GLSL uniforms of the same name.
    this.color.set(imageDefaults.color)
    this.opacity = imageDefaults.opacity

    const u = this._imageUniforms
    const vUv = uv()

    // Fits the image to the geometry like CSS `object-fit: cover`.
    const aspect = (size: Node<'vec2'>) => size.div(min(size.x, size.y))
    const plane = aspect(u.scale)
    const image = aspect(u.imageBounds)
    const imageIsWider = plane.x.div(plane.y).lessThan(image.x.div(image.y))
    // `new` in the GLSL: the image size, scaled so that it covers the plane.
    const fitted = select(
      imageIsWider,
      vec2(image.x.mul(plane.y).div(image.y), plane.y),
      vec2(plane.x, image.y.mul(plane.x).div(image.x)),
    )
    const offset = select(
      imageIsWider,
      vec2(fitted.x.sub(plane.x).div(2), 0),
      vec2(0, fitted.y.sub(plane.y).div(2)),
    ).div(fitted)
    const zoomedUv = vUv.mul(plane).div(fitted).add(offset).sub(0.5).div(u.zoom).add(0.5)

    // `udRoundBox` from https://iquilezles.org/articles/distfunctions
    const planePixels = u.scale.mul(u.resolution)
    const halfPlanePixels = planePixels.mul(0.5)
    const cornerRadius = u.resolution.mul(u.radius)
    const boxDistance = length(max(abs(vUv.mul(planePixels).sub(halfPlanePixels)).sub(halfPlanePixels).add(cornerRadius), 0)).sub(cornerRadius)
    const cornerAlpha = float(1).sub(smoothstep(0, 1, boxDistance))

    // The `opacity` of the GLSL multiplies the alpha. NodeMaterial does that with its own `opacity`.
    this._mapNode = texture(emptyTexture, zoomedUv)
    // Reads the built-in `color` of MeshBasicNodeMaterial. `@types/three` types the node as a plain
    // `Node`, which `vec4()` rejects. It is a vec3 (the `color` type says so).
    const colorUniform = materialReference('color', 'color') as unknown as Node<'vec3'>
    const color = this._mapNode.mul(vec4(colorUniform, cornerAlpha))
    const luma = dot(color.rgb, vec3(0.299, 0.587, 0.114))
    this.colorNode = vec4(mix(color.rgb, vec3(luma), u.grayscale), color.a)

    // `map` is a plain field of MeshBasicNodeMaterial, and its constructor sets it before the class
    // fields above exist. So a class accessor cannot hold it, and this own accessor replaces the field.
    // It is not enumerable: `NodeMaterial.copy` would call `Texture.copy()` on it and overwrite the
    // user's texture, and the render cache key would rebuild the material for each new texture.
    Object.defineProperty(this, 'map', {
      configurable: true,
      get: () => this._map,
      set: (value: Texture | null) => {
        this._map = value
        this._mapNode.value = value ?? emptyTexture
      },
    })
  }

  // `NodeMaterial.copy()` assigns `colorNode` by reference, so a clone would read the uniforms of its
  // source. It also skips getter-only properties and the non-enumerable `map`.
  override copy(source: ImageNodeMaterial) {
    const { colorNode } = this
    super.copy(source)
    this.colorNode = colorNode
    this.scale.copy(source.scale)
    this.imageBounds.copy(source.imageBounds)
    this.map = source.map
    return this
  }

  // Vectors have only a getter: Tres calls `.set()` on the returned uniform `Vector2`.
  get scale() { return this._imageUniforms.scale.value }

  get imageBounds() { return this._imageUniforms.imageBounds.value }

  get resolution() { return this._imageUniforms.resolution.value }
  set resolution(value: number) { this._imageUniforms.resolution.value = value }

  get zoom() { return this._imageUniforms.zoom.value }
  set zoom(value: number) { this._imageUniforms.zoom.value = value }

  get radius() { return this._imageUniforms.radius.value }
  set radius(value: number) { this._imageUniforms.radius.value = value }

  get grayscale() { return this._imageUniforms.grayscale.value }
  set grayscale(value: number) { this._imageUniforms.grayscale.value = value }
}
