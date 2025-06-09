
import { useRouter } from "expo-router";
import { useShallow } from 'zustand/shallow';
import { useAppStore } from '@/store/AppStore';
import React, { useCallback, useState } from 'react';
import { ButtonsGrid, CustomBox, CustomText, HomeLayoutWrapper, VerificationCode } from '@/components';
import { VerificationStatusType } from '@/components/verification-code/animated-code-number';
import Animated, { useSharedValue } from 'react-native-reanimated';

export default function PaymentSummaryModal() {
  const router = useRouter()
  const [code, setCode] = useState<number[]>([]);
  const verificationStatus = useSharedValue<VerificationStatusType>('inProgress');
  const maxCodeLength = 4;
  const { setTransactionPin } = useAppStore(useShallow((state) => state.send));

  const reset = useCallback(() => {
    setCode([]);
  }, []);

  const handleInput = (number: number) => {
    if (number >= 0 && number <= 10000) {
      const lastDigit = Math.abs(number) % 10;
      const newCode = [...code, lastDigit];

      if (newCode.length > maxCodeLength) {
        return;
      }

      setCode(newCode);
      verificationStatus.value = 'inProgress';

      if (newCode.length === maxCodeLength) {

        setTransactionPin(newCode.join(''));
        router.back()
      }
    }
  }

  return (
    <HomeLayoutWrapper  backBt>
      <CustomBox mb={100}>
        <CustomText variant="T1824600">Enter Pin</CustomText>
        <CustomText variant="T1420600" color='gray_text'>Enter your Four-Digit Password to confirm transaction</CustomText>
      </CustomBox>

      <CustomBox mb={20} paddingHorizontal={30}>
        <Animated.View>
          <VerificationCode
            code={code}
            maxLength={4}
            status={verificationStatus}
            hidden
            rounded
          />
        </Animated.View>
      </CustomBox>

      <ButtonsGrid
        input={Number(code.join(''))}
        maxLength={maxCodeLength}
        onUpdate={handleInput}
        onBackspace={() => setCode(code.slice(0, -1))}
        onReset={reset}
      />
        
    </HomeLayoutWrapper>
  )
}