import { useLogger } from '@tresjs/core'
import type {
  Light,
} from 'three'
import { 
  DirectionalLightHelper,
  PointLightHelper,
  SpotLightHelper,
  HemisphereLightHelper,
} from 'three'
import { RectAreaLightHelper } from 'three-stdlib'
import type { TresObject } from '../types'

const { logWarning } = useLogger()

type LightHelper = typeof DirectionalLightHelper 
| typeof PointLightHelper 
| typeof SpotLightHelper 
| typeof HemisphereLightHelper 
| typeof RectAreaLightHelper

let currentHelper: LightHelper
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
    if (!el.isLight) {
      logWarning(`${el.type} is not a light`)
      return
    }
    currentHelper = helpers[el.type]
    el.parent.add(new currentHelper(el as never, 1, el.color.getHex()))
  },
  updated: (el: TresObject) => {
    currentInstance = el.parent.children.find((child: TresObject) => child instanceof currentHelper)
    if (currentInstance instanceof RectAreaLightHelper) return
    currentInstance.update()

  },
  unmounted: (el: TresObject) => {
    if (!el.isLight) {
      logWarning(`${el.type} is not a light`)
      return
    }
    currentInstance = el.parent.children.find((child: TresObject) => child instanceof currentHelper)

    if (currentInstance && currentInstance.dispose) {
      currentInstance.dispose()
    }
    el.parent.remove(currentInstance)
  },
}

