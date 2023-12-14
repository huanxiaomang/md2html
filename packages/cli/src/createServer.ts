import { logger, measureRunTime } from "@md2html/shared";
import { blueBright, green, red, yellow } from "chalk";
import chokidar from "chokidar";
import express from 'express';
import { readFile, writeFile } from "fs/promises";
import ws from 'ws';
import { modifyHtmlFile } from "./modifyHTMLFile";



export async function createServer(staticPath: string, mdPath: string, outputHTMLPath: string, commonPort: number = 8080) {
    const server = await startServer(staticPath, outputHTMLPath, commonPort);

    listenMdToHTML(mdPath, outputHTMLPath, server);

}

async function startServer(root: string, outputHTMLPath: string, port: number) {

    const app = express();


    await injectWsScripts(outputHTMLPath);
    app.use(express.static(root));
    app.get('*', (_, res) => {
        res.sendFile(outputHTMLPath);
    })
    let left = 5;//重连次数

    const listen = (port: number) => {
        const duration = 1000;

        return new Promise((resolve, reject) => {
            const server = app.listen(port);

            server.on('listening', () => {
                console.log(green('🚀 启动服务器成功: '), blueBright(`http://localhost:${server.address()?.port}`));
                resolve(server);
            })

            server.on('error', (err) => {
                if (err.code !== 'EADDRINUSE') {
                    throw err;
                }

                if (left === 0) {
                    logger.error('启动服务器失败: 端口被占用');
                    reject('启动服务器失败');
                }
                console.log(yellow(`端口 ${port} 已被占用，正在尝试下一个端口...`));
                left--;
                setTimeout(() => listen(port + 1), duration);


            })


        })
    }
    const server = await listen(port);

    return server;
}





function listenMdToHTML(markdownPath: string, outputHTMLPath: string, server: any) {

    try {
        const wss = new ws.Server({ server });

        const watcher = chokidar.watch(markdownPath, { persistent: true });
        watcher.on('change', async () => {
            measureRunTime(async () => {
                await modifyHtmlFile(markdownPath, outputHTMLPath);
                wss.clients.forEach((client: any) => {

                    client.send('reload');

                });
            }).end((elapsedTime: string) => {
                logger.infoTime(yellow(`🔄 实时更新成功 (${elapsedTime}ms)`));

            })



        })
    } catch (err) {
        console.log(red(err.message));
    }

}



async function injectWsScripts(htmlPath: string) {
    let htmlContent = (await readFile(htmlPath)).toString();
    const script = `
        if ('WebSocket' in window) {
	    	(function () {
            
	    		var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
	    		var address = protocol + window.location.host + window.location.pathname + '/ws';
	    		var socket = new WebSocket(address);
	    		socket.onmessage = function (msg) {
	    			if (msg.data == 'reload') window.location.reload();
	    		};
	    	})();
	    }
	    else {
	    	console.error('您的浏览器不支持WebSocket, 请更新浏览器');
	    }
    `


    if (!new RegExp(/<script des='ws'>/g).test(htmlContent)) {
        htmlContent = htmlContent.replace('</head>', `<script des='ws'>${script}</script>\n</head>`);
    }



    await writeFile(htmlPath, htmlContent);
}