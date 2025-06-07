import {CustomBox, CustomButton, CustomInput, CustomText, HomeLayoutWrapper, StyledInput, UseBottomSheetView} from "../../../src/components";
import { Keyboard, Pressable} from "react-native";
import {useRouter} from "expo-router";
import { Formik, FormikProps } from 'formik';
import { ChevronDownIcon } from '../../../assets/icons';
import { useBottomSheetModalHook } from '../../../src/hooks/useBottomSheetModal';
import useScreenSnapshots from '../../../src/hooks/useScreenSnapPoints';
import { useAppStore } from '../../../src/store/AppStore';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useShallow } from 'zustand/shallow';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FlatList } from 'react-native-gesture-handler';
import { convertField } from '@/lib/convertField';
import { createInternationalBeneficiaryApi, useGetInternationalFormFieilds } from '@/services/Home/homeServices';
import { AddBeneficiaryModal } from '@/home/AddBeneficiaryModal';
import { validateValues } from '@/lib/validateValues';

type banksType = {
	nip_bank_code: string;
	bank_name: string;
};

type Field = {
  name: string;
  type: string;
  required: boolean;
  enum?: string[];
  banks?: banksType[];
  pattern?: string;
  const?: string;
  fields?: Field[];
};

const renderFormField = (
  field: Field, formikProps:
    FormikProps<any>,
  bankCodebank: banksType,
	handleOpenModal: (name: string) => void
) => {

  if (field.banks && field.name === 'bank_code') {
		return (
			<CustomBox mt={15} key={field.name}>
				<CustomText variant='T1422400' color='gray_950' mb={12}>
					Bank Name
				</CustomText>
				<Pressable
					onPress={() => {
						handleOpenModal('bank_code');
					}}>
					<CustomBox
						paddingHorizontal={18}
            paddingVertical={8}
            flexDirection="row"
            alignItems="center"
            justifyContent={'space-between'}
            borderRadius={20}
            borderWidth={1}
            flex={1}
            height={40}
            borderColor='neutral_50'>
						{bankCodebank.bank_name ? (
							<CustomText variant="T1422400" color="gray_950">
								{bankCodebank.bank_name}
							</CustomText>
						) : (
							<CustomText variant="T1422400" color="neutral_50">
								Choose bank
							</CustomText>
						)}
						<ChevronDownIcon />
					</CustomBox>
				</Pressable>
			</CustomBox>
		);
	}
  if (field.name === 'bank_name') {
		return;
	}
	if (field.name === 'country' || field.name === 'beneficiary_country') {
		return (
			<CustomBox mt={15}>
				<CustomInput
					key={field.name}
					label={convertField(field.name)}
					name={field.name}
					editable={false}
					placeholder='Enter Account Country Name'
					value={field.const || 'Country'}
					onChangeText={formikProps.handleChange(field.name)}
				/>
			</CustomBox>
		);
	}
	if (field.name === 'type' && field.const === 'BANK') {
		return (
			<CustomBox mt={15}>
				<CustomInput
					key={field.name}
					label={convertField(field.name)}
					name={field.name}
					editable={false}
					placeholder='Enter Account Type'
					value={field.const || 'BANK'}
					onChangeText={formikProps.handleChange(field.name)}
				/>
			</CustomBox>
		);
	}

  // Handle radio buttons for other enums
  if (field.enum) {
    return (
      <CustomBox key={field.name} mt={15}>
        <CustomText variant="T1420400" color="gray_950">
          {convertField(field.name)}
        </CustomText>
        {field.enum.map((option) => (
          <Pressable
            key={option}
            onPress={() => void formikProps.setFieldValue(field.name, option)}
          >
            <CustomBox mt={10} flexDirection="row" alignItems="center" gap={12}>
              <CustomBox
                width={20}
                height={20}
                borderRadius={20}
                bg={
                  formikProps.values[field.name] === option
                    ? 'brandPrimary'
                    : 'neutral_50'
                  }
                borderColor={
                  formikProps.values[field.name] === option
                    ? 'brandPrimary'
                    : 'neutral_50'
                  }
                borderWidth={1}
                alignItems="center"
                justifyContent="center"
              >
                <CustomBox
                  width={10}
                  height={10}
                  bg="secondary_white"
                  borderRadius={10}
                />
              </CustomBox>
              <CustomText variant="T1420400">
                {convertField(option).toLocaleUpperCase()}
              </CustomText>
            </CustomBox>
          </Pressable>
        ))}
      </CustomBox>
    );
  }

  // Render regular input field
  return (
    <CustomBox mt={15} key={field.name}>
      <CustomInput
        label={convertField(field.name)}
        name={field.name}
        placeholder={`Enter ${convertField(field.name)}`}
        value={formikProps.values[field.name]}
        onChangeText={formikProps.handleChange(field.name)}
      />
    </CustomBox>
  );
};

const renderNestedFields = (
  fields: Field[],
  formikProps: FormikProps<any>,
  bankCodebank: banksType,
  handleOpenModal: (name: string) => void
) => fields.map((field) => {
  if (field.type === 'object' && field.fields) {
    return (
      <CustomBox key={`${field.name}`} mt={15}>
        <CustomText variant="T1420600" color="gray_950">
          {convertField(field.name)}
        </CustomText>
        {renderNestedFields(
          field.fields,
          formikProps,
          bankCodebank,
          handleOpenModal
        )}
      </CustomBox>
    );
  }
  return renderFormField(
    {
      ...field,
      name: `beneficiary_${field.name}`,
    },
    formikProps,
    bankCodebank,
    handleOpenModal
  );
});

export default function SendFormScreen() {
  const router = useRouter()
  const { email } = useAppStore(useShallow((state) => state.userData));
  const [bankCodebank, setBankCodebank] = useState<banksType>({nip_bank_code: '', bank_name: '' });
  const {
    countryName,
    countryCode,
    reset
  } = useAppStore(useShallow((state) => state.send));
  const formData = useGetInternationalFormFieilds();
  const [fields, setFields] = useState<Field[]>([]);

  const screenSnapPoints = useScreenSnapshots(['45%', '45%'], ['35%', '35%']);
  const screensSnapPoints = useScreenSnapshots(['60%', '60%'], ['50%', '50%']);

  const [search, setSearch] = useState<string>('');

  const initialValues = fields.reduce<Record<string, any>>((acc, field) => {
    if (field.type === 'object' && field.fields) {
      acc[field.name] = field.fields.reduce<Record<string, any>>(
        (nestedAcc, nestedField) => {
          nestedAcc[nestedField.name] = '';
          return nestedAcc;
        },
        {}
      );
    } else if (field.const) {
      acc[field.name] = field.const;
    } else {
      acc[field.name] = '';
    }
    return acc;
  }, {});

  const bankCodeFields = fields.find((item) => item.name === 'bank_code');
	const filteredBankCodeFields =
		bankCodeFields &&
		bankCodeFields.banks &&
		bankCodeFields.banks.filter((bank) =>
			bank.bank_name.toLowerCase().includes(search.toLowerCase())
		);

  const useCreateInternationalBeneficiaryApi = useMutation({
    mutationFn: createInternationalBeneficiaryApi,
      onSuccess: (data) => {
        if (data) {
          presentModal();
        }
      },
  });

  useEffect(() => {
    if (!formData.isLoading && formData.data && countryName && countryCode) {
 
      setFields(formData.data[countryCode]);
    }
  }, [countryCode, countryName, formData.isLoading]);

	const {
    modalRef: bankCodeModalRef,
    presentModal: bankCodePresentModal,
    snapPoints: bankCodeSnapPoints,
    renderBackdrop: bankCodeRenderBackdrop,
    dismissModal: bankCodeDismissModal,
    handle
  } = useBottomSheetModalHook({
    snapPoints: screensSnapPoints,
    backdropPressBehavior: 'close'
  });

  const {
		modalRef,
		presentModal,
		snapPoints,
		renderBackdrop,
		dismissModal,
		// handle
	} = useBottomSheetModalHook({
		snapPoints: screenSnapPoints,
		backdropPressBehavior: 'none'
	});

  const handleOpenModal = ( name: string) => {
    Keyboard.dismiss();
    if (name === 'bank_code') bankCodePresentModal();

  };

  return (
    <HomeLayoutWrapper backBt header={`Send to ${countryName} Bank`} preset='scroll'>
      <CustomBox flex={1}>
        <CustomBox pb={50}>
          {countryName &&
            countryCode && (
              <CustomBox>
                <CustomBox gap={8} mb={5}>
                  <CustomText variant='T1620600' color='gray_950'>
                    Beneficiary Details
                  </CustomText>
                  <CustomText variant='T1420400' color='gray_800'>
                    Fill in your recipient’s details{' '}
                  </CustomText>
                </CustomBox>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    if (countryCode === 'NG') {
                        const data = {
                          data: {
                            type: values.type,
                            account_number: values.account_number,
                            account_name: values.account_name,
                            bank_name: bankCodebank.bank_name,
                            bank_code: bankCodebank.nip_bank_code
                          },
                          email,
                          countryCode: countryCode
                        };

                        useCreateInternationalBeneficiaryApi.mutate(data);
                      } else {
                        const cleanedData = Object.entries(values).reduce(
                          (acc, [key, value]) => {
                            // @ts-ignore
                            if (value !== null) acc[key] = value;
                            return acc;
                          },
                          {},
                        );
                        const data = {
                          data: cleanedData,
                          email,
                          countryCode,
                        };
                      console.log('DATA', JSON.stringify(data, null, 2));
                      presentModal();
                        useCreateInternationalBeneficiaryApi.mutate(data);
                      }
                  }}
                >
                  {(formikProps) => (
                    <CustomBox>
                      {fields.map((field) => {
                        if (field.type === 'object' && field.fields) {
                          return (
                            <CustomBox mt={15} key={field.name}>
                              <CustomText variant="T1620600" color="gray_950">
                                {convertField(field.name)}
                              </CustomText>
                              {renderNestedFields(field.fields, formikProps, bankCodebank, handleOpenModal)}
                            </CustomBox>
                          );
                        }

                        return renderFormField(field, formikProps, bankCodebank, handleOpenModal);
                      })}

                      <CustomBox height={30} />
                      <CustomButton
                        label='Continue'
                        size='big'
                        loading={useCreateInternationalBeneficiaryApi.isPending
                        }
                        disabled={!validateValues(formikProps.values)}
                        onPress={formikProps.handleSubmit}
                      />
                    </CustomBox>
                  )}
                </Formik>
              </CustomBox>
            )}
        </CustomBox>
      </CustomBox>
      <BottomSheetModal
        name='bankCode'
        ref={bankCodeModalRef}
        snapPoints={bankCodeSnapPoints}
        handleComponent={handle}
        backdropComponent={bankCodeRenderBackdrop}>
        <UseBottomSheetView>
          {bankCodeFields && bankCodeFields.banks &&
            filteredBankCodeFields && (
            <CustomBox pb={100} mt={15}>
              <CustomText
                variant='T1620600'
                color='gray_950'
                // textAlign='center'
                mb={12}>
                Seletct Bank
              </CustomText>
              <CustomBox>
                <StyledInput
                  placeholder='Search Banks'
                  value={search}
                  onChange={(e) => setSearch(e.nativeEvent.text)}
                />
              </CustomBox>
              <CustomBox>
                <FlatList
                  data={filteredBankCodeFields || bankCodeFields.banks || []}
                  keyExtractor={(item) => item.bank_name}
                  initialNumToRender={25}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        setBankCodebank(item);
                        bankCodeDismissModal();
                      }}>
                      <CustomBox
                        paddingTop={15}
                        paddingBottom={12}>
                        <CustomText variant='T1420400' color='gray_950'>
                          {convertField(item.bank_name)}
                        </CustomText>
                      </CustomBox>
                    </Pressable>
                  )}
                />
              </CustomBox>
            </CustomBox>
          )}
        </UseBottomSheetView>
      </BottomSheetModal>
      <BottomSheetModal
				name='requestInfo'
				ref={modalRef}
				index={1}
				snapPoints={snapPoints}
				handleComponent={handle}
				backdropComponent={renderBackdrop}>
				<AddBeneficiaryModal
					onPress={() => {
						dismissModal();
            reset();
						router.push('/dashboard')
					}}
				/>
			</BottomSheetModal>
    </HomeLayoutWrapper>
    )
}
