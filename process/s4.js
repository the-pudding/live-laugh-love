const fs = require('fs');
const request = require('request');
const d3 = require('d3');

const OUT_PATH = './output/listing_image_urls';
const IN_PATH = './output/listing_image_calls/';
let singleImageLink = null;
let listingID = null;
let linkData = [];

function getImageLinks(filename) {
	const filePath = `${IN_PATH}${filename}`
	const file = fs.readFileSync(filePath, 'utf-8');

	if (file !== 'undefined') {
		const rawData = JSON.parse(file)
		const numImages = rawData.results.length;
		
		// Get ALL listing images
		// const dataRange = d3.range(0, numImages);

		// Get ONLY first listing image
		const dataRange = d3.range(0, 1);
		
		dataRange.map(getSingleImage(rawData))
	}
}

function getSingleImage(rawData) {
	return function(index) {
		listingID = rawData.results[index].listing_id
		singleImageLink = rawData.results[index].url_fullxfull

		console.log(`${listingID}-${index}`)
		linkData.push({listingID, singleImageLink})
	}
}

//Initial function (THIS IS THE ONLY FUNCTION BEING CALLED - PLACE THINGS INSIDE OF ME!)
function init() {
	const files = fs.readdirSync(IN_PATH).filter(d => d.includes('.json'));

	files.map(getImageLinks);

	const csv = d3.csvFormat(linkData);

	fs.writeFileSync(`${OUT_PATH}/image_links.csv`, csv)
}

//RUN THE INIT FUNCTION!
init();
