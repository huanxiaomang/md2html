import { mdToHTML } from "@md2html/core";
import { logger } from "@md2html/shared";
import { load as loadHTML } from 'cheerio';
import { readFile, writeFile } from "node:fs/promises";
import { join } from 'node:path';

export async function modifyHtmlFile(mdFile: string, outputPath: string) {
    try {
        const htmlPath = join(outputPath, 'index.html');
        const markdown = (await readFile(mdFile)).toString();
        const div = mdToHTML(markdown);
        const htmlContent = (await readFile(htmlPath)).toString();
        const $ = loadHTML(htmlContent);
        $('.markdown').html(div);


        await writeFile(htmlPath, $.html());

    } catch (err) {
        logger.error(err.message);


    }

}
