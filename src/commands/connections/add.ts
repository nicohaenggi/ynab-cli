import { prompt } from 'inquirer';
import ora from 'ora';
import { CommandBase } from '../command.base';

export default class ConnectionsAddCommand extends CommandBase {
  static override description = 'Adds a new integration connection.';

  private readonly spinner: ora.Ora = ora();

  async run(): Promise<void> {
    const budgets = await this.context.ynab.listBudgets();
    const { budget } = await prompt<{ budget: string }>({
      name: 'budget',
      type: 'list',
      message: 'What budget do you want to add a connection for?',
      choices: budgets.map((budget) => ({ name: budget.name, value: budget.id })),
    });

    const accounts = await this.context.ynab.listAccounts(budget);
    const { account } = await prompt<{ account: string }>({
      name: 'account',
      type: 'list',
      message: 'What account do you want to add a connection for?',
      choices: accounts.map((account) => ({ name: account.name, value: account.id })),
    });

    const { provider } = await prompt<{ provider: string }>({
      name: 'provider',
      type: 'list',
      message: 'What provider do you want to connect to?',
      choices: [{ name: 'JSON', value: 'json' }],
    });

    const { name } = await prompt<{ name: string }>({
      name: 'name',
      type: 'input',
      message: 'What name do you want to give to this connection?',
    });

    const wasAdded = await this.context.connection.addConnection({ name, budget, account, provider });
    if (!wasAdded) {
      this.spinner.fail('Failed to add connection.');
      return this.exit(1);
    }

    this.spinner.succeed(`Successfully added connection. Run 'ynab-cli sync run' to synchronize your transactions.`);
  }
}
