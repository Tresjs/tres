export default defineAppConfig({
  ui: {
    colors: {
      primary: 'teal',
      accent: 'yellow',
      neutral: 'zinc',
    },
    card: {
      slots: {
        root: 'hover:bg-linear-[115deg,#272727 .06%,#171717]',
        body: 'p-2 sm:p-3',
      },
    },
  },
})
