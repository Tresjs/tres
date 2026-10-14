import type { N8AOPostPassInstance, N8AOProps } from './n8ao'
import { logWarning } from '@tresjs/core'
import { flushPromises, mount } from '@vue/test-utils'
import { DepthTexture, PerspectiveCamera, Scene } from 'three'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ShallowRef } from 'vue'
import { defineComponent, reactive, ref, shallowRef } from 'vue'
import N8AOPmndrs from '../core/pmndrs/N8AOPmndrs.vue'
import N8AO from '../core/three/N8AO.vue'
import { effectComposerInjectionKey as threeComposerKey } from '../core/three/EffectComposer.vue'
import { effectComposerInjectionKey as pmndrsComposerKey } from '../core/pmndrs/EffectComposerPmndrs.vue'
import { loadN8AOPostPass, useN8AO } from './n8ao'

const tres = vi.hoisted(() => ({ state: null as unknown }))
vi.mock('@tresjs/core', () => ({ useTres: () => tres.state, isProd: false, logWarning: vi.fn() }))

const createTresState = () => ({
  scene: shallowRef<Scene | undefined>(new Scene()),
  camera: shallowRef<PerspectiveCamera | undefined>(new PerspectiveCamera()),
  sizes: { width: ref(800), height: ref(600) },
  invalidate: vi.fn(),
})

// Same index semantics as the pmndrs composer: `addPass(pass, index?)`
const createComposer = () => {
  const passes: unknown[] = []
  return {
    passes,
    addPass: vi.fn((pass: unknown, index?: number) => { index === undefined ? passes.push(pass) : passes.splice(index, 0, pass) }),
    insertPass: vi.fn((pass: unknown, index: number) => { passes.splice(index, 0, pass) }),
    removePass: vi.fn((pass: unknown) => {
      const index = passes.indexOf(pass)
      if (~index) { passes.splice(index, 1) }
    }),
  }
}

let state: ReturnType<typeof createTresState>

// Load n8ao once up front, so `flushPromises` is enough for a pass to appear after each change
beforeAll(async () => {
  await loadN8AOPostPass()
})

beforeEach(() => {
  state = createTresState()
  tres.state = state
})

afterEach(() => {
  vi.clearAllMocks()
})

const mountUseN8AO = async (props: N8AOProps = {}, composer = createComposer(), loadPassClass = loadN8AOPostPass) => {
  const composerRef = shallowRef<ReturnType<typeof createComposer> | null>(composer)
  const reactiveProps = reactive(props)
  let result!: { pass: ShallowRef<N8AOPostPassInstance | null> }
  const wrapper = mount(defineComponent({
    setup() {
      result = useN8AO(composerRef, {
        loadPassClass,
        createPlaceholder: (): unknown => 'placeholder',
        addPass: (c, pass, index) => c.addPass(pass, index),
      }, reactiveProps)
      return () => null
    },
  }))
  await flushPromises()
  return { wrapper, composer, composerRef, props: reactiveProps, pass: result.pass }
}

describe('useN8AO', () => {
  it('waits for a canvas size before it adds the pass', async () => {
    state.sizes.width.value = 0
    const { composer, pass } = await mountUseN8AO()
    expect(pass.value).toBeNull()

    state.sizes.width.value = 800
    await flushPromises()
    expect(composer.passes).toEqual([pass.value])
  })

  it('adds one pass configured from the props', async () => {
    const { composer, pass } = await mountUseN8AO({ aoRadius: 2, intensity: 1.5, color: '#ff0000', renderMode: 1 })

    expect(composer.passes).toEqual([pass.value])
    expect(pass.value!.configuration.aoRadius).toBe(2)
    expect(pass.value!.configuration.intensity).toBe(1.5)
    expect(pass.value!.configuration.color.getHexString()).toBe('ff0000')
    expect(pass.value!.configuration.renderMode).toBe(1)
  })

  it('restores the n8ao default when a prop is unset', async () => {
    const { pass, props } = await mountUseN8AO({ aoRadius: 2 })

    props.aoRadius = undefined
    await flushPromises()
    expect(pass.value!.configuration.aoRadius).toBe(5)
  })

  it('does not reset settings made on the pass when another prop changes', async () => {
    const { pass, props } = await mountUseN8AO({ aoRadius: 2 })
    pass.value!.setQualityMode('Ultra')

    props.aoRadius = 3
    await flushPromises()
    expect(pass.value!.configuration.aoRadius).toBe(3)
    expect(pass.value!.configuration.aoSamples).toBe(64)
    expect(pass.value!.configuration.denoiseSamples).toBe(16)
  })

  it('turns automatic gamma off only while gammaCorrection is set', async () => {
    const { pass, props } = await mountUseN8AO()
    expect(pass.value!.autosetGamma).toBe(true)

    props.gammaCorrection = false
    await flushPromises()
    expect(pass.value!.autosetGamma).toBe(false)
    expect(pass.value!.configuration.gammaCorrection).toBe(false)

    props.gammaCorrection = undefined
    await flushPromises()
    expect(pass.value!.autosetGamma).toBe(true)
  })

  it('rebuilds the pass at the same index when the camera changes', async () => {
    const composer = createComposer()
    composer.passes.push('render-pass')
    const { pass } = await mountUseN8AO({}, composer)
    composer.passes.push('smaa-pass')
    const oldPass = pass.value!

    const camera = new PerspectiveCamera()
    state.camera.value = camera
    await flushPromises()

    expect(pass.value).not.toBe(oldPass)
    expect((pass.value as unknown as { camera: PerspectiveCamera }).camera).toBe(camera)
    expect(composer.passes).toEqual(['render-pass', pass.value, 'smaa-pass'])
  })

  it('adds a new pass to a new composer', async () => {
    const { composerRef, pass } = await mountUseN8AO()
    const newComposer = createComposer()

    composerRef.value = newComposer
    await flushPromises()
    expect(newComposer.passes).toEqual([pass.value])
  })

  it('keeps its position when a later sibling adds a pass while n8ao loads', async () => {
    const PassClass = await loadN8AOPostPass()
    let finishLoading!: (value: typeof PassClass) => void
    const composer = createComposer()
    composer.passes.push('render-pass')
    const { pass } = await mountUseN8AO({}, composer, () => new Promise((resolve) => { finishLoading = resolve }))
    expect(composer.passes).toEqual(['render-pass', 'placeholder'])

    composer.passes.push('smaa-pass')
    finishLoading(PassClass)
    await flushPromises()

    expect(composer.passes).toEqual(['render-pass', pass.value, 'smaa-pass'])
  })

  it('does not add the pass when the component unmounts while n8ao loads', async () => {
    const PassClass = await loadN8AOPostPass()
    let finishLoading!: (value: typeof PassClass) => void
    const { wrapper, composer, pass } = await mountUseN8AO({}, createComposer(), () => new Promise((resolve) => { finishLoading = resolve }))

    wrapper.unmount()
    finishLoading(PassClass)
    await flushPromises()

    expect(composer.passes).toEqual([])
    expect(pass.value).toBeNull()
  })

  it('removes and disposes the pass on unmount, but not the resources of the composer', async () => {
    const { wrapper, composer, pass } = await mountUseN8AO()
    const instance = pass.value! as unknown as Record<string, any>
    const composerDepthTexture = new DepthTexture(800, 600)
    const renderer = { dispose: vi.fn() }
    instance.depthTexture = composerDepthTexture
    instance.renderer = renderer
    const onDepthTextureDispose = vi.fn()
    const onTargetDispose = vi.fn()
    composerDepthTexture.addEventListener('dispose', onDepthTextureDispose)
    instance.writeTargetInternal.addEventListener('dispose', onTargetDispose)

    wrapper.unmount()

    expect(composer.passes).toEqual([])
    expect(pass.value).toBeNull()
    expect(onTargetDispose).toHaveBeenCalled()
    expect(onDepthTextureDispose).not.toHaveBeenCalled()
    expect(renderer.dispose).not.toHaveBeenCalled()
  })
})

describe('n8ao components', () => {
  it('keeps the n8ao defaults for absent boolean props in N8AOPmndrs', async () => {
    const composer = createComposer()
    const wrapper = mount(N8AOPmndrs, { global: { provide: { [pmndrsComposerKey as symbol]: shallowRef(composer) } } })
    await flushPromises()
    const pass = (wrapper.vm as unknown as { pass: N8AOPostPassInstance }).pass

    expect(composer.passes).toEqual([pass])
    expect(pass.configuration.depthAwareUpsampling).toBe(true)
    expect(pass.configuration.halfRes).toBe(false)
    expect(pass.autosetGamma).toBe(true)
  })

  it('adds the N8AO pass to the three composer with gamma correction on', async () => {
    const composer = createComposer()
    const wrapper = mount(N8AO, { global: { provide: { [threeComposerKey as symbol]: shallowRef(composer) } } })
    await flushPromises()
    const pass = (wrapper.vm as unknown as { pass: N8AOPostPassInstance }).pass

    expect(composer.passes).toEqual([pass])
    expect(pass.configuration.depthAwareUpsampling).toBe(true)
    expect(pass.configuration.gammaCorrection).toBe(true)
  })

  it('warns when a RenderPass comes before the N8AO pass', async () => {
    const composer = createComposer()
    composer.passes.push({ isRenderPass: true })
    mount(N8AO, { global: { provide: { [threeComposerKey as symbol]: shallowRef(composer) } } })
    await flushPromises()

    expect(logWarning).toHaveBeenCalledOnce()
  })

  it('does not warn without a RenderPass before the N8AO pass', async () => {
    mount(N8AO, { global: { provide: { [threeComposerKey as symbol]: shallowRef(createComposer()) } } })
    await flushPromises()

    expect(logWarning).not.toHaveBeenCalled()
  })
})
