/* eslint-disable perfectionist/sort-named-exports */
import { useEffect } from './composables/useEffect'
import EffectComposer, { type EffectComposerProps } from './EffectComposer.vue'
import Film, { type FilmProps } from './Film.vue'
import Glitch, { type GlitchProps } from './Glitch.vue'
import Halftone, { type HalftoneProps } from './Halftone.vue'
import Pixelation, { type PixelationProps } from './Pixelation.vue'
import Output from './Output.vue'
import SMAA, { type SMAAProps } from './SMAA.vue'
import SAO, { type SAOProps } from './SAO.vue'
import UnrealBloom, { type UnrealBloomProps } from './UnrealBloom.vue'

export {
  EffectComposer,

  SAO,
  Film,
  SMAA,
  Output,
  Glitch,
  Halftone,
  Pixelation,
  UnrealBloom,

  useEffect,

  SAOProps,
  SMAAProps,
  FilmProps,
  GlitchProps,
  HalftoneProps,
  PixelationProps,
  UnrealBloomProps,
  EffectComposerProps,
}
