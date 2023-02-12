import Table from 'cli-table3';
import ora from 'ora';
import { CommandBase } from '../command.base';

export default class YnabBudgetsCommand extends CommandBase {
  static override description = 'Lists all budgets of the authenticated user.';

  private readonly spinner: ora.Ora = ora();

  async run(): Promise<void> {
    this.spinner.start('Retrieving budgets from YNAB');
    const budgets = await this.context.ynab.listBudgets();
    this.spinner.succeed(`Found ${budgets.length} budgets on YNAB`);

    const table = new Table({ head: ['Name', 'Identifier', 'Last modified'] });
    table.push(...budgets.map((budget) => [budget.name, budget.id, budget.lastModified?.toISOString()]));
    this.log(table.toString());
  }
}
