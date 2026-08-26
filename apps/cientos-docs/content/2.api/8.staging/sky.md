---
title: Sky
description: Wrapper for the Three.js Sky add-on with sun position controls.
---

::SceneControlsWrapper
  ::StagingSky
  ::
::

`<Sky />` is a wrapper for the [Three.js `Sky` add-on](https://threejs.org/examples/?q=sky#webgl_shaders_sky).

## Props

| Name | Type | Description | Default | Required |
| :--- | :--- | :---------- | :------ | :------- |
| **turbidity** | `number` | Haziness | `3.4` | No |
| **rayleigh** | `number` | [Rayleigh scattering](https://en.wikipedia.org/wiki/Rayleigh_scattering) | `3` | No |
| **mieCoefficient** | `number` | [Mie scattering](https://en.wikipedia.org/wiki/Mie_scattering) amount | `0.005` | No |
| **mieDirectionalG** | `number` | [Mie scattering](https://en.wikipedia.org/wiki/Mie_scattering) direction | `0.7` | No |
| **elevation** | `number` | Sun's elevation from the horizon, in degrees | `0.6` | No |
| **azimuth** | `number` | Sun's [azimuth angle](https://en.wikipedia.org/wiki/Solar_azimuth_angle), in degrees – its horizontal coordinate on the horizon | `180` | No |
| **distance** | `number` | Sky box scale | `450000` | No |
