import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'src', 'assets', 'indoor-plants');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const images = {
  'calathea.jpg': 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Calathea_makoyana_01.jpg',
  'hoya.jpg': 'https://upload.wikimedia.org/wikipedia/commons/7/77/Hoya_carnosa_02.jpg',
  'zebra.jpg': 'https://upload.wikimedia.org/wikipedia/commons/3/30/Haworthiopsis_attenuata.jpg',
  'kalanchoe.jpg': 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Kalanchoe_blossfeldiana_02.jpg',
  'philodendron_scandens.jpg': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Philodendron_hederaceum.jpg',
  'spider_plant.jpg': 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Chlorophytum_comosum_2.jpg',
  'fern.jpg': 'https://upload.wikimedia.org/wikipedia/commons/6/67/Nephrolepis_exaltata_002.jpg'
};

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
};

const download = (filename, url) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(dir, filename));
    https.get(url, options, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(path.join(dir, filename), () => {});
      console.error(`Error downloading ${filename}: ${err.message}`);
      reject(err);
    });
  });
};

async function downloadAll() {
  for (const [filename, url] of Object.entries(images)) {
    await download(filename, url);
  }
  console.log("All done!");
}

downloadAll();
