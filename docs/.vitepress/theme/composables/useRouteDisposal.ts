import { ref, watch } from 'vue'
import { useRouter } from 'vitepress'
import type { EffectComposer } from '@tresjs/post-processing'

export function useRouteDisposal() {
  const router = useRouter()

  const effectComposer = ref<InstanceType<typeof EffectComposer> | null>(null)

  watch(() => router.route.data.relativePath, () => {
    effectComposer.value?.composer.dispose()
  })

  return {
    effectComposer,
  }
}