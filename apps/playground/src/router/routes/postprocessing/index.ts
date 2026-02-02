import type { RouteRecordRaw } from 'vue-router'
import { kebabCase } from '@/utils'

const makeRoute = (name: string, icon: string, isThreeEffect: boolean = true): RouteRecordRaw => {
  const nameInKebab = kebabCase(name)
  const folder = isThreeEffect ? 'three' : 'pmndrs'

  return {
    path: `/postprocessing/${folder}/${nameInKebab}`,
    name: `${folder}-${nameInKebab}`,
    meta: {
      icon,
      name,
    },
    component: () => import(`@/pages/postprocessing/${folder}/${nameInKebab}.vue`),
  }
}

const home: RouteRecordRaw = {
  path: '/postprocessing',
  name: 'Postprocessing',
  component: () => import('@/pages/postprocessing/index.vue'),
}

export const threeRoutes = [
  makeRoute('Pixelation', '👾'),
  makeRoute('Glitch', '📺'),
  makeRoute('SMAA', '📐'),
  makeRoute('Halftone', '🎨'),
  makeRoute('Unreal Bloom', '🌼'),
]

export const pmndrsRoutes = [
  makeRoute('Outline', '🔲', false),
  makeRoute('Tone Mapping', '🎨', false),
  makeRoute('Glitch', '📺', false),
  makeRoute('Depth of Field', '📷', false),
  makeRoute('Hue & Saturation', '🎛️', false),
  makeRoute('Kuwahara', '🖼️', false),
  makeRoute('Tilt Shift', '🔍', false),
  makeRoute('Dot Screen', '🔘', false),
  makeRoute('Pixelation', '👾', false),
  makeRoute('Bloom', '🌼', false),
  makeRoute('Noise', '📟', false),
  makeRoute('Chromatic Aberration', '🌈', false),
  makeRoute('Linocut', '🪵', false),
  makeRoute('Color Average', '🎞️', false),
  makeRoute('Lens Distortion', '🌐', false),
  makeRoute('Sepia', '🌅', false),
  makeRoute('God Rays', '🌞', false),
  makeRoute('Scanline', '📽️', false),
  makeRoute('Color Depth', '🔳', false),
  makeRoute('Grid', '#️⃣', false),
  makeRoute('Texture', '🧩', false),
  makeRoute('ASCII', '🔡', false),
  makeRoute('SMAA', '📐', false),
  makeRoute('FXAA', '📐', false),
  makeRoute('Shock Wave', '🌊', false),
  makeRoute('Brightness Contrast', '🔆', false),
  makeRoute('Vignette', '🕶️', false),
  makeRoute('Barrel blur', '🌀', false),
  makeRoute('Fish Eye', '👁️', false),
  makeRoute('On-demand', '🔄', false),
]

export const postProcessingRoutes = [
  home,
  ...threeRoutes,
  ...pmndrsRoutes,
]
