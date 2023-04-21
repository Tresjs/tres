import { Color } from 'three'
import { useCore } from '../useCore'
import { EffectPass, OutlineEffect } from 'postprocessing'
import { defineComponent, inject, onUnmounted, shallowRef, watch, watchEffect, computed } from 'vue'

import type { PropType } from 'vue'
import type { TresColor } from '@tresjs/core'
import type { BlendFunction, KernelSize } from 'postprocessing'
import type { Object3D, ColorRepresentation } from 'three'

export const Outline = defineComponent({
  name: 'Outline',
  props: {
    /**
     * The objects in the scene which should have an outline.
     */
    outlinedObjects: {
      type: Array as PropType<Object3D[]>,
      requred: true,
    },

    /**
     * The blend function. Use `BlendFunction.ALPHA` for dark outlines.
     */
    blendFunction: {
      type: Number as PropType<BlendFunction>,
    },
    patternTexture: {
      type: Number as PropType<number>,
    },
    patternScale: {
      type: Number as PropType<number>,
    },
    edgeStrength: {
      type: Number as PropType<number>,
    },

    /**
     * The pulse speed. A value of zero disables the pulse effect.
     */
    pulseSpeed: {
      type: Number as PropType<number>,
    },
    visibleEdgeColor: {
      type: [String, Number, Array] as PropType<TresColor>,
    },
    hiddenEdgeColor: {
      type: [String, Number, Array] as PropType<TresColor>,
    },
    /**
     * The number of samples used for multisample antialiasing. Requires WebGL 2.
     */
    multisampling: {
      type: Number as PropType<number>,
    },
    resolutionScale: {
      type: Number as PropType<number>,
    },
    resolutionX: {
      type: Number as PropType<number>,
    },
    resolutionY: {
      type: Number as PropType<number>,
    },
    /**
     * The blur kernel size.
     */
    kernelSize: {
      type: Number as PropType<KernelSize>,
    },
    blur: {
      type: Boolean as PropType<boolean>,
    },
    /**
     * Whether occluded parts of selected objects should be visible
     */
    xRay: {
      type: Boolean as PropType<boolean>,
    },
  },
  setup(props) {
    const { state } = useCore()
    const composer = inject<any>('effectComposer') // TODO inject type
    const pass = shallowRef<EffectPass | null>(null)
    const effect = shallowRef<OutlineEffect | null>(null)

    type OutlineEffectParameters = NonNullable<
      Exclude<
        ConstructorParameters<typeof OutlineEffect>[2],
        'width' | 'height' // excluded, because those are deprecated in postprocessing's OutlineEffec
      >
    >

    const normalizeColor = (value: Color | Array<number> | string | number | ColorRepresentation) => {
      //TODO import from core (after exporting it from there first 😊)
      if (value instanceof Color) return value
      if (Array.isArray(value)) return new Color(...value)

      return new Color(value as ColorRepresentation)
    }

    const colorToNumber = (color: TresColor | undefined) =>
      color !== undefined ? normalizeColor(color).getHex() : undefined

    const outlineEffectParameters = computed<OutlineEffectParameters>(() => {
      const {
        blur,
        xRay,
        kernelSize,
        pulseSpeed,
        resolutionX,
        resolutionY,
        patternScale,
        edgeStrength,
        blendFunction,
        multisampling,
        patternTexture,
        resolutionScale,
        hiddenEdgeColor,
        visibleEdgeColor,
      } = props // thre rest operator (const {outlinedObjects: _, ...rest} = props) was intentionally not used here to prevent triggering this computed when outlinedObjects changes

      return {
        blur,
        xRay,
        kernelSize,
        pulseSpeed,
        resolutionX,
        resolutionY,
        patternScale,
        edgeStrength,
        blendFunction,
        multisampling,
        patternTexture,
        resolutionScale,
        hiddenEdgeColor: colorToNumber(hiddenEdgeColor),
        visibleEdgeColor: colorToNumber(visibleEdgeColor),
      }
    })

    const unwatch = watchEffect(() => {
      if (state.camera && composer && composer.value && state.scene) {
        effect.value = new OutlineEffect(state.scene, state.camera, outlineEffectParameters.value)
        pass.value = new EffectPass(state.camera, effect.value)

        composer.value?.addPass(pass.value)
        unwatch()
      }
    })

    watch(
      [() => props.outlinedObjects, effect], // whatchEffect is intentionally not used here as it would result in an endless loop
      () => {
        effect.value?.selection.set(props.outlinedObjects || [])
      },
      {
        immediate: true,
      },
    )

    watchEffect(() => {
      if (!effect.value) return

      const plainEffectPass = new OutlineEffect()

      /* some properties are not updated because of different reasons:
        resolutionX - has no setter in OutlineEffect
        resolutionY - has no setter in OutlineEffect
        blendFunction - has no setter in OutlineEffect
        patternTexture - different type in constructor and in setter
        resolutionScale - has no setter in OutlineEffect
      */

      const {
        blur,
        xRay,
        kernelSize,
        pulseSpeed,
        patternScale,
        edgeStrength,
        multisampling,
        hiddenEdgeColor,
        visibleEdgeColor,
      } = outlineEffectParameters.value

      effect.value.blur = blur !== undefined ? blur : plainEffectPass.blur
      effect.value.xRay = xRay !== undefined ? xRay : plainEffectPass.xRay
      effect.value.pulseSpeed = pulseSpeed !== undefined ? pulseSpeed : plainEffectPass.pulseSpeed
      effect.value.kernelSize = kernelSize !== undefined ? kernelSize : plainEffectPass.kernelSize
      effect.value.edgeStrength = edgeStrength !== undefined ? edgeStrength : plainEffectPass.edgeStrength
      effect.value.patternScale = patternScale !== undefined ? patternScale : plainEffectPass.patternScale
      effect.value.multisampling = multisampling !== undefined ? multisampling : plainEffectPass.multisampling

      effect.value.hiddenEdgeColor =
        hiddenEdgeColor !== undefined ? normalizeColor(hiddenEdgeColor) : plainEffectPass.hiddenEdgeColor
      effect.value.visibleEdgeColor =
        visibleEdgeColor !== undefined ? normalizeColor(visibleEdgeColor) : plainEffectPass.visibleEdgeColor

      plainEffectPass.dispose()
    })

    onUnmounted(() => {
      effect.value?.selection.clear()
      composer.value?.removePass(pass.value)
      effect.value?.dispose()
      pass.value?.dispose()
    })

    return () => {
      pass
    }
  },
})
