import { Command } from '@oclif/core';
import ora from 'ora';
import { context } from '../../context';

export default class YnabBudgetsCommand extends Command {
  static override description = 'Lists all budgets of the authenticated user.';

  private readonly spinner: ora.Ora = ora();

  async run(): Promise<void> {
    this.spinner.start('Retrieving budgets from YNAB');
    const budgets = await context.ynab.retrieveBudgets();
    this.spinner.stop();

    console.log('budgets', budgets);
  }

  override async catch(error: any) {
    throw error;
  }
}
