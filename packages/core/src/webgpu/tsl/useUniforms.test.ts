import { Color, Vector2, Vector3 } from 'three'
import { color, vec3 } from 'three/tsl'
import { describe, expect, it, vi } from 'vitest'
import { nextTick, reactive, ref } from 'vue'
import { mountInTresContext, renderSetup } from '../../utils/test/tresContext'
import { getTslStore } from './context'
import type { LooseUniformNode } from './useUniforms'
import { useUniform, useUniforms } from './useUniforms'

vi.mock('@pmndrs/pointer-events', async () => {
  const { Object3D } = await import('three')
  return { forwardHtmlEvents: () => ({ update: () => {}, destroy: () => {} }), getVoidObject: () => new Object3D() }
})

const run = <T>(setup: () => T, options?: Parameters<typeof mountInTresContext>[1]) => {
  let result!: T
  const mounted = mountInTresContext(renderSetup(() => { result = setup() }), options)
  return { ...mounted, result }
}

describe('useUniforms', () => {
  it('creates uniform nodes with the given values', () => {
    const { result } = run(() => useUniforms({ uTime: 0, uOn: true }))

    expect(result.uTime.isUniformNode).toBe(true)
    expect(result.uTime.value).toBe(0)
    expect(result.uOn.value).toBe(true)
  })

  it('converts colors, plain vectors and TSL nodes', () => {
    const { result } = run(() => useUniforms({
      uColor: '#ff0000',
      uUv: { x: 1, y: 2 },
      uPos: { x: 1, y: 2, z: 3 },
      uTint: color('#00ff00'),
      uDir: vec3(0, 1, 0),
    }))

    expect(result.uColor.value).toEqual(new Color('#ff0000'))
    expect(result.uUv.value).toEqual(new Vector2(1, 2))
    expect(result.uPos.value).toEqual(new Vector3(1, 2, 3))
    expect(result.uTint.value).toEqual(new Color('#00ff00'))
    expect(result.uDir.value).toEqual(new Vector3(0, 1, 0))
  })

  it('reuses an existing uniform and writes the new value into it', () => {
    let first!: LooseUniformNode
    let second!: LooseUniformNode
    run(() => {
      first = useUniforms({ uSpeed: 1 }).uSpeed
      second = useUniforms({ uSpeed: 2 }).uSpeed
    })

    expect(second).toBe(first)
    expect(first.value).toBe(2)
  })

  it('keeps scopes apart and names scoped uniforms after their scope', () => {
    const { result, ctx } = run(() => ({
      player: useUniforms({ uHealth: 100 }, 'player'),
      enemy: useUniforms({ uHealth: 75 }, 'enemy'),
    }))

    expect(result.player.uHealth.value).toBe(100)
    expect(result.enemy.uHealth.value).toBe(75)
    expect(result.player.uHealth.name).toBe('player_uHealth')
    expect(getTslStore(ctx).uniforms.get('uHealth', 'enemy')).toBe(result.enemy.uHealth)
  })

  it('reads a scope or every uniform', () => {
    const { result } = run(() => {
      useUniforms({ uTime: 0 })
      useUniforms({ uColor: 'red' }, 'fog')
      return { fog: useUniforms('fog'), all: useUniforms() }
    })

    expect(result.fog.uColor.value).toEqual(new Color('red'))
    expect(result.all.uTime.value).toBe(0)
    expect(result.all.fog.uColor).toBe(result.fog.uColor)
    expect(Object.keys(result.all)).toEqual(['uTime', 'fog'])
  })

  it('syncs ref and getter sources without recreating the node', async () => {
    const density = ref(0.5)
    const props = reactive({ speed: 1 })
    const { result } = run(() => useUniforms({ uDensity: density, uSpeed: () => props.speed }))
    const node = result.uDensity

    density.value = 0.8
    props.speed = 3
    await nextTick()

    expect(result.uDensity).toBe(node)
    expect(node.value).toBe(0.8)
    expect(result.uSpeed.value).toBe(3)
  })

  it('copies into the existing value object instead of replacing it', async () => {
    const tint = ref('#ff0000')
    const { result } = run(() => useUniforms({ uTint: tint }))
    const value = result.uTint.value

    tint.value = '#0000ff'
    await nextTick()

    expect(result.uTint.value).toBe(value)
    expect(value).toEqual(new Color('#0000ff'))
  })

  it('sees in-place edits of a reactive vector', async () => {
    const position = ref(new Vector3(0, 0, 0))
    const { result } = run(() => useUniforms({ uPos: position }))

    position.value.x = 5
    await nextTick()

    expect(result.uPos.value.x).toBe(5)
  })

  it('sees in-place edits of a reactive vector returned by a getter', async () => {
    const state = reactive({ position: new Vector3(0, 0, 0) })
    const { result } = run(() => useUniforms({ uPos: () => state.position }))

    state.position.x = 5
    await nextTick()

    expect(result.uPos.value.x).toBe(5)
  })

  it('does not walk the properties of a non-reactive value when its source changes', async () => {
    const trigger = ref(0)
    let reads = 0
    const heavy = { get graph() { reads++; return {} } }
    run(() => useUniforms({ uHeavy: () => (trigger.value >= 0 ? heavy : heavy) as any }))
    reads = 0

    trigger.value++
    await nextTick()

    expect(reads).toBe(0)
  })

  it('keeps an imperative write when the source returns an equal value in a new object', async () => {
    const trigger = ref(0)
    const { result } = run(() => useUniforms({
      uTint: () => {
        void trigger.value
        return new Color('red')
      },
    }))

    result.uTint.value = new Color('blue')
    trigger.value++
    await nextTick()

    expect(result.uTint.value).toEqual(new Color('blue'))
  })

  it('invalidates the frame when a source changes', async () => {
    const density = ref(0.5)
    const { ctx } = run(() => useUniforms({ uDensity: density }), { renderMode: 'on-demand' })
    const invalidate = vi.spyOn(ctx.renderer, 'invalidate')

    density.value = 0.9
    await nextTick()

    expect(invalidate).toHaveBeenCalled()
  })

  it('returns the remove, clear and rebuild utils', () => {
    const { result, ctx } = run(() => useUniforms({ uA: 1, uB: 2 }))
    const store = getTslStore(ctx)
    const before = store.uniforms.get('uB')

    result.removeUniforms('uA')
    expect(store.uniforms.get('uA')).toBeUndefined()

    result.rebuildUniforms()
    expect(store.uniforms.get('uB')).not.toBe(before)
    expect(store.uniforms.get('uB')?.value).toBe(2)

    result.clearUniforms()
    expect(store.uniforms.keys()).toEqual([])
  })

  it('writes to the rebuilt uniform after a rebuild', async () => {
    const density = ref(0.5)
    const { result } = run(() => useUniforms({ uDensity: density }))

    result.rebuildUniforms()
    density.value = 0.7
    await nextTick()

    expect(result.uDensity.value).toBe(0.7)
  })
})

describe('useUniform', () => {
  it('creates or reuses a root uniform', () => {
    const { result } = run(() => ({ a: useUniform('uTime', 0), b: useUniform('uTime', 0) }))
    expect(result.a).toBe(result.b)
  })

  it('returns an existing uniform by name', () => {
    const { result } = run(() => ({ created: useUniform('uTime', 0), read: useUniform('uTime') }))
    expect(result.read).toBe(result.created)
  })

  it('throws when the uniform does not exist', () => {
    const errors = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(() => run(() => useUniform('uMissing'))).toThrow('"uMissing" does not exist')
    errors.mockRestore()
  })
})
