# md2html 快速上手

## 使用md2html CLI

::: tip
推荐 [Node.js](https://nodejs.org) 版本高于`v16.0`。
:::

使用你喜爱的包管理器安装 `@md2html/cli` 到**全局**。

::: code-group

```bash [npm]
npm install @md2html/cli -g
```

```bash [pnpm]
pnpm install @md2html/cli -g
```

```bash [yarn]
yarn global add @md2html/cli
```

:::

安装完成后即可使用 `mth` 命令来转换。

下面是一些简单的使用示例：

```bash
mth docs.md
```

将当前目录的`docs.md`文件转换为`html`。

```bash
mth docs.md -o output/
```

将当前目录的`docs.md`文件转换至`/output/index.html`。

```bash
mth docs.md -w
```

监听模式，开启服务器，实时监听markdown文件更新并转换。

更多参数可以使用`mth -h`来查看，或参考[参数与配置](./options.md)。

我们提供了一个带有配置文件的示例项目，见[example](https://github.com/huanxiaomang/md2html/tree/master/packages/example)。
