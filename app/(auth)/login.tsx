import {CustomBox, CustomText, Screen} from "../../src/components";


export default function LoginScreen() {
    return (
        <Screen preset="auto" safeAreaEdges={['top']}>
            <CustomBox paddingHorizontal={20}>
                <CustomText>Login</CustomText>
            </CustomBox>
        </Screen>
    )
}
