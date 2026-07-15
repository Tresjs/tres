export function inferDecimalsFromStep(step: number): number {
  const str = step.toString()
  if (str.includes('e-')) {
    return Number.parseInt(str.split('e-')[1], 10)
  }
  const dotIndex = str.indexOf('.')
  return dotIndex === -1 ? 0 : str.length - dotIndex - 1
}

export function defaultFormat(step: number): (value: number) => string {
  const decimals = inferDecimalsFromStep(step)
  return (v: number) => v.toFixed(decimals)
}

export function getInputMode(step: number): 'numeric' | 'decimal' {
  return inferDecimalsFromStep(step) === 0 ? 'numeric' : 'decimal'
}

export function clampValue(value: number, min?: number, max?: number): number {
  let result = value
  if (min !== undefined && result < min) { result = min }
  if (max !== undefined && result > max) { result = max }
  return result
}
