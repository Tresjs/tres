import { useRafFn } from '@vueuse/core'
import { createPriorityEventHook } from '../utils/createPriorityEventHook'
import { Clock } from 'three'

export const useCreateRenderLoop = <T>(getHookContext: () => T) => { // TODO think about name
  type HookContextWithClock = [T, { delta: number, elapsed: number }]

  const clock = new Clock()

  const eventHooks = {
    beforeRender: createPriorityEventHook<HookContextWithClock>(),
    render: createPriorityEventHook<HookContextWithClock>(),
    afterRender: createPriorityEventHook<HookContextWithClock>(),
  }

  const { pause, resume, isActive } = useRafFn(() => {
    const getContextWithClock = (): HookContextWithClock => [
      getHookContext(),
      {
        delta: clock.getDelta(),
        elapsed: clock.getElapsedTime(),
      },
    ]

    eventHooks.beforeRender.trigger(...getContextWithClock())
    eventHooks.render.trigger(...getContextWithClock())
    eventHooks.afterRender.trigger(...getContextWithClock())
  }, {
    immediate: false,
  })

  const start = () => {
    clock.start()
    resume()
  }

  const stop = () => {
    clock.stop()
    pause()
  }

  return {
    start,
    stop, // TODO does it even make sense to stop?
    isActive,
    onBeforeRender: eventHooks.beforeRender.on,
    onRender: eventHooks.render.on,
    onAfterRender: eventHooks.afterRender.on,
  }
}
