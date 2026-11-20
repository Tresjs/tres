import { NodeMaterial, QuadMesh, Texture } from 'three/webgpu'
import type { Renderer } from 'three/webgpu'
import { mix, screenUV, texture, uniform } from 'three/tsl'
import type { PortalBlendPass } from './props'

export class MeshPortalNodeMaterial extends NodeMaterial {
  private readonly _emptyMap = new Texture()
  private readonly _mapNode = texture(this._emptyMap, screenUV)
  private _map: Texture | null = null

  constructor() {
    super()

    this.transparent = true
    this.fog = false
    // three flips render target samples on the WebGL2 backend, so `screenUV` reads the same texel on both backends.
    this.fragmentNode = this._mapNode
  }

  get map(): Texture | null { return this._map }
  set map(value: Texture | null) {
    this._map = value
    this._mapNode.value = value ?? this._emptyMap
  }

  override dispose() {
    this._emptyMap.dispose()
    super.dispose()
  }
}

export function createPortalBlendNodePass(portal: Texture, root: Texture): PortalBlendPass {
  const blend = uniform(0)
  const material = new NodeMaterial()
  material.fog = false
  material.fragmentNode = mix(texture(root, screenUV), texture(portal, screenUV), blend)
  const quad = new QuadMesh(material)

  return {
    blend,
    render: renderer => quad.render(renderer as Renderer),
    dispose: () => material.dispose(),
  }
}
