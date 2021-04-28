# "Live Laugh Love" listing images from Etsy

Node scripts to gather and clean data for a forthcoming article on [The Pudding](https://pudding.cool/).

## Setup

#### Dependencies

- [node](https://nodejs.org/en/)
- [d3](https://d3js.org/)
- [request](https://www.npmjs.com/package/request)
- [fs](https://nodejs.org/api/fs.html)

#### Install

Clone the repo and run `npm i`

## Reproduce

### Step 1: `npm run getEtsy`

Requests listing json data for the last 5,000 (200 pages * 25 items per page) items on Etsy that appear with the tag "Live Laugh Love" from the [Etsy API](https://www.etsy.com/developers/documentation/getting_started/api_basics). Saves this into `output/listing_calls` as `page-${number}.json`.

### Step 2: `npm run getIDs`

Pulls out each listing's `listing_id` and combines it into a single csv data file saved in `output/listing_ids` as `listing_ids.csv` with the columns `listingID` and `page`.

### Step 3: `npm run getImages`

Requests listing images json data for each `listing_id` in `listing_ids.csv` from the [Etsy API](https://www.etsy.com/developers/documentation/getting_started/api_basics). Saves this into `output/listing_image_calls` as `id-${listing_id}.json`.

### Step 4: `npm run getImageLinks`

Pulls out the image links from each listing image json file and combines into a single csv data file saved in `output/listing_image_urls` as `image_links.csv` with the columns `listingID` and `singleImageLink`. 

### Step 5: `npm run getOCR`

Uses [tesseract](https://github.com/tesseract-ocr) to loop through the image links from each listing and pull out the text using OCR. Outputs the text into a csv data file saved in `output/listing_image_text` as `text.csv` with the columns `imageURL` and `text`.

### Step 6: `npm run cleanText`

Pulls in `first1000.csv` of OCRed and then manual coded text, removes punctuation, changes text to lowercase, splits on spaces, and exports to a flattened json file in saved to `output/ocr_text` as `cleanText.json`.

### Step 7: `npm run wordCount`

Pulls in `cleanText.json`, groups words, counts occurances, and saves as a csv file in `output/ocr_text` as `wordCount.csv`.

## Notes

Add in your own [Etsy API key](https://www.etsy.com/developers/documentation/getting_started/register) for Step 1. Output files have been gitignored in this repo. First run 03/17/2021. Second run 04/21/2021. Tesseract OCR is unreliable, so manual checks happened between steps 5 and 6 on the first 1,000 images to build `first1000.csv`.
