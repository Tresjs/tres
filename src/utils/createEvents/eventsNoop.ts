// NOTE:
// This file consists of functions
// used by `./createEvents`.
//
// In this case, it causes `events` to
// attach no events and do nothing.

import type { CreateEventsProps } from './createEvents'

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

export const eventsNoop: CreateEventsProps<any, any, null, null, any, null> = {
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
