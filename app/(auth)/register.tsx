import {CustomBox, CustomButton, CustomInput, CustomText} from "../../src/components";
import { AuthLayoutWrapper } from "../../src/components";
import {Formik} from "formik";
import {InfoIcon} from "../../assets/icons";
import {useRouter} from "expo-router";


export default function RegisterScreen() {
    const router = useRouter()

    return (
        <AuthLayoutWrapper label="Register" backFn={() => {}}>
            <CustomBox>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        emailAddress: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    onSubmit={() => {
                        router.push('/verify')
                    }}
                >
                    {({ handleSubmit }) => (
                        <CustomBox gap={10}>
                            <CustomBox flexDirection='row' gap={12}>
                                <CustomBox flex={1}>
                                    <CustomInput label='first name' name='firstName' placeholder='John' />
                                </CustomBox>
                                <CustomBox flex={1}>
                                    <CustomInput label='last name' name='lastName' placeholder='Doe' />
                                </CustomBox>
                            </CustomBox>
                            <CustomInput label='email' name='emailAddress' placeholder='Email Address' />
                            <CustomBox>
                                <CustomInput label='password' secureTextEntry name='password' placeholder='**********' />
                                <CustomBox flexDirection='row' alignItems='center' gap={4} mt={8}>
                                    <InfoIcon />
                                    <CustomText variant='T1422400' color='gray_07'>Must contain 6 characters</CustomText>
                                </CustomBox>
                            </CustomBox>
                            <CustomInput label='confirm password' secureTextEntry name='confirmPassword' placeholder='**********' />
                            <CustomBox mt={12}>
                                <CustomButton onPress={handleSubmit} label='Sign Up' />
                            </CustomBox>
                        </CustomBox>
                    )}
                </Formik>
            </CustomBox>
        </AuthLayoutWrapper>
    )
}
