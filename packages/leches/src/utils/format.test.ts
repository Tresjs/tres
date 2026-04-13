import { describe, expect, it } from 'vitest'
import { defaultFormat, getInputMode, inferDecimalsFromStep } from './format'

describe('inferDecimalsFromStep', () => {
  it('returns 0 for integer steps', () => {
    expect(inferDecimalsFromStep(1)).toBe(0)
    expect(inferDecimalsFromStep(10)).toBe(0)
  })
  it('returns correct decimals for fractional steps', () => {
    expect(inferDecimalsFromStep(0.1)).toBe(1)
    expect(inferDecimalsFromStep(0.01)).toBe(2)
    expect(inferDecimalsFromStep(0.001)).toBe(3)
  })
  it('handles scientific notation', () => {
    expect(inferDecimalsFromStep(1e-7)).toBe(7)
  })
})

describe('defaultFormat', () => {
  it('formats with inferred decimals', () => {
    const fmt = defaultFormat(0.01)
    expect(fmt(1.5)).toBe('1.50')
    expect(fmt(0)).toBe('0.00')
  })
  it('formats integers with no decimals', () => {
    const fmt = defaultFormat(1)
    expect(fmt(42)).toBe('42')
  })
})

describe('getInputMode', () => {
  it('returns numeric for integer steps', () => {
    expect(getInputMode(1)).toBe('numeric')
    expect(getInputMode(5)).toBe('numeric')
  })
  it('returns decimal for fractional steps', () => {
    expect(getInputMode(0.1)).toBe('decimal')
    expect(getInputMode(0.01)).toBe('decimal')
  })
})
