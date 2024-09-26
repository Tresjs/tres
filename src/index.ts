// TODO #122 seperate exports differently
import Bloom from './core/postprocessing/Bloom.vue'
import { useEffect } from './core/postprocessing/composables/useEffect'
import DepthOfField from './core/postprocessing/DepthOfField.vue'
import EffectComposer from './core/postprocessing/EffectComposer.vue'
import Glitch from './core/postprocessing/Glitch.vue'
import Noise from './core/postprocessing/Noise.vue'
import Outline from './core/postprocessing/Outline.vue'
import Pixelation from './core/postprocessing/Pixelation.vue'
import Vignette from './core/postprocessing/Vignette.vue'
import { useEffect as useEffectThree } from './core/three/composables/useEffect'
import EffectComposerThree from './core/three/EffectComposer.vue'
import GlitchThree from './core/three/Glitch.vue'
import HalftoneThree from './core/three/Halftone.vue'
import OutputThree from './core/three/Output.vue'
import PixelationThree from './core/three/Pixelation.vue'
import SMAAThree from './core/three/SMAA.vue'
import UnrealBloomThree from './core/three/UnrealBloom.vue'

export {
  Bloom,
  DepthOfField,
  EffectComposer,
  EffectComposerThree,
  Glitch,
  GlitchThree,
  HalftoneThree,
  Noise,
  Outline,
  OutputThree,
  Pixelation,
  PixelationThree,
  SMAAThree,
  UnrealBloomThree,
  useEffect,
  useEffectThree,
  Vignette,
}
