import { getTransactionsRequest } from './ubs.get-transactions.request';
import type { UBSTransaction } from './ubs.types';
import { SaveTransaction } from 'ynab';

import { mock } from './ubs.transactions.mock';

const mock_data = true;

export class UBSProvider {
  creditCardAccountIds: string;
  navajo: string;

  constructor() {
    const { UBS_CREDIT_CARD_ACCOUNT_IDS, UBS_NAVAJOS } = process.env;
    if (!UBS_CREDIT_CARD_ACCOUNT_IDS || !UBS_NAVAJOS) {
      throw new Error('Missing environment variables');
    }
    this.creditCardAccountIds = UBS_CREDIT_CARD_ACCOUNT_IDS;
    this.navajo = UBS_NAVAJOS;
  }

  async getTransactions() {
    console.log('Fetching transactions...');
    let transactions: UBSTransaction[];
    if (!mock_data) {
      const response = await getTransactionsRequest(this.creditCardAccountIds, this.navajo);
      const text = await response.text();
      transactions = JSON.parse(text)._embedded.transactions;
    } else {
      transactions = mock;
    }

    return transactions;
  }

  async transformTransactions(accountId: string, transactions: UBSTransaction[]) {
    const ynabTransactions: SaveTransaction[] = transactions.map((transaction) => {
      return {
        account_id: accountId,
        date: transaction.transactionDate,
        amount: parseFloat(transaction.postingAmount.amount) * 1000,
        payee_name: transaction.details,
        cleared: SaveTransaction.ClearedEnum.Cleared, // TODO map UBS transaction status to YNAB transaction status
        approved: false,
        import_id: transaction._id,
      };
    });
    return ynabTransactions;
  }
}
