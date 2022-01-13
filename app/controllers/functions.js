// a function for generating db object ids
module.exports.gen_id = (pre) => {
	var result = '';
	const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for ( var i = 6; i > 0; --i) {
		result += chars[Math.round(Math.random() * (chars.length - 1))];
	}
	return result;
}

// a function for parsing mol2 files into JSON
module.exports.mol2ToJson = (mol2Text) => {
	let lines = ["{"];
	let mol = ["molecule: {"];
	let atom = ["atom: {"];
	let bond = ["bond: {"];
}


module.exports.mol2Read = (event) => {
	const reader = new FileReader();
	reader.readAsText(event.files[0]);
	reader.onload = () => {
		const text = reader.result;
		const output = this.mol2ToJson(text);
		console.log(output)
	};
}


// a function for parsing Dragon cheminformatics output CSV into JSON
module.exports.dragonToJson = (csvText) => {
	let lines = [];
	const linesArr = csvText.split('\n');
	// trim out extra spaces
	linesArr.forEach = (arrItem => {
		const row = arrItem.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
		lines.push(row);
	});

	// for removing empty records
	lines.splice(lines.length - 1, 1);
	const result = [];
	const headers = lines[0].split(',');

	// create the object
	for ( let i = 1; i < lines.length; i++) {
		const obj = {};
		const curLine = lines[i].split(",");

		for ( let j = 0; j < headers.length; j++) {
			obj[headers[j]] = curLine[j];
		}
		result.push(obj);
	}
	return result;
}

// a function to read CSV input
module.exports.DragonCsvRead = (event) => {
	const reader = new FileReader();
	reader.readAsText(event.files[0]);
	reader.onload = () => {
		const text = reader.result;
		const output = this.dragonToJson(text);
		console.log(output);
	};
}
