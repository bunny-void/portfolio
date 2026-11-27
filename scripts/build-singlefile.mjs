import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const TMP_OUT = path.join(ROOT, '.singlefile-tmp');
const OUTPUT_HTML = path.join(ROOT, 'vignesh-portfolio.html');

const EMBEDDED_ASSETS = [
  {
    webPath: '/assets/aistudio/meeee_2cd0c197.jpeg',
    diskPath: path.join(ROOT, 'public/assets/aistudio/meeee_2cd0c197.jpeg'),
    mime: 'image/jpeg',
  },
  {
    webPath: '/assets/aistudio/winner_certificate_preview.png',
    diskPath: path.join(ROOT, 'public/assets/aistudio/winner_certificate_preview.png'),
    mime: 'image/png',
  },
  {
    webPath: '/assets/aistudio/winner_certificate_9ae3549a.pdf',
    diskPath: path.join(ROOT, 'public/assets/aistudio/winner_certificate_9ae3549a.pdf'),
    mime: 'application/pdf',
  },
  {
    webPath: '/assets/projects/mysore-sandal-soap.png',
    diskPath: path.join(ROOT, 'public/assets/projects/mysore-sandal-soap.png'),
    mime: 'image/png',
  },
  {
    webPath: '/assets/projects/sanjeevani-ai.png',
    diskPath: path.join(ROOT, 'public/assets/projects/sanjeevani-ai.png'),
    mime: 'image/png',
  },
  {
    webPath: '/assets/projects/medicare-pharmacy.png',
    diskPath: path.join(ROOT, 'public/assets/projects/medicare-pharmacy.png'),
    mime: 'image/png',
  },
];

async function run() {
  // 1. Build a single-chunk JS + single-chunk CSS production bundle via Vite
  await build({
    root: ROOT,
    configFile: false,
    plugins: [react(), tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: { '@': ROOT },
    },
    build: {
      outDir: TMP_OUT,
      emptyOutDir: true,
      copyPublicDir: false,
      cssCodeSplit: false,
      assetsInlineLimit: 100_000_000,
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
        },
      },
    },
  });

  // 2. Read generated HTML, CSS, and JS files
  const htmlPath = path.join(TMP_OUT, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');
  const assetsDir = path.join(TMP_OUT, 'assets');
  const assetFiles = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : [];

  const cssFiles = assetFiles.filter((f) => f.endsWith('.css'));
  const jsFiles = assetFiles.filter((f) => f.endsWith('.js'));

  if (jsFiles.length !== 1) {
    throw new Error(`Expected exactly 1 JS bundle, found ${jsFiles.length}: ${jsFiles.join(', ')}`);
  }

  let cssBundle = cssFiles
    .map((f) => fs.readFileSync(path.join(assetsDir, f), 'utf8'))
    .join('\n');
  let jsBundle = fs.readFileSync(path.join(assetsDir, jsFiles[0]), 'utf8');

  // 3. Base64-embed all local images and the original certificate PDF into the JS bundle
  let replacedCount = 0;
  for (const asset of EMBEDDED_ASSETS) {
    if (!fs.existsSync(asset.diskPath)) {
      throw new Error(`Missing required asset for single-file embed: ${asset.diskPath}`);
    }
    const base64 = fs.readFileSync(asset.diskPath).toString('base64');
    const dataUri = `data:${asset.mime};base64,${base64}`;
    if (jsBundle.includes(asset.webPath)) {
      jsBundle = jsBundle.split(asset.webPath).join(dataUri);
      replacedCount += 1;
    } else {
      console.warn(`Warning: Asset path not found in JS bundle: ${asset.webPath}`);
    }
  }

  // Safely escape any closing script/style tags inside inlined payloads
  const safeCss = cssBundle.replace(/<\/style/gi, '<\\/style');
  const safeJs = jsBundle.replace(/<\/script/gi, '<\\/script');

  // 4. Replace external Vite stylesheet and script references with inline tags
  html = html.replace(/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["'][^"']*\/assets\/[^"']*\.css["'][^>]*\/?>/gi, '');
  html = html.replace(/<link\b[^>]*rel=["']modulepreload["'][^>]*\/?>/gi, '');
  html = html.replace(/<script\b[^>]*type=["']module["'][^>]*src=["'][^"']*\/assets\/[^"']*\.js["'][^>]*><\/script>/gi, '');

  html = html.replace('</head>', () => `    <style>\n${safeCss}\n    </style>\n  </head>`);
  html = html.replace('</body>', () => `    <script type="module">\n${safeJs}\n    </script>\n  </body>`);

  fs.writeFileSync(OUTPUT_HTML, html, 'utf8');
  fs.rmSync(TMP_OUT, { recursive: true, force: true });

  const sizeMb = (fs.statSync(OUTPUT_HTML).size / (1024 * 1024)).toFixed(2);
  console.log(`SUCCESS: Generated ${path.basename(OUTPUT_HTML)} (${sizeMb} MB, ${replacedCount}/${EMBEDDED_ASSETS.length} assets embedded)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
