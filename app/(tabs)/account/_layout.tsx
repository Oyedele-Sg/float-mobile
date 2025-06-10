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
      <Stack.Screen name="accountsettings" />
      <Stack.Screen name="bankcards" />
      <Stack.Screen name="changepassword" />
    </Stack>
  );
}
