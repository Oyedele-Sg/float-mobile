import React from 'react';
import { TextInput, StyleSheet, type TextInputProps } from 'react-native';
// import { SearchIcon } from '@icons/index';
import { useTheme } from '@shopify/restyle';
import { type Theme } from '@styles/theme';
import { CustomBox } from '../box';
import { SearchIcon } from '@assets/icons';

export const StyledInput = ({ ...props }: TextInputProps) => {
  const theme = useTheme<Theme>();
  return (
    <CustomBox
      flexGrow={1}
      borderRadius={20}
      alignItems="center"
      flexDirection="row"
      paddingHorizontal={16}
      borderWidth={1}
      borderColor="neutral_50"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      <TextInput
        placeholderTextColor={'#BFC5DD'}
        style={[styles.input, { color: theme.colors.gray_950 }]}
        {...props}
      />
      <SearchIcon />
    </CustomBox>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 12,
    fontFamily: 'SansText',
    fontSize: 14,
    marginLeft: 8,
    width: '90%',
  },
});
