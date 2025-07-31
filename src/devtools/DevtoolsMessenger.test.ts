import { beforeEach, describe, expect, it } from 'vitest'
import { DevtoolsMessenger } from './DevtoolsMessenger'

describe('devtoolsMessenger', () => {
  let messenger: DevtoolsMessenger

  beforeEach(() => {
    messenger = new DevtoolsMessenger()
  })

  it('should queue messages when no subscribers are available', () => {
    // Send messages without any subscribers
    messenger.send('asset-load', { url: 'test.gltf', progress: 50 })
    messenger.send('asset-load', { url: 'test.gltf', progress: 100 })

    // Messages should be queued
    expect(messenger.queueSize).toBe(2)
    expect(messenger.hasSubscribers).toBe(false)
  })

  it('should deliver queued messages when subscriber is added', () => {
    const receivedMessages: any[] = []

    // Send messages without subscribers
    messenger.send('asset-load', { url: 'test.gltf', progress: 50 })
    messenger.send('asset-load', { url: 'test.gltf', progress: 100 })

    // Add subscriber - should receive queued messages immediately
    const unsubscribe = messenger.subscribe((message) => {
      receivedMessages.push(message)
    })

    // Should have received both queued messages
    expect(receivedMessages).toHaveLength(2)
    expect(receivedMessages[0].data.progress).toBe(50)
    expect(receivedMessages[1].data.progress).toBe(100)
    expect(messenger.queueSize).toBe(0) // Queue should be cleared

    unsubscribe()
  })

  it('should send messages immediately when subscribers are available', () => {
    const receivedMessages: any[] = []

    // Add subscriber first
    const unsubscribe = messenger.subscribe((message) => {
      receivedMessages.push(message)
    })

    // Send messages - should be delivered immediately
    messenger.send('asset-load', { url: 'test.gltf', progress: 50 })
    messenger.send('asset-load', { url: 'test.gltf', progress: 100 })

    expect(receivedMessages).toHaveLength(2)
    expect(messenger.queueSize).toBe(0) // No queuing when subscribers exist

    unsubscribe()
  })

  it('should limit queue size to prevent memory leaks', () => {
    // Send more messages than the max queue size (100)
    for (let i = 0; i < 105; i++) {
      messenger.send('asset-load', { url: `test${i}.gltf`, progress: i })
    }

    // Should only keep the last 100 messages
    expect(messenger.queueSize).toBe(100)
    expect(messenger.hasSubscribers).toBe(false)
  })

  it('should clear queue when requested', () => {
    messenger.send('asset-load', { url: 'test.gltf', progress: 50 })
    messenger.send('asset-load', { url: 'test.gltf', progress: 100 })

    expect(messenger.queueSize).toBe(2)

    messenger.clearQueue()
    expect(messenger.queueSize).toBe(0)
  })
})
