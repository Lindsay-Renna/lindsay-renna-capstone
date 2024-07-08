export const dateToYear = (date) => {
	const year = date.split("").slice(0, 4).join("");
	return year;
};
