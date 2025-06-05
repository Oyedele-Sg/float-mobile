import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Image } from 'react-native';
import { TransactionReport } from 'src/services';
import { CustomBox, CustomPressable, CustomText } from 'src/components';
import { ChevronRightIcon, ClockIcon } from '@assets/icons';

const sampleTransactionReports: TransactionReport[] = [
  {
    transaction_amount: 150.0,
    receiver_amount: 115000.0,
    currency: "USD",
    receiver_currency: "NGN",
    transaction_remarks: "Payment for services",
    transaction_reference: "TXN123456789",
    transaction_date_time: "2025-06-01T10:15:30.000Z",
    fee_amount: 5.0,
    vat_amount: 0.75,
    transaction_description: "Freelance web development",
    third_party_name: "PayLink Inc.",
    beneficiary_account_number: "0123456789",
    beneficiary_bank: "GTB",
    beneficiary_bank_name: "Guaranty Trust Bank",
    transaction_status_id: 1,
    transaction_type: "International Transfer",
    account_balance: 850.0,
    account_user_id: "user_006",
    beneficiary_country: "Nigeria",
    transaction_report_id: "rep_001",
    created_at: "2025-06-01T10:16:00.000Z",
    updated_at: "2025-06-01T10:16:00.000Z",
    transaction_status: {
      transaction_status: "Successful",
      transaction_status_description: "Transaction completed successfully",
      transaction_status_code: 200,
      transaction_status_id: 1,
      created_at: "2025-06-01T10:16:00.000Z",
      updated_at: "2025-06-01T10:16:00.000Z"
    }
  },
  {
    transaction_amount: 150.0,
    receiver_amount: 115000.0,
    currency: "USD",
    receiver_currency: "NGN",
    transaction_remarks: "Payment for services",
    transaction_reference: "TXN123456789",
    transaction_date_time: "2025-06-01T10:15:30.000Z",
    fee_amount: 5.0,
    vat_amount: 0.75,
    transaction_description: "Freelance web development",
    third_party_name: "PayLink Inc.",
    beneficiary_account_number: "0123456789",
    beneficiary_bank: "GTB",
    beneficiary_bank_name: "Guaranty Trust Bank",
    transaction_status_id: 1,
    transaction_type: "International Transfer",
    account_balance: 850.0,
    account_user_id: "user_005",
    beneficiary_country: "Nigeria",
    transaction_report_id: "rep_001",
    created_at: "2025-06-01T10:16:00.000Z",
    updated_at: "2025-06-01T10:16:00.000Z",
    transaction_status: {
      transaction_status: "Successful",
      transaction_status_description: "Transaction completed successfully",
      transaction_status_code: 200,
      transaction_status_id: 1,
      created_at: "2025-06-01T10:16:00.000Z",
      updated_at: "2025-06-01T10:16:00.000Z"
    }
  },
  {
    transaction_amount: 150.0,
    receiver_amount: 115000.0,
    currency: "USD",
    receiver_currency: "NGN",
    transaction_remarks: "Payment for services",
    transaction_reference: "TXN123456789",
    transaction_date_time: "2025-06-01T10:15:30.000Z",
    fee_amount: 5.0,
    vat_amount: 0.75,
    transaction_description: "Freelance web development",
    third_party_name: "PayLink Inc.",
    beneficiary_account_number: "0123456789",
    beneficiary_bank: "GTB",
    beneficiary_bank_name: "Guaranty Trust Bank",
    transaction_status_id: 1,
    transaction_type: "International Transfer",
    account_balance: 850.0,
    account_user_id: "user_001",
    beneficiary_country: "Nigeria",
    transaction_report_id: "rep_001",
    created_at: "2025-06-01T10:16:00.000Z",
    updated_at: "2025-06-01T10:16:00.000Z",
    transaction_status: {
      transaction_status: "Successful",
      transaction_status_description: "Transaction completed successfully",
      transaction_status_code: 200,
      transaction_status_id: 1,
      created_at: "2025-06-01T10:16:00.000Z",
      updated_at: "2025-06-01T10:16:00.000Z"
    }
  },
  {
    transaction_amount: 200.0,
    receiver_amount: 153200.0,
    currency: "USD",
    receiver_currency: "NGN",
    transaction_remarks: "School fees payment",
    transaction_reference: "TXN987654321",
    transaction_date_time: "2025-06-02T14:45:00.000Z",
    fee_amount: 8.0,
    vat_amount: 1.2,
    transaction_description: "Tuition payment for FUPRE",
    third_party_name: "SwiftRemit",
    beneficiary_account_number: "0987654321",
    beneficiary_bank: "UBA",
    beneficiary_bank_name: "United Bank for Africa",
    transaction_status_id: 2,
    transaction_type: "Education Payment",
    account_balance: 650.0,
    account_user_id: "user_002",
    beneficiary_country: "Nigeria",
    transaction_report_id: "rep_002",
    created_at: "2025-06-02T14:46:00.000Z",
    updated_at: "2025-06-02T14:46:00.000Z",
    transaction_status: {
      transaction_status: "Pending",
      transaction_status_description: "Awaiting confirmation",
      transaction_status_code: 102,
      transaction_status_id: 2,
      created_at: "2025-06-02T14:46:00.000Z",
      updated_at: "2025-06-02T14:46:00.000Z"
    }
  }
];

type TransactionProps = {
  amount: number
  name: string
  date: string
  type: string
  data: TransactionReport
  home?: boolean
};

export const Transaction = ({
   amount, name, date, type, data, home,
}: TransactionProps) => {

  return (
    <CustomBox mb={18} key={data.created_at}>
      <CustomPressable
        onPress={() => {
          if (home) {
          }
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
              
              bg="gray_bg"
              alignItems="center"
              justifyContent="center"
            >
              
              {/* <UserIcon /> */}
            </CustomBox>
            <CustomBox>
              <CustomText
                // variant="T1415600"
                // color="grey_950"
                mb={4}
                style={{
                  fontSize: 14.5,
                }}
              >
                {name}
              </CustomText>
              <CustomText
                // color="grey_950"
                style={{
                  fontSize: 12.5,
                  opacity: 0.5,
                }}
              >
                {'Today, 5:20pm'}
              </CustomText>
            </CustomBox>
          </CustomBox>
          <CustomBox flexDirection='row'>
            <CustomText
              // variant="T1420600"
              // color={type === 'debit' ? 'debit' : 'grey_900'}
              >
              $
              {amount}
            </CustomText>
            <ChevronRightIcon />
          </CustomBox>
        </CustomBox>
      </CustomPressable>
    </CustomBox>
  );
};

const NoTransactions = () => (
  <CustomBox
    flexDirection="row"
    alignItems="center"
  >
    <CustomBox
      width={48}
      height={48}
      borderRadius={48}
      // bg="merchant_neutral_20"
      alignItems="center"
      justifyContent="center"
      mr={14}
    >
      <ClockIcon />
    </CustomBox>
    <CustomText
      // variant="T1417600"
      // color="grey_600"
    >No transactions yet</CustomText>
  </CustomBox>
);

type Props = {
  refreshing: boolean;
  isFocused: boolean;
};

export const RecentTransactions = () => {

  return (
    <CustomBox mb={32}>
      <CustomBox
        mb={20}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <CustomText variant="T1624600" color="gray_950">
        Transaction History
        </CustomText>
        <CustomPressable
          onPress={() => {
          }}
        >
          <ChevronRightIcon />
        </CustomPressable>
      </CustomBox>

      {/* <NoTransactions /> */}

      <CustomBox>
        {sampleTransactionReports.map((items) => (
          <Transaction
            key={items.account_user_id}
            name={items.third_party_name}
            amount={items.transaction_amount}
            date={items.created_at}
            type={items.transaction_type}
            data={items}
            home
          />
          
        ))}
        {/* ))} */}
      </CustomBox>
    </CustomBox>
  );
};