import {CustomBox, CustomButton, CustomText, HomeLayoutWrapper, Screen} from "../../../src/components";
import { useSafeAreaInsetsStyle } from "../../../src/utils/useSafeAreaInsetStyle";
import {Dimensions} from "react-native";
import {useRouter} from "expo-router";


export default function AccountScreen() {
    const router = useRouter()
    const $containerInsets = useSafeAreaInsetsStyle(['top', "bottom"])

    return (
        <HomeLayoutWrapper header='Hello'>
          <CustomBox>
            <CustomText variant='T2434700' color='neutral_n800'>Add Bank Card</CustomText>
            <CustomText variant='T1422400' color='gray_950'>Enter card details you’ll use for transactions</CustomText>
          </CustomBox>
            
        </HomeLayoutWrapper>
    )
}
