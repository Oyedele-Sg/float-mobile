import {CustomBox, CustomText, Screen} from "../../src/components";


export default function ForgotPasswordScreen() {
    return (
        <Screen preset="auto" safeAreaEdges={['top']}>
            <CustomBox paddingHorizontal={20}>
                <CustomText>Forgot Password</CustomText>
            </CustomBox>
        </Screen>
    )
}
