import { copyDir, hasFolder } from '@md2html/shared';
import { Plugin } from 'esbuild';
import path from 'path';

const copyPublicFilesPlugin: Plugin = {
    name: 'copy-public-files',
    setup(build) {
        build.onStart(async () => {
            const publicDir = path.resolve(__dirname, '../template');
            const distDir = path.resolve(__dirname, '../dist/template');

            try {
                if (await hasFolder(publicDir)) {
                    await copyDir(publicDir, distDir);
                    console.log(`Copied ${publicDir} to ${distDir}`);
                } else {
                    console.warn(`Directory ${publicDir} does not exist.`);
                }
            } catch (error) {
                console.error(`Error copying files: ${error}`);
            }
        });
    }
};

export default copyPublicFilesPlugin;
