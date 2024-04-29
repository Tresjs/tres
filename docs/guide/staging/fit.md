# Fit

<DocsDemo>
  <FitDemo />
</DocsDemo>

`<Fit />` uniformly scales and positions its children as a group. By default, it fits its children into a <nobr>1 × 1 × 1 box</nobr> at the world origin. 

Alternatively, the children can be fit into a `Box3` or an `Object3D`.

Or the children can simply be resized. With `<Fit />` the children are scaled relative to the center of their calculated bounding box.

## Usage

<<< @/.vitepress/theme/components/FitDemo.vue{3,20-27}

## Props

<CientosPropsTable :on-format-value="({valueFormatted, propName, fieldName, getFieldFormatted}) => {
  if (fieldName === 'description') {
    return valueFormatted + '<p>default:<br />' + getFieldFormatted('default') + '</p>'
  }
}" :fields="['name', 'description']" component-path="src/core/staging/Fit.vue" />