import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

type ScreenSize = 'big' | 'small';

const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize());

  useEffect(() => {
    const handleResize = ({ window }: { window: ScaledSize }) => {
      setScreenSize(getScreenSize(window));
    };

    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => {
      subscription?.remove();
    };
  }, []);

  function getScreenSize(window: ScaledSize = Dimensions.get('window')): ScreenSize {
    const { width, height } = window;
    return Math.max(width, height) >= 768 ? 'big' : 'small';
  }

  return screenSize;
};

export default useScreenSize;