import React from 'react';
import {
    createBox, type VariantProps, createRestyleComponent, createVariant,
} from '@shopify/restyle';
import { type Theme } from '@styles/theme';
import { Pressable, ViewStyle } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { CustomBox } from '../box';
import { CustomText } from '../text';
import { PressableScale } from './touchableScale';
import { LinearGradient } from 'expo-linear-gradient';

export type CustomButtonProps = VariantProps<Theme, 'buttonVariants'> &
    VariantProps<Theme, 'textVariants', 'textVariants'> & VariantProps<Theme, 'colors', 'colors'> & {
    label?: string
    onPress: (...args: any[]) => void
    style?: ViewStyle
    buttonStyle?: ViewStyle
    loading?: boolean
    disabled?: boolean
    // eslint-disable-next-line react/no-unused-prop-types
    children?: React.ReactNode
    icon?: React.ReactNode
    size?: 'small' | 'big'
    loadingText?: string
};

const Box = createBox<Theme>();

const buttonVariant = createVariant<Theme, 'buttonVariants'>({
    themeKey: 'buttonVariants',
});

const Button = createRestyleComponent<
    VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof Box>,
    Theme
>([buttonVariant], Box);

export const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  label,
  textVariants,
  colors,
  variant,
  style,
  buttonStyle,
  loading,
  disabled,
  icon,
  loadingText,
}) => {
    const handlePress = async () => {
        const netInfo = await NetInfo.fetch();

        if (!netInfo.isConnected) {
            return;
        }
        onPress();
    };

    const transparentCheck = (variant || '').toLowerCase().includes('transparent')
        ? { backgroundColor: 'transparent' }
        : {};

    const buttonContent = (
        <CustomBox flexDirection="row" alignItems="center">
            {icon}
            <CustomText
                variant={textVariants || 'T1624600'}
                color={(disabled || loading) ? 'secondary_white' : colors || 'white'}
                style={{ marginLeft: icon ? 6 : 0 }}
            >
                {loading ? (loadingText || 'Loading...') : label}
            </CustomText>
        </CustomBox>
    );

    const buttonStyles = [
        buttonStyle,
        transparentCheck,
    ];

    const buttonVariantStyle = (loading || disabled)
        ? 'disabled'
        : variant;

    return (
        <PressableScale disabled={disabled}>
            <Pressable
                onPress={() => {
                    void handlePress();
                }}
                style={{ width: '100%', ...style }}
                disabled={loading || disabled}
            >
                {(loading || disabled || variant === 'auth' || variant === 'white') ? (
                    <Button
                        variant={buttonVariantStyle}
                        justifyContent="center"
                        alignItems="center"
                        style={buttonStyles as any}
                    >
                        {buttonContent}
                    </Button>
                    ) : (
                    <LinearGradient
                        colors={['#000000', '#C7160C']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={[{
                        width: '100%',
                        height: 48,
                        borderRadius: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        }, buttonStyle]}
                    >
                        {buttonContent}
                    </LinearGradient>
                )}
            </Pressable>
        </PressableScale>
    );
};
