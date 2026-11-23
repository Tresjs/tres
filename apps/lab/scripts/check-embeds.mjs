// Headless smoke check for the lab shell. Start the app first (`pnpm dev` or `pnpm preview`), then:
//   LAB_URL=http://localhost:3000 pnpm test:embeds
// 1. Every /embed/<slug> mounts a canvas without uncaught page errors.
// 2. The shell swaps the iframe on sidebar navigation and keeps the sidebar scroll position.
import { readdirSync } from 'node:fs'
import { chromium } from 'playwright'

const baseUrl = (process.env.LAB_URL ?? 'http://localhost:3000').replace(/\/$/, '')
// Dev servers compile each experiment on first visit; plexus-particles blocks the main thread for ~95s there.
const CANVAS_TIMEOUT_MS = 150_000

const slugs = readdirSync(new URL('../content/experiments', import.meta.url))
  .filter(file => file.endsWith('.md') && file !== 'CLAUDE.md')
  .map(file => file.replace(/\.md$/, ''))

const browser = await chromium.launch()
// The microphone grant keeps dancing-blob from stalling on a permission prompt no one can answer.
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, permissions: ['microphone'] })
const failures = []

for (const slug of slugs) {
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  try {
    // Do not wait for `load`: big GLTF and texture downloads hold it back long after the canvas mounts.
    const response = await page.goto(`${baseUrl}/embed/${slug}`, { waitUntil: 'domcontentloaded' })
    if (!response?.ok()) { throw new Error(`HTTP ${response?.status()}`) }
    await page.waitForSelector('canvas', { state: 'attached', timeout: CANVAS_TIMEOUT_MS })
    if (errors.length) { throw new Error(errors.join(' | ')) }
    console.log(`ok    /embed/${slug}`)
  }
  catch (error) {
    failures.push(`/embed/${slug}: ${error.message}`)
    console.log(`FAIL  /embed/${slug}`)
  }
  await page.close()
}

const page = await context.newPage()
try {
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' })
  // Before hydration a NuxtLink is a plain <a>, and clicking it reloads the whole page.
  await page.waitForFunction(() => document.querySelector('#__nuxt')?.__vue_app__?.$nuxt?.isHydrating === false)
  const list = page.locator('#lab-sidebar .overflow-y-auto')
  const links = page.locator('#lab-sidebar a[href^="/experiments/"]')
  const target = await links.nth(4).getAttribute('href')
  const targetSlug = target.split('/').pop()

  await list.evaluate((element) => { element.scrollTop = 400 })
  const scrollBefore = await list.evaluate(element => element.scrollTop)
  await links.nth(4).click()
  await page.waitForURL(`**${target}`)
  await page.waitForSelector(`iframe[src="/embed/${targetSlug}"]`)

  const scrollAfter = await list.evaluate(element => element.scrollTop)
  if (scrollAfter !== scrollBefore) { throw new Error(`sidebar scroll moved from ${scrollBefore} to ${scrollAfter}`) }
  console.log(`ok    shell navigation to ${target}`)
}
catch (error) {
  failures.push(`shell navigation: ${error.message}`)
  console.log('FAIL  shell navigation')
}

await browser.close()

if (failures.length) {
  console.error(`\n${failures.length} failed:\n${failures.join('\n')}`)
  process.exit(1)
}
console.log(`\nAll ${slugs.length} embeds and the shell navigation passed.`)
