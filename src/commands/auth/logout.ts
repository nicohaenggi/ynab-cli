import ora from 'ora';
import { CommandBase } from '../command.base';

export default class AuthLogoutCommand extends CommandBase {
  static override description = 'Logs out the currently authenticated user.';

  private readonly spinner: ora.Ora = ora();

  async run(): Promise<void> {
    this.spinner.start('Logging out');
    await this.context.auth.logout();
    this.spinner.succeed(`Logged out successfully. To login again, run 'ynab-cli auth login'.`);
  }
}
