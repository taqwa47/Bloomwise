import https from 'https';

const titles = 'Calathea|Hoya|Haworthiopsis_attenuata|Kalanchoe_blossfeldiana|Philodendron_hederaceum|Chlorophytum_comosum|Fern';
const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${titles}&prop=pageimages&format=json&pithumbsize=600`;

const options = {
  headers: {
    'User-Agent': 'BloomwiseScript/1.0 (test@example.com)'
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const json = JSON.parse(data);
    const pages = json.query.pages;
    for (const key in pages) {
      if (pages[key].thumbnail) {
        console.log(`${pages[key].title}: ${pages[key].thumbnail.source}`);
      } else {
        console.log(`${pages[key].title}: No image`);
      }
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
