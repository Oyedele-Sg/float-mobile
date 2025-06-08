import {CustomBox, CustomButton, CustomPressable, CustomText, HomeLayoutWrapper, SkeletonPlaceholderItem, StyledInput} from "../../../src/components";
import CountryFlag from 'react-native-country-flag';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetInternationalBeneficiariesPaginated } from '@/services/Home/homeServices';
import { useShallow } from 'zustand/shallow';
import { useAppStore } from '@/store/AppStore';
import React, { useEffect, useState } from 'react';

export default function BeneficiaryScreen() {
  const router = useRouter()
  const { setInternationalPayoutID, selectUser } = useAppStore(
      useShallow((state) => state.send)
    );
  const {
    foreign_payout_beneficiary_id,
    beneficiary_currency,
    beneficiary_country,
    account_name,
    beneficiary_bank_name,
    beneficiary_account_number
  } = useLocalSearchParams<{
    foreign_payout_beneficiary_id: string,
    beneficiary_currency: string,
    beneficiary_country: string,
    account_name: string,
    beneficiary_bank_name: string,
    beneficiary_account_number: string,
  }>();


  return (
    <HomeLayoutWrapper header='Confirm Recipient Details' backBt backFn={() => {
      router.replace('/beneficiary');
    }}>
      <CustomBox py={20} flex={1} >
        <CustomBox
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          mt={5}
          py={16}
          borderBottomWidth={1}
          borderBottomColor='gray_bg'
          style={{
            marginBottom: 12.85
          }}>
          <CustomText variant='T1422500' color='gray_text'>
            Payment destination
          </CustomText>
          <CustomText textAlign='right'  variant='T1422600' color='headertext'>
            {beneficiary_country}
          </CustomText>
        </CustomBox>

        <CustomBox
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          mt={5}
          py={16}
          borderBottomWidth={1}
          borderBottomColor='gray_bg'
          style={{
            marginBottom: 12.85
          }}>
          <CustomText variant='T1422500' color='gray_text'>
            Recipient Bank
          </CustomText>
          <CustomText textAlign='right'  variant='T1422600' color='headertext'>
            {beneficiary_bank_name}
          </CustomText>
        </CustomBox>

        <CustomBox
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          mt={5}
          py={16}
          borderBottomWidth={1}
          borderBottomColor='gray_bg'
          style={{
            marginBottom: 12.85
          }}>
          <CustomText variant='T1422500' color='gray_text'>
            Recipient Acc. No.
          </CustomText>
          <CustomText textAlign='right'  variant='T1422600' color='headertext'>
            {beneficiary_account_number}
          </CustomText>
        </CustomBox>

        <CustomBox
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          mt={5}
          py={16}
          borderBottomWidth={1}
          borderBottomColor='gray_bg'
          style={{
            marginBottom: 12.85
          }}>
          <CustomText variant='T1422500' color='gray_text'>
            Recipient Name
          </CustomText>
          <CustomText textAlign='right'  variant='T1422600' color='headertext'>
            {account_name}
          </CustomText>
        </CustomBox>

        <CustomBox mt={22}>
          <CustomButton
            onPress={() => {
              setInternationalPayoutID({
                foreign_payout_beneficiary_id:
                  foreign_payout_beneficiary_id,
                beneficiary_currency:
                  beneficiary_currency,
                beneficiary_country:
                  beneficiary_country,
              });
              selectUser({
                account_name: account_name,
                username: account_name,
                selfie_image: ''
              });
              router.push('/beneficiary/sendamount')
            }}
            label='Confirm' />
      </CustomBox>

      </CustomBox>
        
    </HomeLayoutWrapper>
  )
}