import React, {
  useCallback, useEffect, useState,
} from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import Animated, {
  useSharedValue,
} from 'react-native-reanimated';
import { ButtonsGrid } from '../buttons-grid';
import type { VerificationStatusType } from './animated-code-number';
import { VerificationCode } from './index';
import { useAnimatedShake } from '@/hooks/use-animated-shake';

type VerificationCodeScreenProps = {
  maxCodeLength: number;
  status: boolean | undefined;
  callBackFn: (code: string) => void
};

export const VerificationCodeScreen = ({
  maxCodeLength,
  status,
  callBackFn,
}: VerificationCodeScreenProps) => {
  const [input, updateInput] = useState<number>(0);
  const [code, setCode] = useState<number[]>([]);
  const verificationStatus = useSharedValue<VerificationStatusType>('inProgress');
  const { shake, rShakeStyle } = useAnimatedShake();

  const resetCode = useCallback(() => {
    setTimeout(() => {
      verificationStatus.value = 'inProgress';
      setCode([]);
    }, 500);
  }, [verificationStatus]);

  const resetInput = useCallback(() => {
    updateInput(0);
  }, []);

  const onWrongCodeWrapper = useCallback(() => {
    verificationStatus.value = 'wrong';
    shake();
    resetCode();
    resetInput();
  }, [resetCode, shake, verificationStatus, resetInput]);

  const updateNumber = useCallback((text: number) => {
    const textString = String(text);
    const newCode = textString.split('').map((item: string) => +item);
    if (newCode.length > maxCodeLength) {
      return;
    }
    setCode(newCode);
    updateInput(text);
    verificationStatus.value = 'inProgress';
  }, []);

  useEffect(() => {
    if (code && code.length === maxCodeLength) {
      callBackFn(code.join(''));
    }
  }, [code, maxCodeLength]);

  useEffect(() => {
    if (code && code.length === maxCodeLength && status !== undefined) {
      onWrongCodeWrapper();
    }
  }, [code, maxCodeLength, status]);

  return (
    <View style={styles.codeContainer}>
      <Animated.View style={[styles.codeContainer, rShakeStyle]}>
        <VerificationCode
          status={verificationStatus}
          code={code}
          maxLength={maxCodeLength}
        />
        <View style={{ flex: 1, marginTop: 60 }}>
          <ButtonsGrid
            input={input}
            maxLength={maxCodeLength}
            onUpdate={updateNumber}
            onBackspace={(text) => {
              const textString = String(text);
              const newCode = textString.split('').map((item: string) => +item);
              updateInput(text);
              setCode(newCode);
            }}
            onReset={resetInput}
            onMaxReached={() => {}}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  codeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  fill: {
    flex: 1,
  },
  fillCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
