import {CustomBox, CustomButton, CustomText, HomeLayoutWrapper, Screen} from "../../../src/components";
import { useSafeAreaInsetsStyle } from "../../../src/utils/useSafeAreaInsetStyle";
import {Dimensions} from "react-native";
import {useRouter} from "expo-router";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function HomeScreen() {
    const router = useRouter()
    const $containerInsets = useSafeAreaInsetsStyle(['top', "bottom"])

    return (
        <HomeLayoutWrapper header='Hello'  backFn={() => {
          router.back()
      }}>
        <CustomBox>

        </CustomBox>
            
        </HomeLayoutWrapper>
    )
}
