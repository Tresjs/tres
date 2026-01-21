<script setup lang="ts">
import { PerspectiveCamera, Scene } from 'three'
import type { App } from 'vue'
import type { TresCamera, TresContextWithClock, TresObject, TresPointerEvent, TresScene } from '../types'
import * as THREE from 'three'
import {
  createRenderer,
  defineComponent,
  Fragment,
  getCurrentInstance,
  h,
  onMounted,
  onUnmounted,
  provide,
  shallowRef,
  toValue,
  watch,
  watchEffect,
} from 'vue'
import type { RendererOptions, TresContext } from '../composables'
import { useTresContextProvider } from '../composables'
import { INJECTION_KEY as CONTEXT_INJECTION_KEY } from '../composables/useTresContextProvider'
import { extend } from '../core/catalogue'
import type { TresCustomRendererOptions } from '../core/nodeOps'
import { nodeOps } from '../core/nodeOps'
import { disposeObject3D } from '../utils/'
import { registerTresDevtools } from '../devtools'
import { promiseTimeout } from '@vueuse/core'
import type { TresPointerEventName } from '../utils/pointerEvents'

export interface ContextProps extends RendererOptions {
  /**
   * Custom camera instance to use as main camera
   * If not provided, a default PerspectiveCamera will be created
   */
  camera?: TresCamera
  /**
   * Whether the canvas should be sized to the window
   * When true, canvas will be fixed positioned and full viewport size
   * @default false
   */
  windowSize?: boolean
  /**
   * Whether to enable the provide/inject bridge between Vue and TresJS
   * When true, Vue's provide/inject will work across the TresJS boundary
   * @default true
   */
  enableProvideBridge?: boolean
  /**
   * Options for the TresJS custom renderer
   *
   */
  customRendererOptions?: TresCustomRendererOptions
}

export type ContextEmits = {
  ready: [context: TresContext]
  pointermissed: [event: TresPointerEvent]
  render: [context: TresContext]
  beforeLoop: [context: TresContextWithClock]
  loop: [context: TresContextWithClock]
} & {
  // all pointer events are supported because they bubble up
  [key in TresPointerEventName]: [event: TresPointerEvent]
}

const props = defineProps<ContextProps & { canvas: HTMLCanvasElement }>()

const emit = defineEmits<ContextEmits>()

const slots = defineSlots<{
  default: () => any
}>()

/*
 `scene` is defined here and not in `useTresContextProvider` because the custom
 renderer uses it to mount the app nodes. This happens before `useTresContextProvider` is called.
 The custom renderer requires `scene` to be editable (not readonly).
*/
const scene = shallowRef<TresScene | Scene>(new Scene())

const instance = getCurrentInstance()
extend(THREE)

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
    // NOTE: Call renderer.dispose() which also cleans up the renderer cache
    context.renderer.dispose()
  }
  (scene.value as TresScene).__tres = {
    root: context,
    objects: [],
  }
}

const context = shallowRef<TresContext>(useTresContextProvider({
  scene: scene.value as TresScene,
  canvas: props.canvas,
  windowSize: props.windowSize ?? false,
  rendererOptions: props,
}))

// Initialize Scene's __tres with objects array for fragment support
// NOTE: Preserve existing objects during HMR - setup may re-run but text nodes still exist
const existingObjects = (scene.value as TresScene).__tres?.objects
;(scene.value as TresScene).__tres = {
  root: context.value,
  objects: existingObjects || [],
}

defineExpose({ context, dispose: () => dispose(context.value, true) })

const handleHMR = (context: TresContext) => {
  // NOTE: Don't call dispose during HMR - Vue's render will diff and
  // unmount old nodes via nodeOps.remove(), which properly disposes them.
  // Calling dispose first would delete __tres from objects that Vue
  // still needs to access during unmount, breaking sibling tracking.
  mountCustomRenderer(context)
}

const unmountCanvas = () => {
  // NOTE: Render empty first to let Vue properly unmount via nodeOps.remove(),
  // which handles text nodes and disposes THREE objects. Then dispose remaining resources.
  mountCustomRenderer(context.value, true)
  dispose(context.value)
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
    const windowSizePropName: keyof Pick<ContextProps, 'windowSize'> = 'windowSize'
    console.warn(`TresCanvas: The canvas has no area, so nothing can be rendered. Set it manually on the parent element or use the prop ${windowSizePropName}.`)
  }
})

onUnmounted(unmountCanvas)
</script>
