import { createMarkdownRenderer } from 'vitepress'

export default {

  async load() {
    const config = globalThis.VITEPRESS_CONFIG
    const md = await createMarkdownRenderer(config.srcDir, config.markdown, config.site.base, config.logger)
    // fetch remote data
    const response = await fetch('https://raw.githubusercontent.com/Tresjs/.github/main/CONTRIBUTING.md')
    const content = await response.text()
    return md.render(content)
  },
}
