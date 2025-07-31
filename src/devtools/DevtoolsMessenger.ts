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
  private messageQueue: DevtoolsMessage[] = []
  private maxQueueSize = 100 // Prevent memory leaks by limiting queue size

  /**
   * Send a message to devtools subscribers
   * If no subscribers are available, the message is queued
   */
  send<T>(type: DevtoolsMessageType, data: T): void {
    const message: DevtoolsMessage<T> = {
      type,
      data,
      timestamp: Date.now(),
    }

    // If there are subscribers, send immediately
    if (this.subscribers.size > 0) {
      this.subscribers.forEach(subscriber => subscriber(message))
    }
    else {
      // Otherwise, queue the message
      this.queueMessage(message)
    }
  }

  /**
   * Queue a message for later delivery
   */
  private queueMessage(message: DevtoolsMessage): void {
    // Add to queue
    this.messageQueue.push(message)

    // Prevent memory leaks by removing oldest messages if queue gets too large
    if (this.messageQueue.length > this.maxQueueSize) {
      this.messageQueue.shift()
    }
  }

  /**
   * Flush all queued messages to current subscribers
   */
  private flushQueue(): void {
    if (this.messageQueue.length === 0 || this.subscribers.size === 0) {
      return
    }

    // Send all queued messages to current subscribers
    this.messageQueue.forEach((message) => {
      this.subscribers.forEach(subscriber => subscriber(message))
    })

    // Clear the queue after sending
    this.messageQueue = []
  }

  /**
   * Subscribe to devtools messages
   * When a new subscriber is added, all queued messages are immediately delivered
   */
  subscribe(subscriber: DevtoolsSubscriber): () => void {
    this.subscribers.add(subscriber)

    // Flush any queued messages to the new subscriber
    this.flushQueue()

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

  /**
   * Get the current queue size
   */
  get queueSize(): number {
    return this.messageQueue.length
  }

  /**
   * Clear all queued messages
   */
  clearQueue(): void {
    this.messageQueue = []
  }
}
