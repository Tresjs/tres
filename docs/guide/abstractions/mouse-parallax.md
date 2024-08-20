# MouseParallax

<DocsDemo>
  <MouseParallaxDemo />
</DocsDemo>

`<MouseParallax />` is a component that allows you to easily create a [parallax](https://en.wikipedia.org/wiki/Parallax) effect. The camera will update automatically according to the mouse position.

## Usage

You only need to import it and add it to your template as `<MouseParallax />`. Additionally, you can pass the following props:

`factor` is a number to increase the movement range of the camera. This could be an array of two values corresponding to the x and y values, in that order: `:factor=[x,y]`.

`ease` is a number that smooths the movement. This could be an array of two values corresponding to the x and y values, in that order: `:ease=[x,y]`.

`local` is a boolean that enables movement based on the position of the mouse on the canvas rather than the window.

<<< @/.vitepress/theme/components/MouseParallaxDemo.vue{3,15-18}

## Props

| Prop         | Description                                                                 | Default |
| :----------- | :-------------------------------------------------------------------------- | ------- |
| **disabled** | Enable or disable the effect                                                | false   |
| **factor**   | Increase the range of the parallax                                          | 2.5     |
| **ease**     | Increase the camera movement speed                                          | 0.1     |
| **local**    | Whether the mouse coordinates are calculated from the element or the window | false   |
