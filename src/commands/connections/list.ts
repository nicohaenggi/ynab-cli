import Table from 'cli-table3';
import { CommandBase } from '../command.base';

export default class ConnectionsListCommand extends CommandBase {
  static override description = 'Lists all connections.';

  async run(): Promise<void> {
    const connections = await this.context.connection.listConnections();

    const table = new Table({ head: ['ID', 'Name', 'Provider', 'Budget', 'Account', 'Last synced'] });
    table.push(
      ...connections.map((connection) => [
        connection.id,
        connection.name,
        connection.provider,
        connection.budget,
        connection.account,
        connection.lastSynced?.toISOString() ?? 'never',
      ]),
    );
    this.log(table.toString());
  }
}
