// generate-sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// ✅ Manual __dirname workaround for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateSitemap() {
  const hostname = 'https://ashmittyagi.vercel.app';
  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/projects', changefreq: 'monthly', priority: 0.8 },
    { url: '/contact', changefreq: 'yearly', priority: 0.5 },
  ];

  const sitemapPath = resolve(__dirname, 'public', 'sitemap.xml');
  const stream = new SitemapStream({ hostname });
  const writeStream = createWriteStream(sitemapPath);

  stream.pipe(writeStream);
  links.forEach(link => stream.write(link));
  stream.end();

  await streamToPromise(stream);
  console.log('✅ Sitemap generated at public/sitemap.xml');
}

generateSitemap().catch(err => {
  console.error('❌ Error generating sitemap:', err);
});
