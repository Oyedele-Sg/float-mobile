import React, {ReactNode} from 'react'
import {Screen} from "../screen";
import {CustomBox} from "../box";
import {CustomPressable} from "../button";
import {BackIcon} from "@assets/icons";
import {CustomText} from "../text";
import {useRouter} from "expo-router";

type Props = {
    label?: string
    description?: () => ReactNode
    backFn: () => void
    children: ReactNode
};

export const AuthLayoutWrapper = ({ backFn, children, description, label }: Props) => {
    const router = useRouter()

    return (
        <Screen preset="auto" safeAreaEdges={['top']}>
            <CustomBox paddingHorizontal={20}>
                <CustomBox>
                    <CustomPressable onPress={() => {
                        router.back()
                    }}>
                        <BackIcon />
                    </CustomPressable>
                    <CustomText variant='T3034700' color='neutral_n800' textAlign='center' mt={12}>{label}</CustomText>
                    {description && description()}
                </CustomBox>

                <CustomBox mt={23}>
                    {children}
                </CustomBox>
            </CustomBox>
        </Screen>
    )
}
