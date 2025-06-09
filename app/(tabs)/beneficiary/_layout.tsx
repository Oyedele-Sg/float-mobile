import { Stack } from 'expo-router'

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="beneficiarydetails" />
      <Stack.Screen name="sendform" />
      <Stack.Screen name="sendamount" />
    </Stack>
  );
}