

## [1.0.0-next.0](https://github.com/Tresjs/post-processing/compare/0.7.1...1.0.0-next.0) (2024-05-21)


### Features

* export useEffect composable ([#105](https://github.com/Tresjs/post-processing/issues/105)) ([b7810ba](https://github.com/Tresjs/post-processing/commit/b7810ba2864e70516c95b9866c2ea5d02a8f9b9d))
* render emit and advance playgroudn for render modes ([5d256fc](https://github.com/Tresjs/post-processing/commit/5d256fcc5e40582e0f87c8cc1ec46fbd9a007435))
* update to v4, `useLoop` and remove disable render ([544fb39](https://github.com/Tresjs/post-processing/commit/544fb39be3af7f71ddf994f14789215351cec569))

## [0.7.1](https://github.com/Tresjs/post-processing/compare/0.7.0...0.7.1) (2024-03-18)


### Bug Fixes

* expose effectComposer ([#83](https://github.com/Tresjs/post-processing/issues/83)) ([4878a95](https://github.com/Tresjs/post-processing/commit/4878a956f05ba8b19289062e4b77b6e3fc5ae40f))
* multisampling prop value ([#102](https://github.com/Tresjs/post-processing/issues/102)) ([dce70cc](https://github.com/Tresjs/post-processing/commit/dce70cc56bbcf6e4b379fa34293cdce280f3da5a))

## [0.7.0](https://github.com/Tresjs/post-processing/compare/0.6.0...0.7.0) (2023-11-14)


### Features

* vignette effect ([#75](https://github.com/Tresjs/post-processing/issues/75)) ([70c92da](https://github.com/Tresjs/post-processing/commit/70c92da58b8353f129d1bcc8f441bdd62a827f72))


### Bug Fixes

* avoid  recursive updates when resizing the window ([#81](https://github.com/Tresjs/post-processing/issues/81)) ([83f88c1](https://github.com/Tresjs/post-processing/commit/83f88c1ea5f35bc6a73a745ea805190fa065236b))

## [0.6.0](https://github.com/Tresjs/post-processing/compare/0.5.0...0.6.0) (2023-11-14)


### Features

* 66 noise ([#71](https://github.com/Tresjs/post-processing/issues/71)) ([cdb9497](https://github.com/Tresjs/post-processing/commit/cdb9497b964181bc8e7359aecdedc1b57042b5dc))

## [0.6.0-next.0](https://github.com/Tresjs/post-processing/compare/0.5.0...0.6.0-next.0) (2023-10-30)


### Features

* noise effect ([9f65ebf](https://github.com/Tresjs/post-processing/commit/9f65ebf8a74a08b2c95cfcee87270df515f9a563))

## [0.5.0](https://github.com/Tresjs/post-processing/compare/0.4.0...0.5.0) (2023-10-28)


### Features

* 50 similar linting rules throughout the tresjs packages ([#51](https://github.com/Tresjs/post-processing/issues/51)) ([1ea91b8](https://github.com/Tresjs/post-processing/commit/1ea91b825bde53b2ae62a08a1de0690af3ed690c))
* **post-processing:** depth of field effect ([#56](https://github.com/Tresjs/post-processing/issues/56)) ([9264231](https://github.com/Tresjs/post-processing/commit/9264231a1c668ba7f405eddf17dfd91c51bd74f8))
* **post-processing:** pixelation effect ([#68](https://github.com/Tresjs/post-processing/issues/68)) ([8e3e583](https://github.com/Tresjs/post-processing/commit/8e3e58345a650912dbbb09b800e5ce6a881cb06c))
* **post-processing:** refactor of existing effects ([#64](https://github.com/Tresjs/post-processing/issues/64)) ([a2afd3f](https://github.com/Tresjs/post-processing/commit/a2afd3f3d694c8ee737bec3eda3d601fad0e7205))


### Bug Fixes

* 58 postprocessing breaks on nuxt ([#69](https://github.com/Tresjs/post-processing/issues/69)) ([013b4a1](https://github.com/Tresjs/post-processing/commit/013b4a18fa43e169b520aad3c116146ec114daf2))
* **deps:** update dependency @tresjs/core to v3.2.0 ([#53](https://github.com/Tresjs/post-processing/issues/53)) ([4ec3156](https://github.com/Tresjs/post-processing/commit/4ec3156301bf3242cce3757f78bf24576bedbc64))

## [0.4.0](https://github.com/Tresjs/post-processing/compare/0.3.0...0.4.0) (2023-09-06)


### Features

* refactor usecore to new state context provider ([#44](https://github.com/Tresjs/post-processing/issues/44)) ([9f920f1](https://github.com/Tresjs/post-processing/commit/9f920f1c6f2b381ba4f29b53a3dbd4276b2e4b25))


### Bug Fixes

* **deps:** update dependency @tresjs/core to v2.4.0 ([#20](https://github.com/Tresjs/post-processing/issues/20)) ([5725498](https://github.com/Tresjs/post-processing/commit/5725498d7972e673c8f8c71ff9a5ca52a3648a97))
* **deps:** update dependency @tresjs/core to v3.1.1 ([#48](https://github.com/Tresjs/post-processing/issues/48)) ([09fc4f8](https://github.com/Tresjs/post-processing/commit/09fc4f884980ccecd7afd0a3dfb2e706cf35740b))
* made effect composer live only when canvas has an area ([#46](https://github.com/Tresjs/post-processing/issues/46)) ([7238cb3](https://github.com/Tresjs/post-processing/commit/7238cb3af3a0400a1dd03e4fd15682895771fc85))

## [0.3.0](https://github.com/Tresjs/post-processing/compare/0.2.1...0.3.0) (2023-06-26)


### Features

* 23 refactor effects to vue files ([#28](https://github.com/Tresjs/post-processing/issues/28)) ([a84149b](https://github.com/Tresjs/post-processing/commit/a84149b1dad55b8421ede86920183ad428c9ee90))


### Bug Fixes

* compute localCamera ([#31](https://github.com/Tresjs/post-processing/issues/31)) ([bff26d7](https://github.com/Tresjs/post-processing/commit/bff26d7458b36362dc936cc6303c491f779de4d2))

### [0.2.1](https://github.com/Tresjs/post-processing/compare/0.2.0...0.2.1) (2023-06-19)


### Bug Fixes

* updated `@tresjs/core` to `v2.2.0` ([#27](https://github.com/Tresjs/post-processing/issues/27)) ([ae6f464](https://github.com/Tresjs/post-processing/commit/ae6f4648949928cb1fffe17f5cbfc1d37c671341))

## [0.2.0](https://github.com/Tresjs/post-processing/compare/0.1.0...0.2.0) (2023-06-11)


### Features

* better disposal of effects ([5ceef70](https://github.com/Tresjs/post-processing/commit/5ceef7040569933b7df640db18987d42412f2132))
* bloom effect done right ([95fd5a6](https://github.com/Tresjs/post-processing/commit/95fd5a62cda5367e4bd15003d5b437b6531399c9))
* effect composer sfc ([5fa7671](https://github.com/Tresjs/post-processing/commit/5fa76715aef1fa496e25cecd32313c4bd8cb2493))
* export types esm first ([594948f](https://github.com/Tresjs/post-processing/commit/594948fb1962ccded1277569364071b7a2765948))
* glitch looking good ([455fe56](https://github.com/Tresjs/post-processing/commit/455fe56085626f119faa9c7ffd742182c60af130))
* outline sfc component ([b4fb2ca](https://github.com/Tresjs/post-processing/commit/b4fb2ca18f0cfe1b40d0b81f46afb11039a02428))


### Bug Fixes

* **deps:** update dependency @tresjs/cientos to v2.1.0 ([ca9cc61](https://github.com/Tresjs/post-processing/commit/ca9cc617ddefad2ee055f8b45f609fa3e5fc6ef0))
* **deps:** update dependency @tresjs/cientos to v2.1.2 ([f1ced0e](https://github.com/Tresjs/post-processing/commit/f1ced0e4b8b2ff20c05ffb2bec8e7f0c11667539))
* **post-processing:** made playground runnable ([03af258](https://github.com/Tresjs/post-processing/commit/03af2584d3735caced3984f84ef3d7279806d245))
* type assetion on Bloom effect ([78af757](https://github.com/Tresjs/post-processing/commit/78af757c04d932fcd589fa01810883bd8d3e2c17))
