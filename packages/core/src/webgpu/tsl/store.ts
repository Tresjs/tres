import type { ShallowRef } from 'vue'
import { effectScope, markRaw, onScopeDispose, shallowReactive, shallowRef, toRaw, watch } from 'vue'
import { isProd, logWarning } from '../../utils/logger'

export type TslKind = 'uniforms' | 'nodes' | 'passes'

// Addresses the root entries in `remove`, `clear` and `rebuild`, so no scope can be named `root`.
export const ROOT_SCOPE = 'root'

export type TslBuild<L> = (stores: TslStores) => Record<string, L>

export interface TslRegisterOptions {
  scope?: string
  // Same owner with a different `source` is a hot update: it replaces the previous registration's entries.
  owner?: string
  source?: string
}

export interface TslRegisterResult {
  created: Set<string>
}

export type TslReadLog = Map<string, { seen: unknown, current: () => unknown }>

export interface TslSessionOptions {
  label?: string
  warnMissing?: boolean
  // Only consumers that watch the session need the scopes it read.
  trackScopes?: boolean
}

export interface TslSession {
  stores: TslStores
  reads: TslReadLog
  // Keys (`kind/scope`) of the scopes the session read, and the sum of their generations at close.
  scopes: Set<string>
  generation: number
  close: () => void
}

export interface TslStores {
  uniforms: Record<string, any>
  nodes: Record<string, any>
  passes: Record<string, any>
}

const isRootScope = (scope: string | undefined) => scope === undefined || scope === ROOT_SCOPE

const hasDispose = (value: unknown): value is { dispose: () => void } =>
  typeof (value as { dispose?: unknown })?.dispose === 'function'

export const isTslReadLogStale = (reads: TslReadLog) => {
  for (const { seen, current } of reads.values()) {
    if (current() !== seen) { return true }
  }
  return false
}

const scopeKeyOf = (kind: TslKind, scope: string | undefined) => `${kind}/${scope ?? ''}`

type Toucher = (kind: TslKind, scope: string | undefined) => void

const noTouch: Toucher = () => {}

// Vue tracks only the entries and scopes the session read, so other registrations and rebuilds cost nothing.
export function watchTslSession(store: TslStore, session: Readonly<ShallowRef<TslSession | undefined>>, onChange: () => void) {
  const outdated = () => {
    const current = session.value
    return current !== undefined
      && (store.scopeGeneration(current.scopes) !== current.generation || isTslReadLogStale(current.reads))
  }
  return watch([outdated, store.generation], ([isOutdated, generation], [, previousGeneration]) => {
    if (isOutdated || generation !== previousGeneration) { onChange() }
  })
}

const ownerKey = (name: string, scope: string | undefined) => `${scope ?? ''}\0${name}`

const callSiteKey = (owner: string, scope: string | undefined) => `${owner}\0${scope ?? ''}`

export interface TslRegistration<L> {
  scope: string | undefined
  build: TslBuild<L>
  keys: Set<string>
  reads: TslReadLog | undefined
  owner?: string
  source?: string
}

export interface TslCollection<L extends object = any> {
  readonly kind: TslKind
  readonly root: Map<string, L>
  readonly scopes: Map<string, Map<string, L>>
  readonly registrations: Set<TslRegistration<L>>
  get: (name: string, scope?: string) => L | undefined
  set: (name: string, leaf: L, scope?: string) => void
  // The first registration of a name wins.
  register: (build: TslBuild<L>, options?: TslRegisterOptions) => TslRegisterResult
  remove: (names: string | string[], scope?: string) => void
  // No argument clears everything; `'root'` clears only the root entries.
  clear: (scope?: string) => void
  rebuild: (scope?: string) => void
  rerunStale: () => boolean
  dispose: () => void
  // With no scope: the root entries and the scope names.
  keys: (scope?: string) => string[]
}

export interface TslStore {
  readonly uniforms: TslCollection
  readonly nodes: TslCollection
  readonly passes: TslCollection
  readonly collections: readonly TslCollection[]
  // Bumped by a rebuild without a scope: every consumer rebuilds.
  readonly generation: ShallowRef<number>
  // Sum of the generations of the given scope keys. A scoped rebuild bumps only its own key.
  scopeGeneration: (scopeKeys: Iterable<string>) => number
  notify: () => void
  rebuild: (fn: () => void, scopeKey?: string) => void
  createSession: (options?: TslSessionOptions) => TslSession
  onDispose: (fn: () => void) => void
  dispose: () => void
}

type TslCollectionHost = Pick<TslStore, 'notify' | 'rebuild' | 'createSession'>

function createTslCollection<L extends object = any>(kind: TslKind, host: TslCollectionHost): TslCollection<L> {
  // Reactive per key, so an effect that read `uTime` reruns only when `uTime` changes. Values stay raw.
  const root = shallowReactive(new Map<string, L>())
  const scopes = shallowReactive(new Map<string, Map<string, L>>())
  // Internal reads skip the proxies: only writes need to trigger, and only views need to track.
  const rawRoot = toRaw(root)
  const rawScopes = toRaw(scopes)
  const peek = (scope: string | undefined) => {
    if (isRootScope(scope)) { return rawRoot }
    const found = rawScopes.get(scope!)
    return found && toRaw(found)
  }
  const registrations = new Set<TslRegistration<L>>()
  // Indexes that keep `register` and `remove` O(1) when hundreds of components register.
  const owners = new Map<string, TslRegistration<L>>()
  const callSites = new Map<string, TslRegistration<L>>()

  const bucket = (scope: string | undefined, create = false) => {
    if (isRootScope(scope)) { return root }
    let found = rawScopes.get(scope!)
    if (!found && create) {
      if (!isProd && rawRoot.has(scope!)) {
        logWarning(`TSL ${kind}: the scope "${scope}" has the same name as a root entry. Reads return the root entry.`)
      }
      found = shallowReactive(new Map<string, L>())
      scopes.set(scope!, found)
    }
    return found
  }

  const get = (name: string, scope?: string) => peek(scope)?.get(name)

  const write = (name: string, leaf: L, scope: string | undefined) => {
    if (!isProd && isRootScope(scope) && rawScopes.has(name)) {
      logWarning(`TSL ${kind}: the root entry "${name}" has the same name as a scope. Reads return the root entry.`)
    }
    bucket(scope, true)!.set(name, (typeof leaf === 'object' || typeof leaf === 'function') ? markRaw(leaf) : leaf)
  }

  const drop = (reg: TslRegistration<L>) => {
    registrations.delete(reg)
    if (reg.owner) {
      const key = callSiteKey(reg.owner, reg.scope)
      if (callSites.get(key) === reg) { callSites.delete(key) }
    }
  }

  // A name has one owner: the registration that wrote it last.
  const claim = (name: string, scope: string | undefined, reg: TslRegistration<L>) => {
    const key = ownerKey(name, scope)
    const previous = owners.get(key)
    if (previous && previous !== reg) {
      previous.keys.delete(name)
      if (previous.keys.size === 0) { drop(previous) }
    }
    owners.set(key, reg)
    reg.keys.add(name)
  }

  const disown = (name: string, scope: string | undefined) => {
    const key = ownerKey(name, scope)
    const owner = owners.get(key)
    if (!owner) { return }
    owners.delete(key)
    owner.keys.delete(name)
    if (owner.keys.size === 0) { drop(owner) }
  }

  const run = (reg: TslRegistration<L>) => {
    const session = host.createSession({ label: `${kind} creator`, warnMissing: true })
    try {
      return reg.build(session.stores)
    }
    finally {
      session.close()
      reg.reads = session.reads.size > 0 ? session.reads : undefined
    }
  }

  const rerun = (reg: TslRegistration<L>) => {
    const result = run(reg)
    for (const name of [...reg.keys]) {
      if (result[name] != null) {
        write(name, result[name], reg.scope)
      }
      else {
        bucket(reg.scope)?.delete(name)
        disown(name, reg.scope)
      }
    }
  }

  const clearIndexes = () => {
    registrations.clear()
    owners.clear()
    callSites.clear()
  }

  return {
    kind,
    root,
    scopes,
    registrations,
    get,

    set(name, leaf, scope) {
      write(name, leaf, scope)
      host.notify()
    },

    register(build, { scope, owner, source } = {}) {
      const scopeKey = isRootScope(scope) ? undefined : scope
      const callSite = owner ? callSiteKey(owner, scopeKey) : undefined
      const previous = callSite ? callSites.get(callSite) : undefined
      const replaces = previous !== undefined && previous.source !== source

      const registration: TslRegistration<L> = { scope: scopeKey, build, keys: new Set(), reads: undefined, owner, source }
      const created = new Set<string>()
      const result = run(registration)

      for (const [name, leaf] of Object.entries(result)) {
        if (leaf == null) { continue }
        if (get(name, scopeKey) === undefined || (replaces && previous.keys.has(name))) {
          write(name, leaf, scopeKey)
          claim(name, scopeKey, registration)
          created.add(name)
        }
      }

      if (replaces) {
        for (const name of previous.keys) {
          bucket(scopeKey)?.delete(name)
          owners.delete(ownerKey(name, scopeKey))
        }
        drop(previous)
      }

      if (registration.keys.size > 0) {
        registrations.add(registration)
        if (callSite) { callSites.set(callSite, registration) }
      }

      if (created.size > 0 || replaces) {
        host.notify()
      }

      return { created }
    },

    remove(names, scope) {
      const found = bucket(scope)
      if (!found) { return }
      const scopeKey = isRootScope(scope) ? undefined : scope
      let changed = false

      for (const name of Array.isArray(names) ? names : [names]) {
        if (found.delete(name)) {
          changed = true
          disown(name, scopeKey)
        }
      }

      if (changed) {
        host.notify()
      }
    },

    clear(scope) {
      if (scope === undefined) {
        root.clear()
        scopes.clear()
        clearIndexes()
      }
      else {
        const scopeKey = scope === ROOT_SCOPE ? undefined : scope
        if (scopeKey === undefined) { root.clear() }
        else { scopes.delete(scopeKey) }
        for (const reg of [...registrations]) {
          if (reg.scope !== scopeKey) { continue }
          for (const name of reg.keys) { owners.delete(ownerKey(name, scopeKey)) }
          drop(reg)
        }
      }
      host.notify()
    },

    rebuild(scope) {
      const scopeKey = scope === undefined ? undefined : scopeKeyOf(kind, isRootScope(scope) ? undefined : scope)
      host.rebuild(() => {
        const matching = [...registrations].filter(reg =>
          scope === undefined
          || (scope === ROOT_SCOPE ? reg.scope === undefined : reg.scope === scope))

        for (const reg of matching) {
          for (const name of reg.keys) {
            bucket(reg.scope)?.delete(name)
          }
        }
        for (const reg of matching) {
          rerun(reg)
        }
      }, scopeKey)
    },

    rerunStale() {
      let ran = false
      for (const reg of [...registrations]) {
        if (reg.reads && isTslReadLogStale(reg.reads)) {
          rerun(reg)
          ran = true
        }
      }
      return ran
    },

    dispose() {
      if (kind === 'passes') {
        for (const entries of [rawRoot, ...rawScopes.values()]) {
          for (const leaf of toRaw(entries).values()) {
            if (hasDispose(leaf)) { leaf.dispose() }
          }
        }
      }
      root.clear()
      scopes.clear()
      clearIndexes()
    },

    keys(scope) {
      if (scope !== undefined) {
        return [...(scopes.get(scope)?.keys() ?? [])]
      }
      // A root entry and a scope can share a name; a proxy `ownKeys` trap throws on duplicates.
      return [...new Set([...root.keys(), ...scopes.keys()])]
    },
  }
}

export function createTslStore(onChange: () => void = () => {}): TslStore {
  const generation = shallowRef(0)
  const scopeGenerations = shallowReactive(new Map<string, number>())
  const collections: TslCollection[] = []
  const scope = effectScope(true)
  let rebuilding = false

  const notify = () => {
    if (rebuilding || !scope.active) { return }
    onChange()
  }

  const scopeGeneration = (scopeKeys: Iterable<string>) => {
    let sum = 0
    for (const key of scopeKeys) { sum += scopeGenerations.get(key) ?? 0 }
    return sum
  }

  const rebuild = (fn: () => void, scopeKey?: string) => {
    rebuilding = true
    try {
      fn()
      // A registration that read a replaced entry rebuilds too. The bound stops a cycle.
      for (let pass = 0; pass < 10; pass++) {
        const ran = collections.map(collection => collection.rerunStale()).some(Boolean)
        if (!ran) { break }
      }
    }
    finally {
      rebuilding = false
    }
    if (scopeKey === undefined) {
      generation.value++
    }
    else {
      scopeGenerations.set(scopeKey, (scopeGenerations.get(scopeKey) ?? 0) + 1)
    }
    notify()
  }

  const createSession = ({ label, warnMissing = false, trackScopes = false }: TslSessionOptions = {}): TslSession => {
    const reads: TslReadLog = new Map()
    const scopes = new Set<string>()
    let open = true
    const touch: Toucher = trackScopes
      ? (kind, scope) => { if (open) { scopes.add(scopeKeyOf(kind, scope)) } }
      : noTouch
    let warnedLate = false

    const record: Recorder = (key, current, describe) => {
      if (!open) {
        if (!isProd && label && !warnedLate) {
          warnedLate = true
          logWarning(`${label}: \`${describe()}\` was read after the creator returned, so a change to it does not rebuild. Read it in the creator and close over it (for example outside \`Fn(() => ...)\`).`)
        }
        return current()
      }
      const value = current()
      if (!reads.has(key)) {
        reads.set(key, { seen: value, current })
      }
      if (!isProd && warnMissing && value === undefined) {
        logWarning(`${label ?? 'TSL'}: \`${describe()}\` does not exist yet, so it stays \`undefined\` until the next rebuild. Register it earlier (higher in the tree or earlier in the same component).`)
      }
      return value
    }

    // Built on first access: most creators read one collection or none.
    const stores = {} as TslStores
    for (const collection of collections) {
      let view: Record<string, any> | undefined
      Object.defineProperty(stores, collection.kind, {
        enumerable: true,
        get: () => (view ??= createView(collection, undefined, record, touch)),
      })
    }

    const session: TslSession = {
      stores,
      reads,
      scopes,
      generation: 0,
      close: () => {
        open = false
        if (trackScopes) { session.generation = scopeGeneration(scopes) }
      },
    }
    return session
  }

  const host: TslCollectionHost = { notify, rebuild, createSession }
  const uniforms = createTslCollection('uniforms', host)
  const nodes = createTslCollection('nodes', host)
  const passes = createTslCollection('passes', host)
  collections.push(uniforms, nodes, passes)

  return {
    uniforms,
    nodes,
    passes,
    collections,
    generation,
    scopeGeneration,
    notify,
    rebuild,
    createSession,
    onDispose: fn => scope.run(() => onScopeDispose(fn)),
    dispose() {
      scope.stop()
      for (const collection of collections) {
        collection.dispose()
      }
    },
  }
}

type Recorder = (key: string, current: () => unknown, describe: () => string) => unknown

const descriptor = (value: unknown): PropertyDescriptor => ({ value, enumerable: true, configurable: true, writable: false })

function createView(collection: TslCollection, scope: string | undefined, record: Recorder, touch: Toucher): Record<string, any> {
  const { kind } = collection
  const path = scope === undefined ? kind : `${kind}.${scope}`
  const scopeViews = new Map<string, Record<string, any>>()

  const read = (name: string) => {
    const value = record(
      `${path}/${name}`,
      scope === undefined
        ? () => collection.root.get(name) ?? collection.scopes.get(name)
        : () => collection.scopes.get(scope)?.get(name),
      () => `${path}.${name}`,
    )
    if (!(value instanceof Map)) {
      touch(kind, scope)
      return value
    }
    touch(kind, name)
    let view = scopeViews.get(name)
    if (!view) {
      view = createView(collection, name, record, touch)
      scopeViews.set(name, view)
    }
    return view
  }

  const keys = () => {
    touch(kind, scope)
    record(`${path}/#keys`, () => collection.keys(scope).join('\0'), () => `Object.keys(${path})`)
    return collection.keys(scope)
  }

  return new Proxy(Object.create(null), {
    get: (_, key) => {
      if (typeof key !== 'string') { return undefined }
      // Vue probes `__v_*` flags on any object it meets; `__v_skip` keeps it from proxying the view.
      if (key.startsWith('__v_')) { return key === '__v_skip' ? true : undefined }
      return read(key)
    },
    has: (_, key) => typeof key === 'string' && read(key) !== undefined,
    ownKeys: keys,
    getOwnPropertyDescriptor: (_, key) => {
      if (typeof key !== 'string') { return undefined }
      const value = read(key)
      return value === undefined ? undefined : descriptor(value)
    },
    set: () => false,
  })
}

// Reads are tracked per entry, so templates and `computed` update only when an entry they read changes.
export function createLiveView<E extends object>(collection: TslCollection, scope: string | undefined, extras: E): Record<string, any> & E {
  const scopeKey = isRootScope(scope) ? undefined : scope
  const scopeViews = new Map<string, Record<string, any>>()

  // One proxy and direct `Map` reads: this path runs when users read uniforms in a render loop.
  const lookup = (name: string): unknown => {
    if (scopeKey !== undefined) { return collection.scopes.get(scopeKey)?.get(name) }
    const leaf = collection.root.get(name)
    if (leaf !== undefined || !collection.scopes.has(name)) { return leaf }
    let view = scopeViews.get(name)
    if (!view) {
      view = createLiveView(collection, name, {})
      scopeViews.set(name, view)
    }
    return view
  }

  return new Proxy(Object.create(null), {
    get: (_, key) => {
      if (typeof key !== 'string') { return undefined }
      if (Object.hasOwn(extras, key)) { return extras[key as keyof E] }
      if (key.startsWith('__v_')) { return key === '__v_skip' ? true : undefined }
      return lookup(key)
    },
    has: (_, key) => typeof key === 'string' && (Object.hasOwn(extras, key) || lookup(key) !== undefined),
    ownKeys: () => collection.keys(scopeKey),
    getOwnPropertyDescriptor: (_, key) => {
      if (typeof key !== 'string') { return undefined }
      const value = lookup(key)
      return value === undefined ? undefined : descriptor(value)
    },
    set: () => false,
  }) as Record<string, any> & E
}
