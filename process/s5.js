const fs = require('fs');
const request = require('request');
const d3 = require('d3');
const tesseract = require("node-tesseract-ocr");

const OUT_PATH = './output/listing_image_text';
const IN_PATH = './output/listing_image_urls/';
const IMG_PATH = './output/test_images/test2.jpg';

const file = fs.readFileSync(`${IN_PATH}image_links.csv`, 'utf-8');
let rawData = d3.csvParse(file);
let filename = 'pic.png'
let writeFile = fs.createWriteStream(filename)

// OPTIONS https://muthu.co/all-tesseract-ocr-options/
const config = {
    lang: "eng",
    oem: 1,
    psm: 12,
}

// REMOTE
// function runOCR(imageURL) {
//     request(`${imageURL}`).pipe(writeFile).on('close', function() {
//         console.log(imageURL, 'saved to', filename)
//         tesseract.recognize(filename)
//           .catch(err => console.error(err))
//           .then(function (result) {
//             console.log(result.text)
//             process.exit(0)
//           })
//     });
// }

// LOCAL
function runOCR(imageURL) {
    console.log(imageURL)
    tesseract.recognize(`${imageURL}`)
        .then(text => {
            console.log("Result:", text)
        })
      .catch(error => {
        console.log(error.message)
      })
}

//Initial function (THIS IS THE ONLY FUNCTION BEING CALLED - PLACE THINGS INSIDE OF ME!)
function init() {
    const imageURL = rawData[0].singleImageLink;

    runOCR(IMG_PATH);
}

//RUN THE INIT FUNCTION!
init();
