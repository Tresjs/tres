<script setup lang="ts">
import type { ShallowRef } from 'vue'
import type { RendererOptions, TresContext } from '../composables'
import type { TresCamera, TresContextWithClock, TresPointerEvent, TresScene } from '../types'
import type { TresPointerEventName } from '../utils/pointerEvents'
import type { TresCustomRendererOptions } from '../core/nodeOps'
import { Scene } from 'three'
import * as THREE from 'three'
import { shallowRef } from 'vue'
import { useTresContextManager, useTresContextProvider } from '../composables'
import { extend } from '../core/catalogue'

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

extend(THREE)

const context = shallowRef<TresContext>(useTresContextProvider({
  scene: scene.value as TresScene,
  canvas: props.canvas,
  windowSize: props.windowSize ?? false,
  rendererOptions: props,
}))

const { dispose } = useTresContextManager(scene as ShallowRef<TresScene>, context, props, emit, slots)

defineExpose({ context, dispose: () => dispose(context.value, true) })
</script>
