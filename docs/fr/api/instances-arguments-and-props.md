# Instances

L'idée principale de **Tres** est un _catalogue généré automatiquement_ de tous les éléments ThreeJS. Ce catalogue est généré à partir du code source ThreeJS, il est donc toujours à jour.

Lorsque vous utilisez ThreeJS, vous devez importer les éléments que vous souhaitez utiliser. Par exemple, si vous souhaitez utiliser une « PerspectiveCamera », vous devez l'importer depuis le package `three`:

```js
import { PerspectiveCamera } from 'three'

const camera = new PerspectiveCamera(45, width / height, 1, 1000)
```

Avec **Tres**, vous n'avez pas besoin d'importer quoi que ce soit, car **Tres** génère automatiquement un composant **Vue basé sur l'objet Three que vous souhaitez utiliser dans CamelCase avec un préfixe Tres**. Par exemple, si vous souhaitez utiliser une `PerspectiveCamera`, vous pouvez utiliser le composant `<TresPerspectiveCamera />`.

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <!-- Votre scène -->
  </TresCanvas>
</template>
```

Cela signifie que vous pouvez utiliser la même [documentation](https://threejs.org/docs/) que celle que vous utiliseriez lors de l'utilisation de ThreeJS de base, mais avec la puissance de Vue.

## Déclarer des objets

Si nous suivons cet argument, vous devriez pouvoir définir une instance comme celle-ci : ❌

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera
      visible
      :position="new THREE.Vector3(1, 2, 3)"
    />
    <!-- Votre scène -->
  </TresCanvas>
</template>
```

Mais avec **Tres** ce n'est pas nécessaire, vous pouvez définir les propriétés de manière déclarative comme suit : ✅

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera
      visible
      :position="[1, 2, 3]"
    />
    <!-- Votre scène -->
  </TresCanvas>
</template>
```

## Arguments

Certains objets ThreeJS ont des arguments, par exemple le constructeur « PerspectiveCamera » a les arguments suivants :

- `fov` - Champ de vision vertical de la caméra.
- `aspect` - Rapport hauteur/largeur du tronc de la caméra.
- `near` - Plan rapproché du tronc de la caméra.
- `far` - Plan lointain du tronc de la caméra.

Pour transmettre ces arguments au composant `TresPerspectiveCamera`, vous pouvez utiliser la propriété `args` :

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <!-- Votre scène -->
  </TresCanvas>
</template>
```

C'est la même chose que de faire ceci :

```ts
const camera = new PerspectiveCamera(45, 1, 0.1, 1000)
```

## Propriétés

Vous pouvez également transmettre des propriétés au composant, par exemple `TresAmbientLight` a une propriété `intensity`, vous pouvez donc la transmettre au composant comme ceci :

```html
<TresAmbientLight :intensity="0.5" />
```

### Set

Toutes les propriétés dont l'objet sous-jacent a une méthode `.set()` ont un raccourci pour recevoir la valeur sous forme de tableau. Par exemple, `TresPerspectiveCamera` a une propriété `position`, qui est un objet `Vector3`, vous pouvez donc la transmettre au composant comme ceci :

```html
<TresPerspectiveCamera :position="[1, 2, 3]" />
```

Pour spécifier les propriétés de transformation telles que la position, la rotation et l'échelle, un raccourci est disponible qui vous permet d'indiquer directement l'axe que vous souhaitez définir dans les propriétés. Un raccourci similaire est également disponible pour la propriété color.

<!-- J'ai changé la syntaxe des couleurs de Vue en HTML, car Vue semble être cassé et ne colore pas les composants imbriqués -->
```html
<TresMesh :position-x="1" :scale-y="2" :rotation-x="Math.PI * 2">
  <TresMeshBasicMaterial :color-r="0.7" :color-b="0.3" />
</TresMesh>
```

::: warning
Lorsque vous définissez la propriété de rotation avec [three.js](https://threejs.org/docs/index.html#api/en/math/Euler), l'ordre 'XYZ' sera utilisé par défaut.
Il est important de noter que lors de la définition de la propriété rotation avec le raccourci, l'ordre dans lequel vous définissez les angles est important. Pour plus d'informations sur ce sujet, voir [Angle d'Euler](https://fr.wikipedia.org/wiki/Angles_d%27Euler)
:::

<!-- Notez que l'ordre des propriétés de rotation est important et que la modification de cet ordre peut conduire à des résultats différents. -->
```vue
<TresMesh :rotation-x="1" :rotation-y="2" :rotation-z="Math.PI * 2" />

<TresMesh :rotation-z="Math.PI * 2" :rotation-x="1" :rotation-y="2" />
```

### Scalaire

Un autre raccourci que vous pouvez utiliser consiste à transmettre une valeur scalaire à une propriété qui attend un objet « Vector3 », en utilisant la même valeur pour le reste du vecteur :

```html
<TresPerspectiveCamera :position="5" /> ✅
```

```html
<TresPerspectiveCamera :position="[5, 5, 5]" /> ✅
```

### Couleurs

Vous pouvez transmettre des couleurs aux composants en utilisant la propriété `color`, qui accepte une chaîne avec le nom de la couleur ou une valeur hexadécimale :

```html
<TresAmbientLight color="teal" /> ✅
```

```html
<TresAmbientLight color="#008080" /> ✅
```

### Méthodes

Certaines propriétés sous-jacentes sont en fait des méthodes, le `TresPerspectiveCamera` a une méthode `lookAt` héritée de [Object3d](https://threejs.org/docs/#api/en/core/Object3D.lookAt), vous pouvez donc transmettre les coordonnées au composant comme ceci :

```html
<TresPerspectiveCamera :look-at="[1, 2, 3]" />
```
