import * as React from 'react';
import Svg, {
	G,
	Path,
	Defs,
	RadialGradient,
	Stop,
	LinearGradient,
	ClipPath,
	SvgProps
} from 'react-native-svg';
import { memo } from 'react';

const ErrorNotificationIcon = (props: SvgProps) => (
	<Svg width='21' height='20' viewBox='0 0 21 20' fill='none' {...props}>
		<Path
			d='M21 9.58696C21 14.8809 16.2981 19.1739 10.5 19.1739C4.7019 19.1739 0 14.8809 0 9.58696C0 4.29304 4.7019 0 10.5 0C16.2981 0 21 4.29304 21 9.58696Z'
			fill='#FC6581'
		/>
		<Path
			d='M15.2325 5.26606C15.6424 5.64033 15.6424 6.24738 15.2325 6.62165L7.2521 13.9081C6.84218 14.2824 6.17732 14.2824 5.7674 13.9081C5.35748 13.5338 5.35748 12.9268 5.7674 12.5525L13.7478 5.26606C14.1577 4.89178 14.8226 4.89178 15.2325 5.26606Z'
			fill='white'
		/>
		<Path
			d='M15.2325 13.9081C14.8226 14.2824 14.1577 14.2824 13.7478 13.9081L5.7674 6.62165C5.35748 6.24738 5.35748 5.64033 5.7674 5.26606C6.17732 4.89178 6.84218 4.89178 7.2521 5.26606L15.2325 12.5525C15.6424 12.9268 15.6424 13.5338 15.2325 13.9081Z'
			fill='white'
		/>
		<Defs>
			<LinearGradient
				id='paint0_linear_13403_4987'
				x1='10.5'
				y1='19.1739'
				x2='10.5'
				y2='0'>
				<Stop stop-color='#FF634D' />
				<Stop offset='0.204' stop-color='#FE6464' />
				<Stop offset='0.521' stop-color='#FC6581' />
				<Stop offset='0.794' stop-color='#FA6694' />
				<Stop offset='0.989' stop-color='#FA669A' />
				<Stop offset='1' stop-color='#FA669A' />
			</LinearGradient>
		</Defs>
	</Svg>
);
const Memo = memo(ErrorNotificationIcon);
export default Memo;
