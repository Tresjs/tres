# Superformula

<DocsDemo>
  <SuperformulaLechesDemo />
</DocsDemo>

The `cientos` package provides a `<Superformula />` component that produces a configurable [3D plot of the superformula](https://en.wikipedia.org/wiki/Superformula).

## Usage
<DocsDemo>
  <SuperformulaDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/SuperformulaDemo.vue{3,8-13}

## Props

The `<Superformula />` 3D plot is the product of 2 2D superformulas, referred to as "A" and "B" in the props. See this [Wikipedia article about the superformula](https://en.wikipedia.org/wiki/Superformula) for more information about the function's arguments.

<table><thead><tr class="row-header"><th class="col-name">Name</th><th class="col-description">Description</th><th class="col-default">Default</th></tr></thead><tbody><tr class="row-width-segments"><td class="col-name"><strong><nobr>widthSegments</nobr></strong></td><td class="col-description">Number of horizontal mesh segments<br>
</td><td class="col-default"><code>32</code></td></tr><tr class="row-height-segments"><td class="col-name"><strong><nobr>heightSegments</nobr></strong></td><td class="col-description">Number of vertical mesh segments<br>
</td><td class="col-default"><code>32</code></td></tr><tr class="row-num-arms-a"><td class="col-name"><strong><nobr>numArmsA</nobr></strong></td><td class="col-description">For A, number of radial arms/ripples</td><td class="col-default"><code>4</code></td></tr><tr class="row-exp-a"><td class="col-name"><strong><nobr>expA</nobr></strong></td><td class="col-description">A's 3 exponents<br>
</td><td class="col-default"><code>[40,&nbsp;1.3,&nbsp;0.9]</code></td></tr><tr class="row-num-arms-b"><td class="col-name"><strong><nobr>numArmsB</nobr></strong></td><td class="col-description">For B, number of radial arms/ripples<br>
</td><td class="col-default"><code>4</code></td></tr><tr class="row-exp-b1"><td class="col-name"><strong><nobr>expB</nobr></strong></td><td class="col-description">B's 3 exponents<br>
</td><td class="col-default"><code>[40,&nbsp;1.3,&nbsp;0.9]</code></td></tr><tr class="row-color"><td class="col-name"><strong><nobr>color</nobr></strong></td><td class="col-description">If no material is provided, a color for the default material<br>
</td><td class="col-default"><code>'white'</code></td></tr></tbody></table>

## Slot

`<Superformula />` has a single slot for an optional material.
