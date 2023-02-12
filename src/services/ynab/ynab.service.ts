import { YnabApiClient } from '../../common/ynab';
import type { ConfigService } from '../config';

export class YnabService {
  private readonly client: YnabApiClient;

  constructor(private readonly config: ConfigService) {
    this.client = new YnabApiClient(this.config.accessToken);
  }

  public async listBudgets() {
    const budgets = await this.client.getBudgets();
    return budgets.map((budget) => ({
      id: budget.id,
      name: budget.name,
      lastModified: budget.last_modified_on ? new Date(budget.last_modified_on) : undefined,
    }));
  }

  public async listAccounts(budgetId: string) {
    const accounts = await this.client.getAccounts(budgetId);
    return accounts.map((account) => ({
      id: account.id,
      name: account.name,
      type: account.type,
      balance: account.balance,
    }));
  }
}
