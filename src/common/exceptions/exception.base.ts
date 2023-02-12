export abstract class ExceptionBase extends Error {
  public abstract readonly code: string;

  constructor(override readonly message: string) {
    super(message);
  }
}
