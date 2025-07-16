import { field, group } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    ui: group({
      title: 'UI',
      description: 'UI Customization.',
      icon: 'i-mdi-palette-outline',
      fields: {
        colors: group({
          title: 'Colors',
          description: 'Manage main colors of your application',
          icon: 'i-mdi-palette-outline',
          fields: {
            primary: field({
              type: 'string',
              title: 'Primary',
              description: 'Primary color of your UI.',
              icon: 'i-mdi-palette-outline',
              default: 'green',
              required: ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
            }),
            neutral: field({
              type: 'string',
              title: 'Neutral',
              description: 'Neutral color of your UI.',
              icon: 'i-mdi-palette-outline',
              default: 'slate',
              required: ['slate', 'gray', 'zinc', 'neutral', 'stone']
            })
          }
        }),
        icons: group({
          title: 'Icons',
          description: 'Manage icons used in the application.',
          icon: 'i-mdi-application-settings-outline',
          fields: {
            search: field({
              type: 'icon',
              title: 'Search Bar',
              description: 'Icon to display in the search bar.',
              icon: 'i-mdi-magnify',
              default: 'i-lucide-search'
            }),
            dark: field({
              type: 'icon',
              title: 'Dark mode',
              description: 'Icon of color mode button for dark mode.',
              icon: 'i-mdi-moon-waning-crescent',
              default: 'i-lucide-moon'
            }),
            light: field({
              type: 'icon',
              title: 'Light mode',
              description: 'Icon of color mode button for light mode.',
              icon: 'i-mdi-white-balance-sunny',
              default: 'i-lucide-sun'
            }),
            external: field({
              type: 'icon',
              title: 'External Link',
              description: 'Icon for external link.',
              icon: 'i-mdi-arrow-top-right',
              default: 'i-lucide-external-link'
            }),
            chevron: field({
              type: 'icon',
              title: 'Chevron',
              description: 'Icon for chevron.',
              icon: 'i-mdi-chevron-down',
              default: 'i-lucide-chevron-down'
            }),
            hash: field({
              type: 'icon',
              title: 'Hash',
              description: 'Icon for hash anchors.',
              icon: 'i-ph-hash',
              default: 'i-lucide-hash'
            })
          }
        })
      }
    }),
    seo: group({
      title: 'SEO',
      description: 'SEO configuration.',
      icon: 'i-ph-app-window',
      fields: {
        siteName: field({
          type: 'string',
          title: 'Site Name',
          description: 'Name used in ogSiteName and used as second part of your page title (My page title - Nuxt UI Pro).',
          icon: 'i-mdi-web',
          default: []
        })
      }
    }),
    header: group({
      title: 'Header',
      description: 'Header configuration.',
      icon: 'i-mdi-page-layout-header',
      fields: {
        title: field({
          type: 'string',
          title: 'Title',
          description: 'Title to display in the header.',
          icon: 'i-mdi-format-title',
          default: ''
        }),
        to: field({
          type: 'string',
          title: 'To',
          description: 'URL to redirect to when the title is clicked.',
          icon: 'i-mdi-link-variant',
          default: ''
        }),
        logo: group({
          title: 'Logo',
          description: 'Header logo configuration.',
          icon: 'i-mdi-image-filter-center-focus-strong-outline',
          fields: {
            light: field({
              type: 'media',
              title: 'Light Mode Logo',
              description: 'Pick an image from your gallery.',
              icon: 'i-mdi-white-balance-sunny',
              default: ''
            }),
            dark: field({
              type: 'media',
              title: 'Dark Mode Logo',
              description: 'Pick an image from your gallery.',
              icon: 'i-mdi-moon-waning-crescent',
              default: ''
            }),
            alt: field({
              type: 'string',
              title: 'Alt',
              description: 'Alt to display for accessibility.',
              icon: 'i-mdi-alphabet-latin',
              default: ''
            })
          }
        }),
        search: field({
          type: 'boolean',
          title: 'Search Bar',
          description: 'Hide or display the search bar.',
          icon: 'i-mdi-magnify',
          default: true
        }),
        colorMode: field({
          type: 'boolean',
          title: 'Color Mode',
          description: 'Hide or display the color mode button in your header.',
          icon: 'i-mdi-moon-waning-crescent',
          default: true
        }),
        links: field({
          type: 'array',
          title: 'Links',
          description: 'Array of link object displayed in header.',
          icon: 'i-mdi-link-variant',
          default: []
        })
      }
    }),
    footer: group({
      title: 'Footer',
      description: 'Footer configuration.',
      icon: 'i-mdi-page-layout-footer',
      fields: {
        credits: field({
          type: 'string',
          title: 'Footer credits section',
          description: 'Text to display as credits in the footer.',
          icon: 'i-mdi-circle-edit-outline',
          default: ''
        }),
        colorMode: field({
          type: 'boolean',
          title: 'Color Mode',
          description: 'Hide or display the color mode button in the footer.',
          icon: 'i-mdi-moon-waning-crescent',
          default: false
        }),
        links: field({
          type: 'array',
          title: 'Links',
          description: 'Array of link object displayed in footer.',
          icon: 'i-mdi-link-variant',
          default: []
        })
      }
    }),
    toc: group({
      title: 'Table of contents',
      description: 'TOC configuration.',
      icon: 'i-mdi-table-of-contents',
      fields: {
        title: field({
          type: 'string',
          title: 'Title',
          description: 'Text to display as title of the main toc.',
          icon: 'i-mdi-format-title',
          default: ''
        }),
        bottom: group({
          title: 'Bottom',
          description: 'Bottom TOC configuration.',
          icon: 'i-mdi-table-of-contents',
          fields: {
            title: field({
              type: 'string',
              title: 'Title',
              description: 'Text to display as title of the bottom toc.',
              icon: 'i-mdi-format-title',
              default: ''
            }),
            edit: field({
              type: 'string',
              title: 'Edit Page Link',
              description: 'URL of your repository content folder.',
              icon: 'i-ph-note-pencil',
              default: ''
            }),
            links: field({
              type: 'array',
              title: 'Links',
              description: 'Array of link object displayed in bottom toc.',
              icon: 'i-mdi-link-variant',
              default: []
            })
          }
        })
      }
    })
  }
})

declare module '@nuxt/schema' {
  interface CustomAppConfig {
    ui: {
      icons: object
    }
  }
}
