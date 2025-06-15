import {CustomBox, CustomButton, CustomInput, CustomText} from "../../src/components";
import { AuthLayoutWrapper } from "../../src/components";
import {Formik} from "formik";
import {InfoIcon} from "../../assets/icons";
import {useRouter} from "expo-router";
import {useMutation} from "@tanstack/react-query";
import {SignupApi} from "../../src/services/Auth/AuthServices";
import { MMKV } from "../../src/lib/mmkv";
import { validateValues } from '../../src/lib/validateValues';
import { isValidEmail } from '../../src/lib/isValidEmail';
import { passwordHash } from '../../src/lib/encryptPassword';
import { displaySuccessMessage } from '@/lib/toast';


export default function RegisterScreen() {
    const router = useRouter()
    const useSignupApi = useMutation({
        mutationFn: SignupApi,
        onSuccess: () => {
            displaySuccessMessage('Registration successful');
            router.push({ pathname: '/verify', params: { type: 'signup'} });
        },
        onSettled: () => {
            // router.push('/verify')
        }
    })

    return (
        <AuthLayoutWrapper label="Register" backFn={() => {}}>
            <CustomBox>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    onSubmit={(values) => {
                        void MMKV.setItem("email", values.email);
                        useSignupApi.mutate({
                            first_name: values.firstName,
                            last_name: values.lastName,
                            email: values.email,
                            password: passwordHash(values.password),
                            expo_push_token: ""
                        })
                    }}
                >
                    {({ handleSubmit, values }) => (
                        <CustomBox flex={1} gap={10} mb={20}>
                            <CustomBox flexDirection='row' gap={12}>
                                <CustomBox flex={1}>
                                    <CustomInput label='first name' name='firstName' placeholder='John' />
                                </CustomBox>
                                <CustomBox flex={1}>
                                    <CustomInput label='last name' name='lastName' placeholder='Doe' />
                                </CustomBox>
                            </CustomBox>
                            <CustomInput label='email' name='email' placeholder='Email Address' />
                            <CustomBox>
                                <CustomInput label='password' secureTextEntry name='password' placeholder='**********' />
                                <CustomBox flexDirection='row' alignItems='center' gap={4} mt={8}>
                                    <InfoIcon />
                                    <CustomText variant='T1422400' color='gray_07'>Must contain 6 characters</CustomText>
                                </CustomBox>
                            </CustomBox>
                            <CustomInput label='confirm password' secureTextEntry name='confirmPassword' placeholder='**********' />
                            <CustomBox my={12}>
                                <CustomButton
                                    disabled={!(validateValues(values) && isValidEmail(values.email))}
                                    onPress={handleSubmit}
                                    loading={useSignupApi.isPending} label='Sign Up' />
                            </CustomBox>
                        </CustomBox>
                    )}
                </Formik>
            </CustomBox>
        </AuthLayoutWrapper>
    )
}
