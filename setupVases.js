import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const brainDir = 'C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\22bbf42f-c96f-4224-a1b7-108a1e5cf227';
const destDir = path.join(__dirname, 'src', 'assets', 'vases');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 13 generated images to copy
const generatedImages = {
  'pot_terracotta.png': 'pot_terracotta',
  'pot_white.png': 'pot_white',
  'pot_beige.png': 'pot_beige',
  'pot_black.png': 'pot_black',
  'pot_sage.png': 'pot_sage',
  'pot_ribbed.png': 'pot_ribbed',
  'pot_concrete.png': 'pot_concrete',
  'pot_fiberstone.png': 'pot_fiberstone',
  'pot_basket.png': 'pot_basket',
  'pot_gold.png': 'pot_gold',
  'vase_clear_cylinder.png': 'vase_clear_cylinder',
  'vase_tall_glass.png': 'vase_tall_glass',
  'vase_round_glass.png': 'vase_round_glass'
};

const findLatestImage = (prefix) => {
  const files = fs.readdirSync(brainDir);
  const matching = files.filter(f => f.startsWith(prefix + '_') && f.endsWith('.png'));
  if (matching.length === 0) return null;
  matching.sort((a, b) => fs.statSync(path.join(brainDir, b)).mtimeMs - fs.statSync(path.join(brainDir, a)).mtimeMs);
  return matching[0];
};

for (const [destName, prefix] of Object.entries(generatedImages)) {
  const latest = findLatestImage(prefix);
  if (latest) {
    fs.copyFileSync(path.join(brainDir, latest), path.join(destDir, destName));
    console.log(`Copied ${latest} to ${destName}`);
  } else {
    console.log(`Warning: Could not find generated image for ${prefix}`);
  }
}

// 7 remaining images to download
const unsplashImages = {
  'vase_ribbed_glass.jpg': 'https://images.unsplash.com/photo-1611078491871-3bc6e0828555?auto=format&fit=crop&w=600&q=80',
  'vase_white_ceramic.jpg': 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80',
  'vase_pink_ceramic.jpg': 'https://images.unsplash.com/photo-1596547609652-9cb5d8d85f83?auto=format&fit=crop&w=600&q=80',
  'vase_gold_luxury.jpg': 'https://images.unsplash.com/photo-1605378776609-b684bc5e5926?auto=format&fit=crop&w=600&q=80',
  'vase_black_modern.jpg': 'https://images.unsplash.com/photo-1593696954577-ab3d39317b97?auto=format&fit=crop&w=600&q=80',
  'vase_small_bud.jpg': 'https://images.unsplash.com/photo-1647464010860-2ad95133e9b1?auto=format&fit=crop&w=600&q=80',
  'vase_textured_beige.jpg': 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=600&q=80'
};

const download = (filename, url) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(destDir, filename));
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(path.join(destDir, filename), () => {});
      console.error(`Error downloading ${filename}: ${err.message}`);
      reject(err);
    });
  });
};

async function downloadAll() {
  for (const [filename, url] of Object.entries(unsplashImages)) {
    await download(filename, url);
  }
  console.log("All downloads done!");
}

downloadAll();
