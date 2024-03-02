# Composables

Vue 3 [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api) pozwala na tworzenie wielokrotnie używalnej logiki, którą można udostępniać między komponentami. Pozwala również na tworzenie niestandardowych haków, które można używać w komponentach.

**TresJS** w pełni korzysta z tego interfejsu API, aby stworzyć zestaw komponowalnych funkcji, które można wykorzystać do tworzenia animacji, interakcji ze sceną i więcej. Pozwala również na tworzenie bardziej skomplikowanych scen, które mogą nie być możliwe tylko przy użyciu komponentów Vue (tekstury, ładowarki, itp.).

Jądro **TresJS** używa tych komponowalnych elementów wewnętrznie, więc korzystasz z tego samego interfejsu API, którego używa jądro. Na przykład, komponenty, które wymagają aktualizacji wewnętrznej pętli renderowania, używają komponowalnego elementu useRenderLoop do zarejestrowania zwrotu, który zostanie wywołany za każdym razem, gdy renderer zaktualizuje scenę

## useRenderLoop

Komponowalny element `useRenderLoop` stanowi rdzeń animacji w **TresJS**. Pozwala na zarejestrowanie zwrotu, który będzie wywoływany przy naturalnej częstotliwości odświeżania. To najważniejszy komponowalny element w**TresJS**.

```ts
const { onLoop, resume } = useRenderLoop();

onLoop(({ delta, elapsed, clock, dt }) => {
  // I will run at every frame ~60FPS (depending of your monitor)
});
```

::: ostrzeżenie
Miej na uwadze konsekwencje wydajnościowe przy korzystaniu z tego komponowalnego elementu. Będzie on wykonywany w każdej klatce, więc jeśli masz dużo logiki w swoim zwrocie, może to wpłynąć na wydajność twojej aplikacji. Szczególnie, jeśli aktualizujesz stany lub referencje reaktywne.
:::

Zwrot `onLoop` otrzymuje obiekt z następującymi właściwościami opartymi na [zegarze THREE](https://threejs.org/docs/?q=clock#api/en/core/Clock):

- `delta`: Czas, który upłynął między bieżącą klatką a poprzednią. Jest to czas w sekundach od ostatniej klatki.
- `elapsed`: Czas, który upłynął od rozpoczęcia pętli renderowania.

Ten komponowalny element opiera się na `useRafFn` z [vueuse](https://vueuse.org/core/useRafFn/). Dzięki [@wheatjs](https://github.com/orgs/Tresjs/people/wheatjs) za niesamowity wkład.

### Przed i po renderowaniu

Możesz również zarejestrować zwrot, który zostanie wywołany przed i po tym, jak renderownik zaktualizuje scenę. Jest to przydatne na przykład, gdy dodajesz profilator do pomiaru liczby klatek na sekundę (FPS).

```ts
const { onBeforeLoop, onAfterLoop } = useRenderLoop();

onBeforeLoop(({ delta, elapsed }) => {
  // Se ejecutara antes del renderizado de la escena
  fps.begin();
});

onAfterLoop(({ delta, elapsed }) => {
  // Se ejecutara después del renderizado de la escena
  fps.end();
});
```

### Pauzowanie i wznowienie

Możesz wstrzymać i wznowić pętlę renderowania, korzystając z udostępnionych metod `pause` i `resume`.

```ts
const { pause, resume } = useRenderLoop();

// Pausa el bucle de renderizado
pause();

// Reanuda el bucle de renderizado
resume();
```

Także możesz uzyskać aktualny stan pętli renderowania, korzystając z właściwości `isActive`.

```ts
const { resume, isActive } = useRenderLoop();

console.log(isActive); // false

resume();

console.log(isActive); // true
```

## useLoader

Kompozycja `useLoader` umożliwia ładowanie zasobów przy użyciu [ładowaczy THREE.js](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models). Zwraca promise z załadowanym zasobem.

```ts
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

const { scene } = await useLoader(THREE.GLTFLoader, "path/to/asset.gltf");
```

Ponieważ kompozycja `useLoader` zwraca promise, możesz jej używać z `async/await` lub `then/catch`. . Jeśli używasz jej w komponencie, upewnij się, że otaczasz ją komponentem `Suspense`. Zobacz [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense) po więcej informacji.

```vue
<template>
  <Suspense>
    <TheComponentUsingLoader />
  </Suspense>
</template>
```

## useTexture

Kompozycja `useTexture`umożliwia ładowanie tekstur przy użyciu [THREE.js texture loader](https://threejs.org/docs/#api/en/loaders/TextureLoader). Zwraca promise z załadowaną texturą lub texturami.

```ts
const texture = await useTexture(["path/to/texture.png"]);
```

**useTexture** akceptuje również obiekt z następującymi właściwościami:

- `map`: podstawowa tekstura stosowana na powierzchni obiektu
- `displacementMap`: tekstura używana do dodawania wypukłości lub wgłębień na powierzchni obiektu
- `normalMap`: tekstura używana do dodawania szczegółów powierzchni i wariacji w cieniowaniu obiektu
- `roughnessMap`: tekstura używana do dodawania chropowatości lub matowego wykończenia na powierzchni obiektu
- `metalnessMap`: tekstura używana do dodawania efektu metalicznego na powierzchni obiektu
- `aoMap`: tekstura używana do dodawania oksluzji otoczenia (cieniowanie w obszarach, gdzie światło jest blokowane przez inne obiekty) do obiektu.
- `alphaMap`: tekstura używana do dodawania przejrzystości (czarna część renderowana jako przeźroczysta) do obiektu. Konieczne jest ustawienie :transparent="true" w materiale, aby używać tej mapy.
- `matcap`: ta tekstura koduje kolor i cieniowanie materiału.

W takim przypadku zostanie zwrócony obiekt z załadowanymi teksturami.

```ts
const {
  map,
  displacementMap,
  normalMap,
  roughnessMap,
  metalnessMap,
  aoMap,
  alphaMap,
  matcap,
} = await useTexture({
  map: "path/to/albedo.png",
  displacementMap: "path/to/height.png",
  normalMap: "path/to/normal.png",
  roughnessMap: "path/to/roughness.png",
  metalnessMap: "path/to/metalness.png",
  aoMap: "path/to/ambien-occlusion.png",
  alphaMap: "path/to/alpha.png",
  matcap: "path/to/matcap.png",
});
```

Następnie możesz przypisać tekstury do materiału.

```vue
<template>
  <TresCanvas>
    <TresMesh>
      <TresSphereGeometry />
      <TresMeshStandardMaterial
        :map="map"
        :displacement-map="displacementMap"
        :normal-map="normalMap"
        :roughness-map="roughnessMap"
        :metalness-map="metalnessMap"
        :ao-map="aoMap"
        :alpha-map="alphaMap"
      />
    </TresMesh>
  </TresCanvas>
</template>
```

Podobnie jak poprzednia kompozycja, kompozycja `useTexture` zwraca obietnicę. Możesz jej używać z `async/await` lub `then/catch`. Jeśli używasz jej w komponencie, upewnij się, że otaczasz ją komponentem `Suspense`.

## useSeek

Kompozycja `useSeek` dostarcza narzędzi do łatwego przeszukiwania i nawigowania przez sceny oraz grafiki obiektów w ThreeJS. Eksportuje 4 funkcje, które umożliwiają znajdowanie obiektów podrzędnych na podstawie określonych właściwości.

```ts
const { seek, seekByName, seekAll, seekAllByName } = useSeek();
```

Funkcja `seek` przyjmuje trzy parametry:

- `parent`: Scena ThreeJS lub Object3D.
- `property`: Właściwość, która będzie używana w warunku wyszukiwania.
- `value`: Wartość właściwości do dopasowania.

Funkcje `seek` i `seekByName` przeszukują obiekt i zwracają obiekt podrzędny z określoną właściwością i wartością. Jeśli nie zostanie znaleziony żaden obiekt podrzędny z podaną właściwością i wartością, zwraca null i rejestruje ostrzeżenie.

```ts
const carRef = ref(null);

watch(carRef, ({ model }) => {
  if (model) {
    const car = model.children[0];

    const body = seek(car, "name", "Octane_Octane_Body_0");
    body.color.set(new Color("blue"));
  }
});
```

Podobnie jak wcześniej, funkcje `seekAll` i `seekAllByName` zwracają tablicę obiektów podrzędnych, których właściwość zawiera podaną wartość. Jeśli nie zostaną znalezione żadne dopasowania, zwracają pustą tablicę i rejestrują ostrzeżenie.

```ts
const character = ref(null);

watch(character, ({ model }) => {
  if (model) {
    const bones = seekAll(character, type, "Bone");
  }
});
```

## useTresContext

Kompozycja ta ma na celu dostarczenie dostępu do modelu stanu, który zawiera wiele przydatnych właściwości.

```ts
const { camera, renderer, camera, cameras } = useTresContext();
```

::: warning
`useTresContext` może być używane tylko wewnątrz komponentu `TresCanvas`, ponieważ `TresCanvas` działa jako dostawca danych kontekstowych. Użyj [kontekstu udostępnionego przez TresCanvas](tres-canvas#propiedades-públicas-expuestas), jeśli musisz uzyskać do niego dostęp w komponentach wyższego rzędu niż TresCanvas.
:::

```vue
<TresCanvas>
  <MyModel />
</TresCanvas>
```

```vue
// MyModel.vue

<script lang="ts" setup>
import { useTresContext } from "@tresjs/core";

const context = useTresContext();
</script>
```

### Właściwości kontekstu

| Właściwość           | Opis                                                                                                                                            |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **camera**           | aktualnie aktywna kamera                                                                                                                        |
| **cameras**          | kamery istniejące w scenie                                                                                                                      |
| **controls**         | kontrolki Twojej sceny                                                                                                                          |
| **deregisterCamera** | metoda do wyrejestrowania kamery. Jest to konieczne tylko wtedy, gdy ręcznie tworzysz kamerę. Kamery w szablonie są rejestrowane automatycznie. |
| **extend**           | Rozszerza katalog komponentów. Zobacz [rozszerzanie](/advanced/extending).                                                                      |
| **raycaster**        | globalny raycaster używany do zdarzeń wskaźnika                                                                                                 |
| **registerCamera**   | metoda do zarejestrowania kamery. Jest to konieczne tylko wtedy, gdy ręcznie tworzysz kamerę. Kamery w szablonie są rejestrowane automatycznie. |
| **renderer**         | el [WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) Twojej sceny                                                       |
| **scene**            | la [scena](https://threejs.org/docs/?q=sce#api/en/scenes/Scene)                                                                                 |
| **setCameraActive**  | metoda do ustawiania aktywnej kamery                                                                                                            |
| **sizes**            | zawiera szerokość, wysokość i proporcję obrazu Twojego płótna                                                                                   |
