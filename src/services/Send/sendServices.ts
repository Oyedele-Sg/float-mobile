import { AuthAxios } from '@/lib/axios';
import { InternationalFinalizePayoutParams, SendReport, StripeIntentResponse } from './send.types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { InternatioanlInitialPayoutResponse } from '../Home';


export async function GetRemittanceInternationalMinAmount({
  queryKey,
}: QueryFunctionContext<ReturnType<any>>): Promise<number> {
  const [, currency] = queryKey;
  const response = await AuthAxios.get(
    `/transactions/remittance/account-types/minimum-amount/?currency=${currency}`,
  );
  return response.data;
}

export function useGetRemittanceInternationalMinAmount(currency: string) {
  return useQuery({
    queryKey: ['interremittanceminamount', currency],
    queryFn: GetRemittanceInternationalMinAmount,
    enabled: Boolean(currency),
  });
}

export async function SendInternationalInitialPayout(data: {
  foreign_payout_beneficiary_id: string;
  amount: number;
}): Promise<InternatioanlInitialPayoutResponse> {
  const response = await AuthAxios.post(
    '/transactions/remittance/payout/initiate/',
    data,
  );
  return response.data;
}

export async function InternationalFinalizePayout(
  data: InternationalFinalizePayoutParams,
): Promise<SendReport> {
  const response = await AuthAxios.post(
    `/transactions/remittance/payout/finalize/?payout_initiation_id=${data.payout_initiation_id}`
  );
  return response.data;
}

export async function createUsdStripeIntent(amount: number, paymentMethodId: string): Promise<StripeIntentResponse> {
  const response = await AuthAxios.post(
    '/transactions/topup/usd/create-intent/',
    {
      currency: 'usd',
      transaction_amount: amount,
      payment_method_id: paymentMethodId,
    },
  );
  return response.data;
}

export async function confirmUsdStripePayment(payment_intent: string): Promise<any> {
  const response = await AuthAxios.post(
    '/transactions/topup/usd/confirm-intent/',
    {
      currency: 'USD',
      payment_intent,
    },
  );
  return response.data;
}

export async function GetStripeTransactionFee({
	transactionAmount
}: {
	transactionAmount: number
}): Promise<{fee: number}> {
	const response = await AuthAxios.get(
		`/transactions/topup/usd/stripe/fee/?transaction_amount=${transactionAmount}`
	);
	return response.data;
}
