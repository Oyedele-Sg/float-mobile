import {CustomBox, CustomPressable, CustomText, HomeLayoutWrapper, Screen} from "@/components";
import {useAppStore} from "@store/AppStore";
import {useShallow} from "zustand/shallow";
import {BankCardIcon, ChevronRightIcon, EditUserIcon, HelpIcon, PasswordIcon} from "@assets/icons";
import {useRouter} from "expo-router";


export default function AccountScreen() {
    const router = useRouter()
    const { first_name, last_name, email } = useAppStore(useShallow((state) => state.userData));

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
          </CustomBox>
        </HomeLayoutWrapper>
    )
}
