import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { resolve, sep, extname } from 'node:path';
import { build, root } from './build.mjs';
await build();
let timer;
const watcher = watch(resolve(root, 'src'), {recursive: true}, () => {
  clearTimeout(timer);
  timer = setTimeout(() => build().catch(console.error), 150);
});
const directory = resolve(root, 'dist');
const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const target = resolve(directory, '.' + (path === '/' ? '/index.html' : path));
    if (!target.startsWith(directory + sep) || !(await stat(target)).isFile()) throw Error('not found');
    res.writeHead(200, {'Content-Type': ({'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'})[extname(target)] || 'application/octet-stream', 'Cache-Control':'no-store'});
    res.end(await readFile(target));
  } catch { res.writeHead(404); res.end('Arquivo não encontrado'); }
});
server.listen(Number(process.env.PORT || 8765), '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${server.address().port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => {watcher.close();server.close();});
