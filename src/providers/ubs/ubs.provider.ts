import Big from 'big.js';
import { SaveTransaction } from 'ynab';
import { getTransactionsRequest } from './ubs.get-transactions.request';
import { mock } from './ubs.transactions.mock';
import type { UBSTransaction } from './ubs.types';

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

  async getTransactions(timePeriodFrom?: string, timePeriodTo?: string) {
    console.log('Fetching transactions...');
    let transactions: UBSTransaction[];
    if (!mock_data) {
      const response = await getTransactionsRequest(this.creditCardAccountIds, this.navajo, timePeriodFrom, timePeriodTo);
      if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
        throw new Error('Failed to fetch transactions');
      }
      const text = await response.text();
      transactions = JSON.parse(text)._embedded.transactions ?? [];
    } else {
      transactions = mock;
    }
    return transactions;
  }

  async transformTransactions(accountId: string, transactions: UBSTransaction[]) {
    // Not booked transactions don't have an _id, so they would be imported multiple times
    // TODO check if we can use transactionNr instead of _id
    const filteredTransactions = transactions.filter((transaction) => transaction.transactionStatus === 'BOOKED');

    const ynabTransactions: SaveTransaction[] = filteredTransactions.map((transaction) => {
      const transactionAmount =
        transaction.transactionStatus === 'BOOKED' ? transaction.postingAmount.amount : transaction.originalAmount.amount;
      return {
        account_id: accountId,
        date: transaction.transactionDate,
        amount: new Big(transactionAmount).mul(1000).toNumber(),
        payee_name: transaction.details,
        cleared: transaction.transactionStatus === 'BOOKED' ? SaveTransaction.ClearedEnum.Cleared : SaveTransaction.ClearedEnum.Uncleared,
        approved: false,
        import_id: transaction._id,
      };
    });
    return ynabTransactions;
  }
}
