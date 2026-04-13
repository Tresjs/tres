import { advancedRoutes } from './advanced'
import { basicRoutes } from './basic'
import { controlsRoutes } from './controls'
import { miscRoutes } from './misc'

export const lechesRoutes = [
  ...basicRoutes,
  ...controlsRoutes,
  ...advancedRoutes,
  ...miscRoutes,
]

export {
  advancedRoutes,
  basicRoutes,
  controlsRoutes,
  miscRoutes,
}
