import {CustomBox, CustomButton, CustomInput, CustomPressable, CustomText} from "../../src/components";
import { AuthLayoutWrapper } from "../../src/components";
import {Formik} from "formik";
import {Link, useRouter} from "expo-router";
import { Keyboard, Pressable } from 'react-native';
import { validateValues } from '../../src/lib/validateValues';
import { isValidEmail } from '../../src/lib/isValidEmail';
import { MMKV } from '../../src/lib/mmkv';
import { passwordHash } from '../../src/lib/encryptPassword';
import { useMutation } from '@tanstack/react-query';
import { LoginApi, GetUsersDetails } from '../../src/services/Auth/AuthServices'
import { useAppStore } from '../../src/store/AppStore';

export default function LoginScreen() {
    const router = useRouter()
    const { authData, userLogin } = useAppStore();
    
    const useGetUsers = useMutation({
        mutationFn: GetUsersDetails,
		onSuccess: (data) => {
            console.log('UESER DATA', JSON.stringify(data, null, 2));
            userLogin(data);
            router.push('/addBank')

		},
		onError: () => {
		},
		onSettled: () => {
		}
	});

    const useLogin = useMutation({
        mutationFn: LoginApi,
        onSuccess: (data, variables) => {
              console.log('LOGIN DATA', data);
            if (data.access_token) {
                authData.saveToken(data);
                MMKV.setItem('TokenData', data.access_token);
                useGetUsers.mutate()
            }
          },
          onError: (error: Error, variables) => {
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
                                    // disabled={!validateValues(values)}
                                    onPress={handleSubmit}
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
