import { type RendererElement, type RendererNode, type RendererOptions } from 'vue'

/**
 * Main API
 */

const CONTEXT_TO_NODE_OPS = new WeakMap()

/**
 * NOTE: 
 * Regarding the generic types used below:
 * HostNode, HostElement types are from Vue's RendererOptions. They are the types RendererOptions functions return.
 * HostContext is passed to the plugin as plugin(c: HostContext). In the case of Tres, it's TresContext.
 */
export type TresNodeOpsPluginStore< N extends RendererNode, E extends RendererElement> = PluginStore<N, E>
export type TresNodeOpsPlugin<N extends RendererNode, E extends RendererNode, C extends WeakKey> = 
  Plugin<N, E, C>

export function useNodeOpsWithContext<
  HostNode extends RendererNode,
  HostElement extends RendererElement,
  HostContext extends WeakKey,
>(
  context: HostContext = {} as HostContext,
  pluginOrPlugins: Plugin<HostNode, HostElement, HostContext> 
  | Plugin<HostNode, HostElement, HostContext>[] = [],
): PluggableRendererOptions<HostNode, HostElement, HostContext> {
  if (CONTEXT_TO_NODE_OPS.has(context)) {
    return CONTEXT_TO_NODE_OPS.get(context)
  }

  const pluginStore: PluginStore<HostNode, HostElement> = doAddPlugin(pluginOrPlugins, {}, context)
  const result: PluggableRendererOptions<HostNode, HostElement, HostContext>
    = Object.assign({}, 
      noopRendererOptions, 
      { 
        hasPlugin: (pluginName: string) => pluginStore.hasOwnProperty(pluginName),
        dispose: () => Object.values(pluginStore).forEach(p => p.dispose()),
      }, 
      doGetRendererOptionsFromPluginStore(pluginStore),
    )
  
  CONTEXT_TO_NODE_OPS.set(context, result)

  return result
}

/**
 * NOTE: Helper functions
 */

function doGetRendererOptionsFromPluginStore<
  HostNode extends RendererNode,
  HostElement extends RendererElement,
>(
  pluginStore: PluginStore<HostNode, HostElement>,
): RendererOptions<HostNode, HostElement> {
  const result = Object.assign({}, noopRendererOptions)
  const createElementPluginEntries = getSortedPluginEntriesFromStore(pluginStore, 'createElement')
  const patchPropPluginEntries = getSortedPluginEntriesFromStore(pluginStore, 'patchProp')
  const insertPluginEntries = getSortedPluginEntriesFromStore(pluginStore, 'insert')
  const removePluginEntries = getSortedPluginEntriesFromStore(pluginStore, 'remove')
  const createTextPluginEntries = getSortedPluginEntriesFromStore(pluginStore, 'createText')
  const createCommentPluginEntries = getSortedPluginEntriesFromStore(pluginStore, 'createComment')
  const setTextPluginEntries = getSortedPluginEntriesFromStore(pluginStore, 'setText')
  const setElementTextPluginEntries = getSortedPluginEntriesFromStore(pluginStore, 'setElementText')
  const parentNodePluginEntries = getSortedPluginEntriesFromStore(pluginStore, 'parentNode')

  result.createElement = (tag: string, ...rest) => {
    for (const entry of createElementPluginEntries) {
      if (entry.filter.tag(tag)) {
        const result = entry.fn(tag, ... rest)
        if (result) {
          return result
        }
      }
    }
    return noopRendererOptions['createElement']
  }

  result.patchProp = (
    el: HostElement,
    key: string,
    prevValue: any,
    nextValue: any,
    // the rest is unused for most custom renderers
    ...rest
  ) => {
    for (const entry of patchPropPluginEntries) {
      if (entry.filter.element(el)) {
        entry.fn(el, key, prevValue, nextValue, ...rest)
      }
    }
  }

  result.insert = (
    el: HostNode,
    parent: HostElement,
    anchor?: HostNode | null,
  ) => {
    for (const entry of insertPluginEntries) {
      if (entry.filter.node(el)) {
        entry.fn(el, parent, anchor)
      }
    }
  }

  result.remove = (el: HostNode) => {
    for (const entry of removePluginEntries) {
      if (entry.filter.node(el)) {
        entry.fn(el)
      }
    }
  }

  result.parentNode = (el: HostNode) => {
    for (const entry of parentNodePluginEntries) {
      const result = entry.fn(el)
      if (result) return result
    }
    return null
  }

  result.createText = (text: string) => {
    for (const entry of createTextPluginEntries) {
      const result = entry.fn(text)
      if (result) return result
    }
    return text
  }

  result.createComment = (text: string) => {
    for (const entry of createCommentPluginEntries) {
      const result = entry.fn(text)
      if (result) return result
    }
    return null
  }

  result.setText = (node: HostNode, text: string) => {
    for (const entry of setTextPluginEntries) {
      entry.fn(node, text)
    }
  }

  result.setElementText = (el: HostElement, text: string) => {
    for (const entry of setElementTextPluginEntries) {
      entry.fn(el, text)
    }
  }

  result.nextSibling = () => noop('nextSibling')
  result.querySelector = () => noop('querySelector')
  result.setScopeId = () => noop('setScopeId')
  result.cloneNode = () => noop('cloneNode')
  result.insertStaticContent = () => noop('insertStaticContent')

  return result
}

function getSortedPluginEntriesFromStore<
  HostNode extends RendererNode,
  HostElement extends RendererElement,
  T extends RendererOptionsFunctionKey,
>(store: PluginStore<HostNode, HostElement>, key: T) {
  const result: PNE<T>[] = []
  for (const plugin of Object.values(store)) {
    if (plugin.hasOwnProperty(key)) {
      result.push(plugin[key] as PNE<T>)
    }
  }

  result.sort((a: PNE<T>, b: PNE<T>) => a.weight - b.weight)

  return result

  type PNE<T extends RendererOptionsFunctionKey> = PluginEntryNormalized<
    HostNode,
    HostElement,
    T
  >
}

function doAddPlugin<
  HostNode extends RendererNode,
  HostElement extends RendererElement,
  HostContext,
>(
  plugin:
  | Plugin<HostNode, HostElement, HostContext >
  | Plugin<HostNode, HostElement, HostContext>[],
  pluginStore: PluginStore<HostNode, HostElement>,
  context: HostContext,
): PluginStore<HostNode, HostElement> {

  if (Array.isArray(plugin)) {
    let result: PS = Object.assign({}, pluginStore)
    for (const p of plugin) {
      result = doAddPlugin(p, result, context)
    }
    return result
  }
  else {
    const result: PS = Object.assign({}, pluginStore)
    const boundPlugin = doBindAndNormalizePlugin( plugin, context )

    if (result.hasOwnProperty(boundPlugin.name)) {
      throw new Error(
        `Plugin store already contains plugin named ${
          boundPlugin.name
        }`,
      )
    }
    result[boundPlugin.name] = boundPlugin
    return result
  }

  type PS = PluginStore<HostNode, HostElement>
}

function doBindAndNormalizePlugin<
  HostNode extends RendererNode,
  HostElement extends RendererElement,
  HostContext,
>(
  plugin: Plugin<HostNode, HostElement, HostContext>,
  context: HostContext,
): PluginNormalized<HostNode, HostElement> {
  const boundPlugin = plugin(context)
  const name = boundPlugin.name
  const weight = boundPlugin.weight ?? 0
  const filter = {
    tag: boundPlugin.filter?.tag ?? ((tag: string) => true),
    node: boundPlugin.filter?.node ?? ((a: any): a is HostNode => true),
    element: boundPlugin.filter?.element ?? ((a: any): a is HostElement => true),
  }
  const dispose = boundPlugin.dispose ?? (() => {})

  const result: PluginNormalized<HostNode, HostElement> = { name, dispose }

  for (const key of rendererOptionsFunctionKeys) {
    if (key in boundPlugin) {
      const entry = boundPlugin[key]
      if (typeof entry === 'object' && typeof entry.fn === 'function') {
        result[key] = { fn: entry.fn, weight: entry.weight ?? weight, name, filter }
      } 
      else if (typeof entry === 'function') {
        result[key] = { fn: entry, weight, name, filter }
      }
    }
  }

  return result as PluginNormalized<HostNode, HostElement>
}

export const forImplementationTests = {
  doAddPlugin,
  doGetPluginFromPluginStore: (
    name: string, 
    store: PluginStore<any, any>,
  ) => (store[name] as PluginNormalized<any, any>) ?? null,
}

/**
 * NOTE: Misc. data
 */

const noopRendererOptions: RendererOptions<any, any> = {
  patchProp: (... rest) => {},
  insert: () => {},
  remove: () => {},
  createElement: () => null,
  createText: () => ({}),
  createComment: (text: string) => ({}),
  setText: () => {},
  setElementText: () => {},
  parentNode: () => null,
  nextSibling: () => null,
}

function noop(fn: string): any { }

const rendererOptionsFunctionKeys: Set<RendererOptionsFunctionKey> = new Set([
  'patchProp',
  'insert',
  'remove',
  'createElement',
  'createText',
  'createComment',
  'setText',
  'setElementText',
  'parentNode',
  'nextSibling',
])

/**
 * Types
 */

type PluggableRendererOptions<
  HostNode extends RendererNode,
  HostElement extends RendererElement,
  HostContext,
> = RendererOptions<HostNode, HostElement> &
Pluggable<HostNode, HostElement, HostContext>

interface Pluggable<
  HostNode extends RendererNode,
  HostElement extends RendererElement,
  HostContext,
> {
  hasPlugin: (s: string) => boolean
  dispose: () => void
}

type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...a: any) => any ? K : never;
}[keyof T]
type RendererOptionsFunctionKey = Exclude<
  FunctionKeys<RendererOptions>,
  undefined
>

type Plugin< HostNode extends RendererNode, HostElement extends RendererElement, HostContext> = 
(context: HostContext) => {
  name: string
  weight?: number
  filter?: PluginFilter<HostNode, HostElement>
  dispose?: () => void
} & Partial<{
  [K in RendererOptionsFunctionKey]: PluginEntry< K >;
}>

type PluginEntry< K extends RendererOptionsFunctionKey > = {
  weight?: number
  fn: RendererOptions[K]
} | RendererOptions[K]

type PluginNormalized<
  HostNode extends RendererNode,
  HostElement extends RendererElement,
> = {
  name: string
  dispose: () => void
} &
Partial<{ 
  [K in RendererOptionsFunctionKey]: PluginEntryNormalized<
    HostNode,
    HostElement,
    K
  >;
}>

interface PluginEntryNormalized<
  HostNode extends RendererNode,
  HostElement extends RendererElement,
  K extends RendererOptionsFunctionKey,
> {
  name: string
  weight: number
  filter: PluginFilterNormalized<HostNode, HostElement>
  fn: RendererOptions[K]
}

type PluginFilter<HostNode, HostElement> = Partial<PluginFilterNormalized<HostNode, HostElement>>

interface PluginFilterNormalized<HostNode, HostElement> {
  tag: (tag: string) => boolean
  node: (a: any) => a is HostNode
  element: (a: any) => a is HostElement
}

type PluginStore<
  HostNode extends RendererNode,
  HostElement extends RendererElement,
> = Record<string, PluginNormalized<HostNode, HostElement>>
