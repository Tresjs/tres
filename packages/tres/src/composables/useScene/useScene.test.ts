import { Scene } from 'three'
import { describe, test, expect } from 'vitest'
import { useScene } from './'

describe('useScene()', () => {
  test('should init a scene', () => {
    const { scene } = useScene()
    expect(scene.value).toBeInstanceOf(Scene)
  })
})
