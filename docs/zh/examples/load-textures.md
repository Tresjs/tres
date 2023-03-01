# 加载纹理

> 本节中使用的所有纹理均来自 [ambientcg](https://ambientcg.com/)。

三维纹理是包含多层数据的图像，使它们能够表示体积或模拟三维结构。这些纹理通常用于 3D 图形和视觉效果中，以增强场景和对象的逼真度和复杂性。

<StackBlitzEmbed projectId="tresjs-load-textures" />

下面展示了 TresJS 中两种加载 3D 纹理的方式：

## 使用 `useLoader`

`useLoader` 组合式函数接收任意类型的 Three.js 的加载器和资料的路径。它返回一个带有已加载资源的 Promise。

关于 `useLoader` 的使用细节，请查看 [useLoader](/api/composables#use-loader) 文档。

```ts
import { useLoader } from "@tresjs/core";
import { TextureLoader } from "three/examples/jsm/loaders/TextureLoader";

const texture = useLoader(TextureLoader, "/Rock035_2K_Color.jpg");
```

将纹理传入材质中：

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

注意在上面的示例中，我们使用了 `Suspense` 组件来包裹 `TresCanvas` 组件。这是因为 `useLoader` 返回一个 Promise，我们需要等待它完成资源加载后再渲染场景。

## 使用 `useTexture`

这里还有一个更加简便的方式，使用 `useTexture` 加载纹理。它接受一个 URL 数组或一个包含纹理路径映射的对象。

关于 `useTexture` 的更多信息，请查看 [useTexture](/api/composables#use-texture) 文档。

```ts
import { useTexture } from "@tresjs/core";

const pbrTexture = await useTexture({
  map: "/textures/black-rock/Rock035_2K_Displacement.jpg",
  displacementMap: "/textures/black-rock/Rock035_2K_Displacement.jpg",
  roughnessMap: "/textures/black-rock/Rock035_2K_Roughness.jpg",
  normalMap: "/textures/black-rock/Rock035_2K_NormalDX.jpg",
  ambientOcclusion: "/textures/black-rock/Rock035_2K_AmbientOcclusion.jpg",
});
```

与前面的例子类似，我们可以通过 props 将纹理信息传递给材质:

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
