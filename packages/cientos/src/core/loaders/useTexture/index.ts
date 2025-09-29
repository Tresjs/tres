import { useLoader } from '@tresjs/core'
import { Texture, TextureLoader } from 'three'
import type { MaybeRef } from 'vue'

export function useTexture(path: MaybeRef<string>) {
  const result = useLoader(TextureLoader, path, {
    initialValue: new Texture(),
  })

  return result
}
