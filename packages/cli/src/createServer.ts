import { logger, measureRunTime } from "@md2html/shared";
import { blueBright, green, red, yellow } from "chalk";
import chokidar from "chokidar";
import express from 'express';
import { readFile, writeFile } from "fs/promises";
import { join, resolve } from 'path';
import ws from 'ws';
import { modifyHtmlFile } from "./modifyHTMLFile";



export async function createServer(staticPath: string, mdPath: string, commonPort: number = 8080) {
    const server = await startServer(staticPath, mdPath, commonPort);

    listenMdToHTML(mdPath, staticPath, server);
}

async function startServer(root: string, mdPath: string, port: number) {

    const app = express();


    await injectWsScripts(resolve(root, 'index.html'));
    app.use(express.static(root));
    app.get('*', (_, res) => {
        res.sendFile(join(root, 'index.html'));
    })

    const server = app.listen(port, (err) => {
        if (err && err.code === 'EADDRINUSE') {
            console.log(yellow(`端口 ${port} 已被占用，正在尝试下一个端口...`));
            startServer(root, mdPath, port + 1); // 尝试下一个端口
        } else {
            console.log(green('🚀 启动服务器成功: '), blueBright(`http://localhost:${server.address()?.port}`));
        }
    })

    return server;
}


function listenMdToHTML(markdownPath: string, htmlPath: string, server: any) {

    try {
        const wss = new ws.Server({ server });

        const watcher = chokidar.watch(markdownPath, { persistent: true });
        watcher.on('change', async () => {
            measureRunTime(async () => {
                await modifyHtmlFile(markdownPath, htmlPath);
                wss.clients.forEach((client: any) => {

                    client.send('reload');

                });
            }).end((elapsedTime:string) => {
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



    htmlContent = htmlContent.replace('</head>', `<script>${script}</script>\n</head>`);


    await writeFile(htmlPath, htmlContent);
}