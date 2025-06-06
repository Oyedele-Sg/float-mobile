import {CustomBox, CustomButton, CustomInput, CustomText, HomeLayoutWrapper, Screen, StyledInput, UseBottomSheetView} from "../../../src/components";
import {Dimensions, Image, Keyboard, Pressable} from "react-native";
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
import { useState } from 'react';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SendFormScreen() {
  const router = useRouter()
  const [search, setSearch] = useState<string>('');
  const { countryName, countryCode } = useAppStore(useShallow((state) => state.send));
  const ngnBankscreenSnapPoints = useScreenSnapshots(
    ['45%', '45%'],
    ['60%', '60%'],
  );

  const {
		modalRef: ngnBankRef,
		presentModal: ngnBankPresentModal,
		snapPoints: ngnBankSnapPoints,
		renderBackdrop: ngnBankRenderBackdrop,
		dismissModal: ngnBankDismissModal,
		handle: ngnBankHandle
	} = useBottomSheetModalHook({
		snapPoints: ngnBankscreenSnapPoints,
		backdropPressBehavior: 'close'
	});
  return (
    <HomeLayoutWrapper backBt header={`Send to ${countryName} Bank`}>
      <CustomBox>
      </CustomBox>
        
      <BottomSheetModal
				name='ngnBankRef'
				ref={ngnBankRef}
				index={1}
				snapPoints={ngnBankSnapPoints}
				handleComponent={ngnBankHandle}
				backdropComponent={ngnBankRenderBackdrop}>
				<CustomBox paddingHorizontal={20} paddingVertical={32}>
					<CustomText variant='T2024600' color='grey_950' mb={15}>
						Bank Name
					</CustomText>

          <CustomBox>
            <StyledInput
              placeholder="Search for bank"
              value={search}
              onChange={(e) => setSearch(e.nativeEvent.text)}
            />
          </CustomBox>

          {/* <CustomBox mt={15}>
            {useGetBanksApi.isLoading ? (
            <CustomBox></CustomBox>
              // <SkeletonPlaceholder>
              //   <SkeletonPlaceholder.Item>
              //     {new Array(15).fill('').map((index) => (
              //       <SkeletonPlaceholder.Item
              //         key={index}
              //         width="auto"
              //         height={30}
              //         marginBottom={16}
              //       />
              //     ))}
              //   </SkeletonPlaceholder.Item>
              // </SkeletonPlaceholder>
            ) : (
              <FlatList
                data={filteredBanks || []}
                keyExtractor={(item) => item.bankCode}
                initialNumToRender={25}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      setbankNameCode({
                        bankCode: item.bankCode,
                        bankName: item.bankName,
                      });

                      ngnBankDismissModal();
                    }}
                  >
                    <CustomBox
                      paddingVertical={12}
                      flexDirection="row"
                      alignItems="center"
                    >
                      <CustomBox
                        width={40}
                        height={40}
                        borderRadius={20}
                        bg={item.bankUrl ? 'grey_50' : 'primary_2'}
                        alignItems="center"
                        justifyContent="center"
                        borderColor="primary_2"
                      >
                        {item.bankUrl ? (
                          <Image
                            source={{ uri: item.bankUrl }}
                            style={{
                              borderRadius: 40,
                              width: '100%',
                              height: '100%',
                            }}
                          />
                        ) : (
                          <CustomText variant="T1216500" color="neutral_10">
                            {getNameInitials(item.bankName)}
                          </CustomText>
                        )}
                      </CustomBox>
                      <CustomText ml={8} variant="BankText" color="grey_800">
                        {item.bankName}
                      </CustomText>
                    </CustomBox>
                  </Pressable>
                )}
              />
            )}
          </CustomBox> */}
        </CustomBox>
      </BottomSheetModal>
    </HomeLayoutWrapper>
    )
}
