import * as React from 'react';
import Svg, { type SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';

const BackIcon = (props: SvgProps) => {
    return (
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
            <Path
                d="M27.5495 22.6667C25.2441 26.652 20.9351 29.3334 15.9999 29.3334C8.6361 29.3334 2.66656 23.3638 2.66656 16C2.66656 8.63622 8.6361 2.66669 15.9999 2.66669C20.9351 2.66669 25.2441 5.34801 27.5495 9.33335M16 10.6667L10.6667 16M10.6667 16L16 21.3334M10.6667 16H29.3333"
                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    )
}

const Memo = memo(BackIcon);
export default Memo;
