import { abstractionsRoutes } from './abstractions'
import { controlsRoutes } from './controls'
import { loadersRoutes } from './loaders'
import { materialsRoutes } from './materials'
import { miscRoutes } from './misc'
import { shapesRoutes } from './shapes'
import { stagingRoutes } from './staging'
import { performanceRoutes } from './performance'

const cientosRoutes = [
  ...abstractionsRoutes,
  ...controlsRoutes,
  ...loadersRoutes,
  ...materialsRoutes,
  ...miscRoutes,
  ...shapesRoutes,
  ...stagingRoutes,
  ...performanceRoutes,
]
export {
  abstractionsRoutes,
  controlsRoutes,
  loadersRoutes,
  materialsRoutes,
  miscRoutes,
  shapesRoutes,
  stagingRoutes,
  performanceRoutes,
  cientosRoutes,
}
