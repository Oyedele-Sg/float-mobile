import * as React from 'react';
import Svg, { type SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';

const FlagIcon = (props: SvgProps) => {
    return (
      <Svg width="16" height="18" viewBox="0 0 16 18" fill="none" {...props}>
        <Path d="M1.33337 11.5C1.33337 11.5 2.16671 10.6667 4.66671 10.6667C7.16671 10.6667 8.83337 12.3333 11.3334 12.3333C13.8334 12.3333 14.6667 11.5 14.6667 11.5V1.50001C14.6667 1.50001 13.8334 2.33334 11.3334 2.33334C8.83337 2.33334 7.16671 0.666672 4.66671 0.666672C2.16671 0.666672 1.33337 1.50001 1.33337 1.50001L1.33337 17.3333" stroke="#667085" stroke-linecap="round" stroke-linejoin="round"/>
      </Svg>
    )
}

const Memo = memo(FlagIcon);
export default Memo;
