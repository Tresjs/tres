import { Scene } from 'three'
import { describe, test, expect } from 'vitest'
import { useScene } from './useScene'

describe('useScene()', () => {
  test('should init acene', () => {
    const { scene } = useScene()
    expect(scene).toBeInstanceOf(Scene)
  })
})
