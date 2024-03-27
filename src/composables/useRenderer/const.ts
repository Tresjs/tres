import { ACESFilmicToneMapping, NoToneMapping, PCFSoftShadowMap, SRGBColorSpace } from 'three'

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
  flat: {
    toneMapping: NoToneMapping,
    toneMappingExposure: 1,
  },
}

export type RendererPresetsType = keyof typeof rendererPresets
