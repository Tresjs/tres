import type { N8AOPostPassInstance, N8AOProps } from './n8ao'
import { mount } from '@vue/test-utils'
import { DepthTexture, PerspectiveCamera, Scene } from 'three'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick, reactive, ref, shallowRef } from 'vue'
import N8AOPmndrs from '../core/pmndrs/N8AOPmndrs.vue'
import N8AO from '../core/three/N8AO.vue'
import { effectComposerInjectionKey as threeComposerKey } from '../core/three/EffectComposer.vue'
import { effectComposerInjectionKey as pmndrsComposerKey } from '../core/pmndrs/EffectComposerPmndrs.vue'
import { N8AOPostPass, useN8AO } from './n8ao'

const tres = vi.hoisted(() => ({ state: null as unknown }))
vi.mock('@tresjs/core', () => ({ useTres: () => tres.state }))

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

beforeEach(() => {
  state = createTresState()
  tres.state = state
})

afterEach(() => {
  vi.clearAllMocks()
})

const mountUseN8AO = (props: N8AOProps = {}, composer = createComposer()) => {
  const composerRef = shallowRef<ReturnType<typeof createComposer> | null>(composer)
  const reactiveProps = reactive(props)
  let result!: ReturnType<typeof useN8AO<N8AOPostPassInstance, ReturnType<typeof createComposer>>>
  const wrapper = mount(defineComponent({
    setup() {
      result = useN8AO(composerRef, N8AOPostPass, (c, pass, index) => c.addPass(pass, index), reactiveProps)
      return () => null
    },
  }))
  return { wrapper, composer, composerRef, props: reactiveProps, pass: result.pass }
}

describe('useN8AO', () => {
  it('waits for a canvas size before it adds the pass', async () => {
    state.sizes.width.value = 0
    const { composer, pass } = mountUseN8AO()
    expect(pass.value).toBeNull()

    state.sizes.width.value = 800
    await nextTick()
    expect(composer.passes).toEqual([pass.value])
  })

  it('adds one pass configured from the props', () => {
    const { composer, pass } = mountUseN8AO({ aoRadius: 2, intensity: 1.5, color: '#ff0000', renderMode: 1 })

    expect(composer.passes).toEqual([pass.value])
    expect(pass.value!.configuration.aoRadius).toBe(2)
    expect(pass.value!.configuration.intensity).toBe(1.5)
    expect(pass.value!.configuration.color.getHexString()).toBe('ff0000')
    expect(pass.value!.configuration.renderMode).toBe(1)
  })

  it('restores the n8ao default when a prop is unset', async () => {
    const { pass, props } = mountUseN8AO({ aoRadius: 2 })

    props.aoRadius = undefined
    await nextTick()
    expect(pass.value!.configuration.aoRadius).toBe(5)
  })

  it('does not reset settings made on the pass when another prop changes', async () => {
    const { pass, props } = mountUseN8AO({ aoRadius: 2 })
    pass.value!.setQualityMode('Ultra')

    props.aoRadius = 3
    await nextTick()
    expect(pass.value!.configuration.aoRadius).toBe(3)
    expect(pass.value!.configuration.aoSamples).toBe(64)
    expect(pass.value!.configuration.denoiseSamples).toBe(16)
  })

  it('turns automatic gamma off only while gammaCorrection is set', async () => {
    const { pass, props } = mountUseN8AO()
    expect(pass.value!.autosetGamma).toBe(true)

    props.gammaCorrection = false
    await nextTick()
    expect(pass.value!.autosetGamma).toBe(false)
    expect(pass.value!.configuration.gammaCorrection).toBe(false)

    props.gammaCorrection = undefined
    await nextTick()
    expect(pass.value!.autosetGamma).toBe(true)
  })

  it('rebuilds the pass at the same index when the camera changes', async () => {
    const composer = createComposer()
    composer.passes.push('render-pass')
    const { pass } = mountUseN8AO({}, composer)
    composer.passes.push('smaa-pass')
    const oldPass = pass.value!

    const camera = new PerspectiveCamera()
    state.camera.value = camera
    await nextTick()

    expect(pass.value).not.toBe(oldPass)
    expect((pass.value as unknown as { camera: PerspectiveCamera }).camera).toBe(camera)
    expect(composer.passes).toEqual(['render-pass', pass.value, 'smaa-pass'])
  })

  it('adds a new pass to a new composer', async () => {
    const { composerRef, pass } = mountUseN8AO()
    const newComposer = createComposer()

    composerRef.value = newComposer
    await nextTick()
    expect(newComposer.passes).toEqual([pass.value])
  })

  it('removes and disposes the pass on unmount, but not the resources of the composer', () => {
    const { wrapper, composer, pass } = mountUseN8AO()
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
  it('keeps the n8ao defaults for absent boolean props in N8AOPmndrs', () => {
    const composer = createComposer()
    const wrapper = mount(N8AOPmndrs, { global: { provide: { [pmndrsComposerKey as symbol]: shallowRef(composer) } } })
    const pass = (wrapper.vm as unknown as { pass: N8AOPostPassInstance }).pass

    expect(composer.passes).toEqual([pass])
    expect(pass.configuration.depthAwareUpsampling).toBe(true)
    expect(pass.configuration.halfRes).toBe(false)
    expect(pass.autosetGamma).toBe(true)
  })

  it('adds the N8AO pass to the three composer with gamma correction on', () => {
    const composer = createComposer()
    const wrapper = mount(N8AO, { global: { provide: { [threeComposerKey as symbol]: shallowRef(composer) } } })
    const pass = (wrapper.vm as unknown as { pass: N8AOPostPassInstance }).pass

    expect(composer.passes).toEqual([pass])
    expect(pass.configuration.depthAwareUpsampling).toBe(true)
    expect(pass.configuration.gammaCorrection).toBe(true)
  })
})
