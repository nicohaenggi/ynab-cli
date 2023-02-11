import { Command } from '@oclif/core';
import { Context } from '../context';

export abstract class CommandBase extends Command {
  private _context: Context | undefined;

  get context(): Context {
    if (!this._context) this._context = new Context();
    return this._context;
  }
}
