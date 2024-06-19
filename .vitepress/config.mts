import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Penna",
  description: "一个基于模块化开发的前端脚手架工具",
  themeConfig: {
    logo: "/logo.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指引', link: '/guide/introduction' },
      {
        text: 'Ecosystem',
        link: '/ecosystem',
        items:[]
      },
    ],

    sidebar: {
      '/guide':[
        {
          text:"项目介绍",
          link:"/guide/introduction"
        },
        {
          text:"快速开始",
          link:"/guide/quick-start"
        },
        {
          text:"模块化开发",
          link:"/guide/module"
        },
        {
          text:"使用插件",
          link:"/guide/plugin"
        },
        {
          text:"配置",
          link:"/guide/config"
        },
        {
          text:"命令",
          link:"/guide/command"
        },
        {
          text:"部署",
          link:"/guide/deploy"
        },
        {
          text:"FAQ",
          link:"/guide/faq"
        }
      ],
      '/Ecosystem':[]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
