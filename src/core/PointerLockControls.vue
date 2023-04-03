<script lang="ts" setup>
import { ref, defineExpose, watch, onUnmounted } from 'vue'
import { PointerLockControls } from 'three-stdlib'
import { Camera } from 'three'
import { useCientos } from './useCientos'

export interface PointerLockControlsProps {
  /**
   * Whether to make this the default controls.
   *
   * @default false
   * @type {boolean}
   * @memberof PointerLockControlsProps
   * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
   */
  makeDefault?: boolean
  /**
   * The camera to control.
   *
   * @default false
   * @type {boolean}
   * @memberof PointerLockControlsProps
   * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
   */
  camera?: Camera
  /**
   * The dom element to listen to.
   *
   * @type {HTMLElement}
   * @memberof PointerLockControlsProps
   * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
   */
  domElement?: HTMLElement
  /**
   * The trigger id.
   *
   * @type {string}
   * @memberof PointerLockControlsProps
   * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
   */
   triggerId?: string
}

const props = withDefaults(defineProps<PointerLockControlsProps>(), {
  makeDefault: false,
})

const { state, setState, extend } = useCientos()

const controls = ref<null | PointerLockControls>(null)

extend({ PointerLockControls })

watch(controls, value => {
  if (value && props.makeDefault) {
    setState('controls', value)
  } else {
    setState('controls', null)
  }
  addTrigger(value)
})

const addDefaultButton = () => {
  let buttonNode = document.createElement("button");
  let textNode = document.createTextNode("lock");
  buttonNode.appendChild(textNode);
  buttonNode.classList.add("default-button")
  return buttonNode;
}

const isTriggerNode = document.getElementById(props.triggerId || '')
const triggerNode = isTriggerNode ? isTriggerNode : addDefaultButton()
const isVisible = triggerNode.offsetWidth > 0 || triggerNode.offsetHeight > 0;

if(isVisible){
  triggerNode.classList.add("default-button")
}

const addTrigger = (controls: PointerLockControls) => {
  const selector = controls?.domElement?.ownerDocument?.querySelector(
    'canvas'
  ) as HTMLElement

    selector.parentNode?.appendChild(triggerNode as Node);

   controls.addEventListener( 'lock', () => {
    triggerNode.style.display = 'none';
   });
   controls.addEventListener( 'unlock', () => {
    triggerNode.style.display = 'block';
   });
   triggerNode.addEventListener('click', () => {
      controls.lock();
    })
  }

  onUnmounted(() => {
    controls.value?.removeEventListener( 'lock', () => {
    triggerNode.style.display = 'none';
   });
   controls.value?.removeEventListener( 'unlock', () => {
    triggerNode.style.display = 'block';
   });
   triggerNode.removeEventListener('click', () => {
      controls.value?.lock();
    })
  })

defineExpose({
  value: controls,
})


</script>

<template>
  <TresPointerLockControls
  v-if="state.camera && state.renderer"
  ref="controls"
  :args="[state.camera || camera, state.renderer?.domElement || domElement]"
  />
</template>
<style>
.default-button{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
}
</style>
