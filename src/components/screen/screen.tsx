import {
    ExtendedEdge,
    useSafeAreaInsetsStyle,
} from '@utils/useSafeAreaInsetStyle'
import React, { useRef, useState } from 'react'
import {
    KeyboardAvoidingView,
    KeyboardAvoidingViewProps,
    LayoutChangeEvent,
    Platform,
    ScrollView,
    ScrollViewProps,
    StatusBar,
    StatusBarProps,
    StyleProp,
    View,
    ViewStyle,
} from 'react-native'

interface BaseScreenProps {
    children?: React.ReactNode
    style?: StyleProp<ViewStyle>
    contentContainerStyle?: StyleProp<ViewStyle>
    safeAreaEdges?: ExtendedEdge[]
    backgroundColor?: string
    statusBarStyle?: 'default' | 'light-content' | 'dark-content'
    keyboardOffset?: number
    StatusBarProps?: StatusBarProps
    KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps
}

interface FixedScreenProps extends BaseScreenProps {
    preset?: 'fixed'
}

interface ScrollScreenProps extends BaseScreenProps {
    preset?: 'scroll'
    keyboardShouldPersistTaps?: 'handled' | 'always' | 'never'
    ScrollViewProps?: ScrollViewProps
}

interface AutoScreenProps extends Omit<ScrollScreenProps, 'preset'> {
    preset?: 'auto'
    scrollEnabledToggleThreshold?: { percent?: number; point?: number }
}

export type ScreenProps = ScrollScreenProps | FixedScreenProps | AutoScreenProps

const isIos = Platform.OS === 'ios'

type ScreenPreset = 'fixed' | 'scroll' | 'auto'

function isNonScrolling(preset?: ScreenPreset) {
    return !preset || preset === 'fixed'
}

function useAutoPreset(props: AutoScreenProps): {
    scrollEnabled: boolean
    onContentSizeChange: (w: number, h: number) => void
    onLayout: (e: LayoutChangeEvent) => void
} {
    const { preset, scrollEnabledToggleThreshold } = props
    const { percent = 0.92, point = 0 } = scrollEnabledToggleThreshold || {}

    const scrollViewHeight = useRef<null | number>(null)
    const scrollViewContentHeight = useRef<null | number>(null)
    const [scrollEnabled, setScrollEnabled] = useState(true)

    function updateScrollState() {
        if (
            scrollViewHeight.current === null ||
            scrollViewContentHeight.current === null
        ) {
            return
        }

        const contentFitsScreen = (function () {
            if (point) {
                return (
                    scrollViewContentHeight.current < scrollViewHeight.current - point
                )
            } else {
                return (
                    scrollViewContentHeight.current < scrollViewHeight.current * percent
                )
            }
        })()

        if (scrollEnabled && contentFitsScreen) {
            setScrollEnabled(false)
        }

        if (!scrollEnabled && !contentFitsScreen) {
            setScrollEnabled(true)
        }
    }

    function onContentSizeChange(w: number, h: number) {
        scrollViewContentHeight.current = h
        updateScrollState()
    }

    function onLayout(e: LayoutChangeEvent) {
        const { height } = e.nativeEvent.layout
        scrollViewHeight.current = height
        updateScrollState()
    }

    if (preset === 'auto') {
        updateScrollState()
    }

    return {
        scrollEnabled: preset === 'auto' ? scrollEnabled : true,
        onContentSizeChange,
        onLayout,
    }
}

function ScreenWithoutScrolling(props: ScreenProps) {
    const { style, contentContainerStyle, children } = props
    return (
        <View style={[$outerStyle, style]}>
            <View style={[$innerStyle, contentContainerStyle]}>{children}</View>
        </View>
    )
}

function ScreenWithScrolling(props: ScreenProps) {
    const {
        children,
        keyboardShouldPersistTaps = 'handled',
        contentContainerStyle,
        ScrollViewProps,
        style,
    } = props as ScrollScreenProps

    const ref = useRef<ScrollView>(null)

    const { scrollEnabled, onContentSizeChange, onLayout } = useAutoPreset(
        props as AutoScreenProps,
    )

    return (
        <ScrollView
            {...{ keyboardShouldPersistTaps, scrollEnabled, ref }}
            {...ScrollViewProps}
            onLayout={(e) => {
                onLayout(e)
                ScrollViewProps?.onLayout?.(e)
            }}
            onContentSizeChange={(w: number, h: number) => {
                onContentSizeChange(w, h)
                ScrollViewProps?.onContentSizeChange?.(w, h)
            }}
            style={[$outerStyle, ScrollViewProps?.style, style]}
            contentContainerStyle={[
                $innerStyle,
                ScrollViewProps?.contentContainerStyle,
                contentContainerStyle,
            ]}
        >
            {children}
        </ScrollView>
    )
}

export function Screen(props: ScreenProps) {
    const {
        backgroundColor = 'rgba(255, 255, 255, 1)',
        KeyboardAvoidingViewProps,
        keyboardOffset = 0,
        safeAreaEdges,
        StatusBarProps,
        statusBarStyle = 'dark-content',
    } = props

    const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)

    return (
        <View style={[$containerStyle, { backgroundColor }, $containerInsets]}>
            <StatusBar barStyle={statusBarStyle} {...StatusBarProps} />

            <KeyboardAvoidingView
                behavior={isIos ? 'padding' : 'height'}
                keyboardVerticalOffset={keyboardOffset}
                {...KeyboardAvoidingViewProps}
                style={[$keyboardAvoidingViewStyle, KeyboardAvoidingViewProps?.style]}
            >
                {isNonScrolling(props.preset) ? (
                    <ScreenWithoutScrolling {...props} />
                ) : (
                    <ScreenWithScrolling {...props} />
                )}
            </KeyboardAvoidingView>
        </View>
    )
}

export const $containerStyle: ViewStyle = {
    flex: 1,
    height: '100%',
    width: '100%',
}

export const $keyboardAvoidingViewStyle: ViewStyle = {
    flex: 1,
}

export const $outerStyle: ViewStyle = {
    flex: 1,
    height: '100%',
    width: '100%',
}

export const $innerStyle: ViewStyle = {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
}
