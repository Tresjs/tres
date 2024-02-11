# Texturen laden

> Alle Texturen in diesem Beispiel stammen von [ambientcg](https://ambientcg.com/).

Dreidimensionale (3D) Texturen sind Bilder, die mehrere Datenebenen enthalten, was es ihnen ermöglicht, Volumen zu repräsentieren oder dreidimensionale Strukturen zu simulieren. Diese Texturen werden häufig in 3D-Grafiken und visuellen Effekten verwendet, um den Realismus und die Komplexität von Szenen und Objekten zu erhöhen.

<SandboxDemo url="https://play.tresjs.org/#eNq9Vm1PGzkQ/itW7gNBJbvhVVWOVBToVb2DgoBvTVU5u5PE4LUt25uQi3K/5X7L/bIb27tZB1qUfqAgRcnj8TPPjMfjWbTuNJj3SiXTElq91rHJNFOWGLClIpyKcX/QsmbQejcQrFBSW3IHj7bUkJ9SzslIy4JsJWkMOqqt31f2C+JcnFExpYYsqx0nFrF7k2ZSr9te6SGzZ1JYLfl3zBkIK43b4f6P0yAXxeEPC4Xi1AL+IuS4cep+EpJxoLqTSS41hvTb273z07PDQSssmgnN5ayypFxNaPg6YwLxjmF/QwCUnIHuKA0j0CAyQKoJG086CvRI6oIi5DidsZeBQtYjSmvY6bsGbRRklk3hjBagK6+E9JQ0zDIpkP/L7g7Z2yGHX2uxuDySU1w5WOlHiHomRHcjUGDMCHWTGBx5bLfb7dZgLQpl3ZbII0xIYoWtnXhkmz4z9lGdM+1ikoLyC8yNXY+m66M5wGhIjwmL25md48IeAhk1thPOovJznDbniMBxGh1ya6cVyqZTUJXcGymwgBdu16BawLrtEY84LK45t4BHZ60yvTTNcoH7c+BsqhMBNhWqSGPzk/3kMOmmOTM2dTBaD1o7z4hDdf4Md9iB9EcxfQWve7EzoA+Kik20r2xPDhI8/Iq5BpOCuT0x90TDRrzO7gQZD9+i3jdgijgNeO9LAxvnNzI/2e36BON1g8ekWM9uZYd1gTX4E8Rhw0vUaNjJoWAbkNamLviD5CjlbBhTOsblQCyxJq3JpBix8ZOKzGShGAd9pdxNWK9MvFdy9qfHrC5hpS+bQPbwHfzePAbJ11gsoKeY7uYoqR6DDcsfbj/j1Y0WC5mXvDqcHyzegJG8dBqD2WkpcpQd2Xm1n/wFY2J8Zz48+ltcBbUm1M4VePRL3SFWtRaArz5x3t4fx9kLWWoi20/2o4Q/fXs2e8YWBJv46oGpnqxoFSuoIt5x328AD1tfSKl++IYNBB68sUQNdbWT9AmdUWYjsrYPBxtWj2zVBafpLBkzOymHaKeRBPNpEywY3/zQAzUYiEkLygQ2QM9j0iGn2UNHy+whvcGP7v7ht72/vp0zg/0xg8JR3Kvxls8t3v8Veom+Q0p/oQAty/FEgDGv7P2m9tO4Fu5d5q/s97N38vGicUuLoeviV1nGS3c5XtP7+ye+ahXL7agsjZrgzHKDRd93pd8WJefxursQpiyw3KWo6ry/XvntYD4QwaDdXhDskpaS5TbpvwsXNU3JJxybcFDQpSDUEpiCnuONwfmG/PPfv0fdP65vSTsHHBxybB9EjshclpoUUjAr9bYjYSPSXslNppSXsF33gSd4oqWlrlckc/KmH/SgytAcnN4XZsRqXrkEM3EZwRaxInfTickodwMezk7xZLI2GeH2W7/nI8gCLEbawy5lqrENZyz/4YadZm6K3N5aKnKq80uUpBnljYn7m3aG+MQgV9NRmjEu/MUXu1ML7iY4TDV2q5HTV5Zz+2ySWv4PY68KvA==" />

Es gibt zwei Möglichkeiten, 3D-Texturen in TresJS zu laden:

## Verwendung von `useLoader`

Das Composable `useLoader` ermöglicht es dir, jeden Typ von three.js-Loader und eine URL zum Laden der Ressource zu übergeben. Es gibt ein `Promise` mit der geladenen Ressource zurück.

Für eine detaillierte Erklärung, wie `useLoader` verwendet wird, siehe die Dokumentation von [useLoader](/de/api/composables#use-loader).

```ts
import { useLoader } from '@tresjs/core'
import { TextureLoader } from 'three'

const texture = useLoader(TextureLoader, '/Rock035_2K_Color.jpg')
```

Dann kannst du die Textur einem Material zuweisen:

```html
<Suspense>
  <TresCanvas>
    <TresMesh>
      <TresSphereGeometry :args="[1,32,32]" />
      <TresMeshStandardMaterial :map="texture" />
    </TresMesh>
  </TresCanvas>
</Suspense>
```

Beachte im obigen Beispiel, dass wir die `Suspense`-Komponente verwenden, um die `TresCanvas`-Komponente zu umgeben. Dies liegt daran, dass `useLoader` ein `Promise` zurückgibt und wir warten müssen, bis es gelöst ist, bevor wir die Szene rendern können.

## Verwendung von `useTexture`

Eine bequemere Möglichkeit, Texturen zu laden, ist die Verwendung des Composables `useTexture`. Es akzeptiert sowohl ein Array von URLs als auch ein einzelnes Objekt mit den Pfaden der gemappten Texturen.

Für mehr Informationen über `useTexture`, siehe die Dokumentation von [useTexture](../api/composables#usetexture).

```ts
import { useTexture } from '@tresjs/core'

const pbrTexture = await useTexture({
  map: '/textures/black-rock/Rock035_2K_Displacement.jpg',
  displacementMap: '/textures/black-rock/Rock035_2K_Displacement.jpg',
  roughnessMap: '/textures/black-rock/Rock035_2K_Roughness.jpg',
  normalMap: '/textures/black-rock/Rock035_2K_NormalDX.jpg',
  aoMap: '/textures/black-rock/Rock035_2K_AmbientOcclusion.jpg',
  metalnessMap: '/textures/black-rock/myMetalnessTexture.jpg',
  matcap: '/textures/black-rock/myMatcapTexture.jpg',
  alphaMap: '/textures/black-rock/myAlphaMapTexture.jpg'
})
```

Wie im vorherigen Beispiel können wir alle Texturen über Props an ein Material übergeben:

```html
<Suspense>
  <TresCanvas>
    <TresMesh>
      <TresSphereGeometry :args="[1,32,32]" />
      <TresMeshStandardMaterial
        :map="pbrTexture.map"
        :displacementMap="pbrTexture.displacementMap"
        :roughnessMap="pbrTexture.roughnessMap"
        :normalMap="pbrTexture.normalMap"
        :aoMap="pbrTexture.ambientOcclusionMap"
      />
    </TresMesh>
  </TresCanvas>
</Suspense>
```
