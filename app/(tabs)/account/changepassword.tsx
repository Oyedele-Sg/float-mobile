import {CustomBox, CustomButton, CustomInput, CustomText, HomeLayoutWrapper, Screen} from "@/components";
import {Formik} from "formik";
import { useRouter } from "expo-router";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {ForgotPasswordApi, ResetPasswordApi} from "@services/Auth/AuthServices";
import {useAppStore} from "@store/AppStore";
import {useShallow} from "zustand/shallow";

export default function ChangePasswordScreen() {
    const router = useRouter()
    const { email } = useAppStore(useShallow((state) => state.userData));
    const [otpSent, setOtpSent] = useState<boolean>(false)
    const useForgetPasswordApi = useMutation({
        mutationFn: ForgotPasswordApi,
        onSuccess: (data) => {
            if (data.success) {
                setOtpSent(true)
            }
        },
        onError: (data: any) => {
        },
    });

    const useResetPasswordApi = useMutation({
        mutationFn: ResetPasswordApi,
        onSuccess: (data) => {
            if (data) {
                router.push('/account')
            }
        },
        onError: (data: any) => {
        }
    });

    return (
        <HomeLayoutWrapper header='Change Password' backBt backFn={() => {
            if(otpSent){
                setOtpSent(false)
            } else {
                router.back()
            }
        }}>
            <CustomBox>
                <Formik
                    initialValues={{
                        newPassword: '',
                        confirmPassword: '',
                        otp: "",
                    }}
                    onSubmit={(values) => {
                        if(!otpSent) {
                            useForgetPasswordApi.mutate(email)
                        } else {
                            useResetPasswordApi.mutate({
                               otp: values.otp,
                               password: values.newPassword,
                            })
                        }
                    }}
                >
                    {({ handleSubmit, values }) => (
                        <CustomBox mt={25}>
                            {otpSent
                                ? <CustomBox gap={12}>
                                    <CustomBox>
                                        <CustomText variant='T1422400' color='neutral_n800'>Code has been send to your email</CustomText>
                                    </CustomBox>
                                    <CustomInput label='Enter Code' name="otp" placeholder='Enter 4-Digit Code' />
                                    <CustomBox alignItems='center' gap={8}>
                                        <CustomText variant='T1422400' color='neutral_n600'>
                                            Didn't Receive Code?
                                            <CustomText onPress={() => {}} variant='T1422600' color='neutral_n400'>
                                                {" "}Resend Code
                                            </CustomText>
                                        </CustomText>
                                    </CustomBox>
                                </CustomBox>
                                : <CustomBox gap={12}>
                                    <CustomInput label='New Password' name="newPassword" placeholder='Enter New Password' />
                                    <CustomInput label='Confirm New Password' name="confirmPassword" placeholder='Confirm New Password' />
                                </CustomBox>
                            }

                            <CustomBox mt={22}>
                                <CustomButton
                                    onPress={handleSubmit}
                                    disabled={values.newPassword.length <= 0 || values.newPassword !== values.confirmPassword}
                                    label={otpSent ? 'Reset' : 'Continue'}
                                    loading={useForgetPasswordApi.isPending || useResetPasswordApi.isPending}
                                />
                            </CustomBox>
                        </CustomBox>
                    )}
                </Formik>
            </CustomBox>
        </HomeLayoutWrapper>
    )
}
