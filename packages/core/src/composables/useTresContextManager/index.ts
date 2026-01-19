import type { App, ShallowRef } from 'vue'
import type { TresCanvasProps } from '../../components'
import type { TresObject, TresScene } from '../../types'
import type { TresContext } from '../useTresContextProvider'
import { promiseTimeout } from '@vueuse/core'
import { PerspectiveCamera, WebGLRenderer } from 'three'
import {
  createRenderer,
  defineComponent,
  Fragment,
  getCurrentInstance,
  h,
  onMounted,
  onUnmounted,
  provide,
  toValue,
  watch,
  watchEffect,
} from 'vue'
import { extend } from '../../core/catalogue'
import { nodeOps } from '../../core/nodeOps'
import { registerTresDevtools } from '../../devtools'
import { disposeObject3D } from '../../utils'
import { INJECTION_KEY as CONTEXT_INJECTION_KEY } from '../useTresContextProvider'

export function useTresContextManager(
  scene: ShallowRef<TresScene>,
  context: ShallowRef<TresContext>,
  props: TresCanvasProps,
  emit: ReturnType<typeof defineEmits>,
  slots: ReturnType<typeof defineSlots>,
) {
  const instance = getCurrentInstance()

  const createInternalComponent = (context: TresContext, empty = false) =>
    defineComponent({
      setup() {
        const ctx = getCurrentInstance()?.appContext
        if (ctx) { ctx.app = instance?.appContext.app as App }
        const provides: { [key: string | symbol]: unknown } = {}

        // Helper function to recursively merge provides from parents
        function mergeProvides(currentInstance: any) {
          if (!currentInstance) { return }

          // Recursively process the parent instance
          if (currentInstance.parent) {
            mergeProvides(currentInstance.parent)
          }
          // Extract provides from the current instance and merge them
          if (currentInstance.provides) {
            Object.assign(provides, currentInstance.provides)
          }
        }

        // Start the recursion from the initial instance
        if (instance?.parent && props.enableProvideBridge) {
          mergeProvides(instance.parent)

          Reflect.ownKeys(provides)
            .forEach((key) => {
              provide(key, provides[key])
            })
        }

        provide(CONTEXT_INJECTION_KEY, context)
        provide('extend', extend)

        if (typeof window !== 'undefined' && ctx?.app) {
          registerTresDevtools(ctx?.app, context)
        }
        return () => h(Fragment, null, !empty ? slots.default() : [])
      },
    })

  const mountCustomRenderer = (context: TresContext, empty = false) => {
    const InternalComponent = createInternalComponent(context, empty)
    const { render } = createRenderer(nodeOps({ context, options: props.customRendererOptions }))
    render(h(InternalComponent), scene.value as unknown as TresObject)
  }

  const dispose = (context: TresContext, force = false) => {
    disposeObject3D(context.scene.value as unknown as TresObject)
    if (force) {
      context.renderer.instance.dispose()
      if (context.renderer.instance instanceof WebGLRenderer) {
        context.renderer.instance.renderLists.dispose()
        context.renderer.instance.forceContextLoss()
      }
    }
    (scene.value as TresScene).__tres = {
      root: context,
    }
  }

  const handleHMR = (context: TresContext) => {
    dispose(context)
    mountCustomRenderer(context)
  }

  const unmountCanvas = () => {
    dispose(context.value)
    mountCustomRenderer(context.value, true)
  }

  const { camera, renderer } = context.value
  const { registerCamera, cameras, activeCamera, deregisterCamera } = camera

  mountCustomRenderer(context.value)

  const addDefaultCamera = () => {
    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.set(3, 3, 3)
    camera.lookAt(0, 0, 0)
    registerCamera(camera)

    const unwatch = watchEffect(() => {
      if (cameras.value.length >= 2) {
        camera.removeFromParent()
        deregisterCamera(camera)
        unwatch?.()
      }
    })
  }

  context.value.events.onPointerMissed((event) => {
    emit('pointermissed', event)
  })

  watch(
    () => props.camera,
    (newCamera, oldCamera) => {
      if (newCamera) {
        registerCamera(toValue(newCamera), true)
      }
      if (oldCamera) {
        toValue(oldCamera).removeFromParent()
        deregisterCamera(toValue(oldCamera))
      }
    },
    {
      immediate: true,
    },
  )

  if (!activeCamera.value) {
    addDefaultCamera()
  }

  renderer.onRender(() => {
    if (context.value) {
      emit('render', context.value)
    }
  })

  renderer.loop.onLoop((loopContext) => {
    if (context.value) {
      emit('loop', { ...context.value, ...loopContext })
    }
  })

  renderer.loop.onBeforeLoop((loopContext) => {
    if (context.value) {
      emit('beforeLoop', { ...context.value, ...loopContext })
    }
  })

  renderer.onReady(() => {
    emit('ready', context.value)
  })

  // HMR support
  if (import.meta.hot) { import.meta.hot.on('vite:afterUpdate', () => handleHMR(context.value as TresContext)) }

  // warn if the canvas has no area
  onMounted(async () => {
    await promiseTimeout(3000)

    if (!context.value.sizes.width || !context.value.sizes.height.value) {
      const windowSizePropName: keyof Pick<TresCanvasProps, 'windowSize'> = 'windowSize'
      console.warn(`TresCanvas: The canvas has no area, so nothing can be rendered. Set it manually on the parent element or use the prop ${windowSizePropName}.`)
    }
  })

  onUnmounted(unmountCanvas)

  return { dispose }
}
