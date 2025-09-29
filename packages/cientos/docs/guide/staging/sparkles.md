# Sparkles

<DocsDemo>
  <SparklesDemo />
</DocsDemo>

`<Sparkles />` makes sparkles on your geometry's vertices – optionally guided by a directional light.

## Usage

### Basic

<<< @/.vitepress/theme/components/SparklesDemo.vue{3,11}

### With TresDirectionalLight

By default, sparkles appear on the up-facing vertices. However, you can pass a directional light to the component. Moving the directional light will cause "lit" vertices to emit sparkles.

<DocsDemo>
  <SparklesDirectionalLightDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/SparklesDirectionalLightDemo.vue{6,19-24,27}

### Sequences

All props beginning with `:sequence-` are used to define how a particle changes as it progresses [(See also: Mixes)](#mixes). `:sequence-` props are of the type `Gradient<T>`, which can be any one of:

* `T`: a single value
* `[T, T, T, ...]`: an evenly distributed series of values
* `[[number, T], [number, T], ...]`: an unevently distributed series of values, where `number` is a gradient "stop" from `0` to `1`.

For example, all of these are acceptable values for `Gradient<TresColor>`:

* `'red'`
* `['red', 'blue', 'green']`
* `[[0.1, 'red'], [0.25, 'blue'], [0.5, 'green']]`

<DocsDemo>
  <SparklesSequenceDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/SparklesSequenceDemo.vue{12-16}

### Mixes

All props beginning with `:mix-` allow you to specify how a particle "progresses" through a corresponding `:sequence-` prop. E.g., `:mix-alpha` affects `:sequence-alpha`.

* If the `:mix-` prop is `0.0`, 'progress' through the `:sequence-` is determined entirely by the light shining on the surface of the sparkling mesh.[<sup>1</sup>](#precisely)
* If the `:mix-` prop is `1.0`, 'progress' through the `:sequence-` is determined entirely by the particle's lifetime.

<small><a id="precisely">1)</a> More precisely, the value is determined by the dot product of the `directionalLight`'s inverted normalized position and each of the sparkling mesh's vertex normals.</small>

<DocsDemo>
  <SparklesMixDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/SparklesMixDemo.vue{9-11,35-39}

## Props

<table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><strong>map</strong></td><td>Type: <code>Texture | string</code><br>Default: <code><span>'https://raw.githubusercontent.com/Tresjs/asset...</span></code><br><br>Texture or image path for individual sparkles<br>
</td></tr><tr><td><strong>geometry</strong></td><td>Type: <code>Object3D | BufferGeometry</code><br>Default: <code>undefined</code><br><br>Vertices of the geometry will be used to emit sparkles. Geometry normals are used for sparkles' traveling direction and for responding to the directional light prop.<br>
<ul>
<li>If provided, the component will use the passed geometry.</li>
<li>If no geometry is provided, the component will try to make a copy of the parent object's geometry.</li>
<li>If no parent geometry exists, the component will create and use an IcosphereGeometry.</li>
</ul>
</td></tr><tr><td><strong>directionalLight</strong></td><td>Type: <code>Object3D</code><br>Default: <code>undefined</code><br><br>Particles "light up" when their normal "faces" the light. If no <code>directionalLight</code> is provided, the default "up" vector will be used.<br>
</td></tr><tr><td><strong>lifetimeSec</strong></td><td>Type: <code>number</code><br>Default: <code>0.4</code><br><br>Particle lifetime in seconds<br>
</td></tr><tr><td><strong>cooldownSec</strong></td><td>Type: <code>number</code><br>Default: <code>2.0</code><br><br>Particle cooldown in seconds – time between lifetime end and respawn<br>
</td></tr><tr><td><strong>normalThreshold</strong></td><td>Type: <code>number</code><br>Default: <code>0.7</code><br><br>Number from 0-1 indicating how closely the particle needs to be faced towards the light to "light up". (Lower == more flexible)<br>
</td></tr><tr><td><strong>noiseScale</strong></td><td>Type: <code>number</code><br>Default: <code>3.0</code><br><br>Scale of the noise period (lower == more slowly cycling noise)<br>
</td></tr><tr><td><strong>scaleNoise</strong></td><td>Type: <code>number</code><br>Default: <code>1.0</code><br><br>Noise coefficient applied to particle scale<br>
</td></tr><tr><td><strong>offsetNoise</strong></td><td>Type: <code>number</code><br>Default: <code>0.1</code><br><br>Noise coefficient applied to particle offset<br>
</td></tr><tr><td><strong>lifetimeNoise</strong></td><td>Type: <code>number</code><br>Default: <code>0.0</code><br><br>Noise coefficient applied to particle lifetime<br>
</td></tr><tr><td><strong>size</strong></td><td>Type: <code>number</code><br>Default: <code>1.0</code><br><br>Particle scale multiplier<br>
</td></tr><tr><td><strong>alpha</strong></td><td>Type: <code>number</code><br>Default: <code>1.0</code><br><br>Opacity multiplier<br>
</td></tr><tr><td><strong>offset</strong></td><td>Type: <code>number</code><br>Default: <code>1.0</code><br><br>Offset multiplier<br>
</td></tr><tr><td><strong>surfaceDistance</strong></td><td>Type: <code>number</code><br>Default: <code>1.0</code><br><br>Surface distance multiplier<br>
</td></tr><tr><td><strong>sequenceColor</strong></td><td>Type: <code>Gradient&lt;TresColor&gt;</code><br>Default: <code>[[0.7, '#82dbc5'], [0.8, '#fbb03b']]</code><br><br>'<em>Sequence' props: specify how a particle changes as it "progresses". See also "mix</em>" props.<br>
Color sequence as particles progress<br>
</td></tr><tr><td><strong>sequenceAlpha</strong></td><td>Type: <code>Gradient&lt;number&gt;</code><br>Default: <code>[[0.0, 0.0], [0.10, 1.0], [0.5, 1.0], [0.9, 0.0]]</code><br><br>Opacity sequence as particles progress<br>
</td></tr><tr><td><strong>sequenceOffset</strong></td><td>Type: <code>Gradient&lt;[number, number, number]&gt;</code><br>Default: <code>[0.0, 0.0, 0.0]</code><br><br>Distance sequence as particles progress<br>
</td></tr><tr><td><strong>sequenceNoise</strong></td><td>Type: <code>Gradient&lt;[number, number, number]&gt;</code><br>Default: <code>[0.1, 0.1, 0.1]</code><br><br>Noise sequence as particles progress<br>
</td></tr><tr><td><strong>sequenceSize</strong></td><td>Type: <code>Gradient&lt;number&gt;</code><br>Default: <code>[0.0, 1.0]</code><br><br>Size sequence as particles progress<br>
</td></tr><tr><td><strong>sequenceSurfaceDistance</strong></td><td>Type: <code>Gradient&lt;number&gt;</code><br>Default: <code>[0.05, 0.08, 0.1]</code><br><br>Distance from surface (along normal) as particles progress<br>
</td></tr><tr><td><strong>mixColor</strong></td><td>Type: <code>number</code><br>Default: <code>0.5</code><br><br>'mix*' props: A particle "progresses" with a mix of two factors:<br>
<ul>
<li>its normal "facing" the directionalLight</li>
<li>its lifetime</li>
</ul>
'mix*' props specify the relationship between the two factors.<br>
How is a particle's progress for color calculated? (0: normal, 1: particle lifetime)<br>
</td></tr><tr><td><strong>mixAlpha</strong></td><td>Type: <code>number</code><br>Default: <code>1.</code><br><br>How is a particle's progress for alpha calculated? (0: normal, 1: particle lifetime)<br>
</td></tr><tr><td><strong>mixOffset</strong></td><td>Type: <code>number</code><br>Default: <code>1.</code><br><br>How is a particle's progress for offset calculated? (0: normal, 1: particle lifetime)<br>
</td></tr><tr><td><strong>mixSize</strong></td><td>Type: <code>number</code><br>Default: <code>0.</code><br><br>How is a particle's progress for size calculated? (0: normal, 1: particle lifetime)<br>
</td></tr><tr><td><strong>mixSurfaceDistance</strong></td><td>Type: <code>number</code><br>Default: <code>1.</code><br><br>How is a particle's progress for surface distance calculated? (0: normal, 1: particle lifetime)<br>
</td></tr><tr><td><strong>mixNoise</strong></td><td>Type: <code>number</code><br>Default: <code>1.</code><br><br>How is a particle's progress for lifetime calculated? (0: normal, 1: particle lifetime)<br>
</td></tr><tr><td><strong>blending</strong></td><td>Type: <code>Blending</code><br>Default: <code>AdditiveBlending</code><br><br>Material blending<br>
</td></tr><tr><td><strong>transparent</strong></td><td>Type: <code>boolean</code><br>Default: <code>true</code><br><br>Material transparency<br>
</td></tr><tr><td><strong>depthWrite</strong></td><td>Type: <code>boolean</code><br>Default: <code>false</code><br><br>Material depth write<br>
</td></tr></tbody></table>5-39
