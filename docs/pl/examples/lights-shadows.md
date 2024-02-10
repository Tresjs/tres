# Światło i Cienie

Ten przewodnik pomoże Ci rozpocząć pracę z prostym oświetleniem i cieniami w TresJS.

Zbudujemy prostą scenę z trzema meshami i płaszczyzną, ale tylko dwa z nich będą miały cienie.

<SandboxDemo url="https://play.tresjs.org/#eNqVVt1y2jwQfRUN30WSKdimhLbjL3Qo9GfaadpM4K7uhbAXUGpLGkn8pJm8e1eSDXZCMmRCGGv37NHZ1XrFXWuqQH+QMlivoBW3LnSqmDREg1lJklO+GCQto5PW+4SzQgplyB3RS5rnYnMNc3JP5koU5ASjT/6vQSzrmPI11W2y0nANPAP1XQhZBQwNIm50mArVjPypZsyMBTdK5HrHv4Mz4EboRsSIapZOljQTm0sq22Ry/WU0FrlQE0lTaJMfYio4oEsyvtgxmqUCOEl4wlPBtSGLnAzIXcIJSXOgyhHE5OS/d68/jsb9k7b1YOK4iY6JUStwFprLJY3JnObaGzwEN5veSogfarMIsTJyhRlWAuOHgi3I7BXHzQTQfb9XPRNbewyD2pmcnu3dd0RwW3XMetA8B4/y3tPTMzJ475Nn81PPGaxpvoIzZ6xbAiUMNUzw4Ja8GpAoiLoWgpruHWXCL0LfRNgyuDBQyJwawBUhF/u+IOvOjPEM22uRJy2ywWex6Wj21yMR2+yEsDJbiitQWkJq2BrGtABFSSyFZlYWEv7qt8nbwH/9Ru54LtZoPu/bZ+oCcdm1K45Hjc9R4FZzt+hGUYSrxoaXoJfNPTqv2wQ/kdugqol1RG1ySc0yuPrqvSVNlTye5BcQBRh1i2LUQtuYbpt0reCeZas2rm09FYIjKShGc5LaVsGosjXrUsMq4JF2BXMM8QeJESnVpuN7tZkWqrefR7pHYntAttVcfb1I+vln+3ec9LrWplisvz2Gx2oncglqX+ejZX0ejaLe6NiKpoD991QVO71DzdEpW4OErnkOab/CqXuoRRC8/3+i2BNDeUZV9jiz+Vv791Rmtdw+FDM7Y7+zxdKQmHEDHPO6LV+YxkvxkWENbGY09/Dnumr3rhym9HL8aEDDRVibG612yw/7TkFlcKMFx5vKDaakdOAFFfv5ZW31u8U6ktbSGKnjMEwzjvEZ5GytAg4m5LII6/BhL+gHUZgxbUJrRnTSchO5QexvoZdw+wikf1OnL83NXcwG6B+JTXAE/w47PA9wiJXMlTEomI2pc9tb7xheixsiY/8d6n0FuqiXAW97vEyOrm8NPuxGrsA47WEbFM3qljhsIAXZC4h9wHPUCOxkULAjSCuoTf48eBPmbFanrO467Emj8ZKds8WDjkxFIVkO6qe03d/sTHdHf3O23U8IF7OE9M8B+43eeslX2Cyg1lju/VHiZADj3Z8mP2CLzztnIbJVXh7OE85r0CJfWY0eNlrxDGXXcE7tV/eC4Q+Pqf60dW9umVRDqMFfO876q5pJu17zht+ucA7vjmP8TJX2mfWC3q7g9/8AWlN6bg==" />

## Konfiguracja sceny (opcjonalne)

Konfiguracja sceny (opcjonalne)
Importujemy wszystkie moduły, których potrzebujemy, dla większej wygody możemy użyć orbit-controls z pakietu cientos,
[zobacz tutaj, aby dowiedzieć się jak](/examples/orbit-controls).

Umieśćmy cztery obiekty w naszej scenie, jeden z nich będzie płaszczyzną, która odbierze cienie, dwa z nich będą rzutować cienie, a ostatni nie będzie rzutował żadnych cieni w ogóle.

Skorzystam z [MeshToonMaterial](https://threejs.org/docs/index.html?q=toon#api/en/materials/MeshToonMaterial). Po prostu dlatego, że łatwo zauważymy "delikatne cieniowanie".

```vue
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
</script>

<template>
  <TresCanvas clear-color="#111" window-size>
    <OrbitControls />
    <TresPerspectiveCamera :position="[5, 7.5, 7.5]" />

    <TresMesh :position="[-2, 2, 0]" :rotation="[0, Math.PI, 0]">
      <TresConeGeometry :args="[1, 1.5, 3]" />
      <TresMeshToonMaterial color="#82DBC5" />
    </TresMesh>
    <TresMesh :position="[0, 0, 0]">
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial color="#4F4F4F" />
    </TresMesh>
    <TresMesh :position="[2, -2, 0]">
      <TresSphereGeometry />
      <TresMeshToonMaterial color="#FBB03B" />
    </TresMesh>
    <TresMesh :position="[0, -3, 0]" :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshStandardMaterial color="#f7f7f7" />
    </TresMesh>
  </TresCanvas>
</template>
```

## Oświetlenie (wyjaśnienie)

Jak wiesz, każda instancja w [ThreeJs](https://threejs.org/) jest dostępna w **TresJs**, więc wszystkie rodzaje świateł są również dostępne, wystarczy dodać prefiks `Tres`, aby ich używać.

Ale nie wszystkie światła mogą generować cienie, to określenie pochodzi bezpośrednio z ThreeJs i ma sens. Na przykład, cel [ambientLight](https://threejs.org/docs/index.html?q=ambient#api/en/lights/AmbientLight) to oświetlenie wszystkich stron sceny, więc nie ma sensu, aby generowało cienie. Z drugiej strony, [DirectionalLight](https://threejs.org/docs/index.html?q=light#api/en/helpers/DirectionalLightHelper) który imituje słońce, może i powinien generować cienie.

## Cienie (wyjaśnienie)

Istnieje również wiele rodzajów cieni, na przykład "cienie miękkie" generują się automatycznie, gdy obiekt otrzymuje więcej światła z jednej strony, ale ogólnie rzecz biorąc, "domyślny cień ThreeJS", który kieruje się w stronę innej powierzchni, musi być rzutowany przez jedną siatkę, a druga siatka musi go odbierać. Jak widzimy w naszym przykładzie, `Plane` otrzymuje cień, ale go nie rzutuje. Należy pamiętać, że nie wszystkie materiały mogą rzutować lub odbierać cienie.

Wewnętrznie ThreeJS automatycznie generuje nową siatkę z [ShadowMaterial](https://threejs.org/docs/index.html?q=shado#api/en/materials/ShadowMaterial) która jest aktualizowana w każdej klatce, dlatego jeśli zastosujesz animacje, cień również się animuje, ale to również dlatego, dlaczego należy ostrożnie korzystać z cieni, ponieważ mogą one wpływać na wydajność.

::: Uwagi
Zbyt częste korzystanie z cieni w ten sposób może wpływać na wydajność. Jednak istnieją sposoby na poprawę wydajności. Aby uzyskać więcej informacji, zobacz [to video](https://youtu.be/WGNvVGrS0kY?si=q7XyL5eABKUh3gbS&t=1256)
:::

## Włączanie cieni

Możemy podzielić to na trzy kroki:

### Włączanie cieni w renderowaniu

```vue
//...

<template>
  <TresCanvas clear-color="#111" shadows window-size />
  //...
</template>
```

### Konfiguracja światła do rzucania cieni

Możemy po prostu dodać boolean `cast-shadow`, Vue interpretuje to jako `prop` o wartości `true`.

_Oświetlenie ambientalne nie generuje tutaj żadnych cieni_

```vue
//...

<template>
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight cast-shadow :position="[0, 2, 0]" :intensity="1" />

  //...
</template>
```

### Ustawianie obiektów do rzucania lub odbierania cieni

Podobnie jak w poprzednim kroku, ustawiamy siatkę, którą chcemy, aby rzuciła cień (nasza sfera) za pomocą właściwości `cast-shadow`, a obiekt, który ma odbierać cień (nasza płaszczyzna) za pomocą właściwości `receive-shadow`.

```vue
//...

<template>
  <TresMesh cast-shadow :position="[2, -2, 0]">
    <TresSphereGeometry />
    <TresMeshToonMaterial color="#FBB03B" />
  </TresMesh>
  <TresMesh
    receive-shadow
    :position="[0, -3, 0]"
    :rotation="[-Math.PI / 2, 0, 0]"
  >
    <TresPlaneGeometry :args="[10, 10, 10, 10]" />
    <TresMeshStandardMaterial color="#f7f7f7" />
  </TresMesh>
  //...
</template>
```

eraz mamy wszystkie niezbędne kroki, aby dodać cienie do naszej sceny, a jeśli zastosujemy to, co się nauczyliśmy w [podstawowych animacjach](/examples/basic-animations), i dodamy ruch do naszego sześcianu, zauważysz, że cień również animuje się 🤩

```vue
<script setup>
import { shallowRef } from "vue";
import { TresCanvas, useRenderLoop } from "@tresjs/core";

const boxRef = shallowRef();

const { onLoop } = useRenderLoop();

onLoop(() => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01;
  }
});
</script>

<template>
  //...
  <TresMesh ref="boxRef" cast-shadow :position="[0, 0, 0]">
    <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
    <TresMeshToonMaterial color="#4F4F4F" />
  </TresMesh>
  //...
</template>
```

_Zauważ, że celowo nie zastosowałem `cast-shadow` do `Cone`, aby nie rzutował żadnych cieni._
