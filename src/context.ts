import { AuthService, ConfigService, YnabService } from './services';

export class Context {
  private readonly _config: ConfigService;
  private readonly _ynab: YnabService;
  private readonly _auth: AuthService;

  constructor(configDirectory: string) {
    // note: for now, we manually inject the dependencies
    // at some point, we can use a library for this
    this._config = new ConfigService(configDirectory);
    this._ynab = new YnabService(this._config);
    this._auth = new AuthService(this._config);
  }

  get ynab(): YnabService {
    return this._ynab;
  }

  get auth(): AuthService {
    return this._auth;
  }
}
