import useScreenSize from './useScreenSize';

type SnapPoints = string[];

const useScreenSnapshots = (
  smallSnapPoints: SnapPoints,
  largeSnapPoints: SnapPoints,
): SnapPoints => {
  const screenSize = useScreenSize();
  return screenSize === 'big' ? largeSnapPoints : smallSnapPoints;
};

export default useScreenSnapshots;