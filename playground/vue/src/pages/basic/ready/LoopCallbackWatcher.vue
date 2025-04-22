<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { ref, type ShallowRef, shallowRef } from 'vue'

const isCalled = ref(false)

interface TestResult { passed: boolean, msg: string }
const messages = shallowRef([
  {
    passed: false,
    msg: 'callback was not called',
  },
]) as ShallowRef<TestResult[]>

const captureCallback = (renderer: any, _elapsed: number) => {
  if (!isCalled.value) {
    isCalled.value = true
    const isRendererOk = !!renderer
    const domElement = renderer?.domElement
    const isDomElementOk = !!(domElement) && domElement.width > 0 && domElement.height > 0

    messages.value = [
      {
        passed: true,
        msg: 'When the callback was called for the first time ...',
      },
      {
        passed: isRendererOk,
        msg: isRendererOk ? '... the renderer existed.' : '... the renderer did not exist.',
      },
      {
        passed: !!domElement,
        msg: domElement ? '... the canvas existed.' : '... the canvas did not exist.',
      },
      {
        passed: isDomElementOk,
        msg: isDomElementOk
          ? `... the canvas was not degenerate: ${domElement.width} px × ${domElement.height} px.`
          : `... the canvas was degenerate.`,
      },
    ]
  }
}

useLoop().onBeforeRender(({ elapsed: _elapsed, renderer }) => {
  captureCallback(renderer, _elapsed)
})

useLoop().render(({ elapsed: _elapsed, renderer, scene, camera }) => {
  captureCallback(renderer, _elapsed)
  renderer.render(scene, camera)
})

useLoop().onAfterRender(({ elapsed: _elapsed, renderer }) => {
  captureCallback(renderer, _elapsed)
})

defineExpose({
  isCalled,
  messages,
})
</script>
