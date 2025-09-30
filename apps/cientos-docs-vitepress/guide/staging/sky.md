# Sky

<DocsDemo>
<SkyDemo />
</DocsDemo>

`<Sky />` is a wrapper for the [Three.js `Sky` add-on](https://threejs.org/examples/?q=sky#webgl_shaders_sky).

## Usage

<<< @/.vitepress/theme/components/SkyDemo.vue{3,9}

## Props

<table><thead><tr class="row-header"><th class="col-name">Name</th><th class="col-type">Type</th><th class="col-description">Description</th><th class="col-default">Default</th><th class="col-required">Required</th></tr></thead><tbody><tr class="row-turbidity"><td class="col-name"><strong>turbidity</strong></td><td class="col-type"><code>number</code></td><td class="col-description">Haziness<br>
</td><td class="col-default"><code>3.4</code></td><td class="col-required">No</td></tr><tr class="row-rayleigh"><td class="col-name"><strong>rayleigh</strong></td><td class="col-type"><code>number</code></td><td class="col-description"><a href="https://en.wikipedia.org/wiki/Rayleigh_scattering">Rayleigh scattering</a><br>
</td><td class="col-default"><code>3</code></td><td class="col-required">No</td></tr><tr class="row-mie-coefficient"><td class="col-name"><strong>mieCoefficient</strong></td><td class="col-type"><code>number</code></td><td class="col-description"><a href="https://en.wikipedia.org/wiki/Mie_scattering">Mie scattering</a> amount<br>
</td><td class="col-default"><code>0.005</code></td><td class="col-required">No</td></tr><tr class="row-mie-directional-g"><td class="col-name"><strong>mieDirectionalG</strong></td><td class="col-type"><code>number</code></td><td class="col-description"><a href="https://en.wikipedia.org/wiki/Mie_scattering">Mie scattering</a> direction<br>
</td><td class="col-default"><code>0.7</code></td><td class="col-required">No</td></tr><tr class="row-elevation"><td class="col-name"><strong>elevation</strong></td><td class="col-type"><code>number</code></td><td class="col-description">Sun's elevation from the horizon, in degrees<br>
</td><td class="col-default"><code>0.6</code></td><td class="col-required">No</td></tr><tr class="row-azimuth"><td class="col-name"><strong>azimuth</strong></td><td class="col-type"><code>number</code></td><td class="col-description">Sun's <a href="https://en.wikipedia.org/wiki/Solar_azimuth_angle">azimuth angle</a>, in degrees – its horizontal coordinate on the horizon<br>
</td><td class="col-default"><code>180</code></td><td class="col-required">No</td></tr><tr class="row-distance"><td class="col-name"><strong>distance</strong></td><td class="col-type"><code>number</code></td><td class="col-description">Sky box scale<br>
</td><td class="col-default"><code>450000</code></td><td class="col-required">No</td></tr></tbody></table>
