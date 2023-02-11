import { AuthService, ConfigService, YnabService } from './services';

export class Context {
  private readonly _config: ConfigService;
  private readonly _ynab: YnabService;
  private readonly _auth: AuthService;

  constructor() {
    // note: for now, we manually inject the dependencies
    // at some point, we can use a library for this
    this._config = new ConfigService();
    this._ynab = new YnabService();
    this._auth = new AuthService();
  }

  get ynab(): YnabService {
    return this._ynab;
  }

  get auth(): AuthService {
    return this._auth;
  }
}
