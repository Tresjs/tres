<script setup lang="ts">
import { onTresReady, type TresContext } from '@tresjs/core'
import { ref, type ShallowRef, shallowRef } from 'vue'

const isCalled = ref(false)

interface TestResult { passed: boolean, msg: string }
const messages = shallowRef([
  {
    passed: false,
    msg: 'callback was not called',
  },
]) as ShallowRef<TestResult[]>

const captureCallback = (ctx: TresContext) => {
  if (isCalled.value) {
    messages.value = [
      {
        passed: false,
        msg: 'Callback was called twice.',
      },
    ]
  }
  if (!isCalled.value) {
    isCalled.value = true
    const isCtxOk = !!(ctx && 'renderer' in ctx && 'scene' in ctx)
    const renderer = ctx.renderer.value
    const isRendererOk = !!renderer
    const domElement = renderer?.domElement
    const isDomElementOk = !!(domElement) && domElement.width > 0 && domElement.height > 0

    messages.value = [
      {
        passed: true,
        msg: 'When the callback was called ...',
      },
      {
        passed: true,
        msg: '... it had not previously been called.',
      },
      {
        passed: isCtxOk,
        msg: isCtxOk ? '... TresContext was passed.' : '... TresContext was not passed.',
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

onTresReady(captureCallback)

defineExpose({
  isCalled,
  messages,
})
</script>
