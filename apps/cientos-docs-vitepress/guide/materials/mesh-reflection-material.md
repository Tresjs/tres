# MeshReflectionMaterial

<DocsDemo>
  <MeshReflectionMaterialDemo />
</DocsDemo>

The `cientos` package provides a `<MeshReflectionMaterial />` component for making floors or walls that reflect the objects in your `Scene`.

The component is based on the excellent [Drei](https://github.com/pmndrs/drei) component of the same name.

It extends `THREE.MeshStandardMaterial` and accepts all the same props.

## Usage

<<< @/.vitepress/theme/components/MeshReflectionMaterialDemo.vue{3,16-19}

## Props

No props are required.

<CientosPropsTable
:fields="['name', 'description', 'default']"
:on-format-value="({value, fieldName, valueFormatted, getFieldFormatted}) => {
  if (fieldName === 'description') {
    const t = getFieldFormatted('type')
    return t ? t + value : value
  }
}"
component-path="src/core/materials/meshReflectionMaterial/index.vue" />
