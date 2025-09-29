# AnimatedSprite

<DocsDemo>
  <AnimatedSpriteDemo />
</DocsDemo>

`<AnimatedSprite />` displays 2D animations defined in a [texture atlas](https://en.wikipedia.org/wiki/Texture_atlas). A typical `<AnimatedSprite />` will use:

* an image containing multiple sprites
* a JSON atlas containing the individual sprite coordinates in the image

## Usage

<<< @/.vitepress/theme/components/AnimatedSpriteDemo.vue{3,12-20}

::: warning Suspense
`<AnimatedSprite />` loads resources asynchronously, so it must be wrapped in a `<Suspense />`.
:::

## Compiling an atlas

In typical usage, `<AnimatedSprite />` requires both the URL to a texture of compiled sprite images and a JSON atlas containing information about the sprites in the texture.

* [example compiled texture](https://raw.githubusercontent.com/Tresjs/assets/main/textures/animated-sprite/cientosTexture.png)
* [example JSON atlas](https://raw.githubusercontent.com/Tresjs/assets/main/textures/animated-sprite/cientosAtlas.json)

Compiling source images into a texture atlas is usually handled by third-party software. You may find [TexturePacker](https://www.codeandweb.com/texturepacker) useful.

## Without an atlas

There may be cases where you don't want to supply an atlas to the `atlas` prop. To do so:

* Compile your source images into a single image texture.
* Space each sprite into equally sized columns and rows in the compiled image texture.
* Ensure no extra padding has been added to the compiled image texture.
* Set the `atlas` prop to number of columns, number of rows as `[number, number]`.

## Spritesheets in the wild

::: warning
In the wild, spritesheets are often distributed without atlases and the images are often compiled by hand. It can be difficult or impossible to use these resources directly with `<AnimatedSprite />`. In many cases, it's advisable to recompile the spritesheet.
:::

### How to recompile an existing spritesheet image

* Cut individual sprites from the spritesheet and paste them into separate layers in an image editing application, e.g., GIMP.
* Align the layers for animation. Toggling layer visibility on/off will show you how the animation will display, frame to frame.
* Export layers as individual images.
* Name the individual images according to the following pattern: <br>`[animation name][frame number].[extension]` <br>E.g., walk000.png, walk001.png, idle000.png, idle001.png
* Compile individual images into an image texture and atlas using a texture packing application, like TexturePacker.

## Props

<table>
<thead>
<tr><th>Name</th><th>Description</th><th>Default</th></tr>
</thead>
<tbody>
<tr><td>image</td><td><code>string</code> –
  URL of the image texture or an image dataURL. This prop is not reactive.
</td><td></td></tr>
<tr><td>atlas</td><td><code>string | Atlasish</code> –
  <ul>
   <li>If <code>string</code>, the URL of the JSON atlas.</li>
   <li>If <code>number</code>, the number of columns in the texture.</li>
   <li>If <code>[number, number]</code>, the number of columns/rows in the texture.</li>
   <li>If <code>AtlasData</code>, the atlas as a JS object.</li>
  </ul>
  <p>This prop is not reactive.</p>
</td><td></td></tr>
<tr><td>definitions</td><td><code>Record&lt;string, string&gt;</code> – Specify playback frame order and repeated frames (delays). <code>definitions</code> is a record where keys are atlas animation names and values are strings containing an animation definition.<br />
  <p>A "animation definition" comma-separated string of frame numbers with optional parentheses-surrounded durations.</p>
   <p>Here is how various definition strings convert to arrays of frames for playback:</p>
  <ul>
  <li>"0,2,1" - [0,2,1], i.e., play frame 0, 2, then 1.</li>
  <li>"2(10)" - [2,2,2,2,2,2,2,2,2,2], i.e., play from 2 10 times.</li>
  <li>"1-4" - [1,2,3,4]</li>
  <li>"10-5(2)" - [10,10,9,9,8,8,7,7,6,6,5,5]</li>
  <li>"1-4(3),10(2)" - [1,1,1,2,2,2,3,3,3,4,4,4,10,10]</li>
  </ul>
</td><td></td></tr>
<tr><td>fps</td><td><code>number</code> – Desired frames per second of the animation.</td><td><code>30</code></td></tr>
<tr><td>loop</td><td><code>boolean</code> – Whether or not the animation should loop.</td><td><code>true</code></td></tr>
<tr><td>animation</td><td><code>string | [number, number] | number</code> – If <code>string</code>, name of the animation to play. If <code>[number, number]</code>, start and end frames of the animation. If <code>number</code>, frame number to display.</td><td><code>0</code></td></tr>
<tr><td>paused</td><td><code>boolean</code> – Whether the animation is paused.</td><td><code>false</code></td></tr>
<tr><td>reversed</td><td><code>boolean</code> – Whether to play the animation in reverse.</td><td><code>false</code></td></tr>
<tr><td>flipX</td><td><code>boolean</code> – Whether the sprite should be flipped, left to right.</td><td><code>false</code></td></tr>
<tr><td>resetOnEnd</td><td><code>boolean</code> – For a non-looping animation, when the animation ends, whether to display the zeroth frame.</td><td><code>false</code></td></tr>
<tr><td>asSprite</td><td><code>boolean</code> – Whether to display the object as a THREE.Sprite. <a href="https://threejs.org/docs/?q=sprite#api/en/objects/Sprite">See THREE.Sprite</a></td><td><code>true</code></td></tr>
<tr><td>center</td><td><code>TresVector2</code> – Anchor point of the object. A value of [0.5, 0.5] corresponds to the center. [0, 0] is left, bottom.</td><td><code>[0.5, 0.5]</code></td></tr>
<tr><td>alphaTest</td><td><code>number</code> – Alpha test value for the material. <a href="https://threejs.org/docs/#api/en/materials/Material.alphaTest">See THREE.Material.alphaTest</a></td><td><code>0.0</code></td></tr>
<tr><td>depthTest</td><td><code>boolean</code> – Depth test value for the material. <a href="https://threejs.org/docs/#api/en/materials/Material.depthTest">See THREE.Material.depthTest</a></td><td><code>true</code></td></tr>
<tr><td>depthWrite</td><td><code>boolean</code> – Depth write value for the material. <a href="https://threejs.org/docs/#api/en/materials/Material.depthWrite">See THREE.Material.depthWrite</a></td><td><code>true</code></td></tr>
</tbody>
</table>

## Events

| Event | Description | Argument |
| - | - | - |
| `frame` | Emitted when the displayed animation frame changes – at most once per tick, frames may be dropped | `string` – Name of the newly displayed frame |
| `end` | Emitted when the animation ends – `props.loop` must be set to `false` | `string` – Name of the ending frame |
| `loop` | Emitted when the animation loops – `props.loop` must be set to `true` | `string` – Name of the frame at the end of the loop |

## `animation`

The `:animation` prop holds either the name of the currently playing animation or a range of frames to play, or a frame number to display.

### Using named animations as `animation`

When individual files are converted to a spritesheet/atlas, typically the original images' filenames will be included in the atlas.

`<AnimatedSprite />` uses those filenames to automatically group images into animations.

Use either of the following naming conventions for your source images ...

* `[animation name][frame number].[file_extension]`
* `[animation name]_[frame number].[file_extension]`

... then `<AnimatedSprite />` will automatically make all `[animation name]` available for playback. Just pass `[animation name]` to the component's `:animation` prop.

#### Example

For our Cientos heart cartoon character animation, here's how the filenames map to animation names.

| Filenames | Animation name |
| - | - |
| cientosIdle0000.png, cientosIdle0001.png, ... | cientosIdle |
| cientosIdleToWalkTransition0000.png | cientosIdleToWalkTransition |
| cientosWalk0000.png, cientosWalk0001.png, ... | cientosWalk |

Try it out by clicking a few times on the character below:

<DocsDemo>
  <AnimatedSpriteNamedAnimationDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/AnimatedSpriteNamedAnimationDemo.vue

## `definitions`

You can supply an object to the `:definitions` prop. Any [named animation](#animation) can be a key. The value is a string that specifies frame order and delays.

### Demo

In this demo, the 'idle' animation is comprised of six different images. By default, those images will play sequentially when the `:animation` prop is `'idle'`.

But below, we've added a `:definitions` prop with this value for the `idle` key:

```
'0-5, 0(10), 1-2, 3(20), 4-5, 0-5(3)'
```

So, instead of playing images 0-5 sequentially, this animation will play instead:

* `0-5` – Play all six images (`0-5`) of the animation normally.
* `0(10), 1-2, 3(20), 4-5` – Play all six images again with a delay of ten frames at the bottom of the bounce (`0(10)`) and a delay of twenty frames at the top of the bounce (`3(20)`).
* `0-5(3)` – Finally, play all six images of the animation with a delay of three frames each.

<DocsDemo>
  <AnimatedSpriteDefinitionsDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/AnimatedSpriteDefinitionsDemo.vue{17-19}

## `center`

In addition to being the sprite's anchor point, the `:center` prop also controls how differently sized source images will "grow" and "shrink". Namely, they "grow out from" and "shrink towards" the center.

Below is a simple animation containing differently sized source images. The anchor is visible at world position `0, 0, 0`.

<DocsDemo>
  <AnimatedSpriteCenterDemo />
</DocsDemo>
