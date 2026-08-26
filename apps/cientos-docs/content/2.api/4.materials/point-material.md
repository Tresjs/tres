---
title: Point Material
description: Extends THREE.PointsMaterial to render points as dots rather than squares.
---

::SceneWrapper
  ::MaterialsPointMaterial
  ::
::

`<PointMaterial />` extends `THREE.PointsMaterial`. It renders the points as dots, rather than the default squares.

::prose-warning
N.B., stacking order and transparency of objects using THREE.PointsMaterial and by extension PointMaterial can be somewhat unintuitive, especially when combined with other on-screen objects. Please see discussions at threejs.org for more infomation.
::

## Props

All [`THREE.PointsMaterial` properties](https://threejs.org/docs/#api/en/materials/PointsMaterial) are inherited by `PointMaterial`.
