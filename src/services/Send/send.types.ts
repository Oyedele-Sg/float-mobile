
export interface InternationalFinalizePayoutParams {
	// transaction_pin: {
	// 	transaction_pin: string;
	// };
	payout_initiation_id: string;
}


export type TransactionStatus = {
  transaction_status: string;
  transaction_status_description: string;
  transaction_status_code: number;
  transaction_status_id: number;
  created_at: string; // ISO Date string
  updated_at: string; // ISO Date string
};

export type SendReport = {
  transaction_amount: number;
  receiver_amount: number;
  currency: string;
  receiver_currency: string;
  transaction_remarks: string;
  transaction_reference: string;
  transaction_date_time: string; // ISO Date string or custom format
  fee_amount: number;
  vat_amount: number;
  transaction_description: string;
  third_party_name: string;
  beneficiary_account_number: string;
  beneficiary_bank: string;
  beneficiary_bank_name: string;
  transaction_status_id: number;
  transaction_type: string;
  account_balance: number;
  account_user_id: string;
  beneficiary_country: string;
  transaction_report_id: string;
  created_at: string; // ISO Date string
  updated_at: string; // ISO Date string
  transaction_status: TransactionStatus;
};
