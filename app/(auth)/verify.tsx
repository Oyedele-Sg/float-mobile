import {CustomBox, CustomButton, CustomInput, CustomText} from "../../src/components";
import { AuthLayoutWrapper } from "../../src/components";
import { Formik } from "formik";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MMKV } from "../../src/lib/mmkv";
import {useMutation} from "@tanstack/react-query";
import { Keyboard } from 'react-native';
import { EmailVerifyOTP, GetUsersDetails } from '@/services/Auth/AuthServices';
import { useAppStore } from '@/store/AppStore';

const Description = async () => {
    const email = await MMKV.getItem("email");
    return (
        <CustomBox alignItems='center' mt={12}>
            <CustomText variant='T1422400' color='neutral_n800'>Code has been sent to <CustomText variant='T1422600'>{email as any}</CustomText></CustomText>
            <CustomText variant='T1422400' color='neutral_n800'>Enter the code to verify your account</CustomText>
        </CustomBox>
    )
}

export default function VerifyScreen() {
    const router = useRouter()
    const { authData, userLogin } = useAppStore();
    const { type } = useLocalSearchParams<{ type: 'signup' | 'forgotpassword' }>();
    
    const useGetUsers = useMutation({
        mutationFn: GetUsersDetails,
      onSuccess: (data) => {
            console.log('UESER DATA', JSON.stringify(data, null, 2));
            userLogin(data);
            router.push('/successRegistration')
      },
      onError: () => {
      },
      onSettled: () => {
      }
  });
    const useVerifyOtp = useMutation({
        mutationFn: EmailVerifyOTP,
          onSuccess: (data, variables) => {
              if (data.success) {
                  if (data.data?.access_token && type === 'signup' ) {
                    authData.saveToken(data.data);
                    MMKV.setItem('TokenData', data.data.access_token);
                    useGetUsers.mutate()
                  }
                  console.log('OTPDATA', data);
            }
          },
          onError: () => {
            // setStatus(false);
          },
      });

    return (
        <AuthLayoutWrapper
            label="Verify Account"
            description={Description}
            backFn={() => {
                router.back()
            }}
        >
            <CustomBox>
                <Formik
                    initialValues={{
                        code: '',
                    }}
                    onSubmit={(values) => {
                        Keyboard.dismiss()
                        if (type === 'signup') {
                            useVerifyOtp.mutate({ otp: values.code, is_signup: true });
                        } else if (type === 'forgotpassword') {
                            router.push({ pathname: '/createNewPassword', params: { code: values.code} });
                        }
                        
                    }}
                >
                    {({ handleSubmit }) => (
                        <CustomBox gap={12}>
                            <CustomInput maxLength={4} label='Enter code' name='code' placeholder='Enter 4-Digit Code' />
                            <CustomBox alignItems='center' gap={8}>
                                <CustomText variant='T1422400' color='neutral_n600'>Didn't Receive Code? <CustomText variant='T1422600' color='neutral_n400'>Resend Code</CustomText></CustomText>
                                <CustomText variant='T1422400' color='neutral_n600'>Resend code in 00:59</CustomText>
                            </CustomBox>
                            <CustomBox mt={10}>
                                <CustomButton onPress={handleSubmit} loading={useVerifyOtp.isPending} label='Verify Account' />
                            </CustomBox>
                        </CustomBox>
                    )}
                </Formik>
            </CustomBox>
        </AuthLayoutWrapper>
    )
}
