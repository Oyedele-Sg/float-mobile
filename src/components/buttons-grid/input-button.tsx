/* eslint-disable react/display-name */
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type InputButtonProps = {
  style?: StyleProp<ViewStyle>;
  onTap?: () => void;
  onLongTap?: () => void;
  children?: React.ReactNode;
};

const InputButton = React.memo(
  ({
    children, style, onTap, onLongTap,
  }: InputButtonProps) => {
    const progress = useSharedValue(0);

    const tapGesture = Gesture.Tap()
      .onTouchesDown(() => {
        progress.value = withTiming(1, { duration: 100 });
      })
      .onTouchesUp(() => {
        if (onTap) runOnJS(onTap)();
      })
      .onFinalize(() => {
        progress.value = withTiming(0);
      })
      .maxDuration(10000);

    const longTapGesture = Gesture.LongPress()
      .minDuration(500)
      .onStart(() => {
        if (onLongTap) runOnJS(onLongTap)();
      });

    const rStyle = useAnimatedStyle(() => {
      const scale = interpolate(progress.value, [0, 1], [1, 0.9]);

      return {
        // backgroundColor: `rgba(243, 241, 246, ${1})`,
        transform: [{ scale }],
      };
    }, []);

    const gestures = Gesture.Simultaneous(tapGesture, longTapGesture);

    return (
      <GestureDetector gesture={gestures}>
        <Animated.View style={[style, {
          borderRadius: 99,
        }, rStyle]}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    );
  },
);

export { InputButton };
