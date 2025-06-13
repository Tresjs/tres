import { useRafFn } from '@vueuse/core'
import { createPriorityEventHook } from '../utils/createPriorityEventHook'

interface TODO {
}

export const createRenderLoop = () => {
  const eventHooks = {
    beforeRender: createPriorityEventHook<TODO>(),
    render: createPriorityEventHook<TODO>(),
    afterRender: createPriorityEventHook<TODO>(),
  }

  const { pause, resume, isActive } = useRafFn(() => {
    console.log('before render')
    eventHooks.beforeRender.trigger({})
    console.log('render')
    eventHooks.render.trigger({})
    console.log('after render')
    eventHooks.afterRender.trigger({})
  }, {
    immediate: false,
  })

  return {
    start: resume,
    stop: pause,
    isActive,
    pause, // TODO check if these are required -> start, stop should be enough
    resume, // TODO check if these are required -> start, stop should be enough
    onBeforeRender: eventHooks.beforeRender.on,
    onRender: eventHooks.render,
    onAfterRender: eventHooks.afterRender.on,
  }
}
