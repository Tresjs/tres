import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { $fetch, createPage, setup, url } from '@nuxt/test-utils'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
    browser: true,
  })

  it('renders a client-only component', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<div style="height:100vh;"><span></span></div>')
  })

  it('has no errors on the client', async () => {
    const page = await createPage()
    const logs: string[] = []
    page.on('console', ({ text, type }) => {
      if (type() === 'error') {
        logs.push(text())
      }
    })
    await page.goto(url('/'))
    expect(logs.length).toBe(0)
  })
})
