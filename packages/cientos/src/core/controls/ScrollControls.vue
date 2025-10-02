<script setup lang="ts">
import { logWarning, useLoop, useTresContext } from '@tresjs/core'
import { useScroll, useWindowScroll, useWindowSize } from '@vueuse/core'
import { ref, shallowRef, watch } from 'vue'

export interface ScrollControlsProps {
  /**
   * The scroll size.
   *
   * @type {number}
   * @default 4
   * @memberof ScrollControlsProps
   */
  pages?: number
  /**
   * The distance to move the camera.
   *
   * @type {number}
   * @default 4
   * @memberof ScrollControlsProps
   */
  distance?: number
  /**
   * The smooth factor of the scrolling.
   *
   * @type {number}
   * @default 0.1
   * @memberof ScrollControlsProps
   */
  smoothScroll?: number
  /**
   * Whether the scroll is horizontal or vertical.
   *
   * @type {boolean}
   * @default false
   * @memberof ScrollControlsProps
   */
  horizontal?: boolean
  /**
   * Whether to use the HTML scroll.
   *
   * @type {boolean}
   * @default false
   * @memberof ScrollControlsProps
   */
  htmlScroll?: boolean
}

const props = withDefaults(
  defineProps<{
    pages?: number
    distance?: number
    smoothScroll?: number
    horizontal?: boolean
    htmlScroll?: boolean
  }>(),
  {
    pages: 4,
    distance: 4,
    smoothScroll: 0.1,
    horizontal: false,
    htmlScroll: false,
  },
)

const emit = defineEmits(['update:modelValue'])

if (props.smoothScroll < 0) { logWarning('SmoothControl must be greater than zero') }
if (props.pages < 0) { logWarning('Pages must be greater than zero') }

const { camera, controls, renderer } = useTresContext()

watch(props, () => {
  renderer.invalidate()
})
const wrapperRef = shallowRef()
const scrollContainer = document.createElement('div')

const { y: windowY } = useWindowScroll()
const { x: containerX, y: containerY, isScrolling } = useScroll(scrollContainer)

const { height, width } = useWindowSize()

let initCameraPos = 0
const initialized = ref(false)

const progress = ref(0)
const progressScroll = ref(0)
const scrollNodeY = ref(0)
const direction = props.horizontal ? 'x' : 'y'

const unWatch = watch(
  camera.activeCamera,
  (value) => {
    if (initialized.value) {
      unWatch()
      return
    }
    initCameraPos = props.horizontal ? value?.position.x || 0 : value?.position.y || 0
    initialized.value = true
  },
  {
    immediate: true,
  },
)

watch(
  isScrolling,
  (value) => {
    if (controls.value) { controls.value.enabled = !value }
  },
  {
    immediate: true,
  },
)

watch(windowY, (value) => {
  if (!isScrolling.value && !props.htmlScroll) { return }
  progressScroll.value = (value / height.value / (scrollNodeY.value / height.value - 1))
  progress.value = -1 * progressScroll.value
  emit('update:modelValue', progressScroll.value)
})
watch(containerY, (value) => {
  progressScroll.value = (value / height.value / (scrollNodeY.value / height.value))
  progress.value = -1 * progressScroll.value
  emit('update:modelValue', progressScroll.value)
})
watch(containerX, (value) => {
  progressScroll.value = (value / width.value / (scrollNodeY.value / width.value - 1))
  progress.value = +progressScroll.value
  emit('update:modelValue', progressScroll.value)
})

watch(
  renderer.instance,
  (value) => {
    const canvas = value?.domElement
    if (props.htmlScroll && value?.domElement) {
      // use window scroll only Y axis
      if (canvas?.style.width && canvas?.style.position && canvas?.style.top && canvas?.style.left) {
        canvas.style.width = '100%'
        canvas.style.position = 'fixed'
        canvas.style.zIndex = ' -99999'
        canvas.style.top = '0'
        canvas.style.left = '0'
      }
      scrollNodeY.value = document.body.scrollHeight
    }
    else {
      const fixed = document.createElement('div')
      const fill = document.createElement('div')

      scrollContainer.style[props.horizontal ? 'overflowX' : 'overflowY'] = 'auto'
      scrollContainer.style[props.horizontal ? 'overflowY' : 'overflowX'] = 'hidden'
      scrollContainer.style.position = 'absolute'
      scrollContainer.style.width = '100%'
      scrollContainer.style.height = ' 100%'
      scrollContainer.style.top = '0'
      scrollContainer.style.left = '0'
      scrollContainer.classList.add('scrollContainer')

      fixed.style.position = 'sticky'
      fixed.style.top = '0px'
      fixed.style.left = '0px'
      fixed.style.width = '100%'
      fixed.style.height = '100%'
      fixed.style.overflow = 'hidden'
      scrollContainer.appendChild(fixed)

      fill.style.height = props.horizontal ? '100%' : `${height.value * props.pages}px`
      fill.style.width = props.horizontal ? `${width.value * props.pages}px` : '100vw'
      fill.style.pointerEvents = 'none'
      canvas.style.position = 'fixed'
      canvas.style.zIndex = '0'
      if (canvas?.style.width) {
        canvas.style.width = '100%'
      }
      scrollContainer.appendChild(fill)
      if (value?.domElement.parentNode) {
        (value.domElement.parentNode as HTMLElement).style.position = 'relative'
      }
      value?.domElement?.parentNode?.appendChild(scrollContainer)
      scrollNodeY.value = props.horizontal ? width.value * props.pages : height.value * props.pages
    }
  },
  {
    immediate: true,
  },
)

const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  if (camera.activeCamera.value?.position) {
    const delta
      = (progress.value * props.distance - camera.activeCamera.value.position[direction] + initCameraPos) * props.smoothScroll

    camera.activeCamera.value.position[direction] += delta
    if (wrapperRef.value.children.length > 0) {
      wrapperRef.value.position[direction] += delta
    }

    // TODO: comment this until invalidate is back in the loop callback on v5
    // invalidate()
  }
})

defineExpose({
  instance: wrapperRef,
})
</script>

<template>
  <TresGroup ref="wrapperRef">
    <slot></slot>
  </TresGroup>
</template>
