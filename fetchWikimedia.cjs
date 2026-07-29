const https = require('https');
const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, 'src', 'assets', 'vases');

const filesToDownload = [
  { name: 'vase_ribbed_glass.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Glass_Vase_%285888257007%29.jpg' },
  { name: 'vase_white_ceramic.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Vase_from_the_Ming_Dynasty.jpg' },
  { name: 'vase_pink_ceramic.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Vase_with_cover_%28part_of_a_garniture%29_MET_DP111246.jpg' },
  { name: 'vase_gold_luxury.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Vase_MET_DP109670.jpg' },
  { name: 'vase_black_modern.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Vase_with_cover_%28one_of_a_pair%29_MET_DP111409.jpg' },
  { name: 'vase_small_bud.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Glass_vase.jpg' },
  { name: 'vase_textured_beige.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Vase_from_the_Qing_Dynasty.jpg' }
];

const download = (filename, url) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };
    https.get(url, options, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, options, (res) => {
          const file = fs.createWriteStream(path.join(destDir, filename));
          res.pipe(file);
          file.on('finish', () => resolve());
        });
      } else {
        const file = fs.createWriteStream(path.join(destDir, filename));
        response.pipe(file);
        file.on('finish', () => resolve());
      }
    }).on('error', reject);
  });
};

async function downloadAll() {
  for (const item of filesToDownload) {
    try {
      await download(item.name, item.url);
      console.log(`Downloaded ${item.name}`);
    } catch (e) {
      console.log(`Failed ${item.name}`, e);
    }
  }
}

downloadAll();
