import { Args, Flags } from '@oclif/core';
import { CommandBase } from '../command.base';

export default class AuthLogoutCommand extends CommandBase {
  static override description = 'LOGOUT command';

  static override flags = {
    flag: Flags.string({ char: 'f', description: 'Required flag', required: true }),
  };

  static override args = {
    arg: Args.string({ description: 'Required arg', required: true }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(AuthLogoutCommand);
    this.log(`hello from 'AUTH LOGOUT'`, args, flags);
  }
}
