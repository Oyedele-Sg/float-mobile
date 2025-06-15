import {CustomBox, CustomButton, CustomInput, CustomText} from "../../src/components";
import { AuthLayoutWrapper } from "../../src/components";
import { Formik } from "formik";
import { useLocalSearchParams, useRouter } from "expo-router";
import {InfoIcon} from "../../assets/icons";
import { useMutation } from '@tanstack/react-query';
import { ResetPasswordApi } from '@/services/Auth/AuthServices';
import { passwordHash } from '@/lib/encryptPassword';
import { validateValues } from '@/lib/validateValues';
import { displaySuccessMessage } from '@/lib/toast';

const Description = () => {
    return (
        <CustomBox alignItems='center' mt={12}>
            <CustomText variant='T1422400' color='neutral_n800' textAlign='center'>Please enter and confirm your new password.</CustomText>
            <CustomText variant='T1422400' color='neutral_n800' textAlign='center'>You will need to login after you reset.</CustomText>
        </CustomBox>
    )
}

export default function CreateNewPasswordScreen() {
    const router = useRouter()
    const { code } = useLocalSearchParams<{ code: string }>();

    const useResetPasswordApi = useMutation({
        mutationFn: ResetPasswordApi,
        onSuccess: (data) => {
            if (data) {
                router.push('/login')
                displaySuccessMessage('Password reset successful, please login with your new password');
            }
          },
        onError: (data: any) => {
              console.log('error', data);
          }
      });

    return (
        <AuthLayoutWrapper
            label="Create New Password"
            backFn={() => {}}
            description={Description}
        >
            <CustomBox>
                <Formik
                    initialValues={{
                        password: '',
                        confirmPassword: '',
                    }}
                    onSubmit={(values) => {
                        if (code) {
                            if (values.confirmPassword !== values.password) {
                                console.log('passwords do not match');
                                return
                            }
                            useResetPasswordApi.mutate({
                                password: passwordHash(values.password),
                                otp: code,
                              });
                        }
                    }}
                >
                    {({ handleSubmit, values }) => (
                        <CustomBox gap={22}>
                            <CustomBox>
                                <CustomInput label='password' secureTextEntry name='password' placeholder='**********' />
                                <CustomBox flexDirection='row' alignItems='center' gap={4} mt={8}>
                                    <InfoIcon />
                                    <CustomText variant='T1422400' color='gray_07'>Must contain 6 characters</CustomText>
                                </CustomBox>
                            </CustomBox>
                            <CustomInput label='confirm password' secureTextEntry name='confirmPassword' placeholder='**********' />
                            <CustomBox>
                                <CustomButton
                                    loading={useResetPasswordApi.isPending}
                                    disabled={!validateValues(values)}
                                    onPress={handleSubmit}
                                    label='Reset Password'
                                />
                            </CustomBox>
                        </CustomBox>
                    )}
                </Formik>
            </CustomBox>
        </AuthLayoutWrapper>
    )
}
