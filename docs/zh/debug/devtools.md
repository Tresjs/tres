# 开发工具

开发人员在浏览器上创建 3D 体验时面临的最困难的事情之一就是调试。浏览器“画布”是一个黑匣子，很难知道里面发生了什么。[ThreeJS](https://threejs.org/) 的命令式特性使其难以调试，必须依赖 `console.log` 来查看发生了什么，或者依赖第三方来微调和检查场景。

别让我来检查你场景的性能。😱

![开发人员调试 3D](/debug-3D.png)

TresJS 的目标之一是在浏览器上处理 3D 场景时提供**最佳 DX（开发人员体验）**。由于生态系统的声明式特性以及 Vue 生态系统提供的各种解决方案，例如 Vue Devtools、Nuxt 和 Vite，我们可以为开发人员提供更好的工具来调试他们的场景。

## 介绍开发工具

从 <Badge text="^3.7.0" /> 开始，我们引入了 TresJS Devtools，这是 [官方 Vue Chrome Devtools](https://devtools.vuejs.org/guide/installation.html) 的一个自定义检查器选项卡，允许你检查你的 TresJS 场景和组件。

![TresJS Devtools](/vue-chrome-devtools.png)

### 特性

- **场景检查器**：使用类似于 Vue Devtools 组件检查器的树视图检查当前场景及其组件。
- **内存分配**：查看组件占用了多少内存。
- **对象检查器**：检查场景中选定对象及其子对象的属性。
- **可编辑属性**：是的，你可以编辑选定对象及其子对象的属性，并实时查看更改。

![](/devtools-scene-inspector.png)

尽情享受新的 Devtools，并告诉我们你的想法！🎉
