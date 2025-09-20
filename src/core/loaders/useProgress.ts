import { logError } from '@tresjs/core'
import { DefaultLoadingManager } from 'three'
import { ref } from 'vue'
import type { Ref } from 'vue'

let saveLastTotalLoaded = 0

export function useProgress(): Promise<{
  hasFinishLoading: Ref<boolean>
  progress: Ref<number>
  items: Ref<string[]>
}> {
  const hasFinishLoading = ref(false)
  const progress = ref(0)
  const items: Ref<string[]> = ref([])

  return new Promise((resolve) => {
    DefaultLoadingManager.onStart = () => {
      hasFinishLoading.value = false
    }

    DefaultLoadingManager.onLoad = () => {
      hasFinishLoading.value = true
    }

    DefaultLoadingManager.onProgress = (item, loaded, total) => {
      if (loaded === total) {
        saveLastTotalLoaded = total
        hasFinishLoading.value = true
        items.value.push(item)
      }
      progress.value = Math.round(((loaded - saveLastTotalLoaded) / (total - saveLastTotalLoaded)) * 100 || 100)
    }

    DefaultLoadingManager.onError = (error) => {
      logError('Error loading assets', new Error(error))
      hasFinishLoading.value = true
    }

    resolve({
      items,
      hasFinishLoading,
      progress,
    })
  })
}
