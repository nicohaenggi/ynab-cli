import { Headers, fetch } from 'undici';

export const getTransactionsRequest = async (
  creditCardAccountIds: string,
  navajo: string,
  timePeriodFrom?: string,
  timePeriodTo?: string,
) => {
  const { UBS_API_KEY } = process.env;
  if (!UBS_API_KEY) {
    throw new Error('Missing UBS API KEY');
  }

  const headers = new Headers({
    Cookie: `NavLB_EBCH=ebanking-ch2.ubs.com; Navajo=${navajo};`,
    apikey: UBS_API_KEY,
  });

  const queryParams = new URLSearchParams({
    creditCardAccountIds,
    ...(timePeriodFrom && { timePeriodFrom }),
    ...(timePeriodTo && { timePeriodTo }),
  });

  const fetchUrl = `https://ebanking-ch2.ubs.com/api/v1/credit-card-transactions?${queryParams}`;

  return fetch(fetchUrl, {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  });
};
