export default async function fetchData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log('ERRORRRRR', error);
	} finally {
		setTimeout(() => {
			document.querySelector('.gif-img').style.display = 'none';
		});
	}
}
