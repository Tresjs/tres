import { logError } from '@tresjs/core'

/**
 * Expand an animation definition string into an array of numbers.
 * @param definitionStr - A comma-separated string of frame numbers with optional parentheses-surrounded durations.
 * @example - expand("0,2") === [0,2]
 * @example - expand("2(10)") === [2,2,2,2,2,2,2,2,2,2]
 * @example - expand("1-4") === [1,2,3,4]
 * @example - expand("10-5(2)") === [10,10,9,9,8,8,7,7,6,6,5,5]
 * @example - expand("1-4(3),10(2)") === [1,1,1,2,2,2,3,3,3,4,4,4,10,10]
 */

export function expand(definitionStr: string): number[] {
  const parsed = parse(definitionStr)
  const result: number[] = []
  for (const { startFrame, endFrame, duration } of parsed) {
    if (duration <= 0) {
      continue
    }
    else if (endFrame < 0 || startFrame === endFrame) {
      for (let _ = 0; _ < duration; _++) {
        result.push(startFrame)
      }
      continue
    }
    else {
      const sign = Math.sign(endFrame - startFrame)
      for (
        let frame = startFrame;
        frame !== endFrame + sign;
        frame += sign
      ) {
        for (let _ = 0; _ < duration; _++) {
          result.push(frame)
        }
      }
    }
  }
  return result
}

interface AnimationDefinition {
  startFrame: number
  endFrame: number
  duration: number
}

/**
 * Parse an animation defintion string into an array of AnimationDefinition.
 * @param definitionStr - A comma-separated string of frame numbers with optional parentheses-surrounded durations.
 * @example - parse("0,2") === [{startFrame:0, endFrame:0, duration:1}, {startFrame:2, endFrame:2, duration:1}]
 * @example - parse("2(10)") === [{startFrame:2, endFrame:2, duration:10}]
 * @example - parse("1-4") === [{startFrame:1, endFrame:4, duration:1}]
 * @example - parse("10-5(2)") === [{startFrame:10, endFrame:5, duration:2}]
 * @example - parse("1-4(3),10(2)") === [{startFrame:1, endFrame:4, duration:3}, {startFrame:10, endFrame:10, duration:2}]
 */

function parse(definitionStr: string): AnimationDefinition[] {
  let transition: Transition = 'START_FRAME_IN'
  const result: AnimationDefinition[] = []
  for (const { name, value, startI } of tokenize(definitionStr)) {
    if (transition === 'START_FRAME_IN') {
      if (name === 'NUMBER') {
        result.push({
          startFrame: value,
          endFrame: value,
          duration: 1,
        })
        transition = 'START_FRAME_OUT'
      }
      else {
        logDefinitionSyntaxError(
          'number',
          name,
          definitionStr,
          startI,
        )
      }
    }
    else if (transition === 'START_FRAME_OUT') {
      if (name === 'COMMA') {
        transition = 'START_FRAME_IN'
      }
      else if (name === 'HYPHEN') {
        transition = 'END_FRAME_IN'
      }
      else if (name === 'OPEN_PAREN') {
        transition = 'DURATION_IN'
      }
      else {
        logDefinitionSyntaxError(
          '",", "-", "("',
          name,
          definitionStr,
          startI,
        )
      }
    }
    else if (transition === 'END_FRAME_IN') {
      if (name === 'NUMBER') {
        result[result.length - 1].endFrame = value
        transition = 'END_FRAME_OUT'
      }
      else {
        logDefinitionSyntaxError(
          'number',
          name,
          definitionStr,
          startI,
        )
      }
    }
    else if (transition === 'END_FRAME_OUT') {
      if (name === 'COMMA') {
        transition = 'START_FRAME_IN'
      }
      else if (name === 'OPEN_PAREN') {
        transition = 'DURATION_IN'
      }
      else {
        logDefinitionSyntaxError(
          '\',\' or \'(\'',
          name,
          definitionStr,
          startI,
        )
      }
    }
    else if (transition === 'DURATION_IN') {
      if (name === 'NUMBER') {
        result[result.length - 1].duration = value
        transition = 'DURATION_OUT'
      }
      else {
        logDefinitionSyntaxError(
          'number',
          name,
          definitionStr,
          startI,
        )
      }
    }
    else if (transition === 'DURATION_OUT') {
      if (name === 'CLOSE_PAREN') {
        transition = 'NEXT_OR_DONE'
      }
      else {
        logDefinitionSyntaxError('"("', name, definitionStr, startI)
      }
    }
    else if (transition === 'NEXT_OR_DONE') {
      if (name === 'COMMA') {
        transition = 'START_FRAME_IN'
      }
      else {
        logDefinitionSyntaxError('","', name, definitionStr, startI)
      }
    }
  }

  return result
}

type Transition =
  | 'START_FRAME_IN'
  | 'START_FRAME_OUT'
  | 'END_FRAME_IN'
  | 'END_FRAME_OUT'
  | 'DURATION_IN'
  | 'DURATION_OUT'
  | 'NEXT_OR_DONE'

type TokenName = 'COMMA' | 'HYPHEN' | 'OPEN_PAREN' | 'CLOSE_PAREN' | 'NUMBER'
interface Token {
  name: TokenName
  value: number
  startI: number
}

function tokenize(definition: string): Token[] {
  const result: Token[] = []
  for (let ii = 0; ii < definition.length; ii++) {
    const c = definition[ii]
    if ('0123456789'.includes(c)) {
      if (
        result.length
        && result[result.length - 1].name === 'NUMBER'
      ) {
        result[result.length - 1].value *= 10
        result[result.length - 1].value += Number.parseInt(c)
      }
      else {
        result.push({ name: 'NUMBER', value: Number.parseInt(c), startI: ii })
      }
    }
    else if (c === ' ') {
      continue
    }
    else if (c === ',') {
      result.push({ name: 'COMMA', value: -1, startI: ii })
    }
    else if (c === '(') {
      result.push({ name: 'OPEN_PAREN', value: -1, startI: ii })
    }
    else if (c === ')') {
      result.push({ name: 'CLOSE_PAREN', value: -1, startI: ii })
    }
    else if (c === '-') {
      result.push({ name: 'HYPHEN', value: -1, startI: ii })
    }
    else {
      logDefinitionBadCharacter('0123456789,-()', c, definition, ii)
    }
  }

  return result
}

function logDefinitionBadCharacter(
  expected: string,
  found: string,
  definition: string,
  index: number,
) {
  logError(
    'Cientos AnimationDefinitionParser: '
    + `Unexpected character while processing animation definition: expected ${expected}, got ${found}.
${definition}
${Array.from({ length: index + 1 }).join(' ')}^`,
  )
}

function logDefinitionSyntaxError(
  expected: string,
  found: string,
  definition: string,
  index: number,
) {
  logError(
    'Cientos AnimationDefinitionParser: '
    + `Syntax error while processing animation definition: expected ${expected}, got ${found}.
${definition}
${Array.from({ length: index + 1 }).join(' ')}^`,
  )
}
