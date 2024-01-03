export interface NuxtCustomSchema {
 appConfig?: {
  /**
   * Nuxt Icon
   * 
   * Configure Nuxt Icon module preferences.
   * 
  */
  nuxtIcon?: {
   /**
    * Icon Size
    * 
    * Set the default icon size. Set to false to disable the sizing of icon in style.
    * 
    * @default "1em"
    * 
    * @studioIcon material-symbols:format-size-rounded
   */
   size?: string | false,

   /**
    * CSS Class
    * 
    * Set the default CSS class.
    * 
    * @default ""
    * 
    * @studioIcon material-symbols:css
   */
   class?: string,

   /**
    * Icon aliases
    * 
    * Define Icon aliases to update them easily without code changes.
    * 
    * 
    * @studioIcon material-symbols:star-rounded
   */
   aliases?: { [alias: string]: string },

   /**
    * Iconify API Options
    * 
    * Define preferences for Iconify API fetch.
    * 
    * 
    * @studioIcon material-symbols:tv-options-input-settings
   */
   iconifyApiOptions?: {
    /**
     * Iconify API URL
     * 
     * Define a custom Iconify API URL. Useful if you want to use a self-hosted Iconify API. Learn more: https://iconify.design/docs/api.
     * 
     * @default "https://api.iconify.design"
     * 
     * @studioIcon material-symbols:api
    */
    url?: string,

    /**
     * Public Iconify API fallback
     * 
     * Define if the public Iconify API should be used as fallback.
     * 
     * @default false
     * 
     * @studioIcon material-symbols:public
    */
    publicApiFallback?: boolean,
   },
  },
 },
}
export type CustomAppConfig = Exclude<NuxtCustomSchema['appConfig'], undefined>
type _CustomAppConfig = CustomAppConfig

declare module '@nuxt/schema' {
  interface NuxtConfig extends Omit<NuxtCustomSchema, 'appConfig'> {}
  interface NuxtOptions extends Omit<NuxtCustomSchema, 'appConfig'> {}
  interface CustomAppConfig extends _CustomAppConfig {}
}

declare module 'nuxt/schema' {
  interface NuxtConfig extends Omit<NuxtCustomSchema, 'appConfig'> {}
  interface NuxtOptions extends Omit<NuxtCustomSchema, 'appConfig'> {}
  interface CustomAppConfig extends _CustomAppConfig {}
}
