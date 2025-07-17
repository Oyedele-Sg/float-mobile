
import { useLocalSearchParams, useRouter } from "expo-router";
import { useShallow } from 'zustand/shallow';
import { useAppStore } from '@/store/AppStore';
import React from 'react';
import { CustomBox, CustomButton, CustomText, HomeLayoutWrapper, Screen } from '@/components';
import { GreenCheckIcon, MoneyWingsIcon } from '@assets/icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SuccessScreen() {
  const router = useRouter()
  const {
    reset,
  } = useAppStore(
    useShallow((state) => state.send)
  );

  return (
    <Screen preset="fixed" statusBarStyle="light-content">
      <LinearGradient
        colors={['#941009', '#120201']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        <CustomBox flex={1} pt={100} px={20}>
          <CustomBox gap={20}  justifyContent='center' alignItems='center' mb={200}>
            <GreenCheckIcon />
            <CustomText variant='T2434700' color='white'>Money Sent Successfully</CustomText>
          </CustomBox>

          <CustomButton
            colors='neutral_n800'
            label='Home'
            variant='white'
            onPress={() => {
              reset();
              router.replace('/home');
            }}
          />
        </CustomBox>
      </LinearGradient>
    </Screen>
  )
}