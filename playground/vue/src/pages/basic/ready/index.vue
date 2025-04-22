<script setup lang="ts">
import type { TresContext } from '@tresjs/core'
import type { ShallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { ref } from 'vue'
import LoopCallbackWatcher from './LoopCallbackWatcher.vue'
import OnTresReadyWatcher from './OnTresReadyWatcher.vue'

interface TestResult { passed: boolean, msg: string }

const onReadyMessages = shallowRef([
  {
    passed: false,
    msg: '@ready callback was not called',
  },
]) as ShallowRef<TestResult[]>

let numOnReadyCalls = 0

const onReady = function (ctx: TresContext) {
  numOnReadyCalls++

  const renderer = ctx.renderer.instance.value
  const domElement = renderer?.domElement
  const isPassedCanvas = domElement.width > 0 && domElement.width > 0
  const isPassedCtx = !!renderer && 'camera' in ctx && !!(ctx.camera.value)

  onReadyMessages.value = [
    {
      passed: true,
      msg: 'When the callback was called ...',
    },
    {
      passed: numOnReadyCalls === 1,
      msg: '... it had not previously been called.',
    },
    {
      passed: isPassedCtx,
      msg: isPassedCtx ? '... TresContext was passed.' : '... TresContext was not passed or was missing elements',
    },
    {
      passed: !!renderer,
      msg: renderer ? '... the renderer existed.' : '... the renderer did not exist.',
    },
    {
      passed: !!domElement,
      msg: domElement ? '... the canvas existed.' : '... the canvas did not exist.',
    },
    {
      passed: isPassedCanvas,
      msg: isPassedCanvas
        ? `... the canvas was not degenerate: ${domElement.width} px × ${domElement.height} px.`
        : `... the canvas was degenerate.`,
    },
  ]
}

const onTresReadyWatcherRef = ref({
  isCalled: false,
  messages: [] as TestResult[],
})

const loopCallbackWatcherRef = ref({
  isCalled: false,
  messages: [] as TestResult[],
})
</script>

<template>
  <div class="overlay">
    <h1>When is Tres ready?</h1>
    <p>
      Tres is "ready" if either:
    </p>
    <ul>
      <li>
        The scene can be meaningfully rendered.
      </li>
      <ul>
        <li>the renderer exists</li>
        <li>the canvas width and height are > 0</li>
      </ul>
      <li>Tres has waited 100 ms - assumes setup is intentionally degenerate.</li>
    </ul>
    <hr />
    <h1>"ready" in user space</h1>
    <h2><code>&lt;TresCanvas @ready="(ctx:TresContext) => {}"&gt;</code></h2>
    <p>A callback can be defined in the <code>&lt;script setup /&gt;</code> of a &lt;TresCanvas&gt;.</p>
    <ul>
      <li
        v-for="({ passed, msg }, i) of onReadyMessages"
        :key="i"
        :class="passed ? 'pass' : 'fail'"
      >
        <span>{{ passed ? "✅" : "❌" }} {{ msg }}</span>
      </li>
    </ul>
    <h2><code>onTresReady((ctx:TresContext) => {})</code></h2>
    <p><code>onTresReady</code> can only be called in a child component.</p>
    <ul>
      <li
        v-for="({ passed, msg }, i) of onTresReadyWatcherRef.messages"
        :key="i"
        :class="passed ? 'pass' : 'fail'"
      >
        <span>{{ passed ? "✅" : "❌" }} {{ msg }}</span>
      </li>
    </ul>
    <h2><code>useLoop()...(callback)</code></h2>
    <p><code>useLoop</code> can only be called in a child component.</p>
    <ul>
      <li
        v-for="({ passed, msg }, i) of loopCallbackWatcherRef.messages"
        :key="i"
        :class="passed ? 'pass' : 'fail'"
      >
        <span>{{ passed ? "✅" : "❌" }} {{ msg }}</span>
      </li>
    </ul>
    <hr />
    <h1>Context</h1>
    <p>
      <a href="https://github.com/Tresjs/tres/issues/595">See this Github issue for further explanation.</a>
    </p>
  </div>
  <TresCanvas clear-color="gray" @ready="onReady">
    <LoopCallbackWatcher ref="loopCallbackWatcherRef" />
    <OnTresReadyWatcher ref="onTresReadyWatcherRef" />
    <TresMesh>
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>

<style scoped>
.overlay {
  position: fixed;
  z-index: 1000;
  margin: 10px;
  padding: 10px;
  border-radius: 6px;
  max-width: 400px;
  font-family: sans-serif;
  font-size: small;
  background-color: white;
}

.overlay .pass {
  color: green;
}

.overlay .fail {
  color: red;
}

.overlay li {
  padding-left: 0;
  margin-left: 0;
}
.overlay ul {
  padding-left: 0;
  margin-left: 1.5em;
}
</style>
