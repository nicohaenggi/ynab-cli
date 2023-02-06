import { Args, Command, Flags } from '@oclif/core';

export default class AuthLoginCommand extends Command {
  static override description = 'LOGIN command';

  static override flags = {
    flag: Flags.string({ char: 'f', description: 'Required flag', required: true }),
  };

  static override args = {
    arg: Args.string({ description: 'Required arg', required: true }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(AuthLoginCommand);
    this.log(`hello from 'AUTH LOGIN'`, args, flags);
  }
}
