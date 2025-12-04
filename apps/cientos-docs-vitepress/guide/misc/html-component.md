# Html <Badge type="warning" text="^3.5.0" />

This component allows you to project HTML content to any object in your scene. TresJS will automatically update the position of the HTML content to match the position of the object in the scene.

<DocsDemo>
  <HtmlDemo />
</DocsDemo>

## Usage

<<< @/.vitepress/theme/components/HtmlDemo.vue{2,19-28}

## Occlusion

By default, the HTML content will be visible through other objects in the scene. You can use the `occlude` prop to make the HTML content occlude other objects in the scene.

Html can be hidden behind one or more objects in your scene using the `occlude` prop.

```vue
<Html occlude>
```

If `occlude`, then `<Html>` will be hidden by any objects that pass in front of its position.

<DocsDemo>
  <HtmlOccludeDemo />
</DocsDemo>

<details>
  <summary>Demo code</summary>

<<< @/.vitepress/theme/components/HtmlOccludeDemo.vue{2,21}

</details>

You can also choose which object or objects should occlude the HTML content by passing either a single object ref or an array of object refs to the `occlude` prop:

#### Single occluder
```vue
<Html occlude="[mesh]">
```

<DocsDemo>
  <HtmlSingleOccludeDemo />
</DocsDemo>

<details>
  <summary>Demo code</summary>

<<< @/.vitepress/theme/components/HtmlSingleOccludeDemo.vue{2,10,23,32}
</details>

#### Multiple occluders
```vue
<Html occlude="[mesh1, mesh2, mesh3, ...]" />
```

OR

```vue
<Html occlude="meshesArray" />
```
In the demo below, a `v-for` loop generates multiple spheres around the cube.
All resulting **`Mesh`** instances are collected into an array and passed to the **`occlude`** prop, allowing each sphere to occlude the HTML content.

This demo also uses the **`on-occlude`** event, which is triggered whenever the occlusion state changes.
Here, the event updates a **reactive value** to control element styles — for example, toggling between *light* and *dark* themes.

<DocsDemo>
  <HtmlOccludeComplexDemo />
</DocsDemo>

<details>
  <summary>Demo code</summary>

<<< @/.vitepress/theme/components/HtmlOccludeComplexDemo.vue{2,20,31,33-36,49,51,62,71}
</details>

#### Blending Occlusion

`<Html>` can hide behind geometry as if it was part of the 3D scene using this mode. It can be enabled by using "blending" as the occlude prop.

```vue
<Html occlude="blending">
```

The **demo below ⬇️** *(left black example)* shows a **basic usage example**.

<DocsDemo>
  <HtmlOccludeBlendingDemo />
</DocsDemo>

<details>
  <summary>Demo code</summary>

<<< @/.vitepress/theme/components/HtmlOccludeBlendingDemo.vue{2,32,34-39,62-72,63-72,74-84,86-96,98-108}
</details>

#### Custom Geometry

By default, when using `occlude="blending"`, occlusion works correctly only with **rectangular HTML elements** (using a `PlaneGeometry`).
For *non-rectangular content*, you can use the **`geometry`** prop to provide a matching custom geometry.

In the **demo above ⬆️** *(middle yellow example)*, a [`CircleGeometry`](https://threejs.org/docs/#api/en/geometries/CircleGeometry) is used as a **custom geometry**.

:::info
- The `geometry` prop only defines the **occlusion shape** in 3D and does not modify your HTML content.
- You can provide any [`BufferGeometry`](https://threejs.org/docs/#api/en/core/BufferGeometry), for example to simulate **CSS-like styles** such as `border-radius` using a rounded rectangle or squircle geometry (see [RoundedRectangle / Squircle geometry](https://discourse.threejs.org/t/roundedrectangle-squircle/28645) for example).
:::

#### Custom Material

You can also assign material properties to the HTML content using the `material` prop.
In the **demo above ⬆️** *(right red example)*, a **custom material** is used with shadow.

:::info ℹ️ MATERIAL
The `material` prop is only available when `occlude="blending"` is **enabled**.
:::
:::info ℹ️ SHADOW
Enable shadows using the **`castShadow`** and **`receiveShadow`** props.
Shadows are supported **only** when using a **custom material**. By default, shadows do **not** work with *`MeshBasicMaterial`* or *`ShaderMaterial`*. <br />
:::

## Using `<Transition>`
The native Vue [`<Transition>`](https://vuejs.org/guide/built-ins/transition) component works seamlessly with `<Html>`.
This means you can **animate** how your projected HTML content *enters* and *leaves* the scene, exactly as you would in a regular Vue application.

:::info
All **standard interactions** are supported just like on a regular HTML element — **hover effects**, **events**, and *any kind of DOM interaction* are fully possible.
:::

<DocsDemo>
  <HtmlTransitionDemo />
</DocsDemo>

<details>
  <summary>Demo code</summary>

<<< @/.vitepress/theme/components/HtmlTransitionDemo.vue{2,68-73}
</details>

## Using `iframes`

You can achieve pretty cool results with the `Html` component by using iframes. For example, you can use an iframe to display a YouTube video in your scene or a webpage with a 3D model.



<details>
  <summary>Demo code</summary>

<<< @/.vitepress/theme/components/HtmlLaptopDemo.vue
</details>

## Props

| Prop                | Description                                                                                                               | Default                                  |
|---------------------|---------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| **as**              | Wrapping *HTML element*.                                                                                                    | `'div'`                                  |
| **wrapperClass**    | The `className` of the wrapping element. element.                                                                                    |                                          |
| **prepend**         | Projects content *behind* the canvas.                                                                                        | `false`                                  |
| **center**          | Adds a `transform: translate(-50%, -50%)`. <br>➡️ *Ignored in **transform** mode.*                                                               | `false`                                  |
| **fullscreen**      | Aligns to the upper-left corner and fills the screen. <br>➡️ *Ignored in **transform** mode.*                                            | `false`                                  |
| **distanceFactor**  | Children are scaled by this factor and also by distance to a `PerspectiveCamera`, or zoom when using an `OrthographicCamera`.      |                                          |
| **zIndexRange**     | Defines the *Z-order range*.                                                                                                            | `[16777271, 0]`                          |
| **portal**          | Reference to a target container (for rendering into a different DOM node). container.                                                                                            |                                          |
| **transform**       | If `true`, applies `matrix3d` transformations — the element appears as if it is inside the 3D scene.                                                                                | `false`                                  |
| **sprite**          | Renders as a *sprite*. <br>➡️ *Only in **transform** mode.*                                                                            | `false`                                  |
| **calculatePosition** | Callback function to override the default positioning logic. <br>**Type:** `(object: Object3D, camera: Camera, size: { width: number; height: number }) => [number, number, number]` <br>Receives the related 3D object, the active camera, and the current viewport size, and must return `[x, y, z]` pixel coordinates for placing the HTML element. <br>➡️ *Ignored in **transform** mode.*                                                     |    [Default `calculatePosition`](https://github.com/Tresjs/cientos/blob/main/src/core/misc/html/utils.ts#L9-L19)                                      |
| **occlude**         | Enables occlusion. Possible values: <br>- `true` → Occlusion against *all* scene objects <br> - `Ref<TresObject3D>[]` → Occlusion is enabled only against the specified objects. <br>- `'blending'` → Uses a *blending-based* occlusion method (CSS-like depth blending).                      |                                          |
| **geometry**         | Custom `geometry` to be used.                                                                                              |                    [`PlaneGeometry`](https://threejs.org/docs/?q=geometry#api/en/geometries/PlaneGeometry)       |
| **material**         | Custom shader `material` to be used.  use                                                                                              |                                          |

## Events

| Event               | Description                                                                                                               |
|---------------------|---------------------------------------------------------------------------------------------------------------------------|
| onOcclude           | Called when the occlusion state changes.                                                                                  |

## Exposed properties
| Property          | Type                        | Description                                                                 |
|-------------------|-----------------------------|-----------------------------------------------------------------------------|
| **instance**      | `Ref<TresObject3D \| null>` | Reference to the root **`<TresGroup>`** used by `<Html>`. |
| **isVisible**     | `Ref<boolean>`              | Reactive value that indicates whether the HTML content is **currently visible** or **occluded**. |
| **occlusionMesh** | `Ref<TresObject3D \| null>` | Reference to the **occlusion mesh** created when `occlude="blending"` is **enabled**. Used internally for geometry-based occlusion. |

## Caveats

- ✨ When using **`<Html occlude>`**, if the `<Html>` component is **overlapping** or **inside a 3D object**, it will be considered **occluded** and therefore **hidden**. To avoid this, **adjust the position** of the `<Html>` component in your scene.

- 🎨 When using **`<Html occlude="blending">`**, the HTML content is no longer **selectable** because it is rendered **behind the canvas**. This is required to achieve the blending effect.

- ⚙️ When using a **custom material** with occlusion in `blending` mode, there are a few important requirements to make the HTML content visible ⬇️

  <details>
    <summary>See more information</summary>

  1. Your **material must be transparent** (`transparent: true`) and have an **opacity (`opacity`)** value lower than `1`.
  2. Make sure your **`<TresCanvas>` does not use a clear-color**, or reduce its `clear-alpha` to `0`.
    - This ensures that the HTML content, rendered behind the canvas (via `zIndex`), remains visible.
  3. To compensate for the lack of a canvas background, you can **reapply your previous clear-color as a CSS background** on the `html`, `body`, or a wrapper `div`.
    </details>
