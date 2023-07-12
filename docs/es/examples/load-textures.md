# Importar y usar Textures

> Todas las texturas usada en este ejemplo son de [ambientcg](https://ambientcg.com/).

Texturas tridimensionales (3D) son imágenes que contener capas múltiples de datos, permitiéndoles a representar volumen o simular estructuras tridimensionales. Estas texturas se usan frecuentemente en gráficas 3D y efectos para mejorar el realismo y complejidad de escenas y objetos.

<StackBlitzEmbed projectId="tresjs-load-textures" />

Hay dos maneras de cargar texturas 3D en TresJs:

## Usando `useLoader`

Para cargar el recurso, el `useLoader` composable te permite pasar cualquier tipo de `Loader` de Three.js y una URL. Devuelve una `Promise` con el recurso cargado.

Para una explanación detallada de como usar `useLoader`, ve la documentación de [useLoader](/api/composables#useloader).

```ts
import { useLoader } from '@tresjs/core'
import { TextureLoader } from 'three/examples/jsm/loaders/TextureLoader'

const texture = useLoader(TextureLoader, '/Rock035_2K_Color.jpg')
```

Entonces, puedes pasar la textura al material:

```html
<Suspense>
  <TresCanvas>
    <TresScene>
      <TresMesh>
        <TresSphereGeometry :args="[1,32,32]" />
        <TresMeshStandardMaterial :map="texture" />
      </TresMesh>
    </TresScene>
  </TresCanvas>
</Suspense>
```

Nota que en el ejemplo anterior que usamos el componente `Suspense` para 'envolver' el componente `TresCanvas`. Eso es por que el `useLoader` devuelve una `Promise` y necesitamos esperarlo a que se resuelva antes de renderizar la escena.

## Usando `useTexture`

Una manera más conveniente de cargar texturas es usar el composable `useTexture`. Se acepta un Array de URLs o un objeto singular con las rutas de textura mapeados.

Para aprender más de `useTexture`, ve la documentación de [useTexture](/api/composables#use-texture).

```ts
import { useTexture } from '@tresjs/core'

const pbrTexture = await useTexture({
  map: '/textures/black-rock/Rock035_2K_Displacement.jpg',
  displacementMap: '/textures/black-rock/Rock035_2K_Displacement.jpg',
  roughnessMap: '/textures/black-rock/Rock035_2K_Roughness.jpg',
  normalMap: '/textures/black-rock/Rock035_2K_NormalDX.jpg',
  ambientOcclusion: '/textures/black-rock/Rock035_2K_AmbientOcclusion.jpg',
})
```

Al igual que en el ejemplo anterior, podemos pasar todas las texturas a un material via props:

```html
<Suspense>
  <TresCanvas>
    <TresScene>
      <TresMesh>
        <TresSphereGeometry :args="[1,32,32]" />
        <TresMeshStandardMaterial
          :map="pbrTexture.map"
          :displacementMap="pbrTexture.displacementMap"
          :roughnessMap="pbrTexture.roughnessMap"
          :normalMap="pbrTexture.normalMap"
          :ambientOcclusionMap="pbrTexture.ambientOcclusionMap"
        />
      </TresMesh>
    </TresScene>
  </TresCanvas>
</Suspense>
```
