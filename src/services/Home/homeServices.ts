import { useInfiniteQuery, useQuery, type InfiniteData } from '@tanstack/react-query';
import { AuthAxios } from 'src/lib/axios';
import { CountryFormDataInterface, InternationalBeneficiariesResponse, InternationalBeneficiary, InternationalSendDataInterface, ServerResponse } from './home.types';


export async function GetInternationalFormFieilds(): Promise<CountryFormDataInterface> {
  const response = await AuthAxios.get('/transactions/remittance/form-fields/');
  return response.data;
}

export function useGetInternationalFormFieilds() {
  return useQuery({
    queryKey: ['foreignformfieilds'],
    queryFn: GetInternationalFormFieilds,
  });
}

export async function createInternationalBeneficiaryApi(
  data: InternationalSendDataInterface,
): Promise<ServerResponse> {
  const response = await AuthAxios.post(
    `/transactions/remittance/beneficiary/?country=${data.countryCode}&customer_email=${data.email}`,
    data.data,
  );
  return response.data;
}

export async function GetInternationalBeneficiariesPaginated({ pageParam = 1 }): Promise<InternationalBeneficiariesResponse> {
  const response = await AuthAxios.get(
    `/transactions/remittance/beneficiaries/?page=${pageParam}&limit=30`
  );
  return response.data;
}

export function useGetInternationalBeneficiariesPaginated() {
  return useInfiniteQuery<
  InternationalBeneficiariesResponse,  // TQueryFnData: single page data
  Error,
  { pages: InternationalBeneficiariesResponse[]; pageParams: number[] },  // TData: aggregated pages and params
  string[],  // queryKey type
  number     // pageParam type
>({
    queryKey: ['internationalbeneficiaries'],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => GetInternationalBeneficiariesPaginated({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: InternationalBeneficiariesResponse) => {
      const { current_page, total_pages } = lastPage.pagination_details;
      if (current_page < total_pages) {
        return current_page + 1;
      }
      return undefined;
    },
  });
}

