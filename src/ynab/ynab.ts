import * as ynab from 'ynab';

export class YNABClient {
  ynabApi: ynab.API;

  constructor() {
    const { YNAB_ACCESS_TOKEN } = process.env;
    if (!YNAB_ACCESS_TOKEN) {
      throw new Error('Missing environment variables');
    }
    this.ynabApi = new ynab.API(YNAB_ACCESS_TOKEN);
  }

  async authenticate() {
    console.log('Authenticating with YNAB...');
  }

  async getBudgets() {
    console.log('Fetching budgets...');
    return this.ynabApi.budgets.getBudgets();
  }

  async getAccounts(budget_id: string) {
    console.log('Fetching accounts...');
    return this.ynabApi.accounts.getAccounts(budget_id);
  }

  async getTransactions(budget_id: string) {
    console.log('Fetching transactions...');
    return this.ynabApi.transactions.getTransactions(budget_id);
  }

  async createTransactions(budget_id: string, transactions: ynab.SaveTransaction[]) {
    console.log('Creating transactions...');
    try {
      const response = await this.ynabApi.transactions.createTransactions(budget_id, { transactions });
      const { duplicate_import_ids } = response.data;

      if (duplicate_import_ids) {
        const transactionsToUpdate = transactions.filter(
          (transaction) => transaction.import_id && duplicate_import_ids.includes(transaction.import_id),
        );
        await this.ynabApi.transactions.updateTransactions(budget_id, { transactions: transactionsToUpdate });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
