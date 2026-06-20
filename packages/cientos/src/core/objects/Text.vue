<script setup lang="ts">
import { useTres } from '@tresjs/core'
import { Text as TroikaText } from 'troika-three-text'
import { computed, onUnmounted, shallowRef, useSlots, watch } from 'vue'
import type { Slots } from 'vue'
import type { ColorRepresentation } from 'three'

export interface TextProps {
  /**
   * The string of text to render. Can also be provided via the default slot.
   *
   * @type {string}
   * @memberof TextProps
   */
  text?: string
  /**
   * The set of characters to include when generating the SDF glyphs.
   * Useful for ensuring particular glyphs are pre-generated.
   *
   * @type {string}
   * @memberof TextProps
   */
  characters?: string
  /**
   * The color of the text.
   *
   * @type {ColorRepresentation}
   * @memberof TextProps
   */
  color?: ColorRepresentation
  /**
   * The em-height at which to render the font, in local world units.
   *
   * @type {number}
   * @memberof TextProps
   * @default 1
   */
  fontSize?: number
  /**
   * The weight of the font. Only used when `font` resolves to a variable font.
   *
   * @type {(number | 'normal' | 'bold')}
   * @memberof TextProps
   */
  fontWeight?: number | 'normal' | 'bold'
  /**
   * The style of the font, either `normal` or `italic`.
   *
   * @type {('normal' | 'italic')}
   * @memberof TextProps
   */
  fontStyle?: 'normal' | 'italic'
  /**
   * The maximum width of the text block, above which text may wrap lines.
   *
   * @type {number}
   * @memberof TextProps
   */
  maxWidth?: number
  /**
   * The height of each line of text, as a multiple of the `fontSize`.
   *
   * @type {(number | 'normal')}
   * @memberof TextProps
   */
  lineHeight?: number | 'normal'
  /**
   * Spacing between letters after layout, in local world units.
   *
   * @type {number}
   * @memberof TextProps
   */
  letterSpacing?: number
  /**
   * The horizontal alignment of each line of text within the overall bounding box.
   *
   * @type {('left' | 'right' | 'center' | 'justify')}
   * @memberof TextProps
   */
  textAlign?: 'left' | 'right' | 'center' | 'justify'
  /**
   * The URL of a custom font file to be used. Supports `.ttf`, `.otf` and `.woff`
   * (not `.woff2`). Defaults to the Roboto font loaded from Google Fonts.
   *
   * @type {string}
   * @memberof TextProps
   */
  font?: string
  /**
   * The horizontal position in the text block that should line up with the local origin.
   *
   * @type {(number | 'left' | 'center' | 'right' | string)}
   * @memberof TextProps
   * @default 'center'
   */
  anchorX?: number | 'left' | 'center' | 'right' | string
  /**
   * The vertical position in the text block that should line up with the local origin.
   *
   * @type {(number | 'top' | 'top-baseline' | 'middle' | 'bottom-baseline' | 'bottom' | string)}
   * @memberof TextProps
   * @default 'middle'
   */
  anchorY?: number | 'top' | 'top-baseline' | 'middle' | 'bottom-baseline' | 'bottom' | string
  /**
   * A rectangle defining a clipping region, as `[minX, minY, maxX, maxY]` in local units.
   *
   * @type {[number, number, number, number]}
   * @memberof TextProps
   */
  clipRect?: [number, number, number, number]
  /**
   * Adds a fixed offset to the text's rendered z-depth, helping prevent z-fighting.
   *
   * @type {number}
   * @memberof TextProps
   */
  depthOffset?: number
  /**
   * The base direction for the text, `ltr`, `rtl`, or `auto`.
   *
   * @type {('auto' | 'ltr' | 'rtl')}
   * @memberof TextProps
   */
  direction?: 'auto' | 'ltr' | 'rtl'
  /**
   * Defines how text wraps if a single word is too long to fit within `maxWidth`.
   *
   * @type {('normal' | 'break-word')}
   * @memberof TextProps
   */
  overflowWrap?: 'normal' | 'break-word'
  /**
   * Defines whitespace handling, following the CSS `white-space` property.
   *
   * @type {('normal' | 'nowrap')}
   * @memberof TextProps
   */
  whiteSpace?: 'normal' | 'nowrap'
  /**
   * The width of an outline/halo drawn around each glyph.
   *
   * @type {(number | string)}
   * @memberof TextProps
   */
  outlineWidth?: number | string
  /**
   * Horizontal offset of the text outline.
   *
   * @type {(number | string)}
   * @memberof TextProps
   */
  outlineOffsetX?: number | string
  /**
   * Vertical offset of the text outline.
   *
   * @type {(number | string)}
   * @memberof TextProps
   */
  outlineOffsetY?: number | string
  /**
   * The blur radius applied to the text outline.
   *
   * @type {(number | string)}
   * @memberof TextProps
   */
  outlineBlur?: number | string
  /**
   * The color of the text outline.
   *
   * @type {ColorRepresentation}
   * @memberof TextProps
   */
  outlineColor?: ColorRepresentation
  /**
   * The opacity of the text outline.
   *
   * @type {number}
   * @memberof TextProps
   */
  outlineOpacity?: number
  /**
   * The width of an inner stroke drawn on each glyph.
   *
   * @type {(number | string)}
   * @memberof TextProps
   */
  strokeWidth?: number | string
  /**
   * The color of the glyph stroke.
   *
   * @type {ColorRepresentation}
   * @memberof TextProps
   */
  strokeColor?: ColorRepresentation
  /**
   * The opacity of the glyph stroke.
   *
   * @type {number}
   * @memberof TextProps
   */
  strokeOpacity?: number
  /**
   * The opacity of the glyph fill.
   *
   * @type {number}
   * @memberof TextProps
   */
  fillOpacity?: number
  /**
   * The size of each glyph's SDF (signed distance field) texture, in pixels.
   *
   * @type {number}
   * @memberof TextProps
   * @default 64
   */
  sdfGlyphSize?: number
  /**
   * The level of detail of each glyph's geometry tessellation.
   *
   * @type {number}
   * @memberof TextProps
   */
  glyphGeometryDetail?: number
}

const props = withDefaults(defineProps<TextProps>(), {
  anchorX: 'center',
  anchorY: 'middle',
  fontSize: 1,
  sdfGlyphSize: 64,
})

const emit = defineEmits<{
  sync: [instance: TroikaText]
}>()

const { invalidate } = useTres()

const slots: Slots = useSlots()

const localText = computed((): string => {
  if (props.text !== undefined) { return props.text }
  if (slots.default) { return (slots.default()[0]?.children as string)?.trim() ?? '' }
  return ''
})

const instance = shallowRef(new TroikaText())

defineExpose({
  instance,
})

function syncText() {
  const troika = instance.value
  if (!troika) { return }

  troika.text = localText.value
  troika.characters = props.characters
  troika.color = props.color
  troika.fontSize = props.fontSize
  troika.fontWeight = props.fontWeight
  troika.fontStyle = props.fontStyle
  troika.maxWidth = props.maxWidth
  troika.lineHeight = props.lineHeight
  troika.letterSpacing = props.letterSpacing
  troika.textAlign = props.textAlign
  troika.font = props.font
  troika.anchorX = props.anchorX
  troika.anchorY = props.anchorY
  troika.clipRect = props.clipRect
  troika.depthOffset = props.depthOffset
  troika.direction = props.direction
  troika.overflowWrap = props.overflowWrap
  troika.whiteSpace = props.whiteSpace
  troika.outlineWidth = props.outlineWidth
  troika.outlineOffsetX = props.outlineOffsetX
  troika.outlineOffsetY = props.outlineOffsetY
  troika.outlineBlur = props.outlineBlur
  troika.outlineColor = props.outlineColor
  troika.outlineOpacity = props.outlineOpacity
  troika.strokeWidth = props.strokeWidth
  troika.strokeColor = props.strokeColor
  troika.strokeOpacity = props.strokeOpacity
  troika.fillOpacity = props.fillOpacity
  troika.sdfGlyphSize = props.sdfGlyphSize
  troika.glyphGeometryDetail = props.glyphGeometryDetail

  troika.sync(() => {
    emit('sync', troika)
    invalidate()
  })

  // troika only runs the sync callback (and thus invalidate) when a layout-affecting
  // (syncable) prop changes. Non-syncable visual props such as color, outline, stroke and
  // opacity are applied in onBeforeRender, so request a repaint unconditionally here,
  // otherwise on-demand/manual render modes never repaint when only those props change.
  invalidate()
}

watch([() => props, localText], syncText, { deep: true, immediate: true })

onUnmounted(() => {
  instance.value?.dispose()
})
</script>

<template>
  <primitive :object="instance" />
</template>
