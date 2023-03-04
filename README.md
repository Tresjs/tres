![repository-banner.png](/public/github-banner.png)

<p align="center">
  <a href="https://www.npmjs.com/package/@tresjs/core"><img src="https://img.shields.io/npm/v/@tresjs/core?color=%2382DBCA" alt="npm package"></a>
  <a href="https://discord.gg/tfY9aSNT"><img src="https://img.shields.io/badge/chat-discord-purple?style=flat&logo=discord" alt="discord chat"></a>
</p>
<br/>

# TresJS Playground

> Playground for TresJS experiments and R3F using [Astro](https://astro.build/)

Live at [Playground](https://playground.tresjs.org/)

## Getting Started

```bash
# Install dependencies
pnpm install
```

```bash
# Start dev server
pnpm dev
```

```bash
# Build for production
pnpm build
```

## Add a new page

1. Create a new `mdx` file in `src/pages` with the name of your page in kebab-case
2. Add the frontmatter to the top of the file

```md
---
layout: /@/layouts/ExperimentLayout.astro
thumbnail: /animations.png
title: Animations
author: alvaro-saburido
description: A basic example of how to animate a geometry using useRendererLoop composable
tags: ['basic', 'animations', 'useRendererLoop']
---
```

3. Create a new vue file in `src/components` with the name of your page in PascalCase. If the complexity of the component is too high, you can create a folder with the name of your page in PascalCase and add all the components inside.
4. Add the component to the page, is important to use the `client:only` directive to avoid hydration errors.

```md
import BasicAnimations from '/@/components/MyExperiment.vue'

<BasicAnimations client:only />
```

5. If you want to add info to the page, you can use the `Info` component.

```md
import TheInfo from '/@/components/TheInfo.astro'

<TheInfo >
# { frontmatter.title }

Tutorial [here](https://tresjs.org/examples/basic-animations.html)

Code example in markdown

</TheInfo>
```
