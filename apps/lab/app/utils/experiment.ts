import type { InjectionKey, Ref } from 'vue'
import type { ExperimentItem } from '~/app/types'

// The embed page provides its content record so components rendered by
// the experiment itself (e.g. TheLoadingScreen) can read frontmatter flags.
export const EXPERIMENT_KEY: InjectionKey<Ref<ExperimentItem | null | undefined>> = Symbol('experiment')

/** `/experiments/glyph-cut-out` or `experiments/glyph-cut-out` → `glyph-cut-out` */
export function slugFromPath(path: string) {
  return path.split('/').filter(Boolean).pop() ?? ''
}
