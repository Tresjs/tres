import { defineConfig, tierPresets } from 'sponsorkit'

export default defineConfig({
  // Providers configs
  github: {
    login: 'tresjs',
    type: 'organization',
  },
  opencollective: {
    slug: 'tresjs',
  },
  // Rendering configs
  width: 800,
  renderer: 'tiers', // or 'circles'
  formats: ['json', 'svg', 'png'],
  sponsorsAutoMerge: true,
  tiers: [
    // Past sponsors, currently only supports GitHub
    {
      title: 'Past Sponsors',
      monthlyDollars: -1,
      preset: tierPresets.xs,
    },
    // Default tier
    {
      title: 'Backers',
      preset: tierPresets.base,
    },
    {
      title: 'Sponsors',
      monthlyDollars: 10,
      preset: tierPresets.medium,
    },
    {
      title: 'Generous Backers',
      monthlyDollars: 50,
      preset: tierPresets.large,
    },
    {
      title: 'Bronze Sponsors',
      monthlyDollars: 100,
      preset: tierPresets.xl,
    },
    {
      title: 'Silver Sponsors',
      monthlyDollars: 200,
      preset: tierPresets.xl,
    },
  ],
})
