import { access, constants } from 'fs/promises';
import { prompt } from 'inquirer';
import ora from 'ora';

export class JsonProvider {
  static identifier = 'csv' as const;

  public async init() {
    const { path } = await prompt<{ path: string }>({
      name: 'path',
      type: 'input',
      message: 'Where is your transactions file located at?',
    });

    const spinner = ora().start('Checking existence of file');
    const doesFileExist = await access(path, constants.F_OK)
      .then(() => true)
      .catch(() => false);
    if (!doesFileExist) {
      spinner.fail('The file does not exist.');
      return undefined;
    }

    spinner.succeed('Checked existence of file.');
    return { path };
  }
}
