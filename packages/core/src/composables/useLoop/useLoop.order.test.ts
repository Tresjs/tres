import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick, onMounted, ref } from 'vue'
import { createStubRenderer, mountInTresContext, withSetup } from '../../utils/test/tresContext'
import { useLoop } from '.'

vi.mock('@pmndrs/pointer-events', async () => {
  const { Object3D } = await import('three')
  return { forwardHtmlEvents: () => ({ update: () => {}, destroy: () => {} }), getVoidObject: () => new Object3D() }
})

const setup = (children: Record<string, () => void>) => {
  const shown = ref<string[]>([])
  const components = Object.fromEntries(Object.entries(children).map(([name, fn]) => [name, withSetup(fn)]))
  // A zero-size canvas never reports ready, so the test starts the loop itself.
  const domElement = Object.assign(document.createElement('canvas'), { width: 0, height: 0 })
  const mounted = mountInTresContext(() => shown.value.map(name => h(components[name], { key: name })), { renderer: createStubRenderer({ domElement }) })

  const show = async (...names: string[]) => {
    shown.value = names
    await nextTick()
  }

  const frame = () => {
    if (!mounted.ctx.renderer.loop.isActive.value) { mounted.ctx.renderer.loop.start() }
    vi.advanceTimersToNextFrame()
  }

  return { ...mounted, show, frame }
}

describe('useLoop order across components', () => {
  let calls: string[]
  const log = (name: string) => () => { calls.push(name) }

  beforeEach(() => {
    vi.useFakeTimers()
    calls = []
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('sorts onBeforeRender callbacks by priority across components', async () => {
    const { show, frame } = setup({
      Late: () => useLoop().onBeforeRender(log('late'), 100),
      Early: () => useLoop().onBeforeRender(log('early'), -100),
    })
    await show('Late', 'Early')
    frame()

    expect(calls).toEqual(['early', 'late'])
  })

  it('sorts onRender callbacks by priority across components', async () => {
    const { show, frame } = setup({
      Late: () => useLoop().onRender(log('late'), 100),
      Early: () => useLoop().onRender(log('early'), -100),
    })
    await show('Late', 'Early')
    frame()

    expect(calls).toEqual(['early', 'late'])
  })

  it('keeps the useLoop call order for callbacks with the same priority', async () => {
    const { show, frame } = setup({
      A: () => {
        const { onBeforeRender } = useLoop()
        onMounted(() => onBeforeRender(log('a')))
      },
      B: () => useLoop().onBeforeRender(log('b')),
    })
    await show('A', 'B')
    frame()

    expect(calls).toEqual(['a', 'b'])
  })

  it('keeps running the other callbacks when the first component unmounts', async () => {
    const { show, frame } = setup({
      A: () => useLoop().onBeforeRender(log('a')),
      B: () => useLoop().onBeforeRender(log('b')),
    })
    await show('A', 'B')
    await show('B')
    frame()

    expect(calls).toEqual(['b'])
  })

  it('removes callbacks registered outside a scope when their component unmounts', async () => {
    let registerOutsideScope: ReturnType<typeof useLoop>['onBeforeRender'] = () => ({ off: () => {} })
    const { show, frame } = setup({
      A: () => { registerOutsideScope = useLoop().onBeforeRender },
    })
    await show('A')
    registerOutsideScope(log('a'))
    await show()
    frame()

    expect(calls).toEqual([])
  })

  it('ignores callbacks registered after their component unmounts', async () => {
    let registerLater: ReturnType<typeof useLoop>['onBeforeRender'] = () => ({ off: () => {} })
    const { show, frame } = setup({
      A: () => { registerLater = useLoop().onBeforeRender },
    })
    await show('A')
    await show()
    registerLater(log('a'))
    frame()

    expect(calls).toEqual([])
  })

  it('runs a function once per component that registers it', async () => {
    const shared = log('shared')
    const { show, frame } = setup({
      A: () => useLoop().onBeforeRender(shared),
      B: () => useLoop().onBeforeRender(shared),
    })
    await show('A', 'B')
    frame()
    expect(calls).toEqual(['shared', 'shared'])

    calls = []
    await show('B')
    frame()
    expect(calls).toEqual(['shared'])
  })

  it('runs loop listeners that were added before the first useLoop call first', async () => {
    const { show, frame, ctx } = setup({
      A: () => useLoop().onBeforeRender(log('a'), -100),
    })
    ctx.renderer.loop.onBeforeLoop(log('canvas'))
    await show('A')
    frame()

    expect(calls).toEqual(['canvas', 'a'])
  })
})
