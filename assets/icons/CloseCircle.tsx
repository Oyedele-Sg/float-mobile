import * as React from 'react';
import Svg, { type SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';

const CloseCircleSVG = (props: SvgProps) => (
  <Svg width={props.width || '32'} height={props.height || '32'} viewBox="0 0 32 32" fill="none" {...props}>
    <Path d="M16.0001 29.3334C23.3334 29.3334 29.3334 23.3334 29.3334 16.0001C29.3334 8.66675 23.3334 2.66675 16.0001 2.66675C8.66675 2.66675 2.66675 8.66675 2.66675 16.0001C2.66675 23.3334 8.66675 29.3334 16.0001 29.3334Z" stroke="#B3261E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12.2266 19.7732L19.7732 12.2266" stroke="#B3261E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M19.7732 19.7732L12.2266 12.2266" stroke="#B3261E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>

);
const Memo = memo(CloseCircleSVG);
export default Memo;
