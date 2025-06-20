import {CustomBox, CustomButton, CustomInput, CustomText} from "@/components";
import { AuthLayoutWrapper } from "@/components";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import { useMutation } from '@tanstack/react-query';
import { ForgotPasswordApi } from '@/services/Auth/AuthServices';
import { isValidEmail } from '@/lib/isValidEmail';

const Description = () => {
    return (
        <CustomBox alignItems='center' mt={12}>
            <CustomText variant='T1422400' color='neutral_n800' textAlign='center'>No worries! Enter your email address below and we will send you a code to reset password.</CustomText>
        </CustomBox>
    )
}

export default function ForgotPasswordScreen() {
    const router = useRouter()
    const useForgetPasswordApi = useMutation({
        mutationFn: ForgotPasswordApi,
          onSuccess: (data, variables) => {
            if (data.success) {
                router.push({ pathname: '/verify', params: { type: 'forgotpassword', email: variables } });
            }
          },
          onError: (data: any) => {
            // displayErrorMessage('Something went wrong!', `${data.message}`);
          },
      });

    return (
        <AuthLayoutWrapper
            label="Forgot Password"
            backFn={() => {}}
            description={Description}
        >
            <CustomBox>
                <Formik
                    initialValues={{
                        email: '',
                    }}
                    onSubmit={(values) => {
                        useForgetPasswordApi.mutate(values.email);
                        // router.push("/createNewPassword");
                    }}
                >
                    {({ handleSubmit, values }) => (
                        <CustomBox gap={22}>
                            <CustomInput label='email' name='email' placeholder='Email Address' />
                            <CustomBox>
                                <CustomButton
                                    loading={useForgetPasswordApi.isPending}
                                    disabled={!isValidEmail(values.email)}
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
