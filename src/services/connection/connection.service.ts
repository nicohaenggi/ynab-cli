import { JsonProvider } from '../../providers';
import type { ConfigService } from '../config';

export class ConnectionService {
  constructor(private readonly config: ConfigService) {}

  public async listConnections() {
    const connections = this.config.connections;
    return connections.map((connection, index) => ({
      id: index + 1,
      name: connection.name,
      provider: connection.provider,
      budget: connection.budget,
      account: connection.account,
      lastSynced: connection.lastSynced,
    }));
  }

  public async addConnection(options: { name: string; budget: string; account: string; provider: string }): Promise<boolean> {
    const provider = new JsonProvider();
    const config = await provider.init();
    if (!config) return false;

    this.config.addConnection({
      name: options.name,
      provider: options.provider,
      budget: options.budget,
      account: options.account,
      lastSynced: null,
      config,
    });
    await this.config.save();
    return true;
  }

  public async removeConnection(id: number): Promise<boolean> {
    if (id < 0 || id > this.config.connections.length) return false;

    this.config.removeConnectionAtIndex(id - 1);
    await this.config.save();
    return true;
  }
}
