import { copyDir } from '@md2html/shared';
import chalk from "chalk";
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
const { red, yellow } = chalk;

(async () => {
    try {
        const root = process.cwd();
        await mkdir(resolve(root, 'public/')).catch(() => void 0);
        const publicPath = resolve(root, 'public/');
        const distPath = resolve(root, 'dist/');

        await copyDir(publicPath, distPath);
        console.log(yellow('Completed: copy public file to dist/'));
    } catch (err) {
        console.log(red(err.message));
    }

})();