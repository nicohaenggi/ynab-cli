import { existsSync, readFileSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { ConfigSchema } from './config.schema';

export class ConfigService {
  private static readonly CONFIG_FILE_NAME = 'config.json';

  private static readonly DEFAULT_CONFIG: ConfigSchema = {
    authentication: undefined,
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

  public setAccessToken(token: string) {
    this.config.authentication = {
      accessToken: token,
    };
  }

  public clearSession() {
    this.config.authentication = undefined;
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
