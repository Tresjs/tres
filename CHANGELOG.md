

## [4.2.4](https://github.com/Tresjs/tres/compare/4.2.3...4.2.4) (2024-08-01)


### Bug Fixes

* typescript issues ([#794](https://github.com/Tresjs/tres/issues/794)) ([eecf608](https://github.com/Tresjs/tres/commit/eecf608ad1bfb7d4cbe64cf275a356a8dd383b73))

## [4.2.3](https://github.com/Tresjs/tres/compare/4.2.2...4.2.3) (2024-07-26)


### Bug Fixes

* 792 directionallighthelpers breaks devtools ([#793](https://github.com/Tresjs/tres/issues/793)) ([426acee](https://github.com/Tresjs/tres/commit/426acee27e7fd62abf3803280c48e327597b1e94)), closes [#533](https://github.com/Tresjs/tres/issues/533)

## [4.2.2](https://github.com/Tresjs/tres/compare/4.2.1...4.2.2) (2024-07-24)


### Bug Fixes

* remove on demand invalidation warning ([#788](https://github.com/Tresjs/tres/issues/788)) ([eab74e6](https://github.com/Tresjs/tres/commit/eab74e6d0c8feb16ea18b2f096c87c7e3dbb1848))

## [4.2.1](https://github.com/Tresjs/tres/compare/4.2.0...4.2.1) (2024-07-17)


### Bug Fixes

* **types:** `useLoader` generics ([#781](https://github.com/Tresjs/tres/issues/781)) ([b51d679](https://github.com/Tresjs/tres/commit/b51d6792372922904cd9225c2ea2e5dfce6f68f8))

## [4.2.0](https://github.com/Tresjs/tres/compare/4.1.0...4.2.0) (2024-07-14)


### Features

* (devtools) add userData to inspectable properties ([#740](https://github.com/Tresjs/tres/issues/740)) ([00bef33](https://github.com/Tresjs/tres/commit/00bef337f189b04ee3b77a4ce0afea63ce2973b2))
* **TresCanvas:** add dpr prop ([#768](https://github.com/Tresjs/tres/issues/768)) ([8943cc3](https://github.com/Tresjs/tres/commit/8943cc3dac1571e4bc15fb75ad106908b109de43))


### Bug Fixes

* attach detach ([#749](https://github.com/Tresjs/tres/issues/749)) ([8c1c668](https://github.com/Tresjs/tres/commit/8c1c66827cf39dca1206bfbf0fe3549e03ad9608))
* localstate for objects with events and manual register/unregister from nodeOps using ctx ([#767](https://github.com/Tresjs/tres/issues/767)) ([9a53e60](https://github.com/Tresjs/tres/commit/9a53e60bfb915492952399522d6c2d6a0ac7ed59))
* **primitive:** implement as proxy to avoid breaking references  ([#764](https://github.com/Tresjs/tres/issues/764)) ([f637bf3](https://github.com/Tresjs/tres/commit/f637bf35373c4ba60f14b3464ede9427be8b8b58))

## [4.1.0](https://github.com/Tresjs/tres/compare/4.0.2...4.1.0) (2024-07-05)


### Features

* add useTresReady ([#712](https://github.com/Tresjs/tres/issues/712)) ([15e3f07](https://github.com/Tresjs/tres/commit/15e3f0785e843df7a68e095c8ec35d8752623a05))


### Bug Fixes

* **deps:** update dependency @vueuse/core to v10.10.1 ([#735](https://github.com/Tresjs/tres/issues/735)) ([12e462d](https://github.com/Tresjs/tres/commit/12e462d2abb0205e416cadd5f9eab50afd501fd3))
* group should recursive search for child elements ([#728](https://github.com/Tresjs/tres/issues/728)) ([#731](https://github.com/Tresjs/tres/issues/731)) ([f09367b](https://github.com/Tresjs/tres/commit/f09367b47b59c9b60eaafa318023187111ddb786))

## [4.0.2](https://github.com/Tresjs/tres/compare/4.0.1...4.0.2) (2024-06-05)


### Bug Fixes

* implement createComment and nextSibling node operations so that objects being v-if'd are not lost by Vue's runtime and incorrectly placed in the scene root ([814d678](https://github.com/Tresjs/tres/commit/814d678b62f7d9b4ed11149aaf56a45ea5c04dad))
* intersect only objects with events registered. ([#714](https://github.com/Tresjs/tres/issues/714)) ([b320524](https://github.com/Tresjs/tres/commit/b3205245e3d0b9ceda7cd356bced004358b58856))
* propogate events over previous intersections on pointerLeave and pointerOut ([66264fc](https://github.com/Tresjs/tres/commit/66264fc49cd21bbde7288256409ec5a688309946))

## [4.0.1](https://github.com/Tresjs/tres/compare/4.0.0...4.0.1) (2024-06-01)


### Bug Fixes

* augmenting types for tres components for the nuxt module ([#710](https://github.com/Tresjs/tres/issues/710)) ([c8a5b0d](https://github.com/Tresjs/tres/commit/c8a5b0dcf8ebd6bf4284126042e8a44eae3ca307))

## [4.0.0](https://github.com/Tresjs/tres/compare/3.9.0...4.0.0) (2024-05-30)


### Features

* release v4 ([#490](https://github.com/Tresjs/tres/issues/490)) ([1ba17ee](https://github.com/Tresjs/tres/commit/1ba17ee43c6954396118bd8298436af3e2a70510)), closes [#479](https://github.com/Tresjs/tres/issues/479) [#488](https://github.com/Tresjs/tres/issues/488) [#491](https://github.com/Tresjs/tres/issues/491) [#497](https://github.com/Tresjs/tres/issues/497) [#499](https://github.com/Tresjs/tres/issues/499) [#498](https://github.com/Tresjs/tres/issues/498) [#522](https://github.com/Tresjs/tres/issues/522) [#514](https://github.com/Tresjs/tres/issues/514) [#579](https://github.com/Tresjs/tres/issues/579) [#602](https://github.com/Tresjs/tres/issues/602) [#601](https://github.com/Tresjs/tres/issues/601) [#608](https://github.com/Tresjs/tres/issues/608) [#614](https://github.com/Tresjs/tres/issues/614) [#529](https://github.com/Tresjs/tres/issues/529)

## [4.0.0-rc.2](https://github.com/Tresjs/tres/compare/4.0.0-rc.1...4.0.0-rc.2) (2024-05-24)


### Bug Fixes

* 686 useloop callback state missing controls ([#687](https://github.com/Tresjs/tres/issues/687)) ([a41f532](https://github.com/Tresjs/tres/commit/a41f532b0c8d717e4bc3ec11fa73bd58df871fa8))
* manual rendering blank ([#685](https://github.com/Tresjs/tres/issues/685)) ([0720d18](https://github.com/Tresjs/tres/commit/0720d186e92ca9faa9e5f4e51a3269504bed2a09))

## [4.0.0-rc.1](https://github.com/Tresjs/tres/compare/4.0.0-rc.0...4.0.0-rc.1) (2024-05-15)


### Features

* 633 use loop  ([#673](https://github.com/Tresjs/tres/issues/673)) ([1b2fa70](https://github.com/Tresjs/tres/commit/1b2fa70e9999eb64395b3e7e9f2489ceab035a7a))


### Bug Fixes

* make on* callbacks settable ([#672](https://github.com/Tresjs/tres/issues/672)) ([ac152df](https://github.com/Tresjs/tres/commit/ac152dfa91c6ba347cbe0566fb4afbe19f50dd2b))
* **utils:** reorder object disposal to avoid issue with Helper `dispose` methods ([#683](https://github.com/Tresjs/tres/issues/683)) ([e5a2cef](https://github.com/Tresjs/tres/commit/e5a2cef0e450196abaa6d18380a5aadbc9cd057d))

## [4.0.0-rc.0](https://github.com/Tresjs/tres/compare/3.9.0...4.0.0-rc.0) (2024-04-25)


### ⚠ BREAKING CHANGES

* **events:** pointerevents manager and state (#529)

### Features

* 499 better memory management ([#606](https://github.com/Tresjs/tres/issues/606)) ([e98ca6d](https://github.com/Tresjs/tres/commit/e98ca6dea15973b3a00e4b485199d9906eb772eb))
* devtools renderer improvements ([#614](https://github.com/Tresjs/tres/issues/614)) ([cdf6b6f](https://github.com/Tresjs/tres/commit/cdf6b6fefbd58dbf1dfbe396f219ac6f7c6fc92d))
* **events:** pointerevents manager and state ([#529](https://github.com/Tresjs/tres/issues/529)) ([b536ab1](https://github.com/Tresjs/tres/commit/b536ab19d1f4082c2db926e24d8c52f92949964b))


### Bug Fixes

* do not change pierced props case ([#608](https://github.com/Tresjs/tres/issues/608)) ([906f2e1](https://github.com/Tresjs/tres/commit/906f2e157aab7aa6daef5682c3282cf6e84fa891))

## [4.0.0-next.2](https://github.com/Tresjs/tres/compare/3.9.0...4.0.0-rc.0) (2024-03-27)


### Bug Fixes

* refactor nodeOps to return methods at the end of the function ([#602](https://github.com/Tresjs/tres/issues/602)) ([cd0c3bc](https://github.com/Tresjs/tres/commit/cd0c3bcd891f019cf91f30e5fdd547630332a065))

## [4.0.0-next.1](https://github.com/Tresjs/tres/compare/3.9.0...4.0.0-rc.0) (2024-03-18)


### Features

* 140 on demand rendering ([#497](https://github.com/Tresjs/tres/issues/497)) ([f688c64](https://github.com/Tresjs/tres/commit/f688c6447be887c4675a57ecabb5182d8b7d02cf))
* 492 set tone mapping default to acesfilmictonemapping ([#498](https://github.com/Tresjs/tres/issues/498)) ([c4547f9](https://github.com/Tresjs/tres/commit/c4547f92615a43b7b56b34c0e1ee9f4b78a2230b))
* 503 conditional rendering of primitives ([#514](https://github.com/Tresjs/tres/issues/514)) ([79d8a76](https://github.com/Tresjs/tres/commit/79d8a762da6b6e23771a20314f7902eff4635acf))
* 516 localstate for custom renderer node instances instead of userdata ([#522](https://github.com/Tresjs/tres/issues/522)) ([08717ef](https://github.com/Tresjs/tres/commit/08717efd0f631c085340b1fea4eb6c154c63608b))
* remove default camera warning ([#499](https://github.com/Tresjs/tres/issues/499)) ([8bbafde](https://github.com/Tresjs/tres/commit/8bbafde48a33753f0b6560da36a4d128aaa83cc6))
* update to three `v160` and vue `v3.4` ([#488](https://github.com/Tresjs/tres/issues/488)) ([5fad3b8](https://github.com/Tresjs/tres/commit/5fad3b8095c09cfe758e2553da3df49b29b1ce1a))


### Bug Fixes

* `nodeOps` is now a function ([#579](https://github.com/Tresjs/tres/issues/579)) ([ddc229e](https://github.com/Tresjs/tres/commit/ddc229e6e492b9e7887add0fcc679a9ae4e47f5c))
* camera aspect ([52dad5c](https://github.com/Tresjs/tres/commit/52dad5c98271f80f4d454bbcce1bb5844960f943))
* **types:** added `Object3DEventMap` to `Object3D` generics for point event handling ([#491](https://github.com/Tresjs/tres/issues/491)) ([a63eb90](https://github.com/Tresjs/tres/commit/a63eb9099fcaf97b1c96abe5667ee71ca2fd611f))

## [4.0.0-next.0](https://github.com/Tresjs/tres/compare/3.9.0...4.0.0-rc.0) (2023-12-22)


### Features

* 474 vue chrome devtools plugin ([#479](https://github.com/Tresjs/tres/issues/479)) ([224ab06](https://github.com/Tresjs/tres/commit/224ab06a4404e2ae5a0cbd2f43041961862b09fd))

## [4.0.0-next.2](https://github.com/Tresjs/tres/compare/4.0.0-next.1...4.0.0-next.2) (2024-03-27)

## [4.0.0-next.1](https://github.com/Tresjs/tres/compare/3.7.0...4.0.0-next.1) (2024-03-18)
* correct type exporting issues ([#625](https://github.com/Tresjs/tres/issues/625)) ([8e52cf1](https://github.com/Tresjs/tres/commit/8e52cf1935d7b725b87c9a41e44ba61e33bd3e85))


## [3.9.0](https://github.com/Tresjs/tres/compare/3.8.1...3.9.0) (2024-04-24)


### Features

* **app:** Add a new directive, v-rotate ([ccf5313](https://github.com/Tresjs/tres/commit/ccf53135a81c795bc08b343baaa823fa33bd064d))


### Bug Fixes

* **deps:** update dependency vue-router to v4.3.1 ([#650](https://github.com/Tresjs/tres/issues/650)) ([9bbb676](https://github.com/Tresjs/tres/commit/9bbb6768a5a7400bf163c06b3688505915bfd074))

## [3.8.1](https://github.com/Tresjs/tres/compare/3.8.0...3.8.1) (2024-04-08)


### Bug Fixes

* refactor nodeOps to return methods at the end of the function ([#602](https://github.com/Tresjs/tres/issues/602)) ([cd0c3bc](https://github.com/Tresjs/tres/commit/cd0c3bcd891f019cf91f30e5fdd547630332a065))


## [3.8.0](https://github.com/Tresjs/tres/compare/3.7.0...3.8.0) (2024-04-03)


### Features

* allow custom loading manager to useTexture ([#585](https://github.com/Tresjs/tres/issues/585)) ([a04c802](https://github.com/Tresjs/tres/commit/a04c8022201c1dcccde8029d5d409e596c498526)), closes [#432](https://github.com/Tresjs/tres/issues/432)


### Bug Fixes

* explicitely add `@vue/devtools-api` dep to package.json ([#604](https://github.com/Tresjs/tres/issues/604)) ([98109af](https://github.com/Tresjs/tres/commit/98109af7d501da1ae5f817e7dc61c6d6ad902891))
* **useLogger:** avoid string substitution in non-strings ([3e2233c](https://github.com/Tresjs/tres/commit/3e2233c61b507a6681a97733d03291db9a34eb89))
* **useLogger:** remove '<empty string>' from log, allow any args and string substitution ([a482ebe](https://github.com/Tresjs/tres/commit/a482ebe3d3d82ae54ff8999fae1693cd218dbdbd))

## [3.7.0](https://github.com/Tresjs/tres/compare/3.6.1...3.7.0) (2024-01-29)


### Features

* 140 on demand rendering ([#497](https://github.com/Tresjs/tres/issues/497)) ([f688c64](https://github.com/Tresjs/tres/commit/f688c6447be887c4675a57ecabb5182d8b7d02cf))
* 492 set tone mapping default to acesfilmictonemapping ([#498](https://github.com/Tresjs/tres/issues/498)) ([c4547f9](https://github.com/Tresjs/tres/commit/c4547f92615a43b7b56b34c0e1ee9f4b78a2230b))
* 503 conditional rendering of primitives ([#514](https://github.com/Tresjs/tres/issues/514)) ([79d8a76](https://github.com/Tresjs/tres/commit/79d8a762da6b6e23771a20314f7902eff4635acf))
* 516 localstate for custom renderer node instances instead of userdata ([#522](https://github.com/Tresjs/tres/issues/522)) ([08717ef](https://github.com/Tresjs/tres/commit/08717efd0f631c085340b1fea4eb6c154c63608b))
* remove default camera warning ([#499](https://github.com/Tresjs/tres/issues/499)) ([8bbafde](https://github.com/Tresjs/tres/commit/8bbafde48a33753f0b6560da36a4d128aaa83cc6))
* update to three `v160` and vue `v3.4` ([#488](https://github.com/Tresjs/tres/issues/488)) ([5fad3b8](https://github.com/Tresjs/tres/commit/5fad3b8095c09cfe758e2553da3df49b29b1ce1a))


### Bug Fixes

* `nodeOps` is now a function ([#579](https://github.com/Tresjs/tres/issues/579)) ([ddc229e](https://github.com/Tresjs/tres/commit/ddc229e6e492b9e7887add0fcc679a9ae4e47f5c))
* camera aspect ([52dad5c](https://github.com/Tresjs/tres/commit/52dad5c98271f80f4d454bbcce1bb5844960f943))
* **types:** added `Object3DEventMap` to `Object3D` generics for point event handling ([#491](https://github.com/Tresjs/tres/issues/491)) ([a63eb90](https://github.com/Tresjs/tres/commit/a63eb9099fcaf97b1c96abe5667ee71ca2fd611f))

## [4.0.0-next.0](https://github.com/Tresjs/tres/compare/3.7.0...4.0.0-next.1) (2023-12-22)


### Features

* 474 vue chrome devtools plugin ([#479](https://github.com/Tresjs/tres/issues/479)) ([224ab06](https://github.com/Tresjs/tres/commit/224ab06a4404e2ae5a0cbd2f43041961862b09fd))

## [3.7.0](https://github.com/Tresjs/tres/compare/3.6.1...3.7.0) (2024-01-29)

### Features
  
* 474 vue chrome devtools plugin ([#526](https://github.com/Tresjs/tres/issues/526)) ([0185bfa](https://github.com/Tresjs/tres/commit/0185bfa6f04faff5eabbc526616713ef7747ebeb))
* 524 feat add directives to core ([#525](https://github.com/Tresjs/tres/issues/525)) ([5268e9f](https://github.com/Tresjs/tres/commit/5268e9f13bf65c61d5ddfe7153b71b335449b81d))


### Bug Fixes

* **docs:** change image path to silence warning ([#519](https://github.com/Tresjs/tres/issues/519)) ([280d248](https://github.com/Tresjs/tres/commit/280d2482760bde1032e24c4a9e96af4beea954ed))

## [3.6.1](https://github.com/Tresjs/tres/compare/3.6.0...3.6.1) (2024-01-16)


### Bug Fixes

* correct minor typos ([#438](https://github.com/Tresjs/tres/issues/438)) ([341faac](https://github.com/Tresjs/tres/commit/341faacb93fd347aced7f1bc7e0484ecbc12e6ce)), closes [#452](https://github.com/Tresjs/tres/issues/452)
* incorrect MathRepresentation type ([#456](https://github.com/Tresjs/tres/issues/456)) ([314b088](https://github.com/Tresjs/tres/commit/314b0883b78ded0cad2bdf9f2506bbeac4a0817e))
* **usetrescontextprovider:** fixed rendering issues caused when resize is triggered ([#512](https://github.com/Tresjs/tres/issues/512)) ([a16b12b](https://github.com/Tresjs/tres/commit/a16b12b160098e97993b14a7bb054103c88b6263)), closes [#511](https://github.com/Tresjs/tres/issues/511)

## [3.6.0](https://github.com/Tresjs/tres/compare/3.5.2...3.6.0) (2023-12-12)


### Features

* enable devtools ([#465](https://github.com/Tresjs/tres/issues/465)) ([d61df05](https://github.com/Tresjs/tres/commit/d61df0597965e708581d1b32eafa2f14866bf9b4))

## [3.6.0-next.0](https://github.com/Tresjs/tres/compare/3.5.1...3.6.0-next.0) (2023-12-06)


### Features

* devtools hook on window object ([df96c1f](https://github.com/Tresjs/tres/commit/df96c1f31aafe1b73cd344fde39420c1ae443d47))
  

## [3.5.2](https://github.com/Tresjs/tres/compare/3.5.1...3.5.2) (2023-12-12)


### Bug Fixes

* force memory free allocation when disposing materials and geometries ([#463](https://github.com/Tresjs/tres/issues/463)) ([1ef3533](https://github.com/Tresjs/tres/commit/1ef353363d02256275c483ec15ad424dc058991a))

## [3.5.1](https://github.com/Tresjs/tres/compare/3.5.0...3.5.1) (2023-11-28)

## [3.5.0](https://github.com/Tresjs/tres/compare/3.4.1...3.5.0) (2023-11-05)


### Features

* **useSeek:** Add `seekAll` and `seekAllByName` methods to `useSeek` composable ([#433](https://github.com/Tresjs/tres/issues/433)) ([ef905a3](https://github.com/Tresjs/tres/commit/ef905a311347f010f3902cd2ee5546ffed0811ab))


### Bug Fixes

* **types-(fix-#427):** vueprops change ref to vnoderef and key add number and symbol ([#428](https://github.com/Tresjs/tres/issues/428)) ([45aeafd](https://github.com/Tresjs/tres/commit/45aeafd41ca77a056f5668075f5a8e5ed3346761)), closes [fix-#427](https://github.com/Tresjs/fix-/issues/427) [#427](https://github.com/Tresjs/tres/issues/427)

## [3.4.1](https://github.com/Tresjs/tres/compare/3.4.0...3.4.1) (2023-10-19)


### Bug Fixes

* passing class and style attrs only ([#423](https://github.com/Tresjs/tres/issues/423)) ([8fd991a](https://github.com/Tresjs/tres/commit/8fd991a032fff358c815f1b4cb2b98bc44d8eef1))

## [3.4.0](https://github.com/Tresjs/tres/compare/3.3.0...3.4.0) (2023-10-19)


### Features

* announce cientos 3.5.0 ([#417](https://github.com/Tresjs/tres/issues/417)) ([064806f](https://github.com/Tresjs/tres/commit/064806f518a6456822e133fb7bd190690b5906de))


### Bug Fixes

* pass attrs down to canvas ([#422](https://github.com/Tresjs/tres/issues/422)) ([aeab3e8](https://github.com/Tresjs/tres/commit/aeab3e8632c7b8708cd0b58c5e979d7015368ec9))

## [3.3.0](https://github.com/Tresjs/tres/compare/3.2.3...3.3.0) (2023-10-02)


### Features

* context (TresContext) is now exposed from TresCanvas ([#404](https://github.com/Tresjs/tres/issues/404)) ([838d779](https://github.com/Tresjs/tres/commit/838d779e59494cacf61274fe497373983dbe8278))


### Bug Fixes

* **core:** made v-if work again ([#409](https://github.com/Tresjs/tres/issues/409)) ([0d00545](https://github.com/Tresjs/tres/commit/0d0054577aaed001c2a56a9e97e0600921ba6a5d))

## [3.3.0-next.0](https://github.com/Tresjs/tres/compare/3.2.3...3.3.0-next.0) (2023-09-29)


### Features

* context (TresContext) is now exposed from TresCanvas ([#404](https://github.com/Tresjs/tres/issues/404)) ([838d779](https://github.com/Tresjs/tres/commit/838d779e59494cacf61274fe497373983dbe8278))


### Bug Fixes

* made v-if work again ([277e901](https://github.com/Tresjs/tres/commit/277e901f8e41dc72bf755db17c584b3e28086347))

## [3.2.3](https://github.com/Tresjs/tres/compare/3.2.2...3.2.3) (2023-09-22)


### Bug Fixes

* **types:** useTexture() ([#401](https://github.com/Tresjs/tres/issues/401)) ([20ffa4b](https://github.com/Tresjs/tres/commit/20ffa4bbc8d8a45643c8d4368a91cf68513b94c2))

## [3.2.2](https://github.com/Tresjs/tres/compare/3.2.1...3.2.2) (2023-09-16)


### Bug Fixes

* ensure scene as parent fallback for helpers ([#397](https://github.com/Tresjs/tres/issues/397)) ([d63b028](https://github.com/Tresjs/tres/commit/d63b0286aee10baf954bee9d0d180ba3ff17cf48))
* made reactivity of camera prop on TresCanvas work again ([#396](https://github.com/Tresjs/tres/issues/396)) ([990612d](https://github.com/Tresjs/tres/commit/990612dffc593e01a98fccb761a87ea43eddaf2b))
* useTexture docs detail ([#395](https://github.com/Tresjs/tres/issues/395)) ([158d4c3](https://github.com/Tresjs/tres/commit/158d4c3e9f3907fe19b16f6ae7c248626bef8d5b))

## [3.2.1](https://github.com/Tresjs/tres/compare/3.2.0...3.2.1) (2023-09-11)


### Bug Fixes

* proxy app context ([#394](https://github.com/Tresjs/tres/issues/394)) ([2301269](https://github.com/Tresjs/tres/commit/2301269aef4d7405ca0d327bd0ae80cebac5aad6))

## [3.2.1-next.4](https://github.com/Tresjs/tres/compare/3.2.1-next.3...3.2.1-next.4) (2023-09-11)


### Reverts

* Revert "chore: fix lint" ([f53fba9](https://github.com/Tresjs/tres/commit/f53fba955a0c3f0040ce79f52e1b756147fad4ec))

## [3.2.1-next.3](https://github.com/Tresjs/tres/compare/3.2.1-next.2...3.2.1-next.3) (2023-09-11)


### Bug Fixes

* revert object assign usage for setting app in appContext ([889e022](https://github.com/Tresjs/tres/commit/889e0221ed2e8f2c6a3e4ee91413125c9bfe7281))

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
