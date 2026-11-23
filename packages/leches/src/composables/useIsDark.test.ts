import { afterEach, describe, expect, it, vi } from 'vitest'
import { effectScope, nextTick } from 'vue'
import { useIsDark } from './useIsDark'

const html = document.documentElement

function run(target: HTMLElement | null) {
  const scope = effectScope()
  const isDark = scope.run(() => useIsDark(target))!
  return { isDark, stop: () => scope.stop() }
}

// jsdom has no matchMedia. The listener lets a test flip the OS preference.
function mockPrefersDark(matches: boolean) {
  const listeners = new Set<(e: { matches: boolean }) => void>()
  const query = {
    matches,
    media: '(prefers-color-scheme: dark)',
    addEventListener: (_: string, cb: (e: { matches: boolean }) => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: (e: { matches: boolean }) => void) => listeners.delete(cb),
  }
  vi.stubGlobal('matchMedia', () => query)
  return (next: boolean) => {
    query.matches = next
    listeners.forEach(cb => cb({ matches: next }))
  }
}

afterEach(() => {
  html.className = ''
  document.body.innerHTML = ''
  vi.unstubAllGlobals()
})

describe('useIsDark', () => {
  it('follows the dark class on <html>', async () => {
    const { isDark, stop } = run(null)
    expect(isDark.value).toBe(false)

    html.classList.add('dark')
    await nextTick()
    await new Promise(resolve => setTimeout(resolve))
    expect(isDark.value).toBe(true)
    stop()
  })

  it('does not write a class on <html>', () => {
    // Regression: VueUse's useDark() added `dark` to <html> and fought the host color mode.
    html.classList.add('light')
    const { stop } = run(null)
    expect(html.className).toBe('light')
    stop()
  })

  it('uses the nearest .dark or .light ancestor over <html>', () => {
    html.classList.add('dark')
    document.body.innerHTML = '<div class="light"><div id="panel"></div></div>'
    const { isDark, stop } = run(document.getElementById('panel'))
    expect(isDark.value).toBe(false)
    stop()
  })

  it('reads dark from an inner scope when <html> is light', () => {
    html.classList.add('light')
    document.body.innerHTML = '<div class="dark"><div id="panel"></div></div>'
    const { isDark, stop } = run(document.getElementById('panel'))
    expect(isDark.value).toBe(true)
    stop()
  })

  it('follows the OS preference when no .dark or .light class is set', async () => {
    const setPrefersDark = mockPrefersDark(true)
    const { isDark, stop } = run(null)
    expect(isDark.value).toBe(true)

    setPrefersDark(false)
    await nextTick()
    expect(isDark.value).toBe(false)
    stop()
  })

  it('lets a .light class override a dark OS preference', () => {
    mockPrefersDark(true)
    html.classList.add('light')
    const { isDark, stop } = run(null)
    expect(isDark.value).toBe(false)
    stop()
  })
})
