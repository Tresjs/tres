import type { EmitEventFn, EmitEventName } from '../../types'

export type EventManager = CreateEventManagerReturn<any, any, any, any>
export type EventManagerProps = CreateEventManagerProps<any, any, any, any, any, any>

export interface CreateEventManagerReturn<TEvent, TIntersection, TObj, TTarget> {
  connect: (target: TTarget) => void
  disconnect: () => void
  handle: (event: TEvent) => TIntersection[]
  update: () => TIntersection[]
  test: (candidates: TObj[], event?: TEvent) => TIntersection[]
  insert: (instanceOrObject: TObj) => void
  remove: (instanceOrObject: TObj) => void
  patchProp: (instanceOrObj: TObj, propName: string, prevValue: any, nextValue: any) => boolean
  config: any
  enabled: boolean
  target: TTarget | undefined
  priority: number
  isEventManager: true
}

export interface CreateEventManagerProps<
  TConfig,
  TCtx,
  TEvt,
  TIntersection,
  TObj,
  TTarget,
> {
  getInitialConfig: (context: TCtx, emit: EmitEventFn) => TConfig
  getInitialEvent: () => TEvt

  connect: (
    target: TTarget,
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

export function createEventManager<TConfig, TCtx, TEvent, TIntersection, TObj, TTarget>(
  props: CreateEventManagerProps<TConfig, TCtx, TEvent, TIntersection, TObj, TTarget>,
  context: TCtx,
  emit: EmitEventFn = (_event: EmitEventName, _args: any) => {},
): CreateEventManagerReturn<TEvent, TIntersection, TObj, TTarget> {
  const config = props.getInitialConfig(context, emit)
  let enabled = true
  let priority = 1
  let target = undefined as TTarget | undefined
  let lastIntersections = []
  let propsDisconnect = () => {}

  const handle: CreateEventManagerReturn<TEvent, TIntersection, TObj, TTarget>['handle'] = (event) => {
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
    target = undefined
  }

  const connect = (eventTarget: TTarget) => {
    if (eventTarget === target) { return }
    disconnect()
    propsDisconnect = props.connect(eventTarget, handle, config).disconnect
    target = eventTarget
  }

  const insert = (instanceOrObject: TObj) => {
    props.insert(instanceOrObject, config)
  }

  const remove = (instanceOrObject: TObj) => {
    props.remove(instanceOrObject, config)
  }

  const patchProp = (instanceOrObj: TObj, propName: string, prevValue: any, nextValue: any) => {
    return props.patchProp(instanceOrObj, propName, prevValue, nextValue, config)
  }

  return {
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
    get target() { return target },
    isEventManager: true,
  }
}
