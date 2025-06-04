import {CustomBox, CustomButton, CustomInput, CustomText} from "../../src/components";
import { AuthLayoutWrapper } from "../../src/components";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import { MMKV } from "../../src/lib/mmkv";
import {useMutation} from "@tanstack/react-query";
import {SignupApi} from "../../src/services/Auth/AuthServices.types";

const Description = async () => {
    const email = await MMKV.getItem("email");
    return (
        <CustomBox alignItems='center' mt={12}>
            <CustomText variant='T1422400' color='neutral_n800'>Code has been sent to <CustomText variant='T1422600'>{email as any}</CustomText></CustomText>
            <CustomText variant='T1422400' color='neutral_n800'>Enter the code to verify your account</CustomText>
        </CustomBox>
    )
}

export default function VerifyScreen() {
    const router = useRouter()
    const useSignupApi = useMutation({
        mutationFn: SignupApi,
        onSettled: () => {
            router.push('/successRegistration')
        }
    })

    return (
        <AuthLayoutWrapper
            label="Verify Account"
            description={Description}
            backFn={() => {
                router.back()
            }}
        >
            <CustomBox>
                <Formik
                    initialValues={{
                        code: '',
                    }}
                    onSubmit={() => {
                        useSignupApi.mutate({})
                    }}
                >
                    {({ handleSubmit }) => (
                        <CustomBox gap={12}>
                            <CustomInput label='Enter code' name='code' placeholder='Enter 4-Digit Code' />
                            <CustomBox alignItems='center' gap={8}>
                                <CustomText variant='T1422400' color='neutral_n600'>Didn't Receive Code? <CustomText variant='T1422600' color='neutral_n400'>Resend Code</CustomText></CustomText>
                                <CustomText variant='T1422400' color='neutral_n600'>Resend code in 00:59</CustomText>
                            </CustomBox>
                            <CustomBox mt={10}>
                                <CustomButton onPress={handleSubmit} loading={useSignupApi.isPending} label='Verify Account' />
                            </CustomBox>
                        </CustomBox>
                    )}
                </Formik>
            </CustomBox>
        </AuthLayoutWrapper>
    )
}
