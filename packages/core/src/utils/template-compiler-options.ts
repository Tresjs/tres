const whitelist = [
  'TresCanvas',
  'TresContext',
  'TresLeches',
  'TresScene',
]

const templateCompilerOptions = {
  template: {
    compilerOptions: {
      isCustomElement: (tag: string) => ((/^Tres[A-Z]/.test(tag) || tag.startsWith('tres-')) && !whitelist.includes(tag)) || tag === 'primitive',
    },
  },
}

export default templateCompilerOptions
