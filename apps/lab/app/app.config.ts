export default defineAppConfig({
  ui: {
    colors: {
      primary: 'teal',
      accent: 'yellow',
      neutral: 'zinc'
    },
    card: {
      slots: {
        root: 'rounded-xs hover:bg-linear-[115deg,#272727 .06%,#171717]',
        body: 'p-2 sm:p-3'
      }
    }
  },
  site: {
    name: 'TresJS Lab',
    url: 'https://lab.tresjs.org',
    description: 'Explore creative WebGL experiments built with TresJS, the declarative ThreeJS framework for Vue',
    image: '/og-home.png',
  }
})