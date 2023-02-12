import { ExceptionBase } from '../exceptions';

export class YnabApiError extends ExceptionBase {
  public override readonly code = 'ynab.generic';
}
