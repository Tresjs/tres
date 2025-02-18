import { beforeEach, describe, expect, it, vi } from 'vitest'
import { withRendererProps } from './withRendererProps'
import type { TresContext } from 'src/composables'
import { ref, shallowReactive, toValue } from 'vue'
import { ACESFilmicToneMapping, Color, LinearSRGBColorSpace, LinearToneMapping, NoColorSpace, NoToneMapping, PCFShadowMap, PCFSoftShadowMap, Scene, SRGBColorSpace, VSMShadowMap } from 'three'

describe('withRendererProps', () => {
  let context = { props: shallowReactive({ renderer: {}, shadows: true }), scene: new Scene(), sizes: { width: ref(100), height: ref(100) } } as unknown as TresContext
  beforeEach(() => {
    context = { props: shallowReactive({ renderer: {}, shadows: true }), scene: new Scene(), sizes: { width: ref(100), height: ref(100) } } as unknown as TresContext
  })

  describe('withRendererProps({ props: { renderer } } )', () => {
    it('returns { renderer: shallowRef(renderer), stop: () => {} }', async () => {
      context.props.renderer = { render: () => {} }
      const result = await withRendererProps(context)
      expect(toValue(result.renderer)).toBe(context.props.renderer)
      expect(typeof result.stop).toBe('function')
    })
  })

  describe('`sizes`', () => {
    it('updates call `renderer.setSize(width, height)`', async () => {
      // @ts-expect-error - allow overwriting a read-only value
      context.sizes.width.value = 99
      // @ts-expect-error - allow overwriting a read-only value
      context.sizes.height.value = 100

      const setSize = vi.fn()
      context.props.renderer = { setSize, render: () => {} }
      await withRendererProps(context)
      expect(setSize).toBeCalledWith(99, 100)

      // @ts-expect-error - allow overwriting a read-only value
      context.sizes.width.value = 200
      expect(setSize).toBeCalledWith(200, 100)
      // @ts-expect-error - allow overwriting a read-only value
      context.sizes.height.value = 99
      expect(setSize).toBeCalledWith(200, 99)
    })
  })

  describe('context.props', () => {
    describe('shadows', () => {
      it('updates `renderer.shadowMap.enabled`', async () => {
        context.props.renderer = { shadowMap: { enabled: true }, render: () => {} }
        const renderer = (await withRendererProps(context)).renderer.value

        expect(renderer.shadowMap.enabled).toBe(true)

        context.props.shadows = false
        expect(renderer.shadowMap.enabled).toBe(false)

        context.props.shadows = true
        expect(renderer.shadowMap.enabled).toBe(true)
      })

      it('sets `renderer.shadowMap.enabled` to its initial value if `props.shadows` is `null | undefined`', async () => {
        context.props.renderer = { shadowMap: { enabled: true }, render: () => {} }
        const renderer = (await withRendererProps(context)).renderer.value
        context.props.shadows = false
        expect(renderer.shadowMap.enabled).toBe(false)
        context.props.shadows = null
        expect(renderer.shadowMap.enabled).toBe(true)

        context.props.renderer = { shadowMap: { enabled: false }, render: () => {} }
        const renderer0 = (await withRendererProps(context)).renderer.value
        context.props.shadows = true
        expect(renderer.shadowMap.enabled).toBe(true)
        context.props.shadows = undefined
        expect(renderer0.shadowMap.enabled).toBe(false)
      })

      it('updates `renderer.shadowMap.type` when `props.shadowMapType` is set', async () => {
        context.props.renderer = { shadowMap: { type: PCFShadowMap }, render: () => {} }
        const renderer = (await withRendererProps(context)).renderer.value
        expect(renderer.shadowMap.type).toBe(PCFShadowMap)

        context.props.shadowMapType = PCFSoftShadowMap
        expect(renderer.shadowMap.type).toBe(PCFSoftShadowMap)

        context.props.shadowMapType = VSMShadowMap
        expect(renderer.shadowMap.type).toBe(VSMShadowMap)
      })

      it('sets `renderer.shadowMap.type` to its initial value if `props.shadowMapType` is `null | undefined`', async () => {
        context.props.renderer = { shadowMap: { type: PCFShadowMap }, render: () => {} }
        const renderer = (await withRendererProps(context)).renderer.value
        context.props.shadowMapType = VSMShadowMap
        context.props.shadowMapType = null
        expect(renderer.shadowMap.type).toBe(PCFShadowMap)

        context.props.renderer = { shadowMap: { type: VSMShadowMap }, render: () => {} }
        const renderer0 = (await withRendererProps(context)).renderer.value
        context.props.shadowMapType = PCFShadowMap
        context.props.shadowMapType = undefined
        expect(renderer0.shadowMap.type).toBe(VSMShadowMap)
      })

      it('does not throw if `renderer` has no `shadowMap`', async () => {
        expect(async () => {
          context.props.renderer = { render: () => {} }
          await withRendererProps(context)
          context.props.shadowMapType = PCFSoftShadowMap
        }).not.toThrow()
      })
    })

    describe('toneMapping', () => {
      it('updates `renderer.toneMapping` when `props.toneMapping` is set', async () => {
        context.props.renderer = { toneMapping: NoToneMapping, render: () => {} }
        const renderer = (await withRendererProps(context)).renderer.value

        context.props.toneMapping = LinearToneMapping
        expect(renderer.toneMapping).toBe(LinearToneMapping)

        context.props.toneMapping = NoToneMapping
        expect(renderer.toneMapping).toBe(NoToneMapping)
      })

      it('is set to initial `toneMapping` value if props.toneMapping is `null` or `undefined`', async () => {
        context.props.renderer = { toneMapping: NoToneMapping, render: () => {} }
        const renderer = (await withRendererProps(context)).renderer.value
        context.props.toneMapping = ACESFilmicToneMapping
        context.props.toneMapping = null
        expect(renderer.toneMapping).toBe(NoToneMapping)

        context.props.renderer = { toneMapping: ACESFilmicToneMapping, render: () => {} }
        const renderer0 = (await withRendererProps(context)).renderer.value
        context.props.toneMapping = NoToneMapping
        context.props.toneMapping = null
        expect(renderer0.toneMapping).toBe(ACESFilmicToneMapping)
      })
    })

    describe('toneMappingExposure', () => {
      it('updates `renderer.toneMappingExposure`', async () => {
        context.props.renderer = { toneMappingExposure: 3, render: () => {} }
        const renderer = (await withRendererProps(context)).renderer.value
        expect(renderer.toneMappingExposure).toBe(3)

        context.props.toneMappingExposure = 2
        expect(renderer.toneMappingExposure).toBe(2)

        context.props.toneMappingExposure = 1
        expect(renderer.toneMappingExposure).toBe(1)
      })
    })

    describe('outputColorSpace', () => {
      it('updates `renderer.outputColorSpace`', async () => {
        context.props.renderer = {
          _outputColorSpace: SRGBColorSpace,
          get outputColorSpace() { return this._outputColorSpace },
          set outputColorSpace(c: string) { this._outputColorSpace = c },
          render: () => {},
        }
        context.props.outputColorSpace = SRGBColorSpace
        const renderer = (await withRendererProps(context)).renderer.value
        expect(renderer.outputColorSpace).toBe(SRGBColorSpace)

        context.props.outputColorSpace = LinearSRGBColorSpace
        expect(renderer.outputColorSpace).toBe(LinearSRGBColorSpace)

        context.props.outputColorSpace = NoColorSpace
        expect(renderer.outputColorSpace).toBe(NoColorSpace)
      })

      it('sets `renderer.outputColorSpace` to its initial value if `props.outputColorSpace` is `null | undefined`', async () => {
        context.props.renderer = { outputColorSpace: SRGBColorSpace, render: () => {} }
        context.props.outputColorSpace = NoColorSpace
        const renderer = (await withRendererProps(context)).renderer.value
        expect(renderer.outputColorSpace).toBe(NoColorSpace)

        context.props.outputColorSpace = undefined
        expect(renderer.outputColorSpace).toBe(SRGBColorSpace)
      })
    })

    describe('clearColor', () => {
      it('calls renderer.setClearColor()', async () => {
        const fn = vi.fn()
        context.props.renderer = { setClearColor: fn, render: () => {} }
        context.props.clearColor = 'black'
        await withRendererProps(context)
        expect(fn).toHaveBeenCalledTimes(1)

        context.props.clearColor = 'red'
        expect(fn).toHaveBeenCalledTimes(2)
      })

      it('transforms the argument to a `THREE.Color`', async () => {
        let color = new Color()
        const fn = vi.fn((c: Color) => color = c)
        context.props.renderer = { setClearColor: fn, render: () => {} }
        context.props.clearColor = 'black'
        await withRendererProps(context)
        expect([color.r, color.g, color.b]).toStrictEqual([0, 0, 0])

        context.props.clearColor = 'red'
        expect([color.r, color.g, color.b]).toStrictEqual([1, 0, 0])

        context.props.clearColor = 'blue'
        expect([color.r, color.g, color.b]).toStrictEqual([0, 0, 1])

        context.props.clearColor = '#FF00FF'
        expect([color.r, color.g, color.b]).toStrictEqual([1, 0, 1])

        context.props.clearColor = '#0F0'
        expect([color.r, color.g, color.b]).toStrictEqual([0, 1, 0])
      })
    })
  })
})
