/** draco3dgltf ships no types; declare only the two module factories we use. */
declare module 'draco3dgltf' {
  export function createDecoderModule(object?: object): Promise<unknown>
  export function createEncoderModule(object?: object): Promise<unknown>
}
