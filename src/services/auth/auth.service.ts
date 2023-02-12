import { YnabApiClient, YnabApiError } from '../../common';
import type { ConfigService } from '../config';

export class AuthService {
  constructor(private readonly config: ConfigService) {}

  public async isAuthenticated(): Promise<boolean> {
    return this._isAuthenticated(this.config.accessToken);
  }

  public async authenticateWithAccessToken(token: string): Promise<boolean> {
    const isValid = await this._isAuthenticated(token);
    if (!isValid) return false;

    this.config.setAccessToken(token);
    await this.config.save();

    return true;
  }

  private async _isAuthenticated(token: string | undefined) {
    const api = new YnabApiClient(token);

    try {
      await api.getUser();
    } catch (err: unknown) {
      if (err instanceof YnabApiError && err.message === 'not_authorized') return false;
      throw err;
    }

    return true;
  }
}
