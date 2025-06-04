import {CustomBox, CustomText, Screen} from "../../src/components";


export default function VerifyScreen() {
    return (
        <Screen preset="auto" safeAreaEdges={['top']}>
            <CustomBox paddingHorizontal={20}>
                <CustomText>Verify</CustomText>
            </CustomBox>
        </Screen>
    )
}
