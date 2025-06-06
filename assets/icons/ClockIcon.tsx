import * as React from 'react';
import Svg, { type SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';

const ClockIcon = (props: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#443852" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15.7099 15.18L12.6099 13.33C12.0699 13.01 11.6299 12.24 11.6299 11.61V7.51001" stroke="#443852" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const Memo = memo(ClockIcon);
export default Memo;