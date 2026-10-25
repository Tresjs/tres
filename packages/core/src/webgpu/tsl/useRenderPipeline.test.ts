import { PerspectiveCamera } from 'three'
import { float } from 'three/tsl'
import { RenderPipeline } from 'three/webgpu'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick, ref } from 'vue'
import type { RenderFunction, RenderMode } from '../../composables'
import { createStubRenderer, mountInTresContext, withSetup } from '../../utils/test/tresContext'
import { getTslStore } from './context'
import type { RenderPipelineCallback, UseRenderPipelineReturn } from './useRenderPipeline'
import { useRenderPipeline } from './useRenderPipeline'
import { useUniforms } from './useUniforms'

vi.mock('@pmndrs/pointer-events', async () => {
  const { Object3D } = await import('three')
  return { forwardHtmlEvents: () => ({ update: () => {}, destroy: () => {} }), getVoidObject: () => new Object3D() }
})

// Mounts the canvas first, so the test can watch the render function before any child configures the pipeline.
const setup = (children: Record<string, () => void>) => {
  const shown = ref<string[]>([])
  const components = Object.fromEntries(Object.entries(children).map(([name, fn]) => [name, withSetup(fn)]))
  // A zero-size canvas never reports ready, so the real loop does not start and draw with the stub renderer.
  const domElement = Object.assign(document.createElement('canvas'), { width: 0, height: 0 })
  const renderer = createStubRenderer({ domElement })
  const mounted = mountInTresContext(() => shown.value.map(name => h(components[name], { key: name })), { renderer })
  const { ctx } = mounted

  const camera = new PerspectiveCamera()
  ctx.camera.registerCamera(camera, true)

  const renderFunctions: RenderFunction[] = []
  const restores: ReturnType<typeof vi.fn>[] = []
  const replace = ctx.renderer.replaceRenderFunction
  ctx.renderer.replaceRenderFunction = (fn) => {
    renderFunctions.push(fn)
    const restore = vi.fn(replace(fn))
    restores.push(restore)
    return restore
  }

  const show = async (...names: string[]) => {
    shown.value = names
    await nextTick()
  }

  return { ...mounted, camera, show, renderFunctions, restores, store: getTslStore(ctx) }
}

describe('useRenderPipeline', () => {
  it('throws under a WebGLRenderer', () => {
    const errors = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const renderer = createStubRenderer({ isRenderer: undefined, isWebGLRenderer: true })
    expect(() => mountInTresContext(() => h(withSetup(() => useRenderPipeline(() => {}))), { renderer })).toThrow('needs a WebGPURenderer')
    errors.mockRestore()
  })

  it('creates the pipeline and a scene pass, then runs setup before main', async () => {
    const calls: string[] = []
    let result!: UseRenderPipelineReturn
    const { show, store } = setup({
      Effects: () => {
        result = useRenderPipeline(
          ({ passes }) => { calls.push(`main ${passes.scenePass.isPassNode}`) },
          ({ passes }) => { calls.push(`setup ${passes.scenePass.isPassNode}`) },
        )
      },
    })
    await show('Effects')

    expect(calls).toEqual(['setup true', 'main true'])
    expect(result.isReady.value).toBe(true)
    expect(result.renderPipeline.value?.outputNode).toBe(store.passes.get('scenePass'))
  })

  it('renders through the pipeline', async () => {
    let result!: UseRenderPipelineReturn
    const { show, renderFunctions } = setup({ Effects: () => { result = useRenderPipeline(() => {}) } })
    await show('Effects')
    const render = vi.spyOn(result.renderPipeline.value!, 'render').mockImplementation(() => {})
    const notify = vi.fn()

    renderFunctions.at(-1)!(notify)

    expect(render).toHaveBeenCalledOnce()
    expect(notify).toHaveBeenCalledOnce()
  })

  it('registers the passes a callback returns, but not under scenePass', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const extra = float(1)
    const { show, store } = setup({
      Effects: () => { useRenderPipeline(({ passes }) => ({ extra, scenePass: passes.scenePass })) },
    })
    await show('Effects')

    expect(store.passes.get('extra')).toBe(extra)
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('"scenePass" is reserved'))
    warn.mockRestore()
  })

  it('re-creates the scene pass when the active camera changes', async () => {
    const main = vi.fn<RenderPipelineCallback>()
    const { show, store, ctx } = setup({ Effects: () => { useRenderPipeline(main) } })
    await show('Effects')
    const scenePass = store.passes.get('scenePass')

    ctx.camera.registerCamera(new PerspectiveCamera(), true)
    await nextTick()

    expect(store.passes.get('scenePass')).not.toBe(scenePass)
    expect(main).toHaveBeenCalledTimes(2)
  })

  it('does not re-run the callbacks on a uniform value change, but does when a read uniform is rebuilt', async () => {
    const intensity = ref(1)
    const main = vi.fn<RenderPipelineCallback>(({ renderPipeline, passes, uniforms }) => {
      renderPipeline.outputNode = passes.scenePass.mul(uniforms.uIntensity)
    })
    let rebuildUniforms!: () => void
    const { show } = setup({
      Effects: () => {
        rebuildUniforms = useUniforms({ uIntensity: intensity }).rebuildUniforms
        useRenderPipeline(main)
      },
    })
    await show('Effects')

    intensity.value = 2
    await nextTick()
    expect(main).toHaveBeenCalledOnce()

    rebuildUniforms()
    await nextTick()
    expect(main).toHaveBeenCalledTimes(2)
  })

  it('restores the default render function and frees the pipeline on unmount', async () => {
    let reader!: UseRenderPipelineReturn
    const { show, restores } = setup({
      Effects: () => { useRenderPipeline(() => {}) },
      Reader: () => { reader = useRenderPipeline() },
    })
    await show('Reader', 'Effects')
    const pipeline = reader.renderPipeline.value!
    const dispose = vi.spyOn(pipeline, 'dispose')

    await show('Reader')

    expect(restores.at(-1)).toHaveBeenCalledOnce()
    expect(dispose).toHaveBeenCalledOnce()
    expect(reader.isReady.value).toBe(false)
    expect(reader.passes.scenePass).toBeUndefined()
  })

  it('reads without creating a pipeline', async () => {
    let reader!: UseRenderPipelineReturn
    const { show, renderFunctions } = setup({ Reader: () => { reader = useRenderPipeline() } })
    await show('Reader')

    expect(reader.isReady.value).toBe(false)
    expect(renderFunctions).toEqual([])
  })

  it('warns on a second configuring component, which renders until it unmounts', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const first = vi.fn<RenderPipelineCallback>()
    const second = vi.fn<RenderPipelineCallback>()
    const { show } = setup({
      First: () => { useRenderPipeline(first) },
      Second: () => { useRenderPipeline(second) },
    })
    await show('First', 'Second')

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('another component already configures'))
    expect(second).toHaveBeenCalledOnce()

    await show('First')
    expect(first).toHaveBeenCalledTimes(2)
    warn.mockRestore()
  })

  it('rebuilds against a new scene pass, and reset frees the pipeline', async () => {
    let result!: UseRenderPipelineReturn
    const main = vi.fn<RenderPipelineCallback>()
    const { show, store } = setup({ Effects: () => { result = useRenderPipeline(main) } })
    await show('Effects')
    const scenePass = store.passes.get('scenePass')

    result.rebuild()
    expect(store.passes.get('scenePass')).not.toBe(scenePass)
    expect(main).toHaveBeenCalledTimes(2)

    result.reset()
    expect(result.isReady.value).toBe(false)

    result.rebuild()
    expect(result.isReady.value).toBe(true)
  })

  it('clears the registered passes but keeps the scene pass, so the pipeline still draws', async () => {
    let result!: UseRenderPipelineReturn
    const { show, store, renderFunctions } = setup({ Effects: () => { result = useRenderPipeline(() => ({ extra: float(1) })) } })
    await show('Effects')
    const render = vi.spyOn(result.renderPipeline.value!, 'render').mockImplementation(() => {})
    const notify = vi.fn()

    result.clearPasses()
    renderFunctions.at(-1)!(notify)

    expect(store.passes.keys()).toEqual(['scenePass'])
    expect(render).toHaveBeenCalledOnce()
    expect(notify).toHaveBeenCalledOnce()
  })

  it('still counts the frame when the scene pass is missing', async () => {
    const { show, store, renderFunctions, renderer } = setup({ Effects: () => { useRenderPipeline(() => {}) } })
    await show('Effects')
    const notify = vi.fn()

    store.passes.remove('scenePass')
    renderFunctions.at(-1)!(notify)

    expect(renderer.render).toHaveBeenCalled()
    expect(notify).toHaveBeenCalledOnce()
  })
})

describe('useRenderPipeline with the render loop', () => {
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  // The loop runs for real here, so the GPU work of `RenderPipeline.render` is replaced by a counter.
  const mountWithLoop = (renderMode: RenderMode, setup: () => void) => {
    const draws = vi.spyOn(RenderPipeline.prototype, 'render').mockImplementation(() => {})
    const mounted = mountInTresContext(() => h(withSetup(setup)), { renderMode })
    mounted.ctx.camera.registerCamera(new PerspectiveCamera(), true)
    return { ...mounted, draws }
  }

  const settle = async (draws: { mock: { calls: unknown[] } }) => {
    await vi.waitFor(() => expect(draws.mock.calls.length).toBeGreaterThan(0), { timeout: 1000 })
    await wait(150)
    return draws.mock.calls.length
  }

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('draws through the pipeline once per uniform change in on-demand mode', async () => {
    const strength = ref(1)
    const { draws, wrapper } = mountWithLoop('on-demand', () => {
      useUniforms({ uStrength: strength })
      useRenderPipeline(({ renderPipeline, passes, uniforms }) => {
        renderPipeline.outputNode = passes.scenePass.mul(uniforms.uStrength)
      })
    })
    const settled = await settle(draws)

    await wait(150)
    expect(draws.mock.calls.length).toBe(settled)

    strength.value = 2
    await vi.waitFor(() => expect(draws.mock.calls.length).toBe(settled + 1), { timeout: 1000 })
    await wait(150)
    expect(draws.mock.calls.length).toBe(settled + 1)

    wrapper.unmount()
  })

  it('draws through the pipeline only on advance in manual mode', async () => {
    const { draws, ctx, wrapper } = mountWithLoop('manual', () => {
      useRenderPipeline(() => {})
    })
    await wait(300)
    ctx.renderer.advance()
    const settled = await settle(draws)

    await wait(150)
    expect(draws.mock.calls.length).toBe(settled)

    ctx.renderer.advance()
    await vi.waitFor(() => expect(draws.mock.calls.length).toBe(settled + 1), { timeout: 1000 })
    await wait(150)
    expect(draws.mock.calls.length).toBe(settled + 1)

    wrapper.unmount()
  })
})
