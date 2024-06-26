import type { TresContext } from '../composables/useTresContextProvider'
import type { LocalState, TresInstance, TresObject } from '../types'

export function prepareTresInstance<T extends TresObject>(obj: T, state: Partial<LocalState>, context: TresContext): TresInstance {
  const instance = obj as unknown as TresInstance
  instance.__tres = {
    type: 'unknown',
    eventCount: 0,
    root: context,
    handlers: {},
    memoizedProps: {},
    objects: [],
    parent: null,
    ...state,
  }
  return instance
}

export function invalidateInstance(instance: TresObject) {
  const ctx = instance?.__tres?.root

  if (!ctx) { return }

  if (ctx.render && ctx.render.canBeInvalidated.value) {
    ctx.invalidate()
  }
}

export function noop(fn: string): any {
  // eslint-disable-next-line no-unused-expressions
  fn
}
