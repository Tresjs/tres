export function linear(x: number): number {
  return x
}

export function easeInCubic(x: number): number {
  return x * x * x
}

export function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - ((-2 * x + 2) ** 3) / 2
}

export function easeInQuart(x: number): number {
  return x * x * x * x
}

export function easeOutBounce(x: number): number {
  const n1 = 7.5625
  const d1 = 2.75

  if (x < 1 / d1) {
    return n1 * x * x
  } 
  else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75
  } 
  else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375
  } 
  else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375
  }
}
