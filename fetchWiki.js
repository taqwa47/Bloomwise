const https = require('https');
const fs = require('fs');

const url = "https://en.wikipedia.org/w/api.php?action=query&titles=Vase|Pottery|Ceramic_art|Porcelain|Glass_art|Flowerpot|Urn&prop=pageimages&format=json&pithumbsize=800";

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const json = JSON.parse(data);
    const pages = json.query.pages;
    for (const key in pages) {
      if (pages[key].thumbnail) {
        console.log(pages[key].title + " -> " + pages[key].thumbnail.source);
      }
    }
  });
}).on('error', (err) => {
  console.error(err);
});
