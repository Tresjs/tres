/**
 * The smallest browser surface `GLTFLoader` needs to parse in node. Codegen only
 * ever reads structure and names, never pixels, so stubs are enough — jsdom is not.
 *
 * The `src` setter MUST actually fire `load`, otherwise texture-bearing models
 * hang forever inside `parse()` with no error.
 */
import type { TransferListItem } from 'node:worker_threads'
import { Worker as NodeWorker } from 'node:worker_threads'

let installed = false

/** `DRACOLoader` ships its decoder to a worker as an object URL, which node cannot resolve. */
const blobs = new Map<string, Blob>()
let blobId = 0

/**
 * Bridges the web Worker surface `DRACOLoader` expects onto `worker_threads`:
 * event-handler properties instead of emitters, and a source blob instead of a file.
 */
class WorkerShim {
  onmessage: ((event: { data: any }) => void) | null = null
  onerror: ((error: unknown) => void) | null = null

  private worker?: NodeWorker
  private queue: Array<[unknown, TransferListItem[] | undefined]> = []
  private ready: Promise<void>

  constructor(url: string) {
    const blob = blobs.get(url)
    if (!blob) {
      throw new Error(`Unknown worker source: ${url}`)
    }

    this.ready = blob.text().then((source) => {
      const bootstrap = [
        `const { parentPort } = require('node:worker_threads')`,
        `globalThis.self = globalThis`,
        `globalThis.postMessage = (message, transfer) => parentPort.postMessage(message, transfer)`,
        `parentPort.on('message', data => globalThis.onmessage({ data }))`,
      ].join('\n')

      this.worker = new NodeWorker(`${bootstrap}\n${source}`, { eval: true })
      this.worker.on('message', data => this.onmessage?.({ data }))
      this.worker.on('error', error => this.onerror?.(error))

      for (const [message, transfer] of this.queue) {
        this.worker.postMessage(message, transfer)
      }
      this.queue = []
    })
  }

  postMessage(message: unknown, transfer?: TransferListItem[]): void {
    if (this.worker) {
      this.worker.postMessage(message, transfer)
    }
    else {
      this.queue.push([message, transfer])
    }
  }

  terminate(): void {
    // Without this the process keeps a live decoder thread and never exits.
    this.ready.then(() => this.worker?.terminate())
  }
}

function createElementStub(): Record<string, any> {
  const listeners: Record<string, Array<(event: unknown) => void>> = {}

  return {
    width: 1,
    height: 1,
    style: {},
    addEventListener(type: string, handler: (event: unknown) => void) {
      (listeners[type] ||= []).push(handler)
    },
    removeEventListener() {},
    set src(_value: string) {
      queueMicrotask(() => (listeners.load ?? []).forEach(handler => handler({ target: this })))
    },
    get src() {
      return ''
    },
  }
}

export function installDomShim(): void {
  if (installed) {
    return
  }

  const scope = globalThis as Record<string, any>
  scope.self ??= globalThis
  scope.document ??= { createElementNS: createElementStub, createElement: createElementStub }
  scope.Worker ??= WorkerShim
  URL.createObjectURL = (blob: Blob) => {
    const url = `blob:tres/${blobId++}`
    blobs.set(url, blob)
    return url
  }
  URL.revokeObjectURL = (url: string) => {
    blobs.delete(url)
  }
  // `FileLoader` dispatches one of these per streamed chunk; node has no such global.
  scope.ProgressEvent ??= class {
    constructor(public type: string, init: Record<string, unknown> = {}) {
      Object.assign(this, init)
    }
  }
  installed = true
}
