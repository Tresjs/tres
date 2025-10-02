# MeshWobbleMaterial

<DocsDemo>
  <WobbleMaterialDemo />
</DocsDemo>

The `cientos` package provides a `<MeshWobbleMaterial />` component that makes a geometry wobble and wave around. This material extends `MeshStandardMaterial` so all the default props can be passed as well in addition for two more:

- `speed` how fast the wobble effect would be
- `factor`: how strong the wobble effect will deform the geometry

## Usage

<<< @/.vitepress/theme/components/WobbleMaterialDemo.vue{3,11-15}
