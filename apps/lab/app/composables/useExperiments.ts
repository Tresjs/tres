// Experiments dated within this window get the NEW badge in the sidebar.
const NEW_WINDOW_DAYS = 60
const DAY_MS = 24 * 60 * 60 * 1000

export interface ExperimentAuthor {
  slug: string
  name: string
  avatar: string
}

export interface ExperimentListItem {
  slug: string
  path: string
  title: string
  description: string
  thumbnail: string
  tags: string[]
  date: string
  lastUpdated: string
  featured: boolean
  isNew: boolean
  authors: ExperimentAuthor[]
  repoUrl: string
}

export function experimentRepoUrl(slug: string) {
  return `https://github.com/Tresjs/tres/tree/main/apps/lab/app/components/${slug}`
}

/**
 * The sorted experiment list shared by the sidebar, the `/` default and the article meta row.
 * A fixed `useAsyncData` key makes every caller read the same payload entry.
 */
export function useExperiments() {
  return useAsyncData('lab-experiments', async () => {
    const [experiments, authors] = await Promise.all([
      queryCollection('experiments')
        .select('path', 'title', 'description', 'thumbnail', 'author', 'tags', 'date', 'lastUpdated', 'featured')
        .all(),
      queryCollection('authors').select('slug', 'name', 'avatar').all(),
    ])

    const now = Date.now()
    const list: ExperimentListItem[] = experiments.map((experiment) => {
      const slug = experiment.path.split('/').pop() ?? ''
      const authorSlugs = Array.isArray(experiment.author) ? experiment.author : [experiment.author]
      return {
        slug,
        path: experiment.path,
        title: experiment.title,
        description: experiment.description,
        thumbnail: experiment.thumbnail ?? `/experiments/${slug}.webp`,
        tags: experiment.tags ?? [],
        date: experiment.date,
        lastUpdated: experiment.lastUpdated,
        featured: !!experiment.featured,
        isNew: now - new Date(experiment.date).getTime() < NEW_WINDOW_DAYS * DAY_MS,
        authors: authors.filter(author => authorSlugs.includes(author.slug)),
        repoUrl: experimentRepoUrl(slug),
      }
    })

    return list.sort((a, b) => {
      if (a.featured !== b.featured) { return a.featured ? -1 : 1 }
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    })
  }, { default: () => [] as ExperimentListItem[] })
}

/** The slug the shell shows: the route param, or the top of the list on `/`. */
export function useSelectedSlug() {
  const route = useRoute()
  const { data: experiments } = useExperiments()
  return computed(() => {
    const param = route.params.slug
    if (typeof param === 'string' && param) { return param }
    return experiments.value[0]?.slug
  })
}

/** The sidebar filter text, shared by the desktop sidebar and the phone drawer. */
export function useExperimentQuery() {
  return useState('lab-experiment-query', () => '')
}

/** The experiment list narrowed by the sidebar filter: title, description, tags and author names. */
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
