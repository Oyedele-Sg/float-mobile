import {CustomBox, CustomButton, CustomInput, CustomText} from "../../src/components";
import { AuthLayoutWrapper } from "../../src/components";
import { Formik } from "formik";
import { useRouter } from "expo-router";

const Description = () => {
    return (
        <CustomBox alignItems='center' mt={12}>
            <CustomText variant='T1422400' color='neutral_n800' textAlign='center'>No worries! Enter your email address below and we will send you a code to reset password.</CustomText>
        </CustomBox>
    )
}

export default function ForgotPasswordScreen() {
    const router = useRouter()

    return (
        <AuthLayoutWrapper
            label="Forgot Password"
            backFn={() => {}}
            description={Description}
        >
            <CustomBox>
                <Formik
                    initialValues={{
                        emailAddress: '',
                    }}
                    onSubmit={() => {
                        router.push("/createNewPassword");
                    }}
                >
                    {({ handleSubmit }) => (
                        <CustomBox gap={22}>
                            <CustomInput label='email' name='emailAddress' placeholder='Email Address' />
                            <CustomBox>
                                <CustomButton
                                    onPress={handleSubmit}
                                    label='Send Code'
                                />
                            </CustomBox>
                        </CustomBox>
                    )}
                </Formik>
            </CustomBox>
        </AuthLayoutWrapper>
    )
}
