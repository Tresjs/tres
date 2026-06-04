---
title: You might not need post-processing
description: When to use post-processing and when a simpler approach wins.
---

Please note that you can use [TresJS's attach feature](https://docs.tresjs.org/advanced/attach.html#arrays) instead of this module. It enables you to utilize any effect provided by Three.js, even if there is no corresponding component in post-processing.

We recommend using post-processing because the props of the effects are reactive. The attach feature does not offer prop reactivity. However, if you do not require that advantage, it is a valid option to achieve equal results.
