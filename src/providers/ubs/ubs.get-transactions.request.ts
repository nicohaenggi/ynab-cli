import { fetch, Headers } from 'undici';

export const getTransactionsRequest = async (creditCardAccountIds: string, navajo: string) => {
  const { UBS_API_KEY } = process.env;
  if (!UBS_API_KEY) {
    throw new Error('Missing environment variables');
  }

  const myHeaders = new Headers();
  myHeaders.append('Cookie', `NavLB_EBCH=ebanking-ch2.ubs.com; Navajo=${navajo};`);
  myHeaders.append('apikey', UBS_API_KEY);

  const fetch_url = `https://ebanking-ch2.ubs.com/api/v1/credit-card-transactions?creditCardAccountIds=${creditCardAccountIds}`;

  return fetch(fetch_url, {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  });
};
