import * as React from 'react';
import Svg, {type SvgProps, Path, Defs, ClipPath, Rect, G} from 'react-native-svg';
import { memo } from 'react';

const SearchIcon = (props: SvgProps) => {
    return (
      <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
        <Path d="M15.5 15.5L10.5001 10.5M12.1667 6.33333C12.1667 9.55499 9.55499 12.1667 6.33333 12.1667C3.11167 12.1667 0.5 9.55499 0.5 6.33333C0.5 3.11167 3.11167 0.5 6.33333 0.5C9.55499 0.5 12.1667 3.11167 12.1667 6.33333Z" stroke="#667085" stroke-linecap="round" stroke-linejoin="round"/>
      </Svg>
    )
}

const Memo = memo(SearchIcon);
export default Memo;
