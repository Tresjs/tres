import { Color, type Vector2, type Light } from 'three';
import type { shaderToySrc } from './index';
import { MathUtils } from 'three';

const { clamp } = MathUtils

const { pow, sqrt, cos, abs, sin, } = Math

export type LightFn = (light: Light, uv: Vector2, iTime: number) => void

const color = new Color()
export const shaderToyLights = {
  sinusoidalTresJS: (light: Light, uv: Vector2, iTime: number) => {
    color.g = 0.5 * clamp(pow(1.0 - sqrt(abs(cos(uv.y + uv.x + iTime))), sin(iTime) + 2.0), 0.2, 1);
    color.b = 0.5 * clamp(pow(1.0 - sin(uv.y + iTime), cos(iTime) + 2.0), 0.2, 1);
    color.r = 0.5 * clamp(sin(iTime + uv.x + sin(uv.y + iTime)), 0.2, 1);
    // NOTE: Just taking one sample, but it'll be jerky.
    // Lerp to avoid big jumps in color.
    light.color.lerp(color, 0.06)
  },

  sinusoidalTresJS2: (light: Light, uv: Vector2, iTime: number) => {
    color.g = pow(1.0 - sqrt(abs(cos(uv.y + iTime * 0.1))), sin(iTime) + 2.0);
    color.b = pow(1.0 - sin(uv.y + iTime), cos(iTime) + 2.0);
    color.r = sin(iTime + uv.y + sin(uv.y + iTime));
    // NOTE: Just taking one sample, but it'll be jerky.
    // Lerp to avoid big jumps in color.
    light.color.lerp(color, 0.1)
  }
} as Record<keyof typeof shaderToySrc, LightFn>