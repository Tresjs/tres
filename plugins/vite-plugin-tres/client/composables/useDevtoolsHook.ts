import { reactive, ref, toRefs } from 'vue'
import type { DevtoolsContextPayload, DevtoolsPerformancePayload, DevtoolsEvent } from '@tresjs/core'

const state = reactive({
  connected: false,
  scene: {},
})

function handlePerformanceEvent(payload: DevtoolsPerformancePayload) {

}

function handleContextEvent(payload: DevtoolsContextPayload) {
  state.scene = { ...payload.scene }
/*   console.count('handleContextEvent') */
}

export function useDevtoolsHook() {
  if (window.parent.parent.__TRES__DEVTOOLS__) return
  
  function cb(event: DevtoolsEvent) {
    state.connected = true

    if (event.type === 'performance') {
      handlePerformanceEvent(event.payload)
    }
    else if (event.type === 'context') {
      handleContextEvent(event.payload)
    }

  }
  // Init devtools hook
  const tresGlobalHook = {
    cb,
  }

  window.parent.parent.__TRES__DEVTOOLS__ = tresGlobalHook

  return {
    state,
    ...toRefs(state),
  }
} 