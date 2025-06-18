import {CustomBox, CustomButton, CustomInput, CustomPressable, CustomText} from "../../src/components";
import { AuthLayoutWrapper } from "@/components";
import {Formik} from "formik";
import {Link, useRouter} from "expo-router";
import { Keyboard } from 'react-native';
import { validateValues } from '@lib/validateValues';
import { isValidEmail } from '@lib/isValidEmail';
import { MMKV } from '@lib/mmkv';
import { passwordHash } from '@lib/encryptPassword';
import { useMutation } from '@tanstack/react-query';
import { LoginApi, GetUsersDetails, RefreshOTP } from '@services/Auth/AuthServices'
import { useAppStore } from '@store/AppStore';
import { displayErrorMessage, displaySuccessMessage } from '@/lib/toast';

export default function LoginScreen() {
    const router = useRouter()
    const { authData, userLogin } = useAppStore();

    const useRefreshOTP = useMutation({
		mutationFn: RefreshOTP,
        onSuccess: (data) => {
            if (data.success) {
                router.push('/verify')
            }
        }
	});

    const useGetUsers = useMutation({
        mutationFn: GetUsersDetails,
        onSuccess: (data) => {
            displaySuccessMessage('Login Successful');
            userLogin(data);
            router.push('/addBank')
		},
        onError: (error: any) => {
            console.log('login error', error);
		},
		onSettled: () => {
		}
	});

    const useLogin = useMutation({
        mutationFn: LoginApi,
        onSuccess: (data, variables) => {
            if (data.access_token) {
                authData.saveToken(data);
                MMKV.setMap('TokenData', data);
                useGetUsers.mutate()
            }
          },
        onError: (error: any, variables) => {
            const errorMsg = error.message[0]?.msg || error.message;
            if (errorMsg === 'Email not verified, please verify your email') {
				useRefreshOTP.mutate({ email: variables.email });
            }
            // displayErrorMessage(errorMsg)

          }
      });

    return (
        <AuthLayoutWrapper label="Login" backFn={() => {}}>
            <CustomBox>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={(values) => {
                        Keyboard.dismiss();
                        useLogin.mutate({
							email: values.email.toLowerCase(),
							password: passwordHash(values.password)
						});
                    }}
                >
                    {({ handleSubmit, values }) => (
                        <CustomBox gap={10}>
                            <CustomInput label='email' name='email' placeholder='Email Address' />
                            <CustomBox>
                                <CustomInput label='password' secureTextEntry name='password' placeholder='**********' />
                                <CustomBox alignItems='flex-end' paddingVertical={12}>
                                    <CustomPressable onPress={() => { router.push('/forgotPassword') }}>
                                        <CustomText variant='T1422500' color='accent_color'>Forgot Password?</CustomText>
                                    </CustomPressable>
                                </CustomBox>
                            </CustomBox>
                            <CustomBox mb={22}>
                                <CustomButton
                                    disabled={!validateValues(values) || !isValidEmail(values.email)}
                                    onPress={handleSubmit}
                                    loading={useRefreshOTP.isPending || useLogin.isPending || useGetUsers.isPending}
                                    label='Login' />
                            </CustomBox>
                            <CustomBox flexDirection='row' justifyContent={'center'}>
                                <CustomText textAlign='center' color='gray_950'>Don’t have an account? </CustomText>
                                <Link href={'/register'} push asChild>
                                    <CustomText variant='T1422500' color='accent_color'>Sign up</CustomText>
                                </Link>

                            </CustomBox>
                        </CustomBox>
                    )}
                </Formik>
            </CustomBox>
        </AuthLayoutWrapper>
    )
}
