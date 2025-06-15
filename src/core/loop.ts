import { useRafFn } from '@vueuse/core'
import { createPriorityEventHook } from '../utils/createPriorityEventHook'

export const useCreateRenderLoop = <T>(getHookContext?: () => T) => { // TODO think about name
  const eventHooks = {
    beforeRender: createPriorityEventHook<T>(),
    render: createPriorityEventHook<T>(),
    afterRender: createPriorityEventHook<T>(),
  }

  const { pause, resume, isActive } = useRafFn(() => {
    eventHooks.beforeRender.trigger(getHookContext?.() ?? undefined)
    eventHooks.render.trigger(getHookContext?.() ?? undefined)
    eventHooks.afterRender.trigger(getHookContext?.() ?? undefined)
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
