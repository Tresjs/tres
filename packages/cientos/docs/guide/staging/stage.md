# Stage

<DocsDemo>
  <StageDemo />
</DocsDemo>

This component creates a "stage" for your models. It sets up:

* model lighting
* ground shadows
* zoom to fit
* environment

::: info
If you are using other camera controls, be sure to make them the 'default'.
```vue
<OrbitControls make-default />
```
:::

::: info
If you are using `shadows="accumulative"`, enable shadows on your canvas.
```vue
<TresCanvas shadows />
```

And on your objects.

```vue
<TresMesh cast-shadow />
  ...
</TresMesh>
```
:::

## Usage

<<< @/.vitepress/theme/components/StageDemo.vue

## Props

```ts
interface StageProps {
  /** Lighting setup, default: "rembrandt" */
  lighting?:
    | null | undefined | false
    | 'rembrandt'
    | 'portrait'
    | 'upfront'
    | 'soft'
    | { main: [x: number, y: number, z: number], fill: [x: number, y: number, z: number] }
  /** Controls the ground shadows, default: "contact" */
  shadows?: boolean | 'contact' | 'accumulative' | StageShadows
  /** Optionally wraps and thereby centers the models using <Bounds>, can also be a camera offset, default: true */
  adjustCamera?: boolean | number
  /** The default environment, default: "city" */
  environment?: string | Partial<EnvironmentOptions> | null
  /** Lighting intensity, `0` removes lights, default: 0.5 */
  intensity?: number
  /** To adjust alignment, default: undefined */
  align?: Partial<AlignProps>
}

type StageShadows = Partial<AccumulativeShadowsProps> &
  Partial<RandomizedLightsProps> &
  Partial<ContactShadowsProps> & {
    type: 'contact' | 'accumulative'
    /** Shadow plane offset, default: 0 */
    offset?: number
    /** Shadow bias, default: -0.0001 */
    bias?: number
    /** Shadow normal bias, default: 0 */
    normalBias?: number
    /** Shadow map size, default: 1024 */
    size?: number
  }
```
