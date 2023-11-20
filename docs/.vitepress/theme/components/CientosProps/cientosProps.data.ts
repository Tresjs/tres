import type { ComponentDoc } from 'vue-docgen-api'
import { parse as vueDocsParse } from 'vue-docgen-api'
import MarkdownIt from 'markdown-it'
import { defineLoader } from 'vitepress'

export type Data = Record<string, ComponentDoc>
declare const data: Data
export { data }

export default defineLoader({
  // type checked loader options
  watch: ['src/core/**/*.vue'],
  async load(watchedFilePaths): Promise<Data> {
    const docs: Record<string, ComponentDoc> = {}
    const md = new MarkdownIt()
    for (const filePath of watchedFilePaths) {
      const ci: ComponentDoc = await vueDocsParse(filePath)
      ci.props?.map(p => (p.description = md.render(p.description || '')))
      docs[filePath] = ci
    }
    return docs
  },
})
