import { cleanFolder, copyDir, logger } from "@md2html/shared";
import { yellow } from "chalk";
import { join, resolve } from 'node:path';
import { modifyHtmlFile } from "./modifyHTMLFile";
import { M2HConfig } from "./types/config";

export default async function createProject(options: M2HConfig, mdFile: string) {
    const root = resolve(process.cwd(), options.output);

    if (options.clean) {
        //路径只能为当前项目的子文件夹，避免乱输入路径把别的文件清了
        if (root.includes(process.cwd()) && process.cwd() !== root) {
            cleanFolder(root);

        } else {
            logger.error('输出路径只能为当前项目的子文件夹')
            return;
        }

    }

    await copyDir(resolve(__dirname, './template'), root);

    await modifyHtmlFile(mdFile, options.output);
    console.log(yellow('🛠️  已成功构建: ' + join(options.output, 'index.html')));


}
