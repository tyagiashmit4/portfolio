import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

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

  const sitemapPath = resolve(__dirname, 'public', 'ashmit.xml');

  const stream = new SitemapStream({
    hostname,
    xmlns: {
      news: true,
      xhtml: true,
      image: true,
      video: true
    }
  });

  const writeStream = createWriteStream(sitemapPath);
  stream.pipe(writeStream);

  links.forEach(link => stream.write(link));
  stream.end();

  await streamToPromise(stream);
  console.log('✅ Sitemap generated with namespaces at public/ashmit.xml');
}

generateSitemap().catch(err => {
  console.error('❌ Error generating sitemap:', err);
});
