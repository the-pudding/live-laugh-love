const fs = require('fs');
const d3 = require('d3');
const _ = require('lodash');

const OUT_PATH = './output/ocr_text/';
const IN_PATH = './output/ocr_text/cleanText.json';
const file = fs.readFileSync(`${IN_PATH}`, 'utf-8');
let rawData = JSON.parse(file);
let flatData = [].concat(...rawData);
let wordCount = null;
let countList = [];

function countWords(data) {
    wordCount = _.values(_.groupBy(data)).map(d => ({word: d[0], count: d.length}));
}

function init() {
    countWords(flatData);

    wordCount = _.orderBy(wordCount, 'count', 'desc')
    wordCount = _.filter(wordCount, function(d) { return d.word.length > 1 })

    const csvString =  [
        [
            "word",
            "count"
        ],
        ...wordCount.map(word => [
            word.word,
            word.count
        ])
    ]
    .map(e => e.join(","))
    .join("\n")

    console.log(csvString)


	fs.writeFileSync(`${OUT_PATH}/wordCount.csv`, csvString)
}

init();