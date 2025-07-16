import { useState } from 'react';
import theme from '../src/styles/theme'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@shopify/restyle'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NotifierWrapper } from 'react-native-notifier'
import { StripeProvider } from '@stripe/stripe-react-native';

export default function RootLayout() {
    const [publishableKey] = useState(
        `pk_test_51RgPvNELeZMXxltmhSlFHircwMYovsm8cYhn2ZoYruZm4zQYa9B85Xucv23oYMof7F5uO8eYXCUOVxrY33Jmd0tq00xry2vRaA`
    );
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 0,
                retry: 0,
            },
        },
    })

    return (
        <StripeProvider
            publishableKey={publishableKey}
            merchantIdentifier="merchant.com.raiz"
            >
            <ThemeProvider theme={theme}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <QueryClientProvider client={queryClient}>
                        <NotifierWrapper>
                            <BottomSheetModalProvider>
                                <Stack
                                    screenOptions={{
                                        headerShown: false,
                                        headerShadowVisible: false,
                                    }}
                                >
                                    <Stack.Screen name="(auth)" />
                                    <Stack.Screen name="(tabs)" />
                                    <Stack.Screen
                                        name="paymentmodals"
                                        options={{
                                            presentation: 'modal',
                                            headerShown: false,
                                        }}
                                    />
                                </Stack>
                            </BottomSheetModalProvider>
                        </NotifierWrapper>
                    </QueryClientProvider>
                </GestureHandlerRootView>
            </ThemeProvider>
        </StripeProvider>
    )
}
