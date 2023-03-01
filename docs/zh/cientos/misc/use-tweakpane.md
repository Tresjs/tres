# useTweakPane

[TweakPane](https://cocopon.github.io/tweakpane/) 是一个用来创建动态修改属性值交互的 Javascript 库。它是一个很好的工具，用于微调参数和监控你的 three.js 应用程序上的值变化。

**TresJS** 提供 `useTweakPane` 组合式函数用于创建 Tweakpane 面板。默认情况下，面板会创建在画布的右上角，并包含一个 FPS 图形监视器，用于监控你的场景的性能。

::: info
您可以通过传递 selector 选项给 useTweakPane 函数来改变面板的容器。
:::

## 基础用法

```ts
import { useTweakPane } from "@tresjs/cientos";

const { pane } = useTweakPane();

const experiment = reactive({
  clearColor: "#000000",
  alpha: true,
  shadow: true,
});

pane.addInput(experiment, "clearColor", {
  label: "Clear Color",
  colorMode: "hex",
});

pane.addInput(experiment, "alpha");
```

最终效果:

![](/use-tweakpane.png)

## 选项

| Name         | Type     | Default     | Description                                                    |
| :----------- | -------- | ----------- | -------------------------------------------------------------- |
| **selector** | `string` | `undefined` | The selector of the container where the panel will be created. |
