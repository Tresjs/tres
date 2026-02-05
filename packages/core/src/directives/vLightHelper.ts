import type {
  Light,
} from 'three'
import type { TresObject } from '../types'
import {
  DirectionalLightHelper,
  HemisphereLightHelper,
  PointLightHelper,
  SpotLightHelper,
} from 'three'
import { RectAreaLightHelper } from 'three-stdlib'
import { logWarning } from '../utils/logger'
import { isLight } from '../utils/is'

type LightHelper = typeof DirectionalLightHelper
  | typeof PointLightHelper
  | typeof SpotLightHelper
  | typeof HemisphereLightHelper
  | typeof RectAreaLightHelper

let CurrentHelper: LightHelper
let currentInstance: TresObject

const helpers: Record<Light['type'], LightHelper> = {
  DirectionalLight: DirectionalLightHelper,
  PointLight: PointLightHelper,
  SpotLight: SpotLightHelper,
  HemisphereLight: HemisphereLightHelper,
  RectAreaLight: RectAreaLightHelper,
}

export const vLightHelper = {
  mounted: (el: TresObject) => {
    if (!isLight(el)) {
      logWarning(`${el.type} is not a light`)
      return
    }
    CurrentHelper = helpers[el.type]
    el.parent?.add(new CurrentHelper(el as never, 1, el.color.getHex()))
  },
  updated: (el: TresObject) => {
    currentInstance = el.parent?.children.find((child: TresObject) => child instanceof CurrentHelper)
    if (currentInstance instanceof RectAreaLightHelper) {
      return
    }
    currentInstance.update()
  },
  unmounted: (el: TresObject) => {
    if (!el.isLight) {
      logWarning(`${el.type} is not a light`)
      return
    }
    currentInstance = el.parent?.children.find((child: TresObject) => child instanceof CurrentHelper)

    if (currentInstance && currentInstance.dispose) {
      currentInstance.dispose()
    }
    if (el.parent) {
      el.parent.remove(currentInstance)
    }
  },
}
