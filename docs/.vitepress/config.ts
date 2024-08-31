import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    title: 'Md2HTML',
    description: '一个轻量的 Markdown 转 HTML 的 CLI 工具',
    head: [['link', { rel: 'icon', href: '/logo.svg' }]],
    lastUpdated: true,
    ignoreDeadLinks: 'localhostLinks',

    // https://vitepress.dev/reference/default-theme-config
    themeConfig: {
        logo: '/logo.svg',

        nav: [
            { text: '开始使用', link: '/guide/quick-start', activeMatch: '/guide/' },
            {
                text: '参与开源',
                items: [
                    {
                        text: '贡献',
                        items: [
                            { text: '开发指南', link: '/contribution/' },
                            { text: '@md2HTML/cli', link: '/contribution/cli' },
                            { text: '@md2HTML/core', link: '/contribution/core' },
                            { text: '@md2HTML/shared', link: '/contribution/shared' },
                            { text: '@md2HTML/example', link: '/contribution/example' }
                        ]
                    },
                ]
            },
        ],

        sidebar: {
            '/guide/': [
                {
                    text: '开始使用',
                    base: '/guide',
                    items: [
                        { text: '快速上手', link: '/quick-start' },
                        { text: '参数与配置', link: '/options' }
                    ]
                },
                {
                    text: '进阶手册',
                    base: '/guide',
                    items: [
                        { text: '在JS中使用', link: '/api' },
                    ]
                }
            ],
            '/contribution/': [
                {
                    text: '贡献',
                    items: [
                        { text: '开发指南', link: '/contribution/' },
                        { text: '@Md2HTML/cli', link: '/contribution/cli' },
                        { text: '@Md2HTML/core', link: '/contribution/core' },
                        { text: '@md2HTML/shared', link: '/contribution/shared' },
                        { text: '@md2HTML/example', link: '/contribution/example' }
                    ]
                },
            ]
        },

        outline: [2, 3],

        footer: {
            message: 'Released under the MIT License.',
            copyright:
                'Copyright © 2023-present <a href="https://github.com/huanxiaomang/md2html">Md2HTML</a>'
        },

        editLink: {
            pattern: 'https://github.com/huanxiaomang/md2html/edit/main/docs/:path',
            text: '在 GitHub 上编辑此页'
        },

        lastUpdated: {
            text: '本页更新时间',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },

        search: {
            provider: 'local',
            options: {
                locales: {
                    zh: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换'
                                }
                            }
                        }
                    }
                }
            }
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/huanxiaomang/md2html' }]
    }
})
