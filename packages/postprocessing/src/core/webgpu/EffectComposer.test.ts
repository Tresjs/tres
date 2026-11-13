import type { RenderFunction } from '@tresjs/core'
import { useRenderPipeline } from '@tresjs/core/webgpu'
import type { Node, RenderPipeline } from 'three/webgpu'
import type { Color } from 'three'
import { PerspectiveCamera, Vector2 } from 'three'
import { float } from 'three/tsl'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Component, Ref, ShallowRef, VNodeChild } from 'vue'
import { defineComponent, h, nextTick, ref, shallowRef } from 'vue'
import { createStubRenderer, mountInTresContext } from '../../../../core/src/utils/test/tresContext'
import type { EffectStage } from './context'
import { defineEffect } from './defineEffect'
import EffectComposer from './EffectComposer.vue'

vi.mock('@pmndrs/pointer-events', async () => {
  const { Object3D } = await import('three')
  return { forwardHtmlEvents: () => ({ update: () => {}, destroy: () => {} }), getVoidObject: () => new Object3D() }
})

const calls: string[] = []

const createEffect = (name: string) => defineEffect({
  name,
  props: { amount: 1 },
  create: (input, { uniforms }) => {
    calls.push(name)
    return input.add(uniforms.amount)
  },
})

const A = createEffect('A')
const B = createEffect('B')
const C = createEffect('C')

const inputs: Record<string, Node> = {}

const createStagedEffect = (name: string, stage: EffectStage) => defineEffect({
  name,
  stage,
  create: (input) => {
    calls.push(name)
    inputs[name] = input
    return (input as Node).mul(float(1))
  },
})

const Bloom = createStagedEffect('Bloom', 'hdr')
const SMAA = createStagedEffect('SMAA', 'ldr')
const Grain = createStagedEffect('Grain', 'ldr')

const isRenderOutput = (node: Node | undefined) => (node as { isRenderOutputNode?: boolean } | undefined)?.isRenderOutputNode === true

const flush = async () => {
  await nextTick()
  await nextTick()
}

const mountCanvas = (render: () => VNodeChild) => {
  // A zero-size canvas never reports ready, so the real loop does not draw with the stub renderer.
  const domElement = Object.assign(document.createElement('canvas'), { width: 0, height: 0 })
  const content = ref(false)
  const mounted = mountInTresContext(() => content.value ? render() : null, { renderer: createStubRenderer({ domElement }) })
  const { ctx } = mounted
  ctx.camera.registerCamera(new PerspectiveCamera(), true)

  const renderFunctions: RenderFunction[] = []
  const restores: ReturnType<typeof vi.fn>[] = []
  const replace = ctx.renderer.replaceRenderFunction
  ctx.renderer.replaceRenderFunction = (fn) => {
    renderFunctions.push(fn)
    const restore = vi.fn(replace(fn))
    restores.push(restore)
    return restore
  }
  const invalidate = vi.spyOn(ctx.renderer, 'invalidate')

  const show = async () => {
    content.value = true
    await flush()
  }
  return { ...mounted, show, renderFunctions, restores, invalidate }
}

const mountComposer = async (children: () => VNodeChild[], enabled: Ref<boolean> = ref(true)) => {
  const canvas = mountCanvas(() => h(EffectComposer, { enabled: enabled.value }, () => children()))
  await canvas.show()
  return { ...canvas, enabled }
}

afterEach(() => {
  calls.length = 0
  for (const name of Object.keys(inputs)) { delete inputs[name] }
  vi.restoreAllMocks()
})

describe('effectComposer (WebGPU)', () => {
  it('builds the chain in slot order', async () => {
    await mountComposer(() => [h(B), h(A), h(C)])

    expect(calls.slice(-3)).toEqual(['B', 'A', 'C'])
  })

  it('rebuilds in the new order when effects are reordered', async () => {
    const order = ref([A, B, C])
    await mountComposer(() => order.value.map(effect => h(effect, { key: (effect as { name?: string }).name })))
    calls.length = 0

    order.value = [C, A, B]
    await flush()

    expect(calls).toEqual(['C', 'A', 'B'])
  })

  it('rebuilds when an effect is added or removed with v-if', async () => {
    const showB = ref(false)
    await mountComposer(() => [h(A), showB.value ? h(B) : null, h(C)])

    calls.length = 0
    showB.value = true
    await flush()
    expect(calls).toEqual(['A', 'B', 'C'])

    calls.length = 0
    showB.value = false
    await flush()
    expect(calls).toEqual(['A', 'C'])
  })

  it('counts an effect inside a wrapper component at the position of the wrapper', async () => {
    const Wrapper = defineComponent({ setup: () => () => h(B) })
    await mountComposer(() => [h(C), h(Wrapper), h(A)])

    expect(calls.slice(-3)).toEqual(['C', 'B', 'A'])
  })

  it('rebuilds when a wrapper component reorders its own effects', async () => {
    const order = ref([A, B])
    const Wrapper = defineComponent({ setup: () => () => order.value.map(effect => h(effect, { key: (effect as { name?: string }).name })) })
    await mountComposer(() => [h(Wrapper), h(C)])
    calls.length = 0

    order.value = [B, A]
    await flush()

    expect(calls).toEqual(['B', 'A', 'C'])
  })

  it('writes a prop change to the uniform without rebuilding', async () => {
    const amount = ref(1)
    const effect = shallowRef<{ uniforms: { amount: { value: number } } }>()
    const { invalidate } = await mountComposer(() => [h(A, { amount: amount.value, ref: (el: any) => { effect.value = el } })])
    calls.length = 0
    invalidate.mockClear()

    amount.value = 3
    await flush()

    expect(effect.value!.uniforms.amount.value).toBe(3)
    expect(calls).toEqual([])
    expect(invalidate).toHaveBeenCalled()
  })

  it('backs booleans with 0/1 floats and colors with a Color', async () => {
    const Tint = defineEffect({
      name: 'Tint',
      props: { active: true, color: '#ff0000' },
      create: (input, { uniforms }) => input.mul(uniforms.color).mul(uniforms.active),
    })
    const props = ref<Record<string, unknown>>({})
    const effect = shallowRef<{ uniforms: { active: { value: number }, color: { value: Color } } }>()
    await mountComposer(() => [h(Tint, { ...props.value, ref: (el: any) => { effect.value = el } })])

    expect(effect.value!.uniforms.active.value).toBe(1)
    expect(effect.value!.uniforms.color.value.getHexString()).toBe('ff0000')

    const color = effect.value!.uniforms.color.value
    props.value = { active: false, color: '#00ff00' }
    await flush()

    expect(effect.value!.uniforms.active.value).toBe(0)
    expect(effect.value!.uniforms.color.value).toBe(color)
    expect(color.getHexString()).toBe('00ff00')
  })

  it('gives each instance its own uniforms', async () => {
    const effects: any[] = []
    await mountComposer(() => [h(A, { amount: 2, ref: (el: any) => { effects[0] = el } }), h(A, { ref: (el: any) => { effects[1] = el } })])

    expect(effects[0].uniforms.amount).not.toBe(effects[1].uniforms.amount)
    expect(effects[0].uniforms.amount.value).toBe(2)
    expect(effects[1].uniforms.amount.value).toBe(1)
  })

  it('resets a null prop to its default and keeps the value on a type mismatch', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const Shift = defineEffect({
      name: 'Shift',
      props: { offset: new Vector2(1, 2), amount: 1 },
      create: (input, { uniforms }) => input.add(uniforms.offset.x.mul(uniforms.amount)),
    })
    const props = ref<Record<string, unknown>>({ offset: [3, 4], amount: 2 })
    const effect = shallowRef<{ uniforms: { offset: { value: Vector2 }, amount: { value: number } } }>()
    await mountComposer(() => [h(Shift, { ...props.value, ref: (el: any) => { effect.value = el } })])
    const offset = effect.value!.uniforms.offset.value
    expect(offset.toArray()).toEqual([3, 4])

    props.value = { offset: null, amount: null }
    await flush()
    expect(effect.value!.uniforms.offset.value).toBe(offset)
    expect(offset.toArray()).toEqual([1, 2])
    expect(effect.value!.uniforms.amount.value).toBe(1)

    props.value = { offset: 5, amount: 'a lot' }
    await flush()
    expect(offset.toArray()).toEqual([1, 2])
    expect(effect.value!.uniforms.amount.value).toBe(1)
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('Shift: the prop "offset" does not match'))
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('Shift: the prop "amount" does not match'))
  })

  it('keeps the color on an invalid color value', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const Tint = defineEffect({
      name: 'Tint',
      props: { color: '#ff0000' },
      create: (input, { uniforms }) => input.mul(uniforms.color),
    })
    const color = ref<unknown>('#00ff00')
    const effect = shallowRef<{ uniforms: { color: { value: Color } } }>()
    await mountComposer(() => [h(Tint, { color: color.value, ref: (el: any) => { effect.value = el } })])
    const uniform = effect.value!.uniforms.color.value
    expect(uniform.getHexString()).toBe('00ff00')

    for (const invalid of ['not-a-color', '#12345', [1], [0, 'x', 1], Number.NaN]) {
      color.value = invalid
      await flush()
      expect(uniform.getHexString()).toBe('00ff00')
    }
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('Tint: the prop "color" does not match'))

    color.value = [0, 0, 1]
    await flush()
    expect(uniform.getHexString()).toBe('0000ff')
  })

  it('falls back to the default render function while disabled', async () => {
    const { enabled, restores, renderFunctions } = await mountComposer(() => [h(A)])
    expect(restores).toHaveLength(1)

    enabled.value = false
    await flush()
    expect(restores[0]).toHaveBeenCalledOnce()

    calls.length = 0
    enabled.value = true
    await flush()
    expect(renderFunctions).toHaveLength(2)
    expect(calls).toEqual(['A'])
  })

  it('restores normal rendering when the composer unmounts', async () => {
    const show = ref(true)
    const canvas = mountCanvas(() => show.value ? h(EffectComposer, null, () => [h(A)]) : null)
    await canvas.show()
    expect(canvas.restores).toHaveLength(1)

    show.value = false
    await flush()

    expect(canvas.restores[0]).toHaveBeenCalledOnce()
  })

  it('warns when an effect is not inside an EffectComposer', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    await mountCanvas(() => h(A as Component)).show()

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('A must be a child of the EffectComposer'))
  })

  it('disposes the nodes an effect created when it is removed, but not shared ones', async () => {
    const created = vi.fn()
    const shared = vi.fn()
    const sharedNode = float(3)
    sharedNode.addEventListener('dispose', shared)
    const Owned = defineEffect({
      name: 'Owned',
      create: (input) => {
        const node = float(2)
        node.addEventListener('dispose', created)
        return (input as Node).mul(node).mul(sharedNode)
      },
    })
    const show = ref(true)
    await mountComposer(() => [show.value ? h(Owned) : null])

    show.value = false
    await flush()

    expect(created).toHaveBeenCalledOnce()
    expect(shared).not.toHaveBeenCalled()
  })

  describe('hDR / LDR stages', () => {
    const mountStaged = async (children: () => VNodeChild[]) => {
      let pipeline: Readonly<ShallowRef<RenderPipeline | null>> | undefined
      const Probe = defineComponent({
        setup() {
          pipeline = useRenderPipeline().renderPipeline
          return () => null
        },
      })
      const canvas = mountCanvas(() => [h(EffectComposer, null, () => children()), h(Probe)])
      await canvas.show()
      return { ...canvas, pipeline: () => pipeline?.value }
    }

    it.each([
      ['HDR first', () => [h(Bloom), h(SMAA)]],
      ['LDR first', () => [h(SMAA), h(Bloom)]],
    ])('runs the HDR effect before tone mapping and the LDR effect after it (%s)', async (_, children) => {
      vi.spyOn(console, 'warn').mockImplementation(() => {})
      const { pipeline } = await mountStaged(children)

      expect(calls).toEqual(['Bloom', 'SMAA'])
      expect(isRenderOutput(inputs.Bloom)).toBe(false)
      expect(isRenderOutput(inputs.SMAA)).toBe(true)
      expect(pipeline()?.outputColorTransform).toBe(false)
    })

    it('reads tone mapping and color space from the renderer', async () => {
      await mountStaged(() => [h(Bloom), h(SMAA)])
      const output = inputs.SMAA as unknown as { getToneMapping: () => unknown, outputColorSpace: unknown }

      expect(output.getToneMapping()).toBeNull()
      expect(output.outputColorSpace).toBeNull()
    })

    it('keeps slot order inside each stage', async () => {
      vi.spyOn(console, 'warn').mockImplementation(() => {})
      await mountStaged(() => [h(Grain), h(A), h(SMAA), h(Bloom)])

      expect(calls).toEqual(['A', 'Bloom', 'Grain', 'SMAA'])
      expect(isRenderOutput(inputs.Grain)).toBe(true)
      expect(inputs.SMAA).not.toBe(inputs.Grain)
    })

    it('warns when an LDR effect comes before an HDR effect in the slot', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      await mountStaged(() => [h(SMAA), h(Bloom)])

      expect(warn).toHaveBeenCalledWith(expect.stringContaining('an LDR effect comes before an HDR effect'))
    })

    it('warns once while the slot order stays wrong, and again after it was fixed and broken', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const stageWarnings = () => warn.mock.calls.filter(([message]) => String(message).includes('an LDR effect comes before')).length
      const showA = ref(false)
      const order = ref<'wrong' | 'right'>('wrong')
      await mountStaged(() => [
        ...(order.value === 'wrong' ? [h(SMAA, { key: 'SMAA' }), h(Bloom, { key: 'Bloom' })] : [h(Bloom, { key: 'Bloom' }), h(SMAA, { key: 'SMAA' })]),
        showA.value ? h(A, { key: 'A' }) : null,
      ])
      expect(stageWarnings()).toBe(1)

      showA.value = true
      await flush()
      expect(stageWarnings()).toBe(1)

      order.value = 'right'
      showA.value = false
      await flush()
      order.value = 'wrong'
      await flush()
      expect(stageWarnings()).toBe(2)
    })

    it('does not warn when the slot order matches the stages', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      await mountStaged(() => [h(Bloom), h(SMAA), h(Grain)])

      expect(warn).not.toHaveBeenCalledWith(expect.stringContaining('an LDR effect comes before'))
    })

    it('keeps the default output transform without LDR effects, and switches when one is added or removed', async () => {
      const showSMAA = ref(false)
      const { pipeline } = await mountStaged(() => [h(Bloom), showSMAA.value ? h(SMAA) : null])

      expect(isRenderOutput(inputs.Bloom)).toBe(false)
      expect(pipeline()?.outputColorTransform).toBe(true)

      showSMAA.value = true
      await flush()
      expect(isRenderOutput(inputs.SMAA)).toBe(true)
      expect(pipeline()?.outputColorTransform).toBe(false)

      showSMAA.value = false
      await flush()
      expect(pipeline()?.outputColorTransform).toBe(true)
    })
  })
})
