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

export default function HomeScreen() {
  const router = useRouter()
  const { countryName, countryCode } = useAppStore(useShallow((state) => state.send));
  const { last_name } = useAppStore(useShallow((state) => state.userData));

  const screenSnapPoints = useScreenSnapshots(['65%', '65%'], ['60%', '60%']);

  const {
    modalRef,
    presentModal,
    snapPoints,
    renderBackdrop,
    dismissModal,
    handle,
  } = useBottomSheetModalHook({
    snapPoints: screenSnapPoints,
    backdropPressBehavior: 'close',
  });
  return (
    <HomeLayoutWrapper title='Send' description='Choose a destination country to send USD'  header={`Hello ${last_name}`}>
      <CustomBox>
        <Formik
          initialValues={{
            from: '',
            tp: '',
          }}
          onSubmit={(values) => {
            if (countryName.length > 0 && countryCode.length > 0) {
              router.push('/sendform')
            }
          }}
        >
          {({ handleSubmit }) => (
            <CustomBox flex={1} gap={10} mb={20}>
              <CustomBox mb={30}>
                <CustomBox>
                  <CustomBox mb={8}>
                    <CustomText variant="T1422400" color="gray_950">Select Country</CustomText>
                  </CustomBox>

                  <Pressable
                    onPress={() => {
                      Keyboard.dismiss();
                      presentModal();
                    }}
                  >
                    <CustomBox
                      paddingHorizontal={18}
                      paddingVertical={8}
                      flexDirection="row"
                      alignItems="center"
                      justifyContent={'space-between'}
                      borderRadius={20}
                      borderWidth={1}
                      flex={1}
                      height={40}
                      borderColor='neutral_50'
                    >
                      {countryName.length > 0 ? (
                        <CustomBox flexDirection={'row'} alignItems={'center'} gap={10}>
                          <CustomBox
                            width={30}
                            height={30}
                            borderRadius={20}
                            alignItems='center'
                            justifyContent='center'>
                            <CountryFlag isoCode={countryCode} size={15} />
                          </CustomBox>
                          <CustomText variant="T1422400" color="gray_950">
                            {countryName}
                          </CustomText>
                      </CustomBox>
                      ) : (
                        <CustomBox flexDirection={'row'} alignItems={'center'} gap={10}>
                          <FlagIcon/>
                          <CustomText variant="T1422400" color="neutral_50">
                              Enter country
                          </CustomText>
                        </CustomBox>
                      )}
                      <ChevronDownIcon/>
                    </CustomBox>
                  </Pressable>
                  <CustomText mt={8} variant="T1422400" color="gray_950">Select a country to send to</CustomText>
                </CustomBox>
              </CustomBox>

              {/* <CustomBox flexDirection='row' gap={12} mb={30}>
                <CustomBox flex={3}>
                  <CustomText mb={8} variant="T1422400" color="gray_950">USD</CustomText>
                  <CustomInput name='from' placeholder='0.00' />
                </CustomBox>
                <CustomBox pt={16} alignItems={'center'} justifyContent={'center'} flex={1}>
                  <ExchangeIcon/>
                </CustomBox>
                <CustomBox flex={3}>
                  <CustomText mb={8} textAlign={'right'} variant="T1422400" color="gray_950">country</CustomText>
                  <CustomInput  name='to' placeholder='0.00' />
                </CustomBox>
              </CustomBox> */}

              <CustomBox mb={22}>
                  <CustomButton disabled={!(countryName.length > 0)} onPress={handleSubmit} label='Next' />
              </CustomBox>

              {/* {countryName.length > 0 && (
                <InternationalSendForms />
              )} */}

              <RecentTransactions/>

              
            </CustomBox>
          )}
        </Formik>
      </CustomBox>
      <BottomSheetModal
        name="counytryList"
        ref={modalRef}
        index={1}
        snapPoints={snapPoints}
        handleComponent={handle}
        backdropComponent={renderBackdrop}
      >
        <InternationalCountryModal
          onClose={() => {
            dismissModal();
          }}
        />
      </BottomSheetModal>
        
    </HomeLayoutWrapper>
    )
}
