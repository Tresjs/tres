import { abstractionsRoutes } from './abstractions'
import { controlsRoutes } from './controls'
import { debugPerformanceRoutes } from './debug-performance'
import { lightShadowRoutes } from './light-shadow'
import { loadersRoutes } from './loaders'
import { materialsRoutes } from './materials'
import { miscellaneousRoutes } from './miscellaneous'
import { objectsRoutes } from './objects'
import { shapesRoutes } from './shapes'
import { stagingRoutes } from './staging'

const cientosRoutes = [
  ...abstractionsRoutes,
  ...controlsRoutes,
  ...debugPerformanceRoutes,
  ...lightShadowRoutes,
  ...loadersRoutes,
  ...materialsRoutes,
  ...miscellaneousRoutes,
  ...objectsRoutes,
  ...shapesRoutes,
  ...stagingRoutes,
]

export {
  abstractionsRoutes,
  cientosRoutes,
  controlsRoutes,
  debugPerformanceRoutes,
  lightShadowRoutes,
  loadersRoutes,
  materialsRoutes,
  miscellaneousRoutes,
  objectsRoutes,
  shapesRoutes,
  stagingRoutes,
}
