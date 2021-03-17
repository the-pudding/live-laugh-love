const fs = require('fs');
const request = require('request');
const d3 = require('d3');

const OUT_PATH = './output/listing_image_calls/';
const IN_PATH = './output/listing_ids/listing_ids.csv';
const file = fs.readFileSync(`${IN_PATH}`, 'utf-8');
let rawData = d3.csvParse(file);
const rawDataLength = rawData.length;

const etsyBase = 'https://openapi.etsy.com/v2/listings/';
const etsyKeystring = 'o02rgsarzbewnum8cbcoe9p9';

function delay(i) {
	setTimeout(() => {
	  console.log(i)
	}, 5000 * rawDataLength - 5000 * i);
  }

function loopListings(listing) {
	const listingID = listing.listingID;
	getImages(listingID)
}

async function getImages(listingID) {
	const etsyURL = `${etsyBase}${listingID}/images?api_key=${etsyKeystring}`
	return new Promise(resolve =>
		request(etsyURL, (err, response, body) => {
			fs.writeFileSync(`${OUT_PATH}id-${listingID}.json`, body)
		})
	)
}

//Initial function (THIS IS THE ONLY FUNCTION BEING CALLED - PLACE THINGS INSIDE OF ME!)
async function init() {
	let i = 0;
	
	for (const listing of rawData) {
		try {
			await loopListings(listing);
			await delay(i);
		} catch (error) {
			console.log(error);
		}
		i += 1;
	}

}

//RUN THE INIT FUNCTION!
init();
