import { mdToHTML } from "@md2html/core";
import { red } from "chalk";
import { load as loadHTML } from 'cheerio';
import { readFile, writeFile } from "node:fs/promises";
import { join, resolve } from 'node:path';

export async function modifyHtmlFile(mdFile: string, outputPath: string) {
    try {
        const htmlPath = join(outputPath,'index.html');
        const markdown = (await readFile(mdFile)).toString();
        const div = mdToHTML(resolve(process.cwd(), markdown));
        const htmlContent = (await readFile(htmlPath)).toString();
        const $ = loadHTML(htmlContent);
        $('.markdown').html(div);
        
    
        await writeFile(htmlPath, $.html());
        
    } catch (err) {
        console.log(red(err.message));
        
    }
    
}
