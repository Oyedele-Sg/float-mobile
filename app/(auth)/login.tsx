import {CustomBox, CustomButton, CustomInput, CustomPressable, CustomText} from "../../src/components";
import { AuthLayoutWrapper } from "../../src/components";
import {Formik} from "formik";
import {useRouter} from "expo-router";


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
                        router.back()
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
                                <CustomButton onPress={handleSubmit} label='Sign Up' />
                            </CustomBox>
                            <CustomText textAlign='center' color='gray_950'>Don’t have an account? <CustomText variant='T1422500' color='accent_color'>Sign up</CustomText></CustomText>
                        </CustomBox>
                    )}
                </Formik>
            </CustomBox>
        </AuthLayoutWrapper>
    )
}
