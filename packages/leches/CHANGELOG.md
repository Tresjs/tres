## 1.1.0 (2025-10-10)

### 🧱 Updated Dependencies

- Updated @tresjs/eslint-config to 1.5.0

# 1.0.0 (2025-10-04)

### 🧱 Updated Dependencies

- Updated @tresjs/eslint-config to 1.4.1

# Changelog

## [1.0.0-next.0](https://github.com/Tresjs/leches/compare/0.14.1...1.0.0-next.0) (2025-07-04)

### ⚠ BREAKING CHANGES

* styles are now auto injected
* `useControls` with folders now return properties prefixed with the folder name, a folder camera with a control position will return a ref `cameraPosition`
* select options values
* Now composable returns an object containing only each control value. When using multiple controls at the same time, you can access `controlName.value` directly instead of `controlName.value.value`

- Refactor `useControls` to return object with control values as refs
- Updated tests and remove visibility testing.

### Features

* add ButtonControl demo and enhance button functionality ([b42cfa8](https://github.com/Tresjs/leches/commit/b42cfa845929a26dc2e568bb5e1ec973d2e7fca9))
* add DemoLayout component and UnoCSS shortcuts for consistent demo styling ([e3035bf](https://github.com/Tresjs/leches/commit/e3035bfb0d1d7eab57651426a427cec3e90455b9))
* add gap spacing to control components ([ca9d418](https://github.com/Tresjs/leches/commit/ca9d418fd0471cc22c83166fc5df8bbbef35ea54))
* add graph pane type and corresponding demo component ([a22e6d6](https://github.com/Tresjs/leches/commit/a22e6d6d908082d6b86156a9d20ef0a634279499))
* add new icon and enhance component functionality ([9ec3c85](https://github.com/Tresjs/leches/commit/9ec3c852c58bb255cf5302267bde02611ea7907b))
* add slot content support to TresLeches panele ([2071202](https://github.com/Tresjs/leches/commit/2071202a036c5f3e646ab6e1963fe83ce6c9af35))
* add stacked mode for TresLeches component ([c297c82](https://github.com/Tresjs/leches/commit/c297c82156e72e24ab8cee60364f2e90392d5b4b))
* add unocss-preset-scrollbar and update component styles ([1f27a69](https://github.com/Tresjs/leches/commit/1f27a6937cbffb4ec8feeca54f6885ac2f4f955d))
* enhance component styles and dark mode support ([eb41769](https://github.com/Tresjs/leches/commit/eb4176942b89c6d9876bdcbcdeda1987307ad61b))
* enhance control components with new features and optimizations ([0062fe1](https://github.com/Tresjs/leches/commit/0062fe1409cbd930b45e7c7f4efbe5a8d785125b))
* enhance NumberControl and TresLeches components for improved layout and functionality ([3092a7f](https://github.com/Tresjs/leches/commit/3092a7f51900d337e0a669055081a7a372040d0f))
* folder drawer animations ([f5926fc](https://github.com/Tresjs/leches/commit/f5926fc246bbe3bb1ddb7257db28b3cb928037e6))
* increase default width of TresLeches panel to 320px ([ad3f472](https://github.com/Tresjs/leches/commit/ad3f47228b2b57eb960ccc131618679ac96c27c0))
* increase panel size on folder open ([22e73a4](https://github.com/Tresjs/leches/commit/22e73a462f5ddfd82058889c62e1ffdf36227200))
* resizable and collapsable pane ([2720225](https://github.com/Tresjs/leches/commit/27202255f62b201fc297fe717a68773be2dc18fb))
* simplified `useControls` API ([742c8af](https://github.com/Tresjs/leches/commit/742c8af70e8eb8d354231873a7eeb0591ef46595))
* styles are now auto injected ([ad10063](https://github.com/Tresjs/leches/commit/ad1006333d5374f84a81f29608d9d95e5897a065))
* uniquekey now consider uuid to make multiple instances on same page work ([77e29a5](https://github.com/Tresjs/leches/commit/77e29a56952c3fbb51baeb7600d701f22eb36c5b))
* update control types for enhanced type safety and functionality ([59abed1](https://github.com/Tresjs/leches/commit/59abed17ae40482b7dca14dab9563575400cba7f))

### Bug Fixes

* add box-border class to TresLeches component pane ([4d89c02](https://github.com/Tresjs/leches/commit/4d89c02e0fe9e060f79b269b87951e4eeca4d3f2))
* add cleanup for controls in TresLeches component ([377a605](https://github.com/Tresjs/leches/commit/377a6050c6b4ea2d7896fa9c0e777f09105cdd4c))
* folders controls key handling ([afdafbb](https://github.com/Tresjs/leches/commit/afdafbbbe59b416355e1810769d3fd830511d73e))
* improve focus and background styles for controls ([5275e27](https://github.com/Tresjs/leches/commit/5275e27bcc94284c1d9b971e5bdd018890250a28))
* increased control aprox height for initial calculation ([4201750](https://github.com/Tresjs/leches/commit/4201750f278a048da1e1d1eabfaa39899f965633))
* removed dynamic style tag from html for snapshots ([03c8db4](https://github.com/Tresjs/leches/commit/03c8db47efa236b0f8d166a9472f940f3d60e9bd))
* replace transform directive apply with plain css ([0a25292](https://github.com/Tresjs/leches/commit/0a252923649a2783aa61053957699dc8937cb1ba))
* resolve merge conflict in component snapshot tests ([f34f3b7](https://github.com/Tresjs/leches/commit/f34f3b7269ae1776e08e6c81d336db92613c8a6a))
* select control now respects option value type ([5536ad5](https://github.com/Tresjs/leches/commit/5536ad53adfe24ba3a1efecaef73402c8bb8b4f0))
* select options values ([3b9ef68](https://github.com/Tresjs/leches/commit/3b9ef680fd16b1a4522e9f183505cf49f48d2b36))
* solve issue with useControls needed on parent. ([7a7558c](https://github.com/Tresjs/leches/commit/7a7558c91388bab5a33403757ff977dcbcfdb828))
* tweak fpsgraph extra height on calculation ([9ff00b8](https://github.com/Tresjs/leches/commit/9ff00b84f51a8791aba9e5b16452eedada9a3f17))
* update snapshot tests for control components ([553ce82](https://github.com/Tresjs/leches/commit/553ce82326eac170a5798d7cb3105fcde66de618))
* update snapshot tests with box-border class for TresLeches pane ([bbf8c16](https://github.com/Tresjs/leches/commit/bbf8c162d012a8a588eb8dd4ad5e12871b4e78fd))
* update snapshots for BooleanControl tests ([4e6c4d2](https://github.com/Tresjs/leches/commit/4e6c4d287e43be0978f10ca3bc75f9e37a1c5473))
* update snapshots for BooleanControl tests ([7b5b02b](https://github.com/Tresjs/leches/commit/7b5b02b4a2c2a38649ab984c38617c9888448e1e))
* update snapshots for ColorControl tests ([ef00b59](https://github.com/Tresjs/leches/commit/ef00b59a3cb5099f0897ced4e7d7e5b89fd7987b))

## [0.14.1](https://github.com/Tresjs/leches/compare/0.14.0...0.14.1) (2025-01-15)

### Bug Fixes

* **ControlInput:** replace root element ([9bff2a9](https://github.com/Tresjs/leches/commit/9bff2a96ac64184282400ce8b656ea595da1ed65))
* update package.json for script and style path adjustments ([1373ec4](https://github.com/Tresjs/leches/commit/1373ec4977f6b7dfef63823357108480772009ac))

## [0.14.0](https://github.com/Tresjs/leches/compare/0.14.0-next.0...0.14.0) (2023-11-30)


### Features

* control label component and truncate ([c26f76d](https://github.com/Tresjs/leches/commit/c26f76d4ae7572ca96691dcb9aa147b149d129a5))
* icons on text control ([931ad45](https://github.com/Tresjs/leches/commit/931ad45421ec45e9ac870b0932733f121f82b074))
* number control icons and centralized label ([c08c97a](https://github.com/Tresjs/leches/commit/c08c97aa2566109ab793acf45565d217bbf5e2f1))
* select, vector and slider labels with icons ([7bbc666](https://github.com/Tresjs/leches/commit/7bbc666ae07cc3b75e8898638f9975c368a61118))


### Bug Fixes

* added control label new util prefix ([357964e](https://github.com/Tresjs/leches/commit/357964e2ec2c513548d04159822c8a3129fc9cc4))
* added prefixes to missing apply utilities ([63dd3f1](https://github.com/Tresjs/leches/commit/63dd3f1d3e4a0945820ca922ddfd50f1f72e1680))
* broken test for dropwdown control ([5dcde71](https://github.com/Tresjs/leches/commit/5dcde7135229c5c571cc8d9aef93e7e49232c433))
* fix bug with verbose controls specially vectors ([acbe014](https://github.com/Tresjs/leches/commit/acbe014a0753c2e1fd06a57a259ae78abe6e2a03))
* uno utils and variables prefixes to avoid overlapping ([688a867](https://github.com/Tresjs/leches/commit/688a86778bdd223fecd75efc5b7c1272366ccfbb))

## [0.14.0-next.0](https://github.com/Tresjs/leches/compare/0.13.0...0.14.0-next.0) (2023-11-06)


### Features

* added buttons and icons ([99f2e0e](https://github.com/Tresjs/leches/commit/99f2e0ef4ff00ab36eb098cc7f91a38ed99a06b9))

## [0.13.0](https://github.com/Tresjs/leches/compare/0.12.1...0.13.0) (2023-11-04)


### Features

* add vector 2 support ([1c067ff](https://github.com/Tresjs/leches/commit/1c067ffa2b1c56c367cc0b462e3d6e8b050f5b14))

## [0.12.1](https://github.com/Tresjs/leches/compare/0.12.0...0.12.1) (2023-11-03)


### Bug Fixes

* remove unique key generation on controls duplicated outside of folders ([5858b57](https://github.com/Tresjs/leches/commit/5858b572cc0f7532870af8caa67703aa628162ed))

## [0.12.0](https://github.com/Tresjs/leches/compare/0.11.0...0.12.0) (2023-10-16)


### Features

* add key modifiers to vector inputs ([ba22d55](https://github.com/Tresjs/leches/commit/ba22d559b612083156cef6d493497243dc3776b8))


### Bug Fixes

* avoid mouse pressed control to get stucket out of the dom element ([4892bdc](https://github.com/Tresjs/leches/commit/4892bdcbb157a4a7eac89033cb926cd5c6e21681))

## [0.11.0](https://github.com/Tresjs/leches/compare/0.10.0...0.11.0) (2023-10-15)


### Features

* uniquey to avoid folder control repetition ([e355039](https://github.com/Tresjs/leches/commit/e355039cb214d80bac94986024965ecb30c87cc1))

## [0.10.0](https://github.com/Tresjs/leches/compare/0.9.1...0.10.0) (2023-09-18)


### Features

* better keyboard accesibility ([b40fd00](https://github.com/Tresjs/leches/commit/b40fd00bd09900552ea1669e79b9feee4152fd27))


### Bug Fixes

* outline for color input ([4746469](https://github.com/Tresjs/leches/commit/47464693059c62e9ff4b1d2b2c1781b68b0a37b4))
* vector control accesibility issues ([4af9bcf](https://github.com/Tresjs/leches/commit/4af9bcf16b72fd336233a43f67245c627dbc9386))

## [0.9.1](https://github.com/Tresjs/leches/compare/0.9.0...0.9.1) (2023-09-09)


### Bug Fixes

* added visibile and label initialization through params ([bc63423](https://github.com/Tresjs/leches/commit/bc634233f2389273cf5c2e6e1e25177460ba5c1e))

## [0.9.0](https://github.com/Tresjs/leches/compare/0.8.0...0.9.0) (2023-09-08)


### Features

* multiple controls now return object ([9f82e9c](https://github.com/Tresjs/leches/commit/9f82e9caf37ced8365a1b356ed5455fb59443e0f))


### Bug Fixes

* check if object past is reactive ([b89b2d3](https://github.com/Tresjs/leches/commit/b89b2d3c3baf45c3960e87c5f3cdfc123146710e))
* fixed problem with reactivity when multiple vector controls ([22d2ed2](https://github.com/Tresjs/leches/commit/22d2ed22e2b6264653efb1610388b62ac35d829d))

## [0.8.0](https://github.com/Tresjs/leches/compare/0.7.0...0.8.0) (2023-08-30)


### Features

* added component to hero ([a535abe](https://github.com/Tresjs/leches/commit/a535abeb3699e448b8b4f5127a7bd5e279977f79))
* docs 🍰 ([0772916](https://github.com/Tresjs/leches/commit/07729164cb567f4fc0adf49e41ca76276995f9b8))
* dropdowns are back ([27cd0ef](https://github.com/Tresjs/leches/commit/27cd0effbadb29d04fb6e270178c407e350f5759))
* folder support ([441627e](https://github.com/Tresjs/leches/commit/441627ebe3f75b1235d55821f24b67e3113fc235))
* multiple controls by uuid ([8f75e0b](https://github.com/Tresjs/leches/commit/8f75e0b40ec8dd391629b300dd2b5e59fcd2db73))
* now reactive and refs work inside params ([900c3c1](https://github.com/Tresjs/leches/commit/900c3c1ab58941437abba70c8fe84204b5cb645f))
* range options are working ([8feec7d](https://github.com/Tresjs/leches/commit/8feec7de13499cce406dbc2ae3135996d22acee3))
* resize with window and vector controls improved ([acd5adb](https://github.com/Tresjs/leches/commit/acd5adb956e0b3cff862e9506662165638381d4d))
* simplified logic for useControls ([6f1a239](https://github.com/Tresjs/leches/commit/6f1a2390e1861baff0caf5a6b374393372808e5b))
* vitest component test working ([e18a7db](https://github.com/Tresjs/leches/commit/e18a7db4ff80cf1a6f7f3865d19234d1ef808a7a))

## [0.7.0](https://github.com/Tresjs/leches/compare/0.6.0...0.7.0) (2023-08-12)


### Features

* removed three as dep ([db0e5f3](https://github.com/Tresjs/leches/commit/db0e5f34f208de97e01ef57300d1519bcdf5916a))

## [0.6.0](https://github.com/Tresjs/leches/compare/0.5.0...0.6.0) (2023-07-31)


### Features

* add absolute and inherit classes ([54f3c11](https://github.com/Tresjs/leches/commit/54f3c11b88291764959f6cfeaa4a09669a6f8cea))

## [0.5.0](https://github.com/Tresjs/leches/compare/0.4.0...0.5.0) (2023-07-31)


### Features

* controls state is now a reactive object. ([b127a9b](https://github.com/Tresjs/leches/commit/b127a9bbb71e7c95dfdaf9c082f9002c285d0fd5))


### Bug Fixes

* remove null as the control default ([c640982](https://github.com/Tresjs/leches/commit/c6409827d9b1b28e39c350dd6bc50afe7ffac53f))

## [0.4.0](https://github.com/Tresjs/leches/compare/0.3.1...0.4.0) (2023-07-04)


### Features

* dropdown control input ([dd8098b](https://github.com/Tresjs/leches/commit/dd8098bd15c1daca7d1aa9932d4edb12f7bea2b7))

### [0.3.1](https://github.com/Tresjs/leches/compare/0.3.0...0.3.1) (2023-06-22)


### Bug Fixes

* multiple instances of threejs and font style issue ([1d9aaf8](https://github.com/Tresjs/leches/commit/1d9aaf88c3060c3642904b79a2538c84d90ad5eb))

## [0.3.0](https://github.com/Tresjs/leches/compare/0.2.0...0.3.0) (2023-05-28)


### Features

* export types and workspaces ([721c9fd](https://github.com/Tresjs/leches/commit/721c9fd4bb859da73602bfc7b1bc17903e4efc01))
* fps graph ([cf92423](https://github.com/Tresjs/leches/commit/cf924237772c3cb9a9a9fc77ee9edd2d7d05ca88))
* obj reference control ([ffd3f20](https://github.com/Tresjs/leches/commit/ffd3f2048ad58f5dd6c6db8f6e925e32cadbcd13))


### Bug Fixes

* fixing that build ([939fa12](https://github.com/Tresjs/leches/commit/939fa12fb28495d31fc6d1271e28ca50fd582356))

## [0.2.0](https://github.com/Tresjs/leches/compare/0.1.0...0.2.0) (2023-05-06)


### Features

* folder ([85ac635](https://github.com/Tresjs/leches/commit/85ac6356dcc1816fa51d4ade97545105a552ef6b))

## 0.1.0 (2023-05-06)


### Features

* basic color picker ([56b5795](https://github.com/Tresjs/leches/commit/56b5795f66cbae0dc61ef260e1a7e6cd7e98239e))
* change name and controls obj to array ([474b945](https://github.com/Tresjs/leches/commit/474b945ecef3f168c44960539d0e2d7b8747c450))
* correct types ([c8946d2](https://github.com/Tresjs/leches/commit/c8946d2611cd87275363372c5427f7cda69fafa6))
* fancy checkbox ([4eb6e00](https://github.com/Tresjs/leches/commit/4eb6e0086c05807bc95b64d1a5eab3a2ac20ca76))
* kinda vector control ([c77d3a7](https://github.com/Tresjs/leches/commit/c77d3a7de06364d69217e916f9b0024beaf2d785))
* slider and mouse relative number controls ([1c57fbd](https://github.com/Tresjs/leches/commit/1c57fbd362f4535249691655adfffd395f8c2deb))
* swiping control number with min and max ([3141e81](https://github.com/Tresjs/leches/commit/3141e81b2d7e9b3e5ddb6c986e15fbac6687c3b2))
* text number and boolean controls ([3b26066](https://github.com/Tresjs/leches/commit/3b260666dcb6bcf4509782e767ff8f7f84833826))
* visibility and disposal ([84ac145](https://github.com/Tresjs/leches/commit/84ac145e8460c67267fe4b0ecc6b0ef4c158823b))


### Bug Fixes

* avoid mutating the control prop ([ee4b571](https://github.com/Tresjs/leches/commit/ee4b571a11f0a3ce7932ece8c678094632a86983))
