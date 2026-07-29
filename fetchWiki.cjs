const https = require('https');
const fs = require('fs');
const path = require('path');

const url = "https://en.wikipedia.org/w/api.php?action=query&titles=Vase|Pottery|Ceramic_art|Porcelain|Glass_art|Flowerpot|Urn&prop=pageimages&format=json&pithumbsize=800";

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      const pages = json.query.pages;
      for (const key in pages) {
        if (pages[key].thumbnail) {
          console.log(pages[key].title + " -> " + pages[key].thumbnail.source);
        }
      }
    } catch (e) {
      console.error("Parse error: ", e);
      console.log(data);
    }
  });
}).on('error', (err) => {
  console.error(err);
});
