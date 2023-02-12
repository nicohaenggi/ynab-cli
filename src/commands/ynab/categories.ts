import Table from 'cli-table3';
import { prompt } from 'inquirer';
import ora from 'ora';
import { CommandBase } from '../command.base';

export default class YnabCategoriesCommand extends CommandBase {
  static override description = 'Lists all categories for the selected budget.';

  private readonly spinner: ora.Ora = ora();

  async run(): Promise<void> {
    this.spinner.start('Retrieving budgets from YNAB');
    const budgets = await this.context.ynab.listBudgets();
    this.spinner.stop();

    const { budget } = await prompt<{ budget: string }>([
      {
        name: 'budget',
        type: 'list',
        message: 'What budget do you want to list categories for?',
        choices: budgets.map((budget) => ({ name: budget.name, value: budget.id })),
      },
    ]);
    const categories = await this.context.ynab.listCategories(budget);

    const table = new Table({ head: ['Category', 'Assigned', 'Activity', 'Balance', 'Identifier'] });
    table.push(...categories.map((category) => [category.name, category.budgeted, category.activity, category.balance, category.id]));
    this.log(table.toString());
  }
}
