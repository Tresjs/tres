<script setup lang="ts">
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import type { App, Ref } from 'vue'
import type { TresCamera, TresContextWithClock, TresObject, TresPointerEvent, TresScene } from '../types'
import * as THREE from 'three'
import {
  createRenderer,
  defineComponent,
  Fragment,
  getCurrentInstance,
  h,
  onBeforeUnmount,
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
import { deleteRoot, getRoot, setRoot } from '../core/roots'
import { isScene } from '../utils/is'
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
   * The maximum number of frames per second to render
   * @default undefined
   */
  fpsLimit?: number
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
  error: [error: Error]
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

const createInternalComponent = (context: TresContext, hmrTick: Ref<number>) =>
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

      return () => {
        // Reactive dep: bumping hmrTick in the root forces this render fn to re-run,
        // which re-reads slots.default() and lets Vue diff the vnode tree.
        // eslint-disable-next-line ts/no-unused-expressions
        hmrTick.value
        return h(Fragment, null, slots.default?.() ?? [])
      }
    },
  })

const mountCustomRenderer = (context: TresContext) => {
  const canvas = props.canvas
  if (getRoot(canvas)) { return }

  const hmrTick = shallowRef(0)
  const internalComponent = createInternalComponent(context, hmrTick)
  const renderer = createRenderer(nodeOps({ context, options: props.customRendererOptions }))
  renderer.render(h(internalComponent), scene.value as unknown as TresObject)

  setRoot(canvas, { renderer, internalComponent, hmrTick, context })
}

// `force=false` (internal unmount path) only walks the scene graph — WebGL teardown
// is owned by useRendererManager's own onUnmounted, which fires alongside ours.
// `force=true` (manual TresCanvasInstance.dispose() call) additionally tears down the
// WebGLRenderer explicitly, because the manual call path is NOT backed by Vue's
// unmount lifecycle and useRendererManager won't fire on its own.
const dispose = (context: TresContext, force = false) => {
  disposeObject3D(context.scene.value as unknown as TresObject)
  if (force) {
    context.renderer.instance.dispose()
    if (context.renderer.instance instanceof WebGLRenderer) {
      context.renderer.instance.renderLists.dispose()
      context.renderer.instance.forceContextLoss()
    }
  }
  ;(scene.value as TresScene).__tres = {
    root: context,
    objects: [],
    isUnmounting: true,
  }
}
const context = shallowRef<TresContext>(useTresContextProvider({
  scene: scene.value as TresScene,
  canvas: props.canvas,
  fpsLimit: () => props.fpsLimit ?? Infinity,
  windowSize: props.windowSize ?? false,
  rendererOptions: props,
}))

defineExpose({ context, dispose: () => dispose(context.value, true) })

// HMR: bump the tick so the internal component re-renders and Vue diffs the slot content
const handleHMR = () => {
  const root = getRoot(props.canvas)
  if (root) { root.hmrTick.value++ }
}

const unmountCanvas = () => {
  const root = getRoot(props.canvas)
  if (!root) { return }

  const isTresScene = (value: unknown): value is TresScene => isScene(value) && '__tres' in value
  if (isTresScene(scene.value)) {
    (scene.value as TresScene).__tres.isUnmounting = true
  }

  // `root.renderer` is Vue's custom renderer, NOT the WebGLRenderer.
  // WebGL teardown is owned by `useRendererManager`, which registered its
  // own `onUnmounted` earlier in setup and therefore fires first.
  // By the time we're here, `render(null)` just walks the vnode tree and
  // calls `nodeOps.remove` on every child — which runs user `:dispose`
  // handlers and releases CPU-side three.js state.
  root.renderer.render(null, scene.value as unknown as TresObject)
  dispose(context.value)
  deleteRoot(props.canvas)
}

const { camera, renderer } = context.value
const { registerCamera, cameras, activeCamera, deregisterCamera } = camera

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
  // Now that renderer is initialized, mount the actual scene with slots
  mountCustomRenderer(context.value)
  emit('ready', context.value)

  if (!activeCamera.value) {
    addDefaultCamera()
  }
})

renderer.onError((error) => {
  // Emit renderer initialization errors to parent components
  emit('error', error)
})

// HMR support
if (import.meta.hot) {
  const hmrHandler = () => handleHMR()
  import.meta.hot.on('vite:afterUpdate', hmrHandler)
  onBeforeUnmount(() => {
    import.meta.hot?.off?.('vite:afterUpdate', hmrHandler)
  })
}

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
