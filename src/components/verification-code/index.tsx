/* eslint-disable react/no-array-index-key */
/* eslint-disable no-duplicate-imports */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { AnimatedCodeNumberProps } from './animated-code-number';
import { AnimatedCodeNumber } from './animated-code-number';

type VerificationCodeProps = {
  code: number[];
  maxLength?: number;
  hidden?: boolean
  rounded?: boolean
} & Pick<AnimatedCodeNumberProps, 'status'>;

export const VerificationCode = ({
  code,
  maxLength = 4,
  status,
  hidden,
  rounded,
}: VerificationCodeProps) => (
  <View style={styles.container}>
    {new Array(maxLength).fill(0).map((_, index) => (
      <View key={index} style={styles.codeContainer}>
        <AnimatedCodeNumber
          code={code[index]}
          status={status}
          highlighted={index === code.length}
          hidden={hidden || false}
          rounded={rounded || false}
        />
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  codeContainer: {},
});
