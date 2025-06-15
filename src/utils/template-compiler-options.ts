const whitelist = [
  'TresCanvas',
  'tres-canvas',
  'TresLeches',
  'TresScene',
]

const templateCompilerOptions = {
  template: {
    compilerOptions: {
      isCustomElement: (tag: string) => ((tag.startsWith('Tres') || tag.startsWith('tres')) && !whitelist.includes(tag)) || tag === 'primitive',
    },
  },
}

export default templateCompilerOptions
