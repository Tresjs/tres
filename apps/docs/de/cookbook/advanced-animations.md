---
title: Fortgeschrittene Animationen
description: Wie man mit GSAP eine Szene animiert
author: dennissmuda
thumbnail: /recipes/animations.png
difficulty: 0
---

# Fortgeschrittene Animationen

In diesem Rezept werden wir GSAP verwenden um unsere Szene zu animieren, statt des `useRenderLoop`-Composables.

<StackBlitzEmbed project-id="tresjs-advanced-animations" />

## 3D Objekte mit GSAP animieren

Wir müssen nicht unbedingt `useRenderLoop` oder gar TresJS für unsere Animationen benutzen. Zum Beispiel könnten wir auch GSAP's `to`-Method verwenden:

```ts
import gsap from 'gsap'

const objectRef = shallowRef(null)

watchEffect(() => {
  if (objectRef.value) {
    gsap.to(objectRef.value.position, {
      y: 2,
    })
  }
})
```

GSAP ist schon seit vielen Jahren eine sehr beliebte Animations-Library im Web. Es gibt also unzählige Resourcen online wie zum Beispiel [diese Demos auf Codepen](https://codepen.io/GreenSock).

Du kannst natürlich auch _deine_ Lieblingsbibliothek nutzen, an Animations-Bibliotheken mangelt es im Web nicht!
