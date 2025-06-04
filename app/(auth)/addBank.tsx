import {CustomBox, CustomButton, CustomInput, CustomText, Screen} from "../../src/components";
import {Form, Formik} from "formik";
import { useRouter } from "expo-router";

export default function AddBankScreen() {
    const router = useRouter()

    return (
       <Screen preset='auto' safeAreaEdges={['top']}>
           <CustomBox paddingHorizontal={20} mt={20}>
               <CustomText variant='T2434700' color='neutral_n800'>Add Bank Card</CustomText>
               <CustomText variant='T1422400' color='gray_950'>Enter card details you’ll use for transactions</CustomText>

               <Formik initialValues={{}} onSubmit={() => {}}>
                   {() => (
                       <CustomBox mt={40}>
                           <CustomText mb={10}>Add Bank</CustomText>
                           <CustomInput name="" placeholder='Card Number' />
                           <CustomBox flexDirection='row' gap={12} mt={12} mb={12}>
                               <CustomBox flex={1}>
                                   <CustomInput name="" placeholder='MM/YY' />
                               </CustomBox>
                               <CustomBox flex={1}>
                                   <CustomInput name="" placeholder='CVV' />
                               </CustomBox>
                           </CustomBox>
                           <CustomInput name="" placeholder='Full Name' />

                           <CustomBox mt={22}>
                               <CustomButton onPress={() => {}} label='Add Card' />
                           </CustomBox>
                       </CustomBox>
                   )}
               </Formik>
           </CustomBox>
       </Screen>
    )
}
