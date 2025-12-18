import { advancedRoutes } from './advanced'
import { basicRoutes } from './basic'
import { cameraRoutes } from './cameras'
import { eventsRoutes } from './events'
import { issuesRoutes } from './issues'
import { loaderRoutes } from './loaders'
import { miscRoutes } from './misc'
import { modelsRoutes } from './models'

const coreRoutes = [
  ...basicRoutes,
  ...advancedRoutes,
  ...eventsRoutes,
  ...cameraRoutes,
  ...modelsRoutes,
  ...miscRoutes,
  ...issuesRoutes,
  ...loaderRoutes,
]

export {
  advancedRoutes,
  coreRoutes,
  basicRoutes,
  cameraRoutes,
  eventsRoutes,
  issuesRoutes,
  loaderRoutes,
  miscRoutes,
  modelsRoutes,
}
