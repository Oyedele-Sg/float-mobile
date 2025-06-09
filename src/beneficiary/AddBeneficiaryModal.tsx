import React from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { CustomBox, CustomButton, CustomText, UseBottomSheetView } from '@/components';
import { CheckMarkIcon } from '@assets/icons';

type Props = {
	onPress: () => void;
};

export const AddBeneficiaryModal = ({ onPress }: Props) => {
	return (
		<BottomSheetScrollView contentContainerStyle={{ paddingBottom: 35 }}>
			<UseBottomSheetView
				style={{
					flex: 1,
					borderTopLeftRadius: 8,
					borderTopRightRadius: 8
				}}>
				<CustomBox alignItems='center' pt={33} paddingHorizontal={19}>
					<CheckMarkIcon width={50} height={50}/>
					<CustomText variant='T1824600' mt={16} color='gray_950' mb={4}>
						Beneficiary Approval Pending
					</CustomText>
					<CustomText
						variant='T1420400'
						color='gray_950'
						textAlign='center'
						mb={20}>
						Your request to add a beneficiary is being processed and will be
						approved within few minutes.
					</CustomText>

					<CustomBox width={'100%'} mt={10}>
						<CustomButton
							size='big'
							label='Done'
							buttonStyle={{
								backgroundColor: '#0D6494',
								borderColor: '#0D6494'
							}}
							onPress={() => {
								onPress();
							}}
						/>
					</CustomBox>
				</CustomBox>
			</UseBottomSheetView>
		</BottomSheetScrollView>
	);
};
