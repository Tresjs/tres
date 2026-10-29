import { float } from 'three/tsl'
import { describe, expect, it, vi } from 'vitest'
import { h, nextTick, reactive, ref } from 'vue'
import { mountInTresContext, renderSetup, withSetup } from '../../utils/test/tresContext'
import { getTslStore } from './context'
import { useLocalNodes } from './useLocalNodes'
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

describe('useLocalNodes', () => {
  it('returns the built nodes as refs', () => {
    const { result } = run(() => {
      useUniforms({ uStrength: 2 })
      return useLocalNodes(({ uniforms }) => ({ colorNode: uniforms.uStrength.mul(2) }))
    })

    expect(result.colorNode.value.isNode).toBe(true)
  })

  it('does not register its nodes in the store', () => {
    const { ctx } = run(() => useLocalNodes(() => ({ local: float(1) })))
    expect(getTslStore(ctx).nodes.keys()).toEqual([])
  })

  it('does not rebuild when it reads a prop that is not a declared source', async () => {
    const props = reactive({ strength: 1 })
    const creator = vi.fn(() => ({ n: float(props.strength) }))
    run(() => useLocalNodes(creator))

    props.strength = 2
    await nextTick()

    expect(creator).toHaveBeenCalledOnce()
  })

  it('rebuilds when a declared source changes', async () => {
    const props = reactive({ octaves: 2 })
    const creator = vi.fn(() => ({ n: float(props.octaves) }))
    const { result } = run(() => useLocalNodes(creator, [() => props.octaves]))
    const before = result.n.value

    props.octaves = 4
    await nextTick()

    expect(creator).toHaveBeenCalledTimes(2)
    expect(result.n.value).not.toBe(before)
  })

  it('accepts a single source', async () => {
    const octaves = ref(2)
    const creator = vi.fn(() => ({ n: float(octaves.value) }))
    run(() => useLocalNodes(creator, octaves))

    octaves.value = 3
    await nextTick()

    expect(creator).toHaveBeenCalledTimes(2)
  })

  it('does not rebuild when a uniform value changes', async () => {
    const strength = ref(1)
    const creator = vi.fn(({ uniforms }) => ({ n: uniforms.uStrength.mul(2) }))
    run(() => {
      useUniforms({ uStrength: strength })
      useLocalNodes(creator)
    })

    strength.value = 5
    await nextTick()

    expect(creator).toHaveBeenCalledOnce()
  })

  it('rebuilds when an entry it read is replaced', async () => {
    const creator = vi.fn(({ nodes }) => ({ n: nodes.wobble }))
    const { result, ctx } = run(() => {
      useNodes(() => ({ wobble: float(1) }))
      return useLocalNodes(creator)
    })
    const replacement = float(2)

    getTslStore(ctx).nodes.set('wobble', replacement)
    await nextTick()

    expect(creator).toHaveBeenCalledTimes(2)
    expect(result.n.value).toBe(replacement)
  })

  it('rebuilds when an entry it read as missing appears', async () => {
    const show = ref(false)
    const creator = vi.fn(({ nodes }) => ({ n: nodes.late }))
    let refs!: ReturnType<typeof useLocalNodes<{ n: any }>>
    const Reader = withSetup(() => { refs = useLocalNodes(creator) })
    const Registers = withSetup(() => { useNodes(() => ({ late: float(1) })) })
    mountInTresContext(() => [h(Reader), show.value ? h(Registers) : null])

    expect(refs.n.value).toBeUndefined()
    show.value = true
    await nextTick()
    await nextTick()

    expect(refs.n.value?.isNode).toBe(true)
  })

  it('does not rebuild on registrations it did not read', async () => {
    const creator = vi.fn(({ uniforms }) => ({ n: uniforms.uA }))
    const { ctx } = run(() => {
      useUniforms({ uA: 1 })
      useLocalNodes(creator)
    })

    getTslStore(ctx).uniforms.register(() => ({ uB: float(1) }))
    getTslStore(ctx).nodes.register(() => ({ uA: float(1) }))
    await nextTick()

    expect(creator).toHaveBeenCalledOnce()
  })

  it('rebuilds on a new generation', async () => {
    const creator = vi.fn(() => ({ n: float(1) }))
    const { ctx } = run(() => {
      useUniforms({ uA: 1 })
      useLocalNodes(creator)
    })

    getTslStore(ctx).uniforms.rebuild()
    await nextTick()

    expect(creator).toHaveBeenCalledTimes(2)
  })

  it('rebuilds only the consumers that read a rebuilt scope', async () => {
    const shared = float(1)
    const readsScope = vi.fn(({ nodes }) => ({ n: nodes.fx.a }))
    const readsRoot = vi.fn(({ nodes }) => ({ n: nodes.b }))
    const { ctx } = run(() => {
      useNodes(() => ({ a: shared }), 'fx')
      useNodes(() => ({ b: float(2) }))
      useLocalNodes(readsScope)
      useLocalNodes(readsRoot)
    })

    getTslStore(ctx).nodes.rebuild('fx')
    await nextTick()

    expect(readsScope).toHaveBeenCalledTimes(2)
    expect(readsRoot).toHaveBeenCalledOnce()
  })

  it('installs after the build, and on rebuild cleans up before the new install', async () => {
    const calls: string[] = []
    const octaves = ref(1)
    const show = ref(true)
    const Installs = withSetup(() => {
      useLocalNodes(() => {
        const version = octaves.value
        calls.push(`build ${version}`)
        return () => {
          calls.push(`install ${version}`)
          return () => calls.push(`cleanup ${version}`)
        }
      }, octaves)
    })
    mountInTresContext(() => (show.value ? h(Installs) : null))

    octaves.value = 2
    await nextTick()
    show.value = false
    await nextTick()

    expect(calls).toEqual(['build 1', 'install 1', 'build 2', 'cleanup 1', 'install 2', 'cleanup 2'])
  })

  it('returns nothing in the install form', () => {
    const { result } = run(() => useLocalNodes(() => () => {}))
    expect(result).toBeUndefined()
  })

  it('warns when the graph rebuilds many times per second', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const color = ref(0)
    run(() => useLocalNodes(() => ({ n: float(color.value) }), color))

    for (let i = 1; i <= 12; i++) {
      color.value = i
      await nextTick()
    }

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('Move the input that changes into a uniform'))
    warn.mockRestore()
  })
})
