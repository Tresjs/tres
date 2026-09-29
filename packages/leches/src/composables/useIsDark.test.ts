import { afterEach, describe, expect, it } from 'vitest'
import { effectScope, nextTick } from 'vue'
import { useIsDark } from './useIsDark'

const html = document.documentElement

function run(target: HTMLElement | null) {
  const scope = effectScope()
  const isDark = scope.run(() => useIsDark(target))!
  return { isDark, stop: () => scope.stop() }
}

afterEach(() => {
  html.className = ''
  document.body.innerHTML = ''
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
})
