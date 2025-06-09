
import {CustomBox, CustomButton, CustomText, HomeLayoutWrapper } from "../../../src/components";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { formatNumbertoTwo } from '@/lib/formatNumber';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import { View } from 'react-native';
import { displaySuccessMessage } from '@/lib/toast';

interface TransactionReportParams {
  transaction_amount?: number;
  beneficiary_country?: string;
  transaction_reference?: string;
  beneficiary_bank_name?: string;
  beneficiary_account_number?: string;
  third_party_name?: string;
  fee_amount?: number;
  transaction_date_time?: string;
  currency?: string;
}

export default function TransactionreceiptScreen() {
  const router = useRouter()
  const {
    transaction_amount,
    beneficiary_country,
    transaction_reference,
    beneficiary_bank_name,
    beneficiary_account_number,
    third_party_name,
    fee_amount,
    transaction_date_time,
    currency
  } = useLocalSearchParams() as unknown as TransactionReportParams;

  const viewRef = useRef(null);

  const shareImage = async () => {
		try {
			const uri = await captureRef(viewRef, {
				// result: 'tmpfile',
				quality: 1,
				format: 'png'
			});

			await Share.open({ url: uri });
    } catch (err) {
      console.log('Error capturing view:', err);
			//
		}
	};

  return (
    <HomeLayoutWrapper header='Confirm Recipient Details' backBt >
      <CustomBox collapsable={false} ref={viewRef}   py={20} px={5} flex={1} >
        <CustomBox mb={20}>
          <CustomText variant='T2434700' color='secondary_red'>
            {getSymbolFromCurrency(currency as string)} {formatNumbertoTwo(transaction_amount!)}
          </CustomText>
          <CustomText variant='T1422500' color='gray_text'>
            Today, 5:20pm{transaction_date_time}
          </CustomText>
        </CustomBox>

        <CustomBox
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          mt={5}
          py={10}
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
          py={10}
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
          py={10}
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
          py={10}
          borderBottomWidth={1}
          borderBottomColor='gray_bg'
          style={{
            marginBottom: 12.85
          }}>
          <CustomText variant='T1422500' color='gray_text'>
            Recipient Name
          </CustomText>
          <CustomText textAlign='right'  variant='T1422600' color='headertext'>
            {third_party_name}
          </CustomText>
        </CustomBox>

        <CustomBox
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          mt={5}
          py={10}
          borderBottomWidth={1}
          borderBottomColor='gray_bg'
          style={{
            marginBottom: 12.85
          }}>
          <CustomText variant='T1422500' color='gray_text'>
            Reference ID
          </CustomText>
          <CustomText textAlign='right'  variant='T1422600' color='headertext'>
            {transaction_reference}
          </CustomText>
        </CustomBox>

        <CustomBox
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          mt={5}
          py={10}
          borderBottomWidth={1}
          borderBottomColor='gray_bg'
          style={{
            marginBottom: 12.85
          }}>
          <CustomText variant='T1422500' color='gray_text'>
            Fee
          </CustomText>
          <CustomText textAlign='right' variant='T1422600' color='secondary_red'>
            {getSymbolFromCurrency(currency as string)}
            {formatNumbertoTwo(fee_amount!)}
          </CustomText>
        </CustomBox>


      </CustomBox>

      <CustomBox mt={22}>
        <CustomButton
          onPress={() => {
            // displaySuccessMessage('Transaction Successful');
            void shareImage();
          }}
          label='Share Receipt' />
      </CustomBox>
        
    </HomeLayoutWrapper>
  )
}