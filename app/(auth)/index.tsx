import {CustomBox, CustomButton, CustomText, Screen} from "../../src/components";
import { useSafeAreaInsetsStyle } from "../../src/utils/useSafeAreaInsetStyle";
import {Dimensions} from "react-native";
import {useRouter} from "expo-router";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function OnboardingScreen() {
    const router = useRouter()
    const $containerInsets = useSafeAreaInsetsStyle(['top', "bottom"])

    return (
        <Screen preset="fixed">
            <CustomBox
                paddingHorizontal={20}
                style={[{
                    height: SCREEN_HEIGHT,
                    backgroundColor: "#91130C"
                }, $containerInsets]}
                justifyContent='flex-end'
            >
                <CustomBox gap={4} mb={22}>
                    <CustomText variant='T3034700' color='white' maxWidth={295}>Transparent Rates, Every Time</CustomText>
                    <CustomText variant='T1422500' color='white' maxWidth={295}>Get the best exchange rates with no hidden charges.</CustomText>
                </CustomBox>
                <CustomButton variant='auth' onPress={() => { router.push('/register') }} label='Sign Up' />
                <CustomText variant='T1422500' alignSelf='center' color='darkText' mt={10}>Have an account? <CustomText variant='T1422500' color='secondary_white' onPress={() => { router.push('/login') }}>Login</CustomText></CustomText>
            </CustomBox>
        </Screen>
    )
}
