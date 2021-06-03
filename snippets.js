async function fetchHostData(key) {
	let ret = '';
	fetch(`${document.location.origin}/hosts/${key}`)
		.then(function (response) {
			const ret = response
				.text()
				.then(function (text) {
					return text;
				});
			return ret;
		})
		.catch(function (err) {
			console.log('Fetch problem: ' + err.message);
			if (!ret.ok) {
				throw new Error(ret.statusText);
			}
		});
	return ret;
}