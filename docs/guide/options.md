### CLI 参数文档

#### 命令行参数

| 参数                  | 描述                                       | 用法                                 | 默认值      |
| --------------------- | ------------------------------------------ | ------------------------------------ | ----------- |
| `-w, --watch`         | 启用实时热更新模式                         | `md2html example.md --watch`         | 关闭        |
| `-s, --server <port>` | 在指定端口启动服务器                       | `md2html example.md --server 3000`   | 8080        |
| `-o, --output <path>` | 指定转换后的输出路径                       | `md2html example.md --output ./dist` | `markdown/` |
| `-c, --clean`         | 清空输出目录（只能清理当前项目的子文件夹） | `md2html example.md --clean`         | 不清理      |

#### `.mthrc` 配置文件说明

`.mthrc` 是一个可选的 JSON 文件，用于定义默认的 CLI 配置参数。项目根目录中的 `.mthrc` 文件将自动加载，并与命令行参数进行合并，命令行参数优先级更高。

##### 配置项

| 配置项   | 类型      | 描述                                                     | 默认值        |
| -------- | --------- | -------------------------------------------------------- | ------------- |
| `output` | `string`  | 指定转换后的输出路径，类似于命令行参数 `--output`        | `"markdown/"` |
| `clean`  | `boolean` | 是否清空输出目录，类似于命令行参数 `--clean`             | `false`       |
| `html`   | `string`  | 指定模板 HTML 文件的路径。如果未指定，系统将复制默认模板 | `null`        |
| `port`   | `number`  | 指定服务器启动的端口，类似于命令行参数 `--server`        | `8080`        |

### 配置文件示例

```json
{
    "output": "./dist",
    "clean": true,
    "html": "./template/index.html",
    "port": 3000
}
```

此配置文件定义了将输出路径设置为 ./dist，并启用清空目录，指定了 HTML 模板路径以及服务器端口为 3000。
