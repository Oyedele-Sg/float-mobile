import { Keyboard, Platform } from 'react-native';
import { useState, useEffect } from 'react';

function useKeyboard() {
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	useEffect(() => {
		const keyboardWillShowSub = Keyboard.addListener(
			Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
			(event) => {
				setKeyboardHeight(event.endCoordinates.height);
			}
		);
		const keyboardWillHideSub = Keyboard.addListener(
			Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
			() => {
				setKeyboardHeight(0);
			}
		);

		return () => {
			keyboardWillShowSub.remove();
			keyboardWillHideSub.remove();
		};
	}, []);

	return keyboardHeight;
}
export default useKeyboard;