import { modelsRoutes } from './models'
import { cameraRoutes } from './cameras'
import { eventsRoutes } from './events'
import { basicRoutes } from './basic'
import { advancedRoutes } from './advanced'
import { miscRoutes } from './misc'
import { issuesRoutes } from './issues'
import { loaderRoutes } from './loaders'
import { webgpuRoutes } from './webgpu'

const allRoutes = [
  ...basicRoutes,
  ...advancedRoutes,
  ...eventsRoutes,
  ...cameraRoutes,
  ...modelsRoutes,
  ...miscRoutes,
  ...issuesRoutes,
  ...loaderRoutes,
  ...webgpuRoutes
]

export {
  basicRoutes,
  advancedRoutes,
  eventsRoutes,
  cameraRoutes,
  modelsRoutes,
  miscRoutes,
  issuesRoutes,
  allRoutes,
  loaderRoutes,
  webgpuRoutes
}
