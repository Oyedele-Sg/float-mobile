import {CustomBox, CustomText, Screen} from "../../src/components";


export default function CreateNewPasswordScreen() {
    return (
        <Screen preset="auto" safeAreaEdges={['top']}>
            <CustomBox paddingHorizontal={20}>
                <CustomText>Create New Password</CustomText>
            </CustomBox>
        </Screen>
    )
}
