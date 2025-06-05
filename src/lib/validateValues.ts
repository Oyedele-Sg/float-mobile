interface FormikValues {
	[key: string]: string | number | FormikValues;
}

export const validateValues = (values: FormikValues): boolean => {
	// Create a copy of the values object
	const updatedValues = { ...values };

	// Check if the key exists and remove it
	if ('referral_code' in updatedValues) {
		delete updatedValues.referral_code;
	}
	if ('routing_number' in updatedValues) {
		delete updatedValues.routing_number;
	}

	// eslint-disable-next-line guard-for-in,no-restricted-syntax
	for (const key in updatedValues) {
		const value = updatedValues[key];
		// console.log(value);
		// if (typeof value === 'object') {
		//   return validateValues(value);
		// }

		if (typeof value === 'string' && value.trim() === '') {
			return false; // Empty string is not valid
		}
		if (typeof value === 'number' && Number.isNaN(value)) {
			return false; // NaN (invalid) number is not valid
		}
	}
	return true;
};
