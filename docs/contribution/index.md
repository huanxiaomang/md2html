# md2html 开发指南

## 项目仓库

本项目基于 [Pnpm Workspase](https://pnpm.io/zh/workspaces) 实现了 Monorepo 架构，通过**单仓库多项目**的方式管理代码。

仓库 【packages】 目录下共有 `cli` , `core` , `shared` , `example` 4个子项目，另有 `docs` 目录用于构建文档站点。

```sh
.
├─ docs/    # 文档目录
└─ packages/  # 项目目录
   ├─ cli
   ├─ core
   ├─ shared
   └─ example
```

其中 [@md2html/cli](https://www.npmjs.com/package/@md2html/cli) 与 [@md2html/core](https://www.npmjs.com/package/@md2html/core) 已作为依赖包发布到了 npm 平台。

**@md2html/cli**：

-   检查、解析参数；加载、合并配置项；将内容转换后写入HTML；使用 express 开启监听服务器。
-   HMR：chokidar监听文件变动，websocket发消息给页面通知更新，页面收到消息刷新。
-   开发tsup插件， 实现build 时自动将 template/ 复制到 dist/。

**@md2html/core**：

-   遍历配合正则表达式的方法实现基本的转换逻辑。
-   使用 vitest 进行单元测试，使用快照测试来测试含大量数据的用例，并测试覆盖率。

**@md2html/shared**：

-   封装 file 相关操作，使用 chalk 库封装 logger等。

## 功能清单

✅ 常见参数与配置的加载

✅ 监听模式

✅ 自定义 `html` 文件

❌ 复杂的嵌套markdown文档转换

## 兼容性 <Badge type="info" text="待测试" />
