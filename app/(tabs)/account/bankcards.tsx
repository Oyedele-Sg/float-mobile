import {CustomBox, CustomButton, CustomInput, CustomText, HomeLayoutWrapper, Screen} from "@/components";
import {Formik} from "formik";
import { useRouter } from "expo-router";

export default function BankCardsScreen() {
    const router = useRouter()



    return (
      <HomeLayoutWrapper header='Bank Cards' backBt>
          <CustomBox>
              <Formik
                  initialValues={{
                      card: '',
                      month: '',
                      cvv: '',
                      name: '',
                  }}
                  onSubmit={() => {}}
              >
                  {({ handleSubmit }) => (
                      <CustomBox mt={25}>
                          <CustomText mb={10}>Add your Card</CustomText>
                          <CustomInput name="card" placeholder='Card Number' />
                          <CustomBox flexDirection='row' gap={12} mt={12} mb={12}>
                              <CustomBox flex={1}>
                                  <CustomInput name="month" placeholder='MM/YY' />
                              </CustomBox>
                              <CustomBox flex={1}>
                                  <CustomInput name="cvv" placeholder='CVV' />
                              </CustomBox>
                          </CustomBox>
                          <CustomInput name="name" placeholder='Full Name' />

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
