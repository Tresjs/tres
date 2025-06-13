import { useRafFn } from '@vueuse/core'
import { createPriorityEventHook } from '../utils/createPriorityEventHook'

interface TODO {
}

export const useCreateRenderLoop = () => { // TODO think about name
  const eventHooks = {
    beforeRender: createPriorityEventHook<TODO>(),
    render: createPriorityEventHook<TODO>(),
    afterRender: createPriorityEventHook<TODO>(),
  }

  const { pause, resume, isActive } = useRafFn(() => {
    eventHooks.beforeRender.trigger({})
    eventHooks.render.trigger({})
    eventHooks.afterRender.trigger({})
  }, {
    immediate: false,
  })

  return {
    start: resume,
    stop: pause,
    isActive,
    onBeforeRender: eventHooks.beforeRender.on,
    onRender: eventHooks.render.on,
    onAfterRender: eventHooks.afterRender.on,
  }
}
