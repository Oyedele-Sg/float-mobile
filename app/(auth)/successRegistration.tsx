import {CustomBox, CustomButton, CustomText, Screen} from "../../src/components";
import {useRouter} from "expo-router";
import React from "react";
import {Image} from "react-native";


export default function SuccessRegistrationScreen() {
    const router = useRouter()

    return (
        <Screen preset="auto" safeAreaEdges={['top']}>
            <CustomBox paddingHorizontal={20} mt={64} alignItems='center'>
                <CustomText variant='T3034700' color='neutral_n800'>Sign up Successfully</CustomText>
                <CustomBox mt={23} mb={22} height={338} width={338} borderRadius={169}>
                    <Image
                        source={require('../../assets/images/Signup/young person.png')}
                        style={{objectFit: "cover", alignSelf: "center", marginBottom: 20}}
                    />
                </CustomBox>
                <CustomText variant='T3034700' textAlign='center' color='neutral_n800'>Welcome to Float Transfer</CustomText>
                <CustomText variant='T1624600' mt={22} color='neutral_n800'>Your journey begins here!</CustomText>
                <CustomText variant='T1624400' color='neutral_n800' mt={4}>Explore features and start transacting </CustomText>
                <CustomBox width="100%" mt={22}>
                    <CustomButton onPress={() => { router.push('/addBank') }} label='Get Started' />
                </CustomBox>
            </CustomBox>
        </Screen>
    )
}
