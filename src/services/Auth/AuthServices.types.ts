import { PublicAxios } from "../../lib/axios";

export async function SignupApi(data: any): Promise<any> {
    const response = await PublicAxios.post('/auth/sign-up/', data)
    return response.data.data
}
