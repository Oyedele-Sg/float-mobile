import {CustomBox, CustomButton, CustomPressable, CustomText, HomeLayoutWrapper, Screen} from "../../../src/components";
import { useSafeAreaInsetsStyle } from "../../../src/utils/useSafeAreaInsetStyle";
import CountryFlag from 'react-native-country-flag';
import { useRouter } from "expo-router";

export const dummyBeneficiaries = [
  {
    countryCode: 'NG', // Nigeria
    name: 'Chinonso Okafor',
    bank: 'GTBank',
  },
  {
    countryCode: 'GH', // Ghana
    name: 'Kwame Mensah',
    bank: 'Ecobank',
  },
  {
    countryCode: 'TW', // Kenya
    name: 'Achieng Otieno',
    bank: 'KCB Bank',
  },
  {
    countryCode: 'ZA', // South Africa
    name: 'Lebo Mokoena',
    bank: 'FNB',
  },
  {
    countryCode: 'US', // Uganda
    name: 'Brian Katumba',
    bank: 'Stanbic Bank',
  },
];

export const Beneficiary = ({countryCode, name, bank}: {countryCode: string, name: string, bank: string}) => {
  return (
    <CustomBox mb={18}>
      <CustomPressable
        onPress={() => {
          
        }}
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
                {bank} (GtBank)
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

  return (
    <HomeLayoutWrapper header='Choose Beneficiary' backBt >
      <CustomBox flex={1}>
        {dummyBeneficiaries.map((item) => (
            <Beneficiary key={item.countryCode} bank={item.bank} countryCode={item.countryCode} name={item.name} />
        ))}
      </CustomBox>
        
    </HomeLayoutWrapper>
  )
}