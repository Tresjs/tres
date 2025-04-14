import type { ColorRepresentation, Object3D, WebGLRenderer } from 'three'
import type { UnwrapRef, WatchHandle, WatchOptions } from 'vue'
import { toValue, watch } from 'vue'
import { useDevicePixelRatio } from '@vueuse/core'
import { setPixelRatio } from '../utils'

import { ACESFilmicToneMapping, Mesh } from 'three'
import type { TresCanvasProps } from '../components/TresCanvas.vue'
import type { TresRendererSetupContext } from 'src/composables/useRenderer'

interface PropertyHandler<T = unknown> {
  set: (renderer: WebGLRenderer, value: T) => void
  immediate?: boolean
}

interface DirectProperty {
  key: keyof WebGLRenderer | 'shadowMap.enabled' | 'shadowMap.type' | 'physicallyCorrectLights'
  immediate?: boolean
}

type NamesOfPropsThatCannotChange = keyof Pick<
  TresCanvasProps,
  'antialias' |
  'camera' | // this is handled in useCameras // TODO camera should be handled
  'stencil' |
  'logarithmicDepthBuffer' |
  'preserveDrawingBuffer' |
  'powerPreference' |
  'alpha' |
  'renderer'
>
type NamesOfPropsThatCanChange = keyof Omit<
  TresCanvasProps,
  NamesOfPropsThatCannotChange
>

// const propsToWatch: {
//   [K in NamesOfPropsThatCanChange]: {
//     getter: (props: TresCanvasProps) => TresCanvasProps[K] // TODO check if there is a better type than any
//     setter: (renderer: WebGLRenderer, value: TresCanvasProps[K]) => void
//     watchOptions: WatchOptions
//   }
// } = {
//   clearAlpha: {
//     getter: ({ clearAlpha }) => clearAlpha,
//     setter: (renderer, value) => renderer.setClearAlpha(value),
//     watchOptions: { immediate: true },
//   },
// }

// TODO test by using basic playground

const propsToWatch = {
  clearAlpha: {
    getter: ({ clearAlpha }) => clearAlpha,
    setter: (renderer, value) => {
      renderer.setClearAlpha(toValue(value))
    },
    defaultValue: 1,
    watchOptions: { immediate: true },
  },
  toneMapping: {
    getter: ({ toneMapping }) => toneMapping,
    setter: (renderer, value) => renderer.toneMapping = toValue(value),
    watchOptions: { immediate: true },
    defaultValue: ACESFilmicToneMapping, // TODO move to common place, this is opinionated
  },
} satisfies {
  [K in NamesOfPropsThatCanChange]: {
    getter: (props: TresCanvasProps) => TresCanvasProps[K] // TODO check if there is a better type than any
    setter: (renderer: WebGLRenderer, value: Exclude<UnwrapRef<TresCanvasProps[K]>, undefined>) => void
    watchOptions: WatchOptions
    defaultValue: Exclude<UnwrapRef<TresCanvasProps[K]>, undefined>
  }
}

// Properties that can be set directly on the renderer
const directProperties: Record<string, DirectProperty> = {
  toneMapping: {
    key: 'toneMapping',
    immediate: true,
  },
  toneMappingExposure: {
    key: 'toneMappingExposure',
    immediate: true,
  },
  outputColorSpace: {
    key: 'outputColorSpace',
    immediate: true,
  },
  physicallyCorrectLights: {
    key: 'physicallyCorrectLights',
    immediate: true,
  },
  shadowMapType: {
    key: 'shadowMap.type',
    immediate: true,
  },
  shadows: {
    key: 'shadowMap.enabled',
    immediate: true,
  },
}

// Properties that use setter methods
const rendererPropertyHandlers: Record<string, PropertyHandler<ColorRepresentation | boolean | number>> = {
  clearColor: {
    set: (renderer, value) => {
      // Check if the color string includes alpha (8 characters hex)
      if (typeof value === 'string' && value.length === 9 && value.startsWith('#')) {
        // Extract alpha from the last 2 characters
        const alpha = Number.parseInt(value.slice(7, 9), 16) / 255
        renderer.setClearAlpha(alpha)
        // Set color without alpha
        renderer.setClearColor(value.slice(0, 7))
      }
      else {
        renderer.setClearColor(value as ColorRepresentation)
      }
    },
    immediate: true,
  },
  clearAlpha: {
    set: (renderer, value) => renderer.setClearAlpha(value as number),
    immediate: true,
  },
}

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

  // Watch DPR changes
  watch(() => options.dpr, (value) => {
    if (!value) { return }
    invalidateIfOnDemandMode()
    setPixelRatio(initialRenderer, pixelRatio.value, value as number)
  })

  // Watch size changes
  watch([ctx.sizes.width, ctx.sizes.height], () => {
    initialRenderer.setSize(ctx.sizes.width.value, ctx.sizes.height.value)
    invalidateIfOnDemandMode()
  }, {
    immediate: true,
  })

  Object.values(propsToWatch).forEach(({ getter, setter, watchOptions, defaultValue }) => {
    watch(
      () => getter(options),
      (value) => {
        if (value === undefined) {
          setter(initialRenderer, defaultValue)
        }
        setter(initialRenderer, value)
        invalidateIfOnDemandMode()
      },
      watchOptions,
    )
  })

  // Watch properties that need setter methods
  Object.entries(rendererPropertyHandlers).forEach(([key, handler]) => {
    watch(
      () => options[key],
      (value) => {
        if (value === undefined) { return }
        handler.set(initialRenderer, value)
        invalidateIfOnDemandMode()
      },
      { immediate: handler.immediate },
    )
  })

  // Watch properties that can be set directly
  Object.entries(directProperties).forEach(([key, prop]) => {
    watch(
      () => options[key],
      (value) => {
        if (value === undefined) { return }
        // Handle nested properties (like shadowMap.type)
        const parts = prop.key.split('.')

        if (parts.length > 1) {
          // Handle shadowMap properties specifically
          if (parts[0] === 'shadowMap') {
            const shadowMapKey = parts[1] as keyof typeof initialRenderer.shadowMap
            initialRenderer.shadowMap[shadowMapKey] = value

            // Update materials when shadow properties change
            ctx.scene.value.traverse((child: Object3D) => {
              if (child instanceof Mesh) {
                const material = (child).material
                if (material) {
                  material.needsUpdate = true
                }
              }
            })
          }
        }
        else {
          const key = prop.key as keyof WebGLRenderer
          // Check instance property first, then prototype
          const descriptor = Object.getOwnPropertyDescriptor(initialRenderer, key)
            || Object.getOwnPropertyDescriptor(Object.getPrototypeOf(initialRenderer), key)

          // Get safe properties from directProperties
          const safeToSetProperties = Object.values(directProperties)
            .map(prop => prop.key)
            .filter(key => !key.includes('.')) // Filter out nested properties like shadowMap.type

          if ((descriptor?.writable || safeToSetProperties.includes(key))) {
            const rendererKey = key as keyof Omit<WebGLRenderer, 'coordinateSystem' | 'info'>
            ;(initialRenderer as unknown as Record<string, unknown>)[rendererKey] = value
          }
        }
        invalidateIfOnDemandMode()
      },
      { immediate: prop.immediate },
    )
  })

  return initialRenderer
}
