/* eslint-disable no-duplicate-imports */
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  FlipInXDown,
  FlipOutXDown,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export type VerificationStatusType = 'inProgress' | 'correct' | 'wrong';

export type AnimatedCodeNumberProps = {
  code?: number;
  highlighted: boolean;
  status: SharedValue<VerificationStatusType>;
  hidden: boolean
  rounded: boolean
};

export const AnimatedCodeNumber = ({
  code,
  highlighted,
  status,
  hidden,
  rounded,
}: AnimatedCodeNumberProps) => {
  const getColorByStatus = useCallback(
    (vStatus: VerificationStatusType) => {
      'worklet';

      if (highlighted) return '#19151E';

      if (vStatus === 'correct') {
        return '#22bb33';
      }

      if (vStatus === 'wrong') {
        return '#bb2124';
      }

      return '#E4E0EA';
    },
    [highlighted],
  );

  const rBoxStyle = useAnimatedStyle(() => ({
    // We rely on the getColorByStatus to retrieve the color based on the status
    // Then we wrap it with the withTiming function to animate the color change
    // in a smooth way
    borderColor: withTiming(getColorByStatus(status.value)),
  }), [getColorByStatus]);

  return (
    <Animated.View
      style={[styles.container, rounded && styles.rounded, rBoxStyle]}
    >
      {code != null && (
        // entering={FadeIn.duration(5)}
      // exiting={FadeOut.duration(5)}
        <Animated.View style={styles.active }>
          {/* <Animated.Text
            // entering={FlipInXDown.duration(5)
            //   .easing(Easing.bezier(0, 0.75, 0.5, 0.9).factory())
            //   .build()}
            // exiting={FlipOutXDown.duration(5)
            //   .easing(Easing.bezier(0.6, 0.1, 0.4, 0.8).factory())
            //   .build()}
            style={[styles.text, ]}
          >
            {hidden ? '*' : code}
          </Animated.Text> */}
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 25,
    width: 25,
    borderWidth: 2,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#211F2A',
  },
  rounded: {
    borderRadius: 16,
  },
  text: {
    color: '#19151E',
    fontSize: 12,
    fontFamily: 'SanText',
  },
  active: {
    backgroundColor: '#211F2A',
    height: 25,
    width: 25,
    borderRadius: 16,
  },
});
