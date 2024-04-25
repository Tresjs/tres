import { MathUtils } from 'three'

const clamp = MathUtils.clamp

/**
 * Seedable pseudorandom number tools
 */
export default class RandUtils {
  private _getNext: () => number
  private _getGenerator: (seed: number) => () => number

  /**
   * Create a new seeded pseudorandom number generator.
   * @param [seed] - the seed for the generator
   * @param [getSeededRandomGenerator] - a function that returns a pseudorandom number generator
   * @constructor
   */
  constructor(seed = 0, getSeededRandomGenerator?: (seed: number) => () => number) {
    this._getGenerator = getSeededRandomGenerator ?? this.getMulberry32
    this._getNext = this._getGenerator(seed)
  }

  /**
   * Reseed the pseudorandom number generator
   */
  seed(s: number) {
    this._getNext = this._getGenerator(s)
  }

  /**
   * Return the next pseudorandom number in the interval [0, 1]
   */
  rand(): number {
    return this._getNext()
  }

  /**
   * Random float from <low, high> interval
   * @param low - Low value of the interval
   * @param high - High value of the interval
   */
  float(low: number, high: number): number {
    return low + this._getNext() * (high - low)
  }

  /**
   * Random float from <-range/2, range/2> interval
   * @param range - Interval range
   */
  floatSpread(range: number): number {
    return this.float(-0.5 * range, 0.5 * range)
  }

  /**
   * Random integer from <low, high> interval
   * @param low Low value of the interval
   * @param high High value of the interval
   */
  int(low: number, high: number): number {
    return low + Math.floor(this._getNext() * (high - low + 1))
  }

  /**
   * Choose an element from an array.
   * @param array The array to choose from
   * @returns An element from the array or null if the array is empty
   */
  choice<T>(array: T[]): T | null {
    if (!array.length) {
      return null
    }
    return array[Math.floor(this._getNext() * array.length)]
  }

  /**
   * Choose an element from an array or return defaultValue if array is empty.
   * @param array The array to choose from
   * @param defaultValue The value to return if the array is empty
   * @returns An element from the array or defaultValue if the array is empty
   */
  defaultChoice<T>(array: T[], defaultValue: T): T {
    if (!array.length) {
      return defaultValue
    }
    return array[Math.floor(this._getNext() * array.length)]
  }

  /**
   * Return n elements from an array.
   * @param array The array to sample
   * @param sampleSizeMin The minimum sample size
   * @param sampleSizeMax The maximum sample size
   */
  sample<T>(array: T[], sampleSizeMin: number, sampleSizeMax?: number): T[] {
    const len = array.length
    sampleSizeMin = clamp(sampleSizeMin, 0, len - 1)
    sampleSizeMax = clamp(sampleSizeMax ?? len - 1, 0, len - 1)
    const sampleSize = this.int(sampleSizeMin, sampleSizeMax)
    const indicies = this.shuffle(array.map((_, i) => i))
    const n = Math.min(array.length, sampleSize)
    return indicies
      .slice(0, n)
      .sort()
      .map(i => array[i])
  }

  /**
   * Shuffle an array. Not in-place.
   * @param array The array to shuffle
   */
  shuffle<T>(array: T[]): T[] {
    return array
      .map(value => ({ value, sort: this._getNext() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  /**
   * The default pseudorandom generator.
   */
  private getMulberry32(seed = 0): () => number {
    if (seed > 0 && seed < 1) {
      seed = Math.floor(seed * 2 ** 16)
    }
    return () => {
      // NOTE: Mulberry32 generator
      seed += 0x6D2B79F5
      let t = seed
      t = Math.imul(t ^ (t >>> 15), t | 1)
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
  }
}
