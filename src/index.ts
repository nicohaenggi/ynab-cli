import { VisecaProvider } from './providers/viseca/viseca.provider';

const main = async () => {
  const viseca = new VisecaProvider();
  await viseca.authenticate();
};

main();
