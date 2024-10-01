const antfuConfig = {
  stylistic: true,
  // vue: true, // autodetected by @antfu/eslint-config, no need to set a default
  // typescript: true, // autodetected by @antfu/eslint-config, no need to set a default
  ignores: [
    '**/dist/**',
    'sponsorkit/**',
    'node_modules/**',
    'coverage/**',
    '**/public/**',
  ],
  formatters: {
    css: true,
    html: true,
  },
}

export default antfuConfig
