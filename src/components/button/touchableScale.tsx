import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type PressableScaleProps = {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean
};

const PressableScale: React.FC<PressableScaleProps> = ({
  children,
  onPress,
  style,
  disabled,
}) => {
  const active = useSharedValue(false);

  const gesture = Gesture.Tap()
    .maxDuration(4000)
    .onTouchesDown(() => {
      active.value = true;
    })
    .onTouchesUp(() => {
      if (onPress != null) runOnJS(onPress)();
    })
    .onFinalize(() => {
      active.value = false;
    });

  const rAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(disabled ? 1 : active.value ? 0.94 : 1),
      },
    ],
  }), []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[style, rAnimatedStyle]}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export { PressableScale };
