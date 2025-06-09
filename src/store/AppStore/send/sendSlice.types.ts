// import { SendUser } from '@features/send/types/send.types';

import { SendUser } from 'src/services';

export interface SetAmountAndRemarksPayload {
  transaction_amount: number;
  transactionAmountWithFees: number;
  fees: number;
}

export interface ZellePayload {
  username: string;
  entity_id: string;
}

export interface InternationalPayoutIDPayload {
  foreign_payout_beneficiary_id: string;
  beneficiary_currency: string;
  beneficiary_country: string;
}

export interface InternationalPayoutPayload {
  payout_initiation_id: string,
  transaction_time: string,
}

export interface InternationalCountryPayload {
  countryName: string;
  countryCode: string;
}

export interface TransactionCategoryPayload {
  transaction_category: string;
  transaction_category_id: number;
  category_emoji: string;
}


export interface USDWithdrawalPayload {
  usWithdrawal_label: string;
  usWithdrawal_name: string;
  usWithdrawal_account: string;
  usWithdrawal_routing: string;
  usWithdrawal_type: string;
  usWithdrawal_username: string;
  usWithdrawal_card_number: string;
  usWithdrawal_expiry_month: string;
  usWithdrawal_expiry_year: string;
  usWithdrawal_usd_beneficiary_id: string;
}

export interface SendState {
  username: string;
  account_name: string;
  transaction_amount: number;
  transactionAmountWithFees: number;
  fees: number;
  transaction_remarks: string;
  transaction_pin: string | null;
  foreign_payout_beneficiary_id: string;
  beneficiary_currency: string;
  beneficiary_country: string;
  payout_initiation_id: string;
  transaction_time: string;
  countryName: string;
  countryCode: string;
}

export interface SendActions {
  selectUser: (user: SendUser) => void;
  setAmountAndRemarks: (payload: SetAmountAndRemarksPayload) => void
  setTransactionPin: (pin: string) => void
  setInternationalPayoutID: (payload: InternationalPayoutIDPayload) => void
  setInternationalPayout: (payload: InternationalPayoutPayload) => void
  setInternationalPayoutCountry: (payload: InternationalCountryPayload) => void
  reset: () => void
}

export const initialSendState: SendState = {
  account_name: '',
  username: '',
  transaction_amount: 0,
  transactionAmountWithFees: 0,
  fees: 0,
  transaction_remarks: '',
  transaction_pin: null,
  foreign_payout_beneficiary_id: '',
  beneficiary_currency: '',
  beneficiary_country: '',
  payout_initiation_id: '',
  transaction_time: '',
  countryName: '',
  countryCode: '',
};

export interface SendSlice
  extends SendState, SendActions {}

