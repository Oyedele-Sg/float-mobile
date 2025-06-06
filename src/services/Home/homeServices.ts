import { useQuery } from '@tanstack/react-query';
import { AuthAxios } from 'src/lib/axios';
import { CountryFormDataInterface } from './home.types';


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