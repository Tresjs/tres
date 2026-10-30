import { float } from 'three/tsl'
import { it, vi } from 'vitest'
import type { Ref } from 'vue'
import { computed, h, nextTick, ref, watch } from 'vue'
import { mountInTresContext, withSetup } from '../../utils/test/tresContext'
import { getTslStore } from './context'
import { useLocalNodes } from './useLocalNodes'
import { useNodes } from './useNodes'
import { useUniforms } from './useUniforms'

vi.mock('@pmndrs/pointer-events', async () => {
  const { Object3D } = await import('three')
  return { forwardHtmlEvents: () => ({ update: () => {}, destroy: () => {} }), getVoidObject: () => new Object3D() }
})

const CONSUMERS = 200
const FRAMES = 1000

const mountConsumers = (count: number, setup: (index: number) => void) =>
  mountInTresContext(() => Array.from({ length: count }, (_, index) => h(withSetup(() => setup(index)), { key: index })))

it('mount and unmount', async ({ bench: measure }) => {
  await measure.compare(
    measure(`${CONSUMERS} components with useUniforms + useLocalNodes`, () => {
      const { wrapper } = mountConsumers(CONSUMERS, (index) => {
        useUniforms({ uStrength: ref(index) }, `c${index}`)
        useLocalNodes(({ uniforms }) => ({ colorNode: uniforms[`c${index}`].uStrength.mul(2) }))
      })
      wrapper.unmount()
    }),
    measure(`baseline: ${CONSUMERS} components with a ref and a watch`, () => {
      const { wrapper } = mountConsumers(CONSUMERS, (index) => {
        watch(ref(index), () => {})
      })
      wrapper.unmount()
    }),
  )
})

it('value updates', async ({ bench: measure }) => {
  const sources: Ref<number>[] = Array.from({ length: CONSUMERS }, (_, index) => ref(index))
  mountConsumers(CONSUMERS, (index) => {
    useUniforms({ uValue: sources[index] }, `v${index}`)
  })

  const baselineSources: Ref<number>[] = Array.from({ length: CONSUMERS }, (_, index) => ref(index))
  const targets = Array.from({ length: CONSUMERS }, () => ({ value: 0 }))
  baselineSources.forEach((source, index) => watch(source, (value) => { targets[index].value = value }))

  let tick = 0
  await measure.compare(
    measure(`${CONSUMERS} uniform sources change, one flush`, async () => {
      tick++
      for (const source of sources) { source.value = tick }
      await nextTick()
    }),
    measure(`baseline: ${CONSUMERS} refs watched into plain objects`, async () => {
      tick++
      for (const source of baselineSources) { source.value = tick }
      await nextTick()
    }),
  )
})

it('structural changes with many useLocalNodes consumers', async ({ bench: measure }) => {
  // Every iteration rebuilds on purpose, so the frequent-rebuild warning would flood the output.
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  const { ctx } = mountConsumers(CONSUMERS, () => {
    useNodes(() => ({ shared: float(1) }))
    useLocalNodes(({ nodes }) => ({ colorNode: nodes.shared.mul(2) }))
  })
  const store = getTslStore(ctx)
  let unrelated = 0

  await measure.compare(
    measure('an unrelated entry is registered (no rebuild)', async () => {
      store.uniforms.register(() => ({ [`u${unrelated++}`]: float(1) }))
      await nextTick()
    }),
    measure(`the entry all ${CONSUMERS} consumers read is replaced (${CONSUMERS} rebuilds)`, async () => {
      store.nodes.set('shared', float(1))
      await nextTick()
    }),
  )
})

it('reading a uniform every frame', async ({ bench: measure }) => {
  let uniforms!: Record<string, any>
  mountConsumers(1, () => { uniforms = useUniforms({ uTime: 0 }) })
  const { uTime } = uniforms

  await measure.compare(
    measure(`through the view (${FRAMES} frames)`, () => {
      for (let frame = 0; frame < FRAMES; frame++) { uniforms.uTime.value = frame }
    }),
    measure(`destructured once (${FRAMES} frames)`, () => {
      for (let frame = 0; frame < FRAMES; frame++) { uTime.value = frame }
    }),
  )
})

it('a reader view inside computed', async ({ bench: measure }) => {
  let reader!: Record<string, any>
  const { ctx } = mountConsumers(1, () => {
    useUniforms({ uA: 1 })
    reader = useUniforms()
  })
  const store = getTslStore(ctx)
  const fromView = computed(() => reader.uA)
  const { uA } = reader
  const fromNode = computed(() => uA)
  let index = 0

  await measure.compare(
    measure('view: unrelated registration, then read', () => {
      store.uniforms.register(() => ({ [`x${index++}`]: uA }))
      void fromView.value
    }),
    measure('destructured: unrelated registration, then read', () => {
      store.uniforms.register(() => ({ [`x${index++}`]: uA }))
      void fromNode.value
    }),
  )
})

it('registration', async ({ bench: measure }) => {
  const { ctx } = mountConsumers(0, () => {})
  const store = getTslStore(ctx)
  const node = float(1)
  let index = 0

  await measure.compare(
    measure('register one entry, creator reads nothing', () => {
      store.uniforms.register(() => ({ [`r${index++}`]: node }))
    }),
    measure('register one entry, creator reads one uniform', () => {
      store.nodes.register(({ uniforms }) => ({ [`n${index++}`]: uniforms.r0 }))
    }),
  )
})
