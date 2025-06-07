export function convertToTitle(input: string): string {
	const words = input.split('_').map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});
	return words.join(' ');
}
export function convertField(input: string): string {
	if (input === 'account_number' || input === 'account number') {
		return 'Account Number';
	}
	return convertToTitle(input);
}
