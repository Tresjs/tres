const whitelist = [
  'TresCanvas',
  'TresLeches',
  'TresScene',
]

const templateCompilerOptions = {
  template: {
    compilerOptions: {
      isCustomElement: (tag: string) => (tag.startsWith('Tres') && !whitelist.includes(tag)) || tag === 'primitive',
    },
  },
}

export default templateCompilerOptions
