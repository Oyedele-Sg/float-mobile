
import { useLocalSearchParams, useRouter } from "expo-router";
import { useShallow } from 'zustand/shallow';
import { useAppStore } from '@/store/AppStore';
import React from 'react';
import { CustomBox, CustomButton, CustomText, HomeLayoutWrapper } from '@/components';
import { PhoneFailedIcon } from '@assets/icons';

export default function FaildScreen() {
  const router = useRouter()
  const { errorMessage } = useLocalSearchParams<{ errorMessage: string}>();
  const {
    reset,
  } = useAppStore(
    useShallow((state) => state.send)
  );

  return (
    <HomeLayoutWrapper backgroundColor='#000000'>
      <CustomBox flex={1} height={'100%'} justifyContent='space-between' borderWidth={1} pt={70} >
        
        <CustomBox justifyContent='center' alignItems='center' mb={200}>

          <PhoneFailedIcon/>
          <CustomText variant='T2434700' color='white'>Transaction Failed</CustomText>
          <CustomText variant='T1420600' textAlign='center' color='white'>{errorMessage || 'Please try again later' }</CustomText>

        </CustomBox>

        <CustomButton colors='neutral_n800' label='Home' variant='white' onPress={() => {
          reset()
          router.replace('/home')
        }}/>
      </CustomBox>
        
    </HomeLayoutWrapper>
  )
}