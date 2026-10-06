---
name: new-experiment
description: Create a new experiment in TresJS Lab with all necessary files
---

# New Experiment

Create a new experiment in the TresJS Lab app with all necessary files and structure.

## Steps

1. **Parse arguments**: Extract experiment name from `$ARGUMENTS`. If second argument is `shaders` or `true`, enable shader support.

2. **Convert naming**: Convert kebab-case to PascalCase for component naming (e.g., `wobble-sphere` → `WobbleSphere`).

3. **Create markdown file**: Create `apps/lab/content/experiments/{experiment-name}.md` with frontmatter:
   ```yaml
   ---
   title: {Experiment Title}
   author: {your-github-username}
   description: {Brief description}
   thumbnail: /experiments/{experiment-name}.png
   tags: []
   date: {current-date}
   lastUpdated: {current-date}
   ---
   ```

4. **Create component directory**: `apps/lab/app/components/{experiment-name}/`

5. **Create index.global.vue**:
   ```vue
   <script setup lang="ts">
   // TODO: Implement experiment logic
   </script>

   <template>
     <TresCanvas>
       <TresPerspectiveCamera :position="[0, 0, 10]" :look-at="[0, 0, 0]" />
       <{ExperimentName}The{PascalCaseName} />
       <OrbitControls />
       <TheScreenshot />
     </TresCanvas>
   </template>
   ```

6. **Create experiment component**: `The{PascalCaseName}.vue` with basic structure.

7. **If shaders enabled**:
   - Create `shaders/` directory inside component folder
   - Create `shaders/vertex.glsl`:
     ```glsl
     uniform float uTime;
     uniform vec2 uResolution;

     void main() {
       vec4 modelPosition = modelMatrix * vec4(position, 1.0);
       vec4 viewPosition = viewMatrix * modelPosition;
       vec4 projectedPosition = projectionMatrix * viewPosition;
       gl_Position = projectedPosition;
     }
     ```
   - Create `shaders/fragment.glsl`:
     ```glsl
     uniform float uTime;
     void main() {
       gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
     }
     ```
   - Update `The{PascalCaseName}.vue`:
     ```vue
     <script setup lang="ts">
     import vertexShader from './shaders/vertex.glsl';
     import fragmentShader from './shaders/fragment.glsl';

     const uniforms = {
       uTime: { value: 0 },
       uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
     }
     </script>

     <template>
      <TresMesh>
        <TresPlaneGeometry />
        <TresShaderMaterial :uniforms="uniforms" :vertex-shader="vertexShader" :fragment-shader="fragmentShader" />
      </TresMesh>
     </template>
     ```

## Examples

```bash
# Basic experiment without shaders
/new-experiment my-cool-effect

# Experiment with shader support
/new-experiment wobble-sphere shaders
```

## Considerations

- Use kebab-case for file/folder names
- Use PascalCase for component names
- Component prefix matches experiment folder name (e.g., `WobbleSphereTheWobbleSphere`)
- Add appropriate tags in frontmatter (e.g., 'shaders', 'glsl', 'particles', 'basic')
- Markdown content can be filled in later - only create frontmatter
- For shader experiments, include basic uniforms for time-based animations
