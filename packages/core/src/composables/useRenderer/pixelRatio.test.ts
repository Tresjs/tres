import { setPixelRatio } from './pixelRatio'

describe('setPixelRatio', () => {
  const INITIAL_DPR = 1
  let dpr = INITIAL_DPR
  const mockRenderer = {
    setPixelRatio: (n: number) => { dpr = n },
    getPixelRatio: () => dpr,
  }
  const setPixelRatioSpy = vi.spyOn(mockRenderer, 'setPixelRatio')

  beforeEach(() => {
    dpr = 1
    setPixelRatioSpy.mockClear()
  })

  describe('setPixelRatio(renderer: WebGLRenderer, systemDpr: number)', () => {
    it('calls the renderer\'s setPixelRatio method with systemDpr', () => {
      expect(setPixelRatioSpy).not.toBeCalled()
      setPixelRatio(mockRenderer, 2)
      expect(setPixelRatioSpy).toBeCalledWith(2)

      setPixelRatio(mockRenderer, 2.1)
      expect(setPixelRatioSpy).toBeCalledWith(2.1)

      setPixelRatio(mockRenderer, 1.44444)
      expect(setPixelRatioSpy).toBeCalledWith(1.44444)
    })
    it('does not set the renderer\'s pixelRatio if systemDpr === pixelRatio', () => {
      setPixelRatio(mockRenderer, 1)
      expect(setPixelRatioSpy).not.toBeCalled()

      setPixelRatio(mockRenderer, 2)
      expect(setPixelRatioSpy).toBeCalledTimes(1)

      setPixelRatio(mockRenderer, 2)
      expect(setPixelRatioSpy).toBeCalledTimes(1)

      setPixelRatio(mockRenderer, 1)
      expect(setPixelRatioSpy).toBeCalledTimes(2)

      setPixelRatio(mockRenderer, 1)
      expect(setPixelRatioSpy).toBeCalledTimes(2)
    })
    it('does not throw if passed a "renderer" without a `setPixelRatio` method', () => {
      const mockSVGRenderer = {}
      expect(() => setPixelRatio(mockSVGRenderer, 2)).not.toThrow()
    })
    it('calls `setPixelRatio` even if passed a "renderer" without a `getPixelRatio` method', () => {
      const mockSVGRenderer = { setPixelRatio: () => {} }
      const setPixelRatioSpy = vi.spyOn(mockSVGRenderer, 'setPixelRatio')
      expect(() => setPixelRatio(mockSVGRenderer, 2)).not.toThrow()
      expect(setPixelRatioSpy).toBeCalledWith(2)
      expect(setPixelRatioSpy).toBeCalledTimes(1)

      setPixelRatio(mockSVGRenderer, 1.99)
      expect(setPixelRatioSpy).toBeCalledWith(1.99)
      expect(setPixelRatioSpy).toBeCalledTimes(2)

      setPixelRatio(mockSVGRenderer, 2.1)
      expect(setPixelRatioSpy).toBeCalledWith(2.1)
      expect(setPixelRatioSpy).toBeCalledTimes(3)
    })
  })

  describe('setPixelRatio(renderer: WebGLRenderer, systemDpr: number, userDpr: number)', () => {
    it('calls the renderer\'s setPixelRatio method with userDpr', () => {
      expect(setPixelRatioSpy).not.toBeCalled()
      setPixelRatio(mockRenderer, 2, 100)
      expect(setPixelRatioSpy).toBeCalledWith(100)
    })
    it('does not call the renderer\'s setPixelRatio method if current dpr === new dpr', () => {
      expect(setPixelRatioSpy).not.toBeCalled()
      setPixelRatio(mockRenderer, 2, 1)
      expect(setPixelRatioSpy).not.toBeCalledWith()

      setPixelRatio(mockRenderer, 3, 1.4)
      expect(setPixelRatioSpy).toBeCalledTimes(1)
      expect(setPixelRatioSpy).toBeCalledWith(1.4)

      setPixelRatio(mockRenderer, 3, 1.4)
      expect(setPixelRatioSpy).toBeCalledTimes(1)
      expect(setPixelRatioSpy).toBeCalledWith(1.4)

      setPixelRatio(mockRenderer, 2, 1.4)
      expect(setPixelRatioSpy).toBeCalledTimes(1)
      expect(setPixelRatioSpy).toBeCalledWith(1.4)

      setPixelRatio(mockRenderer, 42, 0.1)
      expect(setPixelRatioSpy).toBeCalledTimes(2)
      expect(setPixelRatioSpy).toBeCalledWith(0.1)

      setPixelRatio(mockRenderer, 4, 0.1)
      expect(setPixelRatioSpy).toBeCalledTimes(2)
      expect(setPixelRatioSpy).toBeCalledWith(0.1)
    })
  })

  describe('setPixelRatio(renderer: WebGLRenderer, systemDpr: number, userDpr: [number, number])', () => {
    it('clamps systemDpr to userDpr', () => {
      setPixelRatio(mockRenderer, 2, [0, 4])
      expect(setPixelRatioSpy).toBeCalledTimes(1)
      expect(setPixelRatioSpy).toBeCalledWith(2)

      setPixelRatio(mockRenderer, 2, [3, 4])
      expect(setPixelRatioSpy).toBeCalledTimes(2)
      expect(setPixelRatioSpy).toBeCalledWith(3)

      setPixelRatio(mockRenderer, 5, [3, 4])
      expect(setPixelRatioSpy).toBeCalledTimes(3)
      expect(setPixelRatioSpy).toBeCalledWith(4)

      setPixelRatio(mockRenderer, 100, [3, 4])
      expect(setPixelRatioSpy).toBeCalledTimes(3)
      expect(setPixelRatioSpy).toBeCalledWith(4)

      setPixelRatio(mockRenderer, 100, [3.5, 4])
      expect(setPixelRatioSpy).toBeCalledTimes(3)
      expect(setPixelRatioSpy).toBeCalledWith(4)

      setPixelRatio(mockRenderer, 100, [3, 6.1])
      expect(setPixelRatioSpy).toBeCalledTimes(4)
      expect(setPixelRatioSpy).toBeCalledWith(6.1)

      setPixelRatio(mockRenderer, 1, [2.99, 6.1])
      expect(setPixelRatioSpy).toBeCalledTimes(5)
      expect(setPixelRatioSpy).toBeCalledWith(2.99)
    })
  })
})
