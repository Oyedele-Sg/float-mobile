import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, Keyboard } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { CustomBox, CustomButton, CustomInput, CustomPressable, CustomText, Screen } from "@/components";
import { useSafeAreaInsetsStyle } from "@utils/useSafeAreaInsetStyle";
import { isLoggedinBeforeProps } from '@/services/Auth/AuthServices.types';
import { MMKV } from '@/lib/mmkv';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { validateValues } from '@/lib/validateValues';
import { isValidEmail } from '@/lib/isValidEmail';
import { useMutation } from '@tanstack/react-query';
import { GetUsersDetails, LoginApi, RefreshOTP } from '@/services/Auth/AuthServices';
import { passwordHash } from '@/lib/encryptPassword';
import { useAppStore } from '@/store/AppStore';
import { displayErrorMessage, displaySuccessMessage } from '@/lib/toast';
import * as LocalAuthentication from 'expo-local-authentication';
import useKeyboard from '@/components/keyboardHeight';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const backgroundImages = [
  require('../../assets/images/onboarding.png'),
  require('../../assets/images/onboarding2.png'),
  require('../../assets/images/onboarding3.png'),
];

const onboardingText = [
    {
        title: "Send Money Across Borders",
        description: "Easily Transfer dollars and them received instantly in local currency.",
    },
    {
        title: "Fast & Reliable Transfers",
        description: "Enjoy lightening fast delivery with real-time tracking and peace of mind.",
    },
    {
        title: "Transparent Rates, Every Time",
        description: "Get the best exchange rates with no hidden charges.",
    },
]

export default function OnboardingContinueeScreen() {
  const router = useRouter();
  const { authData, userLogin } = useAppStore();
  const biometricLoginText = 'Login with Biometrics';
  const keyboardHeight = useKeyboard();
  const isLoggedinBefore: isLoggedinBeforeProps | null = MMKV.getMap('isFirstTimeLogin') || null;
  const [isEmail, setIsEmail] = useState('');
	const [pass, setPassword] = useState<string>('');

  const [imageIndex, setImageIndex] = useState(0);

  const useRefreshOTP = useMutation({
		mutationFn: RefreshOTP,
        onSuccess: (data, variables) => {
            if (data.success) {
                router.push({ pathname: '/verify', params: { type: 'forgotpassword', email: variables.email } })
            }
        }
  });
  const useGetUsers = useMutation({
          mutationFn: GetUsersDetails,
          onSuccess: (data) => {
              displaySuccessMessage('Login Successful');
              userLogin(data);
  
              const isFirstTimeLoginDetails = {
          email: data.email,
          password: isLoggedinBefore?.password || pass,
          firstName: data.first_name,
          lastName: data.last_name,
          firstTimeUser: isLoggedinBefore?.firstTimeUser ?? true,
          isBiometricHasError: isLoggedinBefore?.isBiometricHasError ?? false,
          biometricPermission: isLoggedinBefore?.biometricPermission ?? false,
        };
  
        MMKV.setMap('isFirstTimeLogin', isFirstTimeLoginDetails);
              // router.push('/addBank')
              router.navigate('/home')
      },
          onError: (error: any) => {
              console.log('login error', error);
      },
      onSettled: () => {
      }
    });
  
  const useLogin = useMutation({
    mutationFn: LoginApi,
    onSuccess: (data, variables) => {
        if (data.access_token) {
            authData.saveToken(data);
            MMKV.setMap('TokenData', data);
            useGetUsers.mutate()
        }
      },
    onError: (error: any, variables) => {
        const errorMsg = error.message[0]?.msg || error.message;
        if (errorMsg === 'Email not verified, please verify your email') {
    useRefreshOTP.mutate({ email: variables.email });
        }
        // displayErrorMessage(errorMsg)

      }
  });

	const handleAuthentication = async () => {
		const compatible = await LocalAuthentication.hasHardwareAsync();
		const enroll = await LocalAuthentication.isEnrolledAsync();

		if (compatible && enroll) {
			await authenticate();
		} else {
      // setLoading(false);
      const updatedLoginInfo = {
        ...isLoggedinBefore,
        isBiometricHasError: true,
        biometricPermission: false
      };

      MMKV.setMap('isFirstTimeLogin', updatedLoginInfo);
			displayErrorMessage(
				'Biometrics is not enrolled on your device, please go into your device settings and enable biometrics'
			);
		}
	};

	const authenticate = async () => {
		try {
			const { success } = await LocalAuthentication.authenticateAsync({
				promptMessage: 'Login with your biometrics',
				disableDeviceFallback: true,
				cancelLabel: 'Cancel'
			});

			if (success && isLoggedinBefore !== null ) {
				useLogin.mutate({
					email: isLoggedinBefore.email.toLowerCase(),
					password: isLoggedinBefore.password
				});
			}
		} catch (error) {
      // setLoading(false);
      const updatedLoginInfo = {
        ...isLoggedinBefore,
        isBiometricHasError: true,
        biometricPermission: false
      };

      MMKV.setMap('isFirstTimeLogin', updatedLoginInfo);
			displayErrorMessage(`${error}` );
		}
	};

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 4000); // every 4 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <Screen preset="fixed">
      <ImageBackground
        source={backgroundImages[imageIndex]}
        style={{ height: SCREEN_HEIGHT, width: '100%' }}
        resizeMode="cover"
      >
        <CustomBox
          paddingTop={28}
          paddingHorizontal={20}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          paddingBottom={keyboardHeight > 0 ? 330 : 40}
          position="absolute"
          bottom={0}
          bg="white"
          width="100%"
        >
          <StatusBar
            backgroundColor="#000"
            style="light"
            translucent={false}
            animated
          />
          <CustomText mb={5} variant='T2434700' >Welcome Back, {isLoggedinBefore?.firstName}</CustomText>
          <CustomText variant='T1422500' color='gray_02'>Sign in as {isLoggedinBefore?.firstName} {isLoggedinBefore?.lastName}</CustomText>
          <CustomBox mt={5}>
            <Formik
              initialValues={{
                  email: isLoggedinBefore?.email || ''  ,
                  password: '',
              }}
              onSubmit={(values) => {
                Keyboard.dismiss();

                setIsEmail(values.email.toLowerCase());
						    setPassword(passwordHash(values.password));

                if (
                  isLoggedinBefore &&
                  !isLoggedinBefore?.isBiometricHasError &&
                  !validateValues(values)
                ) {
                  void handleAuthentication();
                  return;
                }
                useLogin.mutate({
                  email: isLoggedinBefore?.email.toLocaleLowerCase()!,
                  password: passwordHash(values.password)
                });
              }}
                >
              {({ handleSubmit, values }) => (
                <CustomBox gap={10}>
                  <CustomBox>
                      <CustomInput label='password' secureTextEntry name='password' placeholder='**********' />
                      <CustomBox alignItems='flex-end' paddingVertical={5}>
                          <CustomPressable onPress={() => { router.push('/forgotPassword') }}>
                              <CustomText variant='T1422500' color='accent_color'>Forgot Password?</CustomText>
                          </CustomPressable>
                      </CustomBox>
                  </CustomBox>
                  <CustomBox mb={15}>
                      <CustomButton
                      disabled={
                        !isLoggedinBefore?.isBiometricHasError 
                          ? false
                          : !validateValues(values)}
                      onPress={handleSubmit}
                      loading={useRefreshOTP.isPending || useLogin.isPending || useGetUsers.isPending}
                      label={ 
                        !isLoggedinBefore?.isBiometricHasError
                        ? !validateValues(values)
                          ? biometricLoginText
                          : 'Login'
                        : 'Login'
                      } />
                  </CustomBox>
                  <CustomBox flexDirection='row' justifyContent={'center'}>
                      <CustomText textAlign='center' color='gray_950'>Not You? </CustomText>
                      <Link href={'/login'} push asChild>
                          <CustomText textDecorationLine='underline' variant='T1422500' color='brandPrimary'>Sign in to another account</CustomText>
                      </Link>

                  </CustomBox>
                </CustomBox>
              )}
            </Formik>
        </CustomBox>
        </CustomBox>
      </ImageBackground>
    </Screen>
  );
}


