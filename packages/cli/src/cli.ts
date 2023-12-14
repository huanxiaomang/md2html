import { logger } from "@md2html/shared";
import { red } from "chalk";
import { program } from 'commander';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import createProject from './createProject';
import { createServer } from './createServer';
import { loadConfig } from './loadConfig';
const pkg = require('../package.json');



try {
    checkRoot();
    registerCommand();
} catch (err) {
    console.log(red(err.message));
}

async function checkRoot() {
    const rootCheck = await import('root-check');

    rootCheck.default();

}

function registerCommand() {
    program
        .name(Object.keys(pkg.bin)[0])
        .usage('<command> [options]')
        .version(pkg.version)

    program.command('[file]', '需要转换的markdown文件')
        .option('-w, --watch', '是否热更新模式',)
        .option('-s, --server <port>', '在指定端口开启服务器')
        .option('-o, --output <path>', '转换到的路径')
        .option('-c, --clean', '是否清空输出目录')
        .action(run);

    program.on('command:*', (obj) => {
        console.log(red('未知的命令:' + obj[0]));
        program.outputHelp();
        console.log();

    })

    program.parse(process.argv);

    process.on('SIGINT', () => {
        console.log('\n用户按下了 Ctrl+C，正在退出...');
        process.exit(0); // 0 表示正常退出
    });


}



async function run(_, cmdObj) {

    const cliOptions = program.opts();
    const fileName = cmdObj.args[0];
    logger.mth(`v${pkg.version}`);

    if (!fileName) {

        logger.error(red('未指定md文件'));
        program.outputHelp();
        console.log();
        return;


    }

    if (!new RegExp(/^.*\.md$/).test(fileName)) {
        logger.error('指定的文件不为markdown文件');
        return;
    }

    if (!existsSync(resolve(process.cwd(), fileName))) {
        logger.error('指定的文件不存在');
        return;
    }



    const options = await loadConfig(cliOptions);


    const outputHTMLPath = await createProject(options, fileName);

    //如果开启了热更新模式
    if (cliOptions.watch) {
        const outputPath = resolve(process.cwd(), options.output);
        const markdownPath = resolve(process.cwd(), fileName);
        await createServer(outputPath, markdownPath, outputHTMLPath, options.port);
    }


}
