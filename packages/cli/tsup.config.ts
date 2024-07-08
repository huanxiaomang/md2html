import { defineConfig } from 'tsup';
import copyTemplatePlugin from './plugins/copyTemplatePlugin';

export default defineConfig({
    entry: ['src/cli.ts'],
    splitting: false,
    sourcemap: true,
    format: 'cjs',
    clean: false,
    dts: true,
    esbuildPlugins: [copyTemplatePlugin]
});
