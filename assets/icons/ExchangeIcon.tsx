import * as React from 'react';
import Svg, { type SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';

const ExchangeIcon = (props: SvgProps) => {
    return (
      <Svg width="16" height="18" viewBox="0 0 16 18" fill="none" {...props}>
        <Path d="M1.33337 13.1667H14.6667M14.6667 13.1667L11.3334 9.83333M14.6667 13.1667L11.3334 16.5M14.6667 4.83333H1.33337M1.33337 4.83333L4.66671 1.5M1.33337 4.83333L4.66671 8.16667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </Svg>
    )
}

const Memo = memo(ExchangeIcon);
export default Memo;
