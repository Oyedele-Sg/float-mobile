import * as React from 'react';
import Svg, {type SvgProps, Path, Defs, ClipPath, Rect, G} from 'react-native-svg';
import { memo } from 'react';

const RequestSuccessSVG = (props: SvgProps) => {
    return (
      <Svg width="36" height="36" viewBox="0 0 36 36" fill="none" {...props}>
        <G opacity="0.3">
          <Path d="M17.9995 5.49963C24.903 5.49963 30.4993 11.0962 30.4995 17.9996C30.4995 24.9032 24.9031 30.4996 17.9995 30.4996C11.0961 30.4995 5.49951 24.9031 5.49951 17.9996C5.49969 11.0963 11.0962 5.49981 17.9995 5.49963Z" stroke="#079455" stroke-width="1.66667"/>
        </G>
        <G opacity="0.1">
          <Path d="M18 1.33301C27.2047 1.33301 34.667 8.79525 34.667 18C34.667 27.2047 27.2047 34.667 18 34.667C8.79525 34.667 1.33301 27.2047 1.33301 18C1.33301 8.79525 8.79525 1.33301 18 1.33301Z" stroke="#079455" stroke-width="1.66667"/>
        </G>
        <G clipPath="url(#clip0_387_5902)">
          <Path d="M14.2498 18L16.7498 20.5L21.7498 15.5M26.3332 18C26.3332 22.6023 22.6022 26.3333 17.9998 26.3333C13.3975 26.3333 9.6665 22.6023 9.6665 18C9.6665 13.3976 13.3975 9.66663 17.9998 9.66663C22.6022 9.66663 26.3332 13.3976 26.3332 18Z" stroke="#079455" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </G>
        <Defs>
          <ClipPath id="clip0_387_5902">
            <Rect width="20" height="20" fill="white" transform="translate(8 8)"/>
          </ClipPath>
        </Defs>
      </Svg>
    )
}

const Memo = memo(RequestSuccessSVG);
export default Memo;
