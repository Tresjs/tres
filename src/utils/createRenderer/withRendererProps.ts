import type { TresContext } from 'src/composables'
import { clamp } from 'three/src/math/MathUtils.js'
import { createRenderer } from './createRenderer'
import { type ShallowRef, shallowRef, watch, watchEffect } from 'vue'
import { useDevicePixelRatio } from '@vueuse/core'
import * as is from '../is'
import { normalizeColor } from '../normalize'
import type { Renderer } from '../../types'

export async function withRendererProps(context: TresContext): Promise<{ renderer: ShallowRef<Renderer>, stop: () => void }> {
  const renderer = shallowRef({ render: () => {}, dispose: () => {} } as Renderer)
  const defaults = shallowRef({} as Record<string, any>)

  const stopRenderer = watch(() => context.props.renderer, () => {
    'dispose' in renderer.value && is.fun(renderer.value.dispose) && renderer.value.dispose()
    'forceContextLoss' in renderer.value && is.fun(renderer.value.forceContextLoss) && renderer.value.forceContextLoss()
    renderer.value = { render: () => {}, dispose: () => {} }

    createRenderer(context).then((r) => {
      defaults.value = Object.entries(r).filter(([_, v]) => !is.obj(v) && !is.fun(v) && !is.arr(v)).reduce((defaults, [k, v]) => { defaults[k] = v; return defaults }, {} as Record<string, any>)
      if (r.shadowMap) {
        defaults.value.shadowMap = Object.entries(r.shadowMap).filter(([_, v]) => !is.obj(v) && !is.fun(v) && !is.arr(v)).reduce((shadowMap, [k, v]) => { shadowMap[k] = v; return shadowMap }, {} as Record<string, any>)
      }
      if (r.outputColorSpace) {
        defaults.value.outputColorSpace = r.outputColorSpace
      }

      delete defaults.value.clearColor
      renderer.value = r
    })
  }, { immediate: true }).stop

  const { stop: stopSizes } = watchEffect(() => {
    renderer.value.setSize && renderer.value.setSize(context.sizes.width.value, context.sizes.height.value)
  }, { flush: 'sync' })

  const { pixelRatio, stop: stopPixelRatio } = useDevicePixelRatio()
  const { stop: stopDpr } = watchEffect(() => {
    if (!renderer.value.setPixelRatio) { return }
    if (is.arr(context.props.dpr) && context.props.dpr.length >= 2) {
      renderer.value.setPixelRatio(clamp(context.props.dpr[0], context.props.dpr[1], pixelRatio.value))
    }
    else if (is.num(context.props.dpr)) {
      renderer.value.setPixelRatio(context.props.dpr)
    }
    else {
      renderer.value.setPixelRatio(pixelRatio.value)
    }
  })

  const { stop: stopShadows } = watchEffect(() => {
    if (('shadowMap' in renderer.value) && defaults.value.shadowMap) {
      renderer.value.shadowMap.enabled = context.props.shadows ?? defaults.value.shadowMap.enabled
      renderer.value.shadowMap.needsUpdate = true
    }
  }, { flush: 'sync' })

  const { stop: stopShadowMapType } = watchEffect(() => {
    if (('shadowMap' in renderer.value) && defaults.value.shadowMap) {
      renderer.value.shadowMap.type = context.props.shadowMapType ?? defaults.value.shadowMap.type
      renderer.value.shadowMap.needsUpdate = true
    }
  }, { flush: 'sync' })

  const { stop: stopClearColor } = watchEffect(() => {
    if ('setClearColor' in renderer.value && context.props.clearColor) {
      renderer.value.setClearColor(normalizeColor(context.props.clearColor))
    }
  }, { flush: 'sync' })

  const { stop: stopAllOtherProps } = watchEffect(() => {
    const otherProps = Object.entries(context.props).filter(([k, _]) => k in defaults.value)
    for (const [key, value] of otherProps) {
      if (key in renderer.value) {
        renderer.value[key] = value ?? defaults.value[key]
      }
    }
  }, { flush: 'sync' })

  return {
    renderer,
    stop: () => {
      stopRenderer()
      stopSizes()
      stopPixelRatio()
      stopDpr()
      stopShadows()
      stopShadowMapType()
      stopClearColor()
      stopAllOtherProps()
      renderer.value.dispose()
      renderer.value.forceContextLoss?.()
    },
  }
}
