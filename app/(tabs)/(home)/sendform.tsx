import {CustomBox, CustomButton, CustomInput, CustomText, HomeLayoutWrapper, Screen, UseBottomSheetView} from "../../../src/components";
import {Dimensions, Keyboard, Pressable} from "react-native";
import {useRouter} from "expo-router";
import { Formik } from 'formik';
import { ChevronDownIcon, ExchangeIcon, FlagIcon } from '../../../assets/icons';
import { InternationalCountryModal } from '../../../src/home/InternationalCountryModal';
import { RecentTransactions } from '../../../src/home/RecentTransactions';
import { useBottomSheetModalHook } from '../../../src/hooks/useBottomSheetModal';
import useScreenSnapshots from '../../../src/hooks/useScreenSnapPoints';
import { useAppStore } from '../../../src/store/AppStore';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useShallow } from 'zustand/shallow';
import CountryFlag from 'react-native-country-flag';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SendFormScreen() {
  const router = useRouter()
  const { countryName, countryCode } = useAppStore(useShallow((state) => state.send));

  return (
    <HomeLayoutWrapper backBt header={`Send to ${countryName} Bank`}>
      <CustomBox>
      </CustomBox>
        
    </HomeLayoutWrapper>
    )
}
