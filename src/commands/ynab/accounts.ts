import Table from 'cli-table3';
import { prompt } from 'inquirer';
import ora from 'ora';
import { CommandBase } from '../command.base';

export default class YnabAccountsCommand extends CommandBase {
  static override description = 'Lists all accounts for the selected budget.';

  private readonly spinner: ora.Ora = ora();

  async run(): Promise<void> {
    this.spinner.start('Retrieving budgets from YNAB');
    const budgets = await this.context.ynab.listBudgets();
    this.spinner.stop();

    const { budget } = await prompt<{ budget: string }>([
      {
        name: 'budget',
        type: 'list',
        message: 'What budget do you want to list accounts for?',
        choices: budgets.map((budget) => ({ name: budget.name, value: budget.id })),
      },
    ]);
    const accounts = await this.context.ynab.listAccounts(budget);

    const table = new Table({ head: ['Name', 'Balance', 'Type', 'Identifier'] });
    table.push(...accounts.map((account) => [account.name, account.balance, account.type, account.id]));
    this.log(table.toString());
  }
}
