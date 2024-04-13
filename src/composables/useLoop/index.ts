import { useTresContext } from '../useTresContextProvider'

export function useLoop(cb) {
  const ctx = useTresContext()

  return ctx.loop.onLoop(cb)
}
