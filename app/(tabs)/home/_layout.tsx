import { Stack } from 'expo-router'

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="sendform" />
      <Stack.Screen name="transactions" />
      <Stack.Screen name="transactionreceipt" />
    </Stack>
  );
}