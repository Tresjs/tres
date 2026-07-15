export type TresRendererErrorCode = 'INITIALIZATION_FAILED'

export class TresRendererError extends Error {
  override readonly name = 'TresRendererError'

  constructor(
    message: string,
    public readonly code: TresRendererErrorCode,
    options?: ErrorOptions,
  ) {
    super(message, options)
  }
}
