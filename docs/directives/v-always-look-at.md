# v-always-look-at 👀

With the new directive `v-always-look-at` provided by **TresJS**, you can add easily command an [Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) to always look at a specific position, this could be passed as a Vector3 or an Array.

## Usage

<DirectiveVAlwaysLookAtUsageCode />

No matter where the Box move will always look-at the position [0,0,0]

### Why not use the in built method look-at?

You could ask, this is fine but I can use the `:look-at` method directly in the component, why should I need this?

The answers is that with the method `:look-at` you will indicated to look at that position just once, when the instance is mounted, then if the object changes this will not get updated

### You can look at other instance too!

Another advantage is that you can look at an instance in movement, for example with the camera, like so:

<DirectiveVAlwaysLookAtExampleCode />
