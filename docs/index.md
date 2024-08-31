---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
    name: Md2HTML
    text: 一个轻量的 Markdown 转 HTML 的 CLI 工具
    tagline: 让 markdown转换 变得简单灵活
    actions:
        - theme: brand
          text: 快速上手
          link: /guide/quick-start.html
        - theme: alt
          text: API
          link: /guide/api
    image:
        src: /logo.svg
        alt: Md2HTML

features:
    - icon: 💻
      title: 支持通过参数或配置文件启用监听模式
      details: 监听到md文件更新后，将自动完成转换并更新页面
    - icon: 🖨️
      title: 注入自定义的 HTML 模板
      details: 可通过自定义配置，将转换后的内容注入自定义的模板中。
    - icon: 👁️‍🗨️
      title: 提供JS API
      details: 只需下载对应包即可在您的项目中使用转换API
---

<style>
.image-src[alt="Md2HTML"] {
    max-width: 160px;
    max-height: 160px;
}

@media (min-width: 640px) {
.image-src[alt="Md2HTML"] {
    max-width: 200px;
    max-height: 200px;
}
}

@media (min-width: 960px) {
.image-src[alt="Md2HTML"] {
    max-width: 340px;
    max-height: 340px;
}
}
</style>
