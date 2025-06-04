import {CustomBox, CustomButton, CustomInput, CustomText} from "../../src/components";
import { AuthLayoutWrapper } from "../../src/components";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import {InfoIcon} from "../../assets/icons";

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
                    onSubmit={() => {}}
                >
                    {({ handleSubmit }) => (
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
                                    onPress={handleSubmit}
                                    label='Resend Password'
                                />
                            </CustomBox>
                        </CustomBox>
                    )}
                </Formik>
            </CustomBox>
        </AuthLayoutWrapper>
    )
}
