import { describe, expect, it, vi } from 'vitest'
import { computed, h, isReactive, isRef, nextTick, reactive, ref } from 'vue'
import { mountInTresContext, renderSetup, withSetup } from '../../utils/test/tresContext'
import { getTslStore, useTslStore } from './context'
import type { TslStore } from './store'
import { createLiveView, createTslStore, isTslReadLogStale } from './store'

vi.mock('@pmndrs/pointer-events', async () => {
  const { Object3D } = await import('three')
  return { forwardHtmlEvents: () => ({ update: () => {}, destroy: () => {} }), getVoidObject: () => new Object3D() }
})

const leaf = (name: string) => ({ name })

describe('tslStore', () => {
  describe('register', () => {
    it('creates the entries that do not exist', () => {
      const store = createTslStore()
      const a = leaf('a')
      const { created } = store.nodes.register(() => ({ a }))

      expect(store.nodes.get('a')).toBe(a)
      expect([...created]).toEqual(['a'])
    })

    it('keeps the first registration of a name', () => {
      const store = createTslStore()
      const first = leaf('first')
      store.nodes.register(() => ({ a: first }))
      const { created } = store.nodes.register(() => ({ a: leaf('second'), b: leaf('b') }))

      expect(store.nodes.get('a')).toBe(first)
      expect([...created]).toEqual(['b'])
    })

    it('keeps scopes apart from the root and from each other', () => {
      const store = createTslStore()
      const root = leaf('root')
      const player = leaf('player')
      const enemy = leaf('enemy')
      store.uniforms.register(() => ({ uHealth: root }))
      store.uniforms.register(() => ({ uHealth: player }), { scope: 'player' })
      store.uniforms.register(() => ({ uHealth: enemy }), { scope: 'enemy' })

      expect(store.uniforms.get('uHealth')).toBe(root)
      expect(store.uniforms.get('uHealth', 'player')).toBe(player)
      expect(store.uniforms.get('uHealth', 'enemy')).toBe(enemy)
      expect(store.uniforms.keys()).toEqual(['uHealth', 'player', 'enemy'])
    })

    it('stores entries raw, so Vue never proxies a node', () => {
      const store = createTslStore()
      const node = leaf('node')
      store.nodes.register(() => ({ node }))

      const state = reactive({ node: store.nodes.get('node') })
      expect(isReactive(state.node)).toBe(false)
      expect(state.node).toBe(node)
    })

    it('reports a change only when it adds an entry', () => {
      const onChange = vi.fn()
      const store = createTslStore(onChange)
      store.nodes.register(() => ({ a: leaf('a') }))
      store.nodes.register(() => ({ a: leaf('again') }))
      expect(onChange).toHaveBeenCalledOnce()
    })

    it('replaces the entries of a hot-updated call site', () => {
      const store = createTslStore()
      store.nodes.register(() => ({ a: leaf('old'), gone: leaf('gone') }), { owner: 'Comp:nodes:0', source: 'v1' })
      const next = leaf('new')
      store.nodes.register(() => ({ a: next }), { owner: 'Comp:nodes:0', source: 'v2' })

      expect(store.nodes.get('a')).toBe(next)
      expect(store.nodes.get('gone')).toBeUndefined()
    })

    it('keeps the entries when the same call site registers the same source again', () => {
      const store = createTslStore()
      const first = leaf('first')
      store.nodes.register(() => ({ a: first }), { owner: 'Comp:nodes:0', source: 'v1' })
      store.nodes.register(() => ({ a: leaf('remount') }), { owner: 'Comp:nodes:0', source: 'v1' })

      expect(store.nodes.get('a')).toBe(first)
    })
  })

  describe('remove and clear', () => {
    it('removes names from the root or a scope', () => {
      const store = createTslStore()
      store.uniforms.register(() => ({ a: leaf('a'), b: leaf('b') }))
      store.uniforms.register(() => ({ a: leaf('fog.a') }), { scope: 'fog' })

      store.uniforms.remove(['a', 'b'])
      store.uniforms.remove('a', 'fog')

      expect(store.uniforms.keys()).toEqual(['fog'])
      expect(store.uniforms.keys('fog')).toEqual([])
    })

    it('lists a name once when a root entry and a scope share it', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const store = createTslStore()
      store.nodes.register(() => ({ fx: leaf('root fx') }))
      store.nodes.register(() => ({ a: leaf('a') }), { scope: 'fx' })

      expect(store.nodes.keys()).toEqual(['fx'])
      expect(Object.keys(createLiveView(store.nodes, undefined, {}))).toEqual(['fx'])
      expect(Object.keys(store.createSession().stores.nodes)).toEqual(['fx'])
      warn.mockRestore()
    })

    it('clears one scope, the root only, or everything', () => {
      const store = createTslStore()
      store.nodes.register(() => ({ a: leaf('a') }))
      store.nodes.register(() => ({ b: leaf('b') }), { scope: 'fx' })
      store.nodes.register(() => ({ c: leaf('c') }), { scope: 'ui' })

      store.nodes.clear('fx')
      expect(store.nodes.keys()).toEqual(['a', 'ui'])

      store.nodes.clear('root')
      expect(store.nodes.keys()).toEqual(['ui'])

      store.nodes.clear()
      expect(store.nodes.keys()).toEqual([])
    })

    it('lets a name register again after it was removed', () => {
      const store = createTslStore()
      store.nodes.register(() => ({ a: leaf('a') }))
      store.nodes.remove('a')
      const again = leaf('again')
      store.nodes.register(() => ({ a: again }))

      expect(store.nodes.get('a')).toBe(again)
    })
  })

  describe('rebuild', () => {
    it('re-runs the registrations and bumps the generation', () => {
      const store = createTslStore()
      let version = 0
      store.nodes.register(() => ({ a: leaf(`a${version}`) }))
      const generation = store.generation.value

      version++
      store.nodes.rebuild()

      expect(store.nodes.get('a')).toEqual(leaf('a1'))
      expect(store.generation.value).toBe(generation + 1)
    })

    it('re-runs only the registrations of the scope it is given', () => {
      const store = createTslStore()
      const root = vi.fn(() => ({ a: leaf('a') }))
      const fx = vi.fn(() => ({ b: leaf('b') }))
      store.nodes.register(root)
      store.nodes.register(fx, { scope: 'fx' })

      store.nodes.rebuild('fx')
      expect(root).toHaveBeenCalledTimes(1)
      expect(fx).toHaveBeenCalledTimes(2)

      store.nodes.rebuild('root')
      expect(root).toHaveBeenCalledTimes(2)
      expect(fx).toHaveBeenCalledTimes(2)
    })

    it('does not bring back a removed name', () => {
      const store = createTslStore()
      store.nodes.register(() => ({ a: leaf('a'), b: leaf('b') }))
      store.nodes.remove('a')
      store.nodes.rebuild()

      expect(store.nodes.keys()).toEqual(['b'])
    })

    it('re-runs a node registration that read a rebuilt uniform', () => {
      const store = createTslStore()
      store.uniforms.register(() => ({ uTime: leaf('uTime') }))
      store.nodes.register(({ uniforms }) => ({ wave: { of: uniforms.uTime } }))
      const before = store.nodes.get('wave')

      store.uniforms.rebuild()

      expect(store.nodes.get('wave')).not.toBe(before)
      expect(store.nodes.get('wave')).toEqual({ of: store.uniforms.get('uTime') })
    })
  })

  describe('read tracking', () => {
    it('is stale when an entry it read is replaced', () => {
      const store = createTslStore()
      store.uniforms.register(() => ({ uTime: leaf('uTime') }))
      const session = store.createSession()
      void session.stores.uniforms.uTime
      session.close()

      expect(isTslReadLogStale(session.reads)).toBe(false)
      store.uniforms.set('uTime', leaf('replaced'))
      expect(isTslReadLogStale(session.reads)).toBe(true)
    })

    it('is stale when an entry it read is removed', () => {
      const store = createTslStore()
      store.uniforms.register(() => ({ uTime: leaf('uTime') }))
      const session = store.createSession()
      void session.stores.uniforms.uTime
      session.close()

      store.uniforms.remove('uTime')
      expect(isTslReadLogStale(session.reads)).toBe(true)
    })

    it('is stale when an entry it read as missing appears', () => {
      const store = createTslStore()
      const session = store.createSession()
      expect(session.stores.nodes.noise).toBeUndefined()
      session.close()

      store.nodes.register(() => ({ noise: leaf('noise') }))
      expect(isTslReadLogStale(session.reads)).toBe(true)
    })

    it('tracks a leaf inside a scope, not the other leaves of that scope', () => {
      const store = createTslStore()
      store.uniforms.register(() => ({ uColor: leaf('uColor') }), { scope: 'fog' })
      const session = store.createSession()
      expect(session.stores.uniforms.fog.uColor).toEqual(leaf('uColor'))
      session.close()

      store.uniforms.register(() => ({ uDensity: leaf('uDensity') }), { scope: 'fog' })
      expect(isTslReadLogStale(session.reads)).toBe(false)

      store.uniforms.set('uColor', leaf('other'), 'fog')
      expect(isTslReadLogStale(session.reads)).toBe(true)
    })

    it('ignores registrations it did not read', () => {
      const store = createTslStore()
      store.uniforms.register(() => ({ uTime: leaf('uTime') }))
      const session = store.createSession()
      void session.stores.uniforms.uTime
      session.close()

      store.uniforms.register(() => ({ uOther: leaf('uOther') }))
      store.nodes.register(() => ({ uTime: leaf('nodes.uTime') }))
      expect(isTslReadLogStale(session.reads)).toBe(false)
    })

    it('tracks the key set when it lists a scope', () => {
      const store = createTslStore()
      store.uniforms.register(() => ({ a: leaf('a') }), { scope: 'fx' })
      const session = store.createSession()
      expect(Object.keys(session.stores.uniforms.fx)).toEqual(['a'])
      session.close()

      store.uniforms.register(() => ({ b: leaf('b') }), { scope: 'fx' })
      expect(isTslReadLogStale(session.reads)).toBe(true)
    })

    it('does not record reads after the session closed, and warns', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const store = createTslStore()
      store.uniforms.register(() => ({ uTime: leaf('uTime') }))
      const session = store.createSession({ label: 'useLocalNodes creator' })
      session.close()

      expect(session.stores.uniforms.uTime).toEqual(leaf('uTime'))
      expect(session.reads.size).toBe(0)
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('read after the creator returned'))
      warn.mockRestore()
    })

    it('is not mistaken for a ref by Vue', () => {
      const store = createTslStore()
      expect(isRef(store.createSession().stores.uniforms)).toBe(false)
    })
  })
})

describe('getTslStore', () => {
  it('creates one store per canvas, on first use', () => {
    const first = mountInTresContext(() => null)
    const second = mountInTresContext(() => null)

    expect(getTslStore(first.ctx)).toBe(getTslStore(first.ctx))
    expect(getTslStore(first.ctx)).not.toBe(getTslStore(second.ctx))
  })

  it('is reachable from components inside the canvas', () => {
    let fromChild: TslStore | undefined
    const { ctx } = mountInTresContext(renderSetup(() => {
      fromChild = useTslStore().store
    }))

    expect(fromChild).toBe(getTslStore(ctx))
  })

  it('disposes the store when the canvas unmounts', () => {
    const { ctx, wrapper } = mountInTresContext(() => null)
    const store = getTslStore(ctx)
    const pass = { dispose: vi.fn() }
    store.passes.set('scenePass', pass)
    store.nodes.register(() => ({ a: leaf('a') }))

    wrapper.unmount()

    expect(pass.dispose).toHaveBeenCalledOnce()
    expect(store.nodes.keys()).toEqual([])
    expect(getTslStore(ctx)).not.toBe(store)
  })

  it('disposes the store when the canvas unmounts, also when a child created it', async () => {
    const show = ref(true)
    let created: TslStore | undefined
    const pass = { dispose: vi.fn() }
    const Creates = withSetup(() => {
      created = useTslStore().store
      created.passes.set('p', pass)
    })
    const { wrapper } = mountInTresContext(() => (show.value ? h(Creates) : null))

    show.value = false
    await nextTick()
    wrapper.unmount()

    expect(pass.dispose).toHaveBeenCalledOnce()
    expect(created!.passes.keys()).toEqual([])
  })

  it('keeps entries when the component that registered them unmounts', async () => {
    const show = ref(true)
    const Registers = withSetup(() => {
      useTslStore().store.nodes.register(() => ({ a: leaf('a') }))
    })
    const { ctx } = mountInTresContext(() => (show.value ? h(Registers) : null))

    show.value = false
    await nextTick()

    expect(getTslStore(ctx).nodes.get('a')).toEqual(leaf('a'))
  })
})

describe('createLiveView', () => {
  it('does not update a computed on a change to another entry', () => {
    const store = createTslStore()
    store.nodes.register(() => ({ a: leaf('a') }))
    const view = createLiveView(store.nodes, undefined, {})
    const read = vi.fn(() => view.a?.name)
    const name = computed(read)

    void name.value
    store.nodes.register(() => ({ b: leaf('b') }))
    store.nodes.set('c', leaf('c'), 'fx')
    void name.value

    expect(read).toHaveBeenCalledOnce()
  })

  it('updates Object.keys when an entry is added', () => {
    const store = createTslStore()
    const view = createLiveView(store.nodes, undefined, {})
    const keys = computed(() => Object.keys(view))

    expect(keys.value).toEqual([])
    store.nodes.register(() => ({ a: leaf('a') }))
    expect(keys.value).toEqual(['a'])
  })

  it('updates a computed when an entry is replaced', () => {
    const store = createTslStore()
    store.nodes.register(() => ({ a: leaf('a') }))
    const view = createLiveView(store.nodes, undefined, {})
    const name = computed(() => view.a?.name)

    expect(name.value).toBe('a')
    store.nodes.set('a', leaf('b'))
    expect(name.value).toBe('b')
  })
})
