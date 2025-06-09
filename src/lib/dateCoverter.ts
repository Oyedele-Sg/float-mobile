import moment from 'moment';

// Function to convert using currency
export const convertUsingCurrency = (utcTime: string, currency: string): string => {
	return moment.utc(utcTime).local().format('YYYY-MM-DD HH:mm:ss');
};
