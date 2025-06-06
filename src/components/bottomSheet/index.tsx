import React, { ReactNode } from 'react';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleProp, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface UseBottomSheetViewInterface {
  children: ReactNode,
  style?: StyleProp<any>
}

export const UseBottomSheetView = ({ children, style }: UseBottomSheetViewInterface) => (
  <BottomSheetView style={style || styles.container}>
    <StatusBar
      backgroundColor="#000"
      style='light'
      translucent={false}
      animated
    />
    {children}
  </BottomSheetView>
);

export default BottomSheetView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});