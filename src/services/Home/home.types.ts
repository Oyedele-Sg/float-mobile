export type TransactionReportResponse = {
  pagination_details: PaginationDetails;
  transaction_reports: TransactionReport[];
};

export type TransactionReport = {
  transaction_amount: number;
  receiver_amount: number;
  currency: string;
  receiver_currency: string;
  transaction_remarks: string;
  transaction_reference: string;
  transaction_date_time: string;
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
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  transaction_status: TransactionStatus;
};

type TransactionStatus = {
  transaction_status: string;
  transaction_status_description: string;
  transaction_status_code: number;
  transaction_status_id: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
};

export type ServerUserData = {
  first_name: string,
  last_name: string,
  username: string,
  selfie_image: string,
  phone_number: string,
  gender: string,
  email: string,
  last_login: string,
  is_blocked: boolean,
  account_user_id: string
}

export interface SendUser {
	account_name: string;
	selfie_image: string;
	username: string;
}

export interface CountryFormDataInterface {
	[countryCode: string]: Field[];
}

export interface Field {
	name: string;
	type: string;
	required: boolean;
	enum?: string[];
	pattern?: string;
	const?: string;
	fields?: Field[];
}

export interface InternationalSendDataInterface {
	data: any;
	email: string;
	countryCode: string;
}

export interface ServerResponse {
	message: string;
	success: boolean;
	data: any;
}

export interface InternationalBeneficiariesResponse {
	pagination_details: PaginationDetails;
	beneficiaries: InternationalBeneficiary[];
}

export interface PaginationDetails {
	total_results: number;
	current_results_on_page: number;
	current_page: number;
	next_page: number;
	previous_page: number | null;
	total_pages: number;
}

export interface InternationalBeneficiary {
	foreign_payout_beneficiary_id: string;
	ranking: number;
	entity_foreign_payout_beneficiary_id: string;
	created_at: string;
	updated_at: string;
	foreign_payout_beneficiary: ForeignPayoutBeneficiary;
}

export interface ForeignPayoutBeneficiary {
	beneficiary_name: string;
	beneficiary_id: string;
	beneficiary_currency: string;
	beneficiary_country: string;
	beneficiary_creation_status: string;
	beneficiary_account_number: string;
	beneficiary_email: string;
	reference: string;
	beneficiary_bank_name: string;
	foreign_payout_beneficiary_id: string;
	created_at: string;
	updated_at: string;
}

export interface InternatioanlInitialPayoutResponse {
	account_user_id: string;
	foreign_payout_beneficiary_id: string;
	payout_id: string;
	description: string;
	reference: string;
	amount: number;
	fees: number;
	status: string; 
	payout_currency: string; 
	exchange_rate: number;
	payout_amount: number;
	final_status: string;
	charge: number;
	payout_initiation_id: string;
	created_at: string; // ISO 8601 date string
	updated_at: string; // ISO 8601 date string
	foreign_payout_beneficiary: ForeignPayoutBeneficiary;
}
