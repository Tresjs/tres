import { advancedRoutes } from './advanced'
import { basicRoutes } from './basic'
import { cameraRoutes } from './cameras'
import { eventsRoutes } from './events'
import { issuesRoutes } from './issues'
import { loaderRoutes } from './loaders'
import { miscRoutes } from './misc'
import { modelsRoutes } from './models'
import { composablesRoutes } from './composables'

const allRoutes = [
  ...basicRoutes,
  ...advancedRoutes,
  ...eventsRoutes,
  ...cameraRoutes,
  ...modelsRoutes,
  ...miscRoutes,
  ...issuesRoutes,
  ...loaderRoutes,
  ...composablesRoutes,
]

export {
  advancedRoutes,
  allRoutes,
  basicRoutes,
  cameraRoutes,
  composablesRoutes,
  eventsRoutes,
  issuesRoutes,
  loaderRoutes,
  miscRoutes,
  modelsRoutes,
}
