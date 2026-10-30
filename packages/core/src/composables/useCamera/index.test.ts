import { OrthographicCamera, PerspectiveCamera } from 'three'
import { describe, expect, it } from 'vitest'
import { computed, isReactive, nextTick, watch } from 'vue'
import type { TresContext } from '../useTresContextProvider'
import { useCameraManager } from './index'

const createManager = () => useCameraManager({
  sizes: { aspectRatio: computed(() => 1) } as TresContext['sizes'],
})

describe('useCameraManager', () => {
  it('exposes the raw camera instead of a reactive proxy', () => {
    const { activeCamera, registerCamera } = createManager()
    const camera = new PerspectiveCamera()

    registerCamera(camera)

    expect(activeCamera.value).toBe(camera)
    expect(isReactive(activeCamera.value)).toBe(false)
  })

  it('triggers watchers when the active camera changes', async () => {
    const { activeCamera, registerCamera, setActiveCamera } = createManager()
    const first = new PerspectiveCamera()
    const second = new OrthographicCamera()
    const seen: string[] = []

    registerCamera(first)
    registerCamera(second)
    watch(activeCamera, camera => seen.push(camera.uuid))

    setActiveCamera(second)
    await nextTick()

    expect(seen).toEqual([second.uuid])
  })

  it('does not track camera property changes', async () => {
    const { activeCamera, registerCamera } = createManager()
    const camera = new OrthographicCamera()
    let calls = 0

    registerCamera(camera)
    watch(() => activeCamera.value.zoom, () => calls++)

    camera.zoom = 2
    await nextTick()

    expect(calls).toBe(0)
  })
})
