import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
export const root = fileURLToPath(new URL('../', import.meta.url));
export const sources = ['ui', 'state', 'secretaria', 'acs', 'actions', 'browser-tools', 'events'];
export async function build() {
  await mkdir(`${root}dist`, { recursive: true });
  const scripts = await Promise.all(sources.map(name => readFile(`${root}src/js/${name}.js`, 'utf8')));
  await writeFile(`${root}dist/app.js`, '// Gerado por npm run build. Edite src/js/.\n' + scripts.join('\n'));
  await Promise.all(['index.html', 'style.css'].map(name => copyFile(`${root}src/${name}`, `${root}dist/${name}`)));
  console.log('Build concluído: dist/');
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await build();
