import { blueBright, green, yellow } from "chalk";
import express from 'express';
import path from 'path';


export function createServer(staticPath:string,commonPort:number=8080) {
    startServer(staticPath,commonPort);

    
}

function startServer(root:string,port:number) {
    
    const app = express();
    app.use(express.static(root));
    app.get('*', (_, res) => {
        res.sendFile(path.join(root, 'index.html'));
    })

    const server = app.listen(port, (err) => {
        if (err && err.code === 'EADDRINUSE') {
            console.log(yellow(`端口 ${port} 已被占用，正在尝试下一个端口...`));
            startServer(root,port + 1); // 尝试下一个端口
          } else {
            console.log(green('🚀启动服务器成功: '), blueBright(`http://localhost:${server.address()?.port}`));
          }
    })
}