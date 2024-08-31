### JavaScript API

如果您不需要命令行，而是在您的JS项目中使用转换API时，您可以直接在您的项目中下载`@md2html/core`：

::: code-group

```bash [npm]
npm install @md2html/core
```

```bash [pnpm]
pnpm install @md2html/core
```

```bash [yarn]
yarn add @md2html/core
```

:::

随后，可以直接使用其中的函数：

```javascript
import { mdToHTML } from '@md2html/core';

const markdown = `
# Main Header

**Bold text** and *italic text*.

1. First ordered item
2. Second ordered item

- First unordered item
- Second unordered item

> A blockquote

\`\`\`
Code block
\`\`\`

[Link](http://example.com)
![Image](http://example.com/image.png)
        `;

const html = mdToHTML(markdown);
```
