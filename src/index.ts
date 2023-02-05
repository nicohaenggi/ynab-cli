import { UBSProvider } from './providers/ubs/ubs.provider';
import { YNABClient } from './ynab/ynab';

const main = async () => {
  const ynabClient = new YNABClient();
  const budgets = await ynabClient.getBudgets();
  const budget_id = budgets.data.budgets[0]?.id;
  if (!budget_id) {
    throw new Error('No budget found');
  }
  const accounts = await ynabClient.getAccounts(budget_id);
  const account_id = accounts.data.accounts[1]?.id;
  if (!account_id) {
    throw new Error('No account found');
  }

  const ubs = new UBSProvider();
  const transactions = await ubs.getTransactions();
  const transformedTransactions = await ubs.transformTransactions(account_id, transactions);

  try {
    ynabClient.createTransactions(budget_id, transformedTransactions);
  } catch (error) {
    console.error(error);
  }
};

main();
