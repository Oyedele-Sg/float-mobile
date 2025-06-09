import {CustomBox, CustomButton, CustomInput, CustomText, HomeLayoutWrapper, Screen, UseBottomSheetView} from "../../../src/components";
import {useRouter} from "expo-router";
import { Formik } from 'formik';
import CountryFlag from 'react-native-country-flag';
import { useAppStore } from '@/store/AppStore';
import { useShallow } from 'zustand/shallow';
import { useEffect, useState } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { validateValues } from '@/lib/validateValues';
import { InternationalFinalizePayout, SendInternationalInitialPayout, useGetRemittanceInternationalMinAmount } from '@/services/Send/sendServices';
import { useBottomSheetModalHook } from '@/hooks/useBottomSheetModal';
import { useMutation } from '@tanstack/react-query';
import { InternatioanlInitialPayoutResponse } from '@/services';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { InternationalSendSummaryModal } from '@/beneficiary/InternationalSendSummary';
import { Keyboard } from 'react-native';

export default function SendAmountcreen() {
  const router = useRouter()
  const [amount, setAmount] = useState<string | number>(0);
  const [remittanceAmount, setRemittanceAmount] = useState<number>(0);
  const [isActive, setActive] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(121);
  const [hasFinalized, setHasFinalized] = useState(false);
  const [initialPayoutData, setInitialPayoutData] =		useState<InternatioanlInitialPayoutResponse>();
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
  
  const remittanceMinAmountApi = useGetRemittanceInternationalMinAmount(beneficiary_currency);

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
      // displayInfoMessage(
      //   'Wait Time Elasped',
      //   'Please Initiate Another Transaction',
      //   1200,
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

  useEffect(() => {
    if (transaction_pin && !hasFinalized) {
      setHasFinalized(true);
      useInternationalFinalizePayout.mutate({
        payout_initiation_id: payout_initiation_id || '',
      });
    }
  }, [transaction_pin, hasFinalized]);
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
              // displayErrorMessage(
              //   'Invalid Amount',
              //   "Amount can't be less than Minimum Remittance Amount",
              // );
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
                  name='amount' placeholder='0.00' />
                </CustomBox>
              
              <CustomBox mb={22}>
                <CustomButton
                  disabled={!validateValues(values)}
                  loading={remittanceMinAmountApi.isLoading ||
                    useInternationalInitialPayout.isPending || 
                    useInternationalFinalizePayout.isPending
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
            router.push('/paymentmodals')
          }}
        />
      </BottomSheetModal>
    </HomeLayoutWrapper>
    )
}
