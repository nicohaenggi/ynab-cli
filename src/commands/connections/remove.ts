import { prompt } from 'inquirer';
import ora from 'ora';
import { CommandBase } from '../command.base';

export default class ConnectionsRemoveCommand extends CommandBase {
  static override description = 'Removes a connection.';

  private readonly spinner: ora.Ora = ora();

  async run(): Promise<void> {
    const connections = await this.context.connection.listConnections();
    const { connection } = await prompt<{ connection: number }>({
      name: 'connection',
      type: 'list',
      message: 'Which connection do you want to remove?',
      choices: connections.map((connection) => ({ name: connection.name, value: connection.id })),
    });

    this.spinner.start('Removing connection');
    const wasRemoved = await this.context.connection.removeConnection(connection);
    if (!wasRemoved) {
      this.spinner.fail('Failed to remove connection.');
      return this.exit(1);
    }

    this.spinner.succeed('Successfully removed connection.');
  }
}
