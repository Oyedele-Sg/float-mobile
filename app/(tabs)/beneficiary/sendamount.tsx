import {CustomBox, CustomButton, CustomInput, CustomText, HomeLayoutWrapper, Screen, UseBottomSheetView} from "../../../src/components";
import {Dimensions, Keyboard, Pressable} from "react-native";
import {useRouter} from "expo-router";
import { Formik } from 'formik';
import CountryFlag from 'react-native-country-flag';
import { useAppStore } from '@/store/AppStore';
import { useShallow } from 'zustand/shallow';
import { useEffect, useState } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { validateValues } from '@/lib/validateValues';
import { useGetRemittanceInternationalMinAmount } from '@/services/Home/homeServices';

export default function SendAmountcreen() {
  const router = useRouter()
  const [amount, setAmount] = useState<string | number>(0);
  const [remittanceAmount, setRemittanceAmount] = useState<number>(0);
  const { beneficiary_country, beneficiary_currency, reset } = useAppStore(
    useShallow((state) => state.send)
  );
  const remittanceMinAmountApi =		useGetRemittanceInternationalMinAmount(beneficiary_currency);

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
  return (
    <HomeLayoutWrapper backBt header={` How much do you want to send?`} preset='fixed' backFn={() => {
      reset();
      router.replace('/beneficiary');
    }}>
      <CustomBox flex={1}>
        <Formik
          initialValues={{
            amount: '',
          }}
          onSubmit={(values) => {
           console.log('value', amount);
            console.log('value 2', values.amount);
            if (Number(amount) < remittanceAmount) {
              // displayErrorMessage(
              //   'Invalid Amount',
              //   "Amount can't be less than Minimum Remittance Amount",
              // );
              return;
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
                    <CustomText  variant="T1422400" color="gray_950">Min ammount: {getSymbolFromCurrency(beneficiary_currency)}</CustomText>
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
                  // value={String(amount)}
                  name='amount' placeholder='0.00' />
                
                  
                </CustomBox>
              
              <CustomBox mb={22}>
                  <CustomButton disabled={!validateValues(values)} loading={remittanceMinAmountApi.isLoading} onPress={handleSubmit} label='Next' />
              </CustomBox>
              
            </CustomBox>
          )}
        </Formik>
      </CustomBox>
    </HomeLayoutWrapper>
    )
}
