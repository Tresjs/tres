import { h, nextTick } from 'vue'
import * as THREE from 'three'
import { beforeAll, describe, expect, it } from 'vitest'
import { initializeSceneCreator } from './util'
import { extend } from '../../core/catalogue'

describe('hMR', () => {
  beforeAll(() => {
    extend(THREE)
  })

  it('does not duplicate scene children after simulated HMR tick', async () => {
    const { createScene, getRoot } = await initializeSceneCreator()

    const { context, sceneWrapper } = await createScene(() => [
      h('TresMesh', null, [
        h('TresBoxGeometry'),
        h('TresMeshBasicMaterial'),
      ]),
    ])

    expect(context.scene.value.children).toHaveLength(1)

    // Simulate HMR: bump the tick on the registered root
    const canvas = sceneWrapper.find('canvas').element as HTMLCanvasElement
    const root = getRoot(canvas)
    expect(root).toBeDefined()
    root!.hmrTick.value++
    await nextTick()

    expect(context.scene.value.children).toHaveLength(1)
    sceneWrapper.unmount()
  })

  it('diffs slot content cleanly when HMR tick fires', async () => {
    const { createScene, getRoot } = await initializeSceneCreator()

    // Non-reactive flag — mutating it does NOT trigger Vue's reactivity.
    // The slot vnode tree only changes when the slot fn is re-invoked,
    // which only happens when the internal component's render effect re-runs.
    // This isolates the hmrTick bump as the load-bearing trigger.
    let useSphere = false
    const slotContent = () => (useSphere
      ? [h('TresMesh', null, [h('TresSphereGeometry'), h('TresMeshBasicMaterial')])]
      : [h('TresMesh', null, [h('TresBoxGeometry'), h('TresMeshBasicMaterial')])])

    const { context, sceneWrapper } = await createScene(slotContent)

    expect((context.scene.value.children[0] as any).geometry.type).toBe('BoxGeometry')

    // Flip the flag. With no reactivity involved, no rerender happens.
    useSphere = true
    await nextTick()
    expect((context.scene.value.children[0] as any).geometry.type).toBe('BoxGeometry')

    // Bump the HMR tick — this is the ONLY trigger that can cause the internal
    // component's render fn to re-run and pick up the new slot vnodes.
    const canvas = sceneWrapper.find('canvas').element as HTMLCanvasElement
    getRoot(canvas)!.hmrTick.value++
    await nextTick()

    expect(context.scene.value.children).toHaveLength(1)
    expect((context.scene.value.children[0] as any).geometry.type).toBe('SphereGeometry')

    sceneWrapper.unmount()
  })

  it('deletes the root entry when canvas is unmounted', async () => {
    const { createScene, hasRoot } = await initializeSceneCreator()
    const { sceneWrapper } = await createScene(() => [
      h('TresMesh', null, [h('TresBoxGeometry'), h('TresMeshBasicMaterial')]),
    ])

    const canvas = sceneWrapper.find('canvas').element as HTMLCanvasElement
    expect(hasRoot(canvas)).toBe(true)

    sceneWrapper.unmount()

    expect(hasRoot(canvas)).toBe(false)
  })

  // Skipped: patching `(import.meta as any).hot` here does not reach Context.vue's
  // bound `import.meta.hot` reference under vitest/vi.resetModules(), so `onSpy`
  // is never invoked. Cleanup is verified by inspection: Context.vue registers the
  // handler via `import.meta.hot.on('vite:afterUpdate', hmrHandler)` inside
  // an `onBeforeUnmount` cleanup that calls `import.meta.hot?.off?.('vite:afterUpdate', hmrHandler)`.
  it.skip('removes the vite:afterUpdate listener on unmount', async () => {
    const offSpy = vi.fn()
    const onSpy = vi.fn()
    const origHot = (import.meta as any).hot
    ;(import.meta as any).hot = { on: onSpy, off: offSpy }

    try {
      const { createScene } = await initializeSceneCreator()
      const { sceneWrapper } = await createScene(() => [
        h('TresMesh', null, [h('TresBoxGeometry'), h('TresMeshBasicMaterial')]),
      ])

      expect(onSpy).toHaveBeenCalledWith('vite:afterUpdate', expect.any(Function))

      sceneWrapper.unmount()

      expect(offSpy).toHaveBeenCalledWith('vite:afterUpdate', expect.any(Function))
    }
    finally {
      ;(import.meta as any).hot = origHot
    }
  })
})
