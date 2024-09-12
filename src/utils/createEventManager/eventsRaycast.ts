import { Raycaster, Vector2, Vector3 } from 'three'
import type { Object3D, Intersection as ThreeIntersection } from 'three'
import { prepareTresInstance } from '..'
import * as is from '../is'
import { DOM_EVENT_NAMES, DOM_TO_PASSIVE, DOM_TO_THREE, type DomEventName, type DomEventTarget, POINTER_EVENT_NAMES } from './const'
import { deprecatedEventsToNewEvents } from './deprecatedEvents'
import { isVueEventName, patchEvent } from './eventModifiers'
import type { TresContext } from '../../composables'
import type { EventHandlers, IntersectionEvent, Properties, ThreeEvent, TresInstance, TresObject } from '../../types'
import type { CreateEventManagerProps } from './createEventManager'

// NOTE:
// This file consists of type definitions and functions
// used by `./createEventManager`.
//
// In particular, see `handle` in `./createEventManager` to
// see the call order of the functions here.
//
// For portability and simplicity, note that the functions
// here act only on their arguments and do not reach out to
// the enclosing scope. Please attempt to keep it that way.

// NOTE: Aliasing these and grouping here to make
// future modifications simpler if Event type changes.
type RaycastEvent = MouseEvent | PointerEvent | WheelEvent
type RaycastEventTarget = DomEventTarget
type ThreeEventStub<DomEvent> = Omit<ThreeEvent<DomEvent>, 'eventObject' | 'object' | 'distance' | 'point'> & Partial<IntersectionEvent<DomEvent>>
type Object3DWithEvents = Object3D & EventHandlers

function getInitialEvent() {
  // NOTE: Unit tests will without this check
  if (typeof PointerEvent !== 'undefined') {
    return new PointerEvent('pointermove')
  }
  return new MouseEvent('mousemove')
}

type RaycastProps = CreateEventManagerProps<
  Config,
  TresContext,
  RaycastEvent,
  ThreeIntersection,
  Object3D,
  RaycastEventTarget
>
type Config = ReturnType<typeof getInitialConfig>

function getInitialConfig(context: TresContext) {
  return {
    context,

    isEventsDirty: true,

    raycaster: new Raycaster(),
    // NOTE: Pointer as normalized device coordinates (NDC):
    // x in range (-1, 1), y in range (-1, 1)
    // See: https://threejs.org/docs/#api/en/core/Raycaster
    pointer: new Vector2(0, 0),
    pointerDownPosition: new Vector2(0, 0),

    objectsWithEvents: [] as Object3D[],

    intersections: [] as ThreeIntersection[],
    hits: new Set<Object3D>(),
    blockingObjects: new Set<Object3D>(),

    lastMoveEvent: getInitialEvent(),
  }
}

function stashLastEvent(evt: Event, config: Config) {
  if (evt.type === 'pointermove') {
    config.lastMoveEvent = evt as PointerEvent
  }
}

function getLastEvent(config: Config) {
  return config.lastMoveEvent
}

function connect(target: RaycastEventTarget, eventManagerHandler: (ev: RaycastEvent) => void) {
  for (const domEventName of POINTER_EVENT_NAMES) {
    target.addEventListener(domEventName, eventManagerHandler, { passive: DOM_TO_PASSIVE[domEventName] })
  }

  return {
    disconnect: () => {
      for (const domEventName of POINTER_EVENT_NAMES) {
        target.removeEventListener(domEventName, eventManagerHandler)
      }
    },
  }
}

function setUp(event: RaycastEvent, config: Config) {
  config.pointer.set(
    (event.offsetX / config.context.sizes.width.value) * 2 - 1,
    -(event.offsetY / config.context.sizes.height.value) * 2 + 1,
  )
  if (config.context.camera.value) {
    config.raycaster.setFromCamera(config.pointer, config.context.camera.value)
  }
}

function isSetUp(config: Config) {
  return !!(config.raycaster.camera)
}

function tearDown(config: Config) {
  // @ts-expect-error - Type does not accept the default `null` value.
  config.raycaster.camera = null
}

function getIntersectionsPool(_event: RaycastEvent, config: Config) {
  // NOTE: Perf
  //
  // This function:
  // - gathers and returns the objects that require hit-testing
  // - writes down a few `config` properites to later bail out of
  //   processing associated with particular events.
  //
  // Everything set here is to limit the number
  // of hit-tested objects.

  if (config.isEventsDirty) {
    function getIntersectionsPoolRecurHelper(object: Object3DWithEvents, hasEvents: boolean) {
      // NOTE: We don't need to check for events if we're in a tree that `hasEvents`.
      if (!hasEvents) {
        for (const domEventName of DOM_EVENT_NAMES) {
          if (DOM_TO_THREE[domEventName] in object) {
            hasEvents = true
            break
          }
        }
      }

      if (object.children) {
        for (const child of object.children) {
          getIntersectionsPoolRecurHelper(child, hasEvents)
        }
      }

      // NOTE: `push`ing after processing children leads to a
      // "children-first" object ordering. This is useful for
      // stopping `@pointermissed`, which doesn't bubble and
      // which can't rely on intersections order or "hits"
      // order, by definition.
      if (hasEvents) { config.objectsWithEvents.push(object) }
    }

    // NOTE: We are here because `config.isEventsDirty === true`.
    // This flag signals that THREE objects have changed in a way
    // that may have altered event handlers.
    //
    // Reset the `config` properties, then recurse through the scene
    // to gather/set appropriate values.

    config.isEventsDirty = false
    config.objectsWithEvents.length = 0
    getIntersectionsPoolRecurHelper(config.context.scene.value, false)
  }

  return config.objectsWithEvents
}

function getIntersections(pool: Object3DWithEvents[], config: Config) {
  return config.raycaster.intersectObjects(pool, false)
}

function insert(_instance: TresObject, config: Config) {
  config.isEventsDirty = true
}

function patchProp(instance: TresObject, propName: string, prevValue: any, nextValue: any, config: Config) {
  if (!is.object3D(instance)) { return false }

  propName = deprecatedEventsToNewEvents(propName)

  if (propName === 'blocking') {
    if (nextValue) {
      config.blockingObjects.add(instance as Object3D);
      (instance as TresInstance).__tres.eventCount = 1
    }
    else {
      config.blockingObjects.delete(instance as Object3D)
    }
    return true
  }

  if (!isVueEventName(deprecatedEventsToNewEvents(propName))) {
    return false
  }

  if (!instance.__tres) { prepareTresInstance(instance, {}, config.context) }
  (instance as TresInstance).__tres.eventCount = 1
  patchEvent(instance as TresInstance, deprecatedEventsToNewEvents(propName), prevValue, nextValue)
  config.isEventsDirty = true

  return true
}

function remove(_instance: TresObject, config: Config) {
  if (!_instance.isObject3D) { return }

  // NOTE: This function will typically be called with an object
  // that's about to be removed. We will only get the top-level
  // object and not the descendants.
  // Grab the object and all descendants.
  const instanceAndDescendants = new Set()
  const children = [_instance]

  while (children.length) {
    const child = children.pop()
    if (child) {
      instanceAndDescendants.add(child)
      if (is.arr(child.children)) {
        for (const c of child.children) {
          children.push(c)
        }
      }
    }
  }

  config.objectsWithEvents = config.objectsWithEvents.filter(obj => !instanceAndDescendants.has(obj))

  const intersections = config.intersections.filter(intersection => !instanceAndDescendants.has(intersection.object))

  // NOTE: We will call `pointerout` and `pointerleave` if the to-be-removed
  // object was under the mouse. That logic is contained within `handleEvent`.
  // So rehandle the saved event, but without instance and its descendants
  // in `intersections`.
  handleIntersections(getLastEvent(config), intersections, config)

  // NOTE: Remove the remaining traces of the object and descendants
  config.hits = config.hits.difference(instanceAndDescendants)
  config.isEventsDirty = true
}

function handleIntersections(incomingEvent: RaycastEvent, intersections: ThreeIntersection[], config: Config) {
  // NOTE: STRUCTURE OF THIS FUNCTION BODY
  // 1) Gather `hits`. This set includes all "hit" meshes and their ancestors.
  // 2) Create an outgoing event "stub" with the fields common to all events
  // handlers will receive.
  // 3) Propagate the events to handlers.

  // NOTE:
  // 1) Gather `hits`
  // Traverse up through ancestors of each intersection to
  // populate `hits` and `event.intersections`.
  //
  // The result is the bubble order for events.
  // For graph: gparent => parentA, parentB ; parentA => childA
  // and THREE.Intersections: [childA, parentB]
  // bubble/`hits` order is: [childA, parentA, gparent, parentB]
  //
  // `event.intersections` order is (showing `intersection.eventObject`):
  // [childA, parentA, gparent, parentB, gparent]
  // (assuming all objects have events attached)
  //
  // Blocking
  // We will also watch for "blocking" (solid) objects.
  // To pretend that "blocking" objects don't allow raycasting
  // to continue behind them, we'll stop processing intersections
  // after we see one containing a "blocking" object.
  const hits = new Set<Object3D>()
  const eventIntersections = []
  let obj: TresObject | null = null
  let hasBlockingObject = false
  for (const intersection of intersections) {
    obj = intersection.object
    if (hits.has(obj)) {
      continue
    }
    while (obj) {
      if (config.blockingObjects.has(obj)) {
        hasBlockingObject = true
      }
      if (obj.__tres?.eventCount) {
        eventIntersections.push({ ...intersection, eventObject: obj })
      }
      hits.add(obj)
      obj = obj.parent
    }
    if (hasBlockingObject) {
      // NOTE: We've found a blocking object.
      // We pretend it's "solid" and doesn't allow
      // raycaster rays to continue "behind it".
      // So we'll stop adding intersections.
      break
    }
  }

  // NOTE:
  // 2) Create the outgoing event "stub".
  // This includes the fields that all subsequent
  // event handler calls will need.
  const distance = (incomingEvent.type === 'click' || incomingEvent.type === 'contextmenu' || incomingEvent.type === 'dblclick' || incomingEvent.type === 'pointerup')
    ? Math.sqrt(((incomingEvent.offsetX - config.pointerDownPosition.x) ** 2) + ((incomingEvent.offsetY - config.pointerDownPosition.y) ** 2))
    : 0

  if (incomingEvent.type === 'pointerdown') {
    config.pointerDownPosition.x = incomingEvent.offsetX
    config.pointerDownPosition.y = incomingEvent.offsetY
  }

  const unprojectedPoint = new Vector3(config.pointer.x, config.pointer.y, 0).unproject(config.context.camera.value!)

  const outgoingEvent: ThreeEventStub<typeof incomingEvent> = Object.assign(
    getEventNonFunctionProperties(incomingEvent),
    {
      intersections: eventIntersections,
      unprojectedPoint,
      pointer: config.pointer,
      delta: distance,
      ray: config.raycaster.ray,
      camera: config.raycaster.camera,
      nativeEvent: incomingEvent,
      stopped: false,
      stopPropagation: () => {},
    },
  )

  outgoingEvent.stopPropagation = () => { outgoingEvent.stopped = true }

  // NOTE:
  // 3) Propagate the events to handlers.
  //
  // NOTE: Propagate `pointermissed`.
  // Propagated first so other user handlers can clean up the effects.
  if (incomingEvent.type === 'click' || incomingEvent.type === 'dblclick' || incomingEvent.type === 'contextmenu') {
    outgoingEvent.stopped = false
    for (const obj of config.objectsWithEvents) {
      if (outgoingEvent.stopped) { break }
      if (hits.has(obj)) { continue }
      outgoingEvent.eventObject = obj
      outgoingEvent.eventObject[DOM_TO_THREE['pointermissed' as DomEventName]]?.(outgoingEvent)
    }
  }

  // NOTE: Propagate `pointer{out,leave,over,enter}`
  if (incomingEvent.type === 'pointermove') {
    const hitsLeft = config.hits.difference(hits)
    if (hitsLeft.size) {
      bubbleIntersectionsIf('pointerout', outgoingEvent, config.intersections, (obj: Object3D) => { return hitsLeft.has(obj) })
      bubbleIntersectionsIf('pointerleave', outgoingEvent, config.intersections, (obj: Object3D) => { return hitsLeft.has(obj) })
    }
    const hitsEntered = hits.difference(config.hits)
    if (hitsEntered.size) {
      bubbleIntersectionsIf('pointerover', outgoingEvent, intersections, (obj: Object3D) => { return hitsEntered.has(obj) })
      bubbleIntersectionsIf('pointerenter', outgoingEvent, intersections, (obj: Object3D) => { return hitsEntered.has(obj) })
    }
  }

  // NOTE: Propagate `incomingEvent.type`, e.g.:
  // `click`, `dblclick`, `pointermove`, etc.
  if (incomingEvent.type in DOM_TO_THREE) {
    const duplicates = new Set()

    outgoingEvent.stopped = false

    for (const intersection of outgoingEvent.intersections) {
      if (outgoingEvent.stopped) { break }

      if (duplicates.has(intersection.eventObject)) { continue }
      duplicates.add(intersection.eventObject)

      // NOTE: An event "is-a" `Intersection`,
      // so copy intersection values to the event.
      Object.assign(outgoingEvent, intersection)

      intersection.eventObject[DOM_TO_THREE[incomingEvent.type as DomEventName]]?.(outgoingEvent)
    }
  }

  config.intersections = intersections
  config.hits = hits
}

function bubbleIntersectionsIf(domEventName: DomEventName, event: ThreeEventStub<MouseEvent>, intersections: ThreeIntersection[], cond: (a: any) => boolean) {
  const duplicates = new Set()

  event.stopped = false

  for (const intersection of intersections) {
    if (event.stopped) { break }

    // NOTE: An event "is-a" `Intersection`,
    // so copy intersection values to the event.
    Object.assign(event, intersection)
    let object: Object3DWithEvents | null = intersection.object
    while (object && !duplicates.has(object) && !event.stopped) {
      duplicates.add(object)
      if (cond(object)) {
        event.eventObject = object
        event.eventObject[DOM_TO_THREE[domEventName]]?.(event)
      }

      object = object.parent
    }
  }
}

function getEventNonFunctionProperties<TEvent>(sourceEvent: TEvent): Properties<TEvent> {
  const destination: Record<string, any> = {}
  // NOTE: Mouse/Pointer Event props aren't enumerable.
  // Copies properties to another object.
  for (const property in sourceEvent) {
    if (!is.fun(sourceEvent[property])) {
      destination[property] = sourceEvent[property]
    }
  }
  return destination as Properties<TEvent>
}

export const eventsRaycast: RaycastProps = {
  connect,
  isSetUp,
  setUp,
  tearDown,
  getIntersectionsPool,
  getIntersections,
  handleIntersections,
  getInitialConfig,
  getInitialEvent,
  stashLastEvent,
  getLastEvent,
  insert,
  remove,
  patchProp,
}
