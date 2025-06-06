import theme from '../src/styles/theme'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@shopify/restyle'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NotifierWrapper } from 'react-native-notifier'

export default function RootLayout() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 0,
                retry: 0,
            },
        },
    })

    return (
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
                                </Stack>
                        </BottomSheetModalProvider>
                    </NotifierWrapper>
                </QueryClientProvider>
            </GestureHandlerRootView>
        </ThemeProvider>
    )
}
