import { readFile } from 'node:fs/promises';
import { Script } from 'node:vm';
import { root, sources } from './build.mjs';
for (const name of sources) new Script(await readFile(`${root}src/js/${name}.js`, 'utf8'), {filename: name});
new Script(await readFile(`${root}dist/app.js`, 'utf8'));
console.log('Sintaxe de todos os arquivos JavaScript validada.');
