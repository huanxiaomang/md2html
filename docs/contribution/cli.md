### @md2html/cli

| 文件名              | 功能描述                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| `loadConfig.ts`     | 负责加载配置文件和命令行参数，将默认配置、本地配置文件 `.mthrc`、命令行参数进行合并，生成最终配置。        |
| `createServer.ts`   | 用于启动本地服务器，并通过 WebSocket 实现 Markdown 文件变化的实时更新。                                    |
| `createProject.ts`  | 负责生成项目文件结构，将 Markdown 文件转换为 HTML 文件并处理输出路径，支持清空目录、指定 HTML 模板等功能。 |
| `index.ts`          | 主入口文件，定义了 CLI 命令行工具的参数和行为，包括文件转换、实时更新等操作。                              |
| `modifyHTMLFile.ts` | 用于将 Markdown 文件内容转换为 HTML，并将转换结果插入到指定的 HTML 文件中的 `.markdown` 容器中。           |
| `constants.ts`      | 存放默认配置及相关常量，如配置文件名 `.mthrc` 及默认的配置参数。                                           |
| `types/config.ts`   | 定义了配置文件的 TypeScript 类型 `M2HConfig`，用于约束配置项的结构。                                       |

修改代码后，执行 `npm run dev` 将自动打包并完成 `npm link`。

此外，如果修改了cli依赖的本地项目如 `@md2html/core`，需先进行一次 `npm i` 来加载。
