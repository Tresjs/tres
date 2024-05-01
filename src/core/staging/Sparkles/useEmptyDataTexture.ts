import { DataTexture } from 'three'

let texture: DataTexture | null = null

export default function useEmptyDataTexture(): DataTexture {
  if (texture === null) {
    texture = new DataTexture(new Uint8Array([0, 0, 0, 0]), 1, 1)
  }
  return texture
}
