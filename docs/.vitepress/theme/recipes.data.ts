import { createContentLoader } from 'vitepress'

export interface Recipe {
  title: string
  url: string
  excerpt: string | undefined
  thumbnail?: string
  difficulty?: number
}

declare const data: Recipe[]
export { data }

export default createContentLoader('cookbook/*.md', {
  excerpt: true,
  transform(raw): Recipe[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        thumbnail: frontmatter.thumbnail,
        difficulty: frontmatter.difficulty,
        excerpt: frontmatter.excerpt || frontmatter.description || excerpt,
      })).filter(recipe => recipe.title)
      .sort((a, b) => b.title - a.title)
  },
})