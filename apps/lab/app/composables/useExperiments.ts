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
  authors: ExperimentAuthor[]
  repoUrl: string
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

    const list: ExperimentListItem[] = experiments.map((experiment) => {
      const slug = slugFromPath(experiment.path)
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
        authors: authors.filter(author => authorSlugs.includes(author.slug)),
        repoUrl: `https://github.com/Tresjs/tres/tree/main/apps/lab/app/components/${slug}`,
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
