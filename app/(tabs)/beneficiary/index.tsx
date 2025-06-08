import {CustomBox, CustomPressable, CustomText, HomeLayoutWrapper, SkeletonPlaceholderItem, StyledInput} from "../../../src/components";
import CountryFlag from 'react-native-country-flag';
import { useRouter } from "expo-router";
import { useGetInternationalBeneficiariesPaginated } from '@/services/Home/homeServices';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export const Beneficiary = ({countryCode, name, bank, onPress}: {countryCode: string, name: string, bank: string, onPress: ()=> void}) => {
  return (
    <CustomBox mb={18}>
      <CustomPressable
        onPress={onPress}
      >
        <CustomBox
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          borderWidth={1}
          p={15}
          borderRadius={20}
          borderColor="gray_bg"
          shadowOffset= {{ width: 0, height: 0 }}
          shadowOpacity= {0.05}
          shadowRadius= {2}
          elevation= {1}
          shadowColor='gray_950'
        >
          <CustomBox flexDirection="row" alignItems="center">
            <CustomBox
              width={24}
              height={24}
              borderRadius={24}
              mr={14}
              overflow='hidden'
              bg="gray_bg"
              alignItems="center"
              justifyContent="center"
            >
              <CountryFlag isoCode={countryCode} size={24} />
            </CustomBox>
            <CustomBox>
              <CustomText
                mb={4}
                style={{
                  fontSize: 14.5,
                }}
              >
                {name}
              </CustomText>
              <CustomText
                style={{
                  fontSize: 12.5,
                  opacity: 0.5,
                }}
              >
                {bank}
              </CustomText>
            </CustomBox>
          </CustomBox>
        </CustomBox>
      </CustomPressable>
    </CustomBox>
  );
};


export default function BeneficiaryScreen() {
  const router = useRouter()
  const { data, isLoading, fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, refetch } = useGetInternationalBeneficiariesPaginated();
  const [search, setSearch] = useState<string>('');

  // Flatten paginated results
  const beneficiaries = data?.pages.flatMap(page => page.beneficiaries) ?? [];

  // Apply search filter
  const filteredBeneficiaries = beneficiaries.filter(item =>
    item.foreign_payout_beneficiary.beneficiary_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

	useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <HomeLayoutWrapper header='Saved Beneficiaries'>
      <CustomBox py={20} flex={1}>
					<CustomBox mb={20}>
						<StyledInput
							placeholder='Search Beneficiary'
							value={search}
							onChange={(e) => setSearch(e.nativeEvent.text)}
						/>
					</CustomBox>
        {isLoading ? (
          <CustomBox >
            {new Array(4).fill(null).map((_, index) => (
              <SkeletonPlaceholderItem key={index} height={80} />
            ))}
          </CustomBox>
        ): (
            <FlatList
            data={filteredBeneficiaries}
            keyExtractor={(item, index) =>
              item.foreign_payout_beneficiary.foreign_payout_beneficiary_id + index
            }
            renderItem={({ item }) => (
              <Beneficiary
                countryCode={item.foreign_payout_beneficiary.beneficiary_country}
                name={item.foreign_payout_beneficiary.beneficiary_name}
                bank={item.foreign_payout_beneficiary.beneficiary_bank_name}
                onPress={() => {
                  // setInternationalPayoutID({
									// 	foreign_payout_beneficiary_id:
									// 		item.foreign_payout_beneficiary_id,
									// 	beneficiary_currency:
									// 		item.foreign_payout_beneficiary.beneficiary_currency,
									// 	beneficiary_country:
									// 		item.foreign_payout_beneficiary.beneficiary_country,
									// });
									// selectUser({
									// 	account_name:
									// 		item.foreign_payout_beneficiary.beneficiary_name,
									// 	username: item.foreign_payout_beneficiary.beneficiary_name,
									// 	selfie_image: ''
                  // });
                  router.push({
                    pathname: '/beneficiary/beneficiarydetails', params: {
                      foreign_payout_beneficiary_id: item.foreign_payout_beneficiary_id,
                      beneficiary_currency: item.foreign_payout_beneficiary.beneficiary_currency,
										  beneficiary_country:
                        item.foreign_payout_beneficiary.beneficiary_country,
                      account_name: item.foreign_payout_beneficiary.beneficiary_name,
                      beneficiary_bank_name: item.foreign_payout_beneficiary.beneficiary_bank_name,
                      beneficiary_account_number: item.foreign_payout_beneficiary.beneficiary_account_number,
                    }
                  });
                }}
              />
            )}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
              isFetchingNextPage ? (
                <ActivityIndicator size="small" style={{ marginVertical: 20 }} />
              ) : null
            }
            ListEmptyComponent={
              <CustomBox
                flex={1}
                alignItems="center"
                justifyContent="center"
                py={40}
              >
                <CustomText>No beneficiaries found.</CustomText>
              </CustomBox>
            }
          />
        )}
      </CustomBox>
        
    </HomeLayoutWrapper>
  )
}