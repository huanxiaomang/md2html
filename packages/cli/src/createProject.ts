import { cleanFolder, copyDir, copyFileToDir, getFileNameByPath, logger } from "@md2html/shared";
import { yellow } from "chalk";
import { existsSync } from "node:fs";
import { resolve } from 'node:path';
import { modifyHtmlFile } from "./modifyHTMLFile";
import { M2HConfig } from "./types/config";

export default async function createProject(options: M2HConfig, mdFile: string): Promise<string> {
    const root = resolve(process.cwd(), options.output);
    const { html: htmlFilePath } = options;
    let htmlFile = 'index.html';

    if (options.clean) {
        //路径只能为当前项目的子文件夹，避免乱输入路径把别的文件清了
        if (root.includes(process.cwd()) && process.cwd() !== root) {
            cleanFolder(root);

        } else {
            logger.error('输出路径只能为当前项目的子文件夹')
            return;
        }

    }

    if (!htmlFilePath) {
        await copyDir(resolve(__dirname, './template'), root);
    } else {
        if (!existsSync(resolve(process.cwd(), htmlFilePath))) {
            logger.error('指定的html文件不存在');
            return;
        }
        await copyFileToDir(resolve(process.cwd(), htmlFilePath), root);
        htmlFile = getFileNameByPath(htmlFilePath);

    }



    const outputHTMLPath = resolve(options.output, `${htmlFile}.html`);
    await modifyHtmlFile(mdFile, outputHTMLPath);

    console.log(yellow('🛠️  已成功构建: ' + outputHTMLPath));
    return outputHTMLPath;

}
