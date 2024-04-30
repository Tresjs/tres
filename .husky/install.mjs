// Skip Husky install in production and CI
// http://typicode.github.io/husky/how-to.html
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0)
}
const husky = (await import('husky')).default
// eslint-disable-next-line no-console
console.log(husky())
