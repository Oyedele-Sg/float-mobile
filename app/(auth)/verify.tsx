import {CustomBox, CustomButton, CustomInput, CustomPressable, CustomText} from "@/components";
import { AuthLayoutWrapper } from "@/components";
import { Formik } from "formik";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MMKV } from "@lib/mmkv";
import {useMutation} from "@tanstack/react-query";
import { Keyboard } from 'react-native';
import { EmailVerifyOTP, GetUsersDetails, RefreshOTP } from '@/services/Auth/AuthServices';
import { useAppStore } from '@/store/AppStore';
import { displaySuccessMessage } from '@/lib/toast';
import { validateValues } from '@/lib/validateValues';
import { useEffect, useState } from 'react';

const Description = (email: string) => {
    return (
        <CustomBox alignItems='center' mt={12}>
            <CustomText variant='T1422400' color='neutral_n800'>Code has been sent to <CustomText variant='T1422600'>{email}</CustomText></CustomText>
            <CustomText variant='T1422400' color='neutral_n800'>Enter the code to verify your account</CustomText>
        </CustomBox>
    )
}

export default function VerifyScreen() {
    const router = useRouter()
    const { authData, userLogin } = useAppStore();
    const { type, email } = useLocalSearchParams<{ type: 'signup' | 'forgotpassword', email: string }>();
    const [countdown, setCountdown] = useState<number>(60);
    const [showButton, setShowButton] = useState<boolean>(false);

    const useRefreshOTP = useMutation({
        mutationFn: RefreshOTP,
        onSuccess: (data) => {
            if (data.success) {
                displaySuccessMessage('Verification code sent')
            }
        }
    });

    const useGetUsers = useMutation({
        mutationFn: GetUsersDetails,
      onSuccess: (data) => {
          userLogin(data);
          displaySuccessMessage('Account verified successfully');
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
                    MMKV.setMap('TokenData', data.data);
                    useGetUsers.mutate()
                }
            console.log('OTPDATA', data);
            }
        },
        onError: () => {
        // setStatus(false);
        },
    });

    const startCountdown = () => {
        setCountdown(60);
        setShowButton(false);
        const interval = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown === 0) {
              setShowButton(true); // Show button when countdown reaches 0
              clearInterval(interval); // Stop the interval
              return prevCountdown;
            }
            return prevCountdown - 1;
          });
        }, 1000);
        // eslint-disable-next-line consistent-return
        return () => clearInterval(interval);
    };
    
      const handleButtonPress = () => {
        // setIsPinReady(true);
        startCountdown(); 
        if (email) {
          useRefreshOTP.mutate({email});
        }
      };
    
      useEffect(() => {
        startCountdown()
      }, []);

    return (
        <AuthLayoutWrapper
            label="Verify Account"
            description={()=> Description(email)}
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
                        } else if (type === 'forgotpassword' && values.code.length === 4) {
                            router.push({ pathname: '/createNewPassword', params: { code: values.code} });
                        }

                    }}
                >
                    {({ handleSubmit, values }) => (
                        <CustomBox gap={12}>
                            <CustomInput maxLength={4} label='Enter code' name='code' placeholder='Enter 4-Digit Code' />
                            <CustomBox justifyContent='center' flexDirection='row' gap={8}>
                                <CustomText textAlign='center' variant='T1422400' color='neutral_n600'>Didn't Receive Code?</CustomText>
                                {showButton ? (
                                    <CustomPressable onPress={handleButtonPress} >
                                        <CustomText variant='T1422600' color='neutral_n600'>Resend Code</CustomText>
                                    </CustomPressable>
                                ): (
                                    <CustomText variant='T1422600' color='neutral_n400'>Resend Code</CustomText>    
                                )}
                            </CustomBox>
                            <CustomBox alignItems='center'>
                                <CustomText variant='T1422400' color='neutral_n600'>Resend code in 00:{countdown}</CustomText>
                            </CustomBox>
                            <CustomBox mt={10}>
                                <CustomButton
                                    onPress={handleSubmit}
                                    disabled={!validateValues(values)}
                                    loading={useVerifyOtp.isPending || useGetUsers.isPending || useRefreshOTP.isPending}
                                    label='Verify Account' />
                            </CustomBox>
                        </CustomBox>
                    )}
                </Formik>
            </CustomBox>
        </AuthLayoutWrapper>
    )
}
