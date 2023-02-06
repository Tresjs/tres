## 1.6.2 (2023-02-06)

### Bug Fixes

- **core:** clean dependencies repeated both peer and dev ([0fb7b4c](https://github.com/Tresjs/tres/commit/0fb7b4c76aeab609a02a1d250962809e088a7c68))

# 1.6.1 (2023-02-06)

### Bugfix

- **core:** added vueuse as peer dependency ([890f97e](https://github.com/Tresjs/tres/commit/890f97e14cf5d743cf23c95967bea01229a56ea6))

# 1.6.0 (2023-02-03)

### Features

- **core:** events support with Raytracing ([0b7767a](https://github.com/Tresjs/tres/commit/0b7767a80a8969585633cd0b570791faff36cbd4))

# 1.5.1 (2023-01-19)

### Bug Fixes

- **core:** corret use of clock.getDelta() ([728b43e](https://github.com/Tresjs/tres/commit/728b43ee5e95549c02c98941de4091af5681fa66))
- **core:** remove histoire ([14ab727](https://github.com/Tresjs/tres/commit/14ab727685bcab4fa78addd620f1652700ca5613))

# 1.5.0 (2023-01-10)

### Features

- **core:** support for groups ([b0963b9](https://github.com/Tresjs/tres/commit/b0963b9e47ec399fc67340c06e97a0b6f3e6c600))

# 1.4.0 (2022-12-22)

### Features

- **core:** added camel keys to set attributes (Support for BufferGeometry) ([fd60380](https://github.com/Tresjs/tres/commit/fd603802a017ee57274542621eb5a21142be9d4a))

## 1.3.3 (2022-12-21)

### Bug Fixes

- **core:** added check for fog ([0a0f7d3](https://github.com/Tresjs/tres/commit/0a0f7d39ace4e3705ec3d8f47ff51bda511ca3e3))

### Features

- **core:** reactive props TresCanvas ([35c8b56](https://github.com/Tresjs/tres/commit/35c8b561c1759cdf584e0e11952f0743e04e5caf))

# 1.3.2 (2022-12-19)

### Bug Fixes

- forcing a release with correct bundle versions ([a211e75](https://github.com/Tresjs/tres/commit/a211e758e16bab34d9afaad8496585e1c5b7de3e))

## 1.3.1 (2022-12-19)

### Bug Fixes

- **cientos:** draco encoding and decoderPath ([c9bd7ad](https://github.com/Tresjs/tres/commit/c9bd7ad6ef3ba86855c887886a9032fe0a324dd2))

# 1.3.0 (2022-12-19)

### Bug Fixes

- added copyPublicDir: false to remove static assets on package ([7e8de9c](https://github.com/Tresjs/tres/commit/7e8de9c4b4e63107b79a81a8686ad97256a29017))
- center props in text3D ([a4e66d3](https://github.com/Tresjs/tres/commit/a4e66d30a015a62ad346e1186f30ea239f7a7bdd))
  fcfbce9a03d5ec85ab160b4cc0e99c254b715c1a))

### Features

- docs: updated contributing docs ([d469c90](https://github.com/Tresjs/tres/commit/d469c9004ea7e6702635832e9d5addeba6b6f42d))
- updated deps and clean up app.vue ([88de6eb](https://github.com/Tresjs/tres/commit/88de6eb756967e7f9981bece6bb7105dd9d893d5))

# 1.2.1 (2022-12-11)

### Bug Fixes

- added copyPublicDir: false to remove static assets on package ([7e8de9c](https://github.com/Tresjs/tres/commit/7e8de9c4b4e63107b79a81a8686ad97256a29017))

# 1.2.0 (2022-12-08)

### Bug Fixes

- app.vue ([60023dd](https://github.com/Tresjs/tres/commit/60023dd5ad3fbbc5c139648fcf7b72a08149d340))
- **core:** added error handling to extend ([fcfbce9](https://github.com/Tresjs/tres/commit/fcfbce9a03d5ec85ab160b4cc0e99c254b715c1a))
- **core:** enabled function calling on process props ([f544371](https://github.com/Tresjs/tres/commit/f5443713cd34ad284bb01d4bb4ea1d23bb3e43d2))
- **core:** moved window types to index.d.ts ([7f76016](https://github.com/Tresjs/tres/commit/7f7601643f2ebda706fdbbc799250bc7e1f595a5))
- **core:** removed unused imports ([1387834](https://github.com/Tresjs/tres/commit/1387834ed30d5a98e32e8d6a7f166df2b4b2482f))
- hmr nstance creator ([750c614](https://github.com/Tresjs/tres/commit/750c614cfb828e3033929ef173aa5cbc7158a9d4))
- make it work with new instance creator logic ([5c07f84](https://github.com/Tresjs/tres/commit/5c07f84e34b44a4d625b9c4e98acfe4274453a6d))
- remove disposal of the renderer ([9a9ee41](https://github.com/Tresjs/tres/commit/9a9ee41d2c6d716be994baa63e59cbfd6d1bf61a))
- remove initial Orbitcontrol extend from plugin ([171ede4](https://github.com/Tresjs/tres/commit/171ede4ff61bbc6b9edd5f0e83859e956ab0e30b))
- remove unused ref ([4384c8e](https://github.com/Tresjs/tres/commit/4384c8e823bab68a5026eece58ae0f8033ef6834))
- types ([8500c62](https://github.com/Tresjs/tres/commit/8500c6238927d6f6dbce71da2a4f5e1432a1c953))
- use local-scene inject instead of composable to avoid different scene created from cientos ([33353f8](https://github.com/Tresjs/tres/commit/33353f875162a7540d8eb0cb6a7d14ca02ca614b))

### Features

- **cientos:** text3d base ([0e13051](https://github.com/Tresjs/tres/commit/0e130514b0975d6eadd41a8a999998128b92a189))
- **cientos:** Text3D now accepts sweet text via slots ([8f3a2f4](https://github.com/Tresjs/tres/commit/8f3a2f4787c3e2dff8d71e0588c60794abdd75a7))
- **core:** usage of window global variable for extendability on other pkgs ([815b839](https://github.com/Tresjs/tres/commit/815b839e24f672df3a586e9c39232327716e244a))
- **core:** add camera to scene ([631c119](https://github.com/Tresjs/tres/commit/631c119bb808f6e2eb6a37c3d9c91adb01eb991b))
- **core:** extend example with TextGeometry ([33be4da](https://github.com/Tresjs/tres/commit/33be4da77aac6c6323ce247b057e03788e82c71e))
- **core:** extend functionality ([c1da082](https://github.com/Tresjs/tres/commit/c1da08279e0254e8253f98753f4a7b16391587c8))
- **core:** extend reactive catalog ([a6bc3f9](https://github.com/Tresjs/tres/commit/a6bc3f9e6edc1c4d7a3d562e146dd887038e7b2e))
- **core:** extension now works with slots passed by ([e1bfea1](https://github.com/Tresjs/tres/commit/e1bfea1a0901eb61a88b23fb0423f207877045f1))
- **core:** refactored instance creator and expose methods to be used on cientos ([f943807](https://github.com/Tresjs/tres/commit/f9438070b446d5bf318a1d734c4f3cbb4933f43e))
- text3d on cientos ([ff80fdb](https://github.com/Tresjs/tres/commit/ff80fdb6cb0655d87ae9b24cc8904b96792baa00))

# 1.1.0 (2022-12-05)

### Bug Fixes

- **core:** enabled function calling on process props ([f544371](https://github.com/Tresjs/tres/commit/f5443713cd34ad284bb01d4bb4ea1d23bb3e43d2))
- **core:** removed unused imports ([1387834](https://github.com/Tresjs/tres/commit/1387834ed30d5a98e32e8d6a7f166df2b4b2482f))

### Features

- **core:** add camera to scene ([631c119](https://github.com/Tresjs/tres/commit/631c119bb808f6e2eb6a37c3d9c91adb01eb991b))
- **core:** extend example with TextGeometry ([33be4da](https://github.com/Tresjs/tres/commit/33be4da77aac6c6323ce247b057e03788e82c71e))
- **core:** extend functionality ([c1da082](https://github.com/Tresjs/tres/commit/c1da08279e0254e8253f98753f4a7b16391587c8))
- **core:** extend reactive catalog ([a6bc3f9](https://github.com/Tresjs/tres/commit/a6bc3f9e6edc1c4d7a3d562e146dd887038e7b2e))
- **core:** refactored instance creator and expose methods to be used on cientos ([f943807](https://github.com/Tresjs/tres/commit/f9438070b446d5bf318a1d734c4f3cbb4933f43e))

# 1.0.0 (2022-11-29)

### Features

- Hola mundo 🍩 🪐 ([286ac4c](https://github.com/Tresjs/tres/commit/286ac4ccead649f34636f27167daa035821256c9))
- **core:** add camera to scene ([631c119](https://github.com/Tresjs/tres/commit/631c119bb808f6e2eb6a37c3d9c91adb01eb991b))
- **core:** extend functionality ([c1da082](https://github.com/Tresjs/tres/commit/c1da08279e0254e8253f98753f4a7b16391587c8))
