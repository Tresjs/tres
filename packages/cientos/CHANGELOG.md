# 1.7.0 (2023-02-19)

### Bug Fixes

- added copyPublicDir: false to remove static assets on package ([7e8de9c](https://github.com/Tresjs/tres/commit/7e8de9c4b4e63107b79a81a8686ad97256a29017))
- app.vue ([60023dd](https://github.com/Tresjs/tres/commit/60023dd5ad3fbbc5c139648fcf7b72a08149d340))
- center props in text3D ([a4e66d3](https://github.com/Tresjs/tres/commit/a4e66d30a015a62ad346e1186f30ea239f7a7bdd))
- **cientos:** added changelog script ([5e5b9d1](https://github.com/Tresjs/tres/commit/5e5b9d12ed888fdd74d15f9590c225e74163a698))
- **cientos:** check if transform prop has setter ([c7a24cb](https://github.com/Tresjs/tres/commit/c7a24cb7d1784b818b3fc74d8663677ec9b96d11))
- **cientos:** clean up ([691b174](https://github.com/Tresjs/tres/commit/691b174b625a108bf33f8d8d74c52efdfcee4641))
- **cientos:** draco encoding and decoderPath ([c9bd7ad](https://github.com/Tresjs/tres/commit/c9bd7ad6ef3ba86855c887886a9032fe0a324dd2))
- **cientos:** expose get model on gltf component to get instance ([bd23b8d](https://github.com/Tresjs/tres/commit/bd23b8d2b3b9eda194527d2a11cdced0e5fc5802))
- **cientos:** fixed broken camera on orbit controls due reactivity ([a7aba7c](https://github.com/Tresjs/tres/commit/a7aba7c77003a52cd08a5cfb0a1ab89d84f184de))
- **cientos:** fixed useCientos type issues ([34aefc6](https://github.com/Tresjs/tres/commit/34aefc6f3f2d51a4cc4e646160fa11b4936782e9))
- **cientos:** singletonize pane ([cbd24a7](https://github.com/Tresjs/tres/commit/cbd24a7dd7be7dfc8988647f2c0e0b927e8a6807))
- **cientos:** use absolute path again ([2b012f7](https://github.com/Tresjs/tres/commit/2b012f7332fb844bd8dceb13a742d88e3f96b85c))
- **core:** enabled function calling on process props ([f544371](https://github.com/Tresjs/tres/commit/f5443713cd34ad284bb01d4bb4ea1d23bb3e43d2))
- corrected changelog ([91f8e42](https://github.com/Tresjs/tres/commit/91f8e42551f134d56788973f52bded65902c289d))
- forcing a release with correct bundle versions ([a211e75](https://github.com/Tresjs/tres/commit/a211e758e16bab34d9afaad8496585e1c5b7de3e))
- linters ([b1bbbcf](https://github.com/Tresjs/tres/commit/b1bbbcfce9e4511ed1ce3137f6f3ba082f7d29b0))
- make it work with new instance creator logic ([5c07f84](https://github.com/Tresjs/tres/commit/5c07f84e34b44a4d625b9c4e98acfe4274453a6d))
- minor ts issues ([144d0ba](https://github.com/Tresjs/tres/commit/144d0ba116d864937d6cf5cfc44a509731bd9ba9))
- recent problems with adding the controls to refs ([f0d53c9](https://github.com/Tresjs/tres/commit/f0d53c9d8b25685b738fe45a71a3bd8b9b217d9c))
- remove initial Orbitcontrol extend from plugin ([171ede4](https://github.com/Tresjs/tres/commit/171ede4ff61bbc6b9edd5f0e83859e956ab0e30b))
- removing unused code ([1a9ead7](https://github.com/Tresjs/tres/commit/1a9ead7b4aa527f303a5a88046fabf238173f951))
- types ([8500c62](https://github.com/Tresjs/tres/commit/8500c6238927d6f6dbce71da2a4f5e1432a1c953))
- typing issues with useLoader and environment ([d6aca6f](https://github.com/Tresjs/tres/commit/d6aca6fc907ba4f57fa7ccd669a92da23ba34cd9))

### Features

- **cientos:** access core state via provide inject api ([e08c19a](https://github.com/Tresjs/tres/commit/e08c19ab8e53bb47b9afa32f6a01dc37d281bbfb))
- **cientos:** add events and controls default support on dragging ([f03f8e8](https://github.com/Tresjs/tres/commit/f03f8e8159ff1c610ee5a8fda94edd1d208e3285))
- **cientos:** baseline for Environment abstraction ([4a7ce99](https://github.com/Tresjs/tres/commit/4a7ce990e7b71393ffd4154ea143e7ad87501185))
- **cientos:** basic transform controls ([ada3b4c](https://github.com/Tresjs/tres/commit/ada3b4cea6cdb1a37fe6b6dc513cb587ed5c5cd8))
- **cientos:** box abstraction ([dc9c638](https://github.com/Tresjs/tres/commit/dc9c638804f877dcc1567b38285ce0d8b4c4a087))
- **cientos:** circle abstraction ([978eb2d](https://github.com/Tresjs/tres/commit/978eb2da600b0f2055a12a460fd2f5406ceaa028))
- **cientos:** cone abstraction ([9d04c54](https://github.com/Tresjs/tres/commit/9d04c5456e498542b0373499bbc496bfb9f56c54))
- **cientos:** environment preset support ([ff8c86c](https://github.com/Tresjs/tres/commit/ff8c86c171895a69bc2f2376ecd04e2bcf5767f6))
- **cientos:** getting app from getCurrentInstance 🤩 ([f899977](https://github.com/Tresjs/tres/commit/f899977f25ec51a607946b726578811b87db85b3))
- **cientos:** migrated transform controls to new state management ([b746838](https://github.com/Tresjs/tres/commit/b746838779c3362f70138a18d095f936247cbc3b))
- **cientos:** move texture loading to the useEnvironment composable ([4058f58](https://github.com/Tresjs/tres/commit/4058f58619bcc1dd8a3ba09dc626da1a38708e97))
- **cientos:** plane abstraction ([3f27400](https://github.com/Tresjs/tres/commit/3f274007d3177bb35bcd74a705ab7c74ca3ce1cf))
- **cientos:** Refactor OrbitControls to use new extend API ([7251b60](https://github.com/Tresjs/tres/commit/7251b6085c629d1fdbe4272cc264d21790ad8241))
- **cientos:** sphere abstraction ([e2a6fff](https://github.com/Tresjs/tres/commit/e2a6fff86407a397a0c73c7d0a03c63762bfd833))
- **cientos:** text3d base ([0e13051](https://github.com/Tresjs/tres/commit/0e130514b0975d6eadd41a8a999998128b92a189))
- **cientos:** Text3D now accepts sweet text via slots ([8f3a2f4](https://github.com/Tresjs/tres/commit/8f3a2f4787c3e2dff8d71e0588c60794abdd75a7))
- **cientos:** torus abstraction ([d85eb40](https://github.com/Tresjs/tres/commit/d85eb4091e2ae9c7f9a14406bab8191ea2824375))
- **cientos:** torus knot abstraction ([8c4fd46](https://github.com/Tresjs/tres/commit/8c4fd4692d06eccced94c35d39fa7280f6fba3c9))
- **cientos:** typed and story ([851baf9](https://github.com/Tresjs/tres/commit/851baf937c7f563f6300b6d84f15ae05dcb2a150))
- **cientos:** updated cientos model loaders with state ([6481cec](https://github.com/Tresjs/tres/commit/6481cec1dc431f62a283c323e1eb248a3dc205d3))
- **cientos:** updated onLoop delta usage for useAnimations ([9e7fdbd](https://github.com/Tresjs/tres/commit/9e7fdbd9d1184b8405fdc252c2ba19e53b1bf91b))
- **cientos:** useAnimations ([2704288](https://github.com/Tresjs/tres/commit/2704288fd8d814ef9091001f3630fbdb97f13884))
- **cientos:** useFBX and FBXModel ([cdb0665](https://github.com/Tresjs/tres/commit/cdb0665eecbad4b09dfbb60f3c33666bc422af86))
- **core:** extension now works with slots passed by ([e1bfea1](https://github.com/Tresjs/tres/commit/e1bfea1a0901eb61a88b23fb0423f207877045f1))
- text3d on cientos ([ff80fdb](https://github.com/Tresjs/tres/commit/ff80fdb6cb0655d87ae9b24cc8904b96792baa00))
- updated deps and clean up App.vue ([88de6eb](https://github.com/Tresjs/tres/commit/88de6eb756967e7f9981bece6bb7105dd9d893d5))

# 1.6.0 (2023-02-03)

### Features

- **cientos:** box abstraction ([dc9c638](https://github.com/Tresjs/tres/commit/dc9c638804f877dcc1567b38285ce0d8b4c4a087))
- **cientos:** circle abstraction ([978eb2d](https://github.com/Tresjs/tres/commit/978eb2da600b0f2055a12a460fd2f5406ceaa028))
- **cientos:** cone abstraction ([9d04c54](https://github.com/Tresjs/tres/commit/9d04c5456e498542b0373499bbc496bfb9f56c54))
- **cientos:** sphere abstraction ([e2a6fff](https://github.com/Tresjs/tres/commit/e2a6fff86407a397a0c73c7d0a03c63762bfd833))
- **cientos:** torus abstraction ([d85eb40](https://github.com/Tresjs/tres/commit/d85eb4091e2ae9c7f9a14406bab8191ea2824375))
- **cientos:** torus knot abstraction ([8c4fd46](https://github.com/Tresjs/tres/commit/8c4fd4692d06eccced94c35d39fa7280f6fba3c9))

# 1.5.0 (2023-01-19)

### Features

- **cientos:** plane abstraction ([3f27400](https://github.com/Tresjs/tres/commit/3f274007d3177bb35bcd74a705ab7c74ca3ce1cf))
- **cientos:** updated onLoop delta usage for useAnimations ([9e7fdbd](https://github.com/Tresjs/tres/commit/9e7fdbd9d1184b8405fdc252c2ba19e53b1bf91b))
- **cientos:** useAnimations ([2704288](https://github.com/Tresjs/tres/commit/2704288fd8d814ef9091001f3630fbdb97f13884))

# 1.4.0 (2023-01-10)

### Features

- **cientos:** useFBX and FBXModel ([cdb0665](https://github.com/Tresjs/tres/commit/cdb0665eecbad4b09dfbb60f3c33666bc422af86))

# 1.3.0 (2022-12-30)

### Bug Fixes

- **cientos:** moved window tres types to index.d.ts ([a5b87a5](https://github.com/Tresjs/tres/commit/a5b87a5e15fe704d5472c6840637b4a3966cc497))

### Features

- **cientos:** add events and controls default support on dragging ([f03f8e8](https://github.com/Tresjs/tres/commit/f03f8e8159ff1c610ee5a8fda94edd1d208e3285))
- **cientos:** basic transform controls ([ada3b4c](https://github.com/Tresjs/tres/commit/ada3b4cea6cdb1a37fe6b6dc513cb587ed5c5cd8))

# 1.2.2 (2022-12-19)

### Bug Fixes

- forcing a release with correct bundle versions ([a211e75](https://github.com/Tresjs/tres/commit/a211e758e16bab34d9afaad8496585e1c5b7de3e))

# 1.2.1 (2022-12-19)

### Bug Fixes

- **cientos:** draco encoding and decoderPath ([c9bd7ad](https://github.com/Tresjs/tres/commit/c9bd7ad6ef3ba86855c887886a9032fe0a324dd2))

# 1.2.0 (2022-12-19)

### Bug Fixes

- added copyPublicDir: false to remove static assets on package ([7e8de9c](https://github.com/Tresjs/tres/commit/7e8de9c4b4e63107b79a81a8686ad97256a29017))
- center props in text3D ([a4e66d3](https://github.com/Tresjs/tres/commit/a4e66d30a015a62ad346e1186f30ea239f7a7bdd))

### Features

- updated deps and clean up app.vue ([88de6eb](https://github.com/Tresjs/tres/commit/88de6eb756967e7f9981bece6bb7105dd9d893d5))

# 1.1.0 (2022-12-08)

### Bug Fixes

- app.vue ([60023dd](https://github.com/Tresjs/tres/commit/60023dd5ad3fbbc5c139648fcf7b72a08149d340))
- **cientos:** fixed useCientos type issues ([34aefc6](https://github.com/Tresjs/tres/commit/34aefc6f3f2d51a4cc4e646160fa11b4936782e9))
- **core:** enabled function calling on process props ([f544371](https://github.com/Tresjs/tres/commit/f5443713cd34ad284bb01d4bb4ea1d23bb3e43d2))
- linters ([b1bbbcf](https://github.com/Tresjs/tres/commit/b1bbbcfce9e4511ed1ce3137f6f3ba082f7d29b0))
- make it work with new instance creator logic ([5c07f84](https://github.com/Tresjs/tres/commit/5c07f84e34b44a4d625b9c4e98acfe4274453a6d))
- remove initial Orbitcontrol extend from plugin ([171ede4](https://github.com/Tresjs/tres/commit/171ede4ff61bbc6b9edd5f0e83859e956ab0e30b))
- types ([8500c62](https://github.com/Tresjs/tres/commit/8500c6238927d6f6dbce71da2a4f5e1432a1c953))

### Features

- **cientos:** getting app from getCurrentInstance 🤩 ([f899977](https://github.com/Tresjs/tres/commit/f899977f25ec51a607946b726578811b87db85b3))
- **cientos:** Refactor OrbitControls to use new extend API ([7251b60](https://github.com/Tresjs/tres/commit/7251b6085c629d1fdbe4272cc264d21790ad8241))
- **cientos:** text3d base ([0e13051](https://github.com/Tresjs/tres/commit/0e130514b0975d6eadd41a8a999998128b92a189))
- **cientos:** Text3D now accepts sweet text via slots ([8f3a2f4](https://github.com/Tresjs/tres/commit/8f3a2f4787c3e2dff8d71e0588c60794abdd75a7))
- **core:** extension now works with slots passed by ([e1bfea1](https://github.com/Tresjs/tres/commit/e1bfea1a0901eb61a88b23fb0423f207877045f1))
- text3d on cientos ([ff80fdb](https://github.com/Tresjs/tres/commit/ff80fdb6cb0655d87ae9b24cc8904b96792baa00))

# @tresjs/cientos

# 1.0.0 (2022-11-29)

### Features

- Hola mundo 🍩 🪐 ([286ac4c](https://github.com/Tresjs/tres/commit/286ac4ccead649f34636f27167daa035821256c9))
