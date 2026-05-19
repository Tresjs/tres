import { shallowRef } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { deleteRoot, getRoot, hasRoot, setRoot, type TresRoot } from './roots'

const makeFakeRoot = (): TresRoot => ({
  renderer: {} as any,
  internalComponent: {} as any,
  hmrTick: shallowRef(0),
  context: {} as any,
})

describe('roots', () => {
  let canvas: HTMLCanvasElement

  beforeEach(() => {
    canvas = document.createElement('canvas')
    deleteRoot(canvas)
  })

  it('getRoot returns undefined for an unregistered canvas', () => {
    expect(getRoot(canvas)).toBeUndefined()
  })

  it('hasRoot is false for an unregistered canvas', () => {
    expect(hasRoot(canvas)).toBe(false)
  })

  it('setRoot then getRoot returns the same root', () => {
    const root = makeFakeRoot()
    setRoot(canvas, root)
    expect(getRoot(canvas)).toBe(root)
    expect(hasRoot(canvas)).toBe(true)
  })

  it('deleteRoot removes the entry', () => {
    setRoot(canvas, makeFakeRoot())
    deleteRoot(canvas)
    expect(getRoot(canvas)).toBeUndefined()
    expect(hasRoot(canvas)).toBe(false)
  })

  it('different canvases have independent roots', () => {
    const canvasA = document.createElement('canvas')
    const canvasB = document.createElement('canvas')
    const rootA = makeFakeRoot()
    const rootB = makeFakeRoot()
    setRoot(canvasA, rootA)
    setRoot(canvasB, rootB)
    expect(getRoot(canvasA)).toBe(rootA)
    expect(getRoot(canvasB)).toBe(rootB)
    deleteRoot(canvasA)
    expect(getRoot(canvasB)).toBe(rootB)
  })
})
