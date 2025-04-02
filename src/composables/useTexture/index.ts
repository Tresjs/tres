import { type MaybeRef, useAsyncState, type UseAsyncStateOptions, type UseAsyncStateReturn } from '@vueuse/core'
import { type LoadingManager, Texture, TextureLoader } from 'three'
import { onUnmounted, toValue, watch } from 'vue'

/**
 * Type representing a texture path or multiple texture paths
 */
export type TexturePath = string | string[]

export function useTexture<T extends MaybeRef<TexturePath>, Shallow extends boolean>(
  path: T,
  {
    manager,
    asyncOptions,
  }: {
    manager?: LoadingManager
    asyncOptions?: UseAsyncStateOptions<Shallow, Texture | null>
  } = {},
):
  T extends MaybeRef<string> ?
    UseAsyncStateReturn<Texture | null, [TexturePath], Shallow> :
    UseAsyncStateReturn<Texture | null, [TexturePath], Shallow>[] {
  const immediate = asyncOptions?.immediate ?? true
  const textureLoader = new TextureLoader(manager)

  const loadTexture = (initialPath?: string) => useAsyncState(
    (path: string) =>
      textureLoader.loadAsync(path || initialPath || ''),
    new Texture(),
    {
      ...asyncOptions,
      immediate,
    },
  )

  const initialPath = toValue(path)

  // Create a type-safe result variable
  let singleResult: UseAsyncStateReturn<Texture | null, [TexturePath], Shallow> | undefined
  let arrayResult: UseAsyncStateReturn<Texture | null, [TexturePath], Shallow>[] | undefined

  if (typeof initialPath === 'string') {
    singleResult = loadTexture(initialPath) as UseAsyncStateReturn<Texture | null, [TexturePath], Shallow>
  }
  else {
    arrayResult = (initialPath as string[]).map(path =>
      loadTexture(path),
    ) as UseAsyncStateReturn<Texture | null, [TexturePath], Shallow>[]
  }

  const unsub = watch(() => toValue(path), (newPath) => {
    if (newPath) {
      if (typeof newPath === 'string' && singleResult) {
        // Handle single path update
        singleResult.execute(0, newPath)
      }
      else if (Array.isArray(newPath) && arrayResult) {
        // Handle array of paths update
        newPath.forEach((path, index) => {
          if (arrayResult && index < arrayResult.length) {
            arrayResult[index].execute(0, path)
          }
        })
      }
    }
  })

  onUnmounted(() => {
    unsub()
  })

  // Return the appropriate result based on the input type
  return (singleResult || arrayResult) as T extends MaybeRef<string> ?
    UseAsyncStateReturn<Texture | null, [TexturePath], Shallow> :
    UseAsyncStateReturn<Texture | null, [TexturePath], Shallow>[]
}
