import { Args, Command, Flags } from '@oclif/core';
import express from 'express';
import open from 'open';
import { fetch } from 'undici';

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

    const app = express();
    let resolve: any;
    const p = new Promise((_resolve) => {
      resolve = _resolve;
    });
    app.get('/oauth', function (req, res) {
      resolve(req.query['code']);
      res.end('');
    });
    app.listen(80);

    open(
      `https://app.youneedabudget.com/oauth/authorize?client_id=eGgeAUn2fDv-kfv54XAOZfux0NX6KGxIz9qD9HhM9ek&redirect_uri=http%3A%2F%2Flocalhost%2Foauth&response_type=code`,
    );

    const code = await p;

    const response = await fetch(
      `https://app.youneedabudget.com/oauth/token?client_id=eGgeAUn2fDv-kfv54XAOZfux0NX6KGxIz9qD9HhM9ek&client_secret=xxxxxxxx&redirect_uri=http%3A%2F%2Flocalhost%2Foauth&grant_type=authorization_code&code=${code}`,
      { method: 'POST' },
    );

    const text = await response.text();
    const token = JSON.parse(text);

    this.log(`hello from 'AUTH LOGIN'`, args, flags);
  }
}
