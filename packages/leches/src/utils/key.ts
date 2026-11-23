// A keycap emoji is a normal character plus invisible marks, so the base must go with them.
const KEYCAP_RE = /[0-9#*]\u{FE0F}?\u{20E3}/gu
// Variation selectors are combining marks (\p{Mn}), so the allow-list below would keep them.
const VARIATION_SELECTOR_RE = /[\u{FE00}-\u{FE0F}]/gu
// Allow-list, not a list of emoji: whatever Unicode adds next is removed too.
// ASCII stays so folder names that worked before keep their keys.
// Marks stay so scripts like Devanagari keep their vowel signs.
const NOT_KEY_CHAR_RE = /[^\p{ASCII}\p{L}\p{N}\p{Mn}\p{Mc}]/gu

/** Turns a folder name into the prefix of its control keys, without emoji or non-ASCII symbols. */
export function toKeyPrefix(folderName: string): string {
  return folderName
    .replace(KEYCAP_RE, '')
    .replace(VARIATION_SELECTOR_RE, '')
    .replace(NOT_KEY_CHAR_RE, '')
    .trim()
}
