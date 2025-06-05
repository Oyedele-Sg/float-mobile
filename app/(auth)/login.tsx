import {CustomBox, CustomButton, CustomInput, CustomPressable, CustomText} from "../../src/components";
import { AuthLayoutWrapper } from "../../src/components";
import {Formik} from "formik";
import {Link, useRouter} from "expo-router";
import { Pressable } from 'react-native';


export default function LoginScreen() {
    const router = useRouter()

    return (
        <AuthLayoutWrapper label="Login" backFn={() => {}}>
            <CustomBox>
                <Formik
                    initialValues={{
                        emailAddress: '',
                        password: '',
                    }}
                    onSubmit={() => {
                        router.push('/addBank')
                    }}
                >
                    {({ handleSubmit }) => (
                        <CustomBox gap={10}>
                            <CustomInput label='email' name='emailAddress' placeholder='Email Address' />
                            <CustomBox>
                                <CustomInput label='password' secureTextEntry name='password' placeholder='**********' />
                                <CustomBox alignItems='flex-end' paddingVertical={12}>
                                    <CustomPressable onPress={() => { router.push('/forgotPassword') }}>
                                        <CustomText variant='T1422500' color='accent_color'>Forgot Password?</CustomText>
                                    </CustomPressable>
                                </CustomBox>
                            </CustomBox>
                            <CustomBox mb={22}>
                                <CustomButton onPress={handleSubmit} label='Login' />
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
