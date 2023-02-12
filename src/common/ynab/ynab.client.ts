import { Account, BudgetSummary, User, API as YnabApi } from 'ynab';
import { YnabApiError } from './ynab.error';

export class YnabApiClient {
  private readonly client: YnabApi;

  constructor(accessToken: string | undefined) {
    this.client = new YnabApi(accessToken ?? 'invalid_token');
  }

  public async getUser(): Promise<User> {
    const { data } = await this.catch(() => this.client.user.getUser());
    return data.user;
  }

  public async getBudgets(): Promise<BudgetSummary[]> {
    const { data } = await this.client.budgets.getBudgets(false);
    return data.budgets;
  }

  public async getAccounts(budgetId: string): Promise<Account[]> {
    const { data } = await this.client.accounts.getAccounts(budgetId);
    return data.accounts;
  }

  private handleError(error: unknown): never {
    if ((error as any)?.error?.id !== undefined) {
      // note: handle all known YNAB API errors
      const id: string = (error as any)?.error?.id;
      if (id === '400') {
        throw new YnabApiError('bad_request');
      } else if (id === '401') {
        throw new YnabApiError('not_authorized');
      } else if (id === '403.1') {
        throw new YnabApiError('subscription_lapsed');
      } else if (id === '403.2') {
        throw new YnabApiError('trial_expired');
      } else if (id === '403.3') {
        throw new YnabApiError('unauthorized_scope');
      } else if (id === '403.4') {
        throw new YnabApiError('data_limit_reached');
      } else if (id === '404.1') {
        throw new YnabApiError('not_found');
      } else if (id === '404.2') {
        throw new YnabApiError('resource_not_found');
      } else if (id === '409') {
        throw new YnabApiError('conflict');
      } else if (id === '429') {
        throw new YnabApiError('too_many_requests');
      } else if (id === '500') {
        throw new YnabApiError('internal_server_error');
      } else if (id === '503') {
        throw new YnabApiError('service_unavailable');
      }
    }

    throw error;
  }

  private async catch<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error: unknown) {
      this.handleError(error);
    }
  }
}
