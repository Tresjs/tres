import { float, Fn, vec3 } from 'three/tsl'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, isReactive, nextTick, reactive, ref } from 'vue'
import { mountInTresContext, renderSetup } from '../../utils/test/tresContext'
import { getTslStore } from './context'
import { useNodes } from './useNodes'
import { useUniforms } from './useUniforms'

vi.mock('@pmndrs/pointer-events', async () => {
  const { Object3D } = await import('three')
  return { forwardHtmlEvents: () => ({ update: () => {}, destroy: () => {} }), getVoidObject: () => new Object3D() }
})

const run = <T>(setup: () => T) => {
  let result!: T
  const mounted = mountInTresContext(renderSetup(() => { result = setup() }))
  return { ...mounted, result }
}

describe('useNodes', () => {
  it('registers the nodes a creator returns', () => {
    const wobble = vec3(1, 2, 3)
    const { result, ctx } = run(() => useNodes(() => ({ wobble })))

    expect(result.wobble).toBe(wobble)
    expect(getTslStore(ctx).nodes.get('wobble')).toBe(wobble)
  })

  it('keeps the first registration of a name', () => {
    const first = float(1)
    const { result } = run(() => {
      useNodes(() => ({ shared: first }))
      return useNodes(() => ({ shared: float(2) }))
    })

    expect(result.shared).toBe(first)
  })

  it('runs the creator once, even when a value it captured changes', async () => {
    const props = reactive({ scale: 1 })
    const creator = vi.fn(() => ({ scaled: float(props.scale) }))
    run(() => useNodes(creator))

    props.scale = 2
    await nextTick()

    expect(creator).toHaveBeenCalledOnce()
  })

  it('passes the uniforms and the canvas objects to the creator', () => {
    const { result, ctx } = run(() => {
      useUniforms({ uSpeed: 2 })
      return useNodes(({ uniforms, scene }) => ({ speed: uniforms.uSpeed.mul(2), scene }))
    })

    expect(result.speed.isNode).toBe(true)
    expect(result.scene).toBe(ctx.scene.value)
  })

  it('registers into a scope and reads a scope or everything', () => {
    const { result } = run(() => {
      useNodes(() => ({ damageFn: Fn(() => float(1)) }), 'player')
      useNodes(() => ({ glow: float(1) }))
      return { player: useNodes('player'), all: useNodes() }
    })

    expect(result.player.damageFn).toBeTypeOf('function')
    expect(result.all.glow.isNode).toBe(true)
    expect(result.all.player.damageFn).toBe(result.player.damageFn)
  })

  it('stores nodes raw', () => {
    const { result } = run(() => useNodes(() => ({ n: float(1) })))
    expect(isReactive(reactive({ n: result.n }).n)).toBe(false)
  })

  it('warns when a creator reads a node that does not exist yet', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    run(() => useNodes(({ nodes }) => ({ uses: nodes.missing })))

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('`nodes.missing` does not exist yet'))
    warn.mockRestore()
  })

  it('removes, clears and rebuilds nodes', () => {
    let version = 0
    const { result, ctx } = run(() => {
      useNodes(() => ({ a: float(version), b: float(version) }), 'fx')
      return useNodes('fx')
    })
    const store = getTslStore(ctx)

    result.removeNodes('a', 'fx')
    expect(store.nodes.get('a', 'fx')).toBeUndefined()

    const before = store.nodes.get('b', 'fx')
    version = 1
    result.rebuildNodes('fx')
    expect(store.nodes.get('b', 'fx')).not.toBe(before)
    expect(result.b).toBe(store.nodes.get('b', 'fx'))

    result.clearNodes('fx')
    expect(store.nodes.keys()).toEqual([])
  })

  it('reads the current node after a rebuild', () => {
    const { result } = run(() => useNodes(() => ({ n: float(1) })))
    const before = result.n

    result.rebuildNodes()

    expect(result.n).not.toBe(before)
  })

  it('replaces the nodes of a component after a hot update', async () => {
    const show = ref(true)
    const old = float(1)
    const next = float(2)
    const Old = defineComponent({ __hmrId: 'shared-nodes', setup: () => { useNodes(() => ({ n: old })); return () => null } } as any)
    const New = defineComponent({ __hmrId: 'shared-nodes', setup: () => { useNodes(() => ({ n: next, extra: next })); return () => null } } as any)
    const { ctx } = mountInTresContext(() => h(show.value ? Old : New))

    show.value = false
    await nextTick()

    expect(getTslStore(ctx).nodes.get('n')).toBe(next)
  })
})
