import {CustomBox, CustomButton, CustomPressable, CustomText, HomeLayoutWrapper, Screen, UseBottomSheetView} from "@/components";
import {useAppStore} from "@store/AppStore";
import {useShallow} from "zustand/shallow";
import {BankCardIcon, ChevronRightIcon, EditUserIcon, HelpIcon, LogoutIcon, PasswordIcon} from "@assets/icons";
import {useRouter} from "expo-router";
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useBottomSheetModalHook } from '@/hooks/useBottomSheetModal';
import useScreenSnapshots from '@/hooks/useScreenSnapPoints';
import { useMutation } from '@tanstack/react-query';
import { ForgotPasswordApi } from '@/services/Auth/AuthServices';
import { displaySuccessMessage } from '@/lib/toast';


export default function AccountScreen() {
    const router = useRouter()
    const { first_name, last_name, email } = useAppStore(useShallow((state) => state.userData));
    const { userLogout } = useAppStore();

    const {
        modalRef: logOutModalRef,
        presentModal: logOutPresentModal,
        snapPoints: logOutSnapPoints,
        renderBackdrop: logOutRenderBackdrop,
        dismissModal: logOutModalDismiss,
        handle,
      } = useBottomSheetModalHook({
        snapPoints: useScreenSnapshots(['45%', '45%'], ['40%', '40%']),
        backdropPressBehavior: 'close',
      });
    return (
        <HomeLayoutWrapper header='Account Settings'>
          <CustomBox gap={27}>
              <CustomBox gap={13}>
                  <CustomText variant='T1824600' color='headertext'>{first_name} {last_name}</CustomText>
                  <CustomText variant='T1422500' color='gray_text'>{email}</CustomText>
              </CustomBox>

              <CustomBox gap={4}>
                  <CustomText variant='T1422500' color='gray_text' textTransform='uppercase'>Account Information</CustomText>
                  <CustomPressable
                      onPress={() => {
                          router.push('/account/accountsettings');
                      }}
                  >
                      <CustomBox flexDirection='row' paddingVertical={13} alignItems='center' justifyContent='space-between'>
                          <CustomBox flexDirection='row' alignItems='center' gap={6}>
                              <EditUserIcon />
                              <CustomText variant='T1422500' color='headertext' textTransform='capitalize'>Edit Account Information</CustomText>
                          </CustomBox>
                          <ChevronRightIcon />
                      </CustomBox>
                  </CustomPressable>
              </CustomBox>

              <CustomBox gap={4}>
                  <CustomText variant='T1422500' color='gray_text'  textTransform='uppercase'>Finance</CustomText>
                  <CustomPressable
                      onPress={() => {
                          router.push('/account/bankcards')
                      }}
                  >
                      <CustomBox flexDirection='row' paddingVertical={13} alignItems='center' justifyContent='space-between'>
                          <CustomBox flexDirection='row' alignItems='center' gap={6}>
                              <BankCardIcon />
                              <CustomText variant='T1422500' color='headertext' textTransform='capitalize'>Bank cards</CustomText>
                          </CustomBox>
                          <ChevronRightIcon />
                      </CustomBox>
                  </CustomPressable>
              </CustomBox>

              <CustomBox gap={4}>
                  <CustomText variant='T1422500' color='gray_text'  textTransform='uppercase'>Security</CustomText>
                  <CustomPressable
                        onPress={() => {
                          router.push('/account/changepassword')
                      }}
                  >
                      <CustomBox flexDirection='row' paddingVertical={13} alignItems='center' justifyContent='space-between'>
                          <CustomBox flexDirection='row' alignItems='center' gap={6}>
                              <PasswordIcon />
                              <CustomText variant='T1422500' color='headertext' textTransform='capitalize'>Change Password</CustomText>
                          </CustomBox>
                          <ChevronRightIcon />
                      </CustomBox>
                  </CustomPressable>
                  <CustomPressable onPress={() => {}}>
                      <CustomBox flexDirection='row' paddingVertical={13} alignItems='center' justifyContent='space-between'>
                          <CustomBox flexDirection='row' alignItems='center' gap={6}>
                              <HelpIcon />
                              <CustomText variant='T1422500' color='headertext' textTransform='capitalize'>Help & support</CustomText>
                          </CustomBox>
                          <ChevronRightIcon />
                      </CustomBox>
                  </CustomPressable>
                </CustomBox>
                
                <CustomPressable onPress={logOutPresentModal}>
                    <CustomBox borderWidth={1} borderColor='brandPrimary' borderRadius={40} p={12} justifyContent='center' alignItems='center'>
                        <CustomText variant='T1620600' color='brandPrimary' textTransform='capitalize'>Log Out</CustomText>
                    </CustomBox>
                </CustomPressable>
            </CustomBox>
            

            <BottomSheetModal
					name='logOut'
					ref={logOutModalRef}
					index={1}
					snapPoints={logOutSnapPoints}
					handleComponent={handle}
					backdropComponent={logOutRenderBackdrop}>
					<UseBottomSheetView
				style={{
					flex: 1,
					borderTopLeftRadius: 8,
					borderTopRightRadius: 8
				}}>
				<CustomBox alignItems='flex-start' pt={33} paddingHorizontal={19}>
					<LogoutIcon  />
					<CustomText variant='T1620600' mt={16} mb={4}>
                        Log Out?
					</CustomText>
					<CustomText
                        variant='T1420400'
                        color='tetiaryText'
						textAlign='center'
						mb={20}>
						Are you sure you want to log out of this account?
					</CustomText>
                        <CustomBox width='100%' gap={15}>
                            <CustomPressable onPress={() => {
                                logOutModalDismiss()
                                userLogout()
                                router.replace('/')
                            }}>
                                <CustomBox backgroundColor='secondary_red' borderRadius={40} p={12} justifyContent='center' alignItems='center'>
                                    <CustomText variant='T1620600' color='white' textTransform='capitalize'>Log Out</CustomText>
                                </CustomBox>
                            </CustomPressable>
                            <CustomPressable onPress={logOutModalDismiss}>
                                <CustomBox borderWidth={1} borderColor='secondaryBordery' borderRadius={40} p={12} justifyContent='center' alignItems='center'>
                                    <CustomText variant='T1620600' textTransform='capitalize'>Cancel</CustomText>
                                </CustomBox>
                            </CustomPressable>
					</CustomBox>
				</CustomBox>
			</UseBottomSheetView>
				</BottomSheetModal>
        </HomeLayoutWrapper>
    )
}
