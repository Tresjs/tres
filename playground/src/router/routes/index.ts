import { advancedRoutes } from './advanced'
import { basicRoutes } from './basic'
import { controlsRoutes } from './controls'

export const allRoutes = [
  ...basicRoutes,
  ...controlsRoutes,
  ...advancedRoutes,
]

export {
  advancedRoutes,
  basicRoutes,
  controlsRoutes,
}
