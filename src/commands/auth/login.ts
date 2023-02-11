import { prompt } from 'inquirer';
import ora from 'ora';
import { CommandBase } from '../command.base';

export default class AuthLoginCommand extends CommandBase {
  static override description = 'Authenticates an user with YNAB.';

  private readonly spinner: ora.Ora = ora();

  async run(): Promise<void> {
    // make sure we don't accidentally overwrite an existing session
    this.spinner.start('Checking if already authenticated');
    const isAuthenticated = await this.context.auth.isAuthenticated();
    this.spinner.stop();
    if (isAuthenticated) {
      const { shouldContinue } = await prompt<{ shouldContinue: boolean }>({
        name: 'shouldContinue',
        type: 'confirm',
        message: 'Already authenticated. Do you want to continue?',
      });
      if (!shouldContinue) this.exit(1);
    }

    // authenticate with one of the supported methods
    const answers = await prompt<{ method: 'accessToken' | 'oauth'; accessToken: string }>([
      {
        name: 'method',
        type: 'list',
        message: 'How do you want to authenticate?',
        choices: [
          { name: 'Personal Access Token', value: 'accessToken' },
          { name: 'OAuth', value: 'oauth' },
        ],
      },
      {
        name: 'accessToken',
        type: 'password',
        message: 'Enter your personal access token',
        when: (answers) => answers.method === 'accessToken',
      },
    ]);

    const error = answers.method === 'oauth' ? await this.runOAuthLoginFlow() : await this.runAccessTokenLoginFlow(answers.accessToken);
    if (error) {
      this.spinner.fail(error);
      this.exit(1);
    }

    this.spinner.succeed('Authenticated successfully. You can now start using the CLI.');
  }

  private async runOAuthLoginFlow(): Promise<string | undefined> {
    // TODO: implement OAuth authentication login flow
    return 'OAuth authentication is not supported yet. Please open an issue on GitHub if you need this feature.';
  }

  private async runAccessTokenLoginFlow(accessToken: string): Promise<string | undefined> {
    this.spinner.start('Authenticating with access token');
    const isSuccess = await this.context.auth.authenticateWithAccessToken(accessToken);
    if (!isSuccess) return 'Authentication failed. Please check your access token.';
  }
}
