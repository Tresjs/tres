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

    type OutlineEffectParameters = ConstructorParameters<typeof OutlineEffect>[2]

    const outlineEffectParameters = computed<OutlineEffectParameters>(() => {
      const { outlinedObjects: _, visibleEdgeColor, hiddenEdgeColor, ...rest } = props

      const normalizeColor = (value: Color | Array<number> | string | number | ColorRepresentation) => {
        //TODO import from core (after exporting it from there first 😊)
        if (value instanceof Color) return value
        if (Array.isArray(value)) return new Color(...value)

        return new Color(value as ColorRepresentation)
      }

      const colorToNumber = (color: TresColor | undefined) =>
        color !== undefined ? normalizeColor(color).getHex() : undefined

      return {
        visibleEdgeColor: colorToNumber(props.visibleEdgeColor),
        hiddenEdgeColor: colorToNumber(props.hiddenEdgeColor),
        ...rest,
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

    //TODO update OutlineEffect's properties

    watch(
      [() => props.outlinedObjects, effect], // whatchEffect is intentionally not used here as it would result in an endless loop
      () => {
        effect.value?.selection.set(props.outlinedObjects || [])
      },
      {
        immediate: true,
      },
    )

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
