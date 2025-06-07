import React from 'react';
import { Animated } from 'react-native';

export const SkeletonPlaceholderItem = ({ height = 20, width = '100%', style = {} }) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#eee', '#ddd'],
  });

  return (
    <Animated.View
      style={[
        {
          height,
          width: width as any, // 👈 bypass type checking for width
          borderRadius: 4,
          backgroundColor,
          marginBottom: 16,
        },
        style,
      ]}
    />
  );
};