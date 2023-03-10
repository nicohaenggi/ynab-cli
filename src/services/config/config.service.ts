import { existsSync, readFileSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { ConfigSchema } from './config.schema';

export class ConfigService {
  private static readonly CONFIG_FILE_NAME = 'config.json';

  private static readonly DEFAULT_CONFIG: ConfigSchema = {
    authentication: null,
    connections: [],
  };

  private readonly configFilePath: string;

  private readonly config: ConfigSchema;

  constructor(private readonly configDirectory: string) {
    this.configFilePath = join(this.configDirectory, ConfigService.CONFIG_FILE_NAME);
    this.config = this.loadConfig();
  }

  public get accessToken(): string | undefined {
    return this.config.authentication?.accessToken;
  }

  public get connections(): ConfigSchema['connections'] {
    return this.config.connections;
  }

  public setAccessToken(token: string) {
    this.config.authentication = {
      accessToken: token,
    };
  }

  public clearSession() {
    this.config.authentication = null;
  }

  public addConnection(connection: ConfigSchema['connections'][number]) {
    this.config.connections.push(connection);
  }

  public removeConnectionAtIndex(index: number) {
    this.config.connections.splice(index, 1);
  }

  public async save(): Promise<void> {
    await mkdir(this.configDirectory, { recursive: true });
    await writeFile(this.configFilePath, JSON.stringify(this.config, null, 2));
  }

  private loadConfig(): ConfigSchema {
    const isConfigPresent = existsSync(this.configFilePath);
    if (!isConfigPresent) return ConfigService.DEFAULT_CONFIG;
    return ConfigSchema.parse(JSON.parse(readFileSync(this.configFilePath, 'utf8')));
  }
}
