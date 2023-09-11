

## [3.2.1-next.2](https://github.com/Tresjs/tres/compare/3.2.1-next.1...3.2.1-next.2) (2023-09-11)


### Bug Fixes

* explicitely set app context app ([c2a758f](https://github.com/Tresjs/tres/commit/c2a758f4c63641897db7b7065fed8286a699c20e))

## [3.2.1-next.1](https://github.com/Tresjs/tres/compare/3.2.1-next.0...3.2.1-next.1) (2023-09-11)


### Bug Fixes

* object assign approach for inner app context ([3a6dc31](https://github.com/Tresjs/tres/commit/3a6dc317c39cba6b2ebcdcf372eb8ccd6676ef2e))

## [3.2.1-next.0](https://github.com/Tresjs/tres/compare/3.2.0...3.2.1-next.0) (2023-09-11)


### Bug Fixes

* proxy app context ([128e3a5](https://github.com/Tresjs/tres/commit/128e3a5eb7af9c3d9b76f67e4afb19d6d0f550b0))

## [3.2.0](https://github.com/Tresjs/tres/compare/3.1.1...3.2.0) (2023-09-06)


### Features

* objects blocking pointer event ([#388](https://github.com/Tresjs/tres/issues/388)) ([03ab2e1](https://github.com/Tresjs/tres/commit/03ab2e1ea737f0fa9ac2b2ca421335126fd077d4))
* renamed useCamera composable methods to prevent confusion ([#380](https://github.com/Tresjs/tres/issues/380)) ([58feabd](https://github.com/Tresjs/tres/commit/58feabd1f220a779d1e85f9f75ee453e767848ad))


### Bug Fixes

* removed boolean prop defaults from TresCanvas ([#384](https://github.com/Tresjs/tres/issues/384)) ([bb5fca5](https://github.com/Tresjs/tres/commit/bb5fca5508b1ee1e742c44bc3bf42159a815bfa1))

## [3.1.1](https://github.com/Tresjs/tres/compare/3.1.0...3.1.1) (2023-08-26)


### Bug Fixes

* removing z-index from canvas ([#382](https://github.com/Tresjs/tres/issues/382)) ([ac096f7](https://github.com/Tresjs/tres/commit/ac096f7de31ac5714aaa168a3fd01e311a724dbe))

## [3.1.0](https://github.com/Tresjs/tres/compare/3.0.1...3.1.0) (2023-08-23)


### Features

* use render instead of createApp ([#375](https://github.com/Tresjs/tres/issues/375)) ([9461a78](https://github.com/Tresjs/tres/commit/9461a78b1cb8082311765b5ef309e436da770012))


### Bug Fixes

* added logic on pathProps to re-instance nodes once `args` change ([#367](https://github.com/Tresjs/tres/issues/367)) ([453b031](https://github.com/Tresjs/tres/commit/453b031b258ab840af7d6b372ac3785b5f006851))
* added revision version to apply useLegacyLights only if neccesary ([#373](https://github.com/Tresjs/tres/issues/373)) ([dee4b97](https://github.com/Tresjs/tres/commit/dee4b97faf906b8796dffa9f32369230f5bc417d))
* args should be empty when args was falsy ([#369](https://github.com/Tresjs/tres/issues/369)) ([81b7914](https://github.com/Tresjs/tres/commit/81b7914fc685aa7314541480a96801c0cc7fd542))
* instances re-instancing when not needed ([#374](https://github.com/Tresjs/tres/issues/374)) ([f2ae46b](https://github.com/Tresjs/tres/commit/f2ae46bebd7aa9a99961259dbc1db5ae6cf876dd))

### [3.0.1](https://github.com/Tresjs/tres/compare/3.0.0...3.0.1) (2023-07-29)


### Bug Fixes

* added controls and extend to state context ([#355](https://github.com/Tresjs/tres/issues/355)) ([c2540a5](https://github.com/Tresjs/tres/commit/c2540a55064098b5c7b145a9e785e370b78c4d23))

## [3.0.0](https://github.com/Tresjs/tres/compare/2.4.2...3.0.0) (2023-07-29)


### ⚠ BREAKING CHANGES

* UseTres is now useTresContext. Instead of using a store like in v2, we now use a context provider based on `provide/inject`.

### Features

* 331 new context for state ([#333](https://github.com/Tresjs/tres/issues/333)) ([0e66f43](https://github.com/Tresjs/tres/commit/0e66f43712d42370bd30ae0bdbe4d9b3a5d0f0ec)), closes [#340](https://github.com/Tresjs/tres/issues/340)


### Documentation

* explain state breaking changes ([4757da9](https://github.com/Tresjs/tres/commit/4757da981cd845c5a71b0d6f07c1d174855cc859))

### [2.4.2](https://github.com/Tresjs/tres/compare/2.4.1...2.4.2) (2023-07-14)


### Bug Fixes

* add raycaster to state ([#347](https://github.com/Tresjs/tres/issues/347)) ([c45d4c3](https://github.com/Tresjs/tres/commit/c45d4c32d12cba14c43588804458c40d81bcc055))

### [2.4.1](https://github.com/Tresjs/tres/compare/2.4.0...2.4.1) (2023-07-13)


### Bug Fixes

* add app context to state ([#346](https://github.com/Tresjs/tres/issues/346)) ([197f258](https://github.com/Tresjs/tres/commit/197f258f1bba39b057d3936ff53fee01c18388ab))
* change internal Scene component name to force rendering ([#330](https://github.com/Tresjs/tres/issues/330)) ([780743c](https://github.com/Tresjs/tres/commit/780743c62f421677b61f6c9ef9ef3feacd4b37f9))
* fake a `VNodeRef` on types to accept strings and null ([#344](https://github.com/Tresjs/tres/issues/344)) ([c069f64](https://github.com/Tresjs/tres/commit/c069f6423d4abf1a55d87d32ea121cb1752e5b58))
* prop types on TresCanvas ([#326](https://github.com/Tresjs/tres/issues/326)) ([309584a](https://github.com/Tresjs/tres/commit/309584a5431b63a63fe541a11a1347de54359dac))

## [2.4.0](https://github.com/Tresjs/tres/compare/2.3.0...2.4.0) (2023-06-28)


### Features

* export vue compiler options for Tres custom renderer ([#324](https://github.com/Tresjs/tres/issues/324)) ([66716d5](https://github.com/Tresjs/tres/commit/66716d523f1ee80b22bb5ee8da95eb1d8235714c))


### Bug Fixes

* temporaly cast the `disableRender` prop ([#322](https://github.com/Tresjs/tres/issues/322)) ([9cc63d2](https://github.com/Tresjs/tres/commit/9cc63d2af51f83dad7fe2af70ca8fdc4c0decebb))

## [2.3.0](https://github.com/Tresjs/tres/compare/2.2.0...2.3.0) (2023-06-22)


### Features

* export utility functions ([#315](https://github.com/Tresjs/tres/issues/315)) ([7580c77](https://github.com/Tresjs/tres/commit/7580c774820ee99b2ebfbdbf274fe6c164b35097))

## [2.2.0](https://github.com/Tresjs/tres/compare/2.1.3...2.2.0) (2023-06-19)


### Features

* removed `useCamera` logic from nodeOps ([#308](https://github.com/Tresjs/tres/issues/308)) ([e9509ba](https://github.com/Tresjs/tres/commit/e9509bab177a7a23f802ad2716f42d1f36f7654b))


### Bug Fixes

* banner image link ([b793c77](https://github.com/Tresjs/tres/commit/b793c77a2b456ddac0fdd4cf18ad4d94f19db439))
* main button colors ([3aab827](https://github.com/Tresjs/tres/commit/3aab8273dace80ba6e5ee210b0e17f0b8bc61449))
* raycaster does not work properly when scene is not in full screen ([#304](https://github.com/Tresjs/tres/issues/304)) ([20a5b9e](https://github.com/Tresjs/tres/commit/20a5b9eee94755ca58ff4936aef20a070f920a7e))

### [2.1.3](https://github.com/Tresjs/tres/compare/2.1.2...2.1.3) (2023-06-14)


### Bug Fixes

* **deps:** update dependency @alvarosabu/utils to v3 ([97a9950](https://github.com/Tresjs/tres/commit/97a9950833f70fde84541ab106cc714aa3c6ad5f))
* **deps:** update dependency @tresjs/cientos to v2.1.3 ([cae506d](https://github.com/Tresjs/tres/commit/cae506df15115adbbbd099b6b8cecd422b59ab42))
* extend `GlobalComponents` rather than replacing ([70b3717](https://github.com/Tresjs/tres/commit/70b3717bec561819c248d99fe51d4cf41198151c))
* message canvas 0 height false positives ([bdfbdfe](https://github.com/Tresjs/tres/commit/bdfbdfeb744f7d0920cbaa87a4016a8d5e237a97))

### [2.1.2](https://github.com/Tresjs/tres/compare/2.1.1...2.1.2) (2023-05-26)


### Bug Fixes

* added scene fallback as parent for controls ([e986f9c](https://github.com/Tresjs/tres/commit/e986f9ca2e760c34a6d92a089b8c343b4f11fc66))

### [2.1.1](https://github.com/Tresjs/tres/compare/2.1.0...2.1.1) (2023-05-22)

## [2.1.0](https://github.com/Tresjs/tres/compare/2.0.0...2.1.0) (2023-05-22)


### Features

* mighty sexy runtime types ([97a5b64](https://github.com/Tresjs/tres/commit/97a5b64f39f5dfa46bb15823a23aa9d5ebe0b339))


### Bug Fixes

* docs dev and build ([7106cf9](https://github.com/Tresjs/tres/commit/7106cf93ed1426f897a40aa881d73a2a6efeb4ae))
* package exports ([7c9e41a](https://github.com/Tresjs/tres/commit/7c9e41af0decd4cfd51accf992a6486de9a856ec))
* package exports types ([6fa3e09](https://github.com/Tresjs/tres/commit/6fa3e09882064f0fc19874c24141402d6bff5ce2))
* pnpm workspace structure ([e8300d6](https://github.com/Tresjs/tres/commit/e8300d61b3059a926693e62b60a11b363cf50365))
* re-mount custom renderer manually on HMR ([029542e](https://github.com/Tresjs/tres/commit/029542e851ea7da9696cd294877813da838bc5fc))

## [2.0.0](https://github.com/Tresjs/tres/compare/2.0.0-rc.4...2.0.0) (2023-05-12)

## [2.0.0-rc.4](https://github.com/Tresjs/tres/compare/2.0.0-rc.3...2.0.0-rc.4) (2023-05-09)


### Bug Fixes

* only set default camera settings to first camera ([7f1e7cd](https://github.com/Tresjs/tres/commit/7f1e7cdf4652b2212340a1d975bd5b9ca3e31e8a))

## [2.0.0-rc.3](https://github.com/Tresjs/tres/compare/2.0.0-rc.2...2.0.0-rc.3) (2023-05-09)


### Bug Fixes

* akwardly added fog and fixed also typing ([e256768](https://github.com/Tresjs/tres/commit/e2567681c678089463437723d6a505ac630f2849))
* colorspace types ([27e10e9](https://github.com/Tresjs/tres/commit/27e10e9c15658f4c1f338562b5ad078f4107e5dd))
* disabling pushing more than one camera on nodeOpts ([57a07bf](https://github.com/Tresjs/tres/commit/57a07bf75a1df54fe5cb2f06cad8159234c384aa))

## [2.0.0-rc.2](https://github.com/Tresjs/tres/compare/2.0.0-rc.1...2.0.0-rc.2) (2023-05-03)


### Bug Fixes

* updated breaking changes of three v152 color maangement ([1e47a5f](https://github.com/Tresjs/tres/commit/1e47a5fbdb14e54599f3e3e2e989f57895ab19f9))

## [2.0.0-rc.1](https://github.com/Tresjs/tres/compare/2.0.0-rc.0...2.0.0-rc.1) (2023-05-03)

## [2.0.0-rc.0](https://github.com/Tresjs/tres/compare/2.0.0-beta.13...2.0.0-rc.0) (2023-05-03)

## [2.0.0-beta.13](https://github.com/Tresjs/tres/compare/2.0.0-beta.12...2.0.0-beta.13) (2023-04-27)


### Features

* add manual camera prop to canvas ([588a3fc](https://github.com/Tresjs/tres/commit/588a3fcddd1557390003bfd0cd5d63db2536fdd7))

## [2.0.0-beta.12](https://github.com/Tresjs/tres/compare/2.0.0-beta.11...2.0.0-beta.12) (2023-04-25)


### Bug Fixes

* avoid assigning args as BufferAttribute to BufferGeometry ([1cc67b0](https://github.com/Tresjs/tres/commit/1cc67b08c1f1d2a2f3a4623a15dd69ecf3e3663a))
* **deps:** update dependency three to ^0.151.0 ([6f0e80c](https://github.com/Tresjs/tres/commit/6f0e80cf3ada806ff551f629b1fbee67532d55ce))

## [2.0.0-beta.11](https://github.com/Tresjs/tres/compare/2.0.0-beta.10...2.0.0-beta.11) (2023-04-20)


### Bug Fixes

* optional chaining on insert vnodes ([c2dcf52](https://github.com/Tresjs/tres/commit/c2dcf52c5e30a22953755a96d8bddbd955c5a1d8))


### Reverts

* Revert "edit getting-started.md" ([fcc6900](https://github.com/Tresjs/tres/commit/fcc690003654ff4ed9af836e8657de25cecda2be))

## [2.0.0-beta.10](https://github.com/Tresjs/tres/compare/2.0.0-beta.9...2.0.0-beta.10) (2023-04-19)


### Bug Fixes

* **core:** fixed [#209](https://github.com/Tresjs/tres/issues/209) ([9648935](https://github.com/Tresjs/tres/commit/9648935d23e68363071cb543a7876b9a23c512fe))

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