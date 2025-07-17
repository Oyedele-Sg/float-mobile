import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { CustomBox, CustomButton, CustomText, Screen } from "@/components";
import { useSafeAreaInsetsStyle } from "@utils/useSafeAreaInsetStyle";

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

export default function OnboardingScreen() {
  const router = useRouter();
  const $containerInsets = useSafeAreaInsetsStyle(['top', 'bottom']);

  const [imageIndex, setImageIndex] = useState(0);

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
          paddingHorizontal={20}
          style={[$containerInsets, { flex: 1 }]}
          justifyContent="flex-end"
        >
          <CustomBox gap={4} mb={22}>
            <CustomText variant="T3034700" color="white" maxWidth={295}>
              {onboardingText[imageIndex].title}
            </CustomText>
            <CustomText variant="T1422500" color="white" maxWidth={295}>
              {onboardingText[imageIndex].description}
            </CustomText>
          </CustomBox>

          <CustomButton
            variant="auth"
            onPress={() => router.push('/register')}
            label="Sign Up"
          />

          <CustomText variant="T1422500" alignSelf="center" color="darkText" mt={10}>
            Have an account?{' '}
            <CustomText
              variant="T1422500"
              color="secondary_white"
              onPress={() => router.push('/login')}
            >
              Login
            </CustomText>
          </CustomText>
        </CustomBox>
      </ImageBackground>
    </Screen>
  );
}


// import React, { useEffect, useRef, useState } from 'react';
// import { Animated, Dimensions, ImageBackground, ImageSourcePropType } from 'react-native';
// import { useRouter } from 'expo-router';
// import { CustomBox, CustomButton, CustomText, Screen } from '@/components';
// import { useSafeAreaInsetsStyle } from '@utils/useSafeAreaInsetStyle';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

// const backgroundImages: ImageSourcePropType[] = [
//   require('../../assets/images/onboarding.png'),
//   require('../../assets/images/onboarding2.png'),
//   require('../../assets/images/onboarding3.png'),
// ];

// export default function OnboardingScreen() {
//   const router = useRouter();
//   const $containerInsets = useSafeAreaInsetsStyle(['top', 'bottom']);

//   const [imageIndex, setImageIndex] = useState(0);
//   const fadeAnim = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Fade out
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 400,
//         useNativeDriver: true,
//       }).start(() => {
//         setImageIndex((prev) => (prev + 1) % backgroundImages.length);

//         // Fade in
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 400,
//           useNativeDriver: true,
//         }).start();
//       });
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <Screen preset="fixed">
//       <AnimatedImageBackground
//         source={backgroundImages[imageIndex]}
//         style={{
//           height: SCREEN_HEIGHT,
//           width: '100%',
//           opacity: fadeAnim,
//         }}
//         resizeMode="cover"
//       >
//         <CustomBox
//           paddingHorizontal={20}
//           style={[$containerInsets, { flex: 1 }]}
//           justifyContent="flex-end"
//         >
//           <CustomBox gap={4} mb={22}>
//             <CustomText variant="T3034700" color="white" maxWidth={295}>
//               Transparent Rates, Every Time
//             </CustomText>
//             <CustomText variant="T1422500" color="white" maxWidth={295}>
//               Get the best exchange rates with no hidden charges.
//             </CustomText>
//           </CustomBox>

//           <CustomButton
//             variant="auth"
//             onPress={() => router.push('/register')}
//             label="Sign Up"
//           />

//           <CustomText variant="T1422500" alignSelf="center" color="darkText" mt={10}>
//             Have an account?{' '}
//             <CustomText
//               variant="T1422500"
//               color="secondary_white"
//               onPress={() => router.push('/login')}
//             >
//               Login
//             </CustomText>
//           </CustomText>
//         </CustomBox>
//       </AnimatedImageBackground>
//     </Screen>
//   );
// }

