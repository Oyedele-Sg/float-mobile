import { StateCreator } from 'zustand';
import { AppStore } from '../appStore.types';
import { initialSendState, InternationalPayoutIDPayload, SendSlice, SetAmountAndRemarksPayload } from './sendSlice.types';
import { passwordHash } from 'src/lib/encryptPassword';

export const createSendSlice: StateCreator<
AppStore,
[],
[],
SendSlice
> = (set) => ({
  ...initialSendState,
  selectUser: (user) => {
    set((state) => ({
      send: {
        ...state.send,
        account_name: user.account_name,
        selfie_image: user.selfie_image,
        username: user.username,
      },
    }));
  },
  setAmountAndRemarks: (payload: SetAmountAndRemarksPayload) => set((state) => ({
    send: {
      ...state.send,
      transaction_amount: payload.transaction_amount,
      transactionAmountWithFees: payload.transactionAmountWithFees,
      transaction_remarks: payload.transaction_remarks,
      fees: payload.fees,
    },
  })),
  setTransactionPin: (transaction_pin) => {
    const securePin = transaction_pin.length > 1
      ? passwordHash(transaction_pin)
      : null;

    set((state) => ({
      send: {
        ...state.send,
        transaction_pin: securePin,
      },
    }));
  },
  setInternationalPayoutID: (payload: InternationalPayoutIDPayload) =>
    set((state) => ({
      send: {
        ...state.send,
        foreign_payout_beneficiary_id: payload.foreign_payout_beneficiary_id,
        beneficiary_currency: payload.beneficiary_currency,
      },
    })),
  setInternationalPayout: (payload) =>
    set((state) => ({
      send: {
        ...state.send,
        payout_initiation_id: payload.payout_initiation_id,
        transaction_time: payload.transaction_time,
      },
    })),
  setInternationalPayoutCountry: (payload) =>
    set((state) => ({
      send: {
        ...state.send,
        countryName: payload.countryName,
        countryCode: payload.countryCode,
      },
    })),
  reset: () => {
    set((state) => ({
      send: {
        ...state.send,
        ...initialSendState,
      },
    }));
  },
});
