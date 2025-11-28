import type { RendererOptions, TresContext } from '../composables'
import type { TresCamera, TresContextWithClock, TresPointerEvent } from '../types'
import type { TresPointerEventName } from '../utils/pointerEvents'

export interface TresCanvasProps extends RendererOptions {
  /**
   * Custom camera instance to use as main camera
   * If not provided, a default PerspectiveCamera will be created
   */
  camera?: TresCamera
  /**
   * Whether the canvas should be sized to the window
   * When true, canvas will be fixed positioned and full viewport size
   * @default false
   */
  windowSize?: boolean
  /**
   * Whether to enable the provide/inject bridge between Vue and TresJS
   * When true, Vue's provide/inject will work across the TresJS boundary
   * @default true
   */
  enableProvideBridge?: boolean
}

export type TresCanvasEmits = {
  ready: [context: TresContext]
  pointermissed: [event: TresPointerEvent]
  render: [context: TresContext]
  beforeLoop: [context: TresContextWithClock]
  loop: [context: TresContextWithClock]
} & {
  // all pointer events are supported because they bubble up
  [key in TresPointerEventName]: [event: TresPointerEvent]
}

export interface TresCanvasInstance {
  get context(): TresContext | null | undefined
  dispose: () => void
}
