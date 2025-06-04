import { Stack } from 'expo-router'

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="register" />
            <Stack.Screen name="verify" />
            <Stack.Screen name="successRegistration" />
            <Stack.Screen name="login" />
            <Stack.Screen name="forgotPassword" />
            <Stack.Screen name="createNewPassword" />
        </Stack>
    )
}
