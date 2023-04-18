

## [2.0.0-beta.9](https://github.com/Tresjs/tres/compare/2.0.0-beta.8...2.0.0-beta.9) (2023-04-18)


### Bug Fixes

* incorrect implementation of disable render on canvas ([2442935](https://github.com/Tresjs/tres/commit/244293551663623fde0817e0a64676df12964257))

## [2.0.0-beta.8](https://github.com/Tresjs/tres/compare/2.0.0-beta.7...2.0.0-beta.8) (2023-04-17)


### Features

* add disable render prop for postprocessing ([b2fd557](https://github.com/Tresjs/tres/commit/b2fd557c33733e390e15d546a2b61ce504486902))

## [2.0.0-beta.7](https://github.com/Tresjs/tres/compare/2.0.0-beta.6...2.0.0-beta.7) (2023-04-15)


### Bug Fixes

* remove object assign for non primitive ([f9e0d4b](https://github.com/Tresjs/tres/commit/f9e0d4b8933235e133cf81a788861b8ee84e8e0e))

## [2.0.0-beta.6](https://github.com/Tresjs/tres/compare/2.0.0-beta.5...2.0.0-beta.6) (2023-04-15)

## [2.0.0-beta.5](https://github.com/Tresjs/tres/compare/2.0.0-beta.4...2.0.0-beta.5) (2023-04-14)


### Features

* **core:** fixed nodeOps remove test ([2706f48](https://github.com/Tresjs/tres/commit/2706f487aa4c2c2e447f45d7ed030f2a766ad593))
* **core:** fixed nodeOps remove test (this time correctly 😉) ([f5fca28](https://github.com/Tresjs/tres/commit/f5fca28a1cd8f625c210cf6536e39651caa9451a))
* **core:** made custom renderer determine whether materials and geometries should be disposed ([36c8cf5](https://github.com/Tresjs/tres/commit/36c8cf5ed01c525106a722a5cf963e189e16ce34))
* **core:** made custom renderer traverse the scene tree to dispose obsolete materials and geometries ([cae21b1](https://github.com/Tresjs/tres/commit/cae21b1aa31fefb85c2cce6cb43f999d42d433d2))
* first try concerning conditional rendering of components ([31bdd96](https://github.com/Tresjs/tres/commit/31bdd96443e980930e36a7410c8a96db589cf29a))
* primitive ([ab63e14](https://github.com/Tresjs/tres/commit/ab63e14018d44997906255256b7633abce02a8c1))


### Bug Fixes

* [@pointer-move](https://github.com/pointer-move) events ([b451862](https://github.com/Tresjs/tres/commit/b451862ebed7a404ebdb702e4706de61b940065a))
* correct casing of key names when pierced props ([b6a808f](https://github.com/Tresjs/tres/commit/b6a808f71685a1d29ccc8de9d6c36d19a8474742))

## [2.0.0-beta.4](https://github.com/Tresjs/tres/compare/2.0.0-beta.3...2.0.0-beta.4) (2023-04-06)


### Bug Fixes

* optional chaining on object pointer events ([421a7d5](https://github.com/Tresjs/tres/commit/421a7d54c045cabb3378035a3e90b0c85197ab90))

## [2.0.0-beta.3](https://github.com/Tresjs/tres/compare/2.0.0-beta.2...2.0.0-beta.3) (2023-04-06)


### Bug Fixes

* added default position and direction to camera if props are not passed ([63a340f](https://github.com/Tresjs/tres/commit/63a340f91ae709c6ffd3c4d793c6b91f51186eef))
* tres-canvas window-size now support 'true' string ([a63e33f](https://github.com/Tresjs/tres/commit/a63e33f28fc83654ffa7e895252fd1e05494c4b3))

## [2.0.0-beta.2](https://github.com/Tresjs/tres/compare/2.0.0-beta.1...2.0.0-beta.2) (2023-04-05)


### Bug Fixes

* move raycaster logic from nodeOps to TresCanvas ([d2200ae](https://github.com/Tresjs/tres/commit/d2200aee41e6a0fad90e4ddf11f0c8e7eadadbf4))
* raycaster events listener on canvas rather than windows ([bfe82b0](https://github.com/Tresjs/tres/commit/bfe82b052a1f898a1f85f243311b308330ab1fab))

## [2.0.0-beta.1](https://github.com/Tresjs/tres/compare/2.0.0-beta.0...2.0.0-beta.1) (2023-04-04)


### Features

* expose state from TresCanvas ([eeeff2e](https://github.com/Tresjs/tres/commit/eeeff2e4ba8b947e5b3f5f6a0e1683a07595b6d4))

## [2.0.0-beta.0](https://github.com/Tresjs/tres/compare/2.0.0-alpha.6...2.0.0-beta.0) (2023-04-04)


### Features

* cleanup of obsolete code ([f55ef36](https://github.com/Tresjs/tres/commit/f55ef3673e8b6e69666ebe9b3d0632f504b83537))
* **core:** performance improvement concerning raycaster ([#139](https://github.com/Tresjs/tres/issues/139)) ([597e917](https://github.com/Tresjs/tres/commit/597e9174bcab6d110de9a38bed1b3c7e04171a82))
* use tres provider and context ([46cdd00](https://github.com/Tresjs/tres/commit/46cdd001f6c9b84568781f135d417640041e269a))

## [2.0.0-alpha.6](https://github.com/Tresjs/tres/compare/2.0.0-alpha.5...2.0.0-alpha.6) (2023-03-30)

### Features

- add alphaMap to useTexture ([f66c363](https://github.com/Tresjs/tres/commit/f66c36394ae188cb380e8d793eb9ec429b5aa925))
- add matcap to useTexture ([ce374d6](https://github.com/Tresjs/tres/commit/ce374d6c93abf3ab4816c288419c9a30a1caa54e))
- adding warning when canvas parent height is 0px ([4224103](https://github.com/Tresjs/tres/commit/42241036f01299a969a0c49b2d8a24e77871010e))

### Bug Fixes

- removed key split on buffer geometry attributes ([a29cb2b](https://github.com/Tresjs/tres/commit/a29cb2bb908c3cfdccd81fb71b97f4ebe5c4ef59))

## [2.0.0-alpha.5](https://github.com/Tresjs/tres/compare/2.0.0-alpha.4...2.0.0-alpha.5) (2023-03-28)

### Features

- useSeek composable ([bd00001](https://github.com/Tresjs/tres/commit/bd00001948f963c955231a4a406889fa2f2a7051))

## [2.0.0-alpha.4](https://github.com/Tresjs/tres/compare/2.0.0-alpha.3...2.0.0-alpha.4) (2023-03-27)

### Bug Fixes

- removing resetState and going for more granular approach of disposal ([6f1e38b](https://github.com/Tresjs/tres/commit/6f1e38b3361a08d047b7c094285cfd67145502ad))
- reset state on unmounted ([dbbaee7](https://github.com/Tresjs/tres/commit/dbbaee748a51166cb1b03fecdc1a086772b4a437))

## [2.0.0-alpha.3](https://github.com/Tresjs/tres/compare/2.0.0-alpha.2...2.0.0-alpha.3) (2023-03-26)

### Bug Fixes

- ensure parent for nodeOps target when key is a function ([c07d963](https://github.com/Tresjs/tres/commit/c07d963bd50910f9df519db05ed7f1a496ff03cc))

## [2.0.0-alpha.2](https://github.com/Tresjs/tres/compare/2.0.0-alpha.1...2.0.0-alpha.2) (2023-03-23)

### Features

- buffergeometry setAttribute logic ([beee7b3](https://github.com/Tresjs/tres/commit/beee7b3d564e983e64b51bb4e97c6c357c6de89a))

## [2.0.0-alpha.1](https://github.com/Tresjs/tres/compare/2.0.0-alpha.0...2.0.0-alpha.1) (2023-03-22)

### Bug Fixes

- set scene to state ([1ead941](https://github.com/Tresjs/tres/commit/1ead941eda465a6a6a319a9172052285dd4c146d))

## [2.0.0-alpha.0](https://github.com/Tresjs/tres/compare/@tresjs/core@1.8.1...2.0.0-alpha.0) (2023-03-22)

### Features

- **cientos:** better typ support useEnvironment ([821b6a6](https://github.com/Tresjs/tres/commit/821b6a6b8eea0d9648e371b7b971461f0cb84d15))
- **cientos:** correctly typed Text3D ([61efbfb](https://github.com/Tresjs/tres/commit/61efbfbd08c6f1843c6ad8dd7d893cd287018ba0))
- **cientos:** orbit controls typed ([e38e699](https://github.com/Tresjs/tres/commit/e38e6996d5eb136bb9bf0a828547c2c9403aebd5))
- **cientos:** shapes types ([aa7361b](https://github.com/Tresjs/tres/commit/aa7361b8059d5582fc03710ccdde56b60243fe9b))
- **cientos:** typed usePamCameraMouse ([07609be](https://github.com/Tresjs/tres/commit/07609be5c8401fce5ab8cd4aa3d70c1e117160cc))
- **core:** adding composables to the solution ([9a3f8bb](https://github.com/Tresjs/tres/commit/9a3f8bb7461c253a175107c834f7eb50717602c9))
- **core:** auto generated tres component types ([7430d2c](https://github.com/Tresjs/tres/commit/7430d2c7583a14a71f591b02ccdbdd5835123595))
- **core:** cleaning up a little bit ([8bdd825](https://github.com/Tresjs/tres/commit/8bdd825d64617584d058866a176fb13d12aa9cc8))
- **core:** export useLogger ([4ad1a3e](https://github.com/Tresjs/tres/commit/4ad1a3efa84cd43d35688329749704a549fa7134))
- **core:** fixing black screen ([f4f198c](https://github.com/Tresjs/tres/commit/f4f198c9d04ab1a7fd22be2099c62e5ab8e2c461))
- **core:** function props and demos updated ([fa072cd](https://github.com/Tresjs/tres/commit/fa072cddc0fca4c1862a49fa2877d3ef5c96dbd2))
- **core:** nice warning for camera at [0,0,0] ([71eff1b](https://github.com/Tresjs/tres/commit/71eff1b5d0c6531a062b15790a315dad13a7ea18))
- **core:** provide inject worked again ([2390ec1](https://github.com/Tresjs/tres/commit/2390ec1a757d17bbf02418f1b45848dbbe694da7))
- **core:** re-structure and tres custom renderer base ([aad0953](https://github.com/Tresjs/tres/commit/aad0953c2d94004231366e20a82a73389f60c7ad))
- **core:** tres components typing auto generated ([6736b4c](https://github.com/Tresjs/tres/commit/6736b4c6598cf6ad058fac1882257ca337f0902e))
- **core:** types for TresCanvas ([42ee984](https://github.com/Tresjs/tres/commit/42ee984249ab528d15c1f2a33f950dc9aafbfa82))
- **core:** v-if working on custom renderer ([e19da3a](https://github.com/Tresjs/tres/commit/e19da3a52d428e8deb32e414df5cfa49db20cd01))
- createTres wrapper for mounting options ([d480b36](https://github.com/Tresjs/tres/commit/d480b364d4da76776515e6f9138e8f08f7d51e0f))

### Bug Fixes

- **cientos:** added default props to orbit controls ([68d8673](https://github.com/Tresjs/tres/commit/68d8673f0ce794d3d1e09905ead69e575e6e2f3c))
- **cientos:** cone props ([5f20368](https://github.com/Tresjs/tres/commit/5f2036859733ec864f1736bb3796a86193e9fb51))
- **cientos:** remove unused extend ([5d5b487](https://github.com/Tresjs/tres/commit/5d5b4870d9d3452c00cf4a0e4295a911950d07bd))
- **core:** added handleHMR update ([594ab73](https://github.com/Tresjs/tres/commit/594ab738f60c6d1d4e6a9ac0339bb8a3c0d44eb8))
- **core:** fixed type issues ([bd4be33](https://github.com/Tresjs/tres/commit/bd4be33ab77372307ef59b0ff3bc8989fb40151f))
- **core:** nodeOps no op ([9044c99](https://github.com/Tresjs/tres/commit/9044c99878f312c6e4c120e9eeee61ea675754e8))
- useTexture to show indentation for code snippet ([e983c5d](https://github.com/Tresjs/tres/commit/e983c5d945fe2d72083edf03cf08152fe517cbe9))