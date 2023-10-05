# Html <Badge type="warning" text="^3.4.0" />

This component allows you to project HTML content to any object in your scene. TresJS will automatically update the position of the HTML content to match the position of the object in the scene.

<DocsDemo>
  <HtmlDemo />
</DocsDemo>

## Usage

<<< @/.vitepress/theme/components/HtmlDemo.vue{3,13-23}

## Occlusion

By default, the HTML content will be visible through other objects in the scene. You can use the `occlude` prop to make the HTML content occlude other objects in the scene.

Html can hide behind geometry using the occlude prop.

```
<Html occlude>
```

You can also choose which objects should occlude the HTML content by passing an array of objects refs to the `occlude` prop.

<DocsDemo>
  <HtmlOccludeDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/HtmlOccludeDemo.vue{2,6,19,28}

## Using `iframes`

You can achieve pretty cool results with the `Html` component by using iframes. For example, you can use an iframe to display a YouTube video in your scene or a webpage with a 3D model.

<DocsDemo>
  <HtmlLaptopDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/HtmlLaptopDemo.vue{23-27}

## Props

| Prop                | Description                                                                                                               | Default                                  |
|---------------------|---------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| **as**              | Wrapping html element.                                                                                                    | `'div'`                                  |
| **wrapperClass**    | The className of the wrapping element.                                                                                    |                                          |
| **prepend**         | Project content behind the canvas.                                                                                        | `false`                                  |
| **center**          | Adds a -50%/-50% CSS transform. [Ignored in transform mode]                                                               | `false`                                  |
| **fullscreen**      | Aligns to the upper-left corner, fills the screen. [Ignored in transform mode]                                            | `false`                                  |
| **distanceFactor**  | Children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by an OrthographicCamera.      |                                          |
| **zIndexRange**     | Z-order range.                                                                                                            | `[16777271, 0]`                          |
| **portal**          | Reference to target container.                                                                                            |                                          |
| **transform**       | If true, applies matrix3d transformations.                                                                                | `false`                                  |
| **sprite**          | Renders as sprite, but only in transform mode.                                                                            | `false`                                  |
| **calculatePosition** | Override default positioning function. [Ignored in transform mode]                                                      |                                          |
| **occlude**         | Can be `true`, `Ref<TresObject3D>[]`, `'raycast'`, or `'blending'`. True occludes the entire scene.                       |                                          |
| **geometry**         | Custom `geometry` to be use                                                                                              |                    `PlaneGeometry`       |
| **material**         | Custom shader `material` to be use                                                                                              |                                          |

## Events

| Event               | Description                                                                                                               |
|---------------------|---------------------------------------------------------------------------------------------------------------------------|
| onOcculde           | Called when the occlusion state changes.                                                                                  |

