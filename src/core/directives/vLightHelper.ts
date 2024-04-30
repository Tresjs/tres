import { useLogger } from '@tresjs/core'
import type { Light } from 'three'
import { DirectionalLightHelper, HemisphereLightHelper, PointLightHelper, SpotLightHelper } from 'three'
import { RectAreaLightHelper } from 'three-stdlib'

type LightHelper = typeof DirectionalLightHelper | typeof PointLightHelper | typeof SpotLightHelper | typeof HemisphereLightHelper | typeof RectAreaLightHelper
const { logWarning } = useLogger()

let CurrentHelper: LightHelper
let currentInstance: any

const helpers: Record<string, LightHelper> = {
  DirectionalLight: DirectionalLightHelper,
  PointLight: PointLightHelper,
  SpotLight: SpotLightHelper,
  HemisphereLight: HemisphereLightHelper,
  RectAreaLight: RectAreaLightHelper,
}

export const vLightHelper = {
  mounted: (el: Light) => {
    if (!el.isLight) {
      logWarning(`${el.type} is not a light`)
      return
    }
    CurrentHelper = helpers[el.type]
    el?.parent?.add(new CurrentHelper(el as never, el.intensity))
  },
  updated: (el: any) => {
    currentInstance = el.parent.children.find((child: any) => child instanceof CurrentHelper)
    if (currentInstance instanceof RectAreaLightHelper) { return }
    currentInstance.update()
  },
  unmounted: (el: any) => {
    if (!el.isLight) {
      logWarning(`${el.type} is not a light`)
      return
    }
    currentInstance = el.parent.children.find((child: any) => child instanceof CurrentHelper)
    currentInstance.dispose()
    el.parent.remove(currentInstance)
  },
}
