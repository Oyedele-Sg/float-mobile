import {CustomBox, CustomButton, CustomInput, CustomText, HomeLayoutWrapper, Screen} from "../../../src/components";
import { useSafeAreaInsetsStyle } from "../../../src/utils/useSafeAreaInsetStyle";
import {Dimensions, Keyboard, Pressable} from "react-native";
import {useRouter} from "expo-router";
import { Formik } from 'formik';
import { ChevronDownIcon, ExchangeIcon, FlagIcon } from '../../../assets/icons';
import { RecentTransactions } from '../../../src/homeComponents/RecentTransactions';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter()
  const $containerInsets = useSafeAreaInsetsStyle(['top', "bottom"])

  return (
    <HomeLayoutWrapper title='Send' description='Choose a destination country to send USD'  header='Hello, John'>
      <CustomBox>
        <Formik
          initialValues={{
            from: '',
            tp: '',
          }}
          onSubmit={(values) => {
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
                      // presentModal();
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
                      style={{ alignItems: 'center' }}
                      borderColor='neutral_50'
                    >
                      <CustomBox flexDirection={'row'} alignItems={'center'} gap={10}>
                        <FlagIcon/>
                        <CustomText variant="T1422400" color="neutral_50">
                            Enter country
                        </CustomText>
                      </CustomBox>
                      <ChevronDownIcon/>
                    </CustomBox>
                  </Pressable>
                  <CustomText mt={8} variant="T1422400" color="gray_950">Select a country to send to</CustomText>
                </CustomBox>
              </CustomBox>

              <CustomBox flexDirection='row' gap={12} mb={30}>
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
              </CustomBox>

              <CustomBox mb={22}>
                  <CustomButton onPress={handleSubmit} label='Next' />
              </CustomBox>

              <RecentTransactions/>

              
            </CustomBox>
          )}
        </Formik>
      </CustomBox>
        
    </HomeLayoutWrapper>
    )
}
