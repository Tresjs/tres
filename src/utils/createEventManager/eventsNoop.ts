// NOTE:
// This file consists of functions
// used by `./createEventManager`.
//
// In this case, it causes `eventManager` to
// attach no events and do nothing.

import type { CreateEventManagerProps } from './createEventManager'

function getInitialEvent() { return null }
function getInitialConfig() { return {} }
function stashLastEvent() { }
function getLastEvent() { return null }
function connect() { return { disconnect: () => { } } }
function setUp() { }
function isSetUp() { return false }
function tearDown() { }
function getIntersectionsPool() { return [] }
function getIntersections() { return [] }
function insert() { }
function remove() { }
function patchProp() { return false }
function handleIntersections() { }

export const eventsNoop: CreateEventManagerProps<any, any, null, null, any, null> = {
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
