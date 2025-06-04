import {CustomBox, CustomText, Screen} from "../../src/components";


export default function SuccessRegistrationScreen() {
    return (
        <Screen preset="auto" safeAreaEdges={['top']}>
            <CustomBox paddingHorizontal={20}>
                <CustomText>Success Registration</CustomText>
            </CustomBox>
        </Screen>
    )
}
