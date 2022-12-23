export function toSetMethodName(key: string) {
  return 'set' + key[0].toUpperCase() + key.slice(1)
}
