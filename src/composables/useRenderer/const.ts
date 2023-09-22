import { ACESFilmicToneMapping, PCFSoftShadowMap, SRGBColorSpace } from 'three'

export const rendererPresets = {
  realistic: {
    shadows: true,
    physicallyCorrectLights: true,
    outputColorSpace: SRGBColorSpace,
    toneMapping: ACESFilmicToneMapping,
    toneMappingExposure: 3,
    shadowMap: {
      enabled: true,
      type: PCFSoftShadowMap,
    },
  },
}

export type RendererPresetsType = keyof typeof rendererPresets
