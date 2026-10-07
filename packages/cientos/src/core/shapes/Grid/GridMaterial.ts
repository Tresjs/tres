import type { ShaderMaterial } from 'three'
import { Color, Vector3 } from 'three'
import { shaderMaterial } from '../../../utils/shaderMaterial'
import type { GridMaterialUniforms } from './props'
import { gridDefaults } from './props'

/**
       Based on
      https://github.com/Fyrestar/THREE.InfiniteGridHelper by https://github.com/Fyrestar
      and https://github.com/threlte/threlte/blob/main/packages/extras/src/lib/components/Grid/Grid.svelte
      by https://github.com/grischaerbe and https://github.com/jerzakm
*/

// `GridNodeMaterial.ts` ports this shader to TSL. A fix here must go there too.
export const GridMaterial = shaderMaterial(
  {
    cellSize: gridDefaults.cellSize,
    sectionSize: gridDefaults.sectionSize,
    fadeDistance: gridDefaults.fadeDistance,
    fadeStrength: gridDefaults.fadeStrength,
    fadeFrom: gridDefaults.fadeFrom,
    cellThickness: gridDefaults.cellThickness,
    sectionThickness: gridDefaults.sectionThickness,
    cellColor: new Color(gridDefaults.cellColor),
    sectionColor: new Color(gridDefaults.sectionColor),
    infiniteGrid: gridDefaults.infiniteGrid,
    followCamera: gridDefaults.followCamera,
    worldCamProjPosition: new Vector3(),
    worldPlanePosition: new Vector3(),
  },
  /* glsl */ `
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  /* glsl */ `
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float fadeFrom;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
) as unknown as new () => ShaderMaterial & GridMaterialUniforms
