import {CustomBox, CustomButton, CustomInput, CustomText, HomeLayoutWrapper, Screen, UseBottomSheetView} from "../../../src/components";
import {useRouter} from "expo-router";
import { Formik } from 'formik';
import CountryFlag from 'react-native-country-flag';
import { useStripe, CardForm } from '@stripe/stripe-react-native';
import { useAppStore } from '@/store/AppStore';
import { useShallow } from 'zustand/shallow';
import { useEffect, useState } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { validateValues } from '@/lib/validateValues';
import { confirmUsdStripePayment, createUsdStripeIntent, GetStripeTransactionFee, InternationalFinalizePayout, SendInternationalInitialPayout, useGetRemittanceInternationalMinAmount } from '@/services/Send/sendServices';
import { useBottomSheetModalHook } from '@/hooks/useBottomSheetModal';
import { useMutation } from '@tanstack/react-query';
import { InternatioanlInitialPayoutResponse, StripeIntentResponse } from '@/services';
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { InternationalSendSummaryModal } from '@/beneficiary/InternationalSendSummary';
import { Keyboard, Platform } from 'react-native';
import { displayErrorMessage, displayInfoMessage, displaySuccessMessage } from '@/lib/toast';
import useScreenSnapshots from '@/hooks/useScreenSnapPoints';
import useKeyboard from '@/components/keyboardHeight';
import { formatNumber } from '@/lib/formatNumber';

function convertToUSD(amount: number, rate: number): number {
  if (isNaN(amount) || isNaN(rate) || rate <= 0) {
    throw new Error('Invalid amount or exchange rate');
  }
  return parseFloat((amount / rate).toFixed(2));
}

export default function SendAmountcreen() {
  const router = useRouter()
  const { createPaymentMethod } = useStripe();
  const { dismissAll } = useBottomSheetModal();

  const keyboardHeight = useKeyboard();
  const [stripeIntent, setStripeIntent] = useState<StripeIntentResponse | null>(
    null,
  );
  const [stripeFee, setStripeFee] = useState<number>(0);
  const [stripeValue, setStripeValue] = useState<number>(0);
  const [amount, setAmount] = useState<string | number>(0);
  const [isFormComplete, setIsFormComplete] =	useState<boolean>(false);
  const [isLoading, setIsLoading] =	useState<boolean>(false);
  const [remittanceAmount, setRemittanceAmount] = useState<number>(0);
  const [isActive, setActive] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(121);
  const [hasFinalized, setHasFinalized] = useState(false);
  const [initialPayoutData, setInitialPayoutData] = useState<InternatioanlInitialPayoutResponse>();
  const { first_name, last_name, email } = useAppStore(
    useShallow((state) => state.userData),
  );
  const {
    beneficiary_country,
    beneficiary_currency,
    reset,
    transaction_pin,
    setAmountAndRemarks,
    foreign_payout_beneficiary_id,
    payout_initiation_id
  } = useAppStore(
    useShallow((state) => state.send)
  );
  const user_kyc = {
    name: `${first_name} ${last_name}`,
    email,
  };
  const dynamicSnapPoints =		keyboardHeight > 0
    ? useScreenSnapshots(['72%', '72%'], ['72%', '72%']) // when keyboard open
    : useScreenSnapshots(['45%', '45%'], ['50%', '50%']);
  
  const remittanceMinAmountApi = useGetRemittanceInternationalMinAmount(beneficiary_currency);

  const useGetFees = useMutation({
    mutationFn: ({ transactionAmount }: { transactionAmount: number }) => GetStripeTransactionFee({
      transactionAmount,
    }),
    onSuccess: (data) => {
      if (data) {
        setStripeFee(data.fee);
        topUpSummaryPresentModal();
      }
    },
  });

  const handleProceed = async () => {
    Keyboard.dismiss();
    if (!initialPayoutData?.amount || !initialPayoutData?.fees) {
      displayInfoMessage(
        'invalid amount please restart the process again'
      );
      return;
    }
    const stripeAmount = initialPayoutData?.amount + initialPayoutData?.fees;
    setStripeValue(stripeAmount);

    useGetFees.mutate({
      transactionAmount: Math.ceil(stripeAmount),
    });
  };

  const useInternationalInitialPayout = useMutation({
      mutationFn: SendInternationalInitialPayout,
      onSuccess: (data) => {
        if (data) {
          console.log('DDDDDDD', data);
            setAmountAndRemarks({
              transaction_amount: Number(data.amount),
              transactionAmountWithFees: data.amount + data.fees,
              fees: data.fees,
            });
            setTimeLeft(121);
            setInitialPayoutData(data);
            interPayoutSummaryPresentModal();
        }
      }
    }
  );

  const useInternationalFinalizePayout = useMutation(
    {
      mutationFn: InternationalFinalizePayout,
      retry: false,
      onSuccess: (data) => {
        if (data) {
          console.log('COMPLETED PAYMENT', JSON.stringify(data, null, 2));
          router.push('/paymentmodals/success')
          reset()
        }
      },
      onError: (data: any) => {
        console.log('ERROR', data);
        // displaySuccessMessage('Payment Failed');
        displayErrorMessage('Failed')
        router.push({ pathname: '/paymentmodals/failed', params: { errorMessage: data.message} });
        // reset()
      },
    },
  );

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
  };

  const handleCardFormSubmit = async () => {
    Keyboard.dismiss();

    const dismissAfterKeyboard = () => {
      if (Platform.OS === 'android') {
        const subscription = Keyboard.addListener('keyboardDidHide', () => {
          dismissAll();
          subscription.remove();
        });
      } else {
        dismissAll();
      }
    };

    setIsFormComplete(false);
    setIsLoading(true);

    const { paymentMethod, error } = await createPaymentMethod({
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails: {
          name: user_kyc.name,
          email: user_kyc.email
        },
      }
    });

    dismissAfterKeyboard();

    if (error) {
      
      displayInfoMessage('Unable to create payment method');
      setIsLoading(false);
      return;
    }

    setIsLoading(false);

    if (paymentMethod?.id) {
      // setPaymentMethodId(paymentMethod.id);

      // router.push('/paymentmodals/success')
      
      // setStripeIntent(null);
      useCreateIntentApi.mutate({
        amount: stripeValue * 100,
        paymentMethodId: paymentMethod.id,
      });
    }
  };

  const useCreateIntentApi = useMutation({
    mutationFn: ({
      amount,
      paymentMethodId,
    }: {
      amount: number;
      paymentMethodId: string;
    }) => createUsdStripeIntent(amount, paymentMethodId),
    onSuccess: async (data) => {
      setStripeIntent(data);
      dismissCardFormModal();
      if (data) {
        useConfirmPaymentApi.mutate(data.payment_intent_id);
        
      }
    },
  });

  const useConfirmPaymentApi = useMutation({
    mutationFn: confirmUsdStripePayment,
    onSuccess: async (data) => {
      if (data) {
        useInternationalFinalizePayout.mutate({
          payout_initiation_id: payout_initiation_id || '',
        });
        
        setStripeIntent(null);
      }
    },
  });

  const {
    modalRef: cardFormModalRef,
    presentModal: presentCardFormModal,
    dismissModal: dismissCardFormModal,
    snapPoints: cardFormSnapPoints,
    renderBackdrop: cardFormBackdrop,
    handle: cardFormHandle,
  } = useBottomSheetModalHook({
    snapPoints: dynamicSnapPoints,
    backdropPressBehavior: 'none',
  });
  
  const {
    modalRef: interPayoutSummaryModal,
    presentModal: interPayoutSummaryPresentModal,
    snapPoints: interPayoutSummarySnapPoints,
    dismissModal: interPayoutSummaryModalDismiss,
    renderBackdrop: interPayoutSummaryRenderBackdrop,
    handle,
  } = useBottomSheetModalHook({
    snapPoints: ['75%', '75%'],
    backdropPressBehavior: 'none',
  });

  const {
    modalRef: topUpSummaryModal,
    presentModal: topUpSummaryPresentModal,
    snapPoints: summarySnapPoints,
    renderBackdrop: summaryBackdrop,
    dismissModal: topUpDismissModal,
    // handle,
  } = useBottomSheetModalHook({
    snapPoints: useScreenSnapshots(
      ['45%', '45%'],
      ['45%', '45%'],
    ),
    backdropPressBehavior: 'close',
  });

  useEffect(() => {
    if (
      !remittanceMinAmountApi.isLoading
			&& remittanceMinAmountApi.data
    ) {
      setRemittanceAmount(remittanceMinAmountApi.data);
    }
  }, [
    remittanceMinAmountApi.isLoading,
    remittanceMinAmountApi.data,
  ]);

  useEffect(() => {
    if (timeLeft <= 1) {
      // displayErrorMessage(
      //   'Wait Time Elasped: Please Initiate Another Transaction'
      // );
      interPayoutSummaryModalDismiss();
    }
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          setActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);
  }, [isActive, timeLeft]);

  // useEffect(() => {
  //   if (transaction_pin && !hasFinalized) {
  //     setHasFinalized(true);
  //     useInternationalFinalizePayout.mutate({
  //       payout_initiation_id: payout_initiation_id || '',
  //     });
  //   }
  // }, [transaction_pin, hasFinalized]);
  return (
    <HomeLayoutWrapper backBt header={`How much do you want to send?`} preset='fixed' backFn={() => {
      reset();
      router.replace('/beneficiary');
    }}>
      <CustomBox flex={1}>
        <Formik
          initialValues={{
            amount: '',
          }}
          onSubmit={(values) => {
            Keyboard.dismiss()
           console.log('value', amount);
            console.log('value 2', values.amount);
            if (Number(amount) < remittanceAmount) {
              displayErrorMessage(
                "Amount can't be less than Minimum Remittance Amount",
              );
              return;
            }
            if (foreign_payout_beneficiary_id) {
              const data = {
                foreign_payout_beneficiary_id,
                amount: Number(amount),
              };
              useInternationalInitialPayout.mutate(data);
            }
          }}
        >
          {({ handleSubmit, setValues, values }) => (
            <CustomBox  flex={1} gap={10} mt={20} justifyContent='space-between'>
              <CustomBox flex={1} >
                <CustomBox  mb={8} justifyContent='space-between' flexDirection='row'>
                  <CustomBox alignItems='center' flexDirection='row' gap={8}>
                    <CountryFlag isoCode={beneficiary_country} size={15} />
                    <CustomText  variant="T1422400" color="gray_950">{beneficiary_currency}</CustomText>
                  </CustomBox>
                  <CustomBox flexDirection='row' gap={1}>
                    <CustomText  variant="T1422400" color="gray_950">Min amount: {getSymbolFromCurrency(beneficiary_currency)}</CustomText>
                    <CustomText variant="T1422400" color="gray_950">{remittanceAmount}</CustomText>
                  </CustomBox>
                </CustomBox>
                <CustomInput
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    // Remove all characters except digits and decimal point
                    let sanitizedValue = value.replace(/[^0-9.]/g, '');
                    // Prevent multiple dots
                    const parts = sanitizedValue.split('.');
                    if (parts.length > 2) {
                      sanitizedValue = parts[0] + '.' + parts[1]; // Trim to first dot and decimals
                    }
                    // Enforce max 2 decimal places
                    if (parts.length === 2 && parts[1].length > 2) {
                      sanitizedValue = parts[0] + '.' + parts[1].slice(0, 2);
                    }
                    setAmount(sanitizedValue);
                    setValues({amount: sanitizedValue});
                  }}
                  name='amount'
                  placeholder='0.00' />
                </CustomBox>
              
              <CustomBox mb={22}>
                <CustomButton
                  disabled={!validateValues(values)}
                  loading={remittanceMinAmountApi.isLoading ||
                    useInternationalInitialPayout.isPending || 
                    useInternationalFinalizePayout.isPending || 
                    useGetFees.isPending ||
                    useCreateIntentApi.isPending ||
                    isLoading ||
                    useConfirmPaymentApi.isPending
                  }
                  onPress={handleSubmit} label='Next' />
              </CustomBox>
              
            </CustomBox>
          )}
        </Formik>
      </CustomBox>
      <BottomSheetModal
        name="interPayoutSummaryModal"
        ref={interPayoutSummaryModal}
        index={1}
        snapPoints={interPayoutSummarySnapPoints}
        handleComponent={handle}
        backdropComponent={interPayoutSummaryRenderBackdrop}
      >
        <InternationalSendSummaryModal
          initialPayoutData={initialPayoutData!}
          timer={formatTime(timeLeft)}
          onClose={() => {
            interPayoutSummaryModalDismiss();
            // router.push('/paymentmodals')
            handleProceed()
          }}
        />
      </BottomSheetModal>
      <BottomSheetModal
        name="topUpSummaryModal"
        ref={topUpSummaryModal}
        index={1}
        snapPoints={summarySnapPoints}
        handleComponent={handle}
        backdropComponent={summaryBackdrop}
      >
        <CustomBox
          paddingHorizontal={20}
          flex={1}
          justifyContent="space-between"
          paddingTop={40}
          paddingBottom={40}
        >
          <CustomBox>
            <CustomBox alignItems="center">
              <CustomText variant="T1624600" color="gray_950">
                Your Card Will be Debited With
              </CustomText>
              <CustomText variant="T1824600" color="gray_950">
                {getSymbolFromCurrency('usd')}
                {formatNumber(stripeValue + stripeFee / 100)}
              </CustomText>
            </CustomBox>
            <CustomBox mb={16}>
              <CustomBox
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                paddingTop={15}
                paddingBottom={12}
                borderBottomWidth={1}
                borderBottomColor="gray_bg"
              >
                <CustomText variant="T1420400" color="gray_950">
                  Amount
                </CustomText>
                <CustomText variant="T1420400" color="gray_950">
                  {getSymbolFromCurrency('usd')}
                  {formatNumber(stripeValue)}
                </CustomText>
              </CustomBox>
              <CustomBox
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                paddingTop={15}
                paddingBottom={12}
              >
                <CustomText variant="T1420400" color="gray_950">
                  Card Fee
                </CustomText>
                <CustomText variant="T1420400" color="gray_950">
                  {getSymbolFromCurrency('usd')}
                  {formatNumber(stripeFee / 100)}
                </CustomText>
              </CustomBox>
            </CustomBox>
          </CustomBox>

          <CustomBox gap={12}>
            <CustomButton
              variant='plain'
              onPress={() => {
                topUpDismissModal();
                // Open Card Form BottomSheet
                presentCardFormModal();
              }}
              label='Top up' />
            <CustomButton
              onPress={() => {
                setStripeFee(0);
                topUpDismissModal();
              }}
              label='Cancel' />

          </CustomBox>
        </CustomBox>
      </BottomSheetModal>
      <BottomSheetModal
        name="cardFormModal"
        ref={cardFormModalRef}
        index={0}
        snapPoints={cardFormSnapPoints}
        handleComponent={cardFormHandle}
        backdropComponent={cardFormBackdrop}
      >
        <CustomBox paddingHorizontal={20} flex={1} paddingTop={20}>
          <CardForm
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={{ height: Platform.OS === 'ios' ? 180 : 260 }}
            onFormComplete={(cardDetails) => {
              setIsFormComplete(cardDetails.complete);
            }}
          />

          <CustomBox mt={20}>
            <CustomButton
              size="big"
              variant='plain'
              label="Proceed With Payment"
              disabled={!isFormComplete}
              loading={
                useCreateIntentApi.isPending
                || isLoading
              }
              onPress={() => {
                void handleCardFormSubmit();
              }}
            />
          </CustomBox>
        </CustomBox>
      </BottomSheetModal>
    </HomeLayoutWrapper>
    )
}
