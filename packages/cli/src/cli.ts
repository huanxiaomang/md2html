import cac from 'cac';
import { red } from "chalk";
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import createProject from './createProject';
import { createServer } from './createServer';
import { loadConfig } from './loadConfig';



const cli = cac();

cli.command('').action(() => {
    cli.outputHelp();
})

cli.command('[file]', '需要转换的markdown文件')
    .action(async (fileName: string, cliOptions: any) => {

        if (!existsSync(resolve(process.cwd(),fileName))) {
            throw new Error(red('指定的文件不存在'));
        }
        if (!new RegExp(/^.*\.md$/).test(fileName)) {
            throw new Error(red('指定的文件不为markdown文件'));
        }

        const options = await loadConfig(cliOptions);


        await createProject(options, fileName);
            
        //如果开启了热更新模式
        if (cliOptions.w) {
            const outputPath = resolve(process.cwd(), options.output);
            const markdownPath = resolve(process.cwd(), fileName);
            await createServer(outputPath, markdownPath, options.port);
        }
        
        

    })
    

cli.option('-w, --watch', '是否热更新模式', {
        type:['boolean'],
    })
    .option('-s, --server [port]', '在指定端口开启服务器', {
        type:['number'],
    })
    .option('-o, --output [path]', '转换到的路径', {
        type:['string'],
    })
    .option('-c, --clean', '是否清空输出目录', {
        type:['string'],
    })



cli.version(require('../package.json').version);
cli.help();
cli.parse();

// try {

//     cli.parse(process.argv, { run: false });
//     (async () => {
//         await cli.runMatchedCommand();
//     })();
//   } catch (error:any) {
//     console.error(error.stack)
//     process.exit(1)
//   }