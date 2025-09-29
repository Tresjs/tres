# Grid

<DocsDemo>
  <GridDemo />
</DocsDemo>

`<Grid />` creates a shader-based grid plane. It has customizable grid cell and section lines, as well as fade out.

## Usage

<<< @/.vitepress/theme/components/GridDemo.vue

## Props

| Prop                   | Description            | Default |
| :--------------------- | :--------------------- | ------- |
| **cellSize**           | Cell size | `0.5`      |
| **cellThickness**      | Thickness of cell lines | `0.5`   |
| **cellColor**          | Color of cell lines    | `'black'` |
| **sectionSize**        | Section size           | `1`      |
| **sectionThickness**   | Thickness of section lines | `1`   |
| **sectionColor**       | Color of cell lines    | `'blue'` |
| **followCamera**       | Whether to follow camera | `false`     |
| **infiniteGrid**       | Whether to display an infinite grid | `false` |
| **fadeDistance**       | Fade distance          | `100`    |
| **fadeStrength**       | Fade strength          | `1`    |
| **fadeFrom**           | Fade from camera (1) or origin (0) or in between | `1` |
| **side**               | Material side          | `THREE.BackSide` |
