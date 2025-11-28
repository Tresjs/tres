<script setup lang="ts">
import type { ShallowRef } from 'vue'
import type { TresContext } from '../composables'
import type { TresScene } from '../types'
import type { TresCanvasEmits, TresCanvasProps } from './types'
import { Scene } from 'three'
import * as THREE from 'three'
import { shallowRef } from 'vue'
import { useTresContextManager, useTresContextProvider } from '../composables'
import { extend } from '../core/catalogue'

const props = defineProps<TresCanvasProps & { canvas: HTMLCanvasElement }>()

const emit = defineEmits<TresCanvasEmits>()

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
