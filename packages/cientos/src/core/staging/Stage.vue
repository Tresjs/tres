<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { computed, ref, shallowRef, watch } from 'vue'
import type { Group } from 'three'
import { AccumulativeShadows, ContactShadows, RandomizedLights } from '../light-shadow'
import Align from '../abstractions/Align.vue'
import Bounds from '../miscellaneous/Bounds/component.vue'
import Environment from './useEnvironment/component.vue'
import type { AccumulativeShadowsProps } from '../light-shadow/AccumulativeShadows/component.vue'
import type { ContactShadowsProps } from '../light-shadow/ContactShadows.vue'
import type { RandomizedLightsProps } from '../light-shadow/RandomizedLights/component.vue'
import type { AlignCallbackOptions, AlignProps } from '../abstractions/Align.vue'
import type { EnvironmentOptions, EnvironmentPresetsType } from './useEnvironment/const'
import { useDebounceFn } from '@vueuse/core'
import { pick } from '../../utils'

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
  shadows?: boolean | 'contact' | 'accumulative' | StageShadows | null
  /** Optionally wraps and thereby centers the models using <Bounds>, can also be a camera offset, default: true */
  adjustCamera?: boolean | number
  /** The default environment, default: { preset: "city" } */
  environment?: EnvironmentPresetsType | Partial<EnvironmentOptions> | null
  /** Lighting intensity, `0` removes lights, default: 0.5 */
  intensity?: number
  /** To adjust alignment, default: undefined */
  align?: Partial<AlignProps>
}

type StageShadows = Partial<AccumulativeShadowsProps>
  & Partial<RandomizedLightsProps>
  & Partial<ContactShadowsProps> & {
    type: 'contact' | 'accumulative'
    /** Distance of the shadow plane below the content, default: 0 */
    offset?: number
    /** Shadow bias, inverted for the accumulative lights, default: -0.0001 */
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
const floor = ref(0)
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

const contactShadowsComputed: ComputedRef<Partial<ContactShadowsProps> | null> = computed(() => {
  if (props.shadows === true || props.shadows === 'contact') {
    return {}
  }
  else if (props.shadows && typeof props.shadows === 'object' && props.shadows.type === 'contact') {
    return pick(props.shadows, Object.keys(ContactShadows.props) as (keyof ContactShadowsProps)[])
  }
  else {
    return null
  }
})

const accumulativeShadowsComputed: ComputedRef<Partial<AccumulativeShadowsProps> | null> = computed(() => {
  if (props.shadows === 'accumulative') {
    return {}
  }
  else if (props.shadows && typeof props.shadows === 'object' && props.shadows.type === 'accumulative') {
    return pick(props.shadows, Object.keys(AccumulativeShadows.props) as (keyof AccumulativeShadowsProps)[])
  }
  else {
    return null
  }
})

const randomizedLightsComputed: ComputedRef<Partial<RandomizedLightsProps>> = computed(() => {
  const shadows: Partial<StageShadows> = props.shadows && typeof props.shadows === 'object' ? props.shadows : {}
  return {
    count: shadows.count ?? 8,
    radius: shadows.radius ?? radius.value,
    intensity: shadows.intensity ?? 1.5,
    ambient: shadows.ambient ?? 0.5,
    castShadow: shadows.castShadow,
    near: shadows.near,
    far: shadows.far,
    // NOTE: inverted, as the accumulative plane only receives shadows and needs a positive bias
    bias: -(shadows.bias ?? -0.0001),
    mapSize: shadows.mapSize ?? shadows.size ?? 1024,
    size: radius.value * 4,
    position: shadows.position ?? lightingMainComputed.value,
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
  floor.value = props.align?.disable || props.align?.disableY
    ? alignProps.boundingBox.min.y
    : alignProps.verticalAlignment - alignProps.height / 2
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
        :shadow-bias="(shadows as StageShadows)?.bias ?? -0.0001"
        :shadow-normalBias="(shadows as StageShadows)?.normalBias ?? 0"
        :shadow-mapSize-x="(shadows as StageShadows)?.size ?? 1024"
        :shadow-mapSize-y="(shadows as StageShadows)?.size ?? 1024"
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
    >
      <Align ref="alignRef" v-bind="align" @change="onAlignChange">
        <slot></slot>
      </Align>
    </Bounds>
    <TresGroup :position="[0, floor - ((shadows as StageShadows)?.offset ?? 0), 0]">
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
        <RandomizedLights v-bind="randomizedLightsComputed" />
      </AccumulativeShadows>
      <Suspense>
        <Environment v-if="environmentComputed" v-bind="environmentComputed" />
      </Suspense>
    </TresGroup>
  </TresGroup>
</template>
