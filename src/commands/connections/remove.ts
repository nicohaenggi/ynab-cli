import { Args, Flags } from '@oclif/core';
import { CommandBase } from '../command.base';

export default class ConnectionsRemoveCommand extends CommandBase {
  static override description = 'REMOVE command';

  static override flags = {
    flag: Flags.string({ char: 'f', description: 'Required flag', required: true }),
  };

  static override args = {
    arg: Args.string({ description: 'Required arg', required: true }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(ConnectionsRemoveCommand);
    this.log(`hello from 'CONNECTIONS REMOVE'`, args, flags);
  }
}
