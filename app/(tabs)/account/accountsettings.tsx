import {CustomBox, CustomButton, CustomInput, CustomText, HomeLayoutWrapper, Screen} from "@/components";
import {Formik} from "formik";
import { useRouter } from "expo-router";
import {useAppStore} from "@store/AppStore";
import {useShallow} from "zustand/shallow";

export default function ChangePasswordScreen() {
    const { first_name, last_name, email, phone_number } = useAppStore(useShallow((state) => state.userData));
    const router = useRouter()

    return (
        <HomeLayoutWrapper header='Account Settings' backBt>
            <CustomBox>
                <Formik
                    initialValues={{
                        first_name: first_name || '',
                        last_name: last_name || '',
                        email: email || '',
                        phone_number: phone_number || '',
                    }}
                    onSubmit={() => {
                        
                    }}
                >
                    {({ handleSubmit }) => (
                        <CustomBox mt={25}>
                            <CustomBox mb={27} gap={13}>
                                <CustomText variant='T1824600' color='headertext'>{first_name} {last_name}</CustomText>
                                <CustomText variant='T1422500' color='gray_text'>{email}</CustomText>
                            </CustomBox>
                            <CustomBox gap={12}>
                                <CustomBox flexDirection='row' gap={12}>
                                    <CustomBox flex={1}>
                                        <CustomInput name="first_name" placeholder='First Name' />
                                    </CustomBox>
                                    <CustomBox flex={1}>
                                        <CustomInput name="last_name" placeholder='Last Name' />
                                    </CustomBox>
                                </CustomBox>
                                <CustomInput name="email" placeholder='Email' />
                                <CustomInput name="phone_number" placeholder='Phone Number' />
                            </CustomBox>

                            <CustomBox mt={22}>
                                <CustomButton onPress={handleSubmit} label='Save' />
                            </CustomBox>
                        </CustomBox>
                    )}
                </Formik>
            </CustomBox>
        </HomeLayoutWrapper>
    )
}
