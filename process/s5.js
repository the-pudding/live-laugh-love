const fs = require('fs');
const request = require('request');
const d3 = require('d3');
const tesseract = require("node-tesseract-ocr");
const { resolve } = require('path');

const OUT_PATH = './output/listing_image_text';
const IN_PATH = './output/listing_image_urls/';
const IMG_PATH = './output/test_images/test5.jpg';

const file = fs.readFileSync(`${IN_PATH}image_links.csv`, 'utf-8');
let rawData = d3.csvParse(file);
let urlData = [];
let textData = [];

// OPTIONS https://muthu.co/all-tesseract-ocr-options/
const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
}

// LOCAL
function runOCR(imageURL) {
    return new Promise((resolve, reject) => {
        tesseract.recognize(`${imageURL}`)
            .catch(error => {
                console.log(error.message)
                resolve();
            })
            .then(text => {
                //console.log("Result:", text)
                textData.push({imageURL, text})
                //console.log(textData)
                resolve();
            })
    })
}

//Initial function (THIS IS THE ONLY FUNCTION BEING CALLED - PLACE THINGS INSIDE OF ME!)
async function init() {

    for (const imageURL of rawData.entries()){
		urlData.push(imageURL[1].singleImageLink)
	}

    urlData = urlData.slice(0,5);

    let i = 0;

    for (const imageURL of urlData) {
        await runOCR(imageURL);
        i += 1;
        console.log(i);
    }

    console.log(textData);

    const csv = d3.csvFormat(textData);

    fs.writeFileSync(`${OUT_PATH}/text.csv`, csv)
}

//RUN THE INIT FUNCTION!
init();
