import { createBox, createRestyleComponent, createVariant, useTheme, VariantProps } from "@shopify/restyle";
import { Theme } from "@styles/theme";
import React, { useState } from "react";
import { useField } from 'formik';
import {TextInput, TextInputProps, StyleSheet, Keyboard, Pressable} from "react-native";
import { CustomBox } from "../box";
import { CustomText } from "../text";
import Svg, {Path} from "react-native-svg";

type Props = {
    label?: string;
    name: string;
    placeholder: string;
    secureTextEntry?: boolean;
    leftComponent?: () => React.ReactNode
    rightComponent?: React.ReactNode;
};

const inputVariant = createVariant<Theme, 'inputVariants'>({
    themeKey: 'inputVariants',
});

const Box = createBox<Theme>();

export const InputWrapper = createRestyleComponent<
    VariantProps<Theme, 'inputVariants'> & React.ComponentProps<typeof Box>,
    Theme
>([inputVariant], Box);

export function CustomInput({
    label,
    name,
    placeholder,
    secureTextEntry,
    leftComponent,
    rightComponent,
    ...props
}: TextInputProps & Props) {
    const [secure, setSecure] = useState<boolean | undefined>(secureTextEntry);
    const theme = useTheme<Theme>();
    const [field, { touched }, helpers] = useField(name);

    const { value, onBlur, onChange } = field;
    const { setTouched } = helpers;

    return (
        <CustomBox flexGrow={1}>
            {label && (
                <CustomBox mb={8}>
                    <CustomText variant="T1422400" textTransform="capitalize" color="gray_950">{label}</CustomText>
                </CustomBox>
            )}
            <CustomBox>
                <InputWrapper
                    paddingHorizontal={18}
                    paddingVertical={8}
                    flexDirection="row"
                    alignItems="flex-end"
                    borderRadius={20}
                    borderWidth={1}
                    flex={1}
                    minHeight={44}
                    style={{ alignItems: 'center' }}
                    borderColor='neutral_50'
                >
                    <TextInput
                        onChangeText={(onChangeValue) => {
                            onChange(name)(onChangeValue);
                        }}
                        value={value}
                        placeholder={placeholder}
                        onBlur={() => {
                            onBlur(name);
                        }}
                        style={[styles.inputStyle, { color: theme.colors.gray_950 }]}
                        placeholderTextColor="#BFC5DD"
                        onSubmitEditing={Keyboard.dismiss}
                        secureTextEntry={secure}
                        {...props}
                    />

                    {secureTextEntry ? (
                    <Pressable
                        hitSlop={9}
                        style={styles.secureButton}
                        onPress={() => setSecure((val) => !val)}
                    >
                        {!secure ? (
                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <Path
                            d="M8.05721 3.81924C8.36202 3.77417 8.67645 3.75 9.00031 3.75C12.8291 3.75 15.3415 7.12863 16.1855 8.46512C16.2877 8.62688 16.3388 8.70776 16.3673 8.8325C16.3888 8.92619 16.3888 9.074 16.3673 9.16768C16.3387 9.29243 16.2873 9.37384 16.1844 9.53668C15.9595 9.89261 15.6166 10.3928 15.1624 10.9353M5.04324 5.03628C3.42169 6.13628 2.32084 7.66453 1.81583 8.46396C1.71321 8.6264 1.66191 8.70762 1.6333 8.83236C1.61182 8.92605 1.61181 9.07383 1.63328 9.16752C1.66187 9.29226 1.71295 9.37313 1.8151 9.53488C2.65916 10.8714 5.17156 14.25 9.00031 14.25C10.5441 14.25 11.8739 13.7007 12.9666 12.9575M2.25031 2.25L15.7503 15.75M7.40932 7.40901C7.00215 7.81618 6.75031 8.37868 6.75031 9C6.75031 10.2426 7.75767 11.25 9.00031 11.25C9.62163 11.25 10.1841 10.9982 10.5913 10.591"
                            stroke="#BFC5DD" stroke-linecap="round" stroke-linejoin="round"/>
                        </Svg>
                        ) : (
                            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <Path
                                d="M8.05721 3.81924C8.36202 3.77417 8.67645 3.75 9.00031 3.75C12.8291 3.75 15.3415 7.12863 16.1855 8.46512C16.2877 8.62688 16.3388 8.70776 16.3673 8.8325C16.3888 8.92619 16.3888 9.074 16.3673 9.16768C16.3387 9.29243 16.2873 9.37384 16.1844 9.53668C15.9595 9.89261 15.6166 10.3928 15.1624 10.9353M5.04324 5.03628C3.42169 6.13628 2.32084 7.66453 1.81583 8.46396C1.71321 8.6264 1.66191 8.70762 1.6333 8.83236C1.61182 8.92605 1.61181 9.07383 1.63328 9.16752C1.66187 9.29226 1.71295 9.37313 1.8151 9.53488C2.65916 10.8714 5.17156 14.25 9.00031 14.25C10.5441 14.25 11.8739 13.7007 12.9666 12.9575M2.25031 2.25L15.7503 15.75M7.40932 7.40901C7.00215 7.81618 6.75031 8.37868 6.75031 9C6.75031 10.2426 7.75767 11.25 9.00031 11.25C9.62163 11.25 10.1841 10.9982 10.5913 10.591"
                                stroke="#BFC5DD" stroke-linecap="round" stroke-linejoin="round"/>
                            </Svg>
                        )}
                    </Pressable>
                    ) : rightComponent ? (
                    <CustomBox style={styles.secureButton}>
                        {rightComponent}
                    </CustomBox>
                    ) : null}
                </InputWrapper>
            </CustomBox>
        </CustomBox>
    )
}

CustomInput.defaultProps = {
    secureTextEntry: false,
};

const styles = StyleSheet.create({
    secureButton: {
        position: 'absolute',
        top: 11,
        right: 18,
    },
    inputStyle: {
        flex: 1,
        width: '100%',
        fontFamily: 'Inter',
        fontSize: 14,
    },
});
