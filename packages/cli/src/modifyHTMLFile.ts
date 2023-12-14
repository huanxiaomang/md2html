import { mdToHTML } from "@md2html/core";
import { logger } from "@md2html/shared";
import { load as loadHTML } from 'cheerio';
import { readFile, writeFile } from "node:fs/promises";

export async function modifyHtmlFile(mdFile: string, outputHTMLPath: string) {
    try {
        const htmlPath = outputHTMLPath;

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
