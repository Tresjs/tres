# Fit

<DocsDemo>
  <FitDemo />
</DocsDemo>

`<Fit />` uniformly scales and positions its children as a group. By default, it fits its children into a 1 × 1 × 1 box at the world origin.

Alternatively, the children can be fit into a `Box3` or an `Object3D`.

Or the children can simply be resized. With `<Fit />` the children are scaled relative to the center of their calculated bounding box.

## Usage

<<< @/.vitepress/theme/components/FitDemo.vue{3,20-27}

## Props

<table><thead><tr class="row-header"><th class="col-name">Name</th><th class="col-description">Description</th></tr></thead><tbody><tr class="row-into"><td class="col-name"><strong>into</strong></td><td class="col-description">If <code>into</code> is:
<ul>
<li>omitted or explicitly <code>undefined</code>: position/scale children to fit into a 1 × 1 × 1 <code>Box3</code> at world origin.</li>
<li><code>null</code>: turn off <code>&lt;Fit /&gt;</code>; reset scale/position of children.</li>
<li><code>number</code>: convert argument to <code>Vector3(number, number, number)</code>.</li>
<li><code>[number, number, number]</code>: convert argument to <code>Vector3</code>.</li>
<li><code>Vector3</code>: position/scale children to fit inside a <code>Box3</code> of size <code>Vector3</code> at target objects' cumulative center.</li>
<li><code>Box3</code>: position/scale children to fit inside <code>Box3</code>.</li>
<li><code>Object3D</code>: position/scale children to fit inside calculated <code>Box3</code>. <a href="https://threejs.org/docs/#api/en/math/Box3.setFromObject">See <code>THREE.Box3.setFromObject</code></a>. <code>&lt;Fit /&gt;</code> must not contain the <code>Object3D</code> and vice-versa.</li>
</ul>
<p>default:<br><code>new Box3(new Vector3(-0.5, -0.5, -0.5), new Vector3(0.5, 0.5, 0.5))</code></p></td></tr><tr class="row-precise"><td class="col-name"><strong>precise</strong></td><td class="col-description"><a href="https://threejs.org/docs/index.html?q=box3#api/en/math/Box3.setFromObject">See <code>precise</code> argument in <code>THREE.Box3.setFromObject</code></a><br>
<p>default:<br><code>false</code></p></td></tr></tbody></table>
