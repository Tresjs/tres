import { addDeprecatedMethods } from './deprecatedMethods'

export type Events = CreateEventsReturn<any, any, any, any>
export type EventsProps = CreateEventsProps<any, any, any, any, any, any>

export interface CreateEventsReturn<TEvent, TIntersection, TObj, TSource> {
  connect: (target: TSource) => void
  disconnect: () => void
  handle: (event: TEvent) => TIntersection[]
  update: () => TIntersection[]
  test: (candidates: TObj[], event?: TEvent) => TIntersection[]
  insert: (instanceOrObject: TObj) => void
  remove: (instanceOrObject: TObj) => void
  patchProp: (instanceOrObj: TObj, propName: string, prevValue: any, nextValue: any) => boolean
  config: any
  enabled: boolean
  target: TSource | undefined
  priority: number
  isEvents: true
}

export interface CreateEventsProps<
  TConfig,
  TCtx,
  TEvt,
  TIntersection,
  TObj,
  TSource,
> {
  getInitialConfig: (context: TCtx) => TConfig
  getInitialEvent: () => TEvt

  connect: (
    source: TSource,
    handle: (e: TEvt) => TIntersection[],
    config: TConfig,
  ) => { disconnect: () => void }

  setUp: (event: TEvt, config: TConfig) => void
  isSetUp: (config: TConfig) => boolean
  filter?: (intersections: TIntersection[], event: TEvt, config: TConfig) => TIntersection[]
  getIntersectionsPool: (event: TEvt, config: TConfig) => TObj[]
  getIntersections: (pool: TObj[], config: TConfig) => TIntersection[]
  handleIntersections: (event: TEvt, intersections: TIntersection[], config: TConfig) => void
  tearDown: (config: TConfig) => void

  insert: (instance: TObj, config: TConfig) => void
  remove: (instance: TObj, config: TConfig) => void
  patchProp: (instanceOrObj: TObj, propName: string, prevValue: any, nextValue: any, config: TConfig) => boolean

  stashLastEvent: (evt: TEvt, config: TConfig) => void
  getLastEvent: (config: TConfig) => TEvt
}

export function createEvents<TConfig, TCtx, TEvent, TIntersection, TObj, TSource>(
  props: CreateEventsProps<TConfig, TCtx, TEvent, TIntersection, TObj, TSource>,
  context: TCtx,
): CreateEventsReturn<TEvent, TIntersection, TObj, TSource> {
  const config = props.getInitialConfig(context)
  let enabled = true
  let priority = 1
  let source = undefined as TSource | undefined
  let lastIntersections = []
  let propsDisconnect = () => {}

  const handle: CreateEventsReturn<TEvent, TIntersection, TObj, TSource>['handle'] = (event) => {
    if (!enabled) {
      return []
    }

    props.setUp(event, config)
    if (props.isSetUp(config) === false) {
      return []
    }

    const intersections = (props.filter)
      ? props.filter(props.getIntersections(props.getIntersectionsPool(event, config), config), event, config)
      : props.getIntersections(props.getIntersectionsPool(event, config), config)
    props.handleIntersections(event, intersections, config)
    props.stashLastEvent(event, config)
    props.tearDown(config)

    lastIntersections = intersections
    return lastIntersections
  }

  const update = () => {
    return handle(props.getLastEvent(config))
  }

  const test = (pool: TObj[], event?: TEvent) => {
    props.setUp(event ?? props.getLastEvent(config), config)
    if (props.isSetUp(config)) {
      const intersections = props.getIntersections(pool, config)
      props.tearDown(config)
      return intersections
    }
    else {
      return []
    }
  }

  const disconnect = () => {
    propsDisconnect()
    propsDisconnect = () => {}
    source = undefined
  }

  /**
   * Connects this Events instance to an event source, e.g., an HTML canvas or div.
   * @param eventTarget – the event source
   */
  const connect = (eventTarget: TSource) => {
    if (eventTarget === source) { return }
    disconnect()
    propsDisconnect = props.connect(eventTarget, handle, config).disconnect
    source = eventTarget
  }

  /**
   * This hook is called when a new object – e.g., a TresObject instance – is added to the scene.
   * @param instanceOrObject – the added object
   */
  const insert = (instanceOrObject: TObj) => {
    props.insert(instanceOrObject, config)
  }

  /**
   * This hook is called when a new object – e.g., a TresObject instance – is remove from the scene.
   * @param instanceOrObject – the removed object
   */
  const remove = (instanceOrObject: TObj) => {
    props.remove(instanceOrObject, config)
  }

  /**
   * This hook is called when an object – e.g., a TresObject instance – prop updates.
   * @param instanceOrObj – the object whose prop will update
   * @param propName – the prop name
   * @param prevValue – the previous prop value
   * @param nextValue – the next prop value
   */
  const patchProp = (instanceOrObj: TObj, propName: string, prevValue: any, nextValue: any) => {
    return props.patchProp(instanceOrObj, propName, prevValue, nextValue, config)
  }

  const result = {
    connect,
    disconnect,
    handle,
    update,
    test,
    insert,
    remove,
    patchProp,
    get config() { return config },
    set enabled(b: boolean) { enabled = b },
    get enabled() { return enabled },
    set priority(n: number) { priority = n },
    get priority() { return priority },
    get target() { return source },
    isEvents: true,
  }

  return addDeprecatedMethods(result)
}
