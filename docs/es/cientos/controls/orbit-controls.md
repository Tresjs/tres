# OrbitControls

[OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) es una camera controller que te permite orbitar alrededor de una target. Es una forma buena para explorar tu escena.

Sin embargo, no es parte del core de ThreeJS. Entonces, para usarlo, necesitarías importarlo del modulo `three/examples/jsm/controls/OrbitControls`.

Aquí es donde el parte elevado empiece. ✨  
El `cientos` package provee un componente se llama  `<OrbitControls />` lo que es un wrapper del `OrbitControls` del modulo [`three-stdlib`](https://github.com/pmndrs/three-stdlib).

¿El parte más agradable? No necesitas extender el catálogo o pasar ningun argumento.  
Ya funciona. 💯


```vue{3}
<template>
  <TresCanvas shadows alpha>
    <OrbitControls />
    <TresScene> ... </TresScene>
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                                                                                      | Default     |
| :---------------- | :--------------------------------------------------------------------------------------------------------------- | ----------- |
| **makeDefault**   | Si `true`, los controls se fijarán como los controls por defecto de la escena. scene.                                       | `false`     |
| **camera**        | La cámara para controla.                                                                                           | `undefined` |
| **domElement**    | El elemento dom element para escuchar.                                                                                   | `undefined` |
| **target**        | El objeto para orbitar.                                                                                      | `undefined` |
| **enableDamping** | Si `true`, los controls se usarán amortiguador (inercia), que se puede usar para dar un ilusión de peso a los controls. | `false`     |
