import { advancedRoutes } from './advanced'
import { basicRoutes } from './basic'

export const allRoutes = [
  ...basicRoutes,
  ...advancedRoutes,
]

export {
  advancedRoutes,
  basicRoutes,
}
