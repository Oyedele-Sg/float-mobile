import { AuthAxios, PublicAxios } from "../../lib/axios";
import { ServerUserData } from '../Home';
import { LoginProps, ServerToken } from './AuthServices.types';



export async function SignupApi(data: any): Promise<any> {
    const response = await PublicAxios.post('/auth/sign-up/', data)
    return response.data.data
}
export async function LoginApi(data: LoginProps): Promise<ServerToken> {
    const response = await PublicAxios.post('/auth/login/', data);
    return response.data;
}
  
export async function GetUsersDetails(): Promise<ServerUserData> {
const response = await AuthAxios.get('/account_user/me');
return response.data;
}

export async function EmailVerifyOTP(data: {
	otp: string;
	is_signup: boolean;
}): Promise<{
	success: boolean;
	message: string;
	data?: { access_token: string };
}> {
	const response = await PublicAxios.post(
		`/auth/otp/verify/?is_signup=${data.is_signup}`,
		{
			otp: data.otp
		}
	);
	return response.data;
}

export async function RefreshOTP(data: { email: string }): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await PublicAxios.post(
    `/auth/otp/refresh/`,
    data,
  );
  return response.data;
}

export async function ForgotPasswordApi(email: string): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await PublicAxios.post('/auth/forgot-password/', { email });
  return response.data;
}

export async function ResetPasswordApi(data: {
  otp: string;
  password: string;
}): Promise<{
    success: boolean;
    message: string;
  }> {
  const response = await PublicAxios.post('/auth/reset-password/', data);
  return response.data;
}

