import { Redirect } from 'expo-router';
import { MMKV } from '@/lib/mmkv'; // Replace with your actual MMKV import
import { isLoggedinBeforeProps } from '@/services/Auth/AuthServices.types';

export default function Index() {
  const isLoggedinBefore: isLoggedinBeforeProps | null = MMKV.getMap('isFirstTimeLogin') ?? null;

  // 👇 If token exists, go to home screen, otherwise go to onboarding/login
  return <Redirect href={isLoggedinBefore && isLoggedinBefore.email.length > 0 ? '/onboarding' : '/onboardingStories'} />;
}