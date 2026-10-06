import type { InjectionKey, Ref } from 'vue'
import type { ExperimentItem } from '~/app/types'

// The experiment page provides its content record so components rendered by
// the experiment itself (e.g. TheLoadingScreen) can read frontmatter flags.
export const EXPERIMENT_KEY: InjectionKey<Ref<ExperimentItem | null | undefined>> = Symbol('experiment')
