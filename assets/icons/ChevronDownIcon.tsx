import * as React from 'react';
import Svg, { type SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';

const ChevronDownIcon = (props: SvgProps) => {
    return (
      <Svg width="12" height="8" viewBox="0 0 12 8" fill="none" {...props}>
        <Path d="M1 1.5L6 6.5L11 1.5" stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
      </Svg>
    )
}

const Memo = memo(ChevronDownIcon);
export default Memo;
