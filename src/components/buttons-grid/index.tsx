import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InputButton } from './input-button';
import { CloseCircleSVG } from '@assets/icons';

const items = [
  { label: 1 },
  { label: 2 },
  { label: 3 },
  { label: 4 },
  { label: 5 },
  { label: 6 },
  { label: 7 },
  { label: 8 },
  { label: 9 },
  { label: 'biometric' },
  { label: 0 },
  { label: 'backspace' },
];

type ButtonsGridProps = {
  input: number;
  maxLength: number;
  onUpdate: (value: number) => void;
  onBackspace?: (value: number) => void;
  onReset?: () => void;
  onMaxReached?: () => void;
};

// eslint-disable-next-line react/display-name
const ButtonsGrid = React.memo(
  ({
    input, maxLength, onReset, onUpdate, onBackspace, onMaxReached,
  }: ButtonsGridProps) => (
    <View style={styles.container}>
      {items.map(({ label }, index) => (
        <InputButton
          key={index}
          style={styles.input}
          onLongTap={() => {
            if (label === 'backspace') {
              onReset?.();
            }
          }}
          onTap={() => {
            if (typeof label === 'number') {
              const newValue = `${input}${label}`.slice(0, maxLength);
              if (newValue.length > maxLength) {
                onMaxReached?.();
                return;
              }
              onUpdate(Number(newValue));
              return;
            }
            if (label === 'backspace') {
              const newValue = Math.floor(input / 10);
              onBackspace?.(newValue);
            }
          }}
        >
          {typeof label === 'number' && (
          <Text style={styles.number}>{label}</Text>
          )}

          {label === 'backspace' && (
            <Text style={styles.backspace}>Delete</Text>
          )}
        </InputButton>
      ))}
    </View>
  ),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  input: {
    width: 56,
    height: 56,
    marginLeft: `${40 / 3}%`,
    marginBottom: `${25 / 3}%`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 21,
    color: '#19151E',
    fontWeight: '700',
    fontFamily: 'SansText',
  },
  backspace: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 21,
    color: '#FF3D00',
    fontWeight: '700',
    fontFamily: 'SansText',
  },
});

export { ButtonsGrid };
