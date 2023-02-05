export type UBSTransaction = {
  _id: string;
  cardNr: string;
  productName: string;
  transactionNr: string;
  bookedAccountId: string;
  transactionStatus: string; // TODO enum
  settledInInvoice: boolean;
  merchantName: string;
  details: string;
  valueDate: string;
  transactionDate: string;
  originalAmount: { amount: string; currency: string }; // TODO enum
  postingAmount: { amount: string; currency: string }; // TODO enum
  // _links: { self: [Object] };
};
