import ora from 'ora';
import { CommandBase } from '../command.base';

export default class YnabBudgetsCommand extends CommandBase {
  static override description = 'Lists all budgets of the authenticated user.';

  private readonly spinner: ora.Ora = ora();

  async run(): Promise<void> {
    this.spinner.start('Retrieving budgets from YNAB');
    const budgets = await this.context.ynab.retrieveBudgets();
    this.spinner.stop();

    console.log('budgets', budgets);
  }
}
