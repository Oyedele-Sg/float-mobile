import {CustomBox, CustomPressable, CustomText, HomeLayoutWrapper, SkeletonPlaceholderItem, StyledInput} from "../../../src/components";
import CountryFlag from 'react-native-country-flag';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetRecentTransactionsPaginated } from '@/services/Home/homeServices';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Transaction } from '@/home/RecentTransactions';
import { TransactionReport } from '@/services';



export default function TransactionScreen() {
  const router = useRouter()
  const { data, isLoading, fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, refetch } = useGetRecentTransactionsPaginated();

  // Flatten paginated results
  const transactionReport = data?.pages.flatMap(page => page.transaction_reports) ?? [];

	useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <HomeLayoutWrapper header='Transaction History' backBt>
      <CustomBox py={20} flex={1}>
        {isLoading ? (
          <CustomBox >
            {new Array(4).fill(null).map((_, index) => (
              <SkeletonPlaceholderItem key={index} height={80} />
            ))}
          </CustomBox>
        ): (
            <FlatList
            data={transactionReport}
            keyExtractor={(item, index) =>
              item.transaction_report_id + index
            }
            renderItem={({ item }) => (
              <Transaction
                key={item.account_user_id}
                name={item.third_party_name}
                amount={item.transaction_amount}
                date={item.created_at}
                type={item.transaction_type}
                data={item}
                home
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
                <CustomText>No transaction found.</CustomText>
              </CustomBox>
            }
          />
        )}
      </CustomBox>
        
    </HomeLayoutWrapper>
  )
}