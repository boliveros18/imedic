export interface Payout {
  _id?: string;
  parent_id: string;
  routing_number: string;
  account_number: string;
  bank_code: string;
  bank_account_type: string;
  country: string;
}
