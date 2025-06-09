import * as React from 'react';
import Svg, {
  type SvgProps, Path, Defs, LinearGradient, Stop,
} from 'react-native-svg';
import { memo } from 'react';

const TimerIcon = (props: SvgProps) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      opacity="0.35"
      d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6023 18.3334 9.99996C18.3334 5.39759 14.6025 1.66663 10.0001 1.66663C5.39771 1.66663 1.66675 5.39759 1.66675 9.99996C1.66675 14.6023 5.39771 18.3333 10.0001 18.3333Z"
      fill="url(#paint0_linear_13895_1562)"
    />
    <Path
      d="M8.82155 11.1783C8.45322 10.8099 6.99405 8.59662 5.79572 6.74328C5.39405 6.12245 6.12239 5.39412 6.74322 5.79495C8.59655 6.99328 10.8099 8.45328 11.1782 8.82078C11.8291 9.47162 11.8291 10.5266 11.1782 11.1774C10.5274 11.8291 9.47239 11.8291 8.82155 11.1783Z"
      fill="#19151E"
    />
    <Path
      d="M8.43506 1.81829L9.34506 3.18246C9.65673 3.64996 10.3442 3.64996 10.6567 3.18246L11.5667 1.81829C11.0576 1.72163 10.5359 1.66663 10.0001 1.66663C9.46423 1.66663 8.94256 1.72163 8.43506 1.81829Z"
      fill="#19151E"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_13895_1562"
        x1="-9.04436"
        y1="11.2931"
        x2="21.6081"
        y2="3.4581"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stop-color="#0D6494" />
        <Stop offset="1" stop-color="#714BDB" />
      </LinearGradient>
    </Defs>
  </Svg>

);
const Memo = memo(TimerIcon);
export default Memo;
