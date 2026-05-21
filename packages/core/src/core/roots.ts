import type { Component, createRenderer, Ref } from 'vue'
import type { TresContext } from '../composables'

export interface TresRoot {
  renderer: ReturnType<typeof createRenderer>
  internalComponent: Component
  hmrTick: Ref<number>
  context: TresContext
}

const _roots = new Map<HTMLCanvasElement, TresRoot>()

export const getRoot = (canvas: HTMLCanvasElement): TresRoot | undefined =>
  _roots.get(canvas)

export const setRoot = (canvas: HTMLCanvasElement, root: TresRoot): void => {
  _roots.set(canvas, root)
}

export const deleteRoot = (canvas: HTMLCanvasElement): boolean =>
  _roots.delete(canvas)

export const hasRoot = (canvas: HTMLCanvasElement): boolean =>
  _roots.has(canvas)
