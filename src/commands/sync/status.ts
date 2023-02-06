import { Args, Command, Flags } from '@oclif/core';

export default class SyncStatusCommand extends Command {
  static override description = 'STATUS command';

  static override flags = {
    flag: Flags.string({ char: 'f', description: 'Required flag', required: true }),
  };

  static override args = {
    arg: Args.string({ description: 'Required arg', required: true }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(SyncStatusCommand);
    this.log(`hello from 'SYNC STATUS'`, args, flags);
  }
}
