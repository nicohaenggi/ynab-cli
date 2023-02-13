import { AuthService, ConfigService, ConnectionService, YnabService } from './services';

export class Context {
  private readonly _config: ConfigService;
  private readonly _ynab: YnabService;
  private readonly _auth: AuthService;
  private readonly _connection: ConnectionService;

  constructor(configDirectory: string) {
    // note: for now, we manually inject the dependencies
    // at some point, we can use a library for this
    this._config = new ConfigService(configDirectory);
    this._ynab = new YnabService(this._config);
    this._auth = new AuthService(this._config);
    this._connection = new ConnectionService(this._config);
  }

  get ynab(): YnabService {
    return this._ynab;
  }

  get auth(): AuthService {
    return this._auth;
  }

  get connection(): ConnectionService {
    return this._connection;
  }
}
