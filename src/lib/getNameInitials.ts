export const getNameInitials = (name: string): string => {
	const nameParts = name.trim().split(/\s+/);
	const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
	const lastInitial =
		nameParts.length > 1
			? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
			: '';
	return firstInitial + lastInitial;
};
