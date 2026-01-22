# UseRapier

In order to provide more flexibility in more advance physic scenes, and similar to `useTresContext` we provide `useRapier` to access the physic world, internally is used by other components in this library.

## Usage

```js
const { world, isPaused, rapier, isDebug, setWorld, step } = await useRapier()
```

:::warning
- Please note that in the examples below use top level await. Make sure to wrap such code with a Vue's Suspense component.

- Similar to useTresContext, `useRapier` can be only be used inside of a `<physics />` since this component acts as the provider for the context data.
:::
