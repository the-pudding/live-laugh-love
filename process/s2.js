const fs = require('fs');
const request = require('request');
const d3 = require('d3');

const OUT_PATH = './output/';
const IN_PATH = './output/listing_calls/';
const PAGE_NUMS = d3.range(1, 201);
let idData = [];

async function pullIDs(page) {
	const file = fs.readFileSync(`${IN_PATH}page-${page}.json`, 'utf-8');
	const rawData = JSON.parse(file)
	const resultsData = rawData.results;
	
	Object.keys(resultsData).forEach(function(key) {
		let listingID = resultsData[key].listing_id;
		idData.push({listingID, page});
	});
}

//Initial function (THIS IS THE ONLY FUNCTION BEING CALLED - PLACE THINGS INSIDE OF ME!)
function init() {
	
	PAGE_NUMS.map(pullIDs);

	const csv = d3.csvFormat(idData);

	fs.writeFileSync(`${OUT_PATH}/listing_ids/listing_ids.csv`, csv)
}

//RUN THE INIT FUNCTION!
init();
