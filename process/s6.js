const fs = require('fs');
const d3 = require('d3');

const OUT_PATH = './output/ocr_text/';
const IN_PATH = './output/ocr_text/first1000.csv';
const file = fs.readFileSync(`${IN_PATH}`, 'utf-8');
let rawData = d3.csvParse(file);
let textNoPunc = null;
let textSplit = null;
let textLowercase = null;
let textList = [];

function removePunc(text) {
    const punctuation = '!"#$%()*+,-./:—;<=>?@[\\]^_`{|}~1234567890/\r?\n|\r\f';
    const regex = new RegExp('[' + punctuation + ']', 'g');
    textNoPunc = text.replace(regex, '');
    textNoPunc = textNoPunc.toLowerCase();
    return textNoPunc
}

function splitSpaces(text) {
    textSplit = text.split(" ");
    return textSplit
}

async function cleanText(image) {
    let text = image.text_manual

    if (text) {
        return new Promise((resolve, reject) => {
            removePunc(text);
            splitSpaces(textNoPunc);
            textList.push(textSplit)
            resolve();
        }) 
        resolve();
    }
}

async function init() {

    let i = 0;

    for (const [index, image] of rawData.entries()){
		await cleanText(image).catch(error => console.error(error))
        i += 1;
        console.log(i);
	}

    console.log(textList)
    
    const jsonFile = JSON.stringify(textList);
    fs.writeFileSync(`${OUT_PATH}/cleanText.json`, jsonFile)
}

init();