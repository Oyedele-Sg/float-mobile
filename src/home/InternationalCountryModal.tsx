import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { FlatList } from 'react-native-gesture-handler';
import CountryFlag from 'react-native-country-flag';
import { useShallow } from 'zustand/react/shallow';
// import { CountryDataInterface } from '@features/auth/types/authentication.types';
import { useAppStore } from 'src/store/AppStore';
import { CustomBox, CustomText, StyledInput, UseBottomSheetView } from 'src/components';
import { useGetInternationalFormFieilds } from 'src/services/Home/homeServices';

const DATA = [
	{ countryName: 'United States', countryCode: 'US' },
	{ countryName: 'Canada', countryCode: 'CA' },
	{ countryName: 'Nigeria', countryCode: 'NG' },
];

type Props = {
  onClose: () => void;
};

export const InternationalCountryModal = ({ onClose }: Props) => {
  const { setInternationalPayoutCountry } = useAppStore(useShallow((state) => state.send));
  const [search, setSearch] = useState<string>('');
	const [formDataCountryCodes, setformDataCountryCodes] = useState<string[]>(
		[]
	);
	// const [countriesData, setCountriesData] =
	// 	useState<CountryDataInterface[]>([]);
	// const countryData = useGetCountries();
	const formData = useGetInternationalFormFieilds();

	const getCountryName = (countryCode: string) => {
		const country = DATA.find(
			(item) => item.countryCode === countryCode
		);
		return country ? country.countryName : countryCode;
	};

  const filteredCountries = formDataCountryCodes
    .filter((card) => getCountryName(card).toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => getCountryName(a).localeCompare(getCountryName(b)));

	useEffect(() => {
		if (!formData.isLoading && formData.data) {
			setformDataCountryCodes(Object.keys(formData.data));
		}
	}, [formData.isLoading, formData.data]);
	// useEffect(() => {
	// 	if (!countryData.isLoading && countryData.data) {
	// 		setCountriesData(countryData.data);
	// 	}
	// }, [countryData.isLoading, countryData.data]);
	return (
		<UseBottomSheetView
			style={{
				flex: 1,
				borderTopLeftRadius: 8,
				borderTopRightRadius: 8
			}}>
			<CustomBox flex={1} pt={33} paddingHorizontal={19}>
				<CustomBox pb={80} flex={1}>
					<CustomText variant='T2434700' color='gray_950' mb={15}>
						Country
					</CustomText>

					<CustomBox>
						<StyledInput
							placeholder='Search Country'
							value={search}
							onChange={(e) => setSearch(e.nativeEvent.text)}
						/>
					</CustomBox>

					<CustomBox mt={10} mb={15}>
						{formData.isLoading ? (
						<CustomBox></CustomBox>
							// <SkeletonPlaceholder>
							// 	<SkeletonPlaceholder.Item>
							// 		{new Array(15).fill('').map((index) => (
							// 			<SkeletonPlaceholder.Item
							// 				key={index}
							// 				width='auto'
							// 				height={30}
							// 				marginBottom={16}
							// 			/>
							// 		))}
							// 	</SkeletonPlaceholder.Item>
							// </SkeletonPlaceholder>
						) : (
							<FlatList
								data={filteredCountries || []}
								keyExtractor={(item) => item}
								initialNumToRender={25}
								renderItem={({ item }) => (
									<Pressable
										onPress={() => {
											setInternationalPayoutCountry({
												countryName: getCountryName(item),
												countryCode: item
											});
											onClose();
										}}>
										<CustomBox
											paddingVertical={10}
											flexDirection='row'
											alignItems='center'>
											<CustomBox
												width={30}
												height={30}
												borderRadius={20}
												// bg='grey_50'
												alignItems='center'
												justifyContent='center'>
												<CountryFlag isoCode={item} size={15} />
											</CustomBox>
											<CustomText ml={8} variant='T1422600' color='gray_950'>
												{getCountryName(item)}
											</CustomText>
										</CustomBox>
									</Pressable>
								)}
							/>
						)}
					</CustomBox>
				</CustomBox>
			</CustomBox>
		</UseBottomSheetView>
	);
};
