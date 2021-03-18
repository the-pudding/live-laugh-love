const fs = require('fs');
const request = require('request');
const d3 = require('d3');

const OUT_PATH = './output/listing_calls/'

const etsyBase = 'https://openapi.etsy.com/v2/listings/active?api_key=';
const etsyKeystring = ''
const tags = 'live%20laugh%20love'
const PAGE_NUMS = d3.range(1, 201)

async function getEtsy(page) {
	return new Promise(resolve =>
		setTimeout(() => {
			console.log(page)
			const etsyURL = `${etsyBase}${etsyKeystring}&tags=${tags}&page=${page}`
			request(etsyURL, (err, response, body) => {
				fs.writeFileSync(`${OUT_PATH}/page-${page}.json`, body)
			})
		}, 5000 * PAGE_NUMS.length - 5000 * page)
	)
}

//Initial function (THIS IS THE ONLY FUNCTION BEING CALLED - PLACE THINGS INSIDE OF ME!)
function init() {
	
	PAGE_NUMS.map(getEtsy);
}

//RUN THE INIT FUNCTION!
init();
