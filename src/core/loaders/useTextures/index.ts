import { useLoader } from '@tresjs/core'
import { Texture, TextureLoader } from 'three'
import { computed, ref, unref } from 'vue'
import type { MaybeRef } from 'vue'

/**
 * Composable that loads multiple textures at once
 *
 * @param paths - Array of paths to texture files
 * @returns Object containing textures, loading state, and error state
 */
export function useTextures(paths: MaybeRef<string[]>) {
  // Create a ref to track error state
  const error = ref<Error | null>(null)

  // Unwrap the MaybeRef to get the actual array
  const pathsArray = unref(paths)

  // Load all textures
  const results = pathsArray.map((path: string) => {
    try {
      const result = useLoader(TextureLoader, path, {
        initialValue: new Texture(),
      })
      return result
    }
    catch (err) {
      error.value = err as Error
      return ref(null)
    }
  })

  // Create a computed property for the loaded textures
  const loadedTextures = computed(() => {
    return results
      .map((result) => {
        if (result && 'state' in result) {
          return result.state.value
        }
        return null
      })
      .filter(Boolean) as Texture[]
  })

  // Compute loading state based on all results
  const isLoading = computed(() => {
    // Check if any texture is still loading
    return results.some((result) => {
      if (result && 'isLoading' in result) {
        return result.isLoading.value
      }
      return false
    })
  })

  // Compute combined error
  const combinedError = computed(() => {
    const errors: Error[] = []

    results.forEach((result) => {
      if (result && 'error' in result && result.error) {
        // Safely cast the error to Error type
        const err = result.error
        if (err instanceof Error) {
          errors.push(err)
        }
        else if (typeof err === 'object' && err !== null && 'message' in err) {
          // Create a new Error from the error object
          errors.push(new Error(String(err.message)))
        }
      }
    })

    if (error.value) {
      errors.push(error.value)
    }

    return errors.length > 0 ? errors : null
  })

  return {
    textures: loadedTextures,
    isLoading,
    error: combinedError,
  }
}
