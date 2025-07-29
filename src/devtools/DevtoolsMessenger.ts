export type DevtoolsMessageType = 'performance' | 'context' | 'asset-load'

export interface DevtoolsMessage<T = any> {
  type: DevtoolsMessageType
  data: T
  timestamp?: number
}

export type DevtoolsSubscriber = (message: DevtoolsMessage) => void

/**
 * Messenger class for communicating with Tres DevTools
 * This class will be attached to window.__TRES__DEVTOOLS__
 */
export class DevtoolsMessenger {
  private subscribers: Set<DevtoolsSubscriber> = new Set()

  /**
   * Send a message to devtools subscribers
   */
  send<T>(type: DevtoolsMessageType, data: T): void {
    const message: DevtoolsMessage<T> = {
      type,
      data,
      timestamp: Date.now(),
    }

    // Notify all subscribers (including devtools extension)
    this.subscribers.forEach(subscriber => subscriber(message))
  }

  /**
   * Subscribe to devtools messages
   */
  subscribe(subscriber: DevtoolsSubscriber): () => void {
    this.subscribers.add(subscriber)

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(subscriber)
    }
  }

  /**
   * Check if there are any subscribers
   */
  get hasSubscribers(): boolean {
    return this.subscribers.size > 0
  }
}
