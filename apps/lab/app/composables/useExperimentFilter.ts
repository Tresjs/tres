import type { ExperimentListItem } from './useExperiments'

// Experiments dated within this window get the NEW badge in the sidebar.
const NEW_WINDOW_MS = 60 * 24 * 60 * 60 * 1000

/** The sidebar filter text, shared by the desktop sidebar and the phone drawer. */
export function useExperimentQuery() {
  return useState('lab-experiment-query', () => '')
}

export function useFilteredExperiments() {
  const { data: experiments } = useExperiments()
  const query = useExperimentQuery()
  return computed(() => {
    const needle = query.value.trim().toLowerCase()
    if (!needle) { return experiments.value }
    return experiments.value.filter(experiment =>
      [experiment.title, experiment.description, ...experiment.tags, ...experiment.authors.map(author => author.name)]
        .some(field => field?.toLowerCase().includes(needle)))
  })
}

export function useIsNewExperiment() {
  // Prerendered pages freeze `Date.now()` at build time. The payload carries that value so hydration
  // matches, then the client moves it to today so badges do not outlive their window between deploys.
  const now = useState('lab-now', () => Date.now())
  onMounted(() => { now.value = Date.now() })
  return (experiment: ExperimentListItem) => now.value - new Date(experiment.date).getTime() < NEW_WINDOW_MS
}
