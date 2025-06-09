import { Stack } from 'expo-router';

export default function PaymentModalsLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="failed" />
      <Stack.Screen name="success" />
    </Stack>
  );
}