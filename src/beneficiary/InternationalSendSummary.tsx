import { CustomBox, CustomButton, CustomText } from '@/components';
import lookup from 'country-code-lookup';
import { formatNumber } from '@/lib/formatNumber';
import { InternatioanlInitialPayoutResponse } from '@/services';
import { useAppStore } from '@/store/AppStore';
import { TimerIcon } from '@assets/icons';
import getSymbolFromCurrency from 'currency-symbol-map';
import React from 'react';
import { useShallow } from 'zustand/shallow';

type PayoutSummaryModalProps = {
	initialPayoutData: InternatioanlInitialPayoutResponse;
	timer: string;
  onClose: () => void
};

export const InternationalSendSummaryModal = ({
	onClose,
	initialPayoutData,
	timer
}:  PayoutSummaryModalProps) => {
  const { account_name, setInternationalPayout, setAmountAndRemarks, beneficiary_country,  } =
		useAppStore(useShallow((state) => state.send));
	
	const country = lookup.byIso(beneficiary_country);

	return (
		<CustomBox paddingHorizontal={20} paddingVertical={32} flex={1}>
			<CustomBox flex={1} >
				<CustomBox>
					<CustomBox >
						<CustomText variant='T1824600' color='gray_950' mb={4}>
						Transaction Summary
						</CustomText>
					</CustomBox>

					<CustomBox gap={15} mt={16}>
						<CustomBox
							paddingBottom={12}
							borderBottomWidth={1}
							borderColor='gray_bg'
							flexDirection='row'
							alignItems='center'
							justifyContent='space-between'>
							<CustomText variant='T1420400' color='gray_950'>
								Payment destination
							</CustomText>
							<CustomText variant='T1420600' color='gray_950'>
								{country?.country}
							</CustomText>
						</CustomBox>
						<CustomBox
							paddingBottom={12}
							borderBottomWidth={1}
							borderColor='gray_bg'
							flexDirection='row'
							alignItems='center'
							justifyContent='space-between'>
							<CustomText variant='T1420400' color='gray_950'>
								Recipient Bank
							</CustomText>
							<CustomText variant='T1420600' color='gray_950'>
								{initialPayoutData.foreign_payout_beneficiary.beneficiary_bank_name}
							</CustomText>
						</CustomBox>

						<CustomBox
							paddingBottom={12}
							borderBottomWidth={1}
							borderColor='gray_bg'
							flexDirection='row'
							alignItems='center'
							justifyContent='space-between'>
							<CustomText variant='T1420400' color='gray_950'>
								Recipient Acc. No.
							</CustomText>
							<CustomText variant='T1420600' color='gray_950'>
								{initialPayoutData.foreign_payout_beneficiary.beneficiary_account_number}
							</CustomText>
						</CustomBox>

						<CustomBox
							paddingBottom={12}
							borderBottomWidth={1}
							borderColor='gray_bg'
							flexDirection='row'
							alignItems='center'
							justifyContent='space-between'>
							<CustomText variant='T1420400' color='gray_950'>
								Recipient Name
							</CustomText>
							<CustomText variant='T1420600' color='gray_950'>
								{account_name}
							</CustomText>
						</CustomBox>

						<CustomBox
							paddingBottom={12}
							borderBottomWidth={1}
							borderColor='gray_bg'
							flexDirection='row'
							alignItems='center'
							justifyContent='space-between'>
							<CustomText variant='T1420400' color='gray_950'>
								Recipient gets
							</CustomText>
							<CustomText variant='T1420600' color='blueText'>
							{getSymbolFromCurrency(initialPayoutData.payout_currency)}
							{formatNumber(initialPayoutData.payout_amount)}
							</CustomText>
						</CustomBox>

						<CustomBox
							paddingBottom={12}
							borderBottomWidth={1}
							borderColor='gray_bg'
							flexDirection='row'
							alignItems='center'
							justifyContent='space-between'>
							<CustomText variant='T1420400' color='gray_950'>
								Your sending
							</CustomText>
							<CustomText variant='T1420600' color='blueText'>
							$
							{formatNumber(initialPayoutData.amount)}
							</CustomText>
						</CustomBox>

						<CustomBox
							paddingBottom={12}
							borderBottomWidth={1}
							borderColor='gray_bg'
							flexDirection='row'
							alignItems='center'
							justifyContent='space-between'>
							<CustomText variant='T1420400' color='gray_950'>
								Fee
							</CustomText>
							<CustomText variant='T1420600' color='blueText'>
								$
							{formatNumber(initialPayoutData.fees)}
							</CustomText>
						</CustomBox>

						<CustomBox
							paddingBottom={12}
							borderBottomWidth={1}
							borderColor='gray_bg'
							flexDirection='row'
							alignItems='center'
							justifyContent='space-between'>
							<CustomText variant='T1420400' color='gray_950'>
								Exchange rate
							</CustomText>
							<CustomText variant='T1420600' color='gray_950'>
								$1 to{' '}
								{getSymbolFromCurrency(initialPayoutData.payout_currency)}
								{' '}
								{formatNumber(initialPayoutData.exchange_rate)}
							</CustomText>
						</CustomBox>

						<CustomBox
							paddingBottom={12}
							flexDirection='row'
							alignItems='center'
							justifyContent='space-between'>
							<CustomText variant='T1420400' color='gray_950'>
								Timer
							</CustomText>
							<CustomBox
								flexDirection='row'
								gap={8}
								paddingHorizontal={12}
								paddingVertical={4}
								borderRadius={16}
								bg='gray_bg'>
								<TimerIcon />
								<CustomText variant='T1420400' color='gray_950'>
									{timer}
								</CustomText>
							</CustomBox>
						</CustomBox>
					</CustomBox>
				</CustomBox>

				<CustomBox gap={16} mt={20}>
					<CustomButton
						onPress={() => {
							setInternationalPayout({
								payout_initiation_id: initialPayoutData.payout_initiation_id,
								transaction_time: initialPayoutData.created_at
							});
							setAmountAndRemarks({
								transaction_amount: initialPayoutData.amount,
								transactionAmountWithFees: initialPayoutData.payout_amount,
								fees: initialPayoutData.fees
							});
							onClose();
						}}
						label='Confirm' />
				</CustomBox>
			</CustomBox>
		</CustomBox>
	);
};
