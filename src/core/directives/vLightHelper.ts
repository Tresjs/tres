import { useLogger } from '@tresjs/core'
import { DirectionalLightHelper, PointLightHelper, SpotLightHelper, HemisphereLightHelper } from 'three'

const { logWarning } = useLogger()

export const vLightHelper = {
  mounted: (el: any) => {
    if (!el.isLight) {
      logWarning(`${el.type} is not a light`)
      return
    }
    const currentHelper = helpers[el.type]
    el.parent.add(new currentHelper(el))
  },
}

const helpers = {
  DirectionalLight: DirectionalLightHelper,
  PointLight: PointLightHelper,
  SpotLight: SpotLightHelper,
  HemisphereLight: HemisphereLightHelper,
}
