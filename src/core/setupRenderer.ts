import type { Object3D, ToneMapping, WebGLRenderer } from 'three'
import { computed, toValue, watch } from 'vue'
import { useDevicePixelRatio } from '@vueuse/core'
import { setPixelRatio } from '../utils'

import { ACESFilmicToneMapping, Material, Mesh, PCFSoftShadowMap, SRGBColorSpace } from 'three'
import type { TresCanvasProps } from '../components/TresCanvas.vue'
import type { TresRendererSetupContext } from 'src/composables/useRenderer'

type NamesOfPropsThatCannotChange = keyof Pick<
  TresCanvasProps,
  'depth' |
  'alpha' |
  'camera' | // this is handled in useCameras // TODO camera should be handled
  'stencil' |
  'renderer' |
  'antialias' |
  'precision' |
  'powerPreference' |
  'premultipliedAlpha' |
  'preserveDrawingBuffer' |
  'logarithmicDepthBuffer' |
  'failIfMajorPerformanceCaveat'
>

type NamesOfPropsThatCanChange = keyof Omit<
  TresCanvasProps,
  NamesOfPropsThatCannotChange
>

// TODO test by using basic playground

// Modified setup function to handle both types of properties
export function setupWebGLRenderer( // TODO object format? // TODO name like comosable
  initialRenderer: WebGLRenderer,
  options: TresCanvasProps,
  ctx: TresRendererSetupContext,
) {
  const { pixelRatio } = useDevicePixelRatio()
  const { invalidate } = ctx

  function invalidateIfOnDemandMode() {
    if (options.renderMode === 'on-demand') {
      invalidate()
    }
  }

  // Watch size changes
  watch([ctx.sizes.width, ctx.sizes.height], () => {
    initialRenderer.setSize(ctx.sizes.width.value, ctx.sizes.height.value)
    invalidateIfOnDemandMode()
  }, {
    immediate: true,
  })

  const createWatcher = <T>({
    getFromProps,
    setOnRenderer,
    immediate,
    defaultValue,
  }: {
    getFromProps: (props: TresCanvasProps) => T | undefined // TODO check if there is a better type than any
    setOnRenderer: (renderer: WebGLRenderer, value: T) => void
    immediate?: boolean // TODO think about turning this around
    defaultValue: T
  }) =>
    watch(
      () => getFromProps(options),
      (value) => {
        setOnRenderer(
          initialRenderer,
          value === undefined
            ? defaultValue
            : value,
        )
        invalidateIfOnDemandMode()
      },
      { immediate },
    )

  const clearColorAndAlpha = computed(() => {
    const clearColor = toValue(options.clearColor)
    const clearAlpha = toValue(options.clearAlpha)

    const isClearColorWithAlpha = typeof clearColor === 'string' && clearColor.length === 9 && clearColor.startsWith('#')

    if (isClearColorWithAlpha && clearAlpha !== undefined) {
      throw new Error('clearColor and clearAlpha cannot both be set')
    }

    if (isClearColorWithAlpha) {
      return {
        alpha: Number.parseInt(clearColor.slice(7, 9), 16) / 255,
        color: clearColor.slice(0, 7),
      }
    }

    return {
      alpha: clearAlpha,
      color: clearColor,
    }
  })

  const forceMaterialUpdate = () =>
    ctx.scene.value.traverse((child: Object3D) => {
      if (child instanceof Mesh && child.material instanceof Material) {
        child.material.needsUpdate = true
      }
    })

  const x: Record<NamesOfPropsThatCanChange, ReturnType<typeof createWatcher>> = {
    toneMapping: createWatcher<ToneMapping>({
      getFromProps: ({ toneMapping }) => toValue(toneMapping),
      setOnRenderer: (renderer, value) => renderer.toneMapping = value,
      immediate: true,
      defaultValue: ACESFilmicToneMapping,
    }),
    clearColor: createWatcher({
      getFromProps: () => clearColorAndAlpha.value.color, // TODO name getFromProps doesn't fit anymore
      setOnRenderer: (renderer, value) => renderer.setClearColor(value),
      immediate: true,
      defaultValue: '#000000',
    }),
    clearAlpha: createWatcher({
      getFromProps: () => clearColorAndAlpha.value.alpha,
      setOnRenderer: (renderer, value) => renderer.setClearAlpha(value),
      immediate: true,
      defaultValue: 1,
    }),
    dpr: createWatcher({
      getFromProps: ({ dpr }) => toValue(dpr),
      setOnRenderer: (renderer, value) => setPixelRatio(renderer, pixelRatio.value, value),
      defaultValue: undefined,
    }),
    outputColorSpace: createWatcher({
      getFromProps: ({ outputColorSpace }) => toValue(outputColorSpace),
      setOnRenderer: (renderer, value) => renderer.outputColorSpace = value,
      immediate: true,
      defaultValue: SRGBColorSpace,
    }),
    toneMappingExposure: createWatcher({
      getFromProps: ({ toneMappingExposure }) => toValue(toneMappingExposure),
      setOnRenderer: (renderer, value) => renderer.toneMappingExposure = value,
      immediate: true,
      defaultValue: 1,
    }),
    shadows: createWatcher({
      getFromProps: ({ shadows }) => toValue(shadows),
      setOnRenderer: (renderer, value) => {
        renderer.shadowMap.enabled = value
        forceMaterialUpdate()
      },
      immediate: true,
      defaultValue: false,
    }),
    shadowMapType: createWatcher({
      getFromProps: ({ shadowMapType }) => toValue(shadowMapType),
      setOnRenderer: (renderer, value) => {
        renderer.shadowMap.type = value
        forceMaterialUpdate()
      },
      immediate: true,
      defaultValue: PCFSoftShadowMap,
    }),
  }

  return initialRenderer
}
