
import { useLocalSearchParams, useRouter } from "expo-router";
import { useShallow } from 'zustand/shallow';
import { useAppStore } from '@/store/AppStore';
import React from 'react';
import { CustomBox, CustomButton, CustomText, HomeLayoutWrapper } from '@/components';
import { MoneyWingsIcon } from '@assets/icons';

export default function SuccessScreen() {
  const router = useRouter()
  const {
    reset,
  } = useAppStore(
    useShallow((state) => state.send)
  );

  return (
    <HomeLayoutWrapper backgroundColor='#941009'>
      <CustomBox flex={1} height={'100%'} justifyContent='space-between' pt={70} >
        
        <CustomBox justifyContent='center' alignItems='center' mb={200}>

          <MoneyWingsIcon/>
          <CustomText variant='T2434700' color='white'>Money sent Successfully</CustomText>

        </CustomBox>

        <CustomButton colors='neutral_n800' label='Home' variant='white' onPress={() => {
          reset()
          router.replace('/home')
        }}/>
      </CustomBox>
        
    </HomeLayoutWrapper>
  )
}