import React from 'react';
import { Pressable } from 'react-native';
import { CustomButtonProps } from './button';
import { withInterceptOnPress } from './buttonInterceptor';

const MyButton: React.FC<CustomButtonProps> = ({ onPress, style, children }) => (
    <Pressable
        onPress={onPress}
        style={{ ...style }}
    >
        {children}
    </Pressable>
);

export const CustomPressable = withInterceptOnPress(MyButton);
