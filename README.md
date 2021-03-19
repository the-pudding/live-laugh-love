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

## Notes

Add in your own [Etsy API key](https://www.etsy.com/developers/documentation/getting_started/register) for Steps 2 & 4. Output files have been gitignored in this repo. First run 03/17/2021.
