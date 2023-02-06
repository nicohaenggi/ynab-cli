import { Args, Command, Flags } from '@oclif/core';

export default class AuthWhoamiCommand extends Command {
  static override description = 'WHOAMI command';

  static override flags = {
    flag: Flags.string({ char: 'f', description: 'Required flag', required: true }),
  };

  static override args = {
    arg: Args.string({ description: 'Required arg', required: true }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(AuthWhoamiCommand);
    this.log(`hello from 'AUTH WHOAMI'`, args, flags);
  }
}
