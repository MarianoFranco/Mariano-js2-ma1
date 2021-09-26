export const filteringAnArray = (array, filterNumber) => {
	return array.filter((arrayElement) => {
		return arrayElement.price <= parseInt(filterNumber);
	});
};
