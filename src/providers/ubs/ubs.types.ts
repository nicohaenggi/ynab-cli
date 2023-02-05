export type UBSTransaction = {
  _id: string;
  cardNr?: string;
  productName?: string;
  transactionNr: string;
  bookedAccountId: string;
  transactionStatus: 'BOOKED' | 'RESERVED';
  exchangeRate?: string;
  exchangeRateDate?: string;
  effectiveExchangeRate?: string;
  settledInInvoice: boolean;
  merchantName?: string;
  details: string;
  valueDate: string;
  transactionDate: string;
  originalAmount: { amount: string; currency: string }; // TODO enum
  postingAmount: { amount: string; currency: string }; // TODO enum
  _links?: { self: [object] };
};
