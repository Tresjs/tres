import theme from "#build/tailwind.config/theme.mjs"
import corePlugins from "#build/tailwind.config/corePlugins.mjs"
import plugins from "#build/tailwind.config/plugins.mjs"
import content from "#build/tailwind.config/content.mjs"
import darkMode from "#build/tailwind.config/darkMode.mjs"
import safelist from "#build/tailwind.config/safelist.mjs"
import variants from "#build/tailwind.config/variants.mjs"
import presets from "#build/tailwind.config/presets.mjs"
import prefix from "#build/tailwind.config/prefix.mjs"
import important from "#build/tailwind.config/important.mjs"
import separator from "#build/tailwind.config/separator.mjs"
import blocklist from "#build/tailwind.config/blocklist.mjs"
const config = { theme, corePlugins, plugins, content, darkMode, safelist, variants, presets, prefix, important, separator, blocklist }
export { config as default, theme, corePlugins, plugins, content, darkMode, safelist, variants, presets, prefix, important, separator, blocklist }