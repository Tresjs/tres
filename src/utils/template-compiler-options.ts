const whitelist = [
  'TresCanvas',
  'TresLeches',
  'TresScene',
  'TresErrorBoundary',
]

const templateCompilerOptions = {
  template: {
    compilerOptions: {
      isCustomElement: (tag: string) => (tag.startsWith('Tres') && !whitelist.includes(tag)) || tag === 'primitive',
    },
  },
}

export default templateCompilerOptions
