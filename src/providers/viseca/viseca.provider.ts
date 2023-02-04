import { parse } from 'node-html-parser';
import { ProxyAgent, fetch } from 'undici';

const agent = new ProxyAgent('http://localhost:8888');

export class VisecaProvider {
  async authenticate(): Promise<void> {
    console.log('Authenticating with Viseca...');

    await this.triggerLoginFlow();
  }

  private async retrieveFormToken() {
    const result = await fetch('https://one-digitalservice.ch/login/login', {
      method: 'GET',
      redirect: 'manual',
      dispatcher: agent,
    });

    const document = parse(await result.text());
    const formInput = document.querySelector('input[name="FORM_TOKEN"]');
    return formInput?.getAttribute('value');
  }

  private async triggerLoginFlow() {
    const formToken = await this.retrieveFormToken();
    if (!formToken) throw new Error('Authentication failed.');

    const body = new URLSearchParams({
      FORM_TOKEN: formToken,
      USERNAME: 'random',
      PASSWORD: 'random',
    });

    const result = await fetch('https://one-digitalservice.ch/login/login', {
      method: 'POST',
      redirect: 'manual',
      dispatcher: agent,
      body,
    });

    console.log(result.status);
    console.log(result.headers.get('location'));
  }
}
