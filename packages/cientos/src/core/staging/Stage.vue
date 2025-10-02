<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { computed, ref, shallowRef, watch } from 'vue'
import type { Group } from 'three'
import { AccumulativeShadows, Align, Bounds, ContactShadows, Environment, RandomizedLights } from '.'
import type { AccumulativeShadowsProps } from './AccumulativeShadows/component.vue'
import type { ContactShadowsProps } from './ContactShadows.vue'
import type { RandomizedLightsProps } from './RandomizedLights/component.vue'
import type { AlignCallbackOptions, AlignProps } from './Align.vue'
import type { EnvironmentOptions, EnvironmentPresetsType } from './useEnvironment/const'
import { useDebounceFn } from '@vueuse/core'

interface StageProps {
  /** Lighting setup, default: "rembrandt" */
  lighting?:
    | null | undefined | false
    | 'rembrandt'
    | 'portrait'
    | 'upfront'
    | 'soft'
    | { main: [x: number, y: number, z: number], fill: [x: number, y: number, z: number] }
  /** Controls the ground shadows, default: "contact" */
  shadows?: boolean | 'contact' | 'accumulative' | StageShadows
  /** Optionally wraps and thereby centers the models using <Bounds>, can also be a camera offset, default: true */
  adjustCamera?: boolean | number
  /** The default environment, default: { preset: "city" } */
  environment?: EnvironmentPresetsType | Partial<EnvironmentOptions> | null
  /** Lighting intensity, `0` removes lights, default: 0.5 */
  intensity?: number
  /** To adjust alignment, default: undefined */
  align?: Partial<AlignProps>
}

type StageShadows = Partial<AccumulativeShadowsProps> &
  Partial<RandomizedLightsProps> &
  Partial<ContactShadowsProps> & {
    type: 'contact' | 'accumulative'
    /** Shadow plane offset, default: 0 */
    offset?: number
    /** Shadow bias, default: -0.0001 */
    bias?: number
    /** Shadow normal bias, default: 0 */
    normalBias?: number
    /** Shadow map size, default: 1024 */
    size?: number
  }

const props = withDefaults(defineProps<StageProps>(), {
  adjustCamera: true,
  intensity: 0.5,
  shadows: 'contact',
  environment: () => ({ preset: 'city' }),
  lighting: 'rembrandt',
})

interface LightingPreset {
  main: [number, number, number]
  fill: [number, number, number]
}

interface LightingPresets {
  rembrandt: LightingPreset
  portrait: LightingPreset
  upfront: LightingPreset
  soft: LightingPreset
}

const lightingPresets: LightingPresets = {
  rembrandt: {
    main: [1, 2, 1],
    fill: [-2, -0.5, -2],
  },
  portrait: {
    main: [-1, 2, 0.5],
    fill: [-1, 0.5, -1.5],
  },
  upfront: {
    main: [0, 2, 1],
    fill: [-1, 0.5, -1.5],
  },
  soft: {
    main: [-2, 4, 4],
    fill: [-1, 0.5, -1.5],
  },
}

const radius = ref(2)
const height = ref(0)
const stageRef = shallowRef<typeof Group>()
const boundsRef = shallowRef<typeof Bounds>()
const alignRef = shallowRef<typeof Align>()
const accumulativeShadowsRef = shallowRef<typeof AccumulativeShadows>()

const debouncedLookAt = useDebounceFn(() => {
  if (boundsRef.value?.instance) {
    boundsRef.value.instance.lookAt(boundsRef.value.instance)
  }
}, 500, { maxWait: 2000 })

watch(() => [props.adjustCamera, radius.value], () => {
  alignRef.value?.update()
  if (props.adjustCamera !== false && boundsRef.value) {
    boundsRef.value.instance.offset = typeof props.adjustCamera === 'boolean' ? 0.3 : props.adjustCamera
    debouncedLookAt()
  }
})

watch(() => [props.shadows], () => {
  // NOTE: `AccumulativeShadows` can be in a mode where
  // it renders only once, then never again without
  // explicitly calling `update`.
  // To help users tweaking settings, we'll call `update`
  // when the `props.shadows` object changes.
  accumulativeShadowsRef.value?.update()
})

const lightingPresetComputed: ComputedRef<LightingPreset> = computed(() => {
  let preset = lightingPresets.rembrandt
  if (typeof props.lighting === 'string') {
    preset = lightingPresets[props.lighting]
  }
  else if (props.lighting) {
    preset = props.lighting
  }
  return preset
})

const lightingMainComputed: ComputedRef<[number, number, number]> = computed(() => {
  return lightingPresetComputed.value.main.map(v => v * radius.value) as [number, number, number]
})

const lightingFillComputed: ComputedRef<[number, number, number]> = computed(() => {
  return lightingPresetComputed.value.fill.map(v => v * radius.value) as [number, number, number]
})

const contactShadowsComputed: ComputedRef<StageShadows | null> = computed(() => {
  if (props.shadows === true || props.shadows === 'contact') {
    return { type: 'contact' }
  }
  else if (typeof props.shadows === 'object' && props.shadows.type === 'contact') {
    return props.shadows
  }
  else {
    return null
  }
})

const accumulativeShadowsComputed: ComputedRef<StageShadows | null> = computed(() => {
  if (props.shadows === 'accumulative') {
    return { type: 'accumulative' }
  }
  else if (typeof props.shadows === 'object' && (props.shadows as StageShadows).type === 'accumulative') {
    return props.shadows
  }
  else {
    return null
  }
})

const environmentComputed: ComputedRef<EnvironmentOptions | null> = computed(() => {
  if (props.environment === null) {
    return null
  }
  else if (!props.environment) {
    return { preset: 'city' }
  }
  else if (typeof props.environment === 'string') {
    return { preset: props.environment }
  }
  else {
    return props.environment
  }
})

const onAlignChange = (alignProps: AlignCallbackOptions) => {
  radius.value = alignProps.boundingSphere.radius
  if (props.adjustCamera !== false) {
    debouncedLookAt()
  }
}

defineExpose({ instance: stageRef, update: () => {} })
</script>

<template>
  <TresGroup ref="stageRef">
    <TresGroup v-if="props.lighting">
      <TresAmbientLight :intensity="intensity / 3" />
      <TresSpotLight
        :penumbra="1"
        :position="lightingMainComputed"
        :intensity="intensity * 2"
        :castShadow="!!shadows"
        :shadow-bias="(shadows as StageShadows)?.bias ?? 0"
        :shadow-normalBias="(shadows as StageShadows)?.normalBias ?? 0"
        :shadow-mapSize="(shadows as StageShadows)?.size ?? 1024"
      />
      <TresPointLight
        :position="lightingFillComputed"
        :intensity="intensity"
      />
    </TresGroup>
    <Bounds
      ref="boundsRef"
      :clip="!!adjustCamera"
      :offset="typeof props.adjustCamera === 'boolean' ? 0.3 : props.adjustCamera"
      use-mounted
      use-resize
      v-bind="props"
    >
      <Align ref="alignRef" v-bind="align" @change="onAlignChange">
        <slot></slot>
      </Align>
    </Bounds>
    <TresGroup :position="[0, -height / 2 - ((shadows as StageShadows)?.offset ?? 0) / 2, 0]">
      <ContactShadows
        v-if="contactShadowsComputed"
        :scale="radius * 4"
        :far="radius"
        :blur="2"
        v-bind="contactShadowsComputed"
      />
      <AccumulativeShadows
        v-if="accumulativeShadowsComputed"
        ref="accumulativeShadowsRef"
        :frames="100"
        :alpha-test="0.5"
        :tone-mapped="true"
        :scale="radius * 4"
        v-bind="accumulativeShadowsComputed"
      >
        <RandomizedLights
          :position="lightingMainComputed"
          :count="accumulativeShadowsComputed.count ?? 8"
          :radius="accumulativeShadowsComputed.radius ?? radius"
          :intensity="accumulativeShadowsComputed.intensity ?? 1.5"
          :ambient="accumulativeShadowsComputed.ambient ?? 0.5"
          :size="radius * 4"
          :bias="accumulativeShadowsComputed.bias ?? 0"
          :map-size="accumulativeShadowsComputed.size ?? 1024"
          v-bind="accumulativeShadowsComputed"
        />
      </AccumulativeShadows>
      <Suspense>
        <Environment v-if="environmentComputed" v-bind="environmentComputed" />
      </Suspense>
    </TresGroup>
  </TresGroup>
</template>
